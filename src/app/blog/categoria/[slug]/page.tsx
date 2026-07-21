import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BlogRepository,
  JsonLdBuilder,
} from "@/modules/blog";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { links, site } from "@/lib/site";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const repository = new BlogRepository();
    const categories = await repository.getCategories();
    const category = categories.find((c) => c.slug === slug);

    const title = category
      ? `Categoria: ${category.name} | Blog da Nox`
      : "Categoria | Blog da Nox";

    return {
      title,
      description: `Artigos sobre ${category?.name ?? slug} no Blog da Nox. Conteúdo sobre tecnologia e desenvolvimento de software.`,
      alternates: {
        canonical: `/blog/categoria/${slug}`,
      },
      openGraph: {
        type: "website",
        locale: "pt_BR",
        url: `${site.url}/blog/categoria/${slug}`,
        siteName: site.name,
        title,
      },
      twitter: {
        card: "summary_large_image",
        title,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {};
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  let posts: Awaited<ReturnType<BlogRepository["getPostsByCategory"]>> = {
    posts: [],
    currentPage: 1,
    lastPage: 1,
    total: 0,
  };
  let categoryName = slug;

  try {
    const repository = new BlogRepository();
    posts = await repository.getPostsByCategory(slug, currentPage);

    if (posts.posts.length > 0 && posts.posts[0].categories.length > 0) {
      const matchCat = posts.posts[0].categories.find(
        (c) => c.slug === slug,
      );
      if (matchCat) {
        categoryName = matchCat.name;
      }
    }
  } catch {
    notFound();
  }

  const jsonLdBuilder = new JsonLdBuilder();
  const jsonLd = jsonLdBuilder.buildCategoryPage(
    categoryName,
    slug,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
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
          aria-labelledby="category-heading"
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
                <li>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-slate-700">
                  {categoryName}
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                Categoria
              </p>
              <h1
                id="category-heading"
                className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              >
                {categoryName}
              </h1>
            </div>
          </Container>
        </section>

        <section aria-label="Artigos da categoria" className="pb-20 sm:pb-28">
          <Container>
            {posts.posts.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center shadow-md shadow-slate-900/5">
                <p className="text-lg text-slate-500">
                  Nenhum artigo encontrado nesta categoria.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.posts.map((post) => (
                    <article
                      key={post.slug}
                      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-900/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-900/10"
                    >
                      <div className="flex flex-1 flex-col p-6">
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

                {posts.lastPage > 1 && (
                  <nav
                    aria-label="Paginação"
                    className="mt-12 flex items-center justify-center gap-3"
                  >
                    {posts.currentPage > 1 && (
                      <Link
                        href={`/blog/categoria/${slug}?page=${posts.currentPage - 1}`}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                      >
                        Anterior
                      </Link>
                    )}
                    <span className="text-sm text-slate-500">
                      Página {posts.currentPage} de {posts.lastPage}
                    </span>
                    {posts.currentPage < posts.lastPage && (
                      <Link
                        href={`/blog/categoria/${slug}?page=${posts.currentPage + 1}`}
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
          aria-labelledby="category-cta-heading"
          className="bg-brand-600 py-16 sm:py-20"
        >
          <Container>
            <div className="text-center">
              <h2
                id="category-cta-heading"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Precisa de um software sob medida?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-brand-100">
                Conte o desafio do seu negócio e receba uma proposta personalizada.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink
                  href={links.email}
                  data-analytics-event="generate_lead"
                  data-analytics-payload={JSON.stringify({
                    source: "blog_category",
                    categorySlug: slug,
                  })}
                  className="bg-white text-brand-700 hover:bg-brand-50"
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
