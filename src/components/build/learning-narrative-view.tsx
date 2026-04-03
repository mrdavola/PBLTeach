"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { PhaseCard } from "@/components/build/phase-card";
import { PhaseTimeline } from "@/components/build/phase-timeline";
import { PhaseNav } from "@/components/build/phase-nav";
import { GoldStandardGauge } from "@/components/build/gold-standard-gauge";
import { Reveal } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types/project";

interface PhaseContent {
  activities?: string[];
  resources?: string[];
  suggestions?: string[];
}

interface LearningNarrativeViewProps {
  project: Partial<Project>;
  isStreaming: boolean;
  streamText: string;
  phaseContents?: Record<number, PhaseContent>;
  onRegeneratePhase?: (phase: number) => void;
  projectId?: string;
}

export function LearningNarrativeView({
  project,
  isStreaming,
  phaseContents,
  onRegeneratePhase,
  projectId,
}: LearningNarrativeViewProps) {
  const [expandedPhase, setExpandedPhase] = useState<number>(1);
  const [titleOverride, setTitleOverride] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showCrossCurricular, setShowCrossCurricular] = useState(false);

  // Determine which phases are complete based on available content
  const completedPhases = useMemo(() => {
    if (!phaseContents) return [];
    return Object.keys(phaseContents).map(Number).filter((n) => n >= 1 && n <= 5);
  }, [phaseContents]);

  // Active phase = first incomplete, or last if all done
  const activeGeneratingPhase = useMemo(() => {
    if (!isStreaming) return expandedPhase;
    for (let i = 1; i <= 5; i++) {
      if (!completedPhases.includes(i)) return i;
    }
    return 5;
  }, [isStreaming, completedPhases, expandedPhase]);

  const goldStandardElements = project.goldStandard?.elementsIncluded ?? [];
  const editableTitle = titleOverride ?? project.title ?? "";

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 space-y-6 lg:block">
        <PhaseNav
          activePhase={expandedPhase}
          completedPhases={completedPhases}
          onPhaseClick={(phase) => setExpandedPhase(phase)}
        />
        <GoldStandardGauge
          elementsIncluded={goldStandardElements}
          size={160}
        />
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* Phase timeline */}
        <PhaseTimeline
          completedPhases={completedPhases}
          activePhase={activeGeneratingPhase}
        />

        {/* Title + DQ */}
        <div className="space-y-2">
          <input
            type="text"
            value={editableTitle}
            onChange={(e) => setTitleOverride(e.target.value)}
            placeholder="Project Title"
            className="w-full border-none bg-transparent font-display text-2xl font-bold text-neutral-900 outline-none placeholder:text-neutral-400 focus:outline-none"
          />
          {project.drivingQuestion?.selected && (
            <p className="text-lg font-medium text-brand-teal">
              &ldquo;{project.drivingQuestion.selected}&rdquo;
            </p>
          )}
        </div>

        {/* Phase Cards */}
        <div className="space-y-3">
          {([1, 2, 3, 4, 5] as const).map((phaseNum) => (
            <PhaseCard
              key={phaseNum}
              phaseNumber={phaseNum}
              content={phaseContents?.[phaseNum] ?? null}
              expanded={expandedPhase === phaseNum}
              onToggle={() =>
                setExpandedPhase((prev) => (prev === phaseNum ? 0 : phaseNum))
              }
              onRegenerate={
                onRegeneratePhase
                  ? () => onRegeneratePhase(phaseNum)
                  : undefined
              }
              isGenerating={
                isStreaming && activeGeneratingPhase === phaseNum
              }
            />
          ))}
        </div>

        {/* Assessment section */}
        <div className="overflow-hidden rounded-xl border border-neutral-300 bg-white">
          <button
            type="button"
            className="flex w-full items-center gap-3 p-4 text-left"
            onClick={() => setShowAssessment((prev) => !prev)}
            aria-expanded={showAssessment}
          >
            <span className="font-display text-base font-bold text-neutral-800">
              Assessment
            </span>
            <svg
              className={cn(
                "ml-auto h-5 w-5 text-neutral-400 transition-transform",
                showAssessment && "rotate-180"
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <Reveal isOpen={showAssessment}>
            <div className="space-y-2 px-4 pb-4">
              {project.assessment ? (
                <>
                  {project.assessment.formative.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
                        Formative
                      </h4>
                      <ul className="space-y-1">
                        {project.assessment.formative.map((item, i) => (
                          <li key={i} className="text-sm text-neutral-700">
                            {item.title} &mdash; {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.assessment.summative.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
                        Summative
                      </h4>
                      <ul className="space-y-1">
                        {project.assessment.summative.map((item, i) => (
                          <li key={i} className="text-sm text-neutral-700">
                            {item.title} &mdash; {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-neutral-500">
                  Assessment details will appear once the plan is generated.
                </p>
              )}
            </div>
          </Reveal>
        </div>

        {/* Cross-curricular connections */}
        <div className="overflow-hidden rounded-xl border border-neutral-300 bg-white">
          <button
            type="button"
            className="flex w-full items-center gap-3 p-4 text-left"
            onClick={() => setShowCrossCurricular((prev) => !prev)}
            aria-expanded={showCrossCurricular}
          >
            <span className="font-display text-base font-bold text-neutral-800">
              Cross-Curricular Connections
            </span>
            <svg
              className={cn(
                "ml-auto h-5 w-5 text-neutral-400 transition-transform",
                showCrossCurricular && "rotate-180"
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <Reveal isOpen={showCrossCurricular}>
            <div className="space-y-2 px-4 pb-4">
              {project.crossCurricular &&
              project.crossCurricular.connections.length > 0 ? (
                <ul className="space-y-2">
                  {project.crossCurricular.connections.map((conn, i) => (
                    <li key={i} className="text-sm text-neutral-700">
                      <span className="font-medium">{conn.subject}:</span>{" "}
                      {conn.connectionDescription}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500">
                  Cross-curricular connections will appear once the plan is
                  generated.
                </p>
              )}
            </div>
          </Reveal>
        </div>

        {/* Generate Materials CTA */}
        <section className="mt-12 pt-8 border-t border-neutral-300">
          <Card className="border-brand-teal/20 bg-brand-teal-light/30">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
              <div>
                <h3 className="font-display font-bold text-lg text-neutral-900">Ready for classroom materials?</h3>
                <p className="text-sm text-neutral-600 mt-1">Generate day-by-day calendars, rubrics, handouts, and more.</p>
              </div>
              <Link
                href={projectId ? `/build/${projectId}/guide` : "/build/project/guide"}
                className={buttonVariants({ variant: "default" })}
              >
                <FileDown className="size-4 mr-2" />
                Generate Materials
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
