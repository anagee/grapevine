import { NextResponse } from "next/server";

export function GET() {
  const txt = `User-agent: *
Allow: /
Sitemap: ${(process.env.NEXT_PUBLIC_SITE_URL || "https://your-app.web.app")}/sitemap.xml
`;
  return new NextResponse(txt, { headers: { "Content-Type": "text/plain" } });
}