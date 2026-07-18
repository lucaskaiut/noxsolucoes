export type SitemapChangefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: SitemapChangefreq;
  priority?: number;
}

export interface SitemapRoutesProvider {
  getRoutes(): Promise<SitemapUrl[]>;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultChangefreq: SitemapChangefreq;
}
