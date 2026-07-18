import { servicePages } from "@/lib/service-pages";
import type { SitemapRoutesProvider, SitemapUrl } from "./contracts";

export class StaticRoutesProvider implements SitemapRoutesProvider {
  getRoutes(): Promise<SitemapUrl[]> {
    return Promise.resolve([
      { url: "/", changefreq: "monthly", priority: 1 },
      ...servicePages.map<SitemapUrl>((page) => ({
        url: `/${page.slug}`,
        changefreq: "monthly",
        priority: 0.8,
      })),
    ]);
  }
}
