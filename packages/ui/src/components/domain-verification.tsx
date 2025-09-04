import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"

export interface DomainVerificationProps {
  domain: string
  verificationMethod: 'dns' | 'file'
  verificationData: {
    dns_record?: {
      type: string
      name: string
      value: string
    }
    file_path?: string
    file_content?: string
  }
  onVerify: () => Promise<{ success: boolean; error?: string }>
  onRefresh: () => Promise<void>
  loading?: boolean
  className?: string
}

export function DomainVerification({
  domain,
  verificationMethod,
  verificationData,
  onVerify,
  onRefresh,
  loading = false,
  className
}: DomainVerificationProps) {
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleVerify = async () => {
    setIsVerifying(true)
    setError(null)

    try {
      const result = await onVerify()
      if (!result.success) {
        setError(result.error || 'Verification failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setError(null)

    try {
      await onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh')
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Verify Domain Ownership</CardTitle>
        <CardDescription>
          Verify that you own {domain} by completing one of the following steps:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {verificationMethod === 'dns' && verificationData.dns_record && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                DNS Record Verification
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Add the following DNS record to your domain&apos;s DNS settings:
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <div className="mt-1 font-mono text-gray-900">
                    {verificationData.dns_record.type}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <div className="mt-1 font-mono text-gray-900">
                    {verificationData.dns_record.name}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Value:</span>
                  <div className="mt-1 font-mono text-gray-900 break-all">
                    {verificationData.dns_record.value}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    DNS Propagation
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      DNS changes can take up to 24 hours to propagate. 
                      If verification fails, wait a few minutes and try again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {verificationMethod === 'file' && verificationData.file_path && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                File Upload Verification
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a file to your website&apos;s root directory:
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">File Path:</span>
                  <div className="mt-1 font-mono text-gray-900">
                    {verificationData.file_path}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">File Content:</span>
                  <div className="mt-1 font-mono text-gray-900 bg-white p-2 rounded border">
                    {verificationData.file_content}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    File Upload Instructions
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Upload the file to your website&apos;s root directory. 
                      The file should be accessible at {domain}/{verificationData.file_path}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Verification Failed</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <Button
            onClick={handleVerify}
            disabled={isVerifying || loading}
            className="flex-1"
          >
            {isVerifying ? 'Verifying...' : 'Verify Domain'}
          </Button>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
