import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cases } from "@/lib/data";

export function Cases() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="projetos-heading"
          eyebrow="Projetos"
          title="Soluções que já saíram do papel"
          description="Uma amostra dos tipos de projeto que a Nox Soluções em Tecnologia desenvolve para seus clientes."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-900/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-900/10"
            >
              <Image
                src={item.image}
                alt={`Imagem ilustrativa do projeto ${item.title}`}
                width={600}
                height={400}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                  {item.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
