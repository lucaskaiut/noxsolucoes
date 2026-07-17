import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { differentials } from "@/lib/data";

export function Differentials() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-heading"
      className="relative scroll-mt-24 bg-zinc-900/50 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="diferenciais-heading"
          eyebrow="Diferenciais"
          title="Por que escolher a Nox"
          description="Mais do que escrever código, entregamos tecnologia com estratégia, qualidade e compromisso com o resultado do seu negócio."
        />

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-300 shadow-sm shadow-black/20">
                <Icon name={item.icon} className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
