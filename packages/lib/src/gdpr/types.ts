/**
 * GDPR Compliance Types
 * Defines interfaces and types for GDPR compliance features
 */

export interface ConsentPreferences {
  id: string
  user_id: string
  essential: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
  third_party: boolean
  created_at: string
  updated_at: string
  ip_address?: string
  user_agent?: string
}

export interface DataSubjectRequest {
  id: string
  user_id: string
  request_type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection'
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  description?: string
  requested_at: string
  completed_at?: string
  response_data?: any
  admin_notes?: string
}

export interface PrivacyPolicy {
  id: string
  version: string
  effective_date: string
  content: string
  language: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CookieConsent {
  id: string
  user_id: string
  session_id: string
  essential: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
  third_party: boolean
  consent_given_at: string
  ip_address?: string
  user_agent?: string
}

export interface DataRetentionPolicy {
  id: string
  data_type: string
  retention_period_days: number
  auto_delete: boolean
  legal_basis: string
  description: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id?: string
  action: string
  resource_type: string
  resource_id: string
  old_values?: any
  new_values?: any
  ip_address?: string
  user_agent?: string
  timestamp: string
  metadata?: any
}

export interface DataProcessingActivity {
  id: string
  name: string
  purpose: string
  legal_basis: 'consent' | 'contract' | 'legal_obligation' | 'vital_interests' | 'public_task' | 'legitimate_interests'
  data_categories: string[]
  data_subjects: string[]
  recipients: string[]
  third_country_transfers: boolean
  retention_period: string
  security_measures: string[]
  created_at: string
  updated_at: string
}

export interface DataBreach {
  id: string
  description: string
  data_categories_affected: string[]
  number_of_subjects_affected: number
  discovered_at: string
  reported_at?: string
  status: 'discovered' | 'investigating' | 'contained' | 'resolved' | 'reported'
  risk_level: 'low' | 'medium' | 'high'
  mitigation_measures: string[]
  notification_required: boolean
  notification_sent_at?: string
  created_at: string
  updated_at: string
}

export interface GDPRComplianceStatus {
  consent_management: boolean
  data_subject_rights: boolean
  privacy_policy: boolean
  cookie_consent: boolean
  data_retention: boolean
  audit_logging: boolean
  breach_procedures: boolean
  staff_training: boolean
  last_audit: string
  compliance_score: number
}

export interface ConsentBannerConfig {
  enabled: boolean
  theme: 'light' | 'dark' | 'auto'
  position: 'top' | 'bottom' | 'modal'
  show_essential_only: boolean
  allow_reject_all: boolean
  allow_accept_all: boolean
  show_details: boolean
  languages: string[]
  custom_text?: {
    title: string
    description: string
    accept_all: string
    reject_all: string
    save_preferences: string
    essential: string
    analytics: string
    marketing: string
    personalization: string
    third_party: string
  }
}

export interface DataExport {
  user_id: string
  data_types: string[]
  format: 'json' | 'csv' | 'xml'
  status: 'pending' | 'processing' | 'ready' | 'expired'
  created_at: string
  expires_at: string
  download_url?: string
  file_size?: number
}

export interface DataDeletionRequest {
  id: string
  user_id: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  requested_at: string
  processed_at?: string
  admin_notes?: string
  retention_exceptions?: string[]
}

export interface PrivacyImpactAssessment {
  id: string
  name: string
  description: string
  data_categories: string[]
  processing_purposes: string[]
  legal_basis: string
  risk_level: 'low' | 'medium' | 'high'
  mitigation_measures: string[]
  approval_status: 'pending' | 'approved' | 'rejected'
  approved_by?: string
  approved_at?: string
  created_at: string
  updated_at: string
}

export interface DataProtectionOfficer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GDPRNotification {
  id: string
  type: 'consent_update' | 'policy_update' | 'breach_notification' | 'data_request' | 'deletion_request'
  user_id?: string
  title: string
  message: string
  is_read: boolean
  action_required: boolean
  action_url?: string
  created_at: string
  expires_at?: string
}

export interface ComplianceReport {
  id: string
  report_type: 'monthly' | 'quarterly' | 'annual' | 'ad_hoc'
  period_start: string
  period_end: string
  data_subject_requests: number
  consent_updates: number
  data_breaches: number
  audit_findings: string[]
  compliance_score: number
  recommendations: string[]
  generated_at: string
  generated_by: string
}

export type ConsentType = 'essential' | 'analytics' | 'marketing' | 'personalization' | 'third_party'
export type DataSubjectRightType = 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection'
export type LegalBasis = 'consent' | 'contract' | 'legal_obligation' | 'vital_interests' | 'public_task' | 'legitimate_interests'
export type RiskLevel = 'low' | 'medium' | 'high'
export type ComplianceStatus = 'compliant' | 'non_compliant' | 'needs_review' | 'in_progress'
