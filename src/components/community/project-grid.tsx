"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CommunityProject } from "@/lib/types";
import { CommunityProjectCard } from "./community-project-card";

const SUBJECTS = [
  "Math",
  "ELA",
  "Science",
  "Social Studies",
  "Art",
  "Music",
  "Technology",
  "World Languages",
  "Health/PE",
];

const GRADES = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const DURATIONS = [
  { label: "Single-Day", value: "single-day" },
  { label: "Micro", value: "micro" },
  { label: "Mini", value: "mini" },
  { label: "Full", value: "full" },
];

interface ProjectGridProps {
  projects: CommunityProject[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activeGrade, setActiveGrade] = useState<string | null>(null);
  const [activeDuration, setActiveDuration] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = projects;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(q);
        const dqMatch = (p.drivingQuestion?.selected ?? "").toLowerCase().includes(q);
        const subjectsMatch = p.subjects.join(" ").toLowerCase().includes(q);
        return titleMatch || dqMatch || subjectsMatch;
      });
    }

    if (activeSubject) {
      result = result.filter((p) => p.subjects.includes(activeSubject));
    }

    if (activeGrade) {
      result = result.filter((p) => p.gradeLevel === activeGrade);
    }

    if (activeDuration) {
      result = result.filter((p) => p.duration === activeDuration);
    }

    return result;
  }, [projects, searchQuery, activeSubject, activeGrade, activeDuration]);

  const chipBase =
    "rounded-full px-3 py-1 text-xs font-medium cursor-pointer transition-colors";
  const chipActive = "bg-brand-teal text-white";
  const chipInactive =
    "border border-neutral-300 text-neutral-600 hover:bg-neutral-50";

  function toggleChip<T extends string>(
    current: T | null,
    value: T,
    setter: (v: T | null) => void
  ) {
    setter(current === value ? null : value);
  }

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
        <input
          type="text"
          aria-label="Search projects"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 pl-9 text-sm outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Subjects */}
        {SUBJECTS.map((subject) => (
          <button
            key={subject}
            type="button"
            aria-pressed={activeSubject === subject}
            className={cn(
              chipBase,
              activeSubject === subject ? chipActive : chipInactive
            )}
            onClick={() => toggleChip(activeSubject, subject, setActiveSubject)}
          >
            {subject}
          </button>
        ))}

        <div className="mx-1 h-5 w-px bg-neutral-200" />

        {/* Grades */}
        {GRADES.map((grade) => (
          <button
            key={grade}
            type="button"
            aria-pressed={activeGrade === grade}
            className={cn(
              chipBase,
              activeGrade === grade ? chipActive : chipInactive
            )}
            onClick={() => toggleChip(activeGrade, grade, setActiveGrade)}
          >
            {grade}
          </button>
        ))}

        <div className="mx-1 h-5 w-px bg-neutral-200" />

        {/* Duration */}
        {DURATIONS.map((d) => (
          <button
            key={d.value}
            type="button"
            aria-pressed={activeDuration === d.value}
            className={cn(
              chipBase,
              activeDuration === d.value ? chipActive : chipInactive
            )}
            onClick={() =>
              toggleChip(activeDuration, d.value, setActiveDuration)
            }
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <CommunityProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
