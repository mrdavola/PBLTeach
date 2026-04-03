"use client";

import { ScrollReveal } from "@/components/ui/motion";

const statements = [
  "7 essential elements. Start with just 2.",
  "Micro-projects take 3 days, not 3 months.",
  "Your first one will be messy. That's the point.",
];

export function ImpactStatements() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        {statements.map((statement, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <p className="font-display font-medium text-2xl md:text-3xl text-neutral-900 text-center">
              {statement}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
