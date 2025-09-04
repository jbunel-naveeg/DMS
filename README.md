# Naveeg - Automated WordPress Site Creation SaaS Platform

A comprehensive monorepo SaaS platform that automates WordPress site creation and management for solopreneurs and SMEs.

## 🏗️ Architecture

This is a monorepo containing multiple applications and shared packages:

### Applications

- **`/apps/marketing`** - Public marketing website (naveeg.com)
- **`/apps/dashboard`** - User dashboard application (app.naveeg.com)

### Packages

- **`/packages/ui`** - Shared design system with Tailwind CSS + shadcn/ui
- **`/packages/lib`** - Shared TypeScript utilities and API clients

### Backend

- **`/supabase`** - Database schema, migrations, and Edge Functions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+
- Supabase CLI
- Docker (for local Supabase)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd naveeg
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Fill in your environment variables
   ```

3. **Start Supabase locally:**
   ```bash
   npx supabase start
   ```

4. **Run database migrations:**
   ```bash
   npx supabase db reset
   ```

5. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start:
- Marketing site: http://localhost:3000
- Dashboard app: http://localhost:3001
- Supabase Studio: http://localhost:54323

## 📁 Project Structure

```
naveeg/
├── apps/
│   ├── marketing/          # Marketing website
│   │   ├── src/
│   │   │   ├── app/        # Next.js App Router pages
│   │   │   └── components/ # Marketing-specific components
│   │   └── package.json
│   └── dashboard/          # User dashboard
│       ├── src/
│       │   ├── app/        # Dashboard pages
│       │   ├── lib/        # Dashboard-specific utilities
│       │   └── components/ # Dashboard components
│       └── package.json
├── packages/
│   ├── ui/                 # Shared UI components
│   │   ├── src/
│   │   │   ├── components/ # Reusable components
│   │   │   └── lib/        # UI utilities
│   │   └── package.json
│   └── lib/                # Shared utilities
│       ├── src/
│       │   ├── supabase/   # Supabase client & RLS
│       │   ├── stripe/     # Stripe integration
│       │   ├── tenweb/     # 10Web API client
│       │   ├── types/      # TypeScript types
│       │   └── validations/ # Zod schemas
│       └── package.json
├── supabase/
│   ├── migrations/         # Database migrations
│   ├── functions/          # Edge Functions
│   └── config.toml         # Supabase configuration
├── package.json            # Root package.json
├── turbo.json             # Turborepo configuration
└── README.md
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all applications
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all packages
- `npm run clean` - Clean all build artifacts

### Working with Packages

Each package can be developed independently:

```bash
# Work on UI package
cd packages/ui
npm run dev

# Work on dashboard
cd apps/dashboard
npm run dev
```

## 🗄️ Database Schema

The platform uses a multi-tenant architecture with the following key tables:

- **`users`** - User profiles (extends Supabase Auth)
- **`websites`** - WordPress sites created via 10Web
- **`plans`** - Subscription plans (Trial, Starter, Pro)
- **`entitlements`** - Feature flags per website
- **`team_members`** - Collaboration (Admin/Editor roles)
- **`domains`** - Custom domain management
- **`faq_docs`** - AI chatbot knowledge base
- **`leads`** - Contact form submissions
- **`settings`** - Key-value configuration store

## 🔐 Security

- **Row Level Security (RLS)** - Multi-tenant data isolation
- **Role-based permissions** - Admin vs Editor access control
- **Plan-based feature gating** - Trial/Starter/Pro restrictions
- **JWT authentication** - Supabase Auth integration

## 🌍 Features

### Core Features
- ✅ User authentication (email/password + Google OAuth)
- ✅ 7-day free trial with full Pro features
- ✅ Automated WordPress site creation via 10Web
- ✅ Trial subdomain setup (site.naveeg.online)
- ✅ Stripe subscription billing (Starter €49, Pro €99)
- ✅ Custom domain connection (Pro only)
- ✅ Team collaboration (Pro only)

### Advanced Features
- 🔄 AI-powered FAQ chatbot
- 🔄 Google Analytics integration
- 🔄 n8n workflow automation
- 🔄 Lead management system
- 🔄 Multi-language support (i18n)

## 🚀 Deployment

### Vercel (Recommended)

1. **Set up Vercel projects:**
   - Marketing: `naveeg.com`
   - Dashboard: `app.naveeg.com`

2. **Configure environment variables** in each Vercel project

3. **Deploy:**
   ```bash
   npm run build
   # Deploy via Vercel CLI or GitHub integration
   ```

### Supabase

1. **Deploy Edge Functions:**
   ```bash
   npx supabase functions deploy
   ```

2. **Run migrations:**
   ```bash
   npx supabase db push
   ```

## 📝 Environment Variables

See `env.example` for all required environment variables.

Key variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `STRIPE_SECRET_KEY` - Stripe API key
- `TENWEB_API_KEY` - 10Web API key
- `OPENAI_API_KEY` - OpenAI API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support, email support@naveeg.com or visit our documentation.
