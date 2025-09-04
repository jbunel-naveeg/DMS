#!/bin/bash

# N8N Deployment Script for Naveeg
echo "🚀 Deploying N8N for Naveeg..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please run setup.sh first."
    exit 1
fi

# Load environment variables
source .env

# Check if required environment variables are set
required_vars=(
    "N8N_BASIC_AUTH_PASSWORD"
    "N8N_ENCRYPTION_KEY"
    "POSTGRES_PASSWORD"
    "SUPABASE_URL"
    "SUPABASE_ANON_KEY"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ] || [[ "${!var}" == *"your_"* ]]; then
        echo "❌ $var is not properly configured in .env file"
        exit 1
    fi
done

echo "✅ Environment variables validated"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Pull latest images
echo "📥 Pulling latest images..."
docker-compose pull

# Start services
echo "🚀 Starting N8N services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if N8N is running
echo "🔍 Checking N8N health..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -s http://localhost:5678/healthz > /dev/null 2>&1; then
        echo "✅ N8N is running and healthy"
        break
    else
        echo "⏳ Attempt $attempt/$max_attempts - Waiting for N8N to start..."
        sleep 2
        ((attempt++))
    fi
done

if [ $attempt -gt $max_attempts ]; then
    echo "❌ N8N failed to start within expected time"
    echo "📋 Checking logs..."
    docker-compose logs n8n
    exit 1
fi

# Display deployment information
echo ""
echo "🎉 N8N deployment successful!"
echo ""
echo "📋 Access Information:"
echo "   URL: http://localhost:5678"
echo "   Username: admin"
echo "   Password: $N8N_BASIC_AUTH_PASSWORD"
echo ""
echo "🔗 Webhook URLs:"
echo "   Lead Management: http://localhost:5678/webhook/lead-captured"
echo "   Site Provisioning: http://localhost:5678/webhook/provision-site"
echo "   Subscription Management: http://localhost:5678/webhook/subscription-webhook"
echo "   Domain Management: http://localhost:5678/webhook/domain-webhook"
echo ""
echo "📁 Workflow Files:"
echo "   - workflows/lead-management.json"
echo "   - workflows/site-provisioning.json"
echo "   - workflows/subscription-management.json"
echo "   - workflows/domain-management.json"
echo ""
echo "📖 Next Steps:"
echo "   1. Access N8N at http://localhost:5678"
echo "   2. Import workflows from the workflows/ directory"
echo "   3. Test webhook endpoints"
echo "   4. Configure Slack notifications (optional)"
echo ""
echo "🔧 Management Commands:"
echo "   View logs: docker-compose logs -f n8n"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Update services: docker-compose pull && docker-compose up -d"
