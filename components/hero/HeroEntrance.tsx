"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

import { heroColumnStagger, heroStaggerItem, heroStaggerParent } from "./hero-motion";

type HeroEntranceProps = {
  children: ReactNode;
};

/** Outer hero shell — keep layout-only; stagger lives on inner {@link HeroStaggerRoot}. */
export function HeroEntrance({ children }: HeroEntranceProps) {
  return <div className="relative z-[1] flex min-h-0 flex-1 flex-col">{children}</div>;
}

/** Grid / band wrapper: use as first motion child inside Container so stagger sees real siblings. */
export function HeroStaggerRoot({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      variants={heroStaggerParent}
      initial="hidden"
      animate="show"
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function HeroStaggerChild({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={heroStaggerItem} {...rest}>
      {children}
    </motion.div>
  );
}

export function HeroColumnStagger({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      variants={heroColumnStagger}
      initial="hidden"
      animate="show"
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function HeroLineItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={heroStaggerItem} {...rest}>
      {children}
    </motion.div>
  );
}
