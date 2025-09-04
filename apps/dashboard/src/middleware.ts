import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/onboarding/:path*", "/dashboard/:path*"],
};

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const access = req.cookies.get("sb-access-token")?.value;
  if (!access) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

