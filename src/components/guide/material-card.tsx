"use client";

import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MaterialCardProps {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "idle" | "generating" | "ready";
  isSelected: boolean;
  onGenerate: () => void;
  onSelect: () => void;
}

export function MaterialCard({
  name,
  description,
  icon: Icon,
  status,
  isSelected,
  onGenerate,
  onSelect,
}: MaterialCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        if (status === "ready") onSelect();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && status === "ready") onSelect();
      }}
      className={cn(
        "flex flex-col gap-1.5 rounded-lg border border-neutral-300 p-3 transition-all duration-200",
        status === "ready" && "cursor-pointer hover:shadow-card-hover",
        isSelected && "border-l-4 border-l-brand-teal bg-brand-teal-light/50"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="size-5 shrink-0 text-neutral-500" />
          <span className="font-medium text-sm text-neutral-900 truncate">
            {name}
          </span>
        </div>

        <div className="shrink-0">
          {status === "idle" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onGenerate();
              }}
            >
              Generate
            </Button>
          )}
          {status === "generating" && (
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <Loader2 className="size-4 animate-spin" />
              Generating...
            </span>
          )}
          {status === "ready" && (
            <div className="flex items-center gap-1.5">
              <Check className="size-4 text-success" />
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
              >
                View
              </Button>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-neutral-500 pl-7">{description}</p>
    </div>
  );
}
