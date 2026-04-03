"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface ProgressBarProps {
  color: string; // Tailwind bg class, e.g. "bg-brand-coral"
}

export function ProgressBar({ color }: ProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-60 h-[2px] ${color}`}
      style={{ scaleX, transformOrigin: "left" }}
    />
  );
}
