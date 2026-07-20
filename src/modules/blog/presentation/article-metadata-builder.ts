import type { Metadata } from "next";
import type { BlogPost } from "../domain/types";
import { site } from "@/lib/site";

export class ArticleMetadataBuilder {
  build(post: BlogPost): Metadata {
    const title = post.meta_title ?? post.title;
    const description = post.meta_description ?? post.excerpt;
    const postUrl = `${site.url}/blog/${post.slug}`;
    const canonical = post.canonical_url ?? postUrl;

    const robots: Metadata["robots"] = post.allow_indexing
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: false,
        };

    const openGraphImages = [];
    if (post.og_image) {
      openGraphImages.push({
        url: post.og_image,
        width: 1200,
        height: 630,
        alt: post.og_title ?? title,
      });
    } else if (post.featured_image) {
      openGraphImages.push({
        url: post.featured_image,
        width: 1200,
        height: 630,
        alt: post.og_title ?? title,
      });
    }

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        type: "article",
        locale: "pt_BR",
        url: postUrl,
        siteName: site.name,
        title: post.og_title ?? title,
        description: post.og_description ?? description,
        publishedTime: post.published_at,
        modifiedTime: post.updated_at,
        images: openGraphImages.length > 0 ? openGraphImages : undefined,
        authors: [post.author],
      },
      twitter: {
        card: "summary_large_image",
        title: post.og_title ?? title,
        description: post.og_description ?? description,
        images: openGraphImages.length > 0
          ? [openGraphImages[0].url]
          : undefined,
      },
      robots,
      authors: [{ name: post.author }],
      publisher: site.name,
      category: post.categories[0]?.name,
      keywords: post.categories.map((c) => c.name),
    };
  }

  buildListing(description?: string): Metadata {
    const title = "Blog da Nox | Conteúdo sobre Tecnologia e Desenvolvimento de Software";
    const desc =
      description ??
      "Conteúdo sobre desenvolvimento de software, ERP, CRM, SaaS, IA, automação e tecnologia.";

    return {
      title,
      description: desc,
      alternates: {
        canonical: "/blog",
      },
      openGraph: {
        type: "website",
        locale: "pt_BR",
        url: `${site.url}/blog`,
        siteName: site.name,
        title,
        description: desc,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: desc,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
      keywords: [
        "blog de tecnologia",
        "desenvolvimento de software",
        "ERP",
        "CRM",
        "SaaS",
        "inteligência artificial",
        "automação",
        "Nox Soluções em Tecnologia",
      ],
    };
  }
}
