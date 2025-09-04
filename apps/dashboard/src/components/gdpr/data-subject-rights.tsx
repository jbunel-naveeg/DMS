"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@naveeg/ui'
import { DataSubjectRightsManager } from '@naveeg/lib'
import { 
  Download, 
  Edit, 
  Trash2, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  User,
  Shield,
  Database
} from 'lucide-react'

interface DataSubjectRightsProps {
  userId: string
  supabaseUrl: string
  supabaseKey: string
}

interface DataSubjectRequest {
  id: string
  request_type: string
  status: string
  description?: string
  requested_at: string
  completed_at?: string
  admin_notes?: string
}

export function DataSubjectRights({ userId, supabaseUrl, supabaseKey }: DataSubjectRightsProps) {
  const [requests, setRequests] = useState<DataSubjectRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [selectedRequestType, setSelectedRequestType] = useState('')
  const [requestDescription, setRequestDescription] = useState('')

  const dataSubjectRightsManager = new DataSubjectRightsManager(supabaseUrl, supabaseKey)

  useEffect(() => {
    loadRequests()
  }, [userId])

  const loadRequests = async () => {
    try {
      setLoading(true)
      const userRequests = await dataSubjectRightsManager.getUserRequests(userId)
      setRequests(userRequests)
    } catch (error) {
      console.error('Error loading requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRequest = async () => {
    if (!selectedRequestType) return

    try {
      const newRequest = await dataSubjectRightsManager.createDataSubjectRequest(
        userId,
        selectedRequestType as any,
        requestDescription
      )

      if (newRequest) {
        setRequests(prev => [newRequest, ...prev])
        setShowRequestForm(false)
        setSelectedRequestType('')
        setRequestDescription('')
      }
    } catch (error) {
      console.error('Error creating request:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'access':
        return 'Data Access'
      case 'rectification':
        return 'Data Rectification'
      case 'erasure':
        return 'Data Erasure'
      case 'portability':
        return 'Data Portability'
      case 'restriction':
        return 'Processing Restriction'
      case 'objection':
        return 'Object to Processing'
      default:
        return type
    }
  }

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'access':
        return <Database className="h-4 w-4" />
      case 'rectification':
        return <Edit className="h-4 w-4" />
      case 'erasure':
        return <Trash2 className="h-4 w-4" />
      case 'portability':
        return <Download className="h-4 w-4" />
      case 'restriction':
        return <Shield className="h-4 w-4" />
      case 'objection':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Subject Rights</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your personal data and exercise your rights under GDPR
          </p>
        </div>
        <Button onClick={() => setShowRequestForm(true)}>
          New Request
        </Button>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Create Data Subject Request</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Request Type
                </label>
                <select
                  value={selectedRequestType}
                  onChange={(e) => setSelectedRequestType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select request type</option>
                  <option value="access">Data Access</option>
                  <option value="rectification">Data Rectification</option>
                  <option value="erasure">Data Erasure</option>
                  <option value="portability">Data Portability</option>
                  <option value="restriction">Processing Restriction</option>
                  <option value="objection">Object to Processing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Describe your request..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowRequestForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateRequest}
                disabled={!selectedRequestType}
              >
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No requests yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You haven't made any data subject rights requests yet.
          </p>
          <Button onClick={() => setShowRequestForm(true)}>
            Make Your First Request
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getRequestTypeIcon(request.request_type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {getRequestTypeLabel(request.request_type)}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">{request.status}</span>
                      </span>
                    </div>
                    
                    {request.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {request.description}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        Requested: {new Date(request.requested_at).toLocaleDateString()}
                      </span>
                      {request.completed_at && (
                        <span>
                          Completed: {new Date(request.completed_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {request.admin_notes && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Admin Notes:</strong> {request.admin_notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Information Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Your Data Rights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
          <div>
            <h4 className="font-medium mb-2">Right to Access</h4>
            <p>Request a copy of all personal data we hold about you.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Right to Rectification</h4>
            <p>Correct any inaccurate or incomplete personal data.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Right to Erasure</h4>
            <p>Request deletion of your personal data in certain circumstances.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Right to Portability</h4>
            <p>Receive your data in a structured, machine-readable format.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Right to Restriction</h4>
            <p>Limit how we process your personal data.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Right to Object</h4>
            <p>Object to processing of your personal data for certain purposes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
