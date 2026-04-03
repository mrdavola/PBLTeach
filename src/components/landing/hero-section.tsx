"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-display font-bold text-3xl md:text-5xl text-neutral-900 max-w-3xl text-center">
        Every great project starts with a question.
      </h1>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="mt-12 text-neutral-400"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
