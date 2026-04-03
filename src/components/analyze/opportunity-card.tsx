"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

const FEASIBILITY_STYLES = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-amber-100 text-amber-700",
  ambitious: "bg-red-100 text-red-700",
};

const SUBJECT_COLORS: Record<string, string> = {
  Math: "bg-teal-100 text-teal-700",
  ELA: "bg-orange-100 text-orange-700",
  Science: "bg-indigo-100 text-indigo-700",
  "Social Studies": "bg-amber-100 text-amber-700",
  Art: "bg-purple-100 text-purple-700",
  Music: "bg-pink-100 text-pink-700",
  Technology: "bg-blue-100 text-blue-700",
};

const GOLD_STANDARD_LABELS = [
  "",
  "Challenging Problem",
  "Sustained Inquiry",
  "Authenticity",
  "Student Voice",
  "Reflection",
  "Critique & Revision",
  "Public Product",
];

interface UnitConnection {
  subject: string;
  unitTitle?: string;
  topics: string[];
}

interface OpportunityCardProps {
  subjects: string[];
  unitConnections?: UnitConnection[];
  weekRange: [number, number];
  suggestedDQ: string;
  description: string;
  feasibility: "easy" | "moderate" | "ambitious";
  pitch?: string;
  goldStandardElements?: number[];
  suggestedDuration?: string;
  id?: string;
  index: number;
}

export function OpportunityCard({
  subjects,
  unitConnections,
  weekRange,
  suggestedDQ,
  description,
  feasibility,
  pitch,
  goldStandardElements,
  suggestedDuration,
  id,
  index,
}: OpportunityCardProps) {
  const router = useRouter();

  function handleBuildThis() {
    const params = new URLSearchParams({
      topic: description,
      subjects: subjects.join(","),
      drivingQuestion: suggestedDQ,
      ...(suggestedDuration ? { duration: suggestedDuration } : {}),
      source: "analyze",
    });
    router.push(`/build/new?${params.toString()}`);
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4"
    >
      {/* Top row: subjects + timing + feasibility */}
      <div className="flex flex-wrap items-center gap-2">
        {subjects.map((s) => (
          <span
            key={s}
            className={cn(
              "rounded-md px-2 py-0.5 text-xs font-medium",
              SUBJECT_COLORS[s] || "bg-neutral-100 text-neutral-700"
            )}
          >
            {s}
          </span>
        ))}
        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
          Weeks {weekRange[0]}-{weekRange[1]}
        </span>
        <span
          className={cn(
            "rounded-md px-2 py-0.5 text-xs font-semibold capitalize",
            FEASIBILITY_STYLES[feasibility]
          )}
        >
          {feasibility}
        </span>
      </div>

      {/* Driving question */}
      <h3 className="font-display text-lg font-bold text-neutral-900 leading-snug">
        {suggestedDQ}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-700">{description}</p>

      {/* Unit connections */}
      {unitConnections && unitConnections.length > 0 && (
        <div className="space-y-1">
          {unitConnections.map((conn) => (
            <div key={conn.subject} className="flex items-start gap-2 text-xs">
              <span className="font-medium text-neutral-500 shrink-0">
                {conn.subject}:
              </span>
              <div className="flex flex-wrap gap-1">
                {conn.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-neutral-50 px-1.5 py-0.5 text-neutral-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pitch */}
      {pitch && (
        <p className="text-sm italic text-neutral-500">{pitch}</p>
      )}

      {/* Gold Standard indicators */}
      {goldStandardElements && goldStandardElements.length > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-neutral-400 mr-1">Gold Standard:</span>
          {goldStandardElements.map((el) => (
            <span
              key={el}
              className="inline-flex items-center justify-center size-5 rounded-full bg-brand-teal/10 text-brand-teal text-[10px] font-bold"
              title={GOLD_STANDARD_LABELS[el] || `Element ${el}`}
            >
              {el}
            </span>
          ))}
        </div>
      )}

      {/* Build this button */}
      <Button onClick={handleBuildThis} className="gap-2">
        <Hammer className="size-4" />
        Build this project
      </Button>
    </motion.div>
  );
}
