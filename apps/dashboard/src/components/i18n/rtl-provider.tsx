"use client"

import React, { useEffect } from 'react'
import { useRTL } from '@naveeg/lib'

interface RTLProviderProps {
  children: React.ReactNode
}

export function RTLProvider({ children }: RTLProviderProps) {
  const { isRTL, direction } = useRTL()

  useEffect(() => {
    // Update document direction
    document.documentElement.dir = direction
    document.documentElement.setAttribute('data-rtl', isRTL.toString())
    
    // Update body class for styling
    document.body.classList.toggle('rtl', isRTL)
    document.body.classList.toggle('ltr', !isRTL)
  }, [isRTL, direction])

  return (
    <div 
      dir={direction}
      className={`${isRTL ? 'rtl' : 'ltr'}`}
      data-rtl={isRTL}
    >
      {children}
    </div>
  )
}
