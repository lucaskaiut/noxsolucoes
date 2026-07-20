import { BlogRoutesProvider } from "./blog-routes-provider";
import { CasesRoutesProvider } from "./cases-routes-provider";
import { sitemapConfig } from "./config";
import { SitemapService } from "./sitemap-service";
import { StaticRoutesProvider } from "./static-routes-provider";

export function createSitemapService(): SitemapService {
  return new SitemapService(
    [
      new StaticRoutesProvider(),
      new CasesRoutesProvider(),
      new BlogRoutesProvider(),
    ],
    sitemapConfig,
  );
}

export { SitemapService, escapeXml } from "./sitemap-service";
export { BlogRoutesProvider } from "./blog-routes-provider";
export { CasesRoutesProvider } from "./cases-routes-provider";
export { StaticRoutesProvider } from "./static-routes-provider";
export { sitemapConfig } from "./config";
export type {
  SitemapChangefreq,
  SitemapConfig,
  SitemapRoutesProvider,
  SitemapUrl,
} from "./contracts";
