"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { links, nav, site } from "@/lib/site";

function Logo() {
  return (
    <a
      href="#inicio"
      className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
      aria-label={`${site.name} — voltar ao início`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
        N
      </span>
      <span className="text-base font-bold tracking-tight text-slate-900">
        Nox
        <span className="ml-1.5 hidden text-sm font-medium text-slate-500 sm:inline">
          Soluções em Tecnologia
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

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
      </Container>

      {open ? (
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
