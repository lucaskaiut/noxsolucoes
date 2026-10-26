import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  buttonClassName,
  type ButtonVariant,
} from "@/components/ui/button-styles";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <a href={href} className={buttonClassName(variant, className)} {...rest}>
      {children}
    </a>
  );
}
