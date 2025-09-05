/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sansation': ['Sansation', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      colors: {
        // Naveeg Brand Colors
        ink: '#0b0d10',
        'ink-light': '#ffffff',
        surface: '#ffffff',
        'surface-dark': '#0f1419',
        
        // Accent Colors
        'accent-green': '#10B981',
        'accent-blue': '#3B82F6',
        'accent-purple': '#7C3AED',
        
        // Neutral Palette
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        
        // Muted Text Colors
        muted: '#5b6572',
        'muted-light': '#a1a9b8',
        
        // Icon Colors
        'icon-primary': '#374151',
        'icon-secondary': '#6B7280',
        'icon-accent': '#7C3AED',
        
        // Legacy shadcn colors for compatibility
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #06B6D4 100%)',
        'gradient-main-dark': 'linear-gradient(135deg, #6D28D9 0%, #2563EB 50%, #0891B2 100%)',
        'gradient-trial': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-starter': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        'gradient-pro': 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
        'gradient-primary-bg': `
          radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,.10), transparent 60%),
          radial-gradient(900px 500px at 90% -20%, rgba(59,130,246,.08), transparent 60%),
          linear-gradient(180deg,#FDFCFB 0%,#F3F7FA 100%)
        `,
        'gradient-secondary-bg': 'linear-gradient(180deg,#FAFBFC 0%,#F1F5F9 100%)',
        'gradient-tertiary-bg': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      },
      fontSize: {
        'h1-mobile': '3rem',
        'h1-desktop': '3.75rem',
        'h2-mobile': '1.875rem',
        'h2-desktop': '2.25rem',
        'body-mobile': '1rem',
        'body-desktop': '1.125rem',
        'kicker': '0.75rem',
      },
      letterSpacing: {
        'tight': '-0.025em',
        'wide': '0.18em',
      },
      borderRadius: {
        'brand': '1.2rem',
        'button': '0.5rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'brand': '0 20px 60px rgba(10, 12, 16, 0.10)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      maxWidth: {
        'container': '75rem',
        'content': '68ch',
      },
      spacing: {
        'section-mobile': '6rem',
        'section-desktop': '8rem',
        'button-padding': '2rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
