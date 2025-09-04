import * as _supabase_supabase_js from '@supabase/supabase-js';
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

type TenWebStatus = "generating" | "ready" | "error";
type GenerateRequest = {
    businessName: string;
    description: string;
    vertical?: string;
    colors?: Record<string, string>;
    fonts?: Record<string, string>;
};
type GenerateResponse = {
    tenweb_site_id: string;
    status: TenWebStatus;
    preview_url?: string;
};
declare function tenwebGenerate(req: GenerateRequest): Promise<GenerateResponse>;
declare function tenwebStatus(tenwebSiteId: string): Promise<GenerateResponse>;

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

export { AppError, BriefInput, DesignInput, GenerateRequest, GenerateResponse, Plan, STRIPE_WEBHOOK_SECRET, briefSchema, canAccess, designSchema, formatCurrency, formatDate, generateSchema, generateSubdomain, getBrowserSupabaseClient, getServerSupabaseClient, getServiceSupabaseClient, getStripe, plans, tenwebGenerate, tenwebStatus };
