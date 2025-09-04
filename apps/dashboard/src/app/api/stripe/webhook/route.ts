import { NextResponse } from "next/server";
import { STRIPE_WEBHOOK_SECRET, getStripe } from "@/lib/stripe";
import type Stripe from "stripe";
import { getServiceSupabaseClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();
  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(payload, signature as string, STRIPE_WEBHOOK_SECRET);
    // Handle subscription events (stub for MVP)
    switch (event.type) {
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        try {
          const sub = event.data.object as Stripe.Subscription;
          const supabase = getServiceSupabaseClient();
          await supabase
            .from("subscriptions")
            .upsert({
              stripe_customer_id: sub.customer,
              stripe_subscription_id: sub.id,
              status: sub.status,
              plan: sub.items?.data?.[0]?.price?.nickname ?? null,
              trial_end: sub.trial_end ? new Date((sub.trial_end as number) * 1000).toISOString() : null,
            }, { onConflict: "stripe_subscription_id" });
        } catch (error) {
          console.error(error);
        }
        break;
      default:
        break;
    }
    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("invalid", { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

