import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getServiceSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { email, plan = "starter" } = await request.json();
    const supabase = getServiceSupabaseClient();
    const stripe = getStripe();
    const customer = await stripe.customers.create({ email });
    const priceId = process.env[`STRIPE_PRICE_${String(plan).toUpperCase()}`];
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: priceId ? [{ price: priceId }] : [],
      trial_period_days: 7,
    });
    await supabase.from("subscriptions").insert({
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      plan,
      trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
    });
    return NextResponse.json({ ok: true, subscription_id: subscription.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

