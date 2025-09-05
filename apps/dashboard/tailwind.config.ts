import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sansation: ['Sansation', 'sans-serif'],
  			lato: ['Lato', 'sans-serif'],
  		},
  		colors: {
  			// Naveeg Brand Colors
  			ink: 'hsl(var(--ink))',
  			'ink-light': 'hsl(var(--ink-light))',
  			surface: 'hsl(var(--surface))',
  			'accent-blue': 'hsl(var(--accent-blue))',
  			'accent-purple': 'hsl(var(--accent-purple))',
  			'accent-green': 'hsl(var(--accent-green))',
  			'accent-yellow': 'hsl(var(--accent-yellow))',
  			'accent-red': 'hsl(var(--accent-red))',
  			neutral: {
  				50: 'hsl(var(--neutral-50))',
  				100: 'hsl(var(--neutral-100))',
  				200: 'hsl(var(--neutral-200))',
  				300: 'hsl(var(--neutral-300))',
  				400: 'hsl(var(--neutral-400))',
  				500: 'hsl(var(--neutral-500))',
  				600: 'hsl(var(--neutral-600))',
  				700: 'hsl(var(--neutral-700))',
  				800: 'hsl(var(--neutral-800))',
  				900: 'hsl(var(--neutral-900))',
  			},
  			muted: 'hsl(var(--muted))',
  			icon: 'hsl(var(--icon))',
  			
  			// Legacy shadcn/ui colors for compatibility
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-main': 'var(--gradient-main)',
  			'gradient-starter': 'var(--gradient-starter)',
  			'gradient-pro': 'var(--gradient-pro)',
  			'gradient-trial': 'var(--gradient-trial)',
  			'gradient-pricing': 'var(--gradient-pricing)',
  			'gradient-background': 'var(--gradient-background)',
  			'gradient-primary-bg': 'var(--gradient-primary-bg)',
  		},
  		fontSize: {
  			'h1-mobile': 'var(--h1-mobile)',
  			'h1-desktop': 'var(--h1-desktop)',
  			'h2-mobile': 'var(--h2-mobile)',
  			'h2-desktop': 'var(--h2-desktop)',
  			'h3-mobile': 'var(--h3-mobile)',
  			'h3-desktop': 'var(--h3-desktop)',
  			'h4-mobile': 'var(--h4-mobile)',
  			'h4-desktop': 'var(--h4-desktop)',
  			'body-mobile': 'var(--body-mobile)',
  			'body-desktop': 'var(--body-desktop)',
  			'kicker': 'var(--kicker)',
  		},
  		letterSpacing: {
  			tight: '-0.025em',
  			wide: '0.025em',
  		},
  		borderRadius: {
  			brand: 'var(--brand)',
  			button: 'var(--button)',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			brand: 'var(--brand)',
  			card: 'var(--card)',
  			'card-hover': 'var(--card-hover)',
  			button: 'var(--button)',
  		},
  		maxWidth: {
  			container: 'var(--container)',
  			content: 'var(--content)',
  		},
  		spacing: {
  			'section-mobile': 'var(--section-mobile)',
  			'section-desktop': 'var(--section-desktop)',
  			'button-padding': 'var(--button-padding)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
