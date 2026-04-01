import type { ElementType, ReactNode } from "react";

export function GradientText({
  children,
  as: Component = "span",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return <Component className={`gradient-text ${className}`}>{children}</Component>;
}
