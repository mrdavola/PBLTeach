"use client";

import { motion } from "framer-motion";
import { phases } from "@/lib/data/phases";
import { cn } from "@/lib/utils";

interface PhaseTimelineProps {
  completedPhases: number[];
  activePhase: number;
}

export function PhaseTimeline({
  completedPhases,
  activePhase,
}: PhaseTimelineProps) {
  return (
    <div className="flex items-center gap-0" role="progressbar" aria-label="Phase generation progress">
      {phases.map((phase, index) => {
        const isCompleted = completedPhases.includes(phase.number);
        const isActive = phase.number === activePhase;
        const isLast = index === phases.length - 1;

        // Line between circles is filled if the current phase is completed
        const lineFilled = isCompleted;

        return (
          <div key={phase.number} className="flex items-center">
            {/* Circle */}
            {isActive ? (
              <motion.div
                className="relative flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: phase.color }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xs font-bold text-white">
                  {phase.number}
                </span>
              </motion.div>
            ) : isCompleted ? (
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ backgroundColor: phase.color }}
              >
                <svg
                  className="h-3.5 w-3.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            ) : (
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border-2"
                style={{ borderColor: phase.color }}
              >
                <span
                  className="text-xs font-medium"
                  style={{ color: phase.color }}
                >
                  {phase.number}
                </span>
              </div>
            )}

            {/* Connecting line */}
            {!isLast && (
              <div className="relative h-0.5 w-8 sm:w-12 bg-neutral-200">
                {lineFilled && (
                  <motion.div
                    className="absolute inset-0 h-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ backgroundColor: phase.color, transformOrigin: "left" }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
