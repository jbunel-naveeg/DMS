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
    status: 'active' | 'inactive' | 'pending';
    ssl_enabled: boolean;
    created_at: string;
    updated_at: string;
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

export { AppError, AuthResponse, AuthService, AuthSession, AuthUser, BriefInput, CancelSubscriptionRequest, CancelSubscriptionResponse, CheckoutSession, CreateCheckoutSessionRequest, CreateCheckoutSessionResponse, CreateDomainRequest, CreateDomainResponse, CreateSiteRequest, CreateSiteResponse, CreateSubscriptionRequest, CreateSubscriptionResponse, DesignInput, Domain, EntitlementCheck, EntitlementService, FeatureEntitlement, OnboardingStatus, PLANS, Plan, PlanLimits, PlanUsage, ProcessWebhookResponse, STRIPE_WEBHOOK_SECRET, StripeCheckoutService, StripeSubscriptionService, StripeWebhookService, Subscription, TenWebAPI, TenWebDomain, TenWebSite, UpdateSubscriptionRequest, UpdateSubscriptionResponse, UsageStats, UseAuthReturn, UseEntitlementReturn, UseFeatureGateProps, UserData, UserPlan, WebhookEvent, Website, authService, briefSchema, calculateUsagePercentage, createAuthClient, createBrowserClient, createServerClient, designSchema, entitlementService, formatBandwidthSize, formatCurrency, formatDate, formatStorageSize, generateSchema, generateSubdomain, getBrowserSupabaseClient, getPlanById, getPlanLimits, getServerSupabaseClient, getServiceSupabaseClient, getStripe, getTenWebAPI, isFeatureAvailable, stripeCheckoutService, stripeSubscriptionService, stripeWebhookService, tenWebAPI, useAuth, useEntitlements, useFeatureGate, useIsAuthenticated, useOnboardingStatus, useRequireAuth, useUser, useUserData };
