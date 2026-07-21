import type {
  BlogCategory,
  BlogPostApiResponse,
  PaginatedResponse,
} from "../domain/types";

const CMS_API_URL = process.env.CMS_API_URL;
const CMS_API_TOKEN = process.env.CMS_API_TOKEN;

export class BlogApiClient {
  private get baseUrl(): string {
    if (!CMS_API_URL) {
      throw new Error("CMS_API_URL is not configured");
    }
    return CMS_API_URL;
  }

  private get headers(): HeadersInit {
    return {
      Authorization: `Bearer ${CMS_API_TOKEN ?? ""}`,
      Accept: "application/json",
    };
  }

  private async fetchFromCms<T>(
    path: string,
    options?: { revalidate?: number; tags?: string[] },
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const nextOptions: Record<string, unknown> = {};

    if (options?.revalidate !== undefined) {
      nextOptions.revalidate = options.revalidate;
    }

    if (options?.tags?.length) {
      nextOptions.tags = options.tags;
    }

    const response = await fetch(url, {
      headers: this.headers,
      next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
    });

    if (response.status === 401) {
      throw new Error(
        "Erro de autenticação com o CMS. Verifique o CMS_API_TOKEN.",
      );
    }

    if (!response.ok) {
      throw new Error(
        `CMS API error: ${response.status} ${response.statusText} at ${path}`,
      );
    }

    return response.json() as Promise<T>;
  }

  async getPosts(
    page: number = 1,
    perPage: number = 12,
    filters?: { category?: string; status?: string },
  ): Promise<PaginatedResponse<BlogPostApiResponse>> {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    if (filters?.category) params.set("category", filters.category);
    if (filters?.status) params.set("status", filters.status);

    return this.fetchFromCms<PaginatedResponse<BlogPostApiResponse>>(
      `/api/posts?${params.toString()}`,
      { revalidate: 3600, tags: ["blog-posts"] },
    );
  }

  async getPostBySlug(slug: string): Promise<BlogPostApiResponse | null> {
    const params = new URLSearchParams();
    params.set("slug", slug);
    params.set("per_page", "1");

    const result = await this.fetchFromCms<PaginatedResponse<BlogPostApiResponse>>(
      `/api/posts?${params.toString()}`,
      { revalidate: 3600, tags: [`blog-post-${slug}`] },
    );

    return result.data[0] ?? null;
  }

  async getCategories(): Promise<BlogCategory[]> {
    return this.fetchFromCms<BlogCategory[]>("/api/categories", {
      revalidate: 86400,
      tags: ["blog-categories"],
    });
  }

  async getPostsForSitemap(): Promise<BlogPostApiResponse[]> {
    const params = new URLSearchParams();
    params.set("status", "published");
    params.set("per_page", "100");

    const allPosts: BlogPostApiResponse[] = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const pageParams = new URLSearchParams(params.toString());
      pageParams.set("page", String(currentPage));

      const result = await this.fetchFromCms<PaginatedResponse<BlogPostApiResponse>>(
        `/api/posts?${pageParams.toString()}`,
        { revalidate: 3600, tags: ["blog-sitemap"] },
      );

      allPosts.push(...result.data);
      totalPages = result.meta.last_page;
      currentPage++;
    } while (currentPage <= totalPages);

    return allPosts;
  }

  async getAllPublishedPosts(): Promise<BlogPostApiResponse[]> {
    const params = new URLSearchParams();
    params.set("status", "published");
    params.set("per_page", "100");

    const result = await this.fetchFromCms<
      PaginatedResponse<BlogPostApiResponse>
    >(`/api/posts?${params.toString()}`, {
      revalidate: 3600,
      tags: ["blog-posts"],
    });

    return result.data;
  }

  async getFeaturedPosts(limit: number = 3): Promise<BlogPostApiResponse[]> {
    const params = new URLSearchParams();
    params.set("per_page", String(limit));
    params.set("status", "published");

    const result = await this.fetchFromCms<PaginatedResponse<BlogPostApiResponse>>(
      `/api/posts?${params.toString()}`,
      { revalidate: 3600, tags: ["blog-posts"] },
    );

    return result.data.slice(0, limit);
  }
}
