#!/bin/bash

# Naveeg Production Setup Script
echo "🚀 Setting up Naveeg for production deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Please install it first:"
    echo "   npm i -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please run 'vercel login' first."
    exit 1
fi

echo "✅ Vercel CLI is ready"

# Create production environment files
echo "📝 Creating production environment files..."

# Marketing app .env.local
cat > apps/marketing/.env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=\${NEXT_PUBLIC_SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=\${NEXT_PUBLIC_SUPABASE_ANON_KEY}
EOF

# Dashboard app .env.local
cat > apps/dashboard/.env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=\${NEXT_PUBLIC_SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=\${NEXT_PUBLIC_SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=\${SUPABASE_SERVICE_ROLE_KEY}
STRIPE_SECRET_KEY=\${STRIPE_SECRET_KEY}
STRIPE_PUBLISHABLE_KEY=\${STRIPE_PUBLISHABLE_KEY}
STRIPE_WEBHOOK_SECRET=\${STRIPE_WEBHOOK_SECRET}
TENWEB_API_KEY=\${TENWEB_API_KEY}
OPENAI_API_KEY=\${OPENAI_API_KEY}
GOOGLE_CLIENT_ID=\${GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=\${GOOGLE_CLIENT_SECRET}
N8N_WEBHOOK_URL=\${N8N_WEBHOOK_URL}
SLACK_WEBHOOK_URL=\${SLACK_WEBHOOK_URL}
NEXT_PUBLIC_APP_URL=\${NEXT_PUBLIC_APP_URL}
NEXT_PUBLIC_MARKETING_URL=\${NEXT_PUBLIC_MARKETING_URL}
NEXT_PUBLIC_TRIAL_DOMAIN=\${NEXT_PUBLIC_TRIAL_DOMAIN}
NEXT_PUBLIC_APP_DOMAIN=\${NEXT_PUBLIC_APP_DOMAIN}
EOF

echo "✅ Environment files created"

# Test builds
echo "🔨 Testing builds..."

# Build marketing app
echo "Building marketing app..."
cd apps/marketing
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Marketing app build failed"
    exit 1
fi
echo "✅ Marketing app build successful"

# Build dashboard app
echo "Building dashboard app..."
cd ../dashboard
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Dashboard app build failed"
    exit 1
fi
echo "✅ Dashboard app build successful"

cd ../..

echo ""
echo "🎉 Production setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Fill in your production environment variables in the .env.local files"
echo "   2. Run './deploy.sh' to deploy both apps to Vercel"
echo "   3. Configure custom domains in Vercel dashboard"
echo "   4. Set up environment variables in Vercel dashboard"
echo "   5. Configure DNS records for your domains"
echo "   6. Test both applications"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
