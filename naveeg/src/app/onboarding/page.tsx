"use client";
import { useState } from "react";
import { briefSchema, designSchema } from "@/lib/validations";

export default function OnboardingPage() {
  const [step, setStep] = useState<number>(1);
  const [brief, setBrief] = useState({ businessName: "", tagline: "", description: "", vertical: "" });
  const [design, setDesign] = useState({ colors: {}, fonts: {} });
  const [status, setStatus] = useState<string>("");

  async function handleGenerate() {
    try {
      briefSchema.parse(brief);
      designSchema.parse(design);
    } catch {
      setStatus("Please complete required fields");
      return;
    }
    setStep(3);
    setStatus("Generating...");
    const res = await fetch("/api/tenweb/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brief, design }),
    });
    const data = await res.json();
    setStatus(data?.status || "generating");
    // Poll status endpoint (mocked to ready when no API key)
    if (data?.tenweb_site_id) {
      const poll = setInterval(async () => {
        const s = await fetch(`/api/tenweb/status?id=${data.tenweb_site_id}`).then((r) => r.json());
        if (s?.status === "ready" || s?.status === "error") {
          clearInterval(poll);
          setStatus(s.status);
          setStep(4);
        }
      }, 1500);
    } else {
      setStep(4);
    }
  }

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold">Onboarding</h1>
      <div className="mt-6 space-y-6">
        {step === 1 && (
          <section className="rounded-md border p-4 space-y-2">
            <div className="font-medium">Brief</div>
            <input className="border p-2 w-full" placeholder="Business name" value={brief.businessName} onChange={(e) => setBrief({ ...brief, businessName: e.target.value })} />
            <input className="border p-2 w-full" placeholder="Tagline" value={brief.tagline} onChange={(e) => setBrief({ ...brief, tagline: e.target.value })} />
            <textarea className="border p-2 w-full" placeholder="Description" value={brief.description} onChange={(e) => setBrief({ ...brief, description: e.target.value })} />
            <input className="border p-2 w-full" placeholder="Vertical" value={brief.vertical} onChange={(e) => setBrief({ ...brief, vertical: e.target.value })} />
            <button className="mt-2 inline-flex items-center rounded bg-primary px-3 py-2 text-white" onClick={() => setStep(2)}>Next</button>
          </section>
        )}
        {step === 2 && (
          <section className="rounded-md border p-4 space-y-2">
            <div className="font-medium">Design</div>
            <input className="border p-2 w-full" placeholder="Primary color (e.g., #000000)" onChange={(e) => setDesign({ ...design, colors: { ...design.colors, primary: e.target.value } })} />
            <input className="border p-2 w-full" placeholder="Font (e.g., Inter)" onChange={(e) => setDesign({ ...design, fonts: { ...design.fonts, primary: e.target.value } })} />
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center rounded bg-secondary px-3 py-2" onClick={() => setStep(1)}>Back</button>
              <button className="inline-flex items-center rounded bg-primary px-3 py-2 text-white" onClick={handleGenerate}>Generate</button>
            </div>
          </section>
        )}
        {step === 3 && (
          <section className="rounded-md border p-4">
            <div className="font-medium">Generate</div>
            <p className="text-sm text-muted-foreground">{status || "Starting..."}</p>
          </section>
        )}
        {step === 4 && (
          <section className="rounded-md border p-4">
            <div className="font-medium">Ready</div>
            <p className="text-sm text-muted-foreground">Your site is being prepared. Check Dashboard for updates.</p>
          </section>
        )}
      </div>
    </main>
  );
}

