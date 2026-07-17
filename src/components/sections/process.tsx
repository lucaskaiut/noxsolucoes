import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section
      id="processo"
      aria-labelledby="processo-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="processo-heading"
          eyebrow="Como trabalhamos"
          title="Um processo claro, do início ao fim"
          description="Metodologia transparente com entregas frequentes, para você acompanhar cada etapa do projeto."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li
              key={step.step}
              className="relative rounded-2xl bg-zinc-900 p-7 shadow-lg shadow-black/30"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white"
                >
                  {step.step}
                </span>
                <h3 className="text-base font-semibold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
