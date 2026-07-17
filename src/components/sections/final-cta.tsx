import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { links, site } from "@/lib/site";

export function FinalCta() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-600/25 via-zinc-950 to-indigo-600/20 px-6 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[100px]"
          />

          <div className="relative">
            <h2
              id="contato-heading"
              className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Pronto para tirar seu projeto do papel?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Fale com a equipe da {site.name} e receba uma proposta sob medida
              para o seu negócio — sem compromisso.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href={links.email} className="w-full sm:w-auto">
                Solicitar orçamento
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={links.whatsappQuote}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                Falar no WhatsApp
              </ButtonLink>
            </div>

            <p className="mt-8 text-sm text-zinc-400">
              {site.email} · {site.phoneDisplay}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
