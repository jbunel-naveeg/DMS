-- Simple database setup for Naveeg
-- Run this in Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_eur INTEGER NOT NULL,
  stripe_price_id TEXT,
  features JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create websites table
CREATE TABLE IF NOT EXISTS websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tenweb_id TEXT NOT NULL,
  site_title TEXT NOT NULL,
  subdomain TEXT NOT NULL,
  primary_domain TEXT,
  plan_id TEXT REFERENCES plans(id),
  trial_starts_at TIMESTAMP WITH TIME ZONE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  upgraded_at TIMESTAMP WITH TIME ZONE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create entitlements table
CREATE TABLE IF NOT EXISTS entitlements (
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  PRIMARY KEY (website_id, key)
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted BOOLEAN DEFAULT false,
  PRIMARY KEY (website_id, user_id)
);

-- Create domains table
CREATE TABLE IF NOT EXISTS domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  tenweb_domain_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faq_docs table
CREATE TABLE IF NOT EXISTS faq_docs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  file_path TEXT,
  content_text TEXT,
  embedding JSONB, -- Store as JSONB instead of VECTOR
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_id, key)
);

-- Create billing_sessions table
CREATE TABLE IF NOT EXISTS billing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('checkout', 'portal')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial plans
INSERT INTO plans (id, name, price_eur, stripe_price_id, features) VALUES
('trial', 'Free Trial', 0, NULL, '{"woocommerce": true, "analytics_pro": true, "automations": true, "chatbot": true, "team_editors": true, "custom_domain": false}'),
('starter', 'Starter', 49, 'price_starter_monthly', '{"woocommerce": false, "analytics_pro": false, "automations": false, "chatbot": false, "team_editors": false, "custom_domain": false}'),
('pro', 'Pro', 99, 'price_pro_monthly', '{"woocommerce": true, "analytics_pro": true, "automations": true, "chatbot": true, "team_editors": true, "custom_domain": true}')
ON CONFLICT (id) DO NOTHING;
