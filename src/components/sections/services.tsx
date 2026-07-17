import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="servicos-heading"
          eyebrow="Serviços"
          title="Soluções completas em tecnologia"
          description="Do planejamento à evolução contínua, a Nox Soluções em Tecnologia entrega tudo o que sua empresa precisa para acelerar com software."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-brand-500/40 hover:bg-brand-500/[0.06]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-300 transition-colors duration-300 group-hover:bg-brand-500/20">
                <Icon name={service.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                {service.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias e entregas relacionadas">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <article className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-600/20 via-brand-600/10 to-indigo-600/10 p-7">
            <h3 className="text-lg font-semibold text-white">
              Não encontrou o que precisa?
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
              Conte sua ideia para a nossa equipe. Avaliamos o desafio e
              desenhamos a solução ideal para o seu negócio.
            </p>
            <a
              href="#contato"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Falar com um especialista →
            </a>
          </article>
        </div>
      </Container>
    </section>
  );
}
