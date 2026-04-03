"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGenerateDQ } from "@/hooks/use-generate";
import { DQFormulaAnimation } from "./dq-formula-animation";
import { DQCard } from "./dq-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  RoleIcon,
  ActionIcon,
  ProductIcon,
  AudienceIcon,
  PurposeIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import type { DQGenerationResponse } from "@/lib/types/project";

interface DQGeneratorProps {
  gradeLevel: string;
  subjects: string[];
  topic: string;
  duration: string;
  teacherNotes?: string;
  onDQSelected: (dq: {
    question: string;
    formula: {
      role: string;
      action: string;
      product: string;
      audience: string;
      purpose: string;
    };
  }) => void;
}

type GeneratorPhase = "idle" | "generating" | "animating" | "selecting";

const SLOT_ICONS = [RoleIcon, ActionIcon, ProductIcon, AudienceIcon, PurposeIcon];
const SLOT_LABELS = ["Role", "Action", "Product", "Audience", "Purpose"];

function LoadingSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-4">
      {SLOT_ICONS.map((Icon, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-neutral-400">
            <Icon size={14} className="text-neutral-300" />
            {SLOT_LABELS[i]}
          </span>
          <div className="flex min-h-[40px] min-w-[100px] items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 px-3 py-2">
            <motion.div
              className="h-3 w-16 rounded bg-neutral-100"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DQGenerator({
  gradeLevel,
  subjects,
  topic,
  duration,
  teacherNotes,
  onDQSelected,
}: DQGeneratorProps) {
  const { generate, data, isStreaming, error, reset } = useGenerateDQ();
  const [phase, setPhase] = useState<GeneratorPhase>("idle");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  const dqs = data?.drivingQuestions ?? [];

  const handleGenerate = useCallback(() => {
    setPhase("generating");
    setSelectedIndex(null);
    setAnimationComplete(false);
    reset();
    generate("/api/generate/dq", {
      gradeLevel,
      subjects,
      topic,
      duration,
      teacherNotes,
    });
  }, [generate, reset, gradeLevel, subjects, topic, duration, teacherNotes]);

  // Transition from generating to animating when data arrives
  useEffect(() => {
    if (data && dqs.length > 0 && phase === "generating") {
      setPhase("animating");
    }
  }, [data, dqs.length, phase]);

  const handleAnimationComplete = useCallback(() => {
    setAnimationComplete(true);
    setPhase("selecting");
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      const dq = dqs[index];
      if (dq) {
        onDQSelected({ question: dq.question, formula: dq.formula });
      }
    },
    [dqs, onDQSelected]
  );

  const isApiKeyError =
    error?.toLowerCase().includes("gemini") ||
    error?.toLowerCase().includes("api key") ||
    error?.toLowerCase().includes("401") ||
    error?.toLowerCase().includes("403");

  return (
    <div className="space-y-6">
      {/* Initial / Regenerate state */}
      {phase === "idle" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <p className="text-center text-sm text-neutral-600">
            Generate AI-powered driving questions based on your project
            parameters.
          </p>
          <Button onClick={handleGenerate}>Generate Driving Questions</Button>
        </div>
      )}

      {/* Loading skeleton */}
      {phase === "generating" && isStreaming && <LoadingSkeleton />}

      {/* Error state */}
      {error && (
        <Card className="border-brand-coral/20 bg-brand-coral-light/30">
          <CardContent>
            {isApiKeyError ? (
              <p className="text-sm text-neutral-700">
                AI generation requires a Gemini API key. Add{" "}
                <code className="rounded bg-neutral-200 px-1.5 py-0.5 font-mono text-xs">
                  GEMINI_API_KEY
                </code>{" "}
                to your environment variables.
              </p>
            ) : (
              <p className="text-sm text-neutral-700">
                Something went wrong generating driving questions. Please try
                again.
              </p>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerate}
              className="mt-3"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Animation phase - show the first DQ formula animation */}
      {phase === "animating" && dqs.length > 0 && (
        <DQFormulaAnimation
          formula={dqs[0].formula}
          onComplete={handleAnimationComplete}
        />
      )}

      {/* Selection phase - show all DQ cards */}
      {phase === "selecting" && dqs.length > 0 && (
        <div className="space-y-6">
          <p className="text-center text-sm font-medium text-neutral-600">
            Choose the driving question that best fits your project:
          </p>

          <div className="grid gap-4">
            <AnimatePresence>
              {dqs.map((dq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3, duration: 0.3 }}
                >
                  <DQCard
                    question={dq.question}
                    formula={dq.formula}
                    whyItWorks={dq.whyItWorks}
                    authenticityRating={dq.authenticityRating}
                    difficultyLevel={dq.difficultyLevel}
                    isSelected={selectedIndex === i}
                    anotherIsSelected={
                      selectedIndex !== null && selectedIndex !== i
                    }
                    onSelect={() => handleSelect(i)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Regenerate button */}
          <div className="flex justify-center">
            <Button variant="ghost" onClick={handleGenerate}>
              Regenerate Questions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
