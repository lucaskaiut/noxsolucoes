import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { servicePages } from "@/lib/service-pages";
import { links, nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ice-100">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                N
              </span>
              <span className="text-base font-bold text-slate-900">
                {site.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              Desenvolvimento de software sob medida, aplicativos, integrações
              e inteligência artificial para empresas que querem crescer.
            </p>
          </div>

          <nav aria-label="Serviços">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Serviços
            </h2>
            <ul className="mt-4 space-y-2">
              {servicePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links rápidos">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Links rápidos
            </h2>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Contato
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                  <MailIcon className="h-4 w-4 text-brand-600" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={links.phone}
                  className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                  <PhoneIcon className="h-4 w-4 text-brand-600" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                  <WhatsAppIcon className="h-4 w-4 text-brand-600" />
                  Falar no WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 text-center">
          <p className="text-xs text-slate-500">
            © {year} {site.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
