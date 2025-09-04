# Supabase Edge Functions

This directory contains all the Supabase Edge Functions for the Naveeg platform. These functions handle critical backend operations including site provisioning, billing, domain management, and AI features.

## 🚀 Available Functions

### 1. **provision-site**
Creates a new WordPress site via 10Web API and sets up the database records.

**Endpoint:** `POST /functions/v1/provision-site`

**Request Body:**
```json
{
  "user_id": "uuid",
  "site_title": "My Website",
  "subdomain": "my-site",
  "plan_id": "trial"
}
```

**Response:**
```json
{
  "success": true,
  "website": {
    "id": "uuid",
    "site_title": "My Website",
    "subdomain": "my-site",
    "plan_id": "trial",
    "tenweb_id": 12345,
    "status": "active",
    "trial_ends_at": "2024-01-08T00:00:00Z"
  }
}
```

### 2. **stripe-webhook**
Handles Stripe webhook events for subscription management.

**Endpoint:** `POST /functions/v1/stripe-webhook`

**Supported Events:**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### 3. **manage-domain**
Manages custom domain connections for Pro plan users.

**Endpoint:** `POST /functions/v1/manage-domain`

**Request Body:**
```json
{
  "website_id": "uuid",
  "domain": "example.com",
  "action": "add" // or "remove" or "verify"
}
```

### 4. **process-faq**
Processes FAQ documents and generates embeddings for AI chatbot.

**Endpoint:** `POST /functions/v1/process-faq`

**Request Body:**
```json
{
  "website_id": "uuid",
  "file_path": "path/to/faq.pdf",
  "content_text": "FAQ content..."
}
```

### 5. **chatbot-query**
Handles AI chatbot queries using vector similarity search.

**Endpoint:** `POST /functions/v1/chatbot-query`

**Request Body:**
```json
{
  "website_id": "uuid",
  "question": "How do I reset my password?",
  "user_id": "uuid" // optional
}
```

**Response:**
```json
{
  "success": true,
  "answer": "To reset your password, click on the 'Forgot Password' link...",
  "sources": [
    {
      "id": "uuid",
      "content": "Password reset instructions...",
      "similarity": 0.95
    }
  ]
}
```

### 6. **handle-lead**
Processes contact form submissions and creates lead records.

**Endpoint:** `POST /functions/v1/handle-lead`

**Request Body:**
```json
{
  "website_id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your services",
  "source": "contact_form"
}
```

### 7. **check-entitlements**
Checks if a website has access to specific features based on their plan.

**Endpoint:** `POST /functions/v1/check-entitlements`

**Request Body:**
```json
{
  "website_id": "uuid",
  "feature_key": "chatbot"
}
```

**Response:**
```json
{
  "has_access": true,
  "feature_key": "chatbot",
  "value": true,
  "plan": "Pro",
  "website_status": "active"
}
```

## 🔧 Environment Variables

All functions require the following environment variables:

```bash
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 10Web API
TENWEB_API_KEY=your_10web_api_key
TENWEB_API_URL=https://api.10web.io

# OpenAI
OPENAI_API_KEY=sk-your_openai_api_key

# Stripe
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# n8n (optional)
N8N_POST_PROVISION_WEBHOOK_URL=https://your_n8n_instance.com/webhook/post-provision
N8N_LEAD_WEBHOOK_URL=https://your_n8n_instance.com/webhook/lead
```

## 🚀 Deployment

### Deploy All Functions
```bash
./deploy.sh
```

### Deploy Individual Function
```bash
supabase functions deploy function-name
```

### Local Development
```bash
supabase functions serve
```

## 🧪 Testing

### Test with curl
```bash
curl -X POST 'https://your-project.supabase.co/functions/v1/function-name' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"key": "value"}'
```

### Test with Supabase CLI
```bash
supabase functions invoke function-name --data '{"key": "value"}'
```

## 📊 Monitoring

All functions include comprehensive logging and error handling. You can monitor them in:

1. **Supabase Dashboard** - Functions tab
2. **Logs** - Real-time function execution logs
3. **Metrics** - Performance and usage statistics

## 🔒 Security

- All functions validate input parameters
- CORS headers are properly configured
- Database queries use RLS policies
- API keys are validated before use
- Error messages don't expose sensitive information

## 🛠️ Development

### Adding a New Function

1. Create a new directory in `supabase/functions/`
2. Add `index.ts` with your function code
3. Import shared utilities from `_shared/env.ts`
4. Add to the deployment script
5. Update this README

### Function Template

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, createErrorResponse, createSuccessResponse } from '../_shared/env.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Your function logic here
    return createSuccessResponse({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return createErrorResponse('Internal server error', 500)
  }
})
```

## 📝 Notes

- Functions are deployed to Supabase's global edge network
- Each function has a 60-second timeout
- Functions can access the database using the service role key
- All functions support CORS for web applications
- Error handling is consistent across all functions
