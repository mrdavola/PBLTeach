"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RoleIcon,
  ActionIcon,
  ProductIcon,
  AudienceIcon,
  PurposeIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface DQCardProps {
  question: string;
  formula: {
    role: string;
    action: string;
    product: string;
    audience: string;
    purpose: string;
  };
  whyItWorks: string;
  authenticityRating: "low" | "medium" | "high";
  difficultyLevel: "beginner-friendly" | "balanced" | "ambitious";
  isSelected: boolean;
  onSelect: () => void;
  onEditComponent?: (component: string) => void;
  anotherIsSelected?: boolean;
}

const COMPONENT_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  role: RoleIcon,
  action: ActionIcon,
  product: ProductIcon,
  audience: AudienceIcon,
  purpose: PurposeIcon,
};

const COMPONENT_LABELS: Record<string, string> = {
  role: "Role",
  action: "Action",
  product: "Product",
  audience: "Audience",
  purpose: "Purpose",
};

const DIFFICULTY_STYLES: Record<string, string> = {
  "beginner-friendly": "bg-green-100 text-green-800",
  balanced: "bg-brand-teal-light text-brand-teal-dark",
  ambitious: "bg-amber-100 text-amber-800",
};

const AUTHENTICITY_STYLES: Record<string, string> = {
  low: "bg-neutral-100 text-neutral-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-emerald-100 text-emerald-700",
};

function renderQuestionWithEditable(
  question: string,
  formula: DQCardProps["formula"],
  isSelected: boolean,
  onEditComponent?: (component: string) => void
) {
  if (!isSelected || !onEditComponent) {
    return <span>{question}</span>;
  }

  // Build a map of formula values to their keys for matching in the question text
  const parts: Array<{ text: string; componentKey?: string }> = [];
  let remaining = question;

  // Sort formula entries by their position in the question to process left-to-right
  const entries = Object.entries(formula)
    .map(([key, value]) => ({
      key,
      value,
      index: remaining.indexOf(value),
    }))
    .filter((e) => e.index !== -1)
    .sort((a, b) => a.index - b.index);

  for (const entry of entries) {
    const idx = remaining.indexOf(entry.value);
    if (idx === -1) continue;

    if (idx > 0) {
      parts.push({ text: remaining.slice(0, idx) });
    }
    parts.push({ text: entry.value, componentKey: entry.key });
    remaining = remaining.slice(idx + entry.value.length);
  }

  if (remaining) {
    parts.push({ text: remaining });
  }

  return (
    <>
      {parts.map((part, i) =>
        part.componentKey ? (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditComponent(part.componentKey!);
            }}
            className="cursor-pointer underline decoration-brand-teal/40 decoration-2 underline-offset-2 transition-colors hover:text-brand-teal hover:decoration-brand-teal"
          >
            {part.text}
          </button>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

export function DQCard({
  question,
  formula,
  whyItWorks,
  authenticityRating,
  difficultyLevel,
  isSelected,
  onSelect,
  onEditComponent,
  anotherIsSelected = false,
}: DQCardProps) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "relative cursor-pointer transition-all duration-200",
          isSelected
            ? "border-2 border-brand-teal shadow-md"
            : "hover:border-neutral-400",
          !isSelected && anotherIsSelected && "opacity-80"
        )}
        onClick={onSelect}
        onMouseEnter={() => setShowWhy(true)}
        onMouseLeave={() => setShowWhy(false)}
        onTouchStart={() => setShowWhy((prev) => !prev)}
      >
        {/* Selected check icon */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-brand-teal text-white"
          >
            <Check className="size-4" />
          </motion.div>
        )}

        <CardContent className="space-y-3">
          {/* Driving question text */}
          <p className="pr-8 font-display text-base font-medium leading-relaxed text-neutral-900 md:text-lg">
            {renderQuestionWithEditable(
              question,
              formula,
              isSelected,
              onEditComponent
            )}
          </p>

          {/* Formula breakdown chips */}
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(formula).map(([key, value]) => {
              const Icon = COMPONENT_ICONS[key];
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                >
                  {Icon && <Icon size={12} className="text-neutral-400" />}
                  <span className="font-medium text-neutral-500">
                    {COMPONENT_LABELS[key]}:
                  </span>
                  {value}
                </span>
              );
            })}
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "border-0",
                DIFFICULTY_STYLES[difficultyLevel] ?? ""
              )}
            >
              {difficultyLevel}
            </Badge>
            <Badge
              className={cn(
                "border-0",
                AUTHENTICITY_STYLES[authenticityRating] ?? ""
              )}
            >
              {authenticityRating} authenticity
            </Badge>
          </div>

          {/* Why it works - reveal on hover/tap */}
          <motion.div
            initial={false}
            animate={{
              height: showWhy ? "auto" : 0,
              opacity: showWhy ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="border-t border-neutral-200 pt-3 text-sm leading-relaxed text-neutral-600">
              <span className="font-medium text-neutral-700">
                Why this works:{" "}
              </span>
              {whyItWorks}
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
