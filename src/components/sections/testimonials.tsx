import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="scroll-mt-24 bg-zinc-900/50 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="depoimentos-heading"
          eyebrow="Depoimentos"
          title="O que dizem sobre a Nox"
          description="Depoimentos ilustrativos de exemplo — em breve, histórias reais dos nossos clientes."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-zinc-900 p-7 shadow-lg shadow-black/30"
            >
              <blockquote className="text-sm leading-relaxed text-zinc-300">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white"
                >
                  {testimonial.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-zinc-500">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500">
          * Depoimentos fictícios apresentados apenas como exemplo de layout.
        </p>
      </Container>
    </section>
  );
}
