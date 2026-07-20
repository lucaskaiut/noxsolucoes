import type { BlogCategory, BlogPost } from "../domain/types";
import type { BlogPostApiResponse } from "../domain/types";
import { BlogApiClient } from "../infrastructure/blog-api-client";

function resolveAuthor(author: BlogPostApiResponse["author"]): string {
  if (typeof author === "string") return author;
  if (author && typeof author === "object" && "name" in author) return author.name;
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeCategories(categories: BlogCategory[]): BlogCategory[] {
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug ?? slugify(cat.name),
    description: cat.description,
  }));
}

function mapPost(apiPost: BlogPostApiResponse): BlogPost {
  return {
    id: apiPost.id,
    slug: apiPost.slug,
    title: apiPost.title,
    excerpt: apiPost.excerpt,
    content: apiPost.content,
    featured_image: apiPost.featured_image,
    author: resolveAuthor(apiPost.author),
    published_at: apiPost.published_at,
    updated_at: apiPost.updated_at,
    reading_time: apiPost.reading_time,
    categories: normalizeCategories(apiPost.categories ?? []),
    meta_title: apiPost.meta_title,
    meta_description: apiPost.meta_description,
    canonical_url: apiPost.canonical_url,
    og_title: apiPost.og_title,
    og_description: apiPost.og_description,
    og_image: apiPost.og_image,
    allow_indexing: apiPost.allow_indexing,
    include_in_sitemap: apiPost.include_in_sitemap,
    schema_type: apiPost.schema_type,
  };
}

export class BlogRepository {
  private client: BlogApiClient;

  constructor(client?: BlogApiClient) {
    this.client = client ?? new BlogApiClient();
  }

  async getPosts(page: number = 1, perPage: number = 12): Promise<{
    posts: BlogPost[];
    currentPage: number;
    lastPage: number;
    total: number;
  }> {
    const result = await this.client.getPosts(page, perPage, {
      status: "published",
    });

    return {
      posts: result.data.map(mapPost),
      currentPage: result.meta.current_page,
      lastPage: result.meta.last_page,
      total: result.meta.total,
    };
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const apiPost = await this.client.getPostBySlug(slug);
    if (!apiPost) return null;
    return mapPost(apiPost);
  }

  async getCategories(): Promise<BlogCategory[]> {
    return this.client.getCategories();
  }

  async getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
    const apiPosts = await this.client.getFeaturedPosts(limit);
    return apiPosts.map(mapPost);
  }

  async getSitemapEntries(): Promise<BlogPost[]> {
    const apiPosts = await this.client.getPostsForSitemap();
    return apiPosts
      .filter((post) => post.include_in_sitemap && post.allow_indexing)
      .map(mapPost);
  }

  async getPostsByCategory(
    categorySlug: string,
    page: number = 1,
    perPage: number = 12,
  ): Promise<{
    posts: BlogPost[];
    currentPage: number;
    lastPage: number;
    total: number;
  }> {
    const result = await this.client.getPosts(page, perPage, {
      category: categorySlug,
      status: "published",
    });

    return {
      posts: result.data.map(mapPost),
      currentPage: result.meta.current_page,
      lastPage: result.meta.last_page,
      total: result.meta.total,
    };
  }
}
