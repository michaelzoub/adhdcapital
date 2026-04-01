/** Shared variants for hero stagger (motion/react). */

export const heroStaggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
} as const;

export const heroStaggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
} as const;

export const heroColumnStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
} as const;
