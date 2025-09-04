#!/bin/bash

# N8N Setup Script for Naveeg
echo "🚀 Setting up N8N for Naveeg..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your actual configuration values before running docker-compose up"
    echo "   Required values:"
    echo "   - N8N_BASIC_AUTH_PASSWORD"
    echo "   - N8N_ENCRYPTION_KEY"
    echo "   - POSTGRES_PASSWORD"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_ANON_KEY"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - STRIPE_WEBHOOK_SECRET"
    echo "   - TENWEB_API_KEY"
    echo "   - SLACK_WEBHOOK_URL"
    echo "   - OPENAI_API_KEY"
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p workflows
mkdir -p logs

# Set proper permissions
echo "🔐 Setting permissions..."
chmod 755 workflows
chmod 755 logs

# Generate encryption key if not set
if grep -q "your_32_character_encryption_key_here" .env; then
    echo "🔑 Generating encryption key..."
    ENCRYPTION_KEY=$(openssl rand -hex 16)
    sed -i.bak "s/your_32_character_encryption_key_here/$ENCRYPTION_KEY/" .env
    echo "✅ Generated encryption key: $ENCRYPTION_KEY"
fi

# Generate basic auth password if not set
if grep -q "your_secure_password_here" .env; then
    echo "🔑 Generating basic auth password..."
    AUTH_PASSWORD=$(openssl rand -base64 12)
    sed -i.bak "s/your_secure_password_here/$AUTH_PASSWORD/" .env
    echo "✅ Generated basic auth password: $AUTH_PASSWORD"
fi

# Generate postgres password if not set
if grep -q "your_postgres_password_here" .env; then
    echo "🔑 Generating postgres password..."
    POSTGRES_PASSWORD=$(openssl rand -base64 16)
    sed -i.bak "s/your_postgres_password_here/$POSTGRES_PASSWORD/" .env
    echo "✅ Generated postgres password: $POSTGRES_PASSWORD"
fi

echo "✅ N8N setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your actual service credentials"
echo "2. Run: docker-compose up -d"
echo "3. Access N8N at: http://localhost:5678"
echo "4. Import workflows from the workflows/ directory"
echo ""
echo "🔗 Webhook URLs (after starting N8N):"
echo "- Lead Management: http://localhost:5678/webhook/lead-captured"
echo "- Site Provisioning: http://localhost:5678/webhook/provision-site"
echo "- Subscription Management: http://localhost:5678/webhook/subscription-webhook"
echo "- Domain Management: http://localhost:5678/webhook/domain-webhook"
