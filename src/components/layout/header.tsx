"use client";

import { useState } from "react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/ui/icons";
import { links, nav } from "@/lib/site";

interface HeaderProps {
  variant?: "default" | "campaign";
}

const whatsappPayload = JSON.stringify({
  source: "landing_sistemas_sob_medida",
  channel: "whatsapp",
});

export function Header({ variant = "default" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const isCampaign = variant === "campaign";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/50 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Logo
          priority
          href={isCampaign ? "#inicio" : "/"}
          className={isCampaign ? "h-7 w-auto sm:h-8" : undefined}
        />

        {isCampaign ? (
          <ButtonLink
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp sobre um projeto"
            data-analytics-event="generate_lead"
            data-analytics-payload={whatsappPayload}
            className="px-4 py-3.5 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Falar no WhatsApp</span>
          </ButtonLink>
        ) : (
          <>
            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden lg:block">
              <ButtonLink href={links.email} className="px-5 py-2.5">
                Solicitar orçamento
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-brand-600 lg:hidden"
            >
              {open ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </>
        )}
      </Container>

      {!isCampaign && open ? (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="bg-white/90 shadow-lg shadow-slate-900/10 backdrop-blur-xl lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                {item.label}
              </a>
            ))}
            <ButtonLink
              href={links.email}
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              Solicitar orçamento
            </ButtonLink>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
