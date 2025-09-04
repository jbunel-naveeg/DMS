export interface TeamMember {
  id: string
  user_id: string
  website_id: string
  role: 'admin' | 'editor'
  permissions: TeamPermissions
  invited_by: string
  invited_at: string
  joined_at?: string
  status: 'pending' | 'active' | 'suspended'
  last_active?: string
  created_at: string
  updated_at: string
  user?: {
    id: string
    email: string
    full_name?: string
    avatar_url?: string
  }
}

export interface TeamPermissions {
  can_manage_website: boolean
  can_manage_domains: boolean
  can_manage_analytics: boolean
  can_manage_billing: boolean
  can_manage_team: boolean
  can_manage_integrations: boolean
  can_manage_content: boolean
  can_manage_settings: boolean
}

export interface TeamInvitation {
  id: string
  email: string
  website_id: string
  role: 'admin' | 'editor'
  permissions: TeamPermissions
  invited_by: string
  token: string
  expires_at: string
  status: 'pending' | 'accepted' | 'expired' | 'revoked'
  created_at: string
  updated_at: string
}

export interface TeamActivity {
  id: string
  user_id: string
  website_id: string
  action: string
  resource_type: string
  resource_id?: string
  details: Record<string, any>
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface TeamSettings {
  id: string
  website_id: string
  allow_self_registration: boolean
  require_approval: boolean
  max_team_members: number
  session_timeout: number
  two_factor_required: boolean
  password_policy: {
    min_length: number
    require_uppercase: boolean
    require_lowercase: boolean
    require_numbers: boolean
    require_symbols: boolean
  }
  notification_settings: {
    email_invitations: boolean
    email_activity: boolean
    email_security: boolean
  }
  created_at: string
  updated_at: string
}

// Default permissions for roles
export const DEFAULT_ROLE_PERMISSIONS: Record<'admin' | 'editor', TeamPermissions> = {
  admin: {
    can_manage_website: true,
    can_manage_domains: true,
    can_manage_analytics: true,
    can_manage_billing: true,
    can_manage_team: true,
    can_manage_integrations: true,
    can_manage_content: true,
    can_manage_settings: true,
  },
  editor: {
    can_manage_website: true,
    can_manage_domains: false,
    can_manage_analytics: true,
    can_manage_billing: false,
    can_manage_team: false,
    can_manage_integrations: false,
    can_manage_content: true,
    can_manage_settings: false,
  },
}

// Team member status colors
export const TEAM_MEMBER_STATUS_COLORS = {
  pending: 'yellow',
  active: 'green',
  suspended: 'red',
} as const

// Team member role colors
export const TEAM_MEMBER_ROLE_COLORS = {
  admin: 'purple',
  editor: 'blue',
} as const
