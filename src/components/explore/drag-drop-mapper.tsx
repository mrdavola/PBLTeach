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
import { phases } from "@/lib/data/phases";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

interface Activity {
  id: string;
  text: string;
  correctPhase: number; // 1-5
}

const activities: Activity[] = [
  { id: "a1", text: "Students watch a documentary about ocean pollution", correctPhase: 1 },
  { id: "a2", text: "Teams research local water quality data from the EPA", correctPhase: 2 },
  { id: "a3", text: "Class creates a 'Need to Know' list on the whiteboard", correctPhase: 3 },
  { id: "a4", text: "Groups build a water filtration prototype", correctPhase: 4 },
  { id: "a5", text: "Students present solutions to a panel of community members", correctPhase: 5 },
  { id: "a6", text: "Students interview a local environmental scientist", correctPhase: 2 },
];

// ---------- Draggable card ----------

function DraggableCard({
  activity,
  isPlaced,
  isSelected,
  onTap,
}: {
  activity: Activity;
  isPlaced: boolean;
  isSelected: boolean;
  onTap: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: activity.id,
    disabled: isPlaced,
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  if (isPlaced) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onTap}
      className={cn(
        "cursor-grab select-none rounded-lg border bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm transition-all",
        isDragging && "z-50 shadow-lg opacity-50",
        isSelected && "ring-2 ring-brand-teal border-brand-teal",
        !isPlaced && !isDragging && "hover:shadow-md"
      )}
    >
      {activity.text}
    </div>
  );
}

// ---------- Activity card used in overlay & drop zone ----------

function ActivityCardStatic({ activity }: { activity: Activity }) {
  return (
    <div className="rounded-lg border bg-white px-4 py-3 text-sm text-neutral-700 shadow-lg">
      {activity.text}
    </div>
  );
}

// ---------- Drop zone ----------

function DropZone({
  phaseNumber,
  placedActivities,
  onTapZone,
  flashCorrect,
}: {
  phaseNumber: number;
  placedActivities: Activity[];
  onTapZone: () => void;
  flashCorrect: string | null; // activity id that just got placed correctly
}) {
  const phase = phases[phaseNumber - 1];
  const { isOver, setNodeRef } = useDroppable({ id: `zone-${phaseNumber}` });

  return (
    <div
      ref={setNodeRef}
      onClick={onTapZone}
      className={cn(
        "relative min-h-[80px] rounded-xl border-2 p-3 transition-all",
        placedActivities.length > 0 ? "border-solid" : "border-dashed",
        isOver && "scale-[1.02] shadow-md"
      )}
      style={{
        borderColor: phase.color,
        backgroundColor: isOver ? phase.colorLight : placedActivities.length > 0 ? `${phase.colorLight}80` : "transparent",
      }}
    >
      <span
        className="mb-2 block text-xs font-semibold"
        style={{ color: phase.color }}
      >
        Phase {phaseNumber}: {phase.name}
      </span>

      {placedActivities.length === 0 && (
        <span className="text-xs text-neutral-400">Drop activity here</span>
      )}

      <div className="space-y-2">
        {placedActivities.map((a) => (
          <div key={a.id} className="relative">
            {flashCorrect === a.id && (
              <motion.div
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-lg bg-green-400/30"
              />
            )}
            <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-700">
              {a.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Main component ----------

export function DragDropMapper() {
  const [placements, setPlacements] = useState<Record<string, number>>({}); // activityId -> phaseNumber
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [flashCorrectId, setFlashCorrectId] = useState<string | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null); // for mobile tap-to-select

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const correctCount = Object.entries(placements).filter(([actId, phaseNum]) => {
    const activity = activities.find((a) => a.id === actId);
    return activity && activity.correctPhase === phaseNum;
  }).length;

  const placedIds = new Set(Object.keys(placements));

  const tryPlace = useCallback(
    (activityId: string, phaseNumber: number) => {
      const activity = activities.find((a) => a.id === activityId);
      if (!activity) return;

      if (activity.correctPhase === phaseNumber) {
        setPlacements((prev) => ({ ...prev, [activityId]: phaseNumber }));
        setFlashCorrectId(activityId);
        setTimeout(() => setFlashCorrectId(null), 800);
      } else {
        // shake
        setShakeId(activityId);
        setTimeout(() => setShakeId(null), 500);
      }
      setSelectedId(null);
    },
    []
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
    setSelectedId(null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragId(null);
      const { active, over } = event;
      if (!over) return;

      const activityId = active.id as string;
      const zoneId = over.id as string;
      if (!zoneId.startsWith("zone-")) return;

      const phaseNumber = parseInt(zoneId.replace("zone-", ""), 10);
      tryPlace(activityId, phaseNumber);
    },
    [tryPlace]
  );

  const handleTapActivity = useCallback(
    (activityId: string) => {
      setSelectedId((prev) => (prev === activityId ? null : activityId));
    },
    []
  );

  const handleTapZone = useCallback(
    (phaseNumber: number) => {
      if (!selectedId) return;
      tryPlace(selectedId, phaseNumber);
    },
    [selectedId, tryPlace]
  );

  const reset = useCallback(() => {
    setPlacements({});
    setSelectedId(null);
    setShakeId(null);
    setFlashCorrectId(null);
  }, []);

  const activeActivity = activeDragId ? activities.find((a) => a.id === activeDragId) : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        {/* Score & Reset */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-700">
            {correctCount} of {activities.length} placed correctly
          </p>
          {correctCount > 0 && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
            >
              <RotateCcw className="size-3" />
              Reset
            </button>
          )}
        </div>

        {/* Activity cards pool */}
        <div className="space-y-2">
          <AnimatePresence>
            {activities
              .filter((a) => !placedIds.has(a.id))
              .map((a) => (
                <motion.div
                  key={a.id}
                  layout
                  exit={{ opacity: 0, scale: 0.95 }}
                  animate={
                    shakeId === a.id
                      ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
                      : { x: 0 }
                  }
                  transition={shakeId === a.id ? { duration: 0.4 } : { duration: 0.2 }}
                >
                  <DraggableCard
                    activity={a}
                    isPlaced={false}
                    isSelected={selectedId === a.id}
                    onTap={() => handleTapActivity(a.id)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>

          {placedIds.size === activities.length && (
            <p className="py-4 text-center text-sm font-medium text-green-700">
              All activities placed! Great work.
            </p>
          )}
        </div>

        {/* Mobile hint */}
        {selectedId && (
          <p className="text-center text-xs text-brand-teal md:hidden">
            Now tap a phase below to place it
          </p>
        )}

        {/* Drop zones */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((p) => (
            <DropZone
              key={p.number}
              phaseNumber={p.number}
              placedActivities={activities.filter(
                (a) => placements[a.id] === p.number
              )}
              onTapZone={() => handleTapZone(p.number)}
              flashCorrect={flashCorrectId}
            />
          ))}
        </div>
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeActivity ? <ActivityCardStatic activity={activeActivity} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
