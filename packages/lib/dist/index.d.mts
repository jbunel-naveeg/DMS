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

type Plan = "starter" | "pro" | "custom";
declare function canAccess(feature: string, plan: Plan): boolean;
declare const plans: {
    id: string;
    price: number;
    currency: string;
    features: string[];
}[];

declare const briefSchema: z.ZodObject<{
    businessName: z.ZodString;
    tagline: z.ZodString;
    description: z.ZodString;
    vertical: z.ZodString;
}, "strip", z.ZodTypeAny, {
    businessName: string;
    tagline: string;
    description: string;
    vertical: string;
}, {
    businessName: string;
    tagline: string;
    description: string;
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

export { AppError, AuthResponse, AuthService, AuthSession, AuthUser, BriefInput, CreateDomainRequest, CreateDomainResponse, CreateSiteRequest, CreateSiteResponse, DesignInput, OnboardingStatus, Plan, STRIPE_WEBHOOK_SECRET, TenWebAPI, TenWebDomain, TenWebSite, UseAuthReturn, authService, briefSchema, canAccess, createAuthClient, createBrowserClient, createServerClient, designSchema, formatCurrency, formatDate, generateSchema, generateSubdomain, getBrowserSupabaseClient, getServerSupabaseClient, getServiceSupabaseClient, getStripe, getTenWebAPI, plans, tenWebAPI, useAuth, useIsAuthenticated, useOnboardingStatus, useRequireAuth, useUser };
