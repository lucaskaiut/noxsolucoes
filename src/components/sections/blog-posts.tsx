import Link from "next/link";
import { BlogRepository } from "@/modules/blog";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon } from "@/components/ui/icons";

export async function BlogPosts() {
  const repository = new BlogRepository();
  const posts = await repository.getFeaturedPosts(3);

  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="scroll-mt-24 bg-ice-50 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="blog-heading"
          eyebrow="Blog"
          title="Conteúdo sobre tecnologia e desenvolvimento"
          description="Insights, tutoriais e novidades do mundo da tecnologia escritos pela equipe Nox."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-900/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-900/10"
            >
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
                <h3 className="text-lg font-semibold text-slate-900">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <span>{post.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
          >
            Ver todos os artigos
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
