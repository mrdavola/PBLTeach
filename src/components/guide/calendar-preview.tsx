"use client";

import { ScrollReveal } from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const phaseColors: Record<number, { border: string; bg: string; label: string; variant: "entry" | "investigation" | "problem" | "create" | "share" }> = {
  1: { border: "border-l-phase-entry", bg: "bg-phase-entry-light", label: "Entry Event", variant: "entry" },
  2: { border: "border-l-phase-investigation", bg: "bg-phase-investigation-light", label: "Investigation", variant: "investigation" },
  3: { border: "border-l-phase-problem", bg: "bg-phase-problem-light", label: "Problem / Challenge", variant: "problem" },
  4: { border: "border-l-phase-create", bg: "bg-phase-create-light", label: "Create", variant: "create" },
  5: { border: "border-l-phase-share", bg: "bg-phase-share-light", label: "Share", variant: "share" },
};

interface CalendarDay {
  day: number;
  phase: number;
  title: string;
  openingPrompt?: string;
  activities?: string[];
  teacherMoves?: string[];
  materials?: string[];
  timeBreakdown?: string;
}

interface CalendarPreviewProps {
  data: CalendarDay[];
}

export function CalendarPreview({ data }: CalendarPreviewProps) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-center text-neutral-500 py-12">
        No calendar data available.
      </p>
    );
  }

  // Group days by week (5 days per week)
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < data.length; i += 5) {
    weeks.push(data.slice(i, i + 5));
  }

  return (
    <div className="space-y-8">
      {weeks.map((week, weekIdx) => (
        <section key={weekIdx}>
          <h2 className="font-display font-bold text-lg text-neutral-900 mb-4">
            Week {weekIdx + 1}
          </h2>
          <div className="space-y-3">
            {week.map((day) => {
              const phase = phaseColors[day.phase] ?? phaseColors[1];
              return (
                <ScrollReveal key={day.day}>
                  <div
                    className={cn(
                      "rounded-lg border border-neutral-300 bg-white p-4 border-l-4",
                      phase.border
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-base text-neutral-900">
                        Day {day.day}: {day.title}
                      </h3>
                      <Badge variant={phase.variant}>{phase.label}</Badge>
                    </div>

                    {day.openingPrompt && (
                      <div className="rounded-md bg-brand-teal-light p-3 mb-3">
                        <p className="text-sm text-neutral-700 italic">
                          <span className="font-medium not-italic">
                            What to say:{" "}
                          </span>
                          &ldquo;{day.openingPrompt}&rdquo;
                        </p>
                      </div>
                    )}

                    {day.activities && day.activities.length > 0 && (
                      <div className="mb-2">
                        <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1">
                          Activities
                        </h4>
                        <ul className="list-disc list-inside space-y-0.5">
                          {day.activities.map((activity, i) => (
                            <li key={i} className="text-sm text-neutral-700">
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {day.teacherMoves && day.teacherMoves.length > 0 && (
                      <div className="mb-2">
                        <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1">
                          Teacher Moves
                        </h4>
                        <ul className="list-disc list-inside space-y-0.5">
                          {day.teacherMoves.map((move, i) => (
                            <li
                              key={i}
                              className="text-sm text-neutral-500 italic"
                            >
                              {move}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {day.materials && day.materials.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {day.materials.map((mat, i) => (
                            <Badge key={i} variant="secondary">
                              {mat}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {day.timeBreakdown && (
                        <span className="text-xs text-neutral-400 shrink-0">
                          {day.timeBreakdown}
                        </span>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
