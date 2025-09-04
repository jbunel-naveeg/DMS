"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AuthForm: () => AuthForm,
  BillingInfo: () => BillingInfo,
  Button: () => Button,
  Card: () => Card,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  DomainCard: () => DomainCard,
  DomainForm: () => DomainForm,
  DomainManager: () => DomainManager,
  DomainVerification: () => DomainVerification,
  EntitlementCard: () => EntitlementCard,
  FeatureBadge: () => FeatureBadge,
  FeatureComparison: () => FeatureComparison,
  FeatureGate: () => FeatureGate,
  FeatureTooltip: () => FeatureTooltip,
  Input: () => Input,
  InvoiceList: () => InvoiceList,
  Label: () => Label,
  OnboardingProgress: () => OnboardingProgress,
  OnboardingStep: () => OnboardingStep,
  PlanBadge: () => PlanBadge,
  PricingCard: () => PricingCard,
  ProtectedRoute: () => ProtectedRoute,
  Separator: () => Separator,
  SiteForm: () => SiteForm,
  Toast: () => Toast,
  ToastAction: () => ToastAction,
  ToastClose: () => ToastClose,
  ToastDescription: () => ToastDescription,
  ToastProvider: () => ToastProvider,
  ToastTitle: () => ToastTitle,
  ToastViewport: () => ToastViewport,
  Tooltip: () => Tooltip,
  TooltipContent: () => TooltipContent,
  TooltipProvider: () => TooltipProvider,
  TooltipTrigger: () => TooltipTrigger,
  UpgradeCTA: () => UpgradeCTA,
  UsageBar: () => UsageBar,
  UsageUpgradeCTA: () => UsageUpgradeCTA,
  UserMenu: () => UserMenu,
  WebsiteCard: () => WebsiteCard,
  buttonVariants: () => buttonVariants,
  cn: () => cn
});
module.exports = __toCommonJS(src_exports);

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/button.tsx
var React = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");
var import_jsx_runtime = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/card.tsx
var React2 = __toESM(require("react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var Card = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var CardHeader = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

// src/components/input.tsx
var React3 = __toESM(require("react"));
var import_jsx_runtime3 = require("react/jsx-runtime");
var Input = React3.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/components/label.tsx
var React4 = __toESM(require("react"));
var LabelPrimitive = __toESM(require("@radix-ui/react-label"));
var import_class_variance_authority2 = require("class-variance-authority");
var import_jsx_runtime4 = require("react/jsx-runtime");
var labelVariants = (0, import_class_variance_authority2.cva)(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

// src/components/separator.tsx
var React5 = __toESM(require("react"));
var SeparatorPrimitive = __toESM(require("@radix-ui/react-separator"));
var import_jsx_runtime5 = require("react/jsx-runtime");
var Separator = React5.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

// src/components/toast.tsx
var React6 = __toESM(require("react"));
var ToastPrimitives = __toESM(require("@radix-ui/react-toast"));
var import_class_variance_authority3 = require("class-variance-authority");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = (0, import_class_variance_authority3.cva)(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = React6.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react.X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// src/components/tooltip.tsx
var React7 = __toESM(require("react"));
var TooltipPrimitive = __toESM(require("@radix-ui/react-tooltip"));
var import_jsx_runtime7 = require("react/jsx-runtime");
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React7.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// src/components/auth-form.tsx
var import_react = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function AuthForm({
  mode,
  onSubmit,
  onGoogleSignIn,
  onModeChange,
  loading = false,
  className
}) {
  const [formData, setFormData] = (0, import_react.useState)({
    email: "",
    password: "",
    name: ""
  });
  const [error, setError] = (0, import_react.useState)(null);
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const { error: error2 } = await onSubmit(formData);
      if (error2) {
        setError(error2.message || "An error occurred");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleSignIn = async () => {
    if (!onGoogleSignIn)
      return;
    setError(null);
    setIsSubmitting(true);
    try {
      const { error: error2 } = await onGoogleSignIn();
      if (error2) {
        setError(error2.message || "An error occurred");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  const getTitle = () => {
    switch (mode) {
      case "signin":
        return "Sign In";
      case "signup":
        return "Sign Up";
      case "reset":
        return "Reset Password";
      default:
        return "Sign In";
    }
  };
  const getDescription = () => {
    switch (mode) {
      case "signin":
        return "Enter your credentials to access your account";
      case "signup":
        return "Create a new account to get started";
      case "reset":
        return "Enter your email to reset your password";
      default:
        return "Enter your credentials to access your account";
    }
  };
  const getSubmitText = () => {
    switch (mode) {
      case "signin":
        return "Sign In";
      case "signup":
        return "Create Account";
      case "reset":
        return "Send Reset Email";
      default:
        return "Sign In";
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Card, { className: cn("w-full max-w-md mx-auto", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(CardHeader, { className: "space-y-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CardTitle, { className: "text-2xl text-center", children: getTitle() }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CardDescription, { className: "text-center", children: getDescription() })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            Input,
            {
              id: "name",
              type: "text",
              placeholder: "Enter your name",
              value: formData.name,
              onChange: handleInputChange("name"),
              required: true,
              disabled: isSubmitting || loading
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "Enter your email",
              value: formData.email,
              onChange: handleInputChange("email"),
              required: true,
              disabled: isSubmitting || loading
            }
          )
        ] }),
        mode !== "reset" && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            Input,
            {
              id: "password",
              type: "password",
              placeholder: "Enter your password",
              value: formData.password,
              onChange: handleInputChange("password"),
              required: true,
              disabled: isSubmitting || loading
            }
          )
        ] }),
        error && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-sm text-red-600 bg-red-50 p-3 rounded-md", children: error }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: isSubmitting || loading,
            children: isSubmitting ? "Please wait..." : getSubmitText()
          }
        )
      ] }),
      mode !== "reset" && onGoogleSignIn && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Separator, { className: "w-full" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "bg-background px-2 text-muted-foreground", children: "Or continue with" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: handleGoogleSignIn,
            disabled: isSubmitting || loading,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  "path",
                  {
                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                    fill: "#4285F4"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  "path",
                  {
                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                    fill: "#34A853"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  "path",
                  {
                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                    fill: "#FBBC05"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  "path",
                  {
                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                    fill: "#EA4335"
                  }
                )
              ] }),
              "Continue with Google"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "text-center text-sm", children: [
        mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "button",
            {
              type: "button",
              className: "text-primary hover:underline",
              onClick: () => onModeChange("signup"),
              children: "Sign up"
            }
          ),
          " \u2022 ",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "button",
            {
              type: "button",
              className: "text-primary hover:underline",
              onClick: () => onModeChange("reset"),
              children: "Forgot password?"
            }
          )
        ] }),
        mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "button",
            {
              type: "button",
              className: "text-primary hover:underline",
              onClick: () => onModeChange("signin"),
              children: "Sign in"
            }
          )
        ] }),
        mode === "reset" && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
          "Remember your password?",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "button",
            {
              type: "button",
              className: "text-primary hover:underline",
              onClick: () => onModeChange("signin"),
              children: "Sign in"
            }
          )
        ] })
      ] })
    ] })
  ] });
}

// src/components/protected-route.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function ProtectedRoute({
  children,
  fallback,
  requireAuth = true,
  className,
  user,
  loading = false
}) {
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: `flex items-center justify-center min-h-screen ${className || ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-muted-foreground", children: "Loading..." })
    ] }) });
  }
  if (requireAuth && !user) {
    if (fallback) {
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children: fallback });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: `flex items-center justify-center min-h-screen p-4 ${className || ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CardTitle, { children: "Authentication Required" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CardDescription, { children: "You need to be signed in to access this page." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          Button,
          {
            className: "w-full",
            onClick: () => window.location.href = "/auth/signin",
            children: "Sign In"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => window.location.href = "/auth/signup",
            children: "Sign Up"
          }
        )
      ] })
    ] }) });
  }
  if (!requireAuth && user) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children });
}

// src/components/user-menu.tsx
var import_react2 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
function UserMenu({
  user,
  onSignOut,
  onProfileClick,
  onSettingsClick,
  className
}) {
  const [isOpen, setIsOpen] = (0, import_react2.useState)(false);
  const handleProfileClick = () => {
    setIsOpen(false);
    onProfileClick?.();
  };
  const handleSettingsClick = () => {
    setIsOpen(false);
    onSettingsClick?.();
  };
  const handleSignOut = () => {
    setIsOpen(false);
    onSignOut();
  };
  const getUserInitials = () => {
    if (user.name) {
      return user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };
  const getUserDisplayName = () => {
    return user.name || user.email || "User";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Button,
      {
        variant: "ghost",
        className: "relative h-8 w-8 rounded-full",
        onClick: () => setIsOpen(!isOpen),
        children: user.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "img",
          {
            src: user.avatar_url,
            alt: getUserDisplayName(),
            className: "h-8 w-8 rounded-full object-cover"
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium", children: getUserInitials() })
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "div",
        {
          className: "fixed inset-0 z-10",
          onClick: () => setIsOpen(false)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Card, { className: "absolute right-0 top-10 z-20 w-56", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(CardContent, { className: "p-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "px-3 py-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-sm font-medium", children: getUserDisplayName() }),
          user.email && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-xs text-muted-foreground", children: user.email })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Separator, { className: "my-2" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "space-y-1", children: [
          onProfileClick && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start text-sm",
              onClick: handleProfileClick,
              children: "Profile"
            }
          ),
          onSettingsClick && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start text-sm",
              onClick: handleSettingsClick,
              children: "Settings"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Separator, { className: "my-2" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start text-sm text-red-600 hover:text-red-600 hover:bg-red-50",
              onClick: handleSignOut,
              children: "Sign Out"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}

// src/components/onboarding-step.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function OnboardingStep({
  step,
  totalSteps,
  title,
  description,
  children,
  isCompleted = false,
  isActive = false,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: cn("space-y-6", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: cn(
        "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium",
        isCompleted ? "border-green-500 bg-green-500 text-white" : isActive ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 bg-white text-gray-500"
      ), children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) : step }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h3", { className: "text-lg font-medium text-gray-900", children: title }),
        description && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-sm text-gray-500", children: description })
      ] })
    ] }),
    isActive && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "ml-14", children })
  ] });
}

// src/components/site-form.tsx
var import_react3 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var TEMPLATES = [
  { id: "business", name: "Business", description: "Professional business website" },
  { id: "portfolio", name: "Portfolio", description: "Creative portfolio showcase" },
  { id: "blog", name: "Blog", description: "Content-focused blog site" },
  { id: "ecommerce", name: "E-commerce", description: "Online store with shopping cart" },
  { id: "restaurant", name: "Restaurant", description: "Restaurant with menu and reservations" },
  { id: "agency", name: "Agency", description: "Marketing agency website" }
];
function SiteForm({ onSubmit, loading = false, className }) {
  const [formData, setFormData] = (0, import_react3.useState)({
    name: "",
    subdomain: "",
    template: "business",
    description: ""
  });
  const [error, setError] = (0, import_react3.useState)(null);
  const [isSubmitting, setIsSubmitting] = (0, import_react3.useState)(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const { error: error2 } = await onSubmit(formData);
      if (error2) {
        setError(error2);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  const generateSubdomain = () => {
    const subdomain = formData.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    setFormData((prev) => ({ ...prev, subdomain }));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(Card, { className: cn("w-full max-w-2xl mx-auto", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(CardHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CardTitle, { children: "Create Your Website" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CardDescription, { children: "Let's set up your new WordPress website. Choose a name, subdomain, and template." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Label, { htmlFor: "name", children: "Website Name *" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Input,
            {
              id: "name",
              type: "text",
              placeholder: "My Awesome Website",
              value: formData.name,
              onChange: handleInputChange("name"),
              required: true,
              disabled: isSubmitting || loading
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-xs text-gray-500", children: "This will be the title of your website" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Label, { htmlFor: "subdomain", children: "Subdomain *" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Input,
              {
                id: "subdomain",
                type: "text",
                placeholder: "my-awesome-website",
                value: formData.subdomain,
                onChange: handleInputChange("subdomain"),
                required: true,
                disabled: isSubmitting || loading,
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: generateSubdomain,
                disabled: isSubmitting || loading || !formData.name,
                children: "Generate"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "text-xs text-gray-500", children: [
            "Your site will be available at: ",
            formData.subdomain ? `${formData.subdomain}.naveeg.com` : "subdomain.naveeg.com"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Label, { htmlFor: "template", children: "Template *" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "select",
          {
            id: "template",
            value: formData.template,
            onChange: handleInputChange("template"),
            disabled: isSubmitting || loading,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: TEMPLATES.map((template) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("option", { value: template.id, children: [
              template.name,
              " - ",
              template.description
            ] }, template.id))
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Label, { htmlFor: "description", children: "Description (Optional)" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "textarea",
          {
            id: "description",
            placeholder: "Brief description of your website...",
            value: formData.description,
            onChange: handleInputChange("description"),
            disabled: isSubmitting || loading,
            rows: 3,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }
        )
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-sm text-red-600 bg-red-50 p-3 rounded-md", children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        Button,
        {
          type: "submit",
          disabled: isSubmitting || loading || !formData.name || !formData.subdomain,
          children: isSubmitting ? "Creating Website..." : "Create Website"
        }
      ) })
    ] }) })
  ] });
}

// src/components/domain-form.tsx
var import_react4 = require("react");
var import_jsx_runtime13 = require("react/jsx-runtime");
function DomainForm({
  siteUrl,
  onSubmit,
  onSkip,
  loading = false,
  className
}) {
  const [formData, setFormData] = (0, import_react4.useState)({
    domain: ""
  });
  const [error, setError] = (0, import_react4.useState)(null);
  const [isSubmitting, setIsSubmitting] = (0, import_react4.useState)(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const { error: error2 } = await onSubmit(formData);
      if (error2) {
        setError(error2);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      domain: e.target.value
    }));
  };
  const isValidDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(Card, { className: cn("w-full max-w-2xl mx-auto", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(CardHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CardTitle, { children: "Connect Custom Domain" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CardDescription, { children: "Add your own domain to your website. You can skip this step and do it later." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "bg-blue-50 p-4 rounded-lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h4", { className: "font-medium text-blue-900", children: "Your Website" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "text-sm text-blue-700 mt-1", children: [
          "Currently available at: ",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "font-mono", children: siteUrl })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Label, { htmlFor: "domain", children: "Custom Domain" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            Input,
            {
              id: "domain",
              type: "text",
              placeholder: "example.com",
              value: formData.domain,
              onChange: handleInputChange,
              disabled: isSubmitting || loading,
              className: cn(
                formData.domain && !isValidDomain(formData.domain) && "border-red-300"
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-xs text-gray-500", children: "Enter your domain without www (e.g., example.com)" }),
          formData.domain && !isValidDomain(formData.domain) && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-xs text-red-600", children: "Please enter a valid domain name" })
        ] }),
        error && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "text-sm text-red-600 bg-red-50 p-3 rounded-md", children: error }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onSkip,
              disabled: isSubmitting || loading,
              children: "Skip for Now"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            Button,
            {
              type: "submit",
              disabled: isSubmitting || loading || !formData.domain || !isValidDomain(formData.domain),
              children: isSubmitting ? "Connecting Domain..." : "Connect Domain"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "bg-gray-50 p-4 rounded-lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h4", { className: "font-medium text-gray-900 mb-2", children: "Domain Setup Instructions" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "text-sm text-gray-600 space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "To connect your domain, you'll need to update your DNS settings:" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("ol", { className: "list-decimal list-inside space-y-1 ml-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("li", { children: [
              "Add a CNAME record pointing to ",
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("code", { className: "bg-gray-200 px-1 rounded", children: "naveeg.com" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { children: "Or add an A record pointing to our IP address" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { children: "Wait for DNS propagation (usually 5-30 minutes)" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-xs text-gray-500 mt-2", children: "Need help? Contact our support team for assistance." })
        ] })
      ] })
    ] }) })
  ] });
}

// src/components/onboarding-progress.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function OnboardingProgress({
  currentStep,
  totalSteps,
  steps,
  className
}) {
  const progress = currentStep / totalSteps * 100;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: cn("w-full", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between text-sm text-gray-600 mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { children: [
          "Step ",
          currentStep,
          " of ",
          totalSteps
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { children: [
          Math.round(progress),
          "% Complete"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "div",
        {
          className: "bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out",
          style: { width: `${progress}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "space-y-3", children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "div",
      {
        className: cn(
          "flex items-center space-x-3 text-sm",
          index < currentStep ? "text-green-600" : index === currentStep - 1 ? "text-blue-600" : "text-gray-400"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: cn(
            "flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-medium",
            step.completed ? "border-green-500 bg-green-500 text-white" : index === currentStep - 1 ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 bg-white text-gray-400"
          ), children: step.completed ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", { className: "h-3 w-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) : index + 1 }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: cn(
            "font-medium",
            step.completed ? "text-green-600" : index === currentStep - 1 ? "text-blue-600" : "text-gray-400"
          ), children: step.title })
        ]
      },
      step.id
    )) })
  ] });
}

// src/components/plan-badge.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function PlanBadge({ plan, className }) {
  const getBadgeVariant = () => {
    if (plan.is_enterprise)
      return "enterprise";
    if (plan.is_popular)
      return "popular";
    if (plan.id === "trial")
      return "trial";
    return "default";
  };
  const variant = getBadgeVariant();
  const getBadgeStyles = () => {
    switch (variant) {
      case "enterprise":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-500";
      case "popular":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500";
      case "trial":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };
  const getBadgeText = () => {
    switch (variant) {
      case "enterprise":
        return "Enterprise";
      case "popular":
        return "Most Popular";
      case "trial":
        return "Trial";
      default:
        return plan.name;
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    "div",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getBadgeStyles(),
        className
      ),
      children: [
        variant === "popular" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("svg", { className: "w-3 h-3 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
        getBadgeText()
      ]
    }
  );
}

// src/components/usage-bar.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function UsageBar({ label, used, limit, unit = "", className }) {
  const percentage = limit === -1 ? 0 : Math.min(used / limit * 100, 100);
  const isUnlimited = limit === -1;
  const isNearLimit = percentage > 80;
  const isOverLimit = used > limit && limit !== -1;
  const getBarColor = () => {
    if (isOverLimit)
      return "bg-red-500";
    if (isNearLimit)
      return "bg-yellow-500";
    return "bg-blue-500";
  };
  const formatValue = (value) => {
    if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`;
    }
    return value.toString();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex justify-between text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "text-gray-600", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: cn(
        "font-medium",
        isOverLimit ? "text-red-600" : isNearLimit ? "text-yellow-600" : "text-gray-900"
      ), children: isUnlimited ? `${formatValue(used)}${unit}` : `${formatValue(used)}${unit} / ${formatValue(limit)}${unit}` })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "div",
      {
        className: cn(
          "h-2 rounded-full transition-all duration-300",
          getBarColor()
        ),
        style: { width: `${percentage}%` }
      }
    ) }),
    isUnlimited && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-xs text-gray-500", children: "Unlimited" }),
    isOverLimit && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-xs text-red-600", children: "Over limit! Please upgrade your plan." }),
    isNearLimit && !isOverLimit && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-xs text-yellow-600", children: "Approaching limit. Consider upgrading." })
  ] });
}

// src/components/website-card.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function WebsiteCard({
  website,
  onEdit,
  onView,
  onDelete,
  className
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) });
      case "pending":
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z", clipRule: "evenodd" }) });
      case "suspended":
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { fillRule: "evenodd", d: "M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z", clipRule: "evenodd" }) });
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { fillRule: "evenodd", d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", clipRule: "evenodd" }) });
    }
  };
  const formatLastDeployed = (dateString) => {
    if (!dateString)
      return "Never deployed";
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1e3 * 60 * 60));
    if (diffInHours < 1)
      return "Just now";
    if (diffInHours < 24)
      return `${diffInHours}h ago`;
    if (diffInHours < 168)
      return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(Card, { className: cn("hover:shadow-md transition-shadow", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(CardHeader, { className: "pb-3", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(CardTitle, { className: "text-lg", children: website.name }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(CardDescription, { className: "flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "a",
          {
            href: website.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-blue-600 hover:text-blue-800 hover:underline",
            children: website.url
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        getStatusColor(website.status)
      ), children: [
        getStatusIcon(website.status),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ml-1 capitalize", children: website.status })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "text-gray-600", children: "Template" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "font-medium capitalize", children: website.template })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "text-gray-600", children: "Last Deployed" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "font-medium", children: formatLastDeployed(website.last_deployed_at) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex space-x-2", children: [
        onView && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onView,
            className: "flex-1",
            children: "View Site"
          }
        ),
        onEdit && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onEdit,
            className: "flex-1",
            children: "Edit"
          }
        ),
        onDelete && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onDelete,
            className: "text-red-600 hover:text-red-700 hover:bg-red-50",
            children: "Delete"
          }
        )
      ] })
    ] })
  ] });
}

// src/components/domain-card.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function DomainCard({
  domain,
  onEdit,
  onView,
  onDelete,
  className
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) });
      case "pending":
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z", clipRule: "evenodd" }) });
      case "failed":
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", d: "M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z", clipRule: "evenodd" }) });
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", clipRule: "evenodd" }) });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(Card, { className: cn("hover:shadow-md transition-shadow", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CardHeader, { className: "pb-3", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CardTitle, { className: "text-lg", children: domain.domain }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(CardDescription, { children: [
          "Connected to ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "font-medium", children: domain.website.name })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        getStatusColor(domain.status)
      ), children: [
        getStatusIcon(domain.status),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ml-1 capitalize", children: domain.status })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-gray-600", children: "Website" }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            "a",
            {
              href: domain.website.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "font-medium text-blue-600 hover:text-blue-800 hover:underline",
              children: domain.website.url
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-gray-600", children: "SSL Certificate" }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "flex items-center space-x-1", children: domain.ssl_enabled ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { className: "w-4 h-4 text-green-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-green-600 font-medium", children: "Enabled" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { className: "w-4 h-4 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-gray-500", children: "Disabled" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex space-x-2", children: [
        onView && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onView,
            className: "flex-1",
            children: "View Site"
          }
        ),
        onEdit && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onEdit,
            className: "flex-1",
            children: "Edit"
          }
        ),
        onDelete && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onDelete,
            className: "text-red-600 hover:text-red-700 hover:bg-red-50",
            children: "Delete"
          }
        )
      ] })
    ] })
  ] });
}

// src/components/upgrade-cta.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function UpgradeCTA({
  currentPlan,
  suggestedPlan,
  onUpgrade,
  reason,
  className
}) {
  const formatPrice = (price, interval) => {
    if (price === 0)
      return "Free";
    return `$${price}/${interval}`;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(Card, { className: cn("border-blue-200 bg-blue-50", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(CardHeader, { className: "pb-3", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(CardTitle, { className: "text-lg text-blue-900", children: [
          "Upgrade to ",
          suggestedPlan.name
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(CardDescription, { className: "text-blue-700", children: reason || `You're currently on the ${currentPlan.name} plan.` })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-right", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "text-2xl font-bold text-blue-900", children: formatPrice(suggestedPlan.price, suggestedPlan.interval) }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-sm text-blue-600", children: [
          "per ",
          suggestedPlan.interval
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h4", { className: "font-medium text-blue-900", children: "What you'll get:" }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("ul", { className: "space-y-1", children: [
          suggestedPlan.features.slice(0, 3).map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("li", { className: "flex items-center text-sm text-blue-700", children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("svg", { className: "w-4 h-4 mr-2 text-blue-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
            feature
          ] }, index)),
          suggestedPlan.features.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("li", { className: "text-sm text-blue-600", children: [
            "+",
            suggestedPlan.features.length - 3,
            " more features"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        Button,
        {
          onClick: onUpgrade,
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white",
          children: "Upgrade Now"
        }
      )
    ] })
  ] });
}
function UsageUpgradeCTA({
  feature,
  currentUsage,
  limit,
  suggestedPlan,
  onUpgrade,
  className
}) {
  const percentage = currentUsage / limit * 100;
  const isOverLimit = currentUsage > limit;
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Card, { className: cn("border-yellow-200 bg-yellow-50", className), children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(CardContent, { className: "pt-6", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-start space-x-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("svg", { className: "w-6 h-6 text-yellow-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h3", { className: "text-sm font-medium text-yellow-800", children: isOverLimit ? "Limit Exceeded" : "Approaching Limit" }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("p", { className: "text-sm text-yellow-700 mt-1", children: [
        "You've used ",
        currentUsage,
        " of ",
        limit,
        " ",
        feature,
        isOverLimit ? ". Please upgrade to continue." : ". Consider upgrading soon."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "mt-3 flex space-x-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
          Button,
          {
            size: "sm",
            onClick: onUpgrade,
            className: "bg-yellow-600 hover:bg-yellow-700 text-white",
            children: [
              "Upgrade to ",
              suggestedPlan.name
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-sm text-yellow-600 flex items-center", children: [
          "$",
          suggestedPlan.price,
          "/",
          suggestedPlan.interval
        ] })
      ] })
    ] })
  ] }) }) });
}

// src/components/pricing-card.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
function PricingCard({
  plan,
  currentPlanId,
  onSelect,
  loading = false,
  className
}) {
  const isCurrentPlan = currentPlanId === plan.id;
  const isPopular = plan.is_popular;
  const isEnterprise = plan.is_enterprise;
  const formatPrice = (price, interval) => {
    if (price === 0)
      return "Free";
    return `$${price}/${interval}`;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(Card, { className: cn(
    "relative w-full",
    isPopular && "border-blue-500 shadow-lg",
    isEnterprise && "border-purple-500 shadow-lg",
    className
  ), children: [
    isPopular && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "absolute -top-3 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium", children: "Most Popular" }) }),
    isEnterprise && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "absolute -top-3 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium", children: "Enterprise" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(CardHeader, { className: "text-center pb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CardTitle, { className: "text-2xl font-bold", children: plan.name }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CardDescription, { className: "text-lg", children: plan.description }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "mt-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "text-4xl font-bold", children: formatPrice(plan.price, plan.interval) }),
        plan.price > 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "text-gray-500 ml-2", children: [
          "per ",
          plan.interval
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("ul", { className: "space-y-3", children: plan.features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("li", { className: "flex items-start space-x-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "svg",
          {
            className: "w-5 h-5 text-green-500 mt-0.5 flex-shrink-0",
            fill: "currentColor",
            viewBox: "0 0 20 20",
            children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              "path",
              {
                fillRule: "evenodd",
                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                clipRule: "evenodd"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "text-gray-700", children: feature })
      ] }, index)) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        Button,
        {
          className: cn(
            "w-full",
            isCurrentPlan ? "bg-gray-500 cursor-not-allowed" : isPopular ? "bg-blue-600 hover:bg-blue-700" : isEnterprise ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-900 hover:bg-gray-800"
          ),
          onClick: () => onSelect(plan.id),
          disabled: isCurrentPlan || loading,
          children: isCurrentPlan ? "Current Plan" : loading ? "Processing..." : "Get Started"
        }
      )
    ] })
  ] });
}

// src/components/billing-info.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function BillingInfo({
  subscription,
  onManageBilling,
  onUpgrade,
  onCancel,
  className
}) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "trialing":
        return "text-blue-600 bg-blue-100";
      case "past_due":
        return "text-yellow-600 bg-yellow-100";
      case "canceled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "trialing":
        return "Trial";
      case "past_due":
        return "Past Due";
      case "canceled":
        return "Canceled";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  const formatPrice = (price, interval) => {
    if (price === 0)
      return "Free";
    return `$${price}/${interval}`;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(Card, { className: cn("w-full", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(CardHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(CardTitle, { children: "Billing Information" }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(CardDescription, { children: "Manage your subscription and billing details" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("h3", { className: "font-medium text-gray-900", children: subscription.plan.name }),
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { className: "text-sm text-gray-500", children: formatPrice(subscription.plan.price, subscription.plan.interval) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            getStatusColor(subscription.status)
          ), children: getStatusText(subscription.status) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "text-gray-600", children: "Current Period" }),
            /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("span", { className: "font-medium", children: [
              formatDate(subscription.current_period_start),
              " - ",
              formatDate(subscription.current_period_end)
            ] })
          ] }),
          subscription.cancel_at_period_end && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "text-gray-600", children: "Cancellation" }),
            /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("span", { className: "text-red-600 font-medium", children: [
              "Ends on ",
              formatDate(subscription.current_period_end)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          Button,
          {
            onClick: onManageBilling,
            variant: "outline",
            className: "flex-1",
            children: "Manage Billing"
          }
        ),
        subscription.status === "active" && !subscription.cancel_at_period_end && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            Button,
            {
              onClick: onUpgrade,
              className: "flex-1",
              children: "Upgrade Plan"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            Button,
            {
              onClick: onCancel,
              variant: "outline",
              className: "flex-1 text-red-600 hover:text-red-700 hover:bg-red-50",
              children: "Cancel Subscription"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "text-xs text-gray-500 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("p", { children: [
          "Subscription ID: ",
          subscription.id
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { children: subscription.cancel_at_period_end ? "Your subscription will end at the current period and you will not be charged again." : "You will be charged automatically at the end of each billing period." })
      ] })
    ] })
  ] });
}

// src/components/invoice-list.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
function InvoiceList({
  invoices,
  onDownload,
  onView,
  loading = false,
  className
}) {
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1e3).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase()
    }).format(amount / 100);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-100";
      case "open":
        return "text-yellow-600 bg-yellow-100";
      case "void":
        return "text-gray-600 bg-gray-100";
      case "uncollectible":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "open":
        return "Open";
      case "void":
        return "Void";
      case "uncollectible":
        return "Uncollectible";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Card, { className: cn("w-full", className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(CardHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardTitle, { children: "Invoices" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardDescription, { children: "Your billing history" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "animate-pulse", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "h-16 bg-gray-200 rounded" }) }, i)) }) })
    ] });
  }
  if (invoices.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Card, { className: cn("w-full", className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(CardHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardTitle, { children: "Invoices" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardDescription, { children: "Your billing history" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "svg",
          {
            className: "mx-auto h-12 w-12 text-gray-400",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: "No invoices yet" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "Your invoices will appear here once you have a paid subscription." })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Card, { className: cn("w-full", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(CardHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardTitle, { children: "Invoices" }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardDescription, { children: "Your billing history" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "space-y-4", children: invoices.map((invoice) => /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
      "div",
      {
        className: "flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "text-sm font-medium text-gray-900", children: [
                  "Invoice #",
                  invoice.number
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "text-sm text-gray-500", children: formatDate(invoice.created) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                getStatusColor(invoice.status)
              ), children: getStatusText(invoice.status) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "mt-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "text-sm font-medium text-gray-900", children: formatAmount(invoice.amount_paid, invoice.currency) }),
              invoice.amount_due > 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "text-xs text-red-600", children: [
                formatAmount(invoice.amount_due, invoice.currency),
                " due"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center space-x-2", children: [
            invoice.hosted_invoice_url && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => onView(invoice.id),
                children: "View"
              }
            ),
            invoice.invoice_pdf && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => onDownload(invoice.id),
                children: "Download"
              }
            )
          ] })
        ]
      },
      invoice.id
    )) }) })
  ] });
}

// src/components/feature-gate.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
function useFeatureGate(feature) {
  return {
    isAllowed: true,
    // Default to allowed for now
    needsUpgrade: false
  };
}
function FeatureGate({
  feature,
  fallback,
  children,
  showUpgrade = true,
  className
}) {
  const { isAllowed, needsUpgrade, reason, currentUsage, limit } = useFeatureGate(feature);
  if (isAllowed) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_jsx_runtime23.Fragment, { children });
  }
  if (fallback) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_jsx_runtime23.Fragment, { children: fallback });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "blur-sm pointer-events-none select-none", children }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(Card, { className: "w-full max-w-md mx-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(CardTitle, { className: "text-lg", children: "Feature Not Available" }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(CardDescription, { children: reason || "This feature is not available in your current plan" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(CardContent, { className: "space-y-4", children: [
        currentUsage !== void 0 && limit !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "text-sm text-gray-600 mb-2", children: [
            "Usage: ",
            currentUsage,
            " / ",
            limit === -1 ? "\u221E" : limit
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "div",
            {
              className: "bg-red-500 h-2 rounded-full",
              style: { width: `${Math.min(currentUsage / limit * 100, 100)}%` }
            }
          ) })
        ] }),
        showUpgrade && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          Button,
          {
            className: "w-full",
            onClick: () => {
              window.location.href = "/dashboard/billing";
            },
            children: "Upgrade Plan"
          }
        )
      ] })
    ] }) })
  ] });
}
function FeatureBadge({ feature, className }) {
  const { isAllowed, needsUpgrade, reason } = useFeatureGate(feature);
  if (isAllowed) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800",
      className
    ), children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("svg", { className: "w-3 h-3 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
      "Available"
    ] });
  }
  if (needsUpgrade) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
      className
    ), children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("svg", { className: "w-3 h-3 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
      "Upgrade Required"
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: cn(
    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800",
    className
  ), children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("svg", { className: "w-3 h-3 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { fillRule: "evenodd", d: "M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z", clipRule: "evenodd" }) }),
    "Not Available"
  ] });
}
function FeatureTooltip({ feature, children, className }) {
  const { isAllowed, reason } = useFeatureGate(feature);
  if (isAllowed) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_jsx_runtime23.Fragment, { children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: cn("relative group", className), children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10", children: [
      reason || "Feature not available in your current plan",
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" })
    ] })
  ] });
}

// src/components/entitlement-card.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function EntitlementCard({
  title,
  description,
  features,
  onUpgrade,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(Card, { className: cn("w-full", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(CardHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(CardTitle, { className: "text-xl", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "space-y-3", children: features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h4", { className: "font-medium text-gray-900", children: feature.name }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(FeatureBadge, { feature: feature.feature })
        ] }),
        feature.description && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-sm text-gray-600 mt-1", children: feature.description })
      ] }) }, index)) }),
      onUpgrade && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "pt-4 border-t", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        Button,
        {
          onClick: onUpgrade,
          className: "w-full",
          children: "Upgrade Plan"
        }
      ) })
    ] })
  ] });
}
function FeatureComparison({
  features,
  onUpgrade,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: cn("space-y-4", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Feature Access" }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-sm text-gray-600", children: "Check which features are available in your current plan" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "grid gap-4", children: features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h4", { className: "font-medium text-gray-900", children: feature.name }),
        feature.description && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-sm text-gray-600 mt-1", children: feature.description })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(FeatureBadge, { feature: feature.feature })
    ] }, index)) }),
    onUpgrade && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "text-center pt-4", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Button, { onClick: onUpgrade, children: "Upgrade to Access More Features" }) })
  ] });
}

// src/components/domain-manager.tsx
var React8 = __toESM(require("react"));
var import_jsx_runtime25 = require("react/jsx-runtime");
function DomainManager({
  websiteId,
  domains,
  onAddDomain,
  onRemoveDomain,
  onVerifyDomain,
  onRequestSSL,
  loading = false,
  className
}) {
  const [newDomain, setNewDomain] = React8.useState("");
  const [isAdding, setIsAdding] = React8.useState(false);
  const [error, setError] = React8.useState(null);
  const handleAddDomain = async (e) => {
    e.preventDefault();
    if (!newDomain.trim())
      return;
    setIsAdding(true);
    setError(null);
    try {
      const result = await onAddDomain(newDomain.trim());
      if (result.success) {
        setNewDomain("");
      } else {
        setError(result.error || "Failed to add domain");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add domain");
    } finally {
      setIsAdding(false);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
      case "suspended":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      case "suspended":
        return "Suspended";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  const getSSLStatusColor = (sslStatus) => {
    switch (sslStatus) {
      case "active":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
      case "expired":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const getSSLStatusText = (sslStatus) => {
    switch (sslStatus) {
      case "active":
        return "Active";
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      case "expired":
        return "Expired";
      default:
        return sslStatus.charAt(0).toUpperCase() + sslStatus.slice(1);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: cn("space-y-6", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(CardHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(CardTitle, { children: "Add Custom Domain" }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(CardDescription, { children: "Connect your own domain to your website" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("form", { onSubmit: handleAddDomain, className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Label, { htmlFor: "domain", children: "Domain Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            Input,
            {
              id: "domain",
              type: "text",
              placeholder: "example.com",
              value: newDomain,
              onChange: (e) => setNewDomain(e.target.value),
              disabled: isAdding || loading
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "text-sm text-gray-500", children: "Enter your domain name without http:// or https://" })
        ] }),
        error && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "text-sm text-red-600", children: error }) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          Button,
          {
            type: "submit",
            disabled: !newDomain.trim() || isAdding || loading,
            className: "w-full",
            children: isAdding ? "Adding Domain..." : "Add Domain"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(CardHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(CardTitle, { children: "Connected Domains" }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(CardDescription, { children: "Manage your connected domains and SSL certificates" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(CardContent, { children: domains.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          "svg",
          {
            className: "mx-auto h-12 w-12 text-gray-400",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: "No domains connected" }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "Add a custom domain to get started." })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "space-y-4", children: domains.map((domain) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "border rounded-lg p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h3", { className: "font-medium text-gray-900", children: domain.domain }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center space-x-2 mt-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                getStatusColor(domain.status)
              ), children: getStatusText(domain.status) }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { className: cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                getSSLStatusColor(domain.ssl_status)
              ), children: [
                "SSL ",
                getSSLStatusText(domain.ssl_status)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center space-x-2", children: [
            domain.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => onVerifyDomain(domain.id),
                children: "Verify"
              }
            ),
            domain.ssl_status === "failed" && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => onRequestSSL(domain.id),
                children: "Request SSL"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => onRemoveDomain(domain.id),
                className: "text-red-600 hover:text-red-700",
                children: "Remove"
              }
            )
          ] })
        ] }),
        domain.nameservers && domain.nameservers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "mt-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Nameservers" }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "space-y-1", children: domain.nameservers.map((ns, index) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "text-sm text-gray-600 font-mono", children: ns }, index)) })
        ] }),
        domain.dns_records && domain.dns_records.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "mt-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "DNS Records" }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "space-y-1", children: domain.dns_records.map((record, index) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "text-sm text-gray-600 font-mono", children: [
            record.name,
            " ",
            record.type,
            " ",
            record.value
          ] }, index)) })
        ] })
      ] }, domain.id)) }) })
    ] })
  ] });
}

// src/components/domain-verification.tsx
var React9 = __toESM(require("react"));
var import_jsx_runtime26 = require("react/jsx-runtime");
function DomainVerification({
  domain,
  verificationMethod,
  verificationData,
  onVerify,
  onRefresh,
  loading = false,
  className
}) {
  const [isVerifying, setIsVerifying] = React9.useState(false);
  const [isRefreshing, setIsRefreshing] = React9.useState(false);
  const [error, setError] = React9.useState(null);
  const handleVerify = async () => {
    setIsVerifying(true);
    setError(null);
    try {
      const result = await onVerify();
      if (!result.success) {
        setError(result.error || "Verification failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh");
    } finally {
      setIsRefreshing(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(Card, { className: cn("w-full", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(CardHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(CardTitle, { children: "Verify Domain Ownership" }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(CardDescription, { children: [
        "Verify that you own ",
        domain,
        " by completing one of the following steps:"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(CardContent, { className: "space-y-6", children: [
      verificationMethod === "dns" && verificationData.dns_record && /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "DNS Record Verification" }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("p", { className: "text-sm text-gray-600 mb-4", children: "Add the following DNS record to your domain's DNS settings:" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "bg-gray-50 rounded-lg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "font-medium text-gray-700", children: "Type:" }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mt-1 font-mono text-gray-900", children: verificationData.dns_record.type })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "font-medium text-gray-700", children: "Name:" }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mt-1 font-mono text-gray-900", children: verificationData.dns_record.name })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "font-medium text-gray-700", children: "Value:" }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mt-1 font-mono text-gray-900 break-all", children: verificationData.dns_record.value })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("svg", { className: "h-5 w-5 text-blue-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "ml-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("h3", { className: "text-sm font-medium text-blue-800", children: "DNS Propagation" }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mt-2 text-sm text-blue-700", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("p", { children: "DNS changes can take up to 24 hours to propagate. If verification fails, wait a few minutes and try again." }) })
          ] })
        ] }) })
      ] }),
      verificationMethod === "file" && verificationData.file_path && /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "File Upload Verification" }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("p", { className: "text-sm text-gray-600 mb-4", children: "Upload a file to your website's root directory:" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "bg-gray-50 rounded-lg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "font-medium text-gray-700", children: "File Path:" }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mt-1 font-mono text-gray-900", children: verificationData.file_path })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "font-medium text-gray-700", children: "File Content:" }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mt-1 font-mono text-gray-900 bg-white p-2 rounded border", children: verificationData.file_content })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("svg", { className: "h-5 w-5 text-blue-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "ml-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("h3", { className: "text-sm font-medium text-blue-800", children: "File Upload Instructions" }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mt-2 text-sm text-blue-700", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("p", { children: [
              "Upload the file to your website's root directory. The file should be accessible at ",
              domain,
              "/",
              verificationData.file_path
            ] }) })
          ] })
        ] }) })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("svg", { className: "h-5 w-5 text-red-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "ml-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("h3", { className: "text-sm font-medium text-red-800", children: "Verification Failed" }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mt-2 text-sm text-red-700", children: error })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          Button,
          {
            onClick: handleVerify,
            disabled: isVerifying || loading,
            className: "flex-1",
            children: isVerifying ? "Verifying..." : "Verify Domain"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          Button,
          {
            variant: "outline",
            onClick: handleRefresh,
            disabled: isRefreshing || loading,
            children: isRefreshing ? "Refreshing..." : "Refresh"
          }
        )
      ] })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthForm,
  BillingInfo,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DomainCard,
  DomainForm,
  DomainManager,
  DomainVerification,
  EntitlementCard,
  FeatureBadge,
  FeatureComparison,
  FeatureGate,
  FeatureTooltip,
  Input,
  InvoiceList,
  Label,
  OnboardingProgress,
  OnboardingStep,
  PlanBadge,
  PricingCard,
  ProtectedRoute,
  Separator,
  SiteForm,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  UpgradeCTA,
  UsageBar,
  UsageUpgradeCTA,
  UserMenu,
  WebsiteCard,
  buttonVariants,
  cn
});
//# sourceMappingURL=index.js.map