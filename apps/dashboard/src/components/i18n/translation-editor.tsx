"use client"

import React, { useState, useEffect } from 'react'
import { useTranslation } from '@naveeg/lib'
import { Button } from '@naveeg/ui'
import { 
  Save, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Filter,
  Globe,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface TranslationEditorProps {
  namespace: string
  locale: string
  onSave?: (key: string, value: string) => void
  onDelete?: (key: string) => void
  onAdd?: (key: string, value: string) => void
}

interface TranslationItem {
  key: string
  value: string
  context?: string
  variables?: Record<string, any>
}

export function TranslationEditor({ 
  namespace, 
  locale, 
  onSave, 
  onDelete, 
  onAdd 
}: TranslationEditorProps) {
  const { t, exists } = useTranslation(namespace as any)
  const [translations, setTranslations] = useState<TranslationItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'translated' | 'missing'>('all')
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState('')
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockTranslations: TranslationItem[] = [
      { key: 'welcome', value: 'Welcome to Naveeg' },
      { key: 'dashboard.title', value: 'Dashboard' },
      { key: 'settings.profile', value: 'Profile Settings' },
      { key: 'buttons.save', value: 'Save' },
      { key: 'buttons.cancel', value: 'Cancel' },
      { key: 'messages.success', value: 'Operation completed successfully' },
      { key: 'messages.error', value: 'An error occurred' },
      { key: 'navigation.home', value: 'Home' },
      { key: 'navigation.about', value: 'About' },
      { key: 'navigation.contact', value: 'Contact' }
    ]
    setTranslations(mockTranslations)
  }, [namespace, locale])

  const filteredTranslations = translations.filter(item => {
    const matchesSearch = item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.value.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'all') return matchesSearch
    if (filterStatus === 'translated') return matchesSearch && item.value.trim() !== ''
    if (filterStatus === 'missing') return matchesSearch && item.value.trim() === ''
    
    return matchesSearch
  })

  const handleEdit = (key: string, value: string) => {
    setEditingKey(key)
    setEditingValue(value)
  }

  const handleSave = () => {
    if (editingKey && onSave) {
      onSave(editingKey, editingValue)
      setTranslations(prev => 
        prev.map(item => 
          item.key === editingKey 
            ? { ...item, value: editingValue }
            : item
        )
      )
    }
    setEditingKey(null)
    setEditingValue('')
  }

  const handleCancel = () => {
    setEditingKey(null)
    setEditingValue('')
  }

  const handleDelete = (key: string) => {
    if (onDelete) {
      onDelete(key)
      setTranslations(prev => prev.filter(item => item.key !== key))
    }
  }

  const handleAdd = () => {
    if (newKey && newValue && onAdd) {
      onAdd(newKey, newValue)
      setTranslations(prev => [...prev, { key: newKey, value: newValue }])
      setNewKey('')
      setNewValue('')
      setShowAddForm(false)
    }
  }

  const getTranslationStatus = (item: TranslationItem) => {
    if (item.value.trim() === '') return 'missing'
    if (exists(item.key)) return 'translated'
    return 'missing'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'translated':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'missing':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'translated':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'missing':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Translation Editor
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {namespace} • {locale}
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Translation
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search translations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="translated">Translated</option>
            <option value="missing">Missing</option>
          </select>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Add New Translation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Key
              </label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="e.g., buttons.save"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Value
              </label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="e.g., Save"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!newKey || !newValue}>
              Add Translation
            </Button>
          </div>
        </div>
      )}

      {/* Translations List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTranslations.map((item) => {
                const status = getTranslationStatus(item)
                const isEditing = editingKey === item.key
                
                return (
                  <tr key={item.key} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.key}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                      ) : (
                        <span className={item.value.trim() === '' ? 'text-gray-400 italic' : ''}>
                          {item.value || 'No translation'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        <span className="ml-1 capitalize">{status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {isEditing ? (
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEdit(item.key, item.value)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDelete(item.key)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>{filteredTranslations.length}</strong> translations found
            {filterStatus !== 'all' && ` (${filterStatus})`}
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {translations.filter(t => t.value.trim() !== '').length} of {translations.length} translated
          </div>
        </div>
      </div>
    </div>
  )
}
