-- Create essential tables for Naveeg
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  tenweb_domain_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faq_docs table
CREATE TABLE IF NOT EXISTS faq_docs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  file_path TEXT,
  content_text TEXT,
  embedding JSONB, -- Store as JSONB instead of VECTOR for now
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_id, key)
);

-- Create billing_sessions table
CREATE TABLE IF NOT EXISTS billing_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Websites policies
CREATE POLICY "Users can view own websites" ON websites
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own websites" ON websites
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own websites" ON websites
  FOR UPDATE USING (auth.uid() = owner_id);

-- Team members policies
CREATE POLICY "Users can view team members for their websites" ON team_members
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage team members" ON team_members
  FOR ALL USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

-- Other tables follow similar patterns...
CREATE POLICY "Users can view own entitlements" ON entitlements
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own domains" ON domains
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own faq_docs" ON faq_docs
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own leads" ON leads
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own settings" ON settings
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own billing_sessions" ON billing_sessions
  FOR SELECT USING (auth.uid() = user_id);
