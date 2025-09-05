-- RLS Policies for Naveeg
-- Run this in Supabase SQL Editor after creating the tables

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_sessions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

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

-- Entitlements policies
CREATE POLICY "Users can view own entitlements" ON entitlements
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own entitlements" ON entitlements
  FOR ALL USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

-- Domains policies
CREATE POLICY "Users can view own domains" ON domains
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own domains" ON domains
  FOR ALL USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

-- FAQ docs policies
CREATE POLICY "Users can view own faq_docs" ON faq_docs
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own faq_docs" ON faq_docs
  FOR ALL USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

-- Leads policies
CREATE POLICY "Users can view own leads" ON leads
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own leads" ON leads
  FOR ALL USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

-- Settings policies
CREATE POLICY "Users can view own settings" ON settings
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own settings" ON settings
  FOR ALL USING (
    website_id IN (
      SELECT id FROM websites WHERE owner_id = auth.uid()
    )
  );

-- Billing sessions policies
CREATE POLICY "Users can view own billing_sessions" ON billing_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own billing_sessions" ON billing_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
