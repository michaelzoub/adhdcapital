import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "discover";
};

type ButtonProps = Common &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
  );

const base =
  "inline-flex items-center justify-center gap-2 rounded-none px-5 py-3 text-xs font-medium tracking-wide transition-[opacity,background-color,border-color,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--gradient-button)] text-zinc-900 active:opacity-95",
  secondary:
    "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400",
  ghost:
    "text-zinc-600 hover:text-zinc-900 border border-transparent hover:border-zinc-200 hover:bg-zinc-50",
  discover:
    "text-[var(--color-accent-purple)] hover:text-[color-mix(in_srgb,zinc-900_35%,var(--color-accent-purple))] gap-2 !px-2 !py-2 border-0 bg-transparent",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  href,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
