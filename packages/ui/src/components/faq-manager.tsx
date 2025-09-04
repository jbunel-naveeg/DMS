import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "../lib/utils"

export interface FAQDocument {
  id: string
  title: string
  content: string
  category: string
  created_at: string
  updated_at: string
}

export interface FAQManagerProps {
  faqs: FAQDocument[]
  onAddFAQ: (faq: Omit<FAQDocument, 'id' | 'created_at' | 'updated_at'>) => Promise<{ success: boolean; error?: string }>
  onUpdateFAQ: (id: string, faq: Partial<FAQDocument>) => Promise<{ success: boolean; error?: string }>
  onDeleteFAQ: (id: string) => Promise<{ success: boolean; error?: string }>
  onProcessFAQ: (id: string) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  className?: string
}

export function FAQManager({
  faqs,
  onAddFAQ,
  onUpdateFAQ,
  onDeleteFAQ,
  onProcessFAQ,
  loading = false,
  className
}: FAQManagerProps) {
  const [isAdding, setIsAdding] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [newFAQ, setNewFAQ] = React.useState({
    title: '',
    content: '',
    category: ''
  })
  const [editFAQ, setEditFAQ] = React.useState({
    title: '',
    content: '',
    category: ''
  })
  const [error, setError] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')

  const categories = Array.from(new Set(faqs.map(faq => faq.category))).sort()

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddFAQ = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFAQ.title.trim() || !newFAQ.content.trim() || !newFAQ.category.trim()) return

    setIsAdding(true)
    setError(null)

    try {
      const result = await onAddFAQ(newFAQ)
      if (result.success) {
        setNewFAQ({ title: '', content: '', category: '' })
        setIsAdding(false)
      } else {
        setError(result.error || 'Failed to add FAQ')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add FAQ')
    } finally {
      setIsAdding(false)
    }
  }

  const handleEditFAQ = (faq: FAQDocument) => {
    setEditingId(faq.id)
    setEditFAQ({
      title: faq.title,
      content: faq.content,
      category: faq.category
    })
  }

  const handleUpdateFAQ = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId || !editFAQ.title.trim() || !editFAQ.content.trim() || !editFAQ.category.trim()) return

    setError(null)

    try {
      const result = await onUpdateFAQ(editingId, editFAQ)
      if (result.success) {
        setEditingId(null)
        setEditFAQ({ title: '', content: '', category: '' })
      } else {
        setError(result.error || 'Failed to update FAQ')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update FAQ')
    }
  }

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    setError(null)

    try {
      const result = await onDeleteFAQ(id)
      if (!result.success) {
        setError(result.error || 'Failed to delete FAQ')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete FAQ')
    }
  }

  const handleProcessFAQ = async (id: string) => {
    setError(null)

    try {
      const result = await onProcessFAQ(id)
      if (!result.success) {
        setError(result.error || 'Failed to process FAQ')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process FAQ')
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">FAQ Management</h2>
          <p className="text-gray-600">Manage your frequently asked questions and AI knowledge base</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          Add FAQ
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search">Search FAQs</Label>
              <Input
                id="search"
                placeholder="Search by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Filter by Category</Label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
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

      {/* Add FAQ Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New FAQ</CardTitle>
            <CardDescription>Create a new frequently asked question</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddFAQ} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-title">Title</Label>
                  <Input
                    id="new-title"
                    value={newFAQ.title}
                    onChange={(e) => setNewFAQ(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="FAQ title..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="new-category">Category</Label>
                  <Input
                    id="new-category"
                    value={newFAQ.category}
                    onChange={(e) => setNewFAQ(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Getting Started, Billing, Technical"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="new-content">Content</Label>
                <textarea
                  id="new-content"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  value={newFAQ.content}
                  onChange={(e) => setNewFAQ(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="FAQ content..."
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? 'Adding...' : 'Add FAQ'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No FAQs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory ? 'Try adjusting your search or filter.' : 'Get started by adding your first FAQ.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((faq) => (
            <Card key={faq.id}>
              <CardContent className="pt-6">
                {editingId === faq.id ? (
                  <form onSubmit={handleUpdateFAQ} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input
                          id="edit-title"
                          value={editFAQ.title}
                          onChange={(e) => setEditFAQ(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-category">Category</Label>
                        <Input
                          id="edit-category"
                          value={editFAQ.category}
                          onChange={(e) => setEditFAQ(prev => ({ ...prev, category: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-content">Content</Label>
                      <textarea
                        id="edit-content"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        value={editFAQ.content}
                        onChange={(e) => setEditFAQ(prev => ({ ...prev, content: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" size="sm">
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{faq.title}</h3>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {faq.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(faq.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{faq.content}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleProcessFAQ(faq.id)}
                          disabled={loading}
                        >
                          Process
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditFAQ(faq)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteFAQ(faq.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
