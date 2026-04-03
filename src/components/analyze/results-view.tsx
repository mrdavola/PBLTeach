"use client";

import { CurriculumTimeline } from "./curriculum-timeline";
import { OpportunityCard } from "./opportunity-card";

interface Opportunity {
  subjects: string[];
  unitConnections?: Array<{
    subject: string;
    unitTitle?: string;
    topics: string[];
  }>;
  unitTitles?: string[];
  weekRange: [number, number];
  suggestedDQ: string;
  description: string;
  feasibility: "easy" | "moderate" | "ambitious";
  pitch?: string;
  goldStandardElements?: number[];
  suggestedDuration?: string;
  standardsAddressed?: string[];
}

interface ResultsDocument {
  subject: string;
  gradeLevel: string;
  units: Array<{
    title: string;
    topics: string[];
    standards: string[];
    estimatedWeeks: number;
    weekRange: [number, number];
  }>;
}

interface ResultsViewProps {
  documents: ResultsDocument[];
  opportunities: Opportunity[];
  analysisType: "individual" | "cross-curricular";
  isStreaming: boolean;
}

export function ResultsView({
  documents,
  opportunities,
  analysisType,
  isStreaming,
}: ResultsViewProps) {
  const subjectList = documents.map((d) => d.subject).join(", ");

  function handleOverlapClick(index: number) {
    const el = document.getElementById(`opportunity-${index}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="rounded-lg bg-brand-teal/5 border border-brand-teal/20 px-4 py-3">
        <p className="text-sm font-medium text-brand-teal">
          {isStreaming
            ? "Analyzing..."
            : analysisType === "cross-curricular"
              ? `Found ${opportunities.length} cross-curricular opportunities across ${subjectList}`
              : `Found ${opportunities.length} PBL opportunities in ${subjectList}`}
        </p>
      </div>

      {/* Timeline */}
      {documents.length > 0 && (
        <CurriculumTimeline
          documents={documents}
          opportunities={opportunities.map((o) => ({
            weekRange: o.weekRange,
            subjects: o.subjects,
          }))}
          onOverlapClick={handleOverlapClick}
        />
      )}

      {/* Opportunity cards */}
      {isStreaming && opportunities.length === 0 && (
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3 animate-pulse"
            >
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded bg-neutral-200" />
                <div className="h-5 w-20 rounded bg-neutral-200" />
              </div>
              <div className="h-6 w-3/4 rounded bg-neutral-200" />
              <div className="h-4 w-full rounded bg-neutral-100" />
              <div className="h-4 w-2/3 rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      )}

      {opportunities.length > 0 && (
        <div className="space-y-4">
          {opportunities.map((opp, i) => (
            <OpportunityCard
              key={i}
              id={`opportunity-${i}`}
              index={i}
              subjects={opp.subjects}
              unitConnections={opp.unitConnections}
              weekRange={opp.weekRange}
              suggestedDQ={opp.suggestedDQ}
              description={opp.description}
              feasibility={opp.feasibility}
              pitch={opp.pitch}
              goldStandardElements={opp.goldStandardElements}
              suggestedDuration={opp.suggestedDuration}
            />
          ))}
        </div>
      )}

      {!isStreaming && opportunities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">
            No opportunities found. Try uploading different documents or adding
            more subjects for cross-curricular analysis.
          </p>
        </div>
      )}
    </div>
  );
}
