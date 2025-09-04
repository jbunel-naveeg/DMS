import { NextResponse } from "next/server";
import { tenwebGenerate } from "@/lib/tenweb";
import { getServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await tenwebGenerate({
      businessName: body?.brief?.businessName,
      description: body?.brief?.description,
      vertical: body?.brief?.vertical,
      colors: body?.design?.colors,
      fonts: body?.design?.fonts,
    });
    // Persist draft and site records (MVP: anonymous owner until auth is wired)
    const supabase = getServerSupabaseClient();
    const { data: site } = await supabase
      .from("sites")
      .insert({ tenweb_site_id: result.tenweb_site_id, status: result.status })
      .select()
      .single();
    return NextResponse.json({ siteId: site?.id, status: result.status, tenweb_site_id: result.tenweb_site_id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}

