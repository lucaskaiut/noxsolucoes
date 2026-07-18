import { site } from "@/lib/site";
import type { SitemapConfig } from "./contracts";

export const sitemapConfig: SitemapConfig = {
  baseUrl: site.url,
  defaultChangefreq: "monthly",
};
