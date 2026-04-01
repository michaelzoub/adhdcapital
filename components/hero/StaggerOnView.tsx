"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type StaggerOnViewProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function StaggerOnView({ children, className = "", id }: StaggerOnViewProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={item} {...rest}>
      {children}
    </motion.div>
  );
}
