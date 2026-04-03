"use client";

import { use, useState, useCallback, useRef } from "react";
import {
  Calendar,
  FileText,
  ClipboardCheck,
  ClipboardList,
  BookOpen,
  MessageSquare,
  Mail,
  Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GuideLayout } from "@/components/guide/guide-layout";
import { MaterialCard } from "@/components/guide/material-card";
import { CalendarOptionsModal } from "@/components/guide/calendar-options-modal";
import { CalendarPreview } from "@/components/guide/calendar-preview";
import { RubricPreview } from "@/components/guide/rubric-preview";
import { HandoutPreview } from "@/components/guide/handout-preview";
import { parseGeminiJSON } from "@/lib/gemini/parse";
import { getErrorMessageFromResponse } from "@/lib/http/error-response";

/* -------------------------------------------------------------------------- */
/*  Material type definitions                                                  */
/* -------------------------------------------------------------------------- */

interface MaterialType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  apiRoute: string;
  apiBody: (proj: any) => Record<string, unknown>;
}

const materialTypes: MaterialType[] = [
  {
    id: "calendar",
    name: "Facilitation Calendar",
    description: "Day-by-day plan with what to say and when",
    icon: Calendar,
    apiRoute: "/api/generate/facilitation-calendar",
    apiBody: (proj) => ({ project: proj, classMinutes: 45, classesPerWeek: 5 }),
  },
  {
    id: "student-brief",
    name: "Student Project Brief",
    description: "One-page overview for students",
    icon: FileText,
    apiRoute: "/api/generate/handout",
    apiBody: (proj) => ({ project: proj, type: "student-brief" }),
  },
  {
    id: "product-rubric",
    name: "Product Rubric",
    description: "Criteria for the final product",
    icon: ClipboardCheck,
    apiRoute: "/api/generate/rubric",
    apiBody: (proj) => ({ project: proj, type: "product" }),
  },
  {
    id: "process-rubric",
    name: "Process Rubric",
    description: "Criteria for collaboration and inquiry",
    icon: ClipboardList,
    apiRoute: "/api/generate/rubric",
    apiBody: (proj) => ({ project: proj, type: "process" }),
  },
  {
    id: "reflection-journal",
    name: "Reflection Journal",
    description: "Phase-by-phase reflection prompts",
    icon: BookOpen,
    apiRoute: "/api/generate/handout",
    apiBody: (proj) => ({ project: proj, type: "reflection-journal" }),
  },
  {
    id: "critique-protocol",
    name: "Peer Critique Protocol",
    description: "Structured peer feedback process",
    icon: MessageSquare,
    apiRoute: "/api/generate/handout",
    apiBody: (proj) => ({ project: proj, type: "critique-protocol" }),
  },
  {
    id: "parent-letter",
    name: "Parent/Guardian Letter",
    description: "Explain PBL to families",
    icon: Mail,
    apiRoute: "/api/generate/handout",
    apiBody: (proj) => ({ project: proj, type: "parent-letter" }),
  },
  {
    id: "milestone-tracker",
    name: "Milestone Tracker",
    description: "Key dates and deliverables",
    icon: Target,
    apiRoute: "/api/generate/handout",
    apiBody: (proj) => ({ project: proj, type: "milestone-tracker" }),
  },
];

/* -------------------------------------------------------------------------- */
/*  State types                                                                */
/* -------------------------------------------------------------------------- */

interface MaterialState {
  status: "idle" | "generating" | "ready";
  data: any;
}

/* -------------------------------------------------------------------------- */
/*  Page component                                                             */
/* -------------------------------------------------------------------------- */

export default function GuidePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  // TODO: Load actual project from Firestore
  const project = useRef<any>({
    title: "Untitled Project",
    drivingQuestion: { selected: "" },
  });

  const [materials, setMaterials] = useState<Record<string, MaterialState>>(
    () => {
      const initial: Record<string, MaterialState> = {};
      for (const mt of materialTypes) {
        initial[mt.id] = { status: "idle", data: null };
      }
      return initial;
    }
  );

  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(
    null
  );
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const handleDownload = useCallback(
    async (materialId: string) => {
      const material = materials[materialId];
      if (!material?.data) return;

      const projectTitle = project.current.title ?? "Untitled Project";
      const drivingQuestion =
        project.current.drivingQuestion?.selected ?? "";

      try {
        const response = await fetch("/api/pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: materialId,
            data: material.data,
            project: { title: projectTitle, drivingQuestion },
          }),
        });

        if (!response.ok) {
          throw new Error("PDF generation failed");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${materialId}-${projectTitle.replace(/\s+/g, "-")}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("PDF download error:", error);
      }
    },
    [materials]
  );

  const generateMaterial = useCallback(
    async (materialId: string, bodyOverrides?: Record<string, unknown>) => {
      const mt = materialTypes.find((m) => m.id === materialId);
      if (!mt) return;

      setMaterials((prev) => ({
        ...prev,
        [materialId]: { status: "generating", data: null },
      }));

      try {
        const body = { ...mt.apiBody(project.current), ...bodyOverrides };
        const response = await fetch(mt.apiRoute, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(
            await getErrorMessageFromResponse(response, "Generation failed")
          );
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
        }

        const parsed = parseGeminiJSON(accumulated);

        setMaterials((prev) => ({
          ...prev,
          [materialId]: { status: "ready", data: parsed },
        }));
        setSelectedMaterialId(materialId);
      } catch {
        // Reset to idle on error so user can retry
        setMaterials((prev) => ({
          ...prev,
          [materialId]: { status: "idle", data: null },
        }));
      }
    },
    []
  );

  const handleGenerate = useCallback(
    (materialId: string) => {
      if (materialId === "calendar") {
        setCalendarModalOpen(true);
        return;
      }
      generateMaterial(materialId);
    },
    [generateMaterial]
  );

  const handleCalendarSubmit = useCallback(
    (options: { classMinutes: number; classesPerWeek: number }) => {
      generateMaterial("calendar", options);
    },
    [generateMaterial]
  );

  const hasReadyMaterials = Object.values(materials).some(
    (m) => m.status === "ready"
  );

  const selectedMaterial = selectedMaterialId
    ? materials[selectedMaterialId]
    : null;
  const selectedType = selectedMaterialId
    ? materialTypes.find((m) => m.id === selectedMaterialId)
    : null;

  /* ---------------------------------------------------------------------- */
  /*  Render preview                                                         */
  /* ---------------------------------------------------------------------- */

  function renderPreview() {
    if (!selectedMaterialId || !selectedMaterial) {
      return (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-neutral-500">
              Select a material to preview, or click Generate to create one.
            </p>
          </CardContent>
        </Card>
      );
    }

    if (selectedMaterial.status !== "ready") {
      return (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-neutral-500">
              Click Generate to create this material.
            </p>
          </CardContent>
        </Card>
      );
    }

    const data = selectedMaterial.data;

    if (selectedMaterialId === "calendar") {
      return <CalendarPreview data={data} />;
    }

    if (
      selectedMaterialId === "product-rubric" ||
      selectedMaterialId === "process-rubric"
    ) {
      return <RubricPreview data={data} />;
    }

    // All handout types
    const handoutType =
      selectedMaterialId === "student-brief"
        ? "student-brief"
        : selectedMaterialId === "reflection-journal"
          ? "reflection-journal"
          : selectedMaterialId === "critique-protocol"
            ? "critique-protocol"
            : selectedMaterialId === "parent-letter"
              ? "parent-letter"
              : selectedMaterialId === "milestone-tracker"
                ? "milestone-tracker"
                : selectedMaterialId;

    return <HandoutPreview data={data} type={handoutType} />;
  }

  /* ---------------------------------------------------------------------- */
  /*  Sidebar                                                                */
  /* ---------------------------------------------------------------------- */

  const sidebar = materialTypes.map((mt) => (
    <MaterialCard
      key={mt.id}
      name={mt.name}
      description={mt.description}
      icon={mt.icon}
      status={materials[mt.id].status}
      isSelected={selectedMaterialId === mt.id}
      onGenerate={() => handleGenerate(mt.id)}
      onSelect={() => setSelectedMaterialId(mt.id)}
      onDownload={
        materials[mt.id].status === "ready"
          ? () => handleDownload(mt.id)
          : undefined
      }
    />
  ));

  return (
    <>
      <GuideLayout
        projectId={projectId}
        projectTitle={project.current.title ?? "Untitled Project"}
        drivingQuestion={
          project.current.drivingQuestion?.selected ?? "No driving question set"
        }
        sidebar={sidebar}
        hasReadyMaterials={hasReadyMaterials}
      >
        {renderPreview()}
      </GuideLayout>
      <CalendarOptionsModal
        open={calendarModalOpen}
        onOpenChange={setCalendarModalOpen}
        onSubmit={handleCalendarSubmit}
      />
    </>
  );
}
