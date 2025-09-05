import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'default' | 'lg' | 'xl'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            // Primary - Black background, white text (enterprise style)
            'bg-ink text-ink-light hover:bg-neutral-800 shadow-button': variant === 'primary',
            
            // Secondary - White background, dark text with border
            'bg-surface border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400': variant === 'secondary',
            
            // Outline - Transparent background with border
            'border-2 border-ink text-ink hover:bg-ink hover:text-ink-light': variant === 'outline',
            
            // Ghost - Transparent background, no border
            'text-ink hover:bg-neutral-100': variant === 'ghost',
            
            // Gradient - Main brand gradient
            'bg-gradient-main text-ink-light hover:opacity-90 shadow-button': variant === 'gradient',
          },
          {
            'h-8 px-4 text-sm rounded-button': size === 'sm',
            'h-12 px-button-padding text-base rounded-button': size === 'default',
            'h-14 px-8 text-lg rounded-button': size === 'lg',
            'h-16 px-10 text-xl rounded-button': size === 'xl',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
