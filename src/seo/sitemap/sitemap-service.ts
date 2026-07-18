import type { SitemapConfig, SitemapRoutesProvider, SitemapUrl } from "./contracts";

const XML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => XML_ENTITIES[char] ?? char);
}

export class SitemapService {
  private readonly providers: SitemapRoutesProvider[];
  private readonly config: SitemapConfig;

  constructor(providers: SitemapRoutesProvider[], config: SitemapConfig) {
    this.providers = providers;
    this.config = config;
  }

  async generate(): Promise<string> {
    const routes = await this.collectRoutes();
    const entries = routes.map((route) => this.toEntry(route));
    return [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      ...entries,
      `</urlset>`,
    ].join("\n");
  }

  private async collectRoutes(): Promise<SitemapUrl[]> {
    const results = await Promise.allSettled(
      this.providers.map((provider) => provider.getRoutes()),
    );
    const byLoc = new Map<string, SitemapUrl>();
    for (const result of results) {
      if (result.status === "rejected") {
        console.warn("[Sitemap] Provider falhou e foi ignorado:", result.reason);
        continue;
      }
      for (const route of result.value) {
        const loc = this.resolveLoc(route.url);
        if (!byLoc.has(loc)) byLoc.set(loc, route);
      }
    }
    return [...byLoc.values()];
  }

  private resolveLoc(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${this.config.baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
  }

  private toEntry(route: SitemapUrl): string {
    const loc = escapeXml(this.resolveLoc(route.url));
    const lastmod = escapeXml(route.lastmod ?? new Date().toISOString());
    const changefreq = route.changefreq ?? this.config.defaultChangefreq;
    const lines = [
      `  <url>`,
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
    ];
    if (route.priority !== undefined) {
      lines.push(`    <priority>${route.priority.toFixed(1)}</priority>`);
    }
    lines.push(`  </url>`);
    return lines.join("\n");
  }
}
