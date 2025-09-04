export interface OpenAIEmbedding {
  embedding: number[]
  index: number
}

export interface OpenAIEmbeddingResponse {
  data: OpenAIEmbedding[]
  model: string
  usage: {
    prompt_tokens: number
    total_tokens: number
  }
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: ChatMessage
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface FAQDocument {
  id: string
  title: string
  content: string
  category: string
  embedding?: number[]
  created_at: string
  updated_at: string
}

export interface ChatbotResponse {
  answer: string
  sources: FAQDocument[]
  confidence: number
  tokens_used: number
}

export class OpenAIService {
  private apiKey: string
  private baseUrl: string = 'https://api.openai.com/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'POST',
    body?: any
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Generate embeddings for text
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.makeRequest<OpenAIEmbeddingResponse>('/embeddings', 'POST', {
        input: text,
        model: 'text-embedding-ada-002'
      })

      return response.data[0].embedding
    } catch (error) {
      console.error('Error generating embedding:', error)
      throw error
    }
  }

  // Generate embeddings for multiple texts
  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    try {
      const response = await this.makeRequest<OpenAIEmbeddingResponse>('/embeddings', 'POST', {
        input: texts,
        model: 'text-embedding-ada-002'
      })

      return response.data.map(item => item.embedding)
    } catch (error) {
      console.error('Error generating embeddings:', error)
      throw error
    }
  }

  // Generate chat completion
  async generateChatCompletion(
    messages: ChatMessage[],
    model: string = 'gpt-3.5-turbo',
    maxTokens: number = 1000,
    temperature: number = 0.7
  ): Promise<ChatCompletionResponse> {
    try {
      const response = await this.makeRequest<ChatCompletionResponse>('/chat/completions', 'POST', {
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
        stream: false
      })

      return response
    } catch (error) {
      console.error('Error generating chat completion:', error)
      throw error
    }
  }

  // Process FAQ document and generate embedding
  async processFAQDocument(document: {
    title: string
    content: string
    category: string
  }): Promise<{
    embedding: number[]
    processed_content: string
  }> {
    try {
      // Combine title and content for embedding
      const combinedText = `${document.title}\n\n${document.content}`
      
      // Generate embedding
      const embedding = await this.generateEmbedding(combinedText)
      
      // Clean and process content
      const processedContent = this.cleanText(document.content)
      
      return {
        embedding,
        processed_content: processedContent
      }
    } catch (error) {
      console.error('Error processing FAQ document:', error)
      throw error
    }
  }

  // Clean and normalize text for better embedding
  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim()
      .toLowerCase()
  }

  // Generate chatbot response with context
  async generateChatbotResponse(
    question: string,
    context: FAQDocument[],
    conversationHistory: ChatMessage[] = []
  ): Promise<ChatbotResponse> {
    try {
      // Create context from FAQ documents
      const contextText = context
        .map(doc => `Title: ${doc.title}\nContent: ${doc.content}`)
        .join('\n\n')

      // Create system message with context
      const systemMessage: ChatMessage = {
        role: 'system',
        content: `You are a helpful AI assistant for Naveeg, a website management platform. 
        
Use the following FAQ context to answer user questions. If the question is not covered in the context, 
provide a helpful response based on your general knowledge about website management and hosting.

FAQ Context:
${contextText}

Instructions:
- Answer questions based on the provided FAQ context when possible
- Be helpful, accurate, and concise
- If you're unsure about something, say so
- Provide step-by-step instructions when appropriate
- Be friendly and professional in tone`
      }

      // Create user message
      const userMessage: ChatMessage = {
        role: 'user',
        content: question
      }

      // Combine all messages
      const messages = [systemMessage, ...conversationHistory, userMessage]

      // Generate response
      const response = await this.generateChatCompletion(messages, 'gpt-3.5-turbo', 1000, 0.7)

      // Calculate confidence based on context relevance
      const confidence = this.calculateConfidence(question, context)

      return {
        answer: response.choices[0].message.content,
        sources: context,
        confidence,
        tokens_used: response.usage.total_tokens
      }
    } catch (error) {
      console.error('Error generating chatbot response:', error)
      throw error
    }
  }

  // Calculate confidence score based on context relevance
  private calculateConfidence(question: string, context: FAQDocument[]): number {
    if (context.length === 0) return 0.3

    // Simple keyword matching for confidence calculation
    const questionWords = question.toLowerCase().split(/\s+/)
    const contextText = context
      .map(doc => `${doc.title} ${doc.content}`)
      .join(' ')
      .toLowerCase()

    let matches = 0
    questionWords.forEach(word => {
      if (contextText.includes(word)) {
        matches++
      }
    })

    const confidence = Math.min(0.9, 0.3 + (matches / questionWords.length) * 0.6)
    return Math.round(confidence * 100) / 100
  }

  // Generate search query from user question
  generateSearchQuery(question: string): string {
    // Extract key terms and create a search-friendly query
    const words = question
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 2) // Filter out short words
      .slice(0, 10) // Limit to 10 words

    return words.join(' ')
  }
}

// Create a singleton instance
export const openAIService = new OpenAIService(process.env.OPENAI_API_KEY || '')

// Helper function to get OpenAI service instance
export function getOpenAIService(): OpenAIService {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required')
  }
  return new OpenAIService(apiKey)
}
