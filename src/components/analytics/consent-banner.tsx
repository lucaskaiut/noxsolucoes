"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { hasTrackingProviders } from "@/analytics";
import {
  getConsent,
  onConsentChange,
  setConsent,
  type ConsentChoice,
} from "@/analytics/consent";
import { buttonClassName } from "@/components/ui/button-styles";

// No HTML estático ainda não há escolha conhecida: o banner só aparece após a hidratação.
const SERVER_SNAPSHOT = "pending";

export function ConsentBanner() {
  const consent = useSyncExternalStore(onConsentChange, getConsent, () => SERVER_SNAPSHOT);

  if (!hasTrackingProviders || consent !== null) return null;

  function choose(choice: ConsentChoice) {
    setConsent(choice);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferências de cookies"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-xl shadow-slate-900/15 sm:flex sm:items-center sm:gap-6"
    >
      <p className="text-sm leading-relaxed text-slate-600">
        Usamos cookies para medir o desempenho do site e dos nossos anúncios.
        Você pode aceitar ou recusar; o site funciona normalmente nos dois casos.{" "}
        <Link
          href="/politica-de-privacidade"
          className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
        >
          Política de privacidade
        </Link>
      </p>
      <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
        <button
          type="button"
          onClick={() => choose("denied")}
          className={buttonClassName("ghost", "px-4 py-2.5")}
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className={buttonClassName("primary", "px-5 py-2.5")}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
