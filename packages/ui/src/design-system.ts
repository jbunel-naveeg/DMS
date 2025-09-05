// Naveeg Design System Configuration
// Based on Brand Design.md for enterprise-grade SaaS look

export const designSystem = {
  colors: {
    // Primary Colors
    ink: '#0b0d10',
    inkLight: '#ffffff',
    surface: '#ffffff',
    surfaceDark: '#0f1419',
    
    // Accent Colors
    accentGreen: '#10B981',
    accentBlue: '#3B82F6',
    accentPurple: '#7C3AED',
    
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
    mutedLight: '#a1a9b8',
  },
  
  gradients: {
    // Primary Gradients
    main: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #06B6D4 100%)',
    mainDark: 'linear-gradient(135deg, #6D28D9 0%, #2563EB 50%, #0891B2 100%)',
    
    // Pricing Card Gradients
    trial: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    starter: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    pro: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    
    // Background Gradients
    primaryBg: `
      radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,.10), transparent 60%),
      radial-gradient(900px 500px at 90% -20%, rgba(59,130,246,.08), transparent 60%),
      linear-gradient(180deg,#FDFCFB 0%,#F3F7FA 100%)
    `,
    secondaryBg: 'linear-gradient(180deg,#FAFBFC 0%,#F1F5F9 100%)',
    tertiaryBg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    
    // Dark Theme Backgrounds
    primaryBgDark: `
      radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,.20), transparent 60%),
      radial-gradient(900px 500px at 90% -20%, rgba(59,130,246,.15), transparent 60%),
      linear-gradient(180deg, #0f1419 0%, #1a202c 100%)
    `,
    secondaryBgDark: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
    tertiaryBgDark: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  },
  
  typography: {
    fontFamily: {
      heading: ['Sansation', 'sans-serif'],
      body: ['Lato', 'sans-serif'],
    },
    
    fontSize: {
      h1: {
        mobile: '3rem', // 48px
        desktop: '3.75rem', // 60px
      },
      h2: {
        mobile: '1.875rem', // 30px
        desktop: '2.25rem', // 36px
      },
      body: {
        mobile: '1rem', // 16px
        desktop: '1.125rem', // 18px
      },
      kicker: '0.75rem', // 12px
    },
    
    fontWeight: {
      light: '300',
      regular: '400',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    letterSpacing: {
      tight: '-0.025em',
      wide: '0.18em',
    },
  },
  
  spacing: {
    sectionPadding: {
      mobile: '6rem', // 96px
      desktop: '8rem', // 128px
    },
    buttonPadding: '2rem', // 32px
    containerMaxWidth: '75rem', // 1200px
  },
  
  borderRadius: {
    default: '1.2rem', // 19.2px
    button: '0.5rem', // 8px
  },
  
  shadows: {
    primary: '0 20px 60px rgba(10, 12, 16, 0.10)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    button: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  
  iconColors: {
    primary: '#374151',
    secondary: '#6B7280',
    accent: '#7C3AED',
  },
}

export default designSystem
