"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const scaleData = [
  {
    name: "Single-day",
    duration: "1 class period",
    examples:
      "Replace a test with 'teach this concept', Need to Know activity, 15-min expert Zoom",
    complexity: "Low — minimal planning, try it tomorrow",
    goldStandardHits: "1-2 elements",
    color: "brand-teal",
  },
  {
    name: "Micro",
    duration: "3-5 days",
    examples:
      "Infographic project, letter to a decision-maker, Shark Tank pitch, how-to guide",
    complexity: "Moderate — some planning needed, manageable scope",
    goldStandardHits: "3-4 elements",
    color: "brand-indigo",
  },
  {
    name: "Mini",
    duration: "1-2 weeks",
    examples:
      "Solution to a school problem, short documentary, community survey project",
    complexity: "Medium — structured plan with clear milestones",
    goldStandardHits: "4-5 elements",
    color: "brand-amber",
  },
  {
    name: "Full",
    duration: "3+ weeks",
    examples:
      "Complete Learning Narrative with all 5 phases, real-world client project",
    complexity:
      "High — full PBL unit with authentic audience and public product",
    goldStandardHits: "5-7 elements",
    color: "brand-purple",
  },
];

const colorMap: Record<string, { dot: string; bg: string; text: string }> = {
  "brand-teal": {
    dot: "bg-brand-teal",
    bg: "bg-brand-teal-light",
    text: "text-brand-teal",
  },
  "brand-indigo": {
    dot: "bg-brand-indigo",
    bg: "bg-brand-indigo-light",
    text: "text-brand-indigo",
  },
  "brand-amber": {
    dot: "bg-brand-amber",
    bg: "bg-brand-amber-light",
    text: "text-brand-amber",
  },
  "brand-purple": {
    dot: "bg-brand-purple",
    bg: "bg-brand-purple-light",
    text: "text-brand-purple",
  },
};

export function ScaleSlider() {
  const [active, setActive] = useState(0);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActive((prev) => Math.min(prev + 1, scaleData.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActive((prev) => Math.max(prev - 1, 0));
      }
    },
    []
  );

  const current = scaleData[active];
  const colors = colorMap[current.color];

  return (
    <div className="space-y-8">
      {/* Track */}
      <div
        role="slider"
        aria-label="PBL scale selector"
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={active}
        aria-valuetext={`${current.name}: ${current.duration}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative mx-auto max-w-[560px] outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/30 rounded-lg px-2 py-4"
      >
        {/* Track line with gradient */}
        <div className="relative h-1.5 rounded-full bg-gradient-to-r from-brand-teal/20 via-brand-indigo/30 via-brand-amber/40 to-brand-purple/50">
          {/* Animated thumb */}
          <motion.div
            className="absolute top-1/2 z-10 size-5 -translate-y-1/2 rounded-full shadow-md border-2 border-white cursor-pointer"
            style={{ left: `${(active / 3) * 100}%`, x: "-50%" }}
            animate={{
              left: `${(active / 3) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={cn("size-full rounded-full", colors.dot)} />
          </motion.div>
        </div>

        {/* Position dots and labels */}
        <div className="relative mt-3 flex justify-between">
          {scaleData.map((item, i) => {
            const itemColors = colorMap[item.color];
            const isActive = i === active;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className="flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer group"
              >
                <motion.div
                  className={cn(
                    "rounded-full transition-colors",
                    isActive ? itemColors.dot : "bg-neutral-300"
                  )}
                  animate={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? itemColors.text : "text-neutral-500 group-hover:text-neutral-700"
                  )}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className={cn("rounded-xl border border-neutral-200 p-6 transition-colors duration-300", colors.bg)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl font-bold text-neutral-900">
                {current.name}
              </h3>
              <Badge variant="secondary">{current.duration}</Badge>
            </div>

            <div className="space-y-3 text-sm text-neutral-700">
              <div>
                <span className="font-medium text-neutral-900">Examples: </span>
                {current.examples}
              </div>
              <div>
                <span className="font-medium text-neutral-900">Complexity: </span>
                {current.complexity}
              </div>
              <div>
                <span className="font-medium text-neutral-900">
                  Gold Standard elements:{" "}
                </span>
                {current.goldStandardHits}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
