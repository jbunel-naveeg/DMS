# N8N Workflows for Naveeg

This directory contains N8N automation workflows for the Naveeg platform, handling lead management, site provisioning, subscription management, and domain operations.

## Overview

N8N is used to automate business processes and integrate various services. The workflows handle:

1. **Lead Management** - Captures leads from marketing site and processes them
2. **Site Provisioning** - Automates website creation and setup
3. **Subscription Management** - Handles Stripe webhook events
4. **Domain Management** - Manages domain verification and SSL requests

## Setup

### Prerequisites

- Docker and Docker Compose installed
- Access to all required services (Supabase, Stripe, 10Web, Slack, OpenAI)

### Quick Start

1. Run the setup script:
   ```bash
   cd n8n
   ./setup.sh
   ```

2. Edit the `.env` file with your actual service credentials

3. Start N8N:
   ```bash
   docker-compose up -d
   ```

4. Access N8N at http://localhost:5678

5. Import the workflows from the `workflows/` directory

## Workflows

### 1. Lead Management Workflow

**Webhook URL:** `http://localhost:5678/webhook/lead-captured`

**Purpose:** Captures leads from the marketing site and processes them through the system.

**Flow:**
1. Receives lead data via webhook
2. Filters leads from marketing site
3. Creates lead record in Supabase
4. Processes lead through Edge Function
5. Sends Slack notification
6. Returns success response

**Expected Payload:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "company": "Example Corp",
  "phone": "+1234567890",
  "source": "marketing_site",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "summer2024"
}
```

### 2. Site Provisioning Workflow

**Webhook URL:** `http://localhost:5678/webhook/provision-site`

**Purpose:** Automates the creation and setup of new websites.

**Flow:**
1. Receives site provisioning request
2. Calls Supabase Edge Function to provision site
3. Checks if provisioning was successful
4. Updates website record in database
5. Sends Slack notification
6. Returns success/failure response

**Expected Payload:**
```json
{
  "user_id": "uuid",
  "site_name": "My Website",
  "subdomain": "mywebsite",
  "template": "default"
}
```

### 3. Subscription Management Workflow

**Webhook URL:** `http://localhost:5678/webhook/subscription-webhook`

**Purpose:** Handles Stripe webhook events for subscription changes.

**Flow:**
1. Receives Stripe webhook
2. Processes webhook through Supabase Edge Function
3. Filters by event type (created, updated, cancelled)
4. Sends appropriate Slack notification
5. Returns success response

**Supported Events:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### 4. Domain Management Workflow

**Webhook URL:** `http://localhost:5678/webhook/domain-webhook`

**Purpose:** Manages domain verification and SSL certificate requests.

**Flow:**
1. Receives domain management request
2. Processes through Supabase Edge Function
3. Filters by action type (verify, ssl_request)
4. Sends appropriate Slack notification
5. Returns success/failure response

**Expected Payload:**
```json
{
  "action": "verify",
  "domain": "example.com",
  "user_id": "uuid",
  "website_id": "uuid"
}
```

## Environment Variables

The following environment variables are required:

### N8N Configuration
- `N8N_BASIC_AUTH_PASSWORD` - Password for N8N basic auth
- `N8N_ENCRYPTION_KEY` - 32-character encryption key for N8N
- `N8N_WEBHOOK_URL` - Base URL for webhooks

### Database
- `POSTGRES_PASSWORD` - Password for PostgreSQL database

### External Services
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `TENWEB_API_KEY` - 10Web API key
- `SLACK_WEBHOOK_URL` - Slack webhook URL for notifications
- `OPENAI_API_KEY` - OpenAI API key

## Webhook Integration

### Marketing Site Integration

Add this to your marketing site to capture leads:

```javascript
const captureLead = async (leadData) => {
  try {
    const response = await fetch('http://localhost:5678/webhook/lead-captured', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error capturing lead:', error);
    throw error;
  }
};
```

### Dashboard Integration

For site provisioning:

```javascript
const provisionSite = async (siteData) => {
  try {
    const response = await fetch('http://localhost:5678/webhook/provision-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(siteData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error provisioning site:', error);
    throw error;
  }
};
```

## Monitoring

### Logs

N8N logs are stored in the `logs/` directory and can be viewed with:

```bash
docker-compose logs -f n8n
```

### Health Checks

Check if N8N is running:

```bash
curl http://localhost:5678/healthz
```

### Metrics

N8N metrics are available at `http://localhost:5678/metrics` (if enabled).

## Troubleshooting

### Common Issues

1. **Workflows not triggering:**
   - Check webhook URLs are correct
   - Verify environment variables are set
   - Check N8N logs for errors

2. **Database connection issues:**
   - Ensure PostgreSQL is running
   - Check database credentials
   - Verify network connectivity

3. **External service failures:**
   - Check API keys are valid
   - Verify service endpoints are accessible
   - Check rate limits

### Debug Mode

Enable debug logging by setting `N8N_LOG_LEVEL=debug` in the `.env` file.

## Security

- Change default passwords
- Use strong encryption keys
- Restrict webhook access
- Monitor for suspicious activity
- Keep N8N updated

## Backup

Regularly backup:
- N8N workflow configurations
- PostgreSQL database
- Environment configuration

## Support

For issues with N8N workflows, check:
1. N8N documentation: https://docs.n8n.io
2. Workflow logs in N8N interface
3. Docker container logs
4. Supabase Edge Function logs
