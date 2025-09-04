type TenWebStatus = "generating" | "ready" | "error";

export type GenerateRequest = {
  businessName: string;
  description: string;
  vertical?: string;
  colors?: Record<string, string>;
  fonts?: Record<string, string>;
};

export type GenerateResponse = {
  tenweb_site_id: string;
  status: TenWebStatus;
  preview_url?: string;
};

const TENWEB_API_BASE = process.env.TENWEB_API_BASE || "https://api.10web.io";
const TENWEB_API_KEY = process.env.TENWEB_API_KEY || "";

export async function tenwebGenerate(req: GenerateRequest): Promise<GenerateResponse> {
  // Placeholder: integrate typed client generated from openapi.yaml later.
  // For MVP, simulate the response and normalize statuses.
  if (!TENWEB_API_KEY) {
    // Allow running in local dev by mocking
    return {
      tenweb_site_id: `mock_${Date.now()}`,
      status: "generating",
    };
  }
  // Example fetch scaffold (endpoint placeholder)
  try {
    const res = await fetch(`${TENWEB_API_BASE}/ai-sites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TENWEB_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      throw new Error(`10Web error: ${res.status}`);
    }
    const data = (await res.json()) as { id?: string; status?: TenWebStatus; preview_url?: string };
    return {
      tenweb_site_id: data?.id ?? `mock_${Date.now()}`,
      status: (data?.status as TenWebStatus) ?? "generating",
      preview_url: data?.preview_url,
    };
  } catch {
    return {
      tenweb_site_id: `mock_${Date.now()}`,
      status: "generating",
    };
  }
}

export async function tenwebStatus(tenwebSiteId: string): Promise<GenerateResponse> {
  if (!TENWEB_API_KEY) {
    return { tenweb_site_id: tenwebSiteId, status: "ready", preview_url: `https://example.com/${tenwebSiteId}` };
  }
  try {
    const res = await fetch(`${TENWEB_API_BASE}/ai-sites/${tenwebSiteId}`, {
      headers: { Authorization: `Bearer ${TENWEB_API_KEY}` },
    });
    if (!res.ok) {
      throw new Error(String(res.status));
    }
    const data = (await res.json()) as { status?: TenWebStatus; preview_url?: string };
    return {
      tenweb_site_id: tenwebSiteId,
      status: (data?.status as TenWebStatus) ?? "generating",
      preview_url: data?.preview_url,
    };
  } catch {
    return { tenweb_site_id: tenwebSiteId, status: "error" };
  }
}

