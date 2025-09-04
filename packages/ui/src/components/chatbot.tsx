import * as React from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Input } from "./input"
import { cn } from "../lib/utils"

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: Array<{
    title: string
    content: string
    category: string
  }>
  confidence?: number
}

export interface ChatbotProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => Promise<void>
  onClearHistory: () => void
  loading?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function Chatbot({
  messages,
  onSendMessage,
  onClearHistory,
  loading = false,
  disabled = false,
  placeholder = "Ask me anything about Naveeg...",
  className
}: ChatbotProps) {
  const [inputValue, setInputValue] = React.useState('')
  const [isSending, setIsSending] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isSending || disabled) return

    const message = inputValue.trim()
    setInputValue('')
    setIsSending(true)

    try {
      await onSendMessage(message)
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">AI Assistant</CardTitle>
            <CardDescription>
              Ask me anything about Naveeg and website management
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            disabled={messages.length === 0 || loading}
          >
            Clear
          </Button>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Naveeg AI</h3>
            <p className="text-gray-500">
              I&apos;m here to help you with questions about website management, 
              hosting, domains, and more. What would you like to know?
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {message.role === 'assistant' && message.confidence && (
                    <div className="mt-2 text-xs opacity-70">
                      Confidence: {Math.round(message.confidence * 100)}%
                    </div>
                  )}
                  
                  {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                    <div className="mt-2 text-xs opacity-70">
                      <div className="font-medium mb-1">Sources:</div>
                      <div className="space-y-1">
                        {message.sources.map((source, index) => (
                          <div key={index} className="truncate">
                            {source.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled || isSending}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || disabled || isSending}
            className="px-6"
          >
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export interface ChatbotWidgetProps {
  onSendMessage: (message: string) => Promise<void>
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function ChatbotWidget({
  onSendMessage,
  loading = false,
  disabled = false,
  className
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<ChatMessage[]>([])

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    try {
      await onSendMessage(message)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleClearHistory = () => {
    setMessages([])
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {isOpen ? (
        <Card className="w-96 h-[500px] shadow-lg">
          <Chatbot
            messages={messages}
            onSendMessage={handleSendMessage}
            onClearHistory={handleClearHistory}
            loading={loading}
            disabled={disabled}
          />
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => setIsOpen(false)}
          >
            ×
          </Button>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg"
          size="lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </Button>
      )}
    </div>
  )
}
