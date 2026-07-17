import { Container } from "@/components/ui/container";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { links, nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 text-sm font-bold text-white">
                N
              </span>
              <span className="text-base font-bold text-white">
                {site.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Desenvolvimento de software sob medida, aplicativos, integrações
              e inteligência artificial para empresas que querem crescer.
            </p>
          </div>

          <nav aria-label="Links rápidos">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              Links rápidos
            </h2>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              Contato
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <MailIcon className="h-4 w-4 text-brand-400" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={links.phone}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <PhoneIcon className="h-4 w-4 text-brand-400" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <WhatsAppIcon className="h-4 w-4 text-brand-400" />
                  Falar no WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-zinc-500">
            © {year} {site.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
