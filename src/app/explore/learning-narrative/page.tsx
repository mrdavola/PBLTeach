"use client";

import { ScrollReveal } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLayout } from "@/components/explore/module-layout";
import { InteractiveTimeline } from "@/components/explore/interactive-timeline";
import { DragDropMapper } from "@/components/explore/drag-drop-mapper";

const goldStandardMap = [
  { phase: 1, phaseName: "Entry Event", color: "#E8634A", elements: ["Challenging Problem"] },
  { phase: 2, phaseName: "Investigation", color: "#4338CA", elements: ["Sustained Inquiry"] },
  { phase: 3, phaseName: "Problem / Design Challenge", color: "#0D7377", elements: ["Challenging Problem", "Student Voice"] },
  { phase: 4, phaseName: "Create", color: "#D97706", elements: ["Critique & Revision", "Student Voice"] },
  { phase: 5, phaseName: "Share", color: "#7C3AED", elements: ["Public Product", "Reflection"] },
];

export default function LearningNarrativePage() {
  return (
    <ModuleLayout
      slug="learning-narrative"
      title="The Learning Narrative"
      duration="7-10 min"
      learningGoal="Understand the 5-phase structure and map an existing unit to it"
      progressColor="bg-brand-indigo"
    >
      {/* Section 1: Hook */}
      <section>
        <ScrollReveal>
          <p className="text-center font-display text-2xl font-bold text-neutral-900">
            Every great story has a structure.
            <br />
            So does every great project.
          </p>
        </ScrollReveal>
      </section>

      {/* Section 2: Interactive Timeline */}
      <section>
        <ScrollReveal>
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-neutral-900">
            The 5 Phases
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm text-neutral-500">
            Click each phase to explore what happens at every stage of a PBL unit.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <InteractiveTimeline />
        </ScrollReveal>
      </section>

      {/* Section 3: Drag-and-Drop Exercise */}
      <section>
        <ScrollReveal>
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-neutral-900">
            Test your understanding
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm text-neutral-500">
            Drag each activity into the correct phase of the Learning Narrative.
            On mobile, tap an activity then tap a phase to place it.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <DragDropMapper />
        </ScrollReveal>
      </section>

      {/* Section 4: Gold Standard Connection */}
      <section>
        <ScrollReveal>
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-neutral-900">
            Gold Standard Connection
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm text-neutral-500">
            Each phase naturally addresses key Gold Standard PBL elements.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <Card>
            <CardContent>
              <div className="divide-y divide-neutral-200">
                {goldStandardMap.map((row) => (
                  <div
                    key={row.phase}
                    className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <div className="flex items-center gap-2 sm:w-56 sm:shrink-0">
                      <span
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: row.color }}
                      >
                        {row.phase}
                      </span>
                      <span className="text-sm font-semibold text-neutral-800">
                        {row.phaseName}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {row.elements.map((el) => (
                        <span
                          key={el}
                          className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                          style={{ borderColor: row.color, color: row.color }}
                        >
                          {el}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>
    </ModuleLayout>
  );
}
