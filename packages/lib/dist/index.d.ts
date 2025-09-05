import * as _supabase_supabase_js from '@supabase/supabase-js';
import { AuthUser, AuthSession, UserPlan, Website, Domain, UsageStats, PlanUsage, FeatureEntitlement, TeamMember, TeamInvitation, TeamActivity, TeamSettings, LeadData, N8NResponse, SiteProvisioningData, DomainActionData, I18nService, CurrencyFormatter, DateFormatter, NumberFormatter, TranslationOptions, SupportedLocale, CurrencyOptions, DateOptions, NumberOptions, Locale } from './server.js';
export { AppError, AuthResponse, AuthService, BriefInput, CancelSubscriptionRequest, CancelSubscriptionResponse, ChatCompletionResponse, ChatMessage, ChatbotResponse, CheckoutSession, CreateCheckoutSessionRequest, CreateCheckoutSessionResponse, CreateDomainRequest, CreateDomainResponse, CreateSiteRequest, CreateSiteResponse, CreateSubscriptionRequest, CreateSubscriptionResponse, DEFAULT_ROLE_PERMISSIONS, DesignInput, EntitlementCheck, EntitlementService, FAQDocument, GOOGLE_OAUTH_SCOPES, GenerateSiteFromSitemapRequest, GenerateSiteFromSitemapResponse, GenerateSitemapRequest, GenerateSitemapResponse, GoogleAnalyticsAccount, GoogleAnalyticsDataStream, GoogleAnalyticsMetrics, GoogleAnalyticsProperty, GoogleAnalyticsReport, GoogleAnalyticsService, GoogleBusinessProfileAccount, GoogleBusinessProfileInsight, GoogleBusinessProfileLocation, GoogleBusinessProfileMetrics, GoogleBusinessProfilePost, GoogleBusinessProfileService, GoogleIntegration, GoogleMetricsSummary, GoogleOAuthConfig, GoogleSearchConsoleMetrics, GoogleSearchConsoleSearchAnalyticsData, GoogleSearchConsoleSearchAnalyticsQuery, GoogleSearchConsoleService, GoogleSearchConsoleSite, GoogleSearchConsoleSitemap, GoogleSearchConsoleUrlInspectionResult, GoogleService, I18nConfig, LanguageDetectionResult, LocaleDetector, N8NService, OpenAIEmbedding, OpenAIEmbeddingResponse, OpenAIService, PLANS, Plan, PlanLimits, PluralForm, PluralRule, ProcessWebhookResponse, RTLConfig, STRIPE_WEBHOOK_SECRET, StripeCheckoutService, StripeSubscriptionService, StripeWebhookService, Subscription, TEAM_MEMBER_ROLE_COLORS, TEAM_MEMBER_STATUS_COLORS, TeamPermissions, TeamService, TenWebAPI, TenWebDNSRecord, TenWebDomain, TenWebSite, Translation, TranslationContext, TranslationManager, TranslationNamespace, TranslationNamespaceData, UpdateSubscriptionRequest, UpdateSubscriptionResponse, WebhookEvent, authService, briefSchema, calculateUsagePercentage, createAuthClient, createBrowserClient, createServerClient, createServerSupabaseClient, designSchema, entitlementService, formatBandwidthSize, formatCurrency, formatDate, formatStorageSize, generateSchema, generateSubdomain, getAllGoogleScopes, getOpenAIService, getPlanById, getPlanLimits, getScopesForServices, getServerSupabaseClient, getServiceSupabaseClient, getStripe, getTenWebAPI, isFeatureAvailable, n8nService, openAIService, stripeCheckoutService, stripeSubscriptionService, stripeWebhookService, tenWebAPI } from './server.js';
import React$1 from 'react';
import 'stripe';
import 'zod';

declare function getBrowserSupabaseClient(): _supabase_supabase_js.SupabaseClient<any, "public", "public", any, any>;

interface UseAuthReturn {
    user: AuthUser | null;
    session: AuthSession | null;
    loading: boolean;
    signUp: (email: string, password: string, name?: string) => Promise<{
        error: any;
    }>;
    signIn: (email: string, password: string) => Promise<{
        error: any;
    }>;
    signInWithGoogle: () => Promise<{
        error: any;
    }>;
    signOut: () => Promise<{
        error: any;
    }>;
    resetPassword: (email: string) => Promise<{
        error: any;
    }>;
    updatePassword: (password: string) => Promise<{
        error: any;
    }>;
    updateProfile: (updates: {
        name?: string;
        avatar_url?: string;
    }) => Promise<{
        error: any;
    }>;
}
declare function useAuth(): UseAuthReturn;
declare function useRequireAuth(redirectTo?: string): {
    user: AuthUser | null;
    loading: boolean;
    shouldRedirect: boolean;
    redirectTo: string;
};
declare function useIsAuthenticated(): {
    isAuthenticated: boolean;
    loading: boolean;
};
declare function useUser(): {
    user: AuthUser | null;
    loading: boolean;
};

interface OnboardingStatus {
    isCompleted: boolean;
    hasWebsites: boolean;
    loading: boolean;
    error: string | null;
}
declare function useOnboardingStatus(): OnboardingStatus;

interface UserData {
    plan: UserPlan | null;
    websites: Website[];
    domains: Domain[];
    usage: UsageStats;
    planUsage: PlanUsage;
    loading: boolean;
    error: string | null;
}
declare function useUserData(): UserData;

interface UseEntitlementReturn {
    checkFeature: (feature: string) => FeatureEntitlement;
    hasFeature: (feature: string) => boolean;
    canUseFeature: (feature: string) => boolean;
    getFeatureReason: (feature: string) => string | undefined;
    requiresUpgrade: (feature: string) => boolean;
    loading: boolean;
    error: string | null;
}
declare function useEntitlements(): UseEntitlementReturn;
interface UseFeatureGateProps {
    feature: string;
    fallback?: React.ReactNode;
    children: React.ReactNode;
    showUpgrade?: boolean;
}
declare function useFeatureGate(feature: string): {
    isAllowed: boolean;
    needsUpgrade: boolean;
    checkFeature: (feature: string) => FeatureEntitlement;
    hasFeature: (feature: string) => boolean;
    canUseFeature: (feature: string) => boolean;
    getFeatureReason: (feature: string) => string | undefined;
    requiresUpgrade: (feature: string) => boolean;
    loading: boolean;
    error: string | null;
    feature: string;
    allowed: boolean;
    reason?: string;
    upgradeRequired?: boolean;
    currentUsage?: number;
    limit?: number;
};

declare function useTeamMembers(websiteId: string): {
    members: TeamMember[];
    loading: boolean;
    error: string | null;
    addMember: (email: string, role: "admin" | "editor", invitedBy: string) => Promise<{
        success: boolean;
        error: any;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    updateMember: (memberId: string, updates: Partial<Pick<TeamMember, "role" | "permissions" | "status">>) => Promise<{
        success: boolean;
        error: any;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    removeMember: (memberId: string) => Promise<{
        success: boolean;
        error: any;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    refresh: () => Promise<void>;
};
declare function useTeamInvitations(websiteId: string): {
    invitations: TeamInvitation[];
    loading: boolean;
    error: string | null;
    revokeInvitation: (invitationId: string) => Promise<{
        success: boolean;
        error: any;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    refresh: () => Promise<void>;
};
declare function useTeamActivity(websiteId: string): {
    activities: TeamActivity[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => void;
    refresh: () => Promise<void>;
};
declare function useTeamSettings(websiteId: string): {
    settings: TeamSettings | null;
    loading: boolean;
    error: string | null;
    updateSettings: (updates: Partial<TeamSettings>) => Promise<{
        success: boolean;
        error: any;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    refresh: () => Promise<void>;
};
declare function useTeamPermissions(userId: string, websiteId: string): {
    permissions: Record<string, boolean>;
    role: "admin" | "editor" | null;
    loading: boolean;
    checkPermission: (permission: string) => Promise<boolean>;
    refresh: () => Promise<void>;
};

interface UseN8NReturn {
    captureLead: (leadData: LeadData) => Promise<N8NResponse>;
    provisionSite: (siteData: SiteProvisioningData) => Promise<N8NResponse>;
    processDomainAction: (domainData: DomainActionData) => Promise<N8NResponse>;
    checkHealth: () => Promise<boolean>;
    loading: boolean;
    error: string | null;
}
declare function useN8N(): UseN8NReturn;

declare function I18nProvider({ children, i18nService }: {
    children: React$1.ReactNode;
    i18nService: I18nService;
}): React$1.FunctionComponentElement<React$1.ProviderProps<{
    i18n: I18nService;
    currencyFormatter: CurrencyFormatter;
    dateFormatter: DateFormatter;
    numberFormatter: NumberFormatter;
} | null>>;
declare function useI18n(): {
    i18n: I18nService;
    currencyFormatter: CurrencyFormatter;
    dateFormatter: DateFormatter;
    numberFormatter: NumberFormatter;
};
declare function useTranslation(namespace?: string): {
    t: (key: string, options?: TranslationOptions) => string;
    changeLocale: (newLocale: SupportedLocale) => Promise<void>;
    exists: (key: string) => boolean;
    locale: string;
    isRTL: boolean;
};
declare function useCurrency(): {
    format: (amount: number, options?: Partial<CurrencyOptions>) => string;
    formatWithCurrency: (amount: number, currency: string, options?: Partial<CurrencyOptions>) => string;
    formatCompact: (amount: number, options?: Partial<CurrencyOptions>) => string;
    parse: (currencyString: string) => number;
    getCurrencySymbol: (currency?: string) => string;
    currency: string;
};
declare function useDate(): {
    format: (date: Date | string | number, options?: DateOptions) => string;
    formatTime: (date: Date | string | number, options?: DateOptions) => string;
    formatDateTime: (date: Date | string | number, options?: DateOptions) => string;
    formatRelative: (date: Date | string | number, options?: {
        numeric?: "always" | "auto";
    }) => string;
    formatRange: (startDate: Date | string | number, endDate: Date | string | number, options?: DateOptions) => string;
    isToday: (date: Date | string | number) => boolean;
    isYesterday: (date: Date | string | number) => boolean;
    isTomorrow: (date: Date | string | number) => boolean;
    getMonthNames: (format?: "long" | "short" | "narrow") => string[];
    getWeekdayNames: (format?: "long" | "short" | "narrow") => string[];
};
declare function useNumber(): {
    format: (number: number, options?: NumberOptions) => string;
    formatCompact: (number: number, options?: NumberOptions) => string;
    formatPercent: (number: number, options?: NumberOptions) => string;
    parse: (numberString: string) => number;
};
declare function useLocale(): {
    locale: string;
    changeLocale: (newLocale: SupportedLocale) => Promise<void>;
    getSupportedLocales: () => Locale[];
    isLocaleSupported: (localeCode: string) => boolean;
    getLocale: (localeCode: string) => Locale | undefined;
    loading: boolean;
    isRTL: boolean;
};
declare function useRTL(): {
    isRTL: boolean;
    direction: string;
};
declare function usePlural(): {
    getPluralForm: (count: number) => "many" | "zero" | "one" | "two" | "few" | "other";
    tPlural: (key: string, count: number, options?: TranslationOptions) => string;
};

/**
 * GDPR Compliance Types
 * Defines interfaces and types for GDPR compliance features
 */
interface ConsentPreferences {
    id: string;
    user_id: string;
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
    third_party: boolean;
    created_at: string;
    updated_at: string;
    ip_address?: string;
    user_agent?: string;
}
interface DataSubjectRequest {
    id: string;
    user_id: string;
    request_type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    description?: string;
    requested_at: string;
    completed_at?: string;
    response_data?: any;
    admin_notes?: string;
}
interface PrivacyPolicy {
    id: string;
    version: string;
    effective_date: string;
    content: string;
    language: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
interface CookieConsent {
    id: string;
    user_id: string;
    session_id: string;
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
    third_party: boolean;
    consent_given_at: string;
    ip_address?: string;
    user_agent?: string;
}
interface DataRetentionPolicy {
    id: string;
    data_type: string;
    retention_period_days: number;
    auto_delete: boolean;
    legal_basis: string;
    description: string;
    created_at: string;
    updated_at: string;
}
interface AuditLog {
    id: string;
    user_id?: string;
    action: string;
    resource_type: string;
    resource_id: string;
    old_values?: any;
    new_values?: any;
    ip_address?: string;
    user_agent?: string;
    timestamp: string;
    metadata?: any;
}
interface DataBreach {
    id: string;
    description: string;
    data_categories_affected: string[];
    number_of_subjects_affected: number;
    discovered_at: string;
    reported_at?: string;
    status: 'discovered' | 'investigating' | 'contained' | 'resolved' | 'reported';
    risk_level: 'low' | 'medium' | 'high';
    mitigation_measures: string[];
    notification_required: boolean;
    notification_sent_at?: string;
    created_at: string;
    updated_at: string;
}
interface GDPRComplianceStatus {
    consent_management: boolean;
    data_subject_rights: boolean;
    privacy_policy: boolean;
    cookie_consent: boolean;
    data_retention: boolean;
    audit_logging: boolean;
    breach_procedures: boolean;
    staff_training: boolean;
    last_audit: string;
    compliance_score: number;
}
interface ConsentBannerConfig {
    enabled: boolean;
    theme: 'light' | 'dark' | 'auto';
    position: 'top' | 'bottom' | 'modal';
    show_essential_only: boolean;
    allow_reject_all: boolean;
    allow_accept_all: boolean;
    show_details: boolean;
    languages: string[];
    custom_text?: {
        title: string;
        description: string;
        accept_all: string;
        reject_all: string;
        save_preferences: string;
        essential: string;
        analytics: string;
        marketing: string;
        personalization: string;
        third_party: string;
    };
}
interface DataExport {
    user_id: string;
    data_types: string[];
    format: 'json' | 'csv' | 'xml';
    status: 'pending' | 'processing' | 'ready' | 'expired';
    created_at: string;
    expires_at: string;
    download_url?: string;
    file_size?: number;
}
interface DataDeletionRequest {
    id: string;
    user_id: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    requested_at: string;
    processed_at?: string;
    admin_notes?: string;
    retention_exceptions?: string[];
}
interface ComplianceReport {
    id: string;
    report_type: 'monthly' | 'quarterly' | 'annual' | 'ad_hoc';
    period_start: string;
    period_end: string;
    data_subject_requests: number;
    consent_updates: number;
    data_breaches: number;
    audit_findings: string[];
    compliance_score: number;
    recommendations: string[];
    generated_at: string;
    generated_by: string;
}
type ConsentType = 'essential' | 'analytics' | 'marketing' | 'personalization' | 'third_party';
type DataSubjectRightType = 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';

/**
 * Consent Manager
 * Handles user consent collection, storage, and management
 */

declare class ConsentManager {
    private supabase;
    private config;
    constructor(supabaseUrl: string, supabaseKey: string, config?: Partial<ConsentBannerConfig>);
    /**
     * Get user's current consent preferences
     */
    getConsentPreferences(userId: string): Promise<ConsentPreferences | null>;
    /**
     * Save user's consent preferences
     */
    saveConsentPreferences(userId: string, preferences: Partial<ConsentPreferences>, metadata?: {
        ip_address?: string;
        user_agent?: string;
    }): Promise<boolean>;
    /**
     * Save cookie consent for session tracking
     */
    private saveCookieConsent;
    /**
     * Check if user has given specific consent
     */
    hasConsent(userId: string, consentType: ConsentType): Promise<boolean>;
    /**
     * Withdraw user consent
     */
    withdrawConsent(userId: string, consentType: ConsentType): Promise<boolean>;
    /**
     * Get consent banner configuration
     */
    getBannerConfig(): ConsentBannerConfig;
    /**
     * Update consent banner configuration
     */
    updateBannerConfig(config: Partial<ConsentBannerConfig>): void;
    /**
     * Generate consent banner HTML
     */
    generateConsentBanner(language?: string): string;
    /**
     * Get banner texts for specific language
     */
    private getBannerTexts;
    /**
     * Generate session ID
     */
    private generateSessionId;
    /**
     * Get consent statistics
     */
    getConsentStatistics(): Promise<{
        total_users: number;
        consent_rates: Record<ConsentType, number>;
        recent_consents: number;
    }>;
}

/**
 * Data Subject Rights Manager
 * Handles GDPR data subject rights requests (access, rectification, erasure, etc.)
 */

declare class DataSubjectRightsManager {
    private supabase;
    constructor(supabaseUrl: string, supabaseKey: string);
    /**
     * Create a new data subject request
     */
    createDataSubjectRequest(userId: string, requestType: DataSubjectRightType, description?: string): Promise<DataSubjectRequest | null>;
    /**
     * Get user's data subject requests
     */
    getUserRequests(userId: string): Promise<DataSubjectRequest[]>;
    /**
     * Get all pending data subject requests (admin)
     */
    getPendingRequests(): Promise<DataSubjectRequest[]>;
    /**
     * Update request status (admin)
     */
    updateRequestStatus(requestId: string, status: DataSubjectRequest['status'], adminNotes?: string): Promise<boolean>;
    /**
     * Handle data access request
     */
    handleDataAccessRequest(userId: string): Promise<DataExport | null>;
    /**
     * Process data export
     */
    private processDataExport;
    /**
     * Collect all user data
     */
    private collectUserData;
    /**
     * Handle data rectification request
     */
    handleDataRectificationRequest(userId: string, corrections: Record<string, any>): Promise<boolean>;
    /**
     * Handle data erasure request (right to be forgotten)
     */
    handleDataErasureRequest(userId: string): Promise<DataDeletionRequest | null>;
    /**
     * Process data deletion (admin)
     */
    processDataDeletion(requestId: string, approved: boolean): Promise<boolean>;
    /**
     * Perform actual data deletion
     */
    private performDataDeletion;
    /**
     * Handle data portability request
     */
    handleDataPortabilityRequest(userId: string): Promise<DataExport | null>;
    /**
     * Log data action for audit purposes
     */
    private logDataAction;
    /**
     * Notify admin about data subject request
     */
    private notifyAdmin;
    /**
     * Notify user about request status
     */
    private notifyUser;
    /**
     * Get data subject rights statistics
     */
    getRightsStatistics(): Promise<{
        total_requests: number;
        pending_requests: number;
        completed_requests: number;
        request_types: Record<DataSubjectRightType, number>;
    }>;
}

/**
 * Data Retention Manager
 * Handles data retention policies and automatic data cleanup
 */

declare class DataRetentionManager {
    private supabase;
    constructor(supabaseUrl: string, supabaseKey: string);
    /**
     * Create a new data retention policy
     */
    createRetentionPolicy(policy: Omit<DataRetentionPolicy, 'id' | 'created_at' | 'updated_at'>): Promise<DataRetentionPolicy | null>;
    /**
     * Get all data retention policies
     */
    getRetentionPolicies(): Promise<DataRetentionPolicy[]>;
    /**
     * Update data retention policy
     */
    updateRetentionPolicy(policyId: string, updates: Partial<DataRetentionPolicy>): Promise<boolean>;
    /**
     * Delete data retention policy
     */
    deleteRetentionPolicy(policyId: string): Promise<boolean>;
    /**
     * Process data retention cleanup
     */
    processDataRetentionCleanup(): Promise<{
        processed_policies: number;
        deleted_records: number;
        errors: string[];
    }>;
    /**
     * Apply a specific retention policy
     */
    private applyRetentionPolicy;
    /**
     * Cleanup audit logs older than cutoff date
     */
    private cleanupAuditLogs;
    /**
     * Cleanup old consent preferences (keep only latest per user)
     */
    private cleanupConsentPreferences;
    /**
     * Cleanup old cookie consent records
     */
    private cleanupCookieConsent;
    /**
     * Cleanup expired data exports
     */
    private cleanupDataExports;
    /**
     * Cleanup old user sessions
     */
    private cleanupUserSessions;
    /**
     * Cleanup old notification logs
     */
    private cleanupNotificationLogs;
    /**
     * Log cleanup activity for audit purposes
     */
    private logCleanupActivity;
    /**
     * Get data retention statistics
     */
    getRetentionStatistics(): Promise<{
        total_policies: number;
        active_policies: number;
        auto_delete_enabled: number;
        data_types_covered: string[];
        last_cleanup: string | null;
    }>;
    /**
     * Create default retention policies
     */
    createDefaultPolicies(): Promise<void>;
    /**
     * Check if data should be retained based on legal basis
     */
    shouldRetainData(dataType: string, legalBasis: string, ageInDays: number): Promise<boolean>;
}

/**
 * Audit Logger
 * Comprehensive audit logging for GDPR compliance and security monitoring
 */

declare class AuditLogger {
    private supabase;
    private enabled;
    constructor(supabaseUrl: string, supabaseKey: string, enabled?: boolean);
    /**
     * Log an audit event
     */
    log(action: string, resourceType: string, resourceId: string, options?: {
        userId?: string;
        oldValues?: any;
        newValues?: any;
        ipAddress?: string;
        userAgent?: string;
        metadata?: any;
    }): Promise<boolean>;
    /**
     * Log user authentication events
     */
    logAuthEvent(action: 'login' | 'logout' | 'register' | 'password_reset' | 'email_verification', userId: string, metadata?: any): Promise<boolean>;
    /**
     * Log data access events
     */
    logDataAccess(action: 'read' | 'create' | 'update' | 'delete' | 'export', resourceType: string, resourceId: string, userId: string, metadata?: any): Promise<boolean>;
    /**
     * Log consent events
     */
    logConsentEvent(action: 'given' | 'withdrawn' | 'updated', userId: string, consentType: string, metadata?: any): Promise<boolean>;
    /**
     * Log data subject rights events
     */
    logDataSubjectRights(action: 'requested' | 'processed' | 'completed' | 'rejected', requestType: string, userId: string, requestId: string, metadata?: any): Promise<boolean>;
    /**
     * Log admin actions
     */
    logAdminAction(action: string, resourceType: string, resourceId: string, adminUserId: string, metadata?: any): Promise<boolean>;
    /**
     * Log system events
     */
    logSystemEvent(action: string, resourceType: string, resourceId: string, metadata?: any): Promise<boolean>;
    /**
     * Log security events
     */
    logSecurityEvent(action: 'suspicious_activity' | 'failed_login' | 'unauthorized_access' | 'data_breach', userId?: string, resourceType?: string, resourceId?: string, metadata?: any): Promise<boolean>;
    /**
     * Get security event severity
     */
    private getSecuritySeverity;
    /**
     * Get audit logs for a specific user
     */
    getUserAuditLogs(userId: string, limit?: number, offset?: number): Promise<AuditLog[]>;
    /**
     * Get audit logs for a specific resource
     */
    getResourceAuditLogs(resourceType: string, resourceId: string, limit?: number, offset?: number): Promise<AuditLog[]>;
    /**
     * Get audit logs by action type
     */
    getAuditLogsByAction(action: string, limit?: number, offset?: number): Promise<AuditLog[]>;
    /**
     * Get audit logs within a date range
     */
    getAuditLogsByDateRange(startDate: Date, endDate: Date, limit?: number, offset?: number): Promise<AuditLog[]>;
    /**
     * Get audit statistics
     */
    getAuditStatistics(): Promise<{
        total_logs: number;
        logs_by_action: Record<string, number>;
        logs_by_user: Record<string, number>;
        logs_by_resource_type: Record<string, number>;
        recent_activity: number;
    }>;
    /**
     * Search audit logs
     */
    searchAuditLogs(query: string, filters?: {
        userId?: string;
        action?: string;
        resourceType?: string;
        startDate?: Date;
        endDate?: Date;
    }, limit?: number, offset?: number): Promise<AuditLog[]>;
    /**
     * Enable or disable audit logging
     */
    setEnabled(enabled: boolean): void;
    /**
     * Check if audit logging is enabled
     */
    isEnabled(): boolean;
}

/**
 * GDPR Service
 * Main service that coordinates all GDPR compliance features
 */

declare class GDPRService {
    private supabase;
    private consentManager;
    private dataSubjectRightsManager;
    private dataRetentionManager;
    private auditLogger;
    constructor(supabaseUrl: string, supabaseKey: string);
    /**
     * Initialize GDPR compliance system
     */
    initialize(): Promise<boolean>;
    /**
     * Get GDPR compliance status
     */
    getComplianceStatus(): Promise<GDPRComplianceStatus>;
    /**
     * Get active privacy policy
     */
    getActivePrivacyPolicy(): Promise<PrivacyPolicy | null>;
    /**
     * Create or update privacy policy
     */
    createPrivacyPolicy(policy: Omit<PrivacyPolicy, 'id' | 'created_at' | 'updated_at'>): Promise<PrivacyPolicy | null>;
    /**
     * Get cookie consent status
     */
    private getCookieConsentStatus;
    /**
     * Check breach procedures
     */
    private checkBreachProcedures;
    /**
     * Check staff training
     */
    private checkStaffTraining;
    /**
     * Get last audit date
     */
    private getLastAuditDate;
    /**
     * Calculate compliance score
     */
    private calculateComplianceScore;
    /**
     * Report a data breach
     */
    reportDataBreach(breach: Omit<DataBreach, 'id' | 'created_at' | 'updated_at'>): Promise<DataBreach | null>;
    /**
     * Send breach notifications
     */
    private sendBreachNotifications;
    /**
     * Notify data protection officer
     */
    private notifyDataProtectionOfficer;
    /**
     * Notify affected users
     */
    private notifyAffectedUsers;
    /**
     * Generate compliance report
     */
    generateComplianceReport(reportType: 'monthly' | 'quarterly' | 'annual' | 'ad_hoc', periodStart: Date, periodEnd: Date, generatedBy: string): Promise<ComplianceReport | null>;
    /**
     * Generate compliance recommendations
     */
    private generateRecommendations;
    /**
     * Generate audit findings
     */
    private generateAuditFindings;
    /**
     * Get consent manager instance
     */
    getConsentManager(): ConsentManager;
    /**
     * Get data subject rights manager instance
     */
    getDataSubjectRightsManager(): DataSubjectRightsManager;
    /**
     * Get data retention manager instance
     */
    getDataRetentionManager(): DataRetentionManager;
    /**
     * Get audit logger instance
     */
    getAuditLogger(): AuditLogger;
}

/**
 * Cookie Manager
 * Handles cookie consent and management for GDPR compliance
 */

declare class CookieManager {
    private consent;
    private onConsentChange?;
    constructor(onConsentChange?: (consent: CookieConsent) => void);
    /**
     * Load consent from localStorage
     */
    private loadConsentFromStorage;
    /**
     * Save consent to localStorage
     */
    private saveConsentToStorage;
    /**
     * Set cookie consent
     */
    setConsent(consent: Partial<CookieConsent>): void;
    /**
     * Get current consent
     */
    getConsent(): CookieConsent | null;
    /**
     * Check if specific consent type is given
     */
    hasConsent(consentType: ConsentType): boolean;
    /**
     * Withdraw consent for specific type
     */
    withdrawConsent(consentType: ConsentType): void;
    /**
     * Withdraw all non-essential consent
     */
    withdrawAllConsent(): void;
    /**
     * Set cookies based on consent
     */
    private setCookiesBasedOnConsent;
    /**
     * Set a cookie
     */
    private setCookie;
    /**
     * Delete a cookie
     */
    private deleteCookie;
    /**
     * Get a cookie value
     */
    getCookie(name: string): string | null;
    /**
     * Enable analytics tracking
     */
    private enableAnalytics;
    /**
     * Disable analytics tracking
     */
    private disableAnalytics;
    /**
     * Enable marketing tracking
     */
    private enableMarketing;
    /**
     * Disable marketing tracking
     */
    private disableMarketing;
    /**
     * Enable personalization
     */
    private enablePersonalization;
    /**
     * Disable personalization
     */
    private disablePersonalization;
    /**
     * Enable third-party services
     */
    private enableThirdParty;
    /**
     * Disable third-party services
     */
    private disableThirdParty;
    /**
     * Generate session ID
     */
    private generateSessionId;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Clear all cookies
     */
    clearAllCookies(): void;
    /**
     * Get cookie consent banner HTML
     */
    generateConsentBanner(): string;
    /**
     * Initialize cookie consent banner
     */
    initializeBanner(): void;
    /**
     * Add event listeners to consent banner
     */
    private addBannerEventListeners;
    /**
     * Hide consent banner
     */
    private hideBanner;
}

export { AuthSession, AuthUser, ConsentManager, CookieManager, CurrencyFormatter, CurrencyOptions, DataSubjectRightsManager, DateFormatter, DateOptions, Domain, DomainActionData, FeatureEntitlement, GDPRService, I18nProvider, I18nService, LeadData, Locale, N8NResponse, NumberFormatter, NumberOptions, OnboardingStatus, PlanUsage, SiteProvisioningData, SupportedLocale, TeamActivity, TeamInvitation, TeamMember, TeamSettings, TranslationOptions, UsageStats, UseAuthReturn, UseEntitlementReturn, UseFeatureGateProps, UseN8NReturn, UserData, UserPlan, Website, getBrowserSupabaseClient, useAuth, useCurrency, useDate, useEntitlements, useFeatureGate, useI18n, useIsAuthenticated, useLocale, useN8N, useNumber, useOnboardingStatus, usePlural, useRTL, useRequireAuth, useTeamActivity, useTeamInvitations, useTeamMembers, useTeamPermissions, useTeamSettings, useTranslation, useUser, useUserData };
