import { sitemapConfig } from "./config";
import { SitemapService } from "./sitemap-service";
import { StaticRoutesProvider } from "./static-routes-provider";

export function createSitemapService(): SitemapService {
  return new SitemapService([new StaticRoutesProvider()], sitemapConfig);
}

export { SitemapService, escapeXml } from "./sitemap-service";
export { StaticRoutesProvider } from "./static-routes-provider";
export { sitemapConfig } from "./config";
export type {
  SitemapChangefreq,
  SitemapConfig,
  SitemapRoutesProvider,
  SitemapUrl,
} from "./contracts";
