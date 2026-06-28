import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PanelProps = {
  as?: "article" | "aside" | "div" | "section";
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

export function Panel({
  as = "div",
  children,
  className = "",
  compact = false,
}: PanelProps) {
  const Component = as;

  return (
    <Component
      className={`glass-panel rounded-[1.75rem] ${compact ? "p-4 md:p-5" : "p-5 md:p-6"} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function PageSection({
  children,
  className = "",
  containerClassName = "",
}: PageSectionProps) {
  return (
    <section className={`page-section ${className}`.trim()}>
      <div className={`container-shell ${containerClassName}`.trim()}>{children}</div>
    </section>
  );
}

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

export function ActionLink({
  href,
  children,
  className = "",
  variant = "secondary",
  ...props
}: ActionLinkProps) {
  const variantClass =
    variant === "primary"
      ? "luxury-button luxury-button-primary"
      : "luxury-button luxury-button-secondary";
  const external = href.startsWith("http");

  return (
    <Link
      href={href}
      className={`${variantClass} ${className}`.trim()}
      target={external ? "_blank" : props.target}
      rel={external ? "noreferrer" : props.rel}
      {...props}
    >
      {children}
    </Link>
  );
}
