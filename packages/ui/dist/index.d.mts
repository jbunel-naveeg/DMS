import { ClassValue } from 'clsx';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ToastPrimitives from '@radix-ui/react-toast';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare function cn(...inputs: ClassValue[]): string;

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_dist_types.ClassProp | undefined) => string> & React.RefAttributes<HTMLLabelElement>>;

declare const Separator: React.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const ToastProvider: React.FC<ToastPrimitives.ToastProviderProps>;
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const Toast: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & React.RefAttributes<HTMLLIElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string> & React.RefAttributes<HTMLLIElement>>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface AuthFormProps {
    mode: 'signin' | 'signup' | 'reset';
    onSubmit: (data: AuthFormData) => Promise<{
        error: any;
    }>;
    onGoogleSignIn?: () => Promise<{
        error: any;
    }>;
    onModeChange: (mode: 'signin' | 'signup' | 'reset') => void;
    loading?: boolean;
    className?: string;
}
interface AuthFormData {
    email: string;
    password: string;
    name?: string;
}
declare function AuthForm({ mode, onSubmit, onGoogleSignIn, onModeChange, loading, className }: AuthFormProps): react_jsx_runtime.JSX.Element;

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    requireAuth?: boolean;
    className?: string;
    user?: any;
    loading?: boolean;
}
declare function ProtectedRoute({ children, fallback, requireAuth, className, user, loading }: ProtectedRouteProps): react_jsx_runtime.JSX.Element;

interface UserMenuProps {
    user: {
        id: string;
        email?: string;
        name?: string;
        avatar_url?: string;
    };
    onSignOut: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
    className?: string;
}
declare function UserMenu({ user, onSignOut, onProfileClick, onSettingsClick, className }: UserMenuProps): react_jsx_runtime.JSX.Element;

interface OnboardingStepProps {
    step: number;
    totalSteps: number;
    title: string;
    description?: string;
    children: React.ReactNode;
    isCompleted?: boolean;
    isActive?: boolean;
    className?: string;
}
declare function OnboardingStep({ step, totalSteps, title, description, children, isCompleted, isActive, className }: OnboardingStepProps): react_jsx_runtime.JSX.Element;

interface SiteFormData {
    name: string;
    subdomain: string;
    template: string;
    description?: string;
}
interface SiteFormProps {
    onSubmit: (data: SiteFormData) => Promise<{
        error?: string;
    }>;
    loading?: boolean;
    className?: string;
}
declare function SiteForm({ onSubmit, loading, className }: SiteFormProps): react_jsx_runtime.JSX.Element;

interface DomainFormData {
    domain: string;
}
interface DomainFormProps {
    siteUrl: string;
    onSubmit: (data: DomainFormData) => Promise<{
        error?: string;
    }>;
    onSkip: () => void;
    loading?: boolean;
    className?: string;
}
declare function DomainForm({ siteUrl, onSubmit, onSkip, loading, className }: DomainFormProps): react_jsx_runtime.JSX.Element;

interface OnboardingProgressProps {
    currentStep: number;
    totalSteps: number;
    steps: {
        id: string;
        title: string;
        completed: boolean;
    }[];
    className?: string;
}
declare function OnboardingProgress({ currentStep, totalSteps, steps, className }: OnboardingProgressProps): react_jsx_runtime.JSX.Element;

interface PlanBadgeProps {
    plan: {
        id: string;
        name: string;
        is_popular?: boolean;
        is_enterprise?: boolean;
    };
    className?: string;
}
declare function PlanBadge({ plan, className }: PlanBadgeProps): react_jsx_runtime.JSX.Element;

interface UsageBarProps {
    label: string;
    used: number;
    limit: number;
    unit?: string;
    className?: string;
}
declare function UsageBar({ label, used, limit, unit, className }: UsageBarProps): react_jsx_runtime.JSX.Element;

interface WebsiteCardProps {
    website: {
        id: string;
        name: string;
        url: string;
        status: 'active' | 'inactive' | 'pending' | 'suspended';
        template: string;
        last_deployed_at?: string;
    };
    onEdit?: () => void;
    onView?: () => void;
    onDelete?: () => void;
    className?: string;
}
declare function WebsiteCard({ website, onEdit, onView, onDelete, className }: WebsiteCardProps): react_jsx_runtime.JSX.Element;

interface DomainCardProps {
    domain: {
        id: string;
        domain: string;
        status: 'active' | 'inactive' | 'pending' | 'failed';
        ssl_enabled: boolean;
        website: {
            id: string;
            name: string;
            url: string;
        };
    };
    onEdit?: () => void;
    onView?: () => void;
    onDelete?: () => void;
    className?: string;
}
declare function DomainCard({ domain, onEdit, onView, onDelete, className }: DomainCardProps): react_jsx_runtime.JSX.Element;

interface UpgradeCTAProps {
    currentPlan: {
        id: string;
        name: string;
    };
    suggestedPlan: {
        id: string;
        name: string;
        price: number;
        interval: string;
        features: string[];
    };
    onUpgrade: () => void;
    reason?: string;
    className?: string;
}
declare function UpgradeCTA({ currentPlan, suggestedPlan, onUpgrade, reason, className }: UpgradeCTAProps): react_jsx_runtime.JSX.Element;
interface UsageUpgradeCTAProps {
    feature: string;
    currentUsage: number;
    limit: number;
    suggestedPlan: {
        id: string;
        name: string;
        price: number;
        interval: string;
    };
    onUpgrade: () => void;
    className?: string;
}
declare function UsageUpgradeCTA({ feature, currentUsage, limit, suggestedPlan, onUpgrade, className }: UsageUpgradeCTAProps): react_jsx_runtime.JSX.Element;

interface PricingCardProps {
    plan: {
        id: string;
        name: string;
        description: string;
        price: number;
        interval: string;
        features: string[];
        is_popular?: boolean;
        is_enterprise?: boolean;
    };
    currentPlanId?: string;
    onSelect: (planId: string) => void;
    loading?: boolean;
    className?: string;
}
declare function PricingCard({ plan, currentPlanId, onSelect, loading, className }: PricingCardProps): react_jsx_runtime.JSX.Element;

interface BillingInfoProps {
    subscription: {
        id: string;
        status: string;
        current_period_start: string;
        current_period_end: string;
        cancel_at_period_end: boolean;
        plan: {
            id: string;
            name: string;
            price: number;
            interval: string;
        };
    };
    onManageBilling: () => void;
    onUpgrade: () => void;
    onCancel: () => void;
    className?: string;
}
declare function BillingInfo({ subscription, onManageBilling, onUpgrade, onCancel, className }: BillingInfoProps): react_jsx_runtime.JSX.Element;

interface Invoice {
    id: string;
    number: string;
    status: 'paid' | 'open' | 'void' | 'uncollectible';
    amount_paid: number;
    amount_due: number;
    currency: string;
    created: number;
    due_date?: number;
    hosted_invoice_url?: string;
    invoice_pdf?: string;
}
interface InvoiceListProps {
    invoices: Invoice[];
    onDownload: (invoiceId: string) => void;
    onView: (invoiceId: string) => void;
    loading?: boolean;
    className?: string;
}
declare function InvoiceList({ invoices, onDownload, onView, loading, className }: InvoiceListProps): react_jsx_runtime.JSX.Element;

interface FeatureGateProps {
    feature: string;
    fallback?: React.ReactNode;
    children: React.ReactNode;
    showUpgrade?: boolean;
    className?: string;
}
declare function FeatureGate({ feature, fallback, children, showUpgrade, className }: FeatureGateProps): react_jsx_runtime.JSX.Element;
interface FeatureBadgeProps {
    feature: string;
    className?: string;
}
declare function FeatureBadge({ feature, className }: FeatureBadgeProps): react_jsx_runtime.JSX.Element;
interface FeatureTooltipProps {
    feature: string;
    children: React.ReactNode;
    className?: string;
}
declare function FeatureTooltip({ feature, children, className }: FeatureTooltipProps): react_jsx_runtime.JSX.Element;

interface EntitlementCardProps {
    title: string;
    description: string;
    features: Array<{
        name: string;
        feature: string;
        description?: string;
    }>;
    onUpgrade?: () => void;
    className?: string;
}
declare function EntitlementCard({ title, description, features, onUpgrade, className }: EntitlementCardProps): react_jsx_runtime.JSX.Element;
interface FeatureComparisonProps {
    features: Array<{
        name: string;
        feature: string;
        description?: string;
    }>;
    onUpgrade?: () => void;
    className?: string;
}
declare function FeatureComparison({ features, onUpgrade, className }: FeatureComparisonProps): react_jsx_runtime.JSX.Element;

interface DomainManagerProps {
    websiteId: string;
    domains: Array<{
        id: string;
        domain: string;
        status: 'active' | 'inactive' | 'pending' | 'failed' | 'suspended';
        ssl_status: 'pending' | 'active' | 'failed' | 'expired';
        ssl_enabled: boolean;
        verified_at?: string;
        expires_at?: string;
        nameservers?: string[];
        dns_records?: Array<{
            type: string;
            name: string;
            value: string;
            ttl: number;
        }>;
    }>;
    onAddDomain: (domain: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onRemoveDomain: (domainId: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onVerifyDomain: (domainId: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onRequestSSL: (domainId: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    loading?: boolean;
    className?: string;
}
declare function DomainManager({ websiteId, domains, onAddDomain, onRemoveDomain, onVerifyDomain, onRequestSSL, loading, className }: DomainManagerProps): react_jsx_runtime.JSX.Element;

interface DomainVerificationProps {
    domain: string;
    verificationMethod: 'dns' | 'file';
    verificationData: {
        dns_record?: {
            type: string;
            name: string;
            value: string;
        };
        file_path?: string;
        file_content?: string;
    };
    onVerify: () => Promise<{
        success: boolean;
        error?: string;
    }>;
    onRefresh: () => Promise<void>;
    loading?: boolean;
    className?: string;
}
declare function DomainVerification({ domain, verificationMethod, verificationData, onVerify, onRefresh, loading, className }: DomainVerificationProps): react_jsx_runtime.JSX.Element;

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: Array<{
        title: string;
        content: string;
        category: string;
    }>;
    confidence?: number;
}
interface ChatbotProps {
    messages: ChatMessage[];
    onSendMessage: (message: string) => Promise<void>;
    onClearHistory: () => void;
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}
declare function Chatbot({ messages, onSendMessage, onClearHistory, loading, disabled, placeholder, className }: ChatbotProps): react_jsx_runtime.JSX.Element;
interface ChatbotWidgetProps {
    onSendMessage: (message: string) => Promise<void>;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}
declare function ChatbotWidget({ onSendMessage, loading, disabled, className }: ChatbotWidgetProps): react_jsx_runtime.JSX.Element;

interface FAQDocument {
    id: string;
    title: string;
    content: string;
    category: string;
    created_at: string;
    updated_at: string;
}
interface FAQManagerProps {
    faqs: FAQDocument[];
    onAddFAQ: (faq: Omit<FAQDocument, 'id' | 'created_at' | 'updated_at'>) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onUpdateFAQ: (id: string, faq: Partial<FAQDocument>) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onDeleteFAQ: (id: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onProcessFAQ: (id: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    loading?: boolean;
    className?: string;
}
declare function FAQManager({ faqs, onAddFAQ, onUpdateFAQ, onDeleteFAQ, onProcessFAQ, loading, className }: FAQManagerProps): react_jsx_runtime.JSX.Element;

export { AuthForm, AuthFormData, AuthFormProps, BillingInfo, BillingInfoProps, Button, ButtonProps, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ChatMessage, Chatbot, ChatbotProps, ChatbotWidget, ChatbotWidgetProps, DomainCard, DomainCardProps, DomainForm, DomainFormData, DomainFormProps, DomainManager, DomainManagerProps, DomainVerification, DomainVerificationProps, EntitlementCard, EntitlementCardProps, FAQDocument, FAQManager, FAQManagerProps, FeatureBadge, FeatureBadgeProps, FeatureComparison, FeatureComparisonProps, FeatureGate, FeatureGateProps, FeatureTooltip, FeatureTooltipProps, Input, InputProps, Invoice, InvoiceList, InvoiceListProps, Label, OnboardingProgress, OnboardingProgressProps, OnboardingStep, OnboardingStepProps, PlanBadge, PlanBadgeProps, PricingCard, PricingCardProps, ProtectedRoute, ProtectedRouteProps, Separator, SiteForm, SiteFormData, SiteFormProps, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastProvider, ToastTitle, ToastViewport, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, UpgradeCTA, UpgradeCTAProps, UsageBar, UsageBarProps, UsageUpgradeCTA, UsageUpgradeCTAProps, UserMenu, UserMenuProps, WebsiteCard, WebsiteCardProps, buttonVariants, cn };
