import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-md shadow-slate-900/10 hover:bg-brand-700 focus-visible:outline-brand-600",
  secondary:
    "bg-white/70 text-slate-700 shadow-md shadow-slate-900/10 backdrop-blur hover:bg-white focus-visible:outline-slate-900",
  ghost:
    "text-slate-600 hover:text-slate-900 focus-visible:outline-slate-900",
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
