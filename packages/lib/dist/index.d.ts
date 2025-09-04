import * as _supabase_supabase_js from '@supabase/supabase-js';
import { User, Session, AuthError } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { z } from 'zod';

declare function getBrowserSupabaseClient(): _supabase_supabase_js.SupabaseClient<any, "public", "public", any, any>;

declare function getServerSupabaseClient(): _supabase_supabase_js.SupabaseClient<any, "public", "public", any, any>;
declare function getServiceSupabaseClient(): _supabase_supabase_js.SupabaseClient<any, "public", "public", any, any>;

declare class AppError extends Error {
    code: string;
    hint?: string;
    constructor(code: string, message: string, hint?: string);
}

declare function getStripe(): Stripe;
declare const STRIPE_WEBHOOK_SECRET: string;

interface CheckoutSession {
    id: string;
    url: string;
    customer_email?: string;
    customer_id?: string;
    subscription_id?: string;
}
interface CreateCheckoutSessionRequest {
    plan_id: string;
    customer_id?: string;
    customer_email?: string;
    success_url: string;
    cancel_url: string;
    trial_period_days?: number;
}
interface CreateCheckoutSessionResponse {
    success: boolean;
    session?: CheckoutSession;
    error?: string;
}
declare class StripeCheckoutService {
    private stripe;
    constructor(apiKey: string);
    createCheckoutSession(request: CreateCheckoutSessionRequest): Promise<CreateCheckoutSessionResponse>;
    retrieveCheckoutSession(sessionId: string): Promise<CheckoutSession | null>;
    createCustomerPortalSession(customerId: string, returnUrl: string): Promise<{
        url: string;
    } | null>;
}
declare const stripeCheckoutService: StripeCheckoutService;

interface Subscription {
    id: string;
    customer_id: string;
    status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
    current_period_start: number;
    current_period_end: number;
    cancel_at_period_end: boolean;
    canceled_at?: number;
    trial_start?: number;
    trial_end?: number;
    plan_id: string;
    price_id: string;
    created: number;
}
interface CreateSubscriptionRequest {
    customer_id: string;
    price_id: string;
    trial_period_days?: number;
}
interface CreateSubscriptionResponse {
    success: boolean;
    subscription?: Subscription;
    error?: string;
}
interface UpdateSubscriptionRequest {
    subscription_id: string;
    price_id?: string;
    cancel_at_period_end?: boolean;
}
interface UpdateSubscriptionResponse {
    success: boolean;
    subscription?: Subscription;
    error?: string;
}
interface CancelSubscriptionRequest {
    subscription_id: string;
    immediately?: boolean;
}
interface CancelSubscriptionResponse {
    success: boolean;
    subscription?: Subscription;
    error?: string;
}
declare class StripeSubscriptionService {
    private stripe;
    constructor(apiKey: string);
    createSubscription(request: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse>;
    updateSubscription(request: UpdateSubscriptionRequest): Promise<UpdateSubscriptionResponse>;
    cancelSubscription(request: CancelSubscriptionRequest): Promise<CancelSubscriptionResponse>;
    getSubscription(subscriptionId: string): Promise<Subscription | null>;
    getCustomerSubscriptions(customerId: string): Promise<Subscription[]>;
    getUpcomingInvoice(customerId: string): Promise<Stripe.Invoice | null>;
    private mapSubscription;
}
declare const stripeSubscriptionService: StripeSubscriptionService;

interface WebhookEvent {
    id: string;
    type: string;
    data: any;
    created: number;
}
interface ProcessWebhookResponse {
    success: boolean;
    error?: string;
}
declare class StripeWebhookService {
    private stripe;
    private supabase;
    constructor(stripeSecretKey: string, supabaseUrl: string, supabaseServiceKey: string);
    processWebhook(payload: string | Buffer, signature: string, webhookSecret: string): Promise<ProcessWebhookResponse>;
    private handleCheckoutSessionCompleted;
    private handleSubscriptionCreated;
    private handleSubscriptionUpdated;
    private handleSubscriptionDeleted;
    private handlePaymentSucceeded;
    private handlePaymentFailed;
    private handleCustomerCreated;
    private handleCustomerUpdated;
}
declare const stripeWebhookService: StripeWebhookService;

interface TenWebSite {
    id: string;
    name: string;
    url: string;
    status: 'active' | 'inactive' | 'pending';
    created_at: string;
    updated_at: string;
}
interface TenWebDomain {
    id: string;
    domain: string;
    site_id: string;
    status: 'active' | 'inactive' | 'pending' | 'failed' | 'suspended';
    ssl_enabled: boolean;
    ssl_status: 'pending' | 'active' | 'failed' | 'expired';
    created_at: string;
    updated_at: string;
    verified_at?: string;
    expires_at?: string;
    nameservers?: string[];
    dns_records?: TenWebDNSRecord[];
}
interface TenWebDNSRecord {
    type: 'A' | 'CNAME' | 'TXT' | 'MX';
    name: string;
    value: string;
    ttl: number;
    priority?: number;
}
interface CreateSiteRequest {
    name: string;
    subdomain: string;
    template?: string;
    description?: string;
}
interface CreateSiteResponse {
    success: boolean;
    site?: TenWebSite;
    error?: string;
}
interface CreateDomainRequest {
    site_id: string;
    domain: string;
}
interface CreateDomainResponse {
    success: boolean;
    domain?: TenWebDomain;
    error?: string;
}
declare class TenWebAPI {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string);
    private makeRequest;
    createSite(request: CreateSiteRequest): Promise<CreateSiteResponse>;
    getSites(): Promise<TenWebSite[]>;
    getSite(siteId: string): Promise<TenWebSite | null>;
    createDomain(request: CreateDomainRequest): Promise<CreateDomainResponse>;
    getDomains(siteId: string): Promise<TenWebDomain[]>;
    deleteSite(siteId: string): Promise<boolean>;
    deleteDomain(domainId: string): Promise<boolean>;
    getDomainStatus(domainId: string): Promise<TenWebDomain | null>;
    updateDomainDNS(domainId: string, records: TenWebDNSRecord[]): Promise<boolean>;
    verifyDomainOwnership(domain: string): Promise<{
        success: boolean;
        verified: boolean;
        error?: string;
    }>;
    getSSLStatus(domainId: string): Promise<{
        status: string;
        expires_at?: string;
        error?: string;
    }>;
    requestSSLCertificate(domainId: string): Promise<{
        success: boolean;
        error?: string;
    }>;
    getDomainAnalytics(domainId: string, period?: '7d' | '30d' | '90d'): Promise<{
        visitors: number;
        page_views: number;
        bounce_rate: number;
        avg_session_duration: number;
    } | null>;
}
declare const tenWebAPI: TenWebAPI;
declare function getTenWebAPI(): TenWebAPI;

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    interval: 'month' | 'year';
    features: string[];
    limits: {
        websites: number;
        domains: number;
        storage: number;
        bandwidth: number;
        team_members: number;
    };
    stripe_price_id?: string;
    is_popular?: boolean;
    is_enterprise?: boolean;
}
interface UserPlan {
    id: string;
    user_id: string;
    plan_id: string;
    status: 'active' | 'canceled' | 'past_due' | 'unpaid';
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    stripe_subscription_id?: string;
    stripe_customer_id?: string;
    created_at: string;
    updated_at: string;
    plan: Plan;
}
interface Website {
    id: string;
    user_id: string;
    name: string;
    subdomain: string;
    url: string;
    status: 'active' | 'inactive' | 'pending' | 'suspended';
    template: string;
    description?: string;
    created_at: string;
    updated_at: string;
    last_deployed_at?: string;
}
interface Domain {
    id: string;
    website_id: string;
    domain: string;
    status: 'active' | 'inactive' | 'pending' | 'failed';
    ssl_enabled: boolean;
    created_at: string;
    updated_at: string;
    website: Website;
}
interface UsageStats {
    websites_count: number;
    domains_count: number;
    storage_used: number;
    bandwidth_used: number;
    team_members_count: number;
}
interface PlanLimits {
    websites: number;
    domains: number;
    storage: number;
    bandwidth: number;
    team_members: number;
}
interface PlanUsage {
    websites: {
        used: number;
        limit: number;
    };
    domains: {
        used: number;
        limit: number;
    };
    storage: {
        used: number;
        limit: number;
    };
    bandwidth: {
        used: number;
        limit: number;
    };
    team_members: {
        used: number;
        limit: number;
    };
}
declare const PLANS: Plan[];
declare function getPlanById(id: string): Plan | undefined;
declare function getPlanLimits(planId: string): PlanLimits | null;
declare function calculateUsagePercentage(usage: number, limit: number): number;
declare function isFeatureAvailable(planId: string, feature: keyof PlanLimits, currentUsage: number): boolean;
declare function formatStorageSize(gb: number): string;
declare function formatBandwidthSize(gb: number): string;

declare const briefSchema: z.ZodObject<{
    businessName: z.ZodString;
    tagline: z.ZodString;
    description: z.ZodString;
    vertical: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    businessName: string;
    tagline: string;
    vertical: string;
}, {
    description: string;
    businessName: string;
    tagline: string;
    vertical: string;
}>;
declare const designSchema: z.ZodObject<{
    colors: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    fonts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    colors?: Record<string, string> | undefined;
    fonts?: Record<string, string> | undefined;
}, {
    colors?: Record<string, string> | undefined;
    fonts?: Record<string, string> | undefined;
}>;
declare const generateSchema: z.ZodObject<{
    draftId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    draftId: string;
}, {
    draftId: string;
}>;
type BriefInput = z.infer<typeof briefSchema>;
type DesignInput = z.infer<typeof designSchema>;

declare function formatCurrency(amount: number, currency?: string): string;
declare function formatDate(date: Date | string): string;
declare function generateSubdomain(name: string): string;

interface AuthUser extends User {
    user_metadata: {
        name?: string;
        avatar_url?: string;
    };
}
interface AuthSession extends Session {
    user: AuthUser;
}
interface AuthResponse {
    user: AuthUser | null;
    session: AuthSession | null;
    error: AuthError | null;
}
declare function createAuthClient(): _supabase_supabase_js.SupabaseClient<any, "public", "public", any, any>;
declare class AuthService {
    private supabase;
    signUp(email: string, password: string, name?: string): Promise<{
        data: {
            user: User | null;
            session: Session | null;
        } | {
            user: null;
            session: null;
        };
        error: AuthError | null;
    }>;
    signIn(email: string, password: string): Promise<{
        data: {
            user: User;
            session: Session;
            weakPassword?: _supabase_supabase_js.WeakPassword;
        } | {
            user: null;
            session: null;
            weakPassword?: null;
        };
        error: AuthError | null;
    }>;
    signInWithGoogle(): Promise<{
        data: {
            provider: _supabase_supabase_js.Provider;
            url: string;
        } | {
            provider: _supabase_supabase_js.Provider;
            url: null;
        };
        error: AuthError | null;
    }>;
    signOut(): Promise<{
        error: AuthError | null;
    }>;
    getCurrentUser(): Promise<{
        user: User | null;
        error: AuthError | null;
    }>;
    getCurrentSession(): Promise<{
        session: Session | null;
        error: AuthError | null;
    }>;
    resetPassword(email: string): Promise<{
        data: {} | null;
        error: AuthError | null;
    }>;
    updatePassword(password: string): Promise<{
        data: {
            user: User;
        } | {
            user: null;
        };
        error: AuthError | null;
    }>;
    updateProfile(updates: {
        name?: string;
        avatar_url?: string;
    }): Promise<{
        data: {
            user: User;
        } | {
            user: null;
        };
        error: AuthError | null;
    }>;
    onAuthStateChange(callback: (event: string, session: AuthSession | null) => void): {
        data: {
            subscription: _supabase_supabase_js.Subscription;
        };
    };
    getClient(): _supabase_supabase_js.SupabaseClient<any, "public", "public", any, any>;
}
declare const authService: AuthService;
declare const createBrowserClient: () => _supabase_supabase_js.SupabaseClient<any, "public", "public", any, any>;
declare const createServerClient: (cookies: any) => _supabase_supabase_js.SupabaseClient<any, "public", "public", any, any>;

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

interface FeatureEntitlement {
    feature: string;
    allowed: boolean;
    reason?: string;
    upgradeRequired?: boolean;
    currentUsage?: number;
    limit?: number;
}
interface EntitlementCheck {
    feature: string;
    planId: string;
    usage: PlanUsage;
    limits: PlanLimits;
}
declare class EntitlementService {
    private planLimits;
    private featureDefinitions;
    constructor();
    private initializeFeatureDefinitions;
    checkFeatureEntitlement(check: EntitlementCheck): FeatureEntitlement;
    private checkUsageLimits;
    private checkLimit;
    getAvailableFeatures(planId: string): string[];
    getFeatureTier(feature: string): 'trial' | 'starter' | 'pro' | 'enterprise';
    canUpgrade(currentPlanId: string, targetPlanId: string): boolean;
    getUpgradePath(currentPlanId: string): string[];
}
declare const entitlementService: EntitlementService;

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

interface OpenAIEmbedding {
    embedding: number[];
    index: number;
}
interface OpenAIEmbeddingResponse {
    data: OpenAIEmbedding[];
    model: string;
    usage: {
        prompt_tokens: number;
        total_tokens: number;
    };
}
interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: ChatMessage;
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
interface FAQDocument {
    id: string;
    title: string;
    content: string;
    category: string;
    embedding?: number[];
    created_at: string;
    updated_at: string;
}
interface ChatbotResponse {
    answer: string;
    sources: FAQDocument[];
    confidence: number;
    tokens_used: number;
}
declare class OpenAIService {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string);
    private makeRequest;
    generateEmbedding(text: string): Promise<number[]>;
    generateEmbeddings(texts: string[]): Promise<number[][]>;
    generateChatCompletion(messages: ChatMessage[], model?: string, maxTokens?: number, temperature?: number): Promise<ChatCompletionResponse>;
    processFAQDocument(document: {
        title: string;
        content: string;
        category: string;
    }): Promise<{
        embedding: number[];
        processed_content: string;
    }>;
    private cleanText;
    generateChatbotResponse(question: string, context: FAQDocument[], conversationHistory?: ChatMessage[]): Promise<ChatbotResponse>;
    private calculateConfidence;
    generateSearchQuery(question: string): string;
}
declare const openAIService: OpenAIService;
declare function getOpenAIService(): OpenAIService;

interface GoogleAnalyticsAccount {
    id: string;
    name: string;
    displayName: string;
    websiteUrl: string;
    type: string;
    permissions: {
        effective: string[];
    };
    createTime: string;
    updateTime: string;
}
interface GoogleAnalyticsProperty {
    id: string;
    name: string;
    displayName: string;
    parent: string;
    timeZone: string;
    currencyCode: string;
    createTime: string;
    updateTime: string;
}
interface GoogleAnalyticsDataStream {
    name: string;
    type: 'WEB_DATA_STREAM' | 'ANDROID_APP_DATA_STREAM' | 'IOS_APP_DATA_STREAM';
    displayName: string;
    webStreamData?: {
        measurementId: string;
        defaultUri: string;
        firebaseAppId?: string;
    };
    androidAppStreamData?: {
        firebaseAppId: string;
        packageName: string;
    };
    iosAppStreamData?: {
        firebaseAppId: string;
        bundleId: string;
    };
    createTime: string;
    updateTime: string;
}
interface GoogleAnalyticsReport {
    metricHeaders: Array<{
        name: string;
        type: string;
    }>;
    dimensionHeaders: Array<{
        name: string;
    }>;
    rows: Array<{
        dimensionValues: Array<{
            value: string;
        }>;
        metricValues: Array<{
            value: string;
        }>;
    }>;
    rowCount: number;
    metadata: {
        currencyCode: string;
        timeZone: string;
    };
}
interface GoogleAnalyticsMetrics {
    users: number;
    sessions: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
    newUsers: number;
    returningUsers: number;
    organicSearch: number;
    directTraffic: number;
    socialTraffic: number;
    referralTraffic: number;
    paidSearch: number;
    emailTraffic: number;
    topPages: Array<{
        page: string;
        pageViews: number;
        uniquePageViews: number;
        avgTimeOnPage: number;
        bounceRate: number;
    }>;
    topSources: Array<{
        source: string;
        medium: string;
        sessions: number;
        users: number;
        bounceRate: number;
    }>;
    topCountries: Array<{
        country: string;
        sessions: number;
        users: number;
    }>;
    topDevices: Array<{
        device: string;
        sessions: number;
        users: number;
    }>;
    topBrowsers: Array<{
        browser: string;
        sessions: number;
        users: number;
    }>;
}
declare class GoogleAnalyticsService {
    private accessToken;
    private baseUrl;
    private managementUrl;
    constructor(accessToken: string);
    private makeRequest;
    getAccounts(): Promise<GoogleAnalyticsAccount[]>;
    getProperties(accountId: string): Promise<GoogleAnalyticsProperty[]>;
    getDataStreams(propertyId: string): Promise<GoogleAnalyticsDataStream[]>;
    getAnalyticsData(propertyId: string, startDate: string, endDate: string, metrics?: string[], dimensions?: string[]): Promise<GoogleAnalyticsReport>;
    getMetrics(propertyId: string, startDate: string, endDate: string): Promise<GoogleAnalyticsMetrics>;
    private extractMetricValue;
    private extractTrafficSourceValue;
    private processTopPagesData;
    private processTrafficSourceData;
    private processGeoData;
    private processDeviceData;
    private processBrowserData;
}

interface GoogleSearchConsoleSite {
    siteUrl: string;
    permissionLevel: 'SITE_FULL' | 'SITE_READ_ONLY' | 'SITE_RESTRICTED' | 'SITE_UNVERIFIED';
}
interface GoogleSearchConsoleSearchAnalyticsData {
    rows: Array<{
        keys: string[];
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
    responseAggregationType: string;
}
interface GoogleSearchConsoleSearchAnalyticsQuery {
    startDate: string;
    endDate: string;
    dimensions?: string[];
    dimensionFilterGroups?: Array<{
        groupType: 'AND' | 'OR';
        filters: Array<{
            dimension: string;
            operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS';
            expression: string;
        }>;
    }>;
    rowLimit?: number;
    startRow?: number;
    searchType?: 'WEB' | 'IMAGE' | 'VIDEO' | 'NEWS' | 'DISCOVER' | 'GOOGLE_NEWS';
}
interface GoogleSearchConsoleSitemap {
    path: string;
    lastSubmitted: string;
    isPending: boolean;
    isSitemapsIndex: boolean;
    type: 'WEB' | 'IMAGE' | 'VIDEO' | 'NEWS' | 'DISCOVER' | 'GOOGLE_NEWS';
    contents: Array<{
        type: 'URL' | 'SITEMAP' | 'FEED';
        submitted: number;
        indexed: number;
    }>;
    warnings: string[];
    errors: string[];
}
interface GoogleSearchConsoleUrlInspectionResult {
    inspectionResult: {
        indexStatusResult: {
            verdict: 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL' | 'VERDICT_UNSPECIFIED';
            coverageState: 'COVERED' | 'NOT_COVERED' | 'COVERAGE_STATE_UNSPECIFIED';
            crawledAs: 'MOBILE' | 'DESKTOP' | 'CRAWLED_AS_UNSPECIFIED';
            lastCrawlTime: string;
            pageFetchState: 'SUCCESSFUL' | 'SOFT_404' | 'BLOCKED_ROBOTS_TXT' | 'NOT_FOUND' | 'ACCESS_DENIED' | 'SERVER_ERROR' | 'REDIRECT_ERROR' | 'ACCESS_FORBIDDEN' | 'BLOCKED_4XX' | 'INTERNAL_CRAWL_ERROR' | 'INVALID_URL' | 'PAGE_FETCH_STATE_UNSPECIFIED';
            indexingState: 'INDEXING_ALLOWED' | 'INDEXING_FORBIDDEN' | 'INDEXING_STATE_UNSPECIFIED';
            robotsTxtState: 'ALLOWED' | 'DISALLOWED' | 'ROBOTS_TXT_STATE_UNSPECIFIED';
            userAgent: string;
        };
        richResultsResult: {
            verdict: 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL' | 'VERDICT_UNSPECIFIED';
            detectedItems: Array<{
                invalidArgumentNames: string[];
                invalidArgumentValues: string[];
                richResultType: string;
                issues: Array<{
                    severity: 'ERROR' | 'WARNING' | 'INFO' | 'SEVERITY_UNSPECIFIED';
                    message: string;
                }>;
            }>;
        };
        mobileUsabilityResult: {
            verdict: 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL' | 'VERDICT_UNSPECIFIED';
            issues: Array<{
                severity: 'ERROR' | 'WARNING' | 'INFO' | 'SEVERITY_UNSPECIFIED';
                message: string;
            }>;
        };
    };
}
interface GoogleSearchConsoleMetrics {
    totalClicks: number;
    totalImpressions: number;
    averageCtr: number;
    averagePosition: number;
    topQueries: Array<{
        query: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
    topPages: Array<{
        page: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
    topCountries: Array<{
        country: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
    topDevices: Array<{
        device: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
    searchAppearance: Array<{
        type: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
}
declare class GoogleSearchConsoleService {
    private accessToken;
    private baseUrl;
    constructor(accessToken: string);
    private makeRequest;
    getSites(): Promise<GoogleSearchConsoleSite[]>;
    getSearchAnalytics(siteUrl: string, query: GoogleSearchConsoleSearchAnalyticsQuery): Promise<GoogleSearchConsoleSearchAnalyticsData>;
    getSitemaps(siteUrl: string): Promise<GoogleSearchConsoleSitemap[]>;
    inspectUrl(siteUrl: string, url: string): Promise<GoogleSearchConsoleUrlInspectionResult>;
    getMetrics(siteUrl: string, startDate: string, endDate: string): Promise<GoogleSearchConsoleMetrics>;
    private calculateTotalClicks;
    private calculateTotalImpressions;
    private calculateAverageCtr;
    private calculateAveragePosition;
    private processQueriesData;
    private processPagesData;
    private processCountriesData;
    private processDevicesData;
    private processSearchAppearanceData;
}

interface GoogleBusinessProfileAccount {
    name: string;
    accountName: string;
    type: 'PERSONAL' | 'BUSINESS';
    role: 'OWNER' | 'MANAGER' | 'COMMUNITY_MANAGER' | 'ADMIN';
    state: 'ACCOUNT_STATE_UNSPECIFIED' | 'VERIFIED' | 'UNVERIFIED' | 'VERIFICATION_REQUIRED';
    vettedState: 'VETTED_STATE_UNSPECIFIED' | 'VETTED' | 'NOT_VETTED';
    permissionLevel: 'PERMISSION_LEVEL_UNSPECIFIED' | 'OWNER_LEVEL' | 'MANAGER_LEVEL' | 'COMMUNITY_LEVEL';
}
interface GoogleBusinessProfileLocation {
    name: string;
    title: string;
    storefrontAddress: {
        addressLines: string[];
        locality: string;
        administrativeArea: string;
        postalCode: string;
        regionCode: string;
    };
    primaryPhone: string;
    primaryCategory: {
        name: string;
        categoryId: string;
    };
    additionalCategories: Array<{
        name: string;
        categoryId: string;
    }>;
    websiteUri: string;
    regularHours: {
        weekdayDescriptions: string[];
    };
    specialHours: Array<{
        startDate: {
            year: number;
            month: number;
            day: number;
        };
        endDate: {
            year: number;
            month: number;
            day: number;
        };
        hourType: 'HOUR_TYPE_UNSPECIFIED' | 'OPEN' | 'CLOSED' | 'HOLIDAY';
    }>;
    profile: {
        description: string;
        attributes: Array<{
            name: string;
            values: string[];
        }>;
    };
    metrics: {
        totalReviewCount: number;
        averageRating: number;
        totalPhotoCount: number;
    };
    state: 'LOCATION_STATE_UNSPECIFIED' | 'VERIFIED' | 'UNVERIFIED' | 'VERIFICATION_REQUIRED';
    metadata: {
        hasGoogleUpdated: boolean;
        hasPendingEdits: boolean;
        canDelete: boolean;
        canOperateLocalPost: boolean;
        canOperateLodgingData: boolean;
        canOperateFoodMenu: boolean;
        canOperateFoodReservation: boolean;
        canOperateLodgingReservation: boolean;
        canDuplicate: boolean;
        canHaveBusinessCalls: boolean;
        canHaveBusinessMessages: boolean;
        canModifyServiceList: boolean;
        canOperateHealthData: boolean;
        canOperateInsuranceData: boolean;
    };
}
interface GoogleBusinessProfileInsight {
    metric: {
        metric: string;
        displayName: string;
    };
    metricValue: {
        stringValue?: string;
        intValue?: number;
        doubleValue?: number;
        moneyValue?: {
            currencyCode: string;
            units: string;
            nanos: number;
        };
    };
    dimensionalValues: Array<{
        metric: {
            metric: string;
            displayName: string;
        };
        value: {
            stringValue?: string;
            intValue?: number;
            doubleValue?: number;
        };
    }>;
}
interface GoogleBusinessProfileMetrics {
    totalViews: number;
    totalCalls: number;
    totalDirectionRequests: number;
    totalWebsiteClicks: number;
    totalPhotoViews: number;
    totalPosts: number;
    totalReviews: number;
    averageRating: number;
    topSearchQueries: Array<{
        query: string;
        views: number;
    }>;
    topPhotoViews: Array<{
        photoUrl: string;
        views: number;
    }>;
    customerActions: Array<{
        action: string;
        count: number;
    }>;
    hourlyViews: Array<{
        hour: number;
        views: number;
    }>;
    dailyViews: Array<{
        date: string;
        views: number;
    }>;
    monthlyViews: Array<{
        month: string;
        views: number;
    }>;
}
interface GoogleBusinessProfilePost {
    name: string;
    languageCode: string;
    summary: string;
    callToAction: {
        actionType: 'ACTION_TYPE_UNSPECIFIED' | 'BOOK' | 'ORDER_ONLINE' | 'SHOP' | 'LEARN_MORE' | 'SIGN_UP' | 'GET_OFFER' | 'CALL';
        url?: string;
    };
    offer?: {
        couponCode?: string;
        redeemOnlineUrl?: string;
        termsConditions?: string;
    };
    event?: {
        title: string;
        startTime: string;
        endTime: string;
    };
    media: Array<{
        mediaFormat: 'MEDIA_FORMAT_UNSPECIFIED' | 'PHOTO' | 'VIDEO';
        sourceUrl: string;
        thumbnailUrl?: string;
    }>;
    state: 'POST_STATE_UNSPECIFIED' | 'LIVE' | 'REJECTED' | 'PENDING_REVIEW';
    createTime: string;
    updateTime: string;
}
declare class GoogleBusinessProfileService {
    private accessToken;
    private baseUrl;
    private businessUrl;
    private insightsUrl;
    constructor(accessToken: string);
    private makeRequest;
    getAccounts(): Promise<GoogleBusinessProfileAccount[]>;
    getLocations(accountId: string): Promise<GoogleBusinessProfileLocation[]>;
    getInsights(locationId: string, startDate: string, endDate: string, metricRequests: Array<{
        metric: string;
        options: string[];
    }>): Promise<GoogleBusinessProfileInsight[]>;
    getPosts(locationId: string): Promise<GoogleBusinessProfilePost[]>;
    getMetrics(locationId: string, startDate: string, endDate: string): Promise<GoogleBusinessProfileMetrics>;
    private extractMetricValue;
    private processSearchQueries;
    private processPhotoViews;
    private processCustomerActions;
    private processHourlyViews;
    private processDailyViews;
    private processMonthlyViews;
}

interface GoogleOAuthConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes: string[];
}
interface GoogleIntegration {
    id: string;
    type: 'analytics' | 'search_console' | 'business_profile';
    accountId: string;
    accountName: string;
    propertyId?: string;
    siteUrl?: string;
    locationId?: string;
    accessToken: string;
    refreshToken?: string;
    expiresAt: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
interface GoogleMetricsSummary {
    analytics?: GoogleAnalyticsMetrics;
    searchConsole?: GoogleSearchConsoleMetrics;
    businessProfile?: GoogleBusinessProfileMetrics;
    lastUpdated: string;
}
declare class GoogleService {
    private analyticsService?;
    private searchConsoleService?;
    private businessProfileService?;
    constructor(integrations: GoogleIntegration[]);
    static getAuthorizationUrl(config: GoogleOAuthConfig): string;
    static exchangeCodeForTokens(code: string, config: GoogleOAuthConfig): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    static refreshAccessToken(refreshToken: string, config: GoogleOAuthConfig): Promise<{
        accessToken: string;
        expiresIn: number;
    }>;
    getMetricsSummary(startDate: string, endDate: string, propertyId?: string, siteUrl?: string, locationId?: string): Promise<GoogleMetricsSummary>;
    getAnalyticsService(): GoogleAnalyticsService | undefined;
    getSearchConsoleService(): GoogleSearchConsoleService | undefined;
    getBusinessProfileService(): GoogleBusinessProfileService | undefined;
    isServiceAvailable(type: 'analytics' | 'search_console' | 'business_profile'): boolean;
    getAvailableServices(): Array<'analytics' | 'search_console' | 'business_profile'>;
}
declare const GOOGLE_OAUTH_SCOPES: {
    analytics: string[];
    search_console: string[];
    business_profile: string[];
};
declare function getAllGoogleScopes(): string[];
declare function getScopesForServices(services: Array<'analytics' | 'search_console' | 'business_profile'>): string[];

interface TeamMember {
    id: string;
    user_id: string;
    website_id: string;
    role: 'admin' | 'editor';
    permissions: TeamPermissions;
    invited_by: string;
    invited_at: string;
    joined_at?: string;
    status: 'pending' | 'active' | 'suspended';
    last_active?: string;
    created_at: string;
    updated_at: string;
    user?: {
        id: string;
        email: string;
        full_name?: string;
        avatar_url?: string;
    };
}
interface TeamPermissions {
    can_manage_website: boolean;
    can_manage_domains: boolean;
    can_manage_analytics: boolean;
    can_manage_billing: boolean;
    can_manage_team: boolean;
    can_manage_integrations: boolean;
    can_manage_content: boolean;
    can_manage_settings: boolean;
}
interface TeamInvitation {
    id: string;
    email: string;
    website_id: string;
    role: 'admin' | 'editor';
    permissions: TeamPermissions;
    invited_by: string;
    token: string;
    expires_at: string;
    status: 'pending' | 'accepted' | 'expired' | 'revoked';
    created_at: string;
    updated_at: string;
}
interface TeamActivity {
    id: string;
    user_id: string;
    website_id: string;
    action: string;
    resource_type: string;
    resource_id?: string;
    details: Record<string, any>;
    ip_address?: string;
    user_agent?: string;
    created_at: string;
}
interface TeamSettings {
    id: string;
    website_id: string;
    allow_self_registration: boolean;
    require_approval: boolean;
    max_team_members: number;
    session_timeout: number;
    two_factor_required: boolean;
    password_policy: {
        min_length: number;
        require_uppercase: boolean;
        require_lowercase: boolean;
        require_numbers: boolean;
        require_symbols: boolean;
    };
    notification_settings: {
        email_invitations: boolean;
        email_activity: boolean;
        email_security: boolean;
    };
    created_at: string;
    updated_at: string;
}
declare const DEFAULT_ROLE_PERMISSIONS: Record<'admin' | 'editor', TeamPermissions>;
declare const TEAM_MEMBER_STATUS_COLORS: {
    readonly pending: "yellow";
    readonly active: "green";
    readonly suspended: "red";
};
declare const TEAM_MEMBER_ROLE_COLORS: {
    readonly admin: "purple";
    readonly editor: "blue";
};

declare class TeamService {
    private supabase;
    constructor(serverClient?: any);
    getTeamMembers(websiteId: string): Promise<{
        data: TeamMember[];
        error: any;
    }>;
    addTeamMember(websiteId: string, email: string, role: 'admin' | 'editor', invitedBy: string): Promise<{
        data: TeamInvitation | null;
        error: any;
    }>;
    updateTeamMember(memberId: string, updates: Partial<Pick<TeamMember, 'role' | 'permissions' | 'status'>>): Promise<{
        data: TeamMember | null;
        error: any;
    }>;
    removeTeamMember(memberId: string): Promise<{
        error: any;
    }>;
    getTeamInvitations(websiteId: string): Promise<{
        data: TeamInvitation[];
        error: any;
    }>;
    acceptInvitation(token: string, userId: string): Promise<{
        data: TeamMember | null;
        error: any;
    }>;
    revokeInvitation(invitationId: string): Promise<{
        error: any;
    }>;
    logActivity(websiteId: string, userId: string, action: string, resourceType: string, resourceId?: string, details?: Record<string, any>, ipAddress?: string, userAgent?: string): Promise<{
        error: any;
    }>;
    getTeamActivity(websiteId: string, limit?: number, offset?: number): Promise<{
        data: TeamActivity[];
        error: any;
    }>;
    getTeamSettings(websiteId: string): Promise<{
        data: TeamSettings | null;
        error: any;
    }>;
    updateTeamSettings(websiteId: string, settings: Partial<TeamSettings>): Promise<{
        data: TeamSettings | null;
        error: any;
    }>;
    checkPermission(userId: string, websiteId: string, permission: string): Promise<boolean>;
    getUserRole(userId: string, websiteId: string): Promise<'admin' | 'editor' | null>;
    private generateInvitationToken;
    private sendInvitationEmail;
    static createServerInstance(cookies: any): TeamService;
}

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

interface LeadData {
    email: string;
    name: string;
    company?: string;
    phone?: string;
    source: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
}
interface SiteProvisioningData {
    user_id: string;
    site_name: string;
    subdomain: string;
    template?: string;
}
interface DomainActionData {
    action: 'verify' | 'ssl_request' | 'delete';
    domain: string;
    user_id: string;
    website_id?: string;
}
interface N8NResponse {
    success: boolean;
    message: string;
    [key: string]: any;
}
declare class N8NService {
    private baseUrl;
    constructor(baseUrl?: string);
    /**
     * Capture a lead from the marketing site
     */
    captureLead(leadData: LeadData): Promise<N8NResponse>;
    /**
     * Provision a new site
     */
    provisionSite(siteData: SiteProvisioningData): Promise<N8NResponse>;
    /**
     * Process domain action
     */
    processDomainAction(domainData: DomainActionData): Promise<N8NResponse>;
    /**
     * Check N8N health
     */
    checkHealth(): Promise<boolean>;
    /**
     * Get workflow status
     */
    getWorkflowStatus(workflowId: string): Promise<any>;
}
declare const n8nService: N8NService;

interface UseN8NReturn {
    captureLead: (leadData: LeadData) => Promise<N8NResponse>;
    provisionSite: (siteData: SiteProvisioningData) => Promise<N8NResponse>;
    processDomainAction: (domainData: DomainActionData) => Promise<N8NResponse>;
    checkHealth: () => Promise<boolean>;
    loading: boolean;
    error: string | null;
}
declare function useN8N(): UseN8NReturn;

export { AppError, AuthResponse, AuthService, AuthSession, AuthUser, BriefInput, CancelSubscriptionRequest, CancelSubscriptionResponse, ChatCompletionResponse, ChatMessage, ChatbotResponse, CheckoutSession, CreateCheckoutSessionRequest, CreateCheckoutSessionResponse, CreateDomainRequest, CreateDomainResponse, CreateSiteRequest, CreateSiteResponse, CreateSubscriptionRequest, CreateSubscriptionResponse, DEFAULT_ROLE_PERMISSIONS, DesignInput, Domain, DomainActionData, EntitlementCheck, EntitlementService, FAQDocument, FeatureEntitlement, GOOGLE_OAUTH_SCOPES, GoogleAnalyticsAccount, GoogleAnalyticsDataStream, GoogleAnalyticsMetrics, GoogleAnalyticsProperty, GoogleAnalyticsReport, GoogleAnalyticsService, GoogleBusinessProfileAccount, GoogleBusinessProfileInsight, GoogleBusinessProfileLocation, GoogleBusinessProfileMetrics, GoogleBusinessProfilePost, GoogleBusinessProfileService, GoogleIntegration, GoogleMetricsSummary, GoogleOAuthConfig, GoogleSearchConsoleMetrics, GoogleSearchConsoleSearchAnalyticsData, GoogleSearchConsoleSearchAnalyticsQuery, GoogleSearchConsoleService, GoogleSearchConsoleSite, GoogleSearchConsoleSitemap, GoogleSearchConsoleUrlInspectionResult, GoogleService, LeadData, N8NResponse, N8NService, OnboardingStatus, OpenAIEmbedding, OpenAIEmbeddingResponse, OpenAIService, PLANS, Plan, PlanLimits, PlanUsage, ProcessWebhookResponse, STRIPE_WEBHOOK_SECRET, SiteProvisioningData, StripeCheckoutService, StripeSubscriptionService, StripeWebhookService, Subscription, TEAM_MEMBER_ROLE_COLORS, TEAM_MEMBER_STATUS_COLORS, TeamActivity, TeamInvitation, TeamMember, TeamPermissions, TeamService, TeamSettings, TenWebAPI, TenWebDNSRecord, TenWebDomain, TenWebSite, UpdateSubscriptionRequest, UpdateSubscriptionResponse, UsageStats, UseAuthReturn, UseEntitlementReturn, UseFeatureGateProps, UseN8NReturn, UserData, UserPlan, WebhookEvent, Website, authService, briefSchema, calculateUsagePercentage, createAuthClient, createBrowserClient, createServerClient, designSchema, entitlementService, formatBandwidthSize, formatCurrency, formatDate, formatStorageSize, generateSchema, generateSubdomain, getAllGoogleScopes, getBrowserSupabaseClient, getOpenAIService, getPlanById, getPlanLimits, getScopesForServices, getServerSupabaseClient, getServiceSupabaseClient, getStripe, getTenWebAPI, isFeatureAvailable, n8nService, openAIService, stripeCheckoutService, stripeSubscriptionService, stripeWebhookService, tenWebAPI, useAuth, useEntitlements, useFeatureGate, useIsAuthenticated, useN8N, useOnboardingStatus, useRequireAuth, useTeamActivity, useTeamInvitations, useTeamMembers, useTeamPermissions, useTeamSettings, useUser, useUserData };
