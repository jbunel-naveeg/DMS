import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"

export interface WebsiteCardProps {
  website: {
    id: string
    name: string
    url: string
    status: 'active' | 'inactive' | 'pending' | 'suspended'
    template: string
    last_deployed_at?: string
  }
  onEdit?: () => void
  onView?: () => void
  onDelete?: () => void
  className?: string
}

export function WebsiteCard({ 
  website, 
  onEdit, 
  onView, 
  onDelete, 
  className 
}: WebsiteCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'pending':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        )
      case 'suspended':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  const formatLastDeployed = (dateString?: string) => {
    if (!dateString) return 'Never deployed'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{website.name}</CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {website.url}
              </a>
            </CardDescription>
          </div>
          <div className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            getStatusColor(website.status)
          )}>
            {getStatusIcon(website.status)}
            <span className="ml-1 capitalize">{website.status}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Template</span>
            <span className="font-medium capitalize">{website.template}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last Deployed</span>
            <span className="font-medium">{formatLastDeployed(website.last_deployed_at)}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={onView}
              className="flex-1"
            >
              View Site
            </Button>
          )}
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex-1"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
