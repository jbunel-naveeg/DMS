"use client";

export default function BillingPage() {
  async function startTrial() {
    await fetch("/api/auth/start-trial", { method: "POST", body: JSON.stringify({ email: "demo@naveeg.local" }) });
  }
  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4">
        <div className="text-sm text-muted-foreground">Current plan</div>
        <div className="text-lg font-medium">Starter (trialing)</div>
        <div className="text-sm text-muted-foreground">Trial ends in 7 days</div>
      </div>
      <div className="rounded-md border p-4">
        <div className="font-medium">Upgrade</div>
        <button className="mt-2 inline-flex items-center rounded bg-primary px-3 py-2 text-white">Upgrade to Pro</button>
      </div>
      <div className="rounded-md border p-4">
        <div className="font-medium">Start trial (demo)</div>
        <button className="mt-2 inline-flex items-center rounded bg-secondary px-3 py-2" onClick={() => startTrial()}>Start</button>
      </div>
    </div>
  );
}

