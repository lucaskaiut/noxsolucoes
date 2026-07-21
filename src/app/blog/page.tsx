import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArticleMetadataBuilder,
  BlogRepository,
  JsonLdBuilder,
} from "@/modules/blog";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { links } from "@/lib/site";

const metadataBuilder = new ArticleMetadataBuilder();

export const metadata: Metadata = metadataBuilder.buildListing();

async function getPosts(page: number) {
  try {
    const repository = new BlogRepository();
    return await repository.getPosts(page);
  } catch {
    return { posts: [], currentPage: 1, lastPage: 1, total: 0 };
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const { posts, lastPage } = await getPosts(currentPage);

  const jsonLdBuilder = new JsonLdBuilder();
  const listingJsonLd = posts.length > 0
    ? jsonLdBuilder.buildListing(posts.slice(0, 10))
    : jsonLdBuilder.buildListing([]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingJsonLd).replace(/</g, "\\u003c"),
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
        <section
          aria-labelledby="blog-heading"
          className="pt-32 pb-16 sm:pt-40 sm:pb-20"
        >
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
                <li aria-current="page" className="font-medium text-slate-700">
                  Blog
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                Blog da Nox
              </p>
              <h1
                id="blog-heading"
                className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              >
                Conteúdo sobre tecnologia e desenvolvimento de software
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Conteúdo sobre desenvolvimento de software, ERP, CRM, SaaS, IA,
                automação e tecnologia.
              </p>
            </div>
          </Container>
        </section>

        <section aria-label="Artigos do blog" className="pb-20 sm:pb-28">
          <Container>
            {posts.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center shadow-md shadow-slate-900/5">
                <p className="text-lg text-slate-500">
                  Nenhum artigo publicado ainda.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Volte em breve para conferir nosso conteúdo.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.slug}
                      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-900/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-900/10"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        aria-label={`Ler artigo ${post.title}`}
                        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                      >
                        {post.featured_image ? (
                          <Image
                            src={post.featured_image}
                            alt={post.title}
                            width={960}
                            height={456}
                            className="aspect-video w-full object-cover object-top"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="aspect-video w-full bg-brand-500/10" />
                        )}
                      </Link>
                      <div className="flex flex-1 flex-col p-6">
                        {post.categories.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1.5">
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
                        <h2 className="text-lg font-semibold text-slate-900">
                          {post.title}
                        </h2>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
                          <span>{post.author}</span>
                          <span aria-hidden="true">·</span>
                          <time dateTime={post.published_at}>
                            {new Date(post.published_at).toLocaleDateString(
                              "pt-BR",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </time>
                          <span aria-hidden="true">·</span>
                          <span>{post.reading_time} min de leitura</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                        >
                          Ler artigo
                          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {lastPage > 1 && (
                  <nav
                    aria-label="Paginação do blog"
                    className="mt-12 flex items-center justify-center gap-3"
                  >
                    {currentPage > 1 && (
                      <Link
                        href={`/blog?page=${currentPage - 1}`}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                      >
                        Anterior
                      </Link>
                    )}
                    <span className="text-sm text-slate-500">
                      Página {currentPage} de {lastPage}
                    </span>
                    {currentPage < lastPage && (
                      <Link
                        href={`/blog?page=${currentPage + 1}`}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                      >
                        Próxima
                      </Link>
                    )}
                  </nav>
                )}
              </>
            )}
          </Container>
        </section>

        <section
          aria-labelledby="blog-cta-heading"
          className="bg-ice-50 py-16 sm:py-20"
        >
          <Container>
            <div className="text-center">
              <h2
                id="blog-cta-heading"
                className="text-2xl font-bold tracking-tight text-brand-600 sm:text-3xl"
              >
                Precisa de um software sob medida?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                Conte o desafio do seu negócio e receba uma proposta personalizada,
                sem compromisso.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink
                  href={links.email}
                  data-analytics-event="generate_lead"
                  data-analytics-payload={JSON.stringify({ source: "blog_list" })}
                  className="bg-brand-600 text-white hover:bg-brand-700"
                >
                  Solicitar orçamento
                  <ArrowRightIcon className="h-4 w-4" />
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
