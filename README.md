# Naveeg - Automated WordPress Site Creation Platform

A comprehensive SaaS platform for automated WordPress site creation, designed specifically for European businesses. Built with Next.js, Supabase, and modern web technologies.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Vercel CLI (`npm i -g vercel`)
- Supabase account
- Stripe account
- 10Web account

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jbunel-naveeg/DMS.git
   cd DMS
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development servers**:
   ```bash
   npm run dev
   ```

5. **Access the applications**:
   - Marketing site: http://localhost:3000
   - Dashboard app: http://localhost:3001

## 📁 Project Structure

```
DMS/
├── apps/
│   ├── marketing/          # Marketing website (naveeg.com)
│   └── dashboard/          # User dashboard (app.naveeg.com)
├── packages/
│   ├── ui/                 # Shared UI components
│   └── lib/                # Shared utilities and services
├── supabase/               # Database schema and Edge Functions
├── n8n/                    # Automation workflows
└── docs/                   # Documentation
```

## 🛠️ Available Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all packages
- `npm run clean` - Clean build artifacts
- `npm run test` - Run tests
- `npm run deploy` - Deploy to Vercel
- `npm run setup-production` - Set up production environment

## 🚀 Deployment

### Automatic Deployment
```bash
npm run setup-production
npm run deploy
```

### Manual Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🏗️ Architecture

### Frontend
- **Marketing Site**: Next.js 14 with App Router
- **Dashboard App**: Next.js 14 with App Router
- **UI Library**: Custom components with Tailwind CSS
- **State Management**: React hooks and context

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Payments**: Stripe integration
- **Hosting**: 10Web WordPress hosting
- **AI**: OpenAI GPT integration
- **Analytics**: Google Analytics & Search Console

### Infrastructure
- **Deployment**: Vercel
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics
- **Automation**: N8N workflows

## 🔧 Configuration

### Environment Variables

#### Marketing Site
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

#### Dashboard App
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `TENWEB_API_KEY` - 10Web API key
- `OPENAI_API_KEY` - OpenAI API key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `N8N_WEBHOOK_URL` - N8N webhook URL (optional)
- `SLACK_WEBHOOK_URL` - Slack webhook URL (optional)

### Database Setup

1. **Create Supabase project**
2. **Run migrations**:
   ```bash
   cd supabase
   supabase db push
   ```
3. **Deploy Edge Functions**:
   ```bash
   supabase functions deploy
   ```

## 📊 Features

### Core Features
- ✅ AI-powered WordPress site creation
- ✅ Custom domain management
- ✅ Team collaboration
- ✅ Analytics integration
- ✅ GDPR compliance
- ✅ Multi-tenant architecture
- ✅ Stripe payment processing
- ✅ 10Web hosting integration

### Advanced Features
- ✅ N8N automation workflows
- ✅ Google OAuth integration
- ✅ OpenAI chatbot
- ✅ FAQ management
- ✅ Team member management
- ✅ Feature gating system
- ✅ Usage tracking and limits

## 🔒 Security

- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: Row-Level Security (RLS) policies
- **Data Protection**: GDPR compliant data handling
- **HTTPS**: SSL certificates for all domains
- **CORS**: Configured for security
- **Rate Limiting**: API rate limiting implemented

## 📈 Performance

- **Static Generation**: Optimized for performance
- **CDN**: Global content delivery
- **Image Optimization**: Next.js image optimization
- **Bundle Splitting**: Optimized JavaScript bundles
- **Caching**: Strategic caching implementation

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific package
npm run test -- --filter=@naveeg/dashboard
```

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Contributing Guide](./docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Changelog

### v1.0.0 (2024-01-01)
- Initial release
- Core platform functionality
- Marketing site
- Dashboard application
- Payment processing
- Team collaboration
- AI integration

---

**Naveeg** - Making WordPress site creation simple for European businesses.