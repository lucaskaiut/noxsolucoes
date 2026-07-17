import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { technologies } from "@/lib/data";

export function Technologies() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-heading"
      className="scroll-mt-24 border-y border-white/5 bg-white/[0.02] py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="tecnologias-heading"
          eyebrow="Tecnologias"
          title="Stack moderna e confiável"
          description="Trabalhamos com as tecnologias mais utilizadas pelas maiores empresas de tecnologia do mundo."
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-5 text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:border-brand-500/40 hover:text-white"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
