import type { BlogPost } from "../domain/types";
import { site } from "@/lib/site";

const organizationId = `${site.url}/#organization`;

export class JsonLdBuilder {
  build(post: BlogPost): Record<string, unknown> {
    const postUrl = `${site.url}/blog/${post.slug}`;
    const schemaType = this.resolveSchemaType(post.schema_type);

    const article: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "@id": `${postUrl}/#article`,
      headline: post.meta_title ?? post.title,
      description: post.meta_description ?? post.excerpt,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
      },
      datePublished: post.published_at,
      dateModified: post.updated_at,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${postUrl}/#webpage`,
        url: postUrl,
      },
      inLanguage: "pt-BR",
    };

    if (post.featured_image) {
      article.image = {
        "@type": "ImageObject",
        url: post.featured_image,
        width: 1200,
        height: 630,
        caption: post.meta_title ?? post.title,
      };
    }

    return article;
  }

  buildListing(posts: BlogPost[]): Record<string, unknown> {
    const pageUrl = `${site.url}/blog`;

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}/#webpage`,
          url: pageUrl,
          name: "Blog da Nox",
          description:
            "Conteúdo sobre desenvolvimento de software, ERP, CRM, SaaS, IA, automação e tecnologia.",
          isPartOf: {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
          },
          about: { "@id": organizationId },
          inLanguage: "pt-BR",
          breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}/#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Início",
              item: site.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: pageUrl,
            },
          ],
        },
        {
          "@type": "Blog",
          "@id": `${pageUrl}/#blog`,
          name: "Blog da Nox",
          description:
            "Conteúdo sobre desenvolvimento de software, ERP, CRM, SaaS, IA, automação e tecnologia.",
          url: pageUrl,
          publisher: { "@id": organizationId },
          inLanguage: "pt-BR",
          blogPost: posts.map((post, index) => ({
            "@type": "BlogPosting",
            "@id": `${site.url}/blog/${post.slug}/#article`,
            position: index + 1,
            headline: post.meta_title ?? post.title,
            description: post.meta_description ?? post.excerpt,
            datePublished: post.published_at,
            dateModified: post.updated_at,
            author: {
              "@type": "Person",
              name: post.author,
            },
            url: `${site.url}/blog/${post.slug}`,
            ...(post.featured_image && {
              image: post.featured_image,
            }),
          })),
        },
      ],
    };
  }

  buildCategoryPage(
    categoryName: string,
    categorySlug: string,
  ): Record<string, unknown> {
    const pageUrl = `${site.url}/blog/categoria/${categorySlug}`;

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}/#webpage`,
          url: pageUrl,
          name: `Categoria: ${categoryName} | Blog da Nox`,
          description: `Artigos sobre ${categoryName} no Blog da Nox. Conteúdo sobre tecnologia e desenvolvimento de software.`,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
          },
          about: { "@id": organizationId },
          inLanguage: "pt-BR",
          breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}/#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Início",
              item: site.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${site.url}/blog`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: categoryName,
              item: pageUrl,
            },
          ],
        },
      ],
    };
  }

  private resolveSchemaType(schemaType: string | null): string {
    const allowed = new Set(["Article", "TechArticle", "BlogPosting"]);
    if (schemaType && allowed.has(schemaType)) {
      return schemaType;
    }
    return "Article";
  }
}
