"use client";

import Link from "next/link";
import { Star, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CommunityProject } from "@/lib/types";

const DURATION_LABELS: Record<string, string> = {
  "single-day": "1 Day",
  micro: "2-3 Days",
  mini: "1-2 Weeks",
  full: "6+ Weeks",
};

interface CommunityProjectCardProps {
  project: CommunityProject;
  size?: "default" | "featured";
}

export function CommunityProjectCard({
  project,
  size = "default",
}: CommunityProjectCardProps) {
  const isFeatured = size === "featured";
  const avgRating =
    project.published?.ratingCount > 0
      ? project.published.ratingSum / project.published.ratingCount
      : 0;
  const goldStandardScore = project.goldStandard?.elementsIncluded?.length ?? 0;

  return (
    <Link
      href={`/community/${project.id}`}
      className={cn(
        "block rounded-xl border border-neutral-200 bg-white hover:border-brand-teal transition-colors",
        isFeatured ? "min-w-[320px] p-6" : "p-5"
      )}
    >
      {/* Title */}
      <h3
        className={cn(
          "font-display font-bold line-clamp-2",
          isFeatured ? "text-lg" : "text-base"
        )}
      >
        {project.title}
      </h3>

      {/* Driving Question */}
      {project.drivingQuestion?.selected && (
        <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
          {project.drivingQuestion.selected}
        </p>
      )}

      {/* Author (featured only) */}
      {isFeatured && project.published && (
        <p className="mt-2 text-xs text-neutral-500">
          {project.published.authorName}
          {project.published.authorSchool &&
            ` - ${project.published.authorSchool}`}
        </p>
      )}

      {/* Badges */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {/* Grade badge */}
        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
          {project.gradeLevel}
        </span>

        {/* Subject badges */}
        {project.subjects.map((subject) => (
          <span
            key={subject}
            className="inline-flex items-center rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand-teal"
          >
            {subject}
          </span>
        ))}

        {/* Duration badge */}
        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
          {DURATION_LABELS[project.duration] ?? project.duration}
        </span>
      </div>

      {/* Gold Standard score (featured only) */}
      {isFeatured && (
        <p className="mt-2 text-xs font-medium text-amber-600">
          Gold Standard: {goldStandardScore}/7
        </p>
      )}

      {/* Bottom row: rating + adaptations */}
      <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1" aria-label={`Rating: ${avgRating.toFixed(1)} out of 5`}>
          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
          {avgRating.toFixed(1)}
        </span>
        <span className="inline-flex items-center gap-1" aria-label={`${project.published?.adaptationCount ?? 0} adaptations`}>
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          {project.published?.adaptationCount ?? 0}
        </span>
      </div>
    </Link>
  );
}
