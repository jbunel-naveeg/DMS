export type Plan = "starter" | "pro" | "custom";

const planFeatures: Record<Plan, string[]> = {
  starter: ["basic-analytics", "domain-connect-ui"],
  pro: ["advanced-analytics", "backups", "seo-tools"],
  custom: ["priority-support", "sso"],
};

export function canAccess(feature: string, plan: Plan): boolean {
  return planFeatures[plan]?.includes(feature) ?? false;
}

export const plans = [
  { id: "starter", price: 49, currency: "EUR", features: planFeatures.starter },
  { id: "pro", price: 99, currency: "EUR", features: planFeatures.pro },
  { id: "custom", price: 0, currency: "EUR", features: planFeatures.custom },
];

