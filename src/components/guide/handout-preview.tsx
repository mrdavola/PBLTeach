"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const phaseNames = ["Entry Event", "Investigation", "Problem / Challenge", "Create", "Share"];
const phaseVariants = ["entry", "investigation", "problem", "create", "share"] as const;
const phaseBgColors = [
  "bg-phase-entry-light border-l-phase-entry",
  "bg-phase-investigation-light border-l-phase-investigation",
  "bg-phase-problem-light border-l-phase-problem",
  "bg-phase-create-light border-l-phase-create",
  "bg-phase-share-light border-l-phase-share",
];

interface HandoutPreviewProps {
  data: any;
  type: string;
}

export function HandoutPreview({ data, type }: HandoutPreviewProps) {
  if (!data) {
    return (
      <p className="text-center text-neutral-500 py-12">
        No handout data available.
      </p>
    );
  }

  switch (type) {
    case "student-brief":
      return <StudentBriefPreview data={data} />;
    case "reflection-journal":
      return <ReflectionJournalPreview data={data} />;
    case "critique-protocol":
      return <CritiqueProtocolPreview data={data} />;
    case "parent-letter":
      return <ParentLetterPreview data={data} />;
    case "milestone-tracker":
      return <MilestoneTrackerPreview data={data} />;
    default:
      return <GenericPreview data={data} />;
  }
}

/* -------------------------------------------------------------------------- */
/*  Student Brief                                                              */
/* -------------------------------------------------------------------------- */

function StudentBriefPreview({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Driving Question */}
      {data.drivingQuestion && (
        <div className="rounded-lg bg-brand-teal-light border-l-4 border-l-brand-teal p-5">
          <h2 className="font-display font-bold text-lg text-brand-teal-dark mb-1">
            Driving Question
          </h2>
          <p className="text-base text-neutral-900 italic">
            {data.drivingQuestion}
          </p>
        </div>
      )}

      {/* Overview */}
      {data.overview && (
        <section>
          <h3 className="font-display font-bold text-base text-neutral-900 mb-2">
            Overview
          </h3>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {data.overview}
          </p>
        </section>
      )}

      {/* Expectations */}
      {data.expectations && Array.isArray(data.expectations) && (
        <section>
          <h3 className="font-display font-bold text-base text-neutral-900 mb-2">
            Expectations
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {data.expectations.map((item: string, i: number) => (
              <li key={i} className="text-sm text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Timeline */}
      {data.timeline && Array.isArray(data.timeline) && (
        <section>
          <h3 className="font-display font-bold text-base text-neutral-900 mb-2">
            Timeline
          </h3>
          <div className="space-y-2">
            {data.timeline.map((item: any, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3 text-sm text-neutral-700"
              >
                <span className="font-medium shrink-0 text-neutral-900">
                  {item.week ?? item.phase ?? `Step ${i + 1}`}:
                </span>
                <span>{item.description ?? item.activity ?? String(item)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Team Roles */}
      {data.teamRoles && Array.isArray(data.teamRoles) && (
        <section>
          <h3 className="font-display font-bold text-base text-neutral-900 mb-2">
            Team Roles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.teamRoles.map((role: any, i: number) => (
              <div
                key={i}
                className="rounded-lg border border-neutral-300 p-3"
              >
                <p className="font-medium text-sm text-neutral-900">
                  {role.name ?? role.role ?? role}
                </p>
                {role.description && (
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {role.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reflection Journal                                                         */
/* -------------------------------------------------------------------------- */

function ReflectionJournalPreview({ data }: { data: any }) {
  const phases = Array.isArray(data.phases)
    ? data.phases
    : Array.isArray(data)
      ? data
      : [];

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl text-neutral-900">
        Reflection Journal
      </h2>
      {phases.map((phase: any, i: number) => (
        <div
          key={i}
          className={cn(
            "rounded-lg border border-neutral-300 overflow-hidden border-l-4",
            phaseBgColors[i % 5]
          )}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={phaseVariants[i % 5]}>
                {phase.phase ?? phaseNames[i % 5]}
              </Badge>
            </div>
            <ul className="space-y-2">
              {(phase.prompts ?? phase.questions ?? []).map(
                (prompt: any, j: number) => (
                  <li key={j} className="text-sm text-neutral-700">
                    {j + 1}. {typeof prompt === "string" ? prompt : (prompt?.text ?? prompt?.question ?? JSON.stringify(prompt))}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Critique Protocol                                                          */
/* -------------------------------------------------------------------------- */

function CritiqueProtocolPreview({ data }: { data: any }) {
  const steps = Array.isArray(data.steps)
    ? data.steps
    : Array.isArray(data)
      ? data
      : [];

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl text-neutral-900">
        Peer Critique Protocol
      </h2>
      {data.introduction && (
        <p className="text-sm text-neutral-700 leading-relaxed">
          {data.introduction}
        </p>
      )}
      <ol className="space-y-3">
        {steps.map((step: any, i: number) => (
          <li key={i} className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-teal text-white text-sm font-bold">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="font-medium text-sm text-neutral-900">
                {step.title ?? step.step ?? step.instruction ?? (typeof step === "string" ? step : `Step ${i + 1}`)}
              </p>
              {step.description && (
                <p className="text-sm text-neutral-700 mt-0.5">
                  {step.description}
                </p>
              )}
              {step.sentenceStarters &&
                Array.isArray(step.sentenceStarters) && (
                  <div className="rounded-md bg-brand-teal-light p-3 mt-2">
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1">
                      Sentence Starters
                    </p>
                    <ul className="space-y-0.5">
                      {step.sentenceStarters.map((s: string, j: number) => (
                        <li
                          key={j}
                          className="text-sm text-neutral-700 italic"
                        >
                          &ldquo;{s}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Parent Letter                                                              */
/* -------------------------------------------------------------------------- */

function ParentLetterPreview({ data }: { data: any }) {
  const paragraphs = Array.isArray(data.paragraphs)
    ? data.paragraphs
    : Array.isArray(data.body)
      ? data.body
      : typeof data.body === "string"
        ? [data.body]
        : [];

  return (
    <div className="max-w-[640px] mx-auto space-y-4">
      <div className="rounded-lg border border-neutral-300 bg-white p-8">
        {data.date && (
          <p className="text-sm text-neutral-500 mb-4">{data.date}</p>
        )}
        {data.greeting && (
          <p className="text-sm text-neutral-900 mb-4">{data.greeting}</p>
        )}
        {paragraphs.map((para: string, i: number) => (
          <p
            key={i}
            className="text-sm text-neutral-700 leading-relaxed mb-3"
          >
            {para}
          </p>
        ))}
        {data.closing && (
          <p className="text-sm text-neutral-900 mt-6">{data.closing}</p>
        )}
        {data.signature && (
          <p className="text-sm text-neutral-700 mt-1">{data.signature}</p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Milestone Tracker                                                          */
/* -------------------------------------------------------------------------- */

function MilestoneTrackerPreview({ data }: { data: any }) {
  const milestones = Array.isArray(data.milestones)
    ? data.milestones
    : Array.isArray(data)
      ? data
      : [];

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl text-neutral-900">
        Milestone Tracker
      </h2>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-brand-teal text-white font-display font-bold text-left px-4 py-3 rounded-tl-lg">
                Milestone
              </th>
              <th className="bg-brand-teal text-white font-display font-bold text-left px-4 py-3">
                Week
              </th>
              <th className="bg-brand-teal text-white font-display font-bold text-left px-4 py-3 rounded-tr-lg">
                Phase
              </th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((m: any, i: number) => (
              <tr
                key={i}
                className={cn(
                  "border-b border-neutral-300",
                  i % 2 === 1 && "bg-neutral-100"
                )}
              >
                <td className="px-4 py-3 text-neutral-900">
                  {m.title ?? m.milestone ?? m.name ?? String(m)}
                </td>
                <td className="px-4 py-3 text-neutral-700">
                  {m.week ?? m.day ?? "-"}
                </td>
                <td className="px-4 py-3">
                  {m.phase ? (
                    <Badge
                      variant={
                        phaseVariants[(Number(m.phase) - 1) % 5] ?? "default"
                      }
                    >
                      {phaseNames[(Number(m.phase) - 1) % 5] ?? m.phase}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="md:hidden space-y-2">
        {milestones.map((m: any, i: number) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-300 p-3 flex items-center justify-between gap-2"
          >
            <div>
              <p className="text-sm font-medium text-neutral-900">
                {m.title ?? m.milestone ?? m.name ?? String(m)}
              </p>
              <p className="text-xs text-neutral-500">
                Week {m.week ?? m.day ?? "?"}
              </p>
            </div>
            {m.phase && (
              <Badge
                variant={
                  phaseVariants[(Number(m.phase) - 1) % 5] ?? "default"
                }
              >
                {phaseNames[(Number(m.phase) - 1) % 5] ?? m.phase}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Generic Fallback                                                           */
/* -------------------------------------------------------------------------- */

function GenericPreview({ data }: { data: any }) {
  return (
    <div className="rounded-lg border border-neutral-300 bg-white p-6">
      <pre className="text-xs text-neutral-700 whitespace-pre-wrap overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
