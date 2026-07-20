import { BlogRepository } from "@/modules/blog";
import type { SitemapRoutesProvider, SitemapUrl } from "./contracts";

export class BlogRoutesProvider implements SitemapRoutesProvider {
  async getRoutes(): Promise<SitemapUrl[]> {
    const repository = new BlogRepository();

    return [
      { url: "/blog", changefreq: "weekly", priority: 0.9 },
      ...(await this.getPostRoutes(repository)),
    ];
  }

  private async getPostRoutes(
    repository: BlogRepository,
  ): Promise<SitemapUrl[]> {
    try {
      const posts = await repository.getSitemapEntries();
      return posts.map((post) => ({
        url: `/blog/${post.slug}`,
        lastmod: post.updated_at,
        changefreq: "monthly",
        priority: 0.7,
      }));
    } catch (error) {
      console.warn(
        "[Sitemap] BlogRoutesProvider falhou e será ignorado:",
        error,
      );
      return [];
    }
  }
}
