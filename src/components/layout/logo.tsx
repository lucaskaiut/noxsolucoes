import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-8 w-auto", priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
      aria-label={`${site.name} — voltar ao início`}
    >
      <Image
        src="/images/logo-horizontal-fundo-claro.png"
        alt={site.name}
        width={231}
        height={40}
        className={className}
        priority={priority}
      />
    </Link>
  );
}
