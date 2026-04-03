"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { phases } from "@/lib/data/phases";
import {
  EntryEventIcon,
  InvestigationIcon,
  ProblemIcon,
  CreateIcon,
  ShareIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface PhaseNavProps {
  activePhase: number; // 1-5
  completedPhases: number[]; // e.g. [1, 2]
  onPhaseClick: (phase: number) => void;
  className?: string;
}

const phaseIcons = [
  EntryEventIcon,
  InvestigationIcon,
  ProblemIcon,
  CreateIcon,
  ShareIcon,
] as const;

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function PhaseNav({
  activePhase,
  completedPhases,
  onPhaseClick,
  className,
}: PhaseNavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(activePhase + 1, 5);
        onPhaseClick(next);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(activePhase - 1, 1);
        onPhaseClick(prev);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPhaseClick(activePhase);
      }
    },
    [activePhase, onPhaseClick]
  );

  return (
    <nav
      ref={navRef}
      className={cn("relative flex flex-col", className)}
      role="tablist"
      aria-label="Project phases"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
    >
      {phases.map((phase, index) => {
        const isActive = phase.number === activePhase;
        const isCompleted = completedPhases.includes(phase.number);
        const Icon = phaseIcons[index];
        const isLast = index === phases.length - 1;

        const circleSize = isActive ? 36 : 32;
        const iconSize = 16;

        return (
          <div key={phase.number} className="relative flex items-start">
            {/* Vertical connecting line */}
            {!isLast && (
              <div
                className="absolute left-[16px] top-[32px] w-0.5"
                style={{
                  height: "calc(100% - 32px)",
                  backgroundColor: isCompleted
                    ? phases[index + 1] && completedPhases.includes(phases[index + 1].number)
                      ? phase.color
                      : phase.color
                    : "#d4d4d4",
                }}
              />
            )}

            {/* Circle + Label row */}
            <button
              role="tab"
              aria-selected={isActive}
              aria-label={`Phase ${phase.number}: ${phase.name}${isCompleted ? " (completed)" : isActive ? " (active)" : ""}`}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                "group relative z-10 flex items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors",
                "hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              )}
              onClick={() => onPhaseClick(phase.number)}
            >
              {/* Circle */}
              {isActive ? (
                <motion.div
                  className="flex shrink-0 items-center justify-center rounded-full"
                  style={{
                    width: circleSize,
                    height: circleSize,
                    backgroundColor: phase.color,
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon size={iconSize} className="text-white" />
                </motion.div>
              ) : isCompleted ? (
                <div
                  className="flex shrink-0 items-center justify-center rounded-full"
                  style={{
                    width: circleSize,
                    height: circleSize,
                    backgroundColor: phase.color,
                  }}
                >
                  <CheckIcon size={iconSize} />
                </div>
              ) : (
                <div
                  className="flex shrink-0 items-center justify-center rounded-full border-2"
                  style={{
                    width: circleSize,
                    height: circleSize,
                    borderColor: phase.color,
                  }}
                >
                  <span style={{ color: phase.color }}>
                    <Icon size={iconSize} />
                  </span>
                </div>
              )}

              {/* Phase name */}
              <span
                className={cn(
                  "text-sm transition-colors",
                  isActive && "font-bold text-neutral-900",
                  isCompleted && !isActive && "font-normal text-neutral-700",
                  !isActive && !isCompleted && "font-normal text-neutral-500"
                )}
              >
                {phase.name}
              </span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}
