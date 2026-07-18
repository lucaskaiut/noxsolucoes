"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroProducts } from "@/lib/data";

const ROTATION_INTERVAL = 5000;
const WARMUP_DELAY = 2500;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [warm, setWarm] = useState(false);
  const [visited, setVisited] = useState<ReadonlySet<number>>(new Set([0]));

  useEffect(() => {
    const id = setTimeout(() => setWarm(true), WARMUP_DELAY);
    return () => clearTimeout(id);
  }, []);

  if (!visited.has(active)) {
    setVisited(new Set(visited).add(active));
  }

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActive((index) => (index + 1) % heroProducts.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(id);
  }, [paused]);

  const product = heroProducts[active];
  const nextIndex = (active + 1) % heroProducts.length;

  function shouldRender(index: number): boolean {
    if (index === active || visited.has(index)) return true;
    return warm && index === nextIndex;
  }

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Produtos desenvolvidos pela Nox"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="tablist"
        aria-label="Escolher produto"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {heroProducts.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:text-sm ${
              index === active
                ? "bg-brand-600 text-white shadow-sm shadow-brand-600/30"
                : "bg-white/70 text-slate-600 backdrop-blur hover:text-slate-900"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white/60 p-2 shadow-xl shadow-slate-900/10 backdrop-blur">
        <div className="relative aspect-[1918/912] overflow-hidden rounded-xl">
          {heroProducts.map((item, index) =>
            shouldRender(index) ? (
              <Image
                key={item.name}
                src={item.image}
                alt={`Tela do ${item.name}`}
                fill
                preload={index === 0}
                fetchPriority={index === 0 ? "high" : undefined}
                className={`object-cover object-top transition-opacity duration-700 ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            ) : null,
          )}

          <div
            aria-live="polite"
            className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/85 via-slate-950/45 to-transparent p-5 pt-14 text-left sm:p-7 sm:pt-20"
          >
            <p className="text-sm font-bold text-white sm:text-lg">
              {product.name}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-brand-300 sm:text-sm">
              {product.tagline}
            </p>
            <p className="mt-1 hidden max-w-xl text-xs leading-relaxed text-white/80 sm:block sm:text-sm">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
