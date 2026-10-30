"use client";

import { resetConsent } from "@/analytics/consent";
import { buttonClassName } from "@/components/ui/button-styles";

/** Reabre o banner de cookies para o visitante mudar a escolha feita antes. */
export function ConsentPreferencesButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className={buttonClassName("primary", "px-5 py-2.5")}
    >
      Alterar preferências de cookies
    </button>
  );
}
