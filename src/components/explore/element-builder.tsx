"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

import { goldStandard } from "@/lib/data/frameworks";
import { GoldStandardGauge } from "@/components/build/gold-standard-gauge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const gradeBandExamples: Record<
  number,
  { elementary: string; middle: string; high: string }
> = {
  1: {
    elementary:
      "How can we make our school playground more fun for everyone?",
    middle: "How can we reduce food waste in our cafeteria?",
    high: "How can we propose solutions to our city's housing shortage?",
  },
  2: {
    elementary:
      "Week-long investigation using books, videos, and interviews",
    middle: "Multi-week research with primary and secondary sources",
    high: "Semester-long research with expert consultations and data analysis",
  },
  3: {
    elementary: "Students design a garden for the school courtyard",
    middle: "Students survey community members about local issues",
    high: "Students partner with a local nonprofit to address a real need",
  },
  4: {
    elementary: "Choose between poster, video, or model to present",
    middle:
      "Students choose their research focus within the project theme",
    high: "Students define their own problem statement and solution approach",
  },
  5: {
    elementary: "Daily circle time: 'What did we learn today?'",
    middle: "Weekly reflection journals with guided prompts",
    high: "Portfolio reflections connecting learning to future goals",
  },
  6: {
    elementary: "Gallery walk with sticky note feedback",
    middle: "Structured peer critique protocol with sentence starters",
    high: "Expert panel feedback with revision cycle",
  },
  7: {
    elementary: "Presentation at family night",
    middle: "Published podcast or website",
    high: "Presentation to city council or community organization",
  },
};

export function ElementBuilder() {
  const [enabledElements, setEnabledElements] = useState<number[]>([]);
  const [expandedElement, setExpandedElement] = useState<number | null>(null);

  function toggleElement(num: number) {
    setEnabledElements((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  }

  function toggleExpand(num: number) {
    setExpandedElement((prev) => (prev === num ? null : num));
  }

  const showCallout = enabledElements.length >= 2 && enabledElements.length < 7;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Gauge */}
      <GoldStandardGauge
        elementsIncluded={enabledElements}
        size={160}
        onElementClick={toggleElement}
      />

      {/* 2/7 callout */}
      <AnimatePresence>
        {showCallout && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
            className="w-full"
          >
            <Card className="border-brand-teal bg-brand-teal-light/50">
              <CardContent>
                <p className="text-center text-sm font-medium text-brand-teal-dark">
                  This is all you need to start &mdash; a driving question and a
                  public product.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Element grid */}
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {goldStandard.map((el) => {
          const isOn = enabledElements.includes(el.number);
          const isExpanded = expandedElement === el.number;
          const examples = gradeBandExamples[el.number];

          return (
            <div key={el.number} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggleElement(el.number)}
                className={cn(
                  "relative flex flex-col gap-1 rounded-xl border p-4 text-left transition-all duration-200",
                  isOn
                    ? "border-brand-teal bg-brand-teal-light text-brand-teal-dark"
                    : "border-neutral-300 bg-white text-neutral-500 hover:border-neutral-400"
                )}
              >
                {/* Check icon */}
                <AnimatePresence>
                  {isOn && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-2 top-2"
                    >
                      <Check className="size-4 text-brand-teal" />
                    </motion.span>
                  )}
                </AnimatePresence>

                <span className="text-xs font-medium opacity-60">
                  Element {el.number}
                </span>
                <span
                  className={cn(
                    "font-display text-sm font-bold leading-snug",
                    isOn ? "text-brand-teal-dark" : "text-neutral-700"
                  )}
                >
                  {el.name}
                </span>
                <span className="mt-1 text-xs leading-relaxed">
                  {el.description}
                </span>
              </button>

              {/* Expand toggle */}
              {isOn && (
                <button
                  type="button"
                  onClick={() => toggleExpand(el.number)}
                  className="mt-1 flex items-center gap-1 self-start px-1 text-xs font-medium text-brand-teal transition-colors hover:text-brand-teal-dark"
                >
                  <ChevronDown
                    className={cn(
                      "size-3 transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                  In practice
                </button>
              )}

              {/* Expandable examples */}
              <Reveal isOpen={isOn && isExpanded}>
                <div className="mt-2 space-y-2 rounded-lg border border-brand-teal/20 bg-brand-teal-light/30 p-3">
                  <p className="text-xs font-semibold text-brand-teal-dark">
                    What this looks like in practice
                  </p>
                  {(
                    [
                      ["Elementary", examples.elementary],
                      ["Middle School", examples.middle],
                      ["High School", examples.high],
                    ] as const
                  ).map(([label, text]) => (
                    <div key={label}>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-brand-teal">
                        {label}
                      </span>
                      <p className="text-xs leading-relaxed text-brand-teal-dark/80">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
