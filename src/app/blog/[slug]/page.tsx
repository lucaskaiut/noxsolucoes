import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArticleMetadataBuilder,
  BlogRepository,
  JsonLdBuilder,
} from "@/modules/blog";
import { AnalyticsEvent } from "@/analytics";
import { TrackEvent } from "@/components/analytics/track-event";
import {
  TableOfContentsDesktop,
  TableOfContentsMobile,
} from "@/components/blog/table-of-contents";
import { extractHeadings } from "@/components/blog/extract-headings";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { links, site } from "@/lib/site";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const repository = new BlogRepository();
    const post = await repository.getPostBySlug(slug);

    if (!post) {
      return {};
    }

    const metadataBuilder = new ArticleMetadataBuilder();
    return metadataBuilder.build(post);
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  console.log(`[PostPage] Renderizando post com slug="${slug}"`);

  let post;
  const repository = new BlogRepository();
  try {
    post = await repository.getPostBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }

  if (!post) {
    notFound();
  }

  const jsonLdBuilder = new JsonLdBuilder();
  const jsonLd = jsonLdBuilder.build(post);

  const leadPayload = JSON.stringify({
    source: "blog",
    postSlug: post.slug,
  });

  let adjacentPosts: { prev: typeof post | null; next: typeof post | null } = {
    prev: null,
    next: null,
  };
  try {
    adjacentPosts = await repository.getAdjacentPosts(slug);
  } catch (error) {
    console.error("Failed to fetch adjacent posts:", error);
  }

  const headings = extractHeadings(post.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TrackEvent
        event={AnalyticsEvent.VIEW_POST}
        payload={{
          postId: String(post.id),
          slug: post.slug,
          title: post.title,
          category: post.categories[0]?.name ?? "",
        }}
      />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <article className="pt-32 sm:pt-40">
          <Container>
            <nav aria-label="Trilha de navegação" className="text-sm">
              <ol className="flex items-center gap-2 text-slate-500">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                  >
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                {post.categories.length > 0 && (
                  <>
                    <li>
                      <Link
                        href={`/blog/categoria/${post.categories[0].slug}`}
                        className="transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                      >
                        {post.categories[0].name}
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                  </>
                )}
                <li aria-current="page" className="font-medium text-slate-700">
                  {post.title}
                </li>
              </ol>
            </nav>

            <div className="mt-10">
              <div className="flex gap-12 lg:flex-row">
                {/* Main content */}
                <div className="min-w-0 flex-1 pb-16 sm:pb-20 lg:max-w-[800px]">
                  {post.categories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/blog/categoria/${cat.slug}`}
                          className="text-xs font-semibold uppercase tracking-widest text-brand-600 transition-colors hover:text-brand-700"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    {post.title}
                  </h1>
                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">
                      {post.author}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.reading_time} min de leitura</span>
                  </div>
                  {post.excerpt && (
                    <p className="mt-5 text-lg leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-6 rounded-xl border border-ice-200 bg-ice-50 px-5 py-4">
                    <a
                      href={getChatGptTldrUrl(post.title, post.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      <span
                        className="mt-0.5 shrink-0 text-lg"
                        aria-hidden="true"
                      >
                        ⚡
                      </span>
                      <span>
                        <span className="font-semibold text-slate-800 transition-colors group-hover:text-brand-700">
                          Preguiça de ler?
                        </span>{" "}
                        Clique aqui para um resumo com IA
                      </span>
                    </a>
                  </div>

                  {post.featured_image && (
                    <div className="mt-10 overflow-hidden rounded-2xl bg-white p-2 shadow-lg shadow-slate-900/5">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        width={1200}
                        height={630}
                        priority
                        className="w-full rounded-xl object-cover"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                      />
                    </div>
                  )}

                  <div
                    className="blog-content mt-12"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(post.content),
                    }}
                  />

                  <TableOfContentsMobile headings={headings} />

                  <nav
                    aria-label="Navegação entre artigos"
                    className="mt-16 border-t border-slate-200 pt-8"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {adjacentPosts.prev ? (
                        <Link
                          href={`/blog/${adjacentPosts.prev.slug}`}
                          className="group flex-1 rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-200 hover:bg-ice-50"
                        >
                          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            ← Artigo anterior
                          </span>
                          <span className="mt-1 block text-sm font-medium text-slate-700 transition-colors group-hover:text-brand-600">
                            {adjacentPosts.prev.title}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex-1" />
                      )}
                      {adjacentPosts.next ? (
                        <Link
                          href={`/blog/${adjacentPosts.next.slug}`}
                          className="group flex-1 rounded-xl border border-slate-200 p-4 text-right transition-colors hover:border-brand-200 hover:bg-ice-50"
                        >
                          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Próximo artigo →
                          </span>
                          <span className="mt-1 block text-sm font-medium text-slate-700 transition-colors group-hover:text-brand-600">
                            {adjacentPosts.next.title}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex-1" />
                      )}
                    </div>
                  </nav>

                  <div className="mt-12 rounded-2xl bg-ice-100 p-8">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Sobre a {site.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {site.description}
                    </p>
                  </div>
                </div>

                {/* Desktop sidebar */}
                <aside className="hidden w-56 shrink-0 lg:block">
                  <div className="sticky top-28">
                    <TableOfContentsDesktop headings={headings} />
                  </div>
                </aside>
              </div>
            </div>
          </Container>
        </article>

        <section
          aria-labelledby="post-cta-heading"
          className="bg-ice-50 py-16 sm:py-20"
        >
          <Container>
            <div className="text-center">
              <h2
                id="post-cta-heading"
                className="text-2xl font-bold tracking-tight text-brand-600 sm:text-3xl"
              >
                Vamos construir algo juntos?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                Entre em contato e receba uma proposta sob medida para o seu
                projeto de software.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink
                  href={links.email}
                  data-analytics-event="generate_lead"
                  data-analytics-payload={leadPayload}
                  className="bg-brand-600 text-white hover:bg-brand-700"
                >
                  Solicitar orçamento
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href={links.whatsapp}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="contact"
                  data-analytics-payload={leadPayload}
                  className="border-brand-300 text-brand-700 hover:bg-brand-50"
                >
                  <WhatsAppIcon className="h-4 w-4 text-emerald-500" />
                  Falar no WhatsApp
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function getChatGptTldrUrl(title: string, slug: string): string {
  const postUrl = `${site.url}/blog/${slug}`;
  const prompt = `Leia o artigo abaixo e gere um resumo objetivo.

URL: ${postUrl}

Requisitos:
- Explique o tema em linguagem simples.
- Liste os principais pontos em tópicos.
- Destaque conclusões importantes.
- Informe para quem o artigo é indicado.
- Gere um TL;DR de no máximo 5 linhas.`;

  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

function sanitizeHtml(html: string): string {
  if (!html) return "";

  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/on\w+\s*=\s*'[^']*'/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript\s*:/gi, "blocked:");
}
