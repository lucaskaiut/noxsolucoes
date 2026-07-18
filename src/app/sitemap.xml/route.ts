import { createSitemapService } from "@/seo/sitemap";

export async function GET(): Promise<Response> {
  const xml = await createSitemapService().generate();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
