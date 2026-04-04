"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  count?: number;
  interactive?: boolean;
  onRate?: (score: number) => void;
  size?: "sm" | "md";
}

export function StarRating({
  rating,
  count,
  interactive = false,
  onRate,
  size = "md",
}: StarRatingProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const sizeClass = size === "sm" ? "size-4" : "size-5";
  const displayRating = hoverIndex !== null ? hoverIndex : Math.round(rating);

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Star rating">
      <div
        className="flex items-center"
        onMouseLeave={() => {
          if (interactive) setHoverIndex(null);
        }}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayRating;
          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
              className={cn(
                "p-0 border-0 bg-transparent",
                interactive && "cursor-pointer hover:scale-110 transition-transform",
                !interactive && "cursor-default"
              )}
              onMouseEnter={() => {
                if (interactive) setHoverIndex(star);
              }}
              onClick={() => {
                if (interactive && onRate) onRate(star);
              }}
            >
              <Star
                className={cn(
                  sizeClass,
                  filled
                    ? "fill-amber-400 text-amber-400"
                    : "text-neutral-300"
                )}
              />
            </button>
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
