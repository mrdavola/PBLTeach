"use client";

import { phases } from "@/lib/data/phases";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import {
  EntryEventIcon,
  InvestigationIcon,
  ProblemIcon,
  CreateIcon,
  ShareIcon,
} from "@/components/icons";

interface PhaseCardProps {
  phaseNumber: 1 | 2 | 3 | 4 | 5;
  content: {
    activities?: string[];
    resources?: string[];
    suggestions?: string[];
  } | null;
  expanded: boolean;
  onToggle: () => void;
  onRegenerate?: () => void;
  isGenerating?: boolean;
}

const phaseIcons = [
  EntryEventIcon,
  InvestigationIcon,
  ProblemIcon,
  CreateIcon,
  ShareIcon,
] as const;

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-neutral-100", className)} />
  );
}

export function PhaseCard({
  phaseNumber,
  content,
  expanded,
  onToggle,
  onRegenerate,
  isGenerating,
}: PhaseCardProps) {
  const phase = phases[phaseNumber - 1];
  const Icon = phaseIcons[phaseNumber - 1];

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-neutral-300 bg-white transition-shadow hover:shadow-sm"
      style={{ backgroundImage: phase.backgroundPattern }}
    >
      {/* Phase color accent bar */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: phase.color }}
      />

      {/* Header (always visible) */}
      <button
        type="button"
        className="flex w-full items-center gap-3 p-4 pl-5 text-left"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <span className="shrink-0" style={{ color: phase.color }}>
          <Icon size={20} />
        </span>
        <span
          className="font-display text-base font-bold"
          style={{ color: phase.color }}
        >
          {phase.name}
        </span>
        <svg
          className={cn(
            "ml-auto h-5 w-5 shrink-0 text-neutral-400 transition-transform",
            expanded && "rotate-180"
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

      {/* Expandable content */}
      <Reveal isOpen={expanded}>
        <div className="space-y-4 px-5 pb-5">
          {isGenerating || !content ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          ) : (
            <>
              {content.activities && content.activities.length > 0 && (
                <div>
                  <h4 className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Activities
                  </h4>
                  <ul className="space-y-1">
                    {content.activities.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <span
                          className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: phase.color }}
                        />
                        {typeof item === "string" ? item : JSON.stringify(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content.resources && content.resources.length > 0 && (
                <div>
                  <h4 className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Resources
                  </h4>
                  <ul className="space-y-1">
                    {content.resources.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <span
                          className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: phase.color }}
                        />
                        {typeof item === "string" ? item : JSON.stringify(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content.suggestions && content.suggestions.length > 0 && (
                <div>
                  <h4 className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Suggestions
                  </h4>
                  <ul className="space-y-1">
                    {content.suggestions.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <span
                          className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: phase.color }}
                        />
                        {typeof item === "string" ? item : JSON.stringify(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRegenerate}
                  className="mt-2"
                >
                  Regenerate this section
                </Button>
              )}
            </>
          )}
        </div>
      </Reveal>
    </div>
  );
}
