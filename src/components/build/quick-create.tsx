"use client";

import { motion } from "framer-motion";
import { phases } from "@/lib/data/phases";
import { Badge } from "@/components/ui/badge";
import { AssembleGroup, AssembleItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import type { QuickCreateResult } from "@/lib/types/project";

interface QuickCreateProps {
  result: QuickCreateResult | null;
  streamText: string;
  isStreaming: boolean;
}

const phaseKeys = [
  "entryEvent",
  "investigation",
  "problemChallenge",
  "create",
  "share",
] as const;

const durationLabels: Record<string, string> = {
  "single-day": "1 period",
  micro: "3–5 days",
  mini: "1–2 weeks",
  full: "3+ weeks",
};

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-200",
        className
      )}
    />
  );
}

export function QuickCreate({ result, streamText, isStreaming }: QuickCreateProps) {
  if (isStreaming && !result) {
    return (
      <div className="space-y-6">
        {/* DQ skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-20" />
            ))}
          </div>
        </div>
        {/* Phase overview skeletons */}
        <div className="space-y-3">
          {phases.map((phase) => (
            <div key={phase.number} className="flex items-start gap-3">
              <Skeleton
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
              />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
        {/* Start small skeleton */}
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    );
  }

  if (!result) return null;

  const formulaParts = [
    { label: "Role", value: result.formula.role },
    { label: "Action", value: result.formula.action },
    { label: "Product", value: result.formula.product },
    { label: "Audience", value: result.formula.audience },
    { label: "Purpose", value: result.formula.purpose },
  ];

  return (
    <AssembleGroup className="space-y-6">
      {/* Driving Question */}
      <AssembleItem>
        <p className="font-display text-xl font-bold text-neutral-900">
          &ldquo;{result.drivingQuestion}&rdquo;
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {formulaParts.map((part) => (
            <span
              key={part.label}
              className="inline-flex items-center gap-1 rounded-full bg-brand-teal-light px-2 py-0.5 text-xs text-brand-teal"
            >
              <span className="font-medium">{part.label}:</span> {part.value}
            </span>
          ))}
        </div>
      </AssembleItem>

      {/* 5-Phase Overview */}
      <AssembleItem className="space-y-3">
        <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          5-Phase Overview
        </h3>
        {phaseKeys.map((key, i) => {
          const phase = phases[i];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <span
                className="mt-1.5 block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: phase.color }}
              />
              <div>
                <span className="text-sm font-bold text-neutral-800">
                  {phase.name}
                </span>
                <p className="text-sm text-neutral-600">
                  {result.phaseOverview[key]}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AssembleItem>

      {/* Start Small Suggestion */}
      <AssembleItem>
        <div className="rounded-lg border border-brand-teal/20 bg-brand-teal-light/50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-brand-teal">
              Start Small
            </span>
            <Badge variant="default" className="text-[10px]">
              {durationLabels[result.suggestedDuration] ?? result.suggestedDuration}
            </Badge>
          </div>
          <p className="text-sm text-neutral-700">
            {result.startSmallSuggestion}
          </p>
        </div>
      </AssembleItem>
    </AssembleGroup>
  );
}
