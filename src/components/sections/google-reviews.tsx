import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClassName } from "@/components/ui/button-styles";
import { getGoogleReviews } from "@/modules/google-reviews/google-reviews";

const ratingFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`${className} ${index < filled ? "text-amber-400" : "text-slate-300"}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

interface GoogleReviewsProps {
  className?: string;
}

/** Não renderiza nada se a API não estiver configurada ou falhar. */
export async function GoogleReviews({ className = "bg-ice-100" }: GoogleReviewsProps) {
  const summary = await getGoogleReviews();
  if (!summary || summary.reviews.length === 0) return null;

  const totalLabel = `${summary.total} ${summary.total === 1 ? "avaliação" : "avaliações"} no Google`;

  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-heading"
      className={`scroll-mt-24 py-20 sm:py-28 ${className}`}
    >
      <Container>
        <SectionHeading
          id="avaliacoes-heading"
          eyebrow="Avaliações"
          title="O que nossos clientes dizem"
          description="Avaliações reais publicadas no perfil da Nox no Google."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-md shadow-slate-900/5">
            <p className="text-5xl font-bold tracking-tight text-slate-900">
              {ratingFormatter.format(summary.rating)}
            </p>
            <div className="mt-3">
              <Stars rating={summary.rating} className="h-6 w-6" />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              <span className="sr-only">
                Nota {ratingFormatter.format(summary.rating)} de 5,{" "}
              </span>
              {totalLabel}
            </p>
            <div className="mt-6 flex w-full flex-col gap-3">
              <a
                href={summary.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName("primary", "w-full")}
              >
                Avaliar a Nox no Google
              </a>
              {summary.mapsUrl ? (
                <a
                  href={summary.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName("ghost", "w-full")}
                >
                  Ver todas no Google
                </a>
              ) : null}
            </div>
          </div>

          <ul className="grid gap-6">
            {summary.reviews.map((review) => (
              <li key={`${review.author}-${review.publishedAt ?? review.relativeTime}`}>
                <figure className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-md shadow-slate-900/5">
                  <figcaption className="flex items-center gap-3">
                    {review.authorPhoto ? (
                      <Image
                        src={review.authorPhoto}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white"
                      >
                        {review.author.charAt(0)}
                      </span>
                    )}
                    <div className="min-w-0">
                      {review.authorUrl ? (
                        <a
                          href={review.authorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-slate-900 hover:text-brand-700"
                        >
                          {review.author}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-900">{review.author}</p>
                      )}
                      <div className="mt-0.5 flex items-center gap-2">
                        <Stars rating={review.rating} className="h-3.5 w-3.5" />
                        <span className="sr-only">Nota {review.rating} de 5</span>
                        {review.relativeTime ? (
                          <span className="text-xs text-slate-500">{review.relativeTime}</span>
                        ) : null}
                      </div>
                    </div>
                  </figcaption>
                  <blockquote className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                    “{review.text}”
                  </blockquote>
                  {review.reviewUrl ? (
                    <a
                      href={review.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Ver avaliação no Google
                    </a>
                  ) : null}
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">Fonte: Google Maps</p>
      </Container>
    </section>
  );
}
