"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BuilderWizard } from "@/components/build/builder-wizard";
import type { BuilderInput } from "@/lib/types/project";

function BuildNewContent() {
  const searchParams = useSearchParams();

  // Pre-fill from query params (e.g., coming from Quick Create)
  const defaultValues: Partial<BuilderInput> = {};

  const gradeLevel = searchParams.get("gradeLevel");
  if (gradeLevel) defaultValues.gradeLevel = gradeLevel;

  const subjects = searchParams.get("subjects");
  if (subjects) defaultValues.subjects = subjects.split(",");

  const topic = searchParams.get("topic");
  if (topic) defaultValues.topic = topic;

  const duration = searchParams.get("duration");
  if (
    duration === "single-day" ||
    duration === "micro" ||
    duration === "mini" ||
    duration === "full"
  ) {
    defaultValues.duration = duration;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-8 text-center">
        Build Your PBL Unit
      </h1>
      <BuilderWizard
        defaultValues={
          Object.keys(defaultValues).length > 0 ? defaultValues : undefined
        }
      />
    </div>
  );
}

export default function BuildNewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-teal" />
        </div>
      }
    >
      <BuildNewContent />
    </Suspense>
  );
}
