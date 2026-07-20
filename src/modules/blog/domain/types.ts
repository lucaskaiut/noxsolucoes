export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  published_at: string;
  updated_at: string;
  reading_time: number;
  categories: BlogCategory[];
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  allow_indexing: boolean;
  include_in_sitemap: boolean;
  schema_type: string | null;
}

export interface BlogPostApiResponse {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  published_at: string;
  updated_at: string;
  reading_time: number;
  categories: BlogCategory[];
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  allow_indexing: boolean;
  include_in_sitemap: boolean;
  schema_type: string | null;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface BlogPostFilters {
  page?: number;
  perPage?: number;
  category?: string;
  status?: string;
}
