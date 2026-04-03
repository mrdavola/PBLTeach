"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  front: string;
  back: string;
  frontLabel?: string;
  backLabel?: string;
}

export function FlipCard({ front, back, frontLabel, backLabel }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const toggle = useCallback(() => setFlipped((prev) => !prev), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      aria-label={
        flipped
          ? `Showing: ${back}. Click to flip back.`
          : `Showing: ${front}. Click to flip.`
      }
      className="min-h-[160px] w-full cursor-pointer [perspective:1000px]"
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-5 text-center text-neutral-700 [backface-visibility:hidden]">
          {frontLabel && (
            <span className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              {frontLabel}
            </span>
          )}
          <p className="text-sm font-medium leading-snug">{front}</p>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-brand-teal bg-brand-teal-light px-4 py-5 text-center text-brand-teal-dark [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {backLabel && (
            <span className="mb-2 text-xs font-medium uppercase tracking-wide text-brand-teal">
              {backLabel}
            </span>
          )}
          <p className="text-sm font-medium leading-snug">{back}</p>
        </div>
      </div>
    </div>
  );
}
