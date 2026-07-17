import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { links, site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Software house em {site.locality} — atendimento em todo o Brasil
          </p>

          <h1
            id="hero-heading"
            className="animate-fade-up mt-6 text-4xl font-bold tracking-tight text-white [animation-delay:100ms] sm:text-5xl lg:text-6xl"
          >
            Transformamos ideias em{" "}
            <span className="text-brand-400">
              soluções digitais
            </span>{" "}
            que impulsionam negócios
          </h1>

          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 [animation-delay:200ms] sm:text-lg">
            A {site.name} desenvolve sistemas web, aplicativos, integrações e
            soluções com inteligência artificial sob medida para empresas que
            querem crescer com tecnologia de ponta.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 [animation-delay:300ms] sm:flex-row">
            <ButtonLink href={links.email} className="w-full sm:w-auto">
              Solicitar orçamento
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={links.whatsapp}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
              Falar no WhatsApp
            </ButtonLink>
          </div>
        </div>

        <div className="animate-fade-up relative mx-auto mt-16 max-w-5xl [animation-delay:400ms] sm:mt-20">
          <div className="overflow-hidden rounded-2xl bg-zinc-900 p-2 shadow-2xl shadow-black/60">
            <Image
              src="https://placehold.co/1200x680/17102b/a78bfa/png?text=Plataforma+Nox"
              alt="Ilustração de uma plataforma de software desenvolvida pela Nox Soluções em Tecnologia"
              width={1200}
              height={680}
              priority
              className="w-full rounded-xl"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
