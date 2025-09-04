import { NextResponse } from "next/server";
import { tenwebStatus } from "@/lib/tenweb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
  const res = await tenwebStatus(id);
  return NextResponse.json(res);
}

