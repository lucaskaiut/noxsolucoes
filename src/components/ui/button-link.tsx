import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500 focus-visible:outline-brand-400",
  secondary:
    "bg-zinc-800 text-zinc-100 shadow-lg shadow-black/30 hover:bg-zinc-700 focus-visible:outline-white",
  ghost:
    "text-zinc-300 hover:text-white focus-visible:outline-white",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
