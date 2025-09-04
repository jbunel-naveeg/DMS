import * as React from "react"
import { useState } from "react"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import { Separator } from "./separator"
import { cn } from "../lib/utils"

export interface UserMenuProps {
  user: {
    id: string
    email?: string
    name?: string
    avatar_url?: string
  }
  onSignOut: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  className?: string
}

export function UserMenu({
  user,
  onSignOut,
  onProfileClick,
  onSettingsClick,
  className
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleProfileClick = () => {
    setIsOpen(false)
    onProfileClick?.()
  }

  const handleSettingsClick = () => {
    setIsOpen(false)
    onSettingsClick?.()
  }

  const handleSignOut = () => {
    setIsOpen(false)
    onSignOut()
  }

  const getUserInitials = () => {
    if (user.name) {
      return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (user.email) {
      return user.email[0].toUpperCase()
    }
    return 'U'
  }

  const getUserDisplayName = () => {
    return user.name || user.email || 'User'
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="ghost"
        className="relative h-8 w-8 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={getUserDisplayName()}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            {getUserInitials()}
          </div>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <Card className="absolute right-0 top-10 z-20 w-56">
            <CardContent className="p-2">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{getUserDisplayName()}</p>
                {user.email && (
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                )}
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-1">
                {onProfileClick && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </Button>
                )}
                
                {onSettingsClick && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={handleSettingsClick}
                  >
                    Settings
                  </Button>
                )}
                
                <Separator className="my-2" />
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-red-600 hover:text-red-600 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
