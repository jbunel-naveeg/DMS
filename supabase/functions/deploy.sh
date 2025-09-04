#!/bin/bash

# Deploy all Supabase Edge Functions
# This script deploys all Edge Functions to Supabase

echo "🚀 Deploying Supabase Edge Functions..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "   npm install -g supabase"
    exit 1
fi

# Check if user is logged in
if ! supabase status &> /dev/null; then
    echo "❌ Not logged in to Supabase. Please run:"
    echo "   supabase login"
    exit 1
fi

# Deploy each function
functions=(
    "provision-site"
    "stripe-webhook"
    "manage-domain"
    "process-faq"
    "chatbot-query"
    "handle-lead"
    "check-entitlements"
)

for func in "${functions[@]}"; do
    echo "📦 Deploying $func..."
    if supabase functions deploy $func; then
        echo "✅ $func deployed successfully"
    else
        echo "❌ Failed to deploy $func"
        exit 1
    fi
done

echo "🎉 All Edge Functions deployed successfully!"
echo ""
echo "Available functions:"
for func in "${functions[@]}"; do
    echo "  - $func"
done
echo ""
echo "You can test them using:"
echo "  supabase functions serve"
echo ""
echo "Or call them directly:"
echo "  curl -X POST 'https://your-project.supabase.co/functions/v1/function-name' \\"
echo "    -H 'Authorization: Bearer YOUR_ANON_KEY' \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"key\": \"value\"}'"
