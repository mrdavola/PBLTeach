"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuickCreate } from "@/hooks/use-generate";
import { useAuth } from "@/hooks/use-auth";
import { useProject } from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QuickCreate } from "@/components/build/quick-create";
import { AssembleGroup, AssembleItem } from "@/components/ui/motion";
import { Check } from "lucide-react";

interface QuickCreateFlowProps {
  initialDescription?: string;
}

export function QuickCreateFlow({ initialDescription = "" }: QuickCreateFlowProps) {
  const router = useRouter();
  const [description, setDescription] = useState(initialDescription);
  const [isEditing, setIsEditing] = useState(!initialDescription);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const { generate, data, streamText, isStreaming, error } = useQuickCreate();
  const { user } = useAuth();
  const { save } = useProject();
  const [savedProjectId, setSavedProjectId] = useState<string | null>(null);
  const [saveIndicator, setSaveIndicator] = useState<string | null>(null);

  // Auto-submit when arriving with an initial description (e.g., from quick-start prompts)
  useEffect(() => {
    if (initialDescription && !autoSubmitted) {
      setAutoSubmitted(true);
      generate("/api/generate/quick-create", { description: initialDescription.trim() });
    }
  }, [initialDescription, autoSubmitted, generate]);

  // Auto-save generated result as draft project
  useEffect(() => {
    if (!data || isStreaming || !user || savedProjectId) return;

    const draftProject = {
      status: "draft" as const,
      source: "quick-create" as const,
      title: description.trim() || "Quick Plan",
      gradeLevel: "",
      subjects: [],
      topic: description.trim(),
      duration: data.suggestedDuration,
      comfortLevel: "new" as const,
      drivingQuestion: {
        selected: data.drivingQuestion,
        options: [data.drivingQuestion],
        formula: data.formula,
      },
    };

    save(draftProject)
      .then((id) => {
        setSavedProjectId(id);
        setSaveIndicator("Saved to dashboard");
        setTimeout(() => setSaveIndicator(null), 3000);
      })
      .catch(() => {
        // Silent fail
      });
  }, [data, isStreaming, user, savedProjectId, description, save]);

  const handleSubmit = useCallback(() => {
    if (!description.trim()) return;
    setIsEditing(false);
    generate("/api/generate/quick-create", { description: description.trim() });
  }, [description, generate]);

  const handleBuildFullPlan = useCallback(() => {
    if (savedProjectId) {
      router.push(`/build/${savedProjectId}`);
    } else {
      const params = new URLSearchParams();
      if (data) {
        params.set("topic", description.trim());
        params.set("duration", data.suggestedDuration);
      }
      router.push(`/build/new?${params.toString()}`);
    }
  }, [router, data, description, savedProjectId]);

  const handleAdjust = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Description input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">
          Describe your project idea
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., My 4th graders are studying ecosystems and I want them to create something for the local nature center..."
          disabled={!isEditing && (isStreaming || !!data)}
          className="min-h-[100px]"
        />
        {isEditing && (
          <Button
            onClick={handleSubmit}
            disabled={!description.trim() || isStreaming}
          >
            {isStreaming ? "Generating..." : "Generate Quick Plan"}
          </Button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Result */}
      <QuickCreate
        result={data}
        streamText={streamText}
        isStreaming={isStreaming}
      />

      {/* Action buttons */}
      {data && !isStreaming && (
        <AssembleGroup className="flex flex-wrap gap-3 pt-2">
          <AssembleItem>
            <Button onClick={handleBuildFullPlan}>
              Build the full plan
            </Button>
          </AssembleItem>
          <AssembleItem>
            <Button variant="outline" onClick={handleAdjust}>
              Let me adjust...
            </Button>
          </AssembleItem>
        </AssembleGroup>
      )}

      {saveIndicator && (
        <p className="text-sm text-brand-teal flex items-center gap-1">
          <Check className="size-4" />
          {saveIndicator}
        </p>
      )}
    </div>
  );
}
