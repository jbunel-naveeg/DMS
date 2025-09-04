#!/bin/bash

# Naveeg Deployment Script
echo "🚀 Deploying Naveeg to Vercel..."

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

# Build all packages first
echo "📦 Building packages..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful"

# Deploy marketing site
echo "🌐 Deploying marketing site..."
cd apps/marketing
vercel --prod --name naveeg-marketing
MARKETING_URL=$(vercel ls | grep naveeg-marketing | head -1 | awk '{print $2}')
echo "✅ Marketing site deployed to: https://$MARKETING_URL"

# Deploy dashboard app
echo "📊 Deploying dashboard app..."
cd ../dashboard
vercel --prod --name naveeg-dashboard
DASHBOARD_URL=$(vercel ls | grep naveeg-dashboard | head -1 | awk '{print $2}')
echo "✅ Dashboard app deployed to: https://$DASHBOARD_URL"

cd ../..

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Deployment URLs:"
echo "   Marketing: https://$MARKETING_URL"
echo "   Dashboard: https://$DASHBOARD_URL"
echo ""
echo "📝 Next steps:"
echo "   1. Configure custom domains in Vercel dashboard"
echo "   2. Set up environment variables in Vercel"
echo "   3. Configure DNS records"
echo "   4. Test both applications"
echo ""
echo "🔧 Management commands:"
echo "   View deployments: vercel ls"
echo "   View logs: vercel logs"
echo "   Remove deployment: vercel remove"
