import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { technologies } from "@/lib/data";

export function Technologies() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-heading"
      className="scroll-mt-24 bg-ice-100 py-20 sm:py-28"
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
              className="flex items-center justify-center rounded-xl bg-white/70 px-4 py-5 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/5 backdrop-blur transition-colors duration-300 hover:bg-white hover:text-slate-900"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
