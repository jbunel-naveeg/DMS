# Naveeg Deployment Guide

This guide covers deploying the Naveeg platform to Vercel, including both the marketing site and dashboard application.

## Prerequisites

### Required Tools
- [Vercel CLI](https://vercel.com/cli) installed globally
- [Node.js](https://nodejs.org/) 18+ installed
- [Git](https://git-scm.com/) for version control

### Required Accounts
- [Vercel Account](https://vercel.com) (free tier available)
- [Supabase Project](https://supabase.com) with database and Edge Functions deployed
- [Stripe Account](https://stripe.com) for payment processing
- [10Web Account](https://10web.io) for WordPress hosting
- [OpenAI Account](https://openai.com) for AI features
- [Google Cloud Console](https://console.cloud.google.com) for OAuth

## Quick Start

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Both Apps
```bash
./deploy.sh
```

## Manual Deployment

### Marketing Site Deployment

1. **Navigate to marketing app**:
   ```bash
   cd apps/marketing
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Configure environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Dashboard App Deployment

1. **Navigate to dashboard app**:
   ```bash
   cd apps/dashboard
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Configure environment variables** in Vercel dashboard (see Environment Variables section below)

## Environment Variables

### Marketing Site
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

### Dashboard App
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `TENWEB_API_KEY` | 10Web API key | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `N8N_WEBHOOK_URL` | N8N webhook URL | No |
| `SLACK_WEBHOOK_URL` | Slack webhook URL | No |

## Domain Configuration

### 1. Custom Domains
- **Marketing Site**: `naveeg.com` and `www.naveeg.com`
- **Dashboard App**: `app.naveeg.com`

### 2. DNS Setup
Configure your DNS provider with the following records:

```
Type: A
Name: @
Value: 76.76.19.61 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

### 3. Vercel Domain Configuration
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domains
5. Configure SSL certificates (automatic with Vercel)

## Supabase Configuration

### 1. Deploy Edge Functions
```bash
cd supabase
supabase functions deploy
```

### 2. Configure RLS Policies
```bash
supabase db push
```

### 3. Set up Webhooks
- Configure Stripe webhook endpoint: `https://your-dashboard-url.vercel.app/api/stripe/webhook`
- Configure 10Web webhook endpoints as needed

## Stripe Configuration

### 1. Webhook Endpoints
Add the following webhook endpoint in Stripe dashboard:
```
https://your-dashboard-url.vercel.app/api/stripe/webhook
```

### 2. Required Events
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### 3. Test Mode
- Use test keys for development
- Switch to live keys for production

## 10Web Configuration

### 1. API Key
- Generate API key in 10Web dashboard
- Add to environment variables

### 2. Webhook Configuration
- Configure webhooks for site provisioning
- Set up domain management webhooks

## Google OAuth Configuration

### 1. OAuth Consent Screen
- Configure OAuth consent screen in Google Cloud Console
- Add authorized domains

### 2. Redirect URIs
Add the following redirect URIs:
```
https://your-dashboard-url.vercel.app/api/google/oauth/callback
```

## Monitoring and Maintenance

### 1. Vercel Analytics
- Enable Vercel Analytics for performance monitoring
- Set up alerts for errors and performance issues

### 2. Logs
```bash
# View deployment logs
vercel logs

# View function logs
vercel logs --follow
```

### 3. Health Checks
- Marketing site: `https://naveeg.com/health`
- Dashboard app: `https://app.naveeg.com/health`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set correctly
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Runtime Errors**
   - Check Vercel function logs
   - Verify API endpoints are working
   - Check database connections

3. **Domain Issues**
   - Verify DNS propagation
   - Check SSL certificate status
   - Ensure domain is added to Vercel

### Debug Commands

```bash
# Check deployment status
vercel ls

# View specific deployment
vercel inspect [deployment-url]

# Check environment variables
vercel env ls

# View function logs
vercel logs [function-name]
```

## Security Considerations

### 1. Environment Variables
- Never commit sensitive keys to version control
- Use Vercel's environment variable system
- Rotate keys regularly

### 2. CORS Configuration
- Configure CORS for API endpoints
- Restrict origins to your domains only

### 3. Rate Limiting
- Implement rate limiting for API endpoints
- Use Vercel's built-in rate limiting

## Performance Optimization

### 1. Build Optimization
- Use Vercel's build cache
- Optimize bundle sizes
- Enable compression

### 2. CDN
- Vercel automatically provides global CDN
- Optimize images and assets
- Use appropriate caching headers

### 3. Database Optimization
- Use connection pooling
- Optimize queries
- Monitor database performance

## Backup and Recovery

### 1. Database Backups
- Supabase provides automatic backups
- Set up additional backup strategies if needed

### 2. Code Backups
- Use Git for version control
- Tag releases for easy rollback

### 3. Environment Backup
- Document all environment variables
- Keep configuration files in version control

## Scaling Considerations

### 1. Vercel Limits
- Free tier: 100GB bandwidth, 100GB-hours function execution
- Pro tier: 1TB bandwidth, 1000GB-hours function execution

### 2. Database Scaling
- Supabase scales automatically
- Monitor usage and upgrade as needed

### 3. Function Scaling
- Vercel functions scale automatically
- Monitor cold start times

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Contact

For deployment issues or questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above
