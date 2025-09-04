-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  permissions JSONB NOT NULL DEFAULT '{}',
  invited_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  joined_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  last_active TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_invitations table
CREATE TABLE IF NOT EXISTS team_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  permissions JSONB NOT NULL DEFAULT '{}',
  invited_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_activities table
CREATE TABLE IF NOT EXISTS team_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_settings table
CREATE TABLE IF NOT EXISTS team_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  allow_self_registration BOOLEAN NOT NULL DEFAULT false,
  require_approval BOOLEAN NOT NULL DEFAULT true,
  max_team_members INTEGER NOT NULL DEFAULT 10,
  session_timeout INTEGER NOT NULL DEFAULT 3600, -- seconds
  two_factor_required BOOLEAN NOT NULL DEFAULT false,
  password_policy JSONB NOT NULL DEFAULT '{
    "min_length": 8,
    "require_uppercase": true,
    "require_lowercase": true,
    "require_numbers": true,
    "require_symbols": false
  }',
  notification_settings JSONB NOT NULL DEFAULT '{
    "email_invitations": true,
    "email_activity": true,
    "email_security": true
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_website_id ON team_members(website_id);
CREATE INDEX IF NOT EXISTS idx_team_members_status ON team_members(status);
CREATE INDEX IF NOT EXISTS idx_team_members_role ON team_members(role);
CREATE INDEX IF NOT EXISTS idx_team_members_user_website ON team_members(user_id, website_id);

CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON team_invitations(email);
CREATE INDEX IF NOT EXISTS idx_team_invitations_website_id ON team_invitations(website_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON team_invitations(token);
CREATE INDEX IF NOT EXISTS idx_team_invitations_status ON team_invitations(status);
CREATE INDEX IF NOT EXISTS idx_team_invitations_expires_at ON team_invitations(expires_at);

CREATE INDEX IF NOT EXISTS idx_team_activities_user_id ON team_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_team_activities_website_id ON team_activities(website_id);
CREATE INDEX IF NOT EXISTS idx_team_activities_created_at ON team_activities(created_at);
CREATE INDEX IF NOT EXISTS idx_team_activities_action ON team_activities(action);

CREATE INDEX IF NOT EXISTS idx_team_settings_website_id ON team_settings(website_id);

-- Create RLS policies
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_settings ENABLE ROW LEVEL SECURITY;

-- Team members policies
CREATE POLICY "Users can view team members for their websites" ON team_members
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert team members for their websites" ON team_members
  FOR INSERT WITH CHECK (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update team members for their websites" ON team_members
  FOR UPDATE USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete team members for their websites" ON team_members
  FOR DELETE USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Team invitations policies
CREATE POLICY "Users can view invitations for their websites" ON team_invitations
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert invitations for their websites" ON team_invitations
  FOR INSERT WITH CHECK (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update invitations for their websites" ON team_invitations
  FOR UPDATE USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete invitations for their websites" ON team_invitations
  FOR DELETE USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Team activities policies
CREATE POLICY "Users can view activities for their websites" ON team_activities
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert activities for their websites" ON team_activities
  FOR INSERT WITH CHECK (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Team settings policies
CREATE POLICY "Users can view settings for their websites" ON team_settings
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert settings for their websites" ON team_settings
  FOR INSERT WITH CHECK (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update settings for their websites" ON team_settings
  FOR UPDATE USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Create functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_team_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_team_invitations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_team_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_team_members_updated_at();

CREATE TRIGGER update_team_invitations_updated_at
  BEFORE UPDATE ON team_invitations
  FOR EACH ROW
  EXECUTE FUNCTION update_team_invitations_updated_at();

CREATE TRIGGER update_team_settings_updated_at
  BEFORE UPDATE ON team_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_team_settings_updated_at();

-- Add comments
COMMENT ON TABLE team_members IS 'Stores team member relationships and permissions for websites';
COMMENT ON TABLE team_invitations IS 'Stores pending team invitations';
COMMENT ON TABLE team_activities IS 'Logs team member activities and actions';
COMMENT ON TABLE team_settings IS 'Stores team management settings for websites';

COMMENT ON COLUMN team_members.role IS 'Team member role: admin or editor';
COMMENT ON COLUMN team_members.permissions IS 'JSON object containing specific permissions';
COMMENT ON COLUMN team_members.status IS 'Member status: pending, active, or suspended';
COMMENT ON COLUMN team_invitations.token IS 'Unique token for invitation acceptance';
COMMENT ON COLUMN team_invitations.expires_at IS 'When the invitation expires';
COMMENT ON COLUMN team_activities.action IS 'Action performed by the team member';
COMMENT ON COLUMN team_activities.resource_type IS 'Type of resource affected by the action';
COMMENT ON COLUMN team_activities.resource_id IS 'ID of the specific resource affected';
COMMENT ON COLUMN team_activities.details IS 'Additional details about the action';
