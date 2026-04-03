"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

interface Task {
  id: string;
  text: string;
  suggested: "human" | "ai" | "either";
}

const tasks: Task[] = [
  { id: "1", text: "Write the driving question", suggested: "human" },
  { id: "2", text: "Generate research topic ideas", suggested: "ai" },
  { id: "3", text: "Decide the public product format", suggested: "human" },
  { id: "4", text: "Create a rubric", suggested: "ai" },
  { id: "5", text: "Facilitate peer critique", suggested: "human" },
  { id: "6", text: "Draft a day-by-day calendar", suggested: "ai" },
  { id: "7", text: "Build relationships with community partners", suggested: "human" },
  { id: "8", text: "Generate reflection prompts", suggested: "either" },
];

type Zone = "human" | "ai" | "either";

const zones: { id: Zone; label: string; color: string; bg: string }[] = [
  { id: "human", label: "Human should do this", color: "border-brand-coral", bg: "bg-brand-coral-light/50" },
  { id: "ai", label: "AI can help", color: "border-brand-teal", bg: "bg-brand-teal-light/50" },
  { id: "either", label: "Either/both", color: "border-brand-purple", bg: "bg-brand-purple-light/50" },
];

// ---------- Draggable card ----------

function DraggableCard({
  task,
  isSelected,
  onTap,
}: {
  task: Task;
  isSelected: boolean;
  onTap: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onTap}
      className={cn(
        "cursor-grab select-none rounded-lg border bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm transition-all",
        isDragging && "z-50 opacity-50 shadow-lg",
        isSelected && "ring-2 ring-brand-teal border-brand-teal",
        !isDragging && "hover:shadow-md"
      )}
    >
      {task.text}
    </div>
  );
}

function TaskCardStatic({ task }: { task: Task }) {
  return (
    <div className="rounded-lg border bg-white px-4 py-3 text-sm text-neutral-700 shadow-lg">
      {task.text}
    </div>
  );
}

// ---------- Drop zone ----------

function DropZone({
  zone,
  placedTasks,
  onTapZone,
  showResults,
}: {
  zone: (typeof zones)[number];
  placedTasks: Task[];
  onTapZone: () => void;
  showResults: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: `zone-${zone.id}` });

  return (
    <div
      ref={setNodeRef}
      onClick={onTapZone}
      className={cn(
        "min-h-[80px] rounded-xl border-2 border-dashed p-3 transition-all",
        zone.color,
        placedTasks.length > 0 && "border-solid",
        isOver && cn("scale-[1.02] shadow-md", zone.bg)
      )}
    >
      <span
        className={cn(
          "mb-2 block text-xs font-semibold",
          zone.id === "human" && "text-brand-coral",
          zone.id === "ai" && "text-brand-teal",
          zone.id === "either" && "text-brand-purple"
        )}
      >
        {zone.label}
      </span>

      {placedTasks.length === 0 && (
        <span className="text-xs text-neutral-400">Drop tasks here</span>
      )}

      <div className="space-y-2">
        {placedTasks.map((t) => {
          const agrees = t.suggested === zone.id;
          return (
            <div
              key={t.id}
              className={cn(
                "rounded-lg border bg-white px-3 py-2 text-xs text-neutral-700",
                showResults && agrees && "border-green-400 bg-green-50",
                showResults && !agrees && "border-amber-400 bg-amber-50"
              )}
            >
              {t.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Main component ----------

export function AiRoleSorter() {
  const [placements, setPlacements] = useState<Record<string, Zone>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const placedIds = new Set(Object.keys(placements));
  const allPlaced = placedIds.size === tasks.length;

  const place = useCallback((taskId: string, zone: Zone) => {
    setPlacements((prev) => ({ ...prev, [taskId]: zone }));
    setSelectedId(null);
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
    setSelectedId(null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragId(null);
      const { active, over } = event;
      if (!over) return;

      const taskId = active.id as string;
      const zoneId = (over.id as string).replace("zone-", "") as Zone;
      if (!["human", "ai", "either"].includes(zoneId)) return;

      place(taskId, zoneId);
    },
    [place]
  );

  const handleTapTask = useCallback((taskId: string) => {
    setSelectedId((prev) => (prev === taskId ? null : taskId));
  }, []);

  const handleTapZone = useCallback(
    (zone: Zone) => {
      if (!selectedId) return;
      place(selectedId, zone);
    },
    [selectedId, place]
  );

  const reset = useCallback(() => {
    setPlacements({});
    setSelectedId(null);
    setShowResults(false);
  }, []);

  const activeTask = activeDragId
    ? tasks.find((t) => t.id === activeDragId)
    : null;

  const agreementCount = Object.entries(placements).filter(([id, zone]) => {
    const task = tasks.find((t) => t.id === id);
    return task && task.suggested === zone;
  }).length;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        {/* Unsorted cards */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-600">
            Drag each task to the right zone (or tap to select, then tap a zone):
          </p>
          <AnimatePresence>
            {tasks
              .filter((t) => !placedIds.has(t.id))
              .map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <DraggableCard
                    task={t}
                    isSelected={selectedId === t.id}
                    onTap={() => handleTapTask(t.id)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>

          {allPlaced && !showResults && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2 text-center"
            >
              <button
                onClick={() => setShowResults(true)}
                className="rounded-lg bg-brand-teal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-teal-dark"
              >
                See our suggestion
              </button>
            </motion.div>
          )}
        </div>

        {/* Mobile hint */}
        {selectedId && (
          <p className="text-center text-xs text-brand-teal md:hidden">
            Now tap a zone below to place it
          </p>
        )}

        {/* Drop zones */}
        <div className="grid gap-3 sm:grid-cols-3">
          {zones.map((z) => (
            <DropZone
              key={z.id}
              zone={z}
              placedTasks={tasks.filter((t) => placements[t.id] === z.id)}
              onTapZone={() => handleTapZone(z.id)}
              showResults={showResults}
            />
          ))}
        </div>

        {/* Results explanation */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5"
            >
              <p className="text-sm font-semibold text-neutral-800">
                You agreed with our suggestions on {agreementCount} of{" "}
                {tasks.length} tasks.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                Tasks requiring judgment, relationships, and student
                understanding stay human.{" "}
                <span className="font-medium text-brand-teal">
                  Content generation and formatting can be AI-assisted.
                </span>{" "}
                Some tasks truly work either way.
              </p>
              <div className="flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block size-3 rounded border-2 border-green-400 bg-green-50" />
                  Agreement
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block size-3 rounded border-2 border-amber-400 bg-amber-50" />
                  Different view
                </span>
              </div>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                <RotateCcw className="size-3" />
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeTask ? <TaskCardStatic task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
