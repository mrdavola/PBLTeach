"use client";

import { forwardRef, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type HTMLMotionProps,
} from "framer-motion";
import {
  assembleVariants,
  fadeUp,
  revealTransition,
  staggerContainer,
} from "@/lib/motion";

// =============================================================================
// MotionProvider — wrap the app (or a subtree) to respect reduced-motion
// =============================================================================

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}

// =============================================================================
// AssembleGroup — container that staggers its children
// =============================================================================

interface AssembleGroupProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export function AssembleGroup({
  children,
  stagger = 0.15,
  className,
  ...rest
}: AssembleGroupProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger)}
      initial="initial"
      animate="animate"
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// AssembleItem — child of AssembleGroup, animates with assemble variants
// =============================================================================

interface AssembleItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export const AssembleItem = forwardRef<HTMLDivElement, AssembleItemProps>(
  function AssembleItem({ children, className, ...rest }, ref) {
    return (
      <motion.div
        ref={ref}
        variants={assembleVariants}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

// =============================================================================
// ScrollReveal — viewport-triggered fade-up
// =============================================================================

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  ...rest
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      transition={delay > 0 ? { delay } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Reveal — show/hide wrapper for accordions, expandable sections
// =============================================================================

interface RevealProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}

export function Reveal({ children, isOpen, className }: RevealProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            transition: revealTransition,
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: revealTransition,
          }}
          style={{ overflow: "hidden" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// FadeIn — simple fade in on mount
// =============================================================================

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: [0.0, 0.0, 0.2, 1.0] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
