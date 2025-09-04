import { plans } from "@/lib/plans";

export default function PricingPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="rounded-lg border p-6">
            <h2 className="text-xl font-medium capitalize">{p.id}</h2>
            <p className="mt-2 text-2xl font-bold">
              {p.price > 0 ? `€${p.price}/mo` : "Contact us"}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}

