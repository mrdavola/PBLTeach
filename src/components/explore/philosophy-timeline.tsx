"use client";

import { ScrollReveal } from "@/components/ui/motion";
import { User, Sparkles, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Start Human",
    icon: User,
    color: "bg-brand-coral",
    lightBg: "bg-brand-coral-light",
    textColor: "text-brand-coral",
    border: "border-brand-coral/30",
    description:
      "Teacher chooses topic, framework, driving question structure.",
  },
  {
    title: "Use AI",
    icon: Sparkles,
    color: "bg-brand-teal",
    lightBg: "bg-brand-teal-light",
    textColor: "text-brand-teal",
    border: "border-brand-teal/30",
    description:
      "AI generates content within the framework -- Learning Narrative, calendar, rubrics.",
  },
  {
    title: "End Human",
    icon: UserCheck,
    color: "bg-brand-purple",
    lightBg: "bg-brand-purple-light",
    textColor: "text-brand-purple",
    border: "border-brand-purple/30",
    description:
      "Teacher reviews, edits, adapts to their students.",
  },
];

export function PhilosophyTimeline() {
  return (
    <div className="space-y-8">
      {/* Steps */}
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-start md:gap-0">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex flex-1 items-center md:flex-col">
              <ScrollReveal
                delay={i * 0.15}
                className="flex-1 md:w-full"
              >
                <div
                  className={cn(
                    "rounded-xl border-2 p-5",
                    step.border,
                    step.lightBg
                  )}
                >
                  <div
                    className={cn(
                      "mb-3 inline-flex size-10 items-center justify-center rounded-full text-white",
                      step.color
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3
                    className={cn(
                      "mb-2 font-display text-lg font-bold",
                      step.textColor
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <>
                  {/* Horizontal arrow (md+) */}
                  <div className="hidden flex-shrink-0 px-2 md:flex md:items-center md:self-center">
                    <svg
                      width="32"
                      height="20"
                      viewBox="0 0 32 20"
                      fill="none"
                      className="text-neutral-300"
                    >
                      <path
                        d="M0 10H28M28 10L20 3M28 10L20 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {/* Vertical arrow (mobile) */}
                  <div className="flex items-center justify-center py-1 md:hidden">
                    <svg
                      width="20"
                      height="32"
                      viewBox="0 0 20 32"
                      fill="none"
                      className="text-neutral-300"
                    >
                      <path
                        d="M10 0V28M10 28L3 20M10 28L17 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Callout */}
      <ScrollReveal delay={0.5}>
        <p className="text-center text-sm leading-relaxed text-neutral-600">
          This is exactly what PBLTeach does.{" "}
          <span className="font-semibold text-neutral-800">
            The frameworks are human-curated. AI fills in content. You make the
            final decisions.
          </span>
        </p>
      </ScrollReveal>
    </div>
  );
}
