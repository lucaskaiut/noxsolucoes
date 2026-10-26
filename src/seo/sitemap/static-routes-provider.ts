import { serviceLinks } from "@/lib/service-pages";
import type { SitemapRoutesProvider, SitemapUrl } from "./contracts";

export class StaticRoutesProvider implements SitemapRoutesProvider {
  getRoutes(): Promise<SitemapUrl[]> {
    return Promise.resolve([
      { url: "/", changefreq: "monthly", priority: 1 },
      ...serviceLinks.map<SitemapUrl>((service) => ({
        url: service.href,
        changefreq: "monthly",
        priority: 0.8,
      })),
    ]);
  }
}
