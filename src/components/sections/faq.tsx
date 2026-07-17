import { Container } from "@/components/ui/container";
import { ChevronDownIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/data";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Perguntas frequentes"
          description="Tire suas principais dúvidas sobre como trabalhamos, prazos, custos e suporte."
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-zinc-900 shadow-md shadow-black/25 open:bg-zinc-800/80"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
