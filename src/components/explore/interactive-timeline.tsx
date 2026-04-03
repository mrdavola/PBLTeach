"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { phases } from "@/lib/data/phases";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const badgeVariantMap: Record<number, "entry" | "investigation" | "problem" | "create" | "share"> = {
  1: "entry",
  2: "investigation",
  3: "problem",
  4: "create",
  5: "share",
};

const gradeExamples: Record<number, { elementary: string[]; middle: string[]; high: string[] }> = {
  1: {
    elementary: [
      "A surprise visitor (firefighter, artist) comes to class",
      "Students discover a mysterious box with clues inside",
    ],
    middle: [
      "Watch a short documentary clip about a real-world issue",
      "A community member presents a problem they need help solving",
    ],
    high: [
      "Students analyze a provocative data set or current event",
      "A field trip to a local site sparks questions and debate",
    ],
  },
  2: {
    elementary: [
      "Read nonfiction books and watch videos about the topic",
      "Interview a community helper related to the project",
    ],
    middle: [
      "Conduct surveys or collect data from the school community",
      "Research multiple perspectives using credible online sources",
    ],
    high: [
      "Analyze primary source documents and academic articles",
      "Shadow a professional or conduct stakeholder interviews",
    ],
  },
  3: {
    elementary: [
      "Class brainstorms a shared 'Need to Know' chart together",
      "Teacher guides students to pick a question they care about",
    ],
    middle: [
      "Small groups draft and refine their own driving questions",
      "Students map what they know vs. what they need to learn",
    ],
    high: [
      "Teams define a specific, actionable problem statement",
      "Students scope constraints and success criteria for their challenge",
    ],
  },
  4: {
    elementary: [
      "Build models with craft supplies and recyclables",
      "Practice and revise a skit or presentation with peer feedback",
    ],
    middle: [
      "Create prototypes and test them, then iterate based on results",
      "Use digital tools to design infographics or websites",
    ],
    high: [
      "Develop a working prototype or detailed proposal with specs",
      "Conduct user testing and formal critique/revision cycles",
    ],
  },
  5: {
    elementary: [
      "Present to another class or parents at a showcase night",
      "Create a hallway display explaining what they learned",
    ],
    middle: [
      "Present findings to a panel of community members",
      "Publish work on a class blog or local news outlet",
    ],
    high: [
      "Pitch solutions to real stakeholders or a panel of experts",
      "Host a public exhibition or conference-style presentation",
    ],
  },
};

export function InteractiveTimeline() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next = activePhase;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = activePhase < 5 ? activePhase + 1 : 1;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = activePhase > 1 ? activePhase - 1 : 5;
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        return; // already selected
      } else {
        return;
      }
      setActivePhase(next);
    },
    [activePhase]
  );

  useEffect(() => {
    nodesRef.current[activePhase - 1]?.focus();
  }, [activePhase]);

  const phase = phases[activePhase - 1];
  const examples = gradeExamples[activePhase];

  return (
    <div>
      {/* Timeline */}
      <div
        role="tablist"
        aria-label="Project phases"
        className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-0"
        onKeyDown={handleKeyDown}
      >
        {/* Connecting line -- desktop */}
        <div className="absolute top-5 right-10 left-10 hidden h-0.5 bg-neutral-300 md:block" />
        {/* Connecting line -- mobile */}
        <div className="absolute top-0 bottom-0 left-5 block w-0.5 bg-neutral-300 md:hidden" />

        {phases.map((p, i) => {
          const isActive = activePhase === p.number;
          return (
            <button
              key={p.number}
              ref={(el) => { nodesRef.current[i] = el; }}
              role="tab"
              aria-selected={isActive}
              aria-controls="phase-detail-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActivePhase(p.number)}
              className="group relative z-10 flex items-center gap-3 md:flex-col md:gap-2"
            >
              <motion.div
                animate={{
                  width: isActive ? 48 : 40,
                  height: isActive ? 48 : 40,
                }}
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full text-sm font-bold text-white transition-shadow",
                  isActive && "shadow-lg"
                )}
                style={{ backgroundColor: p.color }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${p.color}` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span className="relative z-10">{p.number}</span>
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors md:text-center",
                  isActive ? "text-neutral-900" : "text-neutral-500"
                )}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div id="phase-detail-panel" role="tabpanel" aria-label={phase.name} className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border-2 p-6"
            style={{ borderColor: phase.color, backgroundColor: phase.colorLight }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Badge variant={badgeVariantMap[activePhase]}>Phase {phase.number}</Badge>
              <h3 className="font-display text-lg font-bold text-neutral-900">{phase.name}</h3>
            </div>

            <p className="text-sm leading-relaxed text-neutral-700">{phase.description}</p>

            {phase.designThinkingConnection !== "—" && (
              <p className="mt-2 text-xs text-neutral-500">
                <span className="font-semibold">Design Thinking connection:</span>{" "}
                {phase.designThinkingConnection}
              </p>
            )}

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  What teachers do
                </h4>
                <ul className="space-y-1.5">
                  {phase.whatTeachersDo.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="mt-1 block size-1.5 shrink-0 rounded-full" style={{ backgroundColor: phase.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  What students do
                </h4>
                <ul className="space-y-1.5">
                  {phase.whatStudentsDo.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="mt-1 block size-1.5 shrink-0 rounded-full" style={{ backgroundColor: phase.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Grade band examples */}
            <div className="mt-6">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Example activities by grade band
              </h4>
              <div className="grid gap-4 md:grid-cols-3">
                {(["elementary", "middle", "high"] as const).map((band) => (
                  <div key={band} className="rounded-lg bg-white/70 p-3">
                    <span className="mb-1.5 block text-xs font-semibold capitalize text-neutral-600">
                      {band === "elementary" ? "Elementary" : band === "middle" ? "Middle School" : "High School"}
                    </span>
                    <ul className="space-y-1">
                      {examples[band].map((ex, i) => (
                        <li key={i} className="text-xs leading-relaxed text-neutral-600">
                          &bull; {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
