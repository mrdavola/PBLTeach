"use client";

import { designThinkingMindsets } from "@/lib/data/frameworks";
import { ScrollReveal } from "@/components/ui/motion";
import { FlipCard } from "@/components/explore/flip-card";
import { cn } from "@/lib/utils";

const explanations: Record<string, string> = {
  "Human-centered":
    "Design for people, not just problems. Start by understanding their needs.",
  "Mindful of process":
    "Trust the stages. Each one builds on the last.",
  "Culture of prototyping":
    "Build to think, think to build. The prototype is a thinking tool, not a final product.",
  "Bias toward action":
    "Don't just talk about ideas. Make something, test something, learn something.",
  "Show don't tell":
    "A sketch is worth a thousand words. Make your ideas visible.",
  "Radical collaboration":
    "The best ideas come from diverse teams working together.",
  "Fail forward":
    "Every failure teaches something. The goal is to fail fast and learn faster.",
  "Creative confidence":
    "Everyone is creative. It's a muscle -- kindergartners use it freely, older students need permission.",
  "Growth mindset":
    "Ability grows with effort. 'Not yet' is more powerful than 'I can't.'",
  "Beginner's mindset":
    "Approach every problem like you're seeing it for the first time.",
};

const featured = new Set([
  "Creative confidence",
  "Culture of prototyping",
  "Human-centered",
]);

export function MindsetCards() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {designThinkingMindsets.map((mindset, i) => {
        const isFeatured = featured.has(mindset);
        return (
          <ScrollReveal key={mindset} delay={i * 0.06}>
            <div
              className={cn(
                "rounded-xl",
                isFeatured && "ring-2 ring-brand-teal ring-offset-2"
              )}
            >
              <FlipCard
                front={mindset}
                back={explanations[mindset] ?? mindset}
                frontLabel="Mindset"
                backLabel="What it means"
              />
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
