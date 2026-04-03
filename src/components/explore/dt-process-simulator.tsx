"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stage {
  name: string;
  color: string;
  colorLight: string;
  description: string;
  activities: string[];
  classroomExample: string;
  mindset: string;
}

const stages: Stage[] = [
  {
    name: "Empathize",
    color: "#4338CA",
    colorLight: "#EEF2FF",
    description:
      "Understand the people you're designing for. Step into their shoes and see the world through their eyes.",
    activities: [
      "Interview stakeholders and users",
      "Observe people in context",
      "Build empathy maps",
    ],
    classroomExample:
      "Students interview community members about their experience at the local park to understand what improvements matter most.",
    mindset: "Human-centered",
  },
  {
    name: "Define",
    color: "#0D7377",
    colorLight: "#E0F2F1",
    description:
      "Synthesize your research into a clear problem statement. What's the real need?",
    activities: [
      "Analyze interview data for patterns",
      "Write a Point of View statement",
      "Create a 'How Might We' question",
    ],
    classroomExample:
      "Students craft a driving question: 'How might we redesign the park entrance so families with strollers feel welcome?'",
    mindset: "Mindful of process",
  },
  {
    name: "Ideate",
    color: "#D97706",
    colorLight: "#FFFBEB",
    description:
      "Generate as many ideas as possible. Quantity over quality — wild ideas welcome.",
    activities: [
      "Brainstorm without judgment",
      "Sketch rapid concepts",
      "Vote on promising directions",
    ],
    classroomExample:
      "Students use 'Crazy 8s' — folding paper into 8 sections and sketching 8 different park entrance ideas in 8 minutes.",
    mindset: "Creative confidence",
  },
  {
    name: "Prototype",
    color: "#E8634A",
    colorLight: "#FFF0EC",
    description:
      "Build quick, low-fidelity versions of your ideas. The goal is to think with your hands.",
    activities: [
      "Build cardboard or paper models",
      "Create storyboards or role-plays",
      "Make the minimum viable version",
    ],
    classroomExample:
      "Students build a cardboard scale model of their park entrance redesign using recycled materials.",
    mindset: "Culture of prototyping",
  },
  {
    name: "Test",
    color: "#7C3AED",
    colorLight: "#F5F3FF",
    description:
      "Put your prototype in front of real users. Watch, listen, and learn — then iterate.",
    activities: [
      "Present prototypes to users for feedback",
      "Observe what works and what doesn't",
      "Refine based on real reactions",
    ],
    classroomExample:
      "Students present their model to community members and gather feedback using a structured critique protocol.",
    mindset: "Fail forward",
  },
];

const phaseMapping = [
  {
    dt: "Empathize",
    ln: "Phase 2: Investigation",
    dtColor: "#4338CA",
    lnColor: "#4338CA",
  },
  {
    dt: "Define",
    ln: "Phase 3: Problem",
    dtColor: "#0D7377",
    lnColor: "#0D7377",
  },
  {
    dt: "Ideate + Prototype + Test",
    ln: "Phase 4: Create",
    dtColor: "#D97706",
    lnColor: "#D97706",
  },
];

export function DtProcessSimulator() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Horizontal flow -- stacks vertically on mobile */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0">
        {stages.map((stage, i) => (
          <div
            key={stage.name}
            className="flex flex-col items-center gap-3 sm:flex-row sm:gap-0"
          >
            {/* Node */}
            <button
              onClick={() =>
                setActiveIndex(activeIndex === i ? null : i)
              }
              className={cn(
                "relative flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 sm:size-[4.5rem]",
                activeIndex === i
                  ? "scale-110 shadow-lg"
                  : "hover:scale-105"
              )}
              style={{
                borderColor: stage.color,
                backgroundColor:
                  activeIndex === i ? stage.color : stage.colorLight,
                color: activeIndex === i ? "#fff" : stage.color,
              }}
              aria-expanded={activeIndex === i}
              aria-label={`${stage.name} stage. Click for details.`}
            >
              {stage.name}
            </button>

            {/* Arrow between nodes */}
            {i < stages.length - 1 && (
              <div className="flex items-center justify-center text-neutral-400">
                {/* vertical arrow on mobile */}
                <svg
                  className="block size-6 sm:hidden"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                {/* horizontal arrow on desktop */}
                <svg
                  className="hidden h-6 w-8 sm:block"
                  viewBox="0 0 32 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M4 12h24M22 6l6 6-6 6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border-2 p-6"
            style={{
              borderColor: stages[activeIndex].color,
              backgroundColor: stages[activeIndex].colorLight,
            }}
          >
            <h3
              className="font-display text-xl font-bold"
              style={{ color: stages[activeIndex].color }}
            >
              {stages[activeIndex].name}
            </h3>
            <p className="mt-2 text-sm text-neutral-700">
              {stages[activeIndex].description}
            </p>

            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Key Activities
              </span>
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-neutral-700">
                {stages[activeIndex].activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Classroom Example
              </span>
              <p className="mt-1 text-sm italic text-neutral-600">
                {stages[activeIndex].classroomExample}
              </p>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                borderColor: stages[activeIndex].color,
                color: stages[activeIndex].color,
              }}
            >
              <span className="text-neutral-500">DT Mindset:</span>
              {stages[activeIndex].mindset}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DT → Learning Narrative mapping */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
        <h4 className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Design Thinking → Learning Narrative
        </h4>
        <div className="grid gap-3 sm:grid-cols-3">
          {phaseMapping.map((m) => (
            <div key={m.dt} className="flex flex-col items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold text-white"
                style={{ backgroundColor: m.dtColor }}
              >
                {m.dt}
              </span>
              <svg
                className="size-4 text-neutral-400"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M8 2v12M4 10l4 4 4-4" />
              </svg>
              <span
                className="rounded-full border-2 px-3 py-1 text-xs font-bold"
                style={{ borderColor: m.lnColor, color: m.lnColor }}
              >
                {m.ln}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
