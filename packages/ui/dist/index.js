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
  Button: () => Button,
  Card: () => Card,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  Input: () => Input,
  Label: () => Label,
  ProtectedRoute: () => ProtectedRoute,
  Separator: () => Separator,
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
  UserMenu: () => UserMenu,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthForm,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  ProtectedRoute,
  Separator,
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
  UserMenu,
  buttonVariants,
  cn
});
//# sourceMappingURL=index.js.map