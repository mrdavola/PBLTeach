"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SingleDayIcon, MicroIcon, MiniIcon, FullIcon } from "@/components/icons";
import type { BuilderInput } from "@/lib/types/project";

interface BuilderInputFormProps {
  onSubmit: (data: BuilderInput) => void;
  defaultValues?: Partial<BuilderInput>;
}

const GRADE_OPTIONS = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const SUBJECT_OPTIONS = [
  "Math",
  "ELA",
  "Science",
  "Social Studies",
  "Art",
  "Music",
  "PE",
  "Technology",
  "World Languages",
  "Other",
];

const DURATION_OPTIONS = [
  {
    value: "single-day" as const,
    label: "Single-day",
    sub: "1 period",
    Icon: SingleDayIcon,
  },
  {
    value: "micro" as const,
    label: "Micro",
    sub: "3–5 days",
    Icon: MicroIcon,
  },
  {
    value: "mini" as const,
    label: "Mini",
    sub: "1–2 weeks",
    Icon: MiniIcon,
  },
  {
    value: "full" as const,
    label: "Full",
    sub: "3+ weeks",
    Icon: FullIcon,
  },
];

const COMFORT_OPTIONS = [
  {
    value: "new" as const,
    label: "First time",
    sub: "I'm new to PBL and want guidance",
  },
  {
    value: "tried" as const,
    label: "Tried it before",
    sub: "I've done a project or two",
  },
  {
    value: "experienced" as const,
    label: "Experienced",
    sub: "I regularly use PBL in my classroom",
  },
];

export function BuilderInputForm({ onSubmit, defaultValues }: BuilderInputFormProps) {
  const [gradeLevel, setGradeLevel] = useState(defaultValues?.gradeLevel ?? "");
  const [subjects, setSubjects] = useState<string[]>(defaultValues?.subjects ?? []);
  const [topic, setTopic] = useState(defaultValues?.topic ?? "");
  const [duration, setDuration] = useState<BuilderInput["duration"]>(
    defaultValues?.duration ?? "mini"
  );
  const [comfortLevel, setComfortLevel] = useState<BuilderInput["comfortLevel"]>(
    defaultValues?.comfortLevel ?? "new"
  );
  const [standards, setStandards] = useState(defaultValues?.standards ?? "");
  const [additionalNotes, setAdditionalNotes] = useState(
    defaultValues?.additionalNotes ?? ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSubject = useCallback((subject: string) => {
    setSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    if (!gradeLevel) newErrors.gradeLevel = "Please select a grade level";
    if (subjects.length === 0) newErrors.subjects = "Please select at least one subject";
    if (!topic.trim()) newErrors.topic = "Please enter a topic";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [gradeLevel, subjects, topic]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      onSubmit({
        gradeLevel,
        subjects,
        topic: topic.trim(),
        duration,
        comfortLevel,
        standards: standards.trim() || undefined,
        additionalNotes: additionalNotes.trim() || undefined,
      });
    },
    [
      gradeLevel,
      subjects,
      topic,
      duration,
      comfortLevel,
      standards,
      additionalNotes,
      validate,
      onSubmit,
    ]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Grade Level */}
      <div className="space-y-2">
        <Label htmlFor="grade-select">Grade Level *</Label>
        <select
          id="grade-select"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          className="font-body h-11 w-full max-w-xs rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-brand-teal focus-visible:shadow-[0_0_0_3px_rgba(13,115,119,0.1)]"
        >
          <option value="" disabled>
            Select grade...
          </option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g === "K" ? "Kindergarten" : `Grade ${g}`}
            </option>
          ))}
        </select>
        {errors.gradeLevel && (
          <p className="text-sm text-red-600">{errors.gradeLevel}</p>
        )}
      </div>

      {/* Subjects */}
      <div className="space-y-2">
        <Label>Subject(s) *</Label>
        <div className="flex flex-wrap gap-2">
          {SUBJECT_OPTIONS.map((subject) => {
            const selected = subjects.includes(subject);
            return (
              <button
                key={subject}
                type="button"
                onClick={() => toggleSubject(subject)}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                  selected
                    ? "border-brand-teal bg-brand-teal text-white"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-brand-teal hover:text-brand-teal"
                )}
              >
                {subject}
              </button>
            );
          })}
        </div>
        {errors.subjects && (
          <p className="text-sm text-red-600">{errors.subjects}</p>
        )}
      </div>

      {/* Topic */}
      <div className="space-y-2">
        <Label htmlFor="topic-input">Topic / Unit *</Label>
        <Input
          id="topic-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Ecosystems, Fractions, American Revolution..."
        />
        {errors.topic && (
          <p className="text-sm text-red-600">{errors.topic}</p>
        )}
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label>Duration</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {DURATION_OPTIONS.map((opt) => {
            const selected = duration === opt.value;
            return (
              <Card
                key={opt.value}
                size="sm"
                className={cn(
                  "cursor-pointer text-center transition-all",
                  selected
                    ? "border-brand-teal bg-brand-teal-light shadow-sm"
                    : "hover:border-neutral-400"
                )}
                onClick={() => setDuration(opt.value)}
                role="radio"
                aria-checked={selected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDuration(opt.value);
                  }
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <opt.Icon
                    size={24}
                    className={cn(
                      selected ? "text-brand-teal" : "text-neutral-400"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-bold",
                      selected ? "text-brand-teal" : "text-neutral-700"
                    )}
                  >
                    {opt.label}
                  </span>
                  <span className="text-xs text-neutral-500">{opt.sub}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Comfort Level */}
      <div className="space-y-2">
        <Label>PBL Comfort Level</Label>
        <div className="grid gap-3 sm:grid-cols-3">
          {COMFORT_OPTIONS.map((opt) => {
            const selected = comfortLevel === opt.value;
            return (
              <Card
                key={opt.value}
                size="sm"
                className={cn(
                  "cursor-pointer transition-all",
                  selected
                    ? "border-brand-teal bg-brand-teal-light shadow-sm"
                    : "hover:border-neutral-400"
                )}
                onClick={() => setComfortLevel(opt.value)}
                role="radio"
                aria-checked={selected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setComfortLevel(opt.value);
                  }
                }}
              >
                <span
                  className={cn(
                    "text-sm font-bold",
                    selected ? "text-brand-teal" : "text-neutral-700"
                  )}
                >
                  {opt.label}
                </span>
                <p className="text-xs text-neutral-500">{opt.sub}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Standards (optional) */}
      <div className="space-y-2">
        <Label htmlFor="standards-input">Standards (optional)</Label>
        <Textarea
          id="standards-input"
          value={standards}
          onChange={(e) => setStandards(e.target.value)}
          placeholder="Paste specific standards you need to address"
          className="min-h-[80px]"
        />
      </div>

      {/* Additional Notes (optional) */}
      <div className="space-y-2">
        <Label htmlFor="notes-input">Additional Notes (optional)</Label>
        <Textarea
          id="notes-input"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Anything else you want the builder to know..."
          className="min-h-[80px]"
        />
      </div>

      {/* Submit */}
      <Button type="submit" size="lg">
        Next: Driving Question
      </Button>
    </form>
  );
}
