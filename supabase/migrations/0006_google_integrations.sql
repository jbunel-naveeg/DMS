-- Create google_integrations table
CREATE TABLE IF NOT EXISTS google_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('analytics', 'search_console', 'business_profile')),
  account_id TEXT NOT NULL DEFAULT '',
  account_name TEXT NOT NULL DEFAULT '',
  property_id TEXT,
  site_url TEXT,
  location_id TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_google_integrations_user_id ON google_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_google_integrations_type ON google_integrations(type);
CREATE INDEX IF NOT EXISTS idx_google_integrations_active ON google_integrations(is_active);
CREATE INDEX IF NOT EXISTS idx_google_integrations_user_type ON google_integrations(user_id, type);

-- Create RLS policies
ALTER TABLE google_integrations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own integrations
CREATE POLICY "Users can view own google integrations" ON google_integrations
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own integrations
CREATE POLICY "Users can insert own google integrations" ON google_integrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own integrations
CREATE POLICY "Users can update own google integrations" ON google_integrations
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own integrations
CREATE POLICY "Users can delete own google integrations" ON google_integrations
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_google_integrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_google_integrations_updated_at
  BEFORE UPDATE ON google_integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_google_integrations_updated_at();

-- Add comments
COMMENT ON TABLE google_integrations IS 'Stores Google service integrations for users (Analytics, Search Console, Business Profile)';
COMMENT ON COLUMN google_integrations.type IS 'Type of Google service integration';
COMMENT ON COLUMN google_integrations.account_id IS 'Google account ID';
COMMENT ON COLUMN google_integrations.account_name IS 'Human-readable account name';
COMMENT ON COLUMN google_integrations.property_id IS 'Google Analytics property ID (for analytics type)';
COMMENT ON COLUMN google_integrations.site_url IS 'Website URL (for search console type)';
COMMENT ON COLUMN google_integrations.location_id IS 'Business location ID (for business profile type)';
COMMENT ON COLUMN google_integrations.access_token IS 'OAuth access token';
COMMENT ON COLUMN google_integrations.refresh_token IS 'OAuth refresh token';
COMMENT ON COLUMN google_integrations.expires_at IS 'When the access token expires';
COMMENT ON COLUMN google_integrations.is_active IS 'Whether the integration is currently active';
