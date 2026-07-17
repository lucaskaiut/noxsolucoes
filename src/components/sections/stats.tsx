import { Container } from "@/components/ui/container";
import { technologies } from "@/lib/data";
import { site } from "@/lib/site";

const yearsOfExperience = new Date().getFullYear() - site.foundingYear;

const stats = [
  { value: "10+", label: "Projetos entregues" },
  { value: `${yearsOfExperience}+`, label: "Anos de experiência" },
  { value: `${technologies.length}+`, label: "Tecnologias dominadas" },
  { value: "Brasil", label: "Atendimento em todo o país" },
];

export function Stats() {
  return (
    <section aria-label="Números da Nox Soluções em Tecnologia" className="pb-20 sm:pb-28">
      <Container>
        <dl className="grid grid-cols-2 gap-6 rounded-3xl bg-white/70 px-6 py-10 shadow-md shadow-slate-900/5 backdrop-blur sm:px-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="text-3xl font-bold tracking-tight text-brand-600 sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm font-medium text-slate-600">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
