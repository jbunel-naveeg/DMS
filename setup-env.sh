#!/bin/bash

# Setup script for creating environment files
echo "Setting up environment files for Naveeg SaaS platform..."

# Create dashboard .env.local
cat > apps/dashboard/.env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# 10Web Configuration
TENWEB_API_KEY=your_tenweb_api_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# n8n Configuration
N8N_WEBHOOK_URL=your_n8n_webhook_url_here

# Google Integrations
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Vercel Configuration
VERCEL_URL=your_vercel_url_here
EOF

# Create marketing .env.local
cat > apps/marketing/.env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Vercel Configuration
VERCEL_URL=your_vercel_url_here
EOF

echo "Environment files created successfully!"
echo ""
echo "Next steps:"
echo "1. Update the values in apps/dashboard/.env.local with your actual credentials"
echo "2. Update the values in apps/marketing/.env.local with your actual credentials"
echo "3. Run 'npm run dev' to start the development servers"
echo ""
echo "Required credentials:"
echo "- Supabase URL and Anon Key (from your Supabase project settings)"
echo "- Stripe keys (from your Stripe dashboard)"
echo "- 10Web API key (from your 10Web account)"
echo "- OpenAI API key (from your OpenAI account)"
echo "- Google OAuth credentials (from Google Cloud Console)"
echo "- n8n webhook URL (if using n8n automation)"
