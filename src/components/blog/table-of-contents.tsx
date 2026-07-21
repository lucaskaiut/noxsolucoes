"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Heading } from "./extract-headings";

function useTableOfContents(headings: Heading[]) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<Map<string, IntersectionObserverEntry>>(
    new Map(),
  );

  const visibleHeadings = useMemo(
    () => headings.filter((h) => h.level === 2 || h.level === 3),
    [headings],
  );

  useEffect(() => {
    if (visibleHeadings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          headingElementsRef.current.set(entry.target.id, entry);
        }

        const visible = [...headingElementsRef.current.values()]
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    );

    for (const heading of visibleHeadings) {
      const el = document.getElementById(heading.id);
      if (el) {
        observerRef.current.observe(el);
      }
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [visibleHeadings]);

  return { activeId, visibleHeadings };
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

interface TableOfContentsDesktopProps {
  headings: Heading[];
}

export function TableOfContentsDesktop({
  headings,
}: TableOfContentsDesktopProps) {
  const { activeId, visibleHeadings } = useTableOfContents(headings);

  if (visibleHeadings.length === 0) return null;

  return (
    <nav aria-label="Nesta página" className="w-full">
      <div className="sticky top-28">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Nesta página
        </h4>
        <ul className="space-y-0.5 border-l border-slate-200">
          {visibleHeadings.map((heading) => (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full py-1 text-left text-sm leading-snug transition-colors hover:text-slate-900 ${
                  heading.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === heading.id
                    ? "-ml-px border-l-2 border-brand-500 font-medium text-brand-600"
                    : "text-slate-500"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

interface TableOfContentsMobileProps {
  headings: Heading[];
}

export function TableOfContentsMobile({
  headings,
}: TableOfContentsMobileProps) {
  const { activeId, visibleHeadings } = useTableOfContents(headings);
  const [isOpen, setIsOpen] = useState(false);

  if (visibleHeadings.length === 0) return null;

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        aria-expanded={isOpen}
      >
        <span>
          Nesta página
          {activeId && (
            <span className="ml-2 font-normal text-slate-400">
              —{" "}
              {visibleHeadings.find((h) => h.id === activeId)?.text?.slice(
                0,
                40,
              )}
              {(visibleHeadings.find((h) => h.id === activeId)?.text?.length ??
                0) > 40
                ? "…"
                : ""}
            </span>
          )}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="mt-2 space-y-0.5 rounded-lg border border-slate-200 bg-white p-2">
          {visibleHeadings.map((heading) => (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => {
                  scrollToHeading(heading.id);
                  setIsOpen(false);
                }}
                className={`block w-full rounded-md py-1.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                  heading.level === 3 ? "pl-8" : "pl-4"
                } ${
                  activeId === heading.id
                    ? "font-medium text-brand-600"
                    : "text-slate-500"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
