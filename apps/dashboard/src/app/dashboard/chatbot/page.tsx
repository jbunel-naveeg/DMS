'use client'

import { useState, useEffect } from 'react'
import { useUserData } from '@naveeg/lib'
import { 
  Card,
  Chatbot,
  FAQManager,
  FeatureGate
} from '@naveeg/ui'

interface ChatMessage {
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

interface FAQDocument {
  id: string
  title: string
  content: string
  category: string
  created_at: string
  updated_at: string
}

export default function ChatbotPage() {
  const { loading: userDataLoading } = useUserData()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [faqs, setFaqs] = useState<FAQDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'chat' | 'faqs'>('chat')

  // Load FAQs on component mount
  useEffect(() => {
    loadFAQs()
  }, [])

  const loadFAQs = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/faqs')
      const data = await response.json()

      if (data.success) {
        setFaqs(data.faqs || [])
      } else {
        throw new Error(data.error || 'Failed to load FAQs')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load FAQs')
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chatbot/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.answer,
          timestamp: new Date(),
          sources: data.sources,
          confidence: data.confidence
        }

        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response')
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleClearHistory = () => {
    setMessages([])
  }

  const handleAddFAQ = async (faq: Omit<FAQDocument, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faq),
      })

      const data = await response.json()

      if (data.success) {
        await loadFAQs()
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to add FAQ' }
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add FAQ' }
    }
  }

  const handleUpdateFAQ = async (id: string, faq: Partial<FAQDocument>): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faq),
      })

      const data = await response.json()

      if (data.success) {
        await loadFAQs()
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to update FAQ' }
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update FAQ' }
    }
  }

  const handleDeleteFAQ = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        await loadFAQs()
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to delete FAQ' }
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete FAQ' }
    }
  }

  const handleProcessFAQ = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/faqs/${id}/process`, {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to process FAQ' }
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to process FAQ' }
    }
  }

  if (userDataLoading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
        <p className="mt-2 text-gray-600">
          Get help with your website management questions using our AI-powered assistant.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faqs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQ Management
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'chat' ? (
        <FeatureGate feature="ai_chatbot">
          <Card className="h-[600px]">
            <Chatbot
              messages={messages}
              onSendMessage={handleSendMessage}
              onClearHistory={handleClearHistory}
              loading={loading}
              placeholder="Ask me anything about website management, hosting, domains, or Naveeg features..."
            />
          </Card>
        </FeatureGate>
      ) : (
        <FeatureGate feature="ai_chatbot">
          <FAQManager
            faqs={faqs}
            onAddFAQ={handleAddFAQ}
            onUpdateFAQ={handleUpdateFAQ}
            onDeleteFAQ={handleDeleteFAQ}
            onProcessFAQ={handleProcessFAQ}
            loading={loading}
          />
        </FeatureGate>
      )}
    </div>
  )
}
