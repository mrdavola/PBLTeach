"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Bubble {
  id: string;
  label: string;
  shortLabel?: string;
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke: string;
  description: string;
}

const bubbles: Bubble[] = [
  {
    id: "pbl",
    label: "PBL",
    cx: 300,
    cy: 250,
    r: 120,
    fill: "#E0F2F1",
    stroke: "#0D7377",
    description:
      "Project-Based Learning is the broadest framework: students learn by actively working on a meaningful project over an extended period, producing a public product.",
  },
  // Overlapping PBL
  {
    id: "design-thinking",
    label: "Design Thinking",
    shortLabel: "Design\nThinking",
    cx: 210,
    cy: 185,
    r: 52,
    fill: "#FFF0EC",
    stroke: "#E8634A",
    description:
      "A creative process (Empathize, Define, Ideate, Prototype, Test) that can live inside a PBL project. It is a process, not a standalone method.",
  },
  {
    id: "inquiry",
    label: "Inquiry-Based",
    shortLabel: "Inquiry",
    cx: 390,
    cy: 185,
    r: 50,
    fill: "#EEF2FF",
    stroke: "#4338CA",
    description:
      "Students learn by asking questions and investigating. PBL is actually a structured form of inquiry-based learning with a tangible product.",
  },
  {
    id: "problem",
    label: "Problem-Based",
    shortLabel: "Problem\nBased",
    cx: 300,
    cy: 340,
    r: 48,
    fill: "#F5F3FF",
    stroke: "#7C3AED",
    description:
      "Students tackle a specific, defined problem -- originating from medical schools. Narrower than PBL and does not always require a public product.",
  },
  // Adjacent -- touching but not inside
  {
    id: "challenge",
    label: "Challenge-Based",
    shortLabel: "Challenge\nBased",
    cx: 145,
    cy: 330,
    r: 44,
    fill: "#FEF3C7",
    stroke: "#D97706",
    description:
      "Students identify the challenge themselves and take action. Apple's initiative. Similar to PBL but student-driven from the start.",
  },
  {
    id: "service",
    label: "Service Learning",
    shortLabel: "Service\nLearning",
    cx: 460,
    cy: 330,
    r: 44,
    fill: "#DCFCE7",
    stroke: "#16A34A",
    description:
      "Learning through community service. The product is real-world community action. Can be combined with PBL when the project serves others.",
  },
  {
    id: "genius",
    label: "Genius Hour",
    shortLabel: "Genius\nHour",
    cx: 465,
    cy: 170,
    r: 40,
    fill: "#FDF2F8",
    stroke: "#DB2777",
    description:
      "Dedicated time for students to pursue personal interests and passions. Inspired by Google's 20% time. Less structured than PBL.",
  },
  // Outside
  {
    id: "stem",
    label: "STEM/STEAM",
    shortLabel: "STEM/\nSTEAM",
    cx: 130,
    cy: 145,
    r: 42,
    fill: "#F0F9FF",
    stroke: "#0284C7",
    description:
      "A content lens (Science, Technology, Engineering, Arts, Math), not a teaching method. PBL can be the method; STEM/STEAM describes the subjects.",
  },
];

export function UmbrellaDiagram() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = bubbles.find((b) => b.id === selectedId);

  return (
    <div className="space-y-4">
      {/* SVG diagram */}
      <div className="mx-auto w-full max-w-[600px]">
        <svg viewBox="0 0 600 440" className="w-full" role="img" aria-label="Relationship diagram showing how learning approaches relate to PBL">
          {/* PBL center circle - render first so others overlap */}
          {bubbles
            .filter((b) => b.id === "pbl")
            .map((b) => (
              <g
                key={b.id}
                onClick={() =>
                  setSelectedId((prev) => (prev === b.id ? null : b.id))
                }
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedId((prev) => (prev === b.id ? null : b.id));
                  }
                }}
              >
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r={b.r}
                  fill={b.fill}
                  stroke={b.stroke}
                  strokeWidth={selectedId === b.id ? 3 : 2}
                  strokeDasharray={b.id === "pbl" ? "none" : "none"}
                />
                <text
                  x={b.cx}
                  y={b.cy + 5}
                  textAnchor="middle"
                  className="pointer-events-none select-none fill-brand-teal-dark text-lg font-bold"
                  style={{ fontSize: "18px", fontWeight: 700 }}
                >
                  {b.label}
                </text>
              </g>
            ))}

          {/* Other bubbles */}
          {bubbles
            .filter((b) => b.id !== "pbl")
            .map((b) => (
              <g
                key={b.id}
                onClick={() =>
                  setSelectedId((prev) => (prev === b.id ? null : b.id))
                }
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedId((prev) => (prev === b.id ? null : b.id));
                  }
                }}
              >
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r={b.r}
                  fill={b.fill}
                  stroke={b.stroke}
                  strokeWidth={selectedId === b.id ? 3 : 1.5}
                  opacity={0.92}
                />
                {(b.shortLabel ?? b.label).split("\n").map((line, i, arr) => (
                  <text
                    key={i}
                    x={b.cx}
                    y={b.cy + (i - (arr.length - 1) / 2) * 13}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none select-none"
                    style={{
                      fontSize: b.r < 44 ? "10px" : "11px",
                      fontWeight: 600,
                      fill: b.stroke,
                    }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            ))}

          {/* STEM label annotation */}
          <text
            x={130}
            y={100}
            textAnchor="middle"
            className="pointer-events-none select-none"
            style={{ fontSize: "8px", fill: "#6B7280", fontStyle: "italic" }}
          >
            Content lens, not method
          </text>
        </svg>
      </div>

      {/* Tooltip card */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border-2 p-4"
            style={{
              borderColor: selected.stroke,
              backgroundColor: selected.fill,
            }}
          >
            <h4
              className="mb-1 text-sm font-bold"
              style={{ color: selected.stroke }}
            >
              {selected.label}
            </h4>
            <p className="text-sm leading-relaxed text-neutral-700">
              {selected.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-neutral-400">
        Click any circle to learn more
      </p>
    </div>
  );
}
