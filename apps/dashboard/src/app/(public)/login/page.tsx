"use client";
import { getBrowserSupabaseClient } from "@/lib/supabase-browser";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");

  async function signInMagic() {
    try {
      const supabase = getBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({ email });
      setMessage(error ? "Failed to send magic link" : "Check your email for a magic link.");
    } catch {
      setMessage("Auth not configured");
    }
  }

  async function signUpEmail() {
    try {
      const supabase = getBrowserSupabaseClient();
      const { error } = await supabase.auth.signUp({ email, password });
      setMessage(error ? "Sign up failed" : "Account created. You can now sign in.");
    } catch {
      setMessage("Auth not configured");
    }
  }

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <div className="mt-6 grid gap-4 max-w-sm">
        <input className="border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button className="rounded bg-primary px-3 py-2 text-white" onClick={signInMagic}>Send magic link</button>
          <button className="rounded bg-secondary px-3 py-2" onClick={signUpEmail}>Sign up</button>
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </main>
  );
}

