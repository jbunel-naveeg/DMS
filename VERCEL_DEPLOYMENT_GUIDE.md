# Vercel Deployment Guide for Naveeg

## 🚀 **Quick Deployment Steps**

### **1. Marketing Site Deployment**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import from GitHub: `jbunel-naveeg/DMS`
4. **Root Directory:** `apps/marketing`
5. **Framework Preset:** Next.js
6. **Build Command:** `npm run build`
7. **Output Directory:** `.next`
8. **Install Command:** `npm install`

### **2. Dashboard Site Deployment**
1. Create another **"New Project"**
2. Import from GitHub: `jbunel-naveeg/DMS`
3. **Root Directory:** `apps/dashboard`
4. **Framework Preset:** Next.js
5. **Build Command:** `npm run build`
6. **Output Directory:** `.next`
7. **Install Command:** `npm install`

### **3. Environment Variables Setup**

#### **Marketing Site Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://okkwhowewjohxobrwlam.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
NEXT_PUBLIC_APP_URL=https://app.naveeg.com
NEXT_PUBLIC_MARKETING_URL=https://naveeg.com
```

#### **Dashboard Site Environment Variables:**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://okkwhowewjohxobrwlam.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# 10Web
TENWEB_API_KEY=your_10web_api_key
TENWEB_API_URL=https://my.10web.io/api

# OpenAI
OPENAI_API_KEY=sk-your_openai_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://app.naveeg.com/api/google/oauth/callback

# App URLs
NEXT_PUBLIC_APP_URL=https://app.naveeg.com
NEXT_PUBLIC_MARKETING_URL=https://naveeg.com
NEXT_PUBLIC_TRIAL_DOMAIN=naveeg.online
```

### **4. Custom Domains Setup**

#### **Marketing Site:**
- **Domain:** `naveeg.com`
- **WWW:** `www.naveeg.com` (redirect to naveeg.com)

#### **Dashboard Site:**
- **Domain:** `app.naveeg.com`

### **5. Build Configuration**

Both projects should use these settings:
- **Node.js Version:** 18.x
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### **6. Monorepo Configuration**

Since this is a monorepo, Vercel will automatically detect the workspace structure. Make sure to:
1. Set the correct **Root Directory** for each project
2. Use the **Install Command:** `npm install` (not `npm ci`)
3. The build will automatically install dependencies for the entire workspace

### **7. Post-Deployment Checklist**

- [ ] Marketing site loads at `naveeg.com`
- [ ] Dashboard loads at `app.naveeg.com`
- [ ] Authentication works (signup/login)
- [ ] Database connection established
- [ ] Stripe integration functional
- [ ] 10Web API integration working
- [ ] SSL certificates active
- [ ] All environment variables set

### **8. Troubleshooting**

#### **Build Failures:**
- Check that all environment variables are set
- Verify the Root Directory is correct
- Ensure Node.js version is 18.x

#### **Runtime Errors:**
- Check Vercel function logs
- Verify API endpoints are working
- Check environment variable names (case-sensitive)

#### **Database Connection Issues:**
- Verify Supabase URL and keys
- Check RLS policies are active
- Test connection from Vercel functions

### **9. Monitoring**

After deployment, monitor:
- **Vercel Analytics** - Performance metrics
- **Function Logs** - API endpoint errors
- **Supabase Dashboard** - Database usage
- **Stripe Dashboard** - Payment processing

---

**Ready to deploy!** 🚀

The codebase is fully prepared for Vercel deployment with all necessary configurations in place.
