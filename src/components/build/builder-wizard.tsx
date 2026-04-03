"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useGenerateDQ, useGenerateLearningNarrative } from "@/hooks/use-generate";
import { BuilderInputForm } from "@/components/build/builder-input-form";
import { LearningNarrativeView } from "@/components/build/learning-narrative-view";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BuilderInput, Project, DQGenerationResponse } from "@/lib/types/project";

interface BuilderWizardProps {
  defaultValues?: Partial<BuilderInput>;
}

const STEPS = [
  { number: 1, label: "Details" },
  { number: 2, label: "Driving Question" },
  { number: 3, label: "Your Plan" },
] as const;

function StepIndicator({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step.number} className="flex items-center">
            <button
              type="button"
              onClick={() => {
                if (isCompleted) onStepClick(step.number);
              }}
              disabled={!isCompleted && !isActive}
              className={cn(
                "flex flex-col items-center gap-1",
                isCompleted && "cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-full transition-all",
                  isActive && "h-10 w-10 bg-brand-teal text-white",
                  isCompleted &&
                    "h-9 w-9 bg-brand-teal text-white",
                  !isActive &&
                    !isCompleted &&
                    "h-9 w-9 border-2 border-neutral-300 text-neutral-400"
                )}
              >
                {isCompleted ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{step.number}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive && "text-brand-teal",
                  isCompleted && "text-neutral-600",
                  !isActive && !isCompleted && "text-neutral-400"
                )}
              >
                {step.label}
              </span>
            </button>

            {!isLast && (
              <div
                className={cn(
                  "mx-2 mb-5 h-0.5 w-12 sm:w-20",
                  isCompleted ? "bg-brand-teal" : "bg-neutral-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Placeholder DQ Generator in case the real one isn't built yet
function DQGeneratorPlaceholder({
  formData,
  onSelect,
}: {
  formData: BuilderInput;
  onSelect: (dq: string) => void;
}) {
  const { generate, data, isStreaming, error } = useGenerateDQ();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleGenerate = useCallback(() => {
    generate("/api/generate/dq", {
      gradeLevel: formData.gradeLevel,
      subjects: formData.subjects,
      topic: formData.topic,
      duration: formData.duration,
      comfortLevel: formData.comfortLevel,
      standards: formData.standards,
    });
  }, [generate, formData]);

  const dqResponse = data as DQGenerationResponse | null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-xl font-bold text-neutral-900">
          Choose a Driving Question
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          We&apos;ll generate driving questions based on your project details.
        </p>
      </div>

      {!dqResponse && !isStreaming && (
        <div className="text-center">
          <Button onClick={handleGenerate}>Generate Driving Questions</Button>
        </div>
      )}

      {isStreaming && (
        <div className="flex items-center justify-center gap-2 py-8">
          <motion.div
            className="h-2 w-2 rounded-full bg-brand-teal"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-brand-teal"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-brand-teal"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />
          <span className="ml-2 text-sm text-neutral-500">
            Generating driving questions...
          </span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {dqResponse && dqResponse.drivingQuestions && (
        <div className="space-y-3">
          {dqResponse.drivingQuestions.map((dq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setSelectedIndex(i);
                onSelect(dq.question);
              }}
              className={cn(
                "w-full rounded-xl border p-4 text-left transition-all",
                selectedIndex === i
                  ? "border-brand-teal bg-brand-teal-light shadow-sm"
                  : "border-neutral-300 bg-white hover:border-neutral-400"
              )}
            >
              <p className="font-display font-bold text-neutral-900">
                &ldquo;{dq.question}&rdquo;
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {dq.whyItWorks}
              </p>
              <div className="mt-2 flex gap-2">
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                  {dq.authenticityRating} authenticity
                </span>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                  {dq.difficultyLevel}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BuilderWizard({ defaultValues }: BuilderWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BuilderInput | null>(null);
  const [selectedDQ, setSelectedDQ] = useState<string>("");

  const {
    generate: generateNarrative,
    data: narrativeData,
    streamText: narrativeStream,
    isStreaming: narrativeStreaming,
  } = useGenerateLearningNarrative();

  const handleFormSubmit = useCallback((data: BuilderInput) => {
    setFormData(data);
    setCurrentStep(2);
  }, []);

  const handleDQSelect = useCallback((dq: string) => {
    setSelectedDQ(dq);
  }, []);

  const handleGoToStep3 = useCallback(() => {
    if (!formData || !selectedDQ) return;
    setCurrentStep(3);
    generateNarrative("/api/generate/learning-narrative", {
      ...formData,
      drivingQuestion: selectedDQ,
    });
  }, [formData, selectedDQ, generateNarrative]);

  const handleStepClick = useCallback((step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  }, [currentStep]);

  // Build a partial Project from whatever data we have
  const partialProject = useMemo((): Partial<Project> => {
    const base: Partial<Project> = {
      title: formData?.topic ?? "",
      gradeLevel: formData?.gradeLevel ?? "",
      subjects: formData?.subjects ?? [],
      topic: formData?.topic ?? "",
      duration: formData?.duration,
      comfortLevel: formData?.comfortLevel,
    };

    if (selectedDQ) {
      base.drivingQuestion = {
        selected: selectedDQ,
        options: [],
        formula: { role: "", action: "", product: "", audience: "", purpose: "" },
      };
    }

    // Merge narrative data if available
    const narr = narrativeData as Record<string, unknown> | null;
    if (narr) {
      if (narr.title && typeof narr.title === "string") base.title = narr.title;
      if (narr.goldStandard) {
        base.goldStandard = narr.goldStandard as Project["goldStandard"];
      }
      if (narr.assessment) {
        base.assessment = narr.assessment as Project["assessment"];
      }
      if (narr.crossCurricular) {
        base.crossCurricular = narr.crossCurricular as Project["crossCurricular"];
      }
    }

    return base;
  }, [formData, selectedDQ, narrativeData]);

  // Extract phase contents from narrative data
  const phaseContents = useMemo(() => {
    const narr = narrativeData as Record<string, unknown> | null;
    if (!narr || !narr.phases) return undefined;
    const p = narr.phases as Record<string, unknown>;
    const result: Record<number, { activities?: string[]; resources?: string[]; suggestions?: string[] }> = {};

    const phaseMap: Record<string, number> = {
      entryEvent: 1,
      investigation: 2,
      problemChallenge: 3,
      create: 4,
      share: 5,
    };

    for (const [key, num] of Object.entries(phaseMap)) {
      if (p[key]) {
        const phaseData = p[key] as Record<string, unknown>;
        result[num] = {
          activities: Array.isArray(phaseData.activities)
            ? (phaseData.activities as string[])
            : undefined,
          resources: Array.isArray(phaseData.resources)
            ? (phaseData.resources as string[])
            : undefined,
          suggestions: Array.isArray(phaseData.suggestions)
            ? (phaseData.suggestions as string[])
            : undefined,
        };
      }
    }

    return Object.keys(result).length > 0 ? result : undefined;
  }, [narrativeData]);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Step indicator */}
      <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />

      {/* Step content */}
      {currentStep === 1 && (
        <BuilderInputForm
          onSubmit={handleFormSubmit}
          defaultValues={defaultValues ?? formData ?? undefined}
        />
      )}

      {currentStep === 2 && formData && (
        <div className="space-y-6">
          <DQGeneratorPlaceholder
            formData={formData}
            onSelect={handleDQSelect}
          />
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
            <Button
              onClick={handleGoToStep3}
              disabled={!selectedDQ}
            >
              Generate Plan
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(2)}
              className="mr-auto"
            >
              Back
            </Button>
          </div>
          <LearningNarrativeView
            project={partialProject}
            isStreaming={narrativeStreaming}
            streamText={narrativeStream}
            phaseContents={phaseContents}
            onRegeneratePhase={(phase) => {
              // Placeholder: would re-generate a single phase
              console.log("Regenerate phase", phase);
            }}
          />
        </div>
      )}
    </div>
  );
}
