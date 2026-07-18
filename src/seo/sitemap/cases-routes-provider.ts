import { caseStudies } from "@/lib/case-studies";
import type { SitemapRoutesProvider, SitemapUrl } from "./contracts";

export class CasesRoutesProvider implements SitemapRoutesProvider {
  getRoutes(): Promise<SitemapUrl[]> {
    return Promise.resolve([
      { url: "/cases", changefreq: "weekly", priority: 0.9 },
      ...caseStudies.map<SitemapUrl>((caseStudy) => ({
        url: `/cases/${caseStudy.slug}`,
        lastmod: caseStudy.publishedAt,
        changefreq: "monthly",
        priority: 0.7,
      })),
    ]);
  }
}
