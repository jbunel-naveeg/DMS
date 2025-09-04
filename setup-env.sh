#!/bin/bash

# Naveeg Environment Setup Script
echo "🔧 Setting up Naveeg environment configuration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the root of the Naveeg project"
    exit 1
fi

print_status "Setting up environment configuration for Naveeg..."

# Create .env.local files for each app
print_status "Creating .env.local files for each app..."

# Marketing app .env.local
if [ ! -f "apps/marketing/.env.local" ]; then
    cp "apps/marketing/env.example" "apps/marketing/.env.local"
    print_success "Created apps/marketing/.env.local"
else
    print_warning "apps/marketing/.env.local already exists, skipping..."
fi

# Dashboard app .env.local
if [ ! -f "apps/dashboard/.env.local" ]; then
    cp "apps/dashboard/env.example" "apps/dashboard/.env.local"
    print_success "Created apps/dashboard/.env.local"
else
    print_warning "apps/dashboard/.env.local already exists, skipping..."
fi

# Root .env.local
if [ ! -f ".env.local" ]; then
    cp "env.comprehensive.example" ".env.local"
    print_success "Created .env.local"
else
    print_warning ".env.local already exists, skipping..."
fi

# N8N .env
if [ ! -f "n8n/.env" ]; then
    cp "n8n/env.comprehensive.example" "n8n/.env"
    print_success "Created n8n/.env"
else
    print_warning "n8n/.env already exists, skipping..."
fi

print_status "Environment files created successfully!"

# Display next steps
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Configure your environment variables:"
echo "   - Edit apps/marketing/.env.local"
echo "   - Edit apps/dashboard/.env.local"
echo "   - Edit .env.local"
echo "   - Edit n8n/.env"
echo ""
echo "2. Required services to set up:"
echo "   - Supabase project with database and Edge Functions"
echo "   - Stripe account with test/live keys"
echo "   - 10Web API account"
echo "   - OpenAI API account"
echo "   - Google Cloud Console project for OAuth"
echo "   - N8N instance (optional for automation)"
echo "   - Slack workspace (optional for notifications)"
echo ""
echo "3. Test your configuration:"
echo "   npm run dev"
echo ""
echo "4. Deploy to production:"
echo "   npm run setup-production"
echo "   npm run deploy"
echo ""
echo "📖 For detailed setup instructions, see:"
echo "   - DEPLOYMENT.md"
echo "   - env.comprehensive.example"
echo "   - n8n/env.comprehensive.example"
echo ""

# Check if required services are configured
print_status "Checking for required environment variables..."

# Check Supabase configuration
if grep -q "your-project.supabase.co" .env.local; then
    print_warning "Supabase URL not configured in .env.local"
else
    print_success "Supabase URL appears to be configured"
fi

# Check Stripe configuration
if grep -q "sk_test_your_stripe_secret_key" .env.local; then
    print_warning "Stripe secret key not configured in .env.local"
else
    print_success "Stripe secret key appears to be configured"
fi

# Check 10Web configuration
if grep -q "your_10web_api_key" .env.local; then
    print_warning "10Web API key not configured in .env.local"
else
    print_success "10Web API key appears to be configured"
fi

# Check OpenAI configuration
if grep -q "sk-your_openai_api_key" .env.local; then
    print_warning "OpenAI API key not configured in .env.local"
else
    print_success "OpenAI API key appears to be configured"
fi

echo ""
print_success "Environment setup complete!"
print_status "Remember to configure all required environment variables before running the application."