# Naveeg Environment Configuration Guide

This guide provides comprehensive documentation for configuring all environment variables across the Naveeg platform.

## 📁 Environment Files Structure

```
DMS/
├── .env.local                          # Root environment (development)
├── env.comprehensive.example           # Complete environment template
├── apps/
│   ├── marketing/
│   │   ├── .env.local                 # Marketing app environment
│   │   └── env.example                # Marketing app template
│   └── dashboard/
│       ├── .env.local                 # Dashboard app environment
│       └── env.example                # Dashboard app template
├── n8n/
│   ├── .env                           # N8N environment
│   └── env.comprehensive.example      # N8N template
└── supabase/
    └── .env                           # Supabase local development
```

## 🚀 Quick Setup

### 1. Automatic Setup
```bash
# Run the environment setup script
./setup-env.sh

# Validate your configuration
node validate-env.js
```

### 2. Manual Setup
```bash
# Copy environment templates
cp env.comprehensive.example .env.local
cp apps/marketing/env.example apps/marketing/.env.local
cp apps/dashboard/env.example apps/dashboard/.env.local
cp n8n/env.comprehensive.example n8n/.env
```

## 🔧 Environment Variables by Service

### Core Application

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_APP_URL` | Dashboard app URL | Yes | `https://app.naveeg.com` |
| `NEXT_PUBLIC_MARKETING_URL` | Marketing site URL | Yes | `https://naveeg.com` |
| `NODE_ENV` | Node environment | Yes | `development` or `production` |
| `NEXT_PUBLIC_VERCEL_ENV` | Vercel environment | Yes | `development` or `production` |

### Supabase Configuration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_DB_URL` | Database connection URL | Yes | `postgresql://postgres:password@db...` |
| `SUPABASE_FUNCTIONS_URL` | Edge Functions URL | Yes | `https://your-project.supabase.co/functions/v1` |

### Stripe Configuration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes | `sk_test_...` or `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes | `pk_test_...` or `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook secret | Yes | `whsec_...` |
| `STRIPE_STARTER_PRICE_ID` | Starter plan price ID | Yes | `price_...` |
| `STRIPE_PRO_PRICE_ID` | Pro plan price ID | Yes | `price_...` |

### 10Web API Configuration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `TENWEB_API_KEY` | 10Web API key | Yes | `your_10web_api_key` |
| `TENWEB_API_URL` | 10Web API URL | Yes | `https://api.10web.io` |
| `TENWEB_WEBHOOK_SECRET` | Webhook secret | No | `your_webhook_secret` |
| `TENWEB_DEFAULT_TEMPLATE` | Default template | No | `business` |
| `TENWEB_DEFAULT_PLAN` | Default plan | No | `basic` |

### OpenAI Configuration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key | Yes | `sk-...` |
| `OPENAI_ORGANIZATION` | Organization ID | No | `org-...` |
| `OPENAI_MODEL` | Default model | No | `gpt-4` |
| `OPENAI_MAX_TOKENS` | Max tokens | No | `2000` |
| `OPENAI_TEMPERATURE` | Temperature | No | `0.7` |

### Google OAuth Configuration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `GOOGLE_CLIENT_ID` | OAuth client ID | Yes | `your_google_client_id` |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret | Yes | `your_google_client_secret` |
| `GOOGLE_REDIRECT_URI` | Redirect URI | Yes | `https://app.naveeg.com/api/google/oauth/callback` |
| `GOOGLE_ANALYTICS_PROPERTY_ID` | GA property ID | No | `your_ga_property_id` |
| `GOOGLE_ANALYTICS_MEASUREMENT_ID` | GA measurement ID | No | `G-XXXXXXXXXX` |

### N8N Configuration (Optional)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `N8N_WEBHOOK_URL` | N8N instance URL | No | `https://your_n8n_instance.com` |
| `N8N_BASIC_AUTH_USER` | Basic auth username | No | `admin` |
| `N8N_BASIC_AUTH_PASSWORD` | Basic auth password | No | `your_password` |
| `N8N_ENCRYPTION_KEY` | Encryption key | No | `your_32_character_key` |

### Slack Configuration (Optional)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `SLACK_WEBHOOK_URL` | Slack webhook URL | No | `https://hooks.slack.com/services/...` |
| `SLACK_CHANNEL` | Default channel | No | `#naveeg-notifications` |
| `SLACK_BOT_TOKEN` | Bot token | No | `xoxb-...` |

## 🔐 Security Considerations

### Environment Variable Security

1. **Never commit sensitive keys to version control**
2. **Use different keys for development and production**
3. **Rotate keys regularly**
4. **Use environment-specific configurations**

### Key Management

1. **Supabase Keys**:
   - Anon key: Safe for client-side use
   - Service role key: Server-side only, never expose to client

2. **Stripe Keys**:
   - Publishable key: Safe for client-side use
   - Secret key: Server-side only, never expose to client

3. **API Keys**:
   - All API keys should be server-side only
   - Use environment variables, not hardcoded values

## 🏗️ Service Setup Instructions

### Supabase Setup

1. **Create a Supabase project**:
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Create new project
   supabase projects create naveeg
   ```

2. **Get your project credentials**:
   - Go to your Supabase dashboard
   - Navigate to Settings > API
   - Copy the URL and anon key
   - Copy the service role key (keep this secret!)

3. **Set up the database**:
   ```bash
   cd supabase
   supabase db push
   supabase functions deploy
   ```

### Stripe Setup

1. **Create a Stripe account**:
   - Go to [stripe.com](https://stripe.com)
   - Create an account
   - Complete account verification

2. **Get your API keys**:
   - Go to Developers > API keys
   - Copy the publishable key and secret key
   - Use test keys for development

3. **Set up webhooks**:
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `customer.subscription.*`, `invoice.*`
   - Copy the webhook secret

4. **Create products and prices**:
   - Go to Products
   - Create "Starter" and "Pro" products
   - Create recurring prices for each
   - Copy the price IDs

### 10Web Setup

1. **Create a 10Web account**:
   - Go to [10web.io](https://10web.io)
   - Sign up for an account
   - Complete account verification

2. **Get your API key**:
   - Go to Account > API
   - Generate a new API key
   - Copy the key (keep this secret!)

### OpenAI Setup

1. **Create an OpenAI account**:
   - Go to [openai.com](https://openai.com)
   - Sign up for an account
   - Add payment method

2. **Get your API key**:
   - Go to API > API keys
   - Create a new secret key
   - Copy the key (keep this secret!)

### Google OAuth Setup

1. **Create a Google Cloud project**:
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project
   - Enable the Google+ API

2. **Create OAuth credentials**:
   - Go to APIs & Services > Credentials
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URIs
   - Copy the client ID and secret

## 🧪 Testing Your Configuration

### 1. Validate Environment Variables
```bash
# Run the validation script
node validate-env.js
```

### 2. Test Individual Services
```bash
# Test Supabase connection
npm run test:supabase

# Test Stripe connection
npm run test:stripe

# Test 10Web connection
npm run test:tenweb
```

### 3. Run the Application
```bash
# Start development servers
npm run dev

# Check health endpoints
curl http://localhost:3000/health
curl http://localhost:3001/health
```

## 🚀 Production Deployment

### 1. Set Production Environment Variables
```bash
# Use production values
NODE_ENV=production
NEXT_PUBLIC_VERCEL_ENV=production
NEXT_PUBLIC_APP_URL=https://app.naveeg.com
NEXT_PUBLIC_MARKETING_URL=https://naveeg.com
```

### 2. Configure Vercel Environment Variables
```bash
# Set environment variables in Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add STRIPE_SECRET_KEY
# ... add all required variables
```

### 3. Deploy
```bash
# Deploy to production
npm run deploy
```

## 🔍 Troubleshooting

### Common Issues

1. **"supabaseUrl is required" error**:
   - Check that `NEXT_PUBLIC_SUPABASE_URL` is set
   - Ensure the URL is valid and accessible

2. **Stripe webhook failures**:
   - Verify webhook secret is correct
   - Check that webhook endpoint is accessible
   - Ensure all required events are selected

3. **10Web API errors**:
   - Verify API key is correct
   - Check API key permissions
   - Ensure account is active

4. **OpenAI API errors**:
   - Verify API key is correct
   - Check account has sufficient credits
   - Ensure API key has proper permissions

### Debug Commands

```bash
# Check environment variables
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"

# Test API connections
curl -H "Authorization: Bearer $SUPABASE_ANON_KEY" $SUPABASE_URL/rest/v1/

# Validate configuration
node validate-env.js --verbose
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [10Web API Documentation](https://10web.io/api-documentation)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [N8N Documentation](https://docs.n8n.io)

## 🆘 Support

If you encounter issues with environment configuration:

1. Check the troubleshooting section above
2. Run the validation script: `node validate-env.js`
3. Check the logs for specific error messages
4. Create an issue in the repository
5. Contact the development team

---

**Remember**: Never commit sensitive environment variables to version control. Always use environment files and keep your keys secure!
