import { logger } from "../logger";

const loaded = new Set<string>();

export function loadScript(src: string): void {
  if (typeof document === "undefined" || loaded.has(src)) return;
  loaded.add(src);
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = () => logger.warn(`Falha ao carregar script: ${src}`);
  document.head.appendChild(script);
}
