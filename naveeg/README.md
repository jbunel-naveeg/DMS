Naveeg SaaS MVP – Next.js 14 + Supabase + Stripe + 10Web

## Getting Started

1) Copy `.env.example` to `.env.local` and fill values:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PUBLIC_URL=http://localhost:3000

# 10Web
TENWEB_API_BASE=https://api.10web.io
TENWEB_API_KEY=

# n8n (optional)
N8N_WEBHOOK_URL=
```

2) Install deps and run dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see the app.

Key routes:
- Marketing: `/`, `/pricing`, `/legal/privacy`, `/legal/terms`
- Onboarding: `/onboarding`
- Dashboard: `/dashboard`, `/dashboard/billing`, `/dashboard/analytics`, `/dashboard/domains`, `/dashboard/pages`
- API: `/api/tenweb/generate`, `/api/stripe/webhook`, `/api/n8n/hook`

## Database

Migrations are in `supabase/migrations`. Apply via Supabase CLI:

```bash
supabase start
supabase db reset
```

## Stripe Webhook

Run a local webhook forwarder and set the secret:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Tests

```bash
npx playwright install --with-deps
# Add tests under tests/ and run them with Playwright
```

Learn more: https://nextjs.org/docs
