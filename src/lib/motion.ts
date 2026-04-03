import type { Variants, Transition } from "framer-motion";

// =============================================================================
// PBLTeach Motion Vocabulary
// Three core patterns: Assemble, Reveal, Connect
// =============================================================================

// --- Shared easing curves ---
const easeOut = [0.0, 0.0, 0.2, 1.0] as const;
const easeInOut = [0.4, 0.0, 0.2, 1.0] as const;

// =============================================================================
// 1. Assemble — things build from component parts
// =============================================================================

export const assembleTransition: Transition = {
  duration: 0.4,
  ease: easeOut,
};

export const assembleVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: assembleTransition,
  },
};

// =============================================================================
// 2. Reveal — content unfolds progressively
// =============================================================================

export const revealTransition: Transition = {
  duration: 0.3,
  ease: easeOut,
};

export const revealVariants: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: revealTransition,
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: revealTransition,
  },
};

// =============================================================================
// 3. Connect — related elements draw visual relationships
// =============================================================================

export const connectTransition: Transition = {
  duration: 0.6,
  ease: easeInOut,
};

export const connectVariants: Variants = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: connectTransition,
  },
};

// =============================================================================
// Composable variants & helpers
// =============================================================================

/** Fade-up: opacity 0 + y 20 → opacity 1 + y 0 */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

/** Card hover: subtle lift with shadow */
export const cardHover = {
  whileHover: { y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" },
  transition: { duration: 0.2, ease: easeOut },
} as const;

/** Button press: slight scale-down on tap */
export const buttonPress = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1 },
} as const;

/** Scroll-reveal viewport trigger config */
export const scrollReveal = {
  initial: "initial" as const,
  whileInView: "animate" as const,
  viewport: { once: true, margin: "-100px" },
};

/**
 * Returns parent variants that stagger children by `delay` seconds.
 * Use with `initial="initial"` and `animate="animate"` on a motion container.
 */
export function staggerContainer(delay: number = 0.15): Variants {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: delay,
      },
    },
  };
}

/** Phase transition config — used when navigating between PBL phases */
export const phaseTransition: Transition = {
  duration: 0.5,
  ease: easeInOut,
};
