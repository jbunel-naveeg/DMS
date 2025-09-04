-- Row Level Security Policies for Naveeg
-- This migration creates comprehensive RLS policies for multi-tenant security

-- Helper function to check if user is team member of website
CREATE OR REPLACE FUNCTION is_team_member(website_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_members.website_id = is_team_member.website_id 
    AND team_members.user_id = is_team_member.user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is admin of website
CREATE OR REPLACE FUNCTION is_website_admin(website_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_members.website_id = is_website_admin.website_id 
    AND team_members.user_id = is_website_admin.user_id
    AND team_members.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user's accessible websites
CREATE OR REPLACE FUNCTION get_user_websites(user_id UUID)
RETURNS TABLE(website_id UUID) AS $$
BEGIN
  RETURN QUERY
  SELECT tm.website_id 
  FROM team_members tm 
  WHERE tm.user_id = get_user_websites.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users table policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Plans table policies (public read access)
CREATE POLICY "Plans are publicly readable" ON plans
  FOR SELECT USING (true);

-- Websites table policies
CREATE POLICY "Users can view websites they have access to" ON websites
  FOR SELECT USING (
    auth.uid() = owner_id OR 
    is_team_member(id, auth.uid())
  );

CREATE POLICY "Only admins can update websites" ON websites
  FOR UPDATE USING (
    auth.uid() = owner_id OR 
    is_website_admin(id, auth.uid())
  );

CREATE POLICY "Only admins can insert websites" ON websites
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Only admins can delete websites" ON websites
  FOR DELETE USING (
    auth.uid() = owner_id OR 
    is_website_admin(id, auth.uid())
  );

-- Entitlements table policies
CREATE POLICY "Team members can view entitlements" ON entitlements
  FOR SELECT USING (
    is_team_member(website_id, auth.uid())
  );

CREATE POLICY "Only admins can manage entitlements" ON entitlements
  FOR ALL USING (
    is_website_admin(website_id, auth.uid())
  );

-- Team members table policies
CREATE POLICY "Team members can view team" ON team_members
  FOR SELECT USING (
    is_team_member(website_id, auth.uid())
  );

CREATE POLICY "Only admins can manage team members" ON team_members
  FOR ALL USING (
    is_website_admin(website_id, auth.uid())
  );

-- Billing sessions table policies
CREATE POLICY "Admins can view billing sessions" ON billing_sessions
  FOR SELECT USING (
    is_website_admin(website_id, auth.uid())
  );

CREATE POLICY "Admins can create billing sessions" ON billing_sessions
  FOR INSERT WITH CHECK (
    is_website_admin(website_id, auth.uid())
  );

-- Domains table policies
CREATE POLICY "Team members can view domains" ON domains
  FOR SELECT USING (
    is_team_member(website_id, auth.uid())
  );

CREATE POLICY "Only admins can manage domains" ON domains
  FOR ALL USING (
    is_website_admin(website_id, auth.uid())
  );

-- FAQ docs table policies
CREATE POLICY "Team members can view FAQ docs" ON faq_docs
  FOR SELECT USING (
    is_team_member(website_id, auth.uid())
  );

CREATE POLICY "Team members can manage FAQ docs" ON faq_docs
  FOR ALL USING (
    is_team_member(website_id, auth.uid())
  );

-- Leads table policies
CREATE POLICY "Team members can view leads" ON leads
  FOR SELECT USING (
    is_team_member(website_id, auth.uid())
  );

CREATE POLICY "Anyone can create leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Settings table policies
CREATE POLICY "Team members can view settings" ON settings
  FOR SELECT USING (
    website_id IS NULL OR is_team_member(website_id, auth.uid())
  );

CREATE POLICY "Team members can manage settings" ON settings
  FOR ALL USING (
    website_id IS NULL OR is_team_member(website_id, auth.uid())
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_websites_updated_at
  BEFORE UPDATE ON websites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
