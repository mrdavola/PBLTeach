"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { goldStandard } from "@/lib/data/frameworks";
import { cn } from "@/lib/utils";

interface GoldStandardGaugeProps {
  elementsIncluded: number[]; // Array of element numbers (1-7) that are present
  size?: number; // SVG size, default 180
  className?: string;
  onElementClick?: (elementNumber: number) => void; // Click empty segment
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

const TOTAL_SEGMENTS = 7;
const GAP_DEGREES = 5.7;
const SEGMENT_DEGREES = (360 - GAP_DEGREES * TOTAL_SEGMENTS) / TOTAL_SEGMENTS;

function getScoreLabel(score: number): string {
  if (score === 0) return "Add elements to get started";
  if (score <= 2) return "Great start";
  if (score <= 4) return "Getting stronger";
  if (score <= 6) return "Robust project";
  return "Gold Standard";
}

export function GoldStandardGauge({
  elementsIncluded,
  size = 180,
  className,
  onElementClick,
}: GoldStandardGaugeProps) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    present: boolean;
    x: number;
    y: number;
  } | null>(null);

  const score = elementsIncluded.length;
  const label = getScoreLabel(score);
  const isGoldStandard = score === 7;

  const handleSegmentHover = useCallback(
    (e: React.MouseEvent, elementNumber: number) => {
      const element = goldStandard.find((el) => el.number === elementNumber);
      if (!element) return;
      const rect = (
        e.currentTarget.closest("svg") as SVGSVGElement
      )?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        text: element.name,
        present: elementsIncluded.includes(elementNumber),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [elementsIncluded]
  );

  const handleSegmentLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleSegmentClick = useCallback(
    (elementNumber: number) => {
      if (!elementsIncluded.includes(elementNumber) && onElementClick) {
        onElementClick(elementNumber);
      }
    },
    [elementsIncluded, onElementClick]
  );

  const segments = Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
    const elementNumber = i + 1;
    const startAngle = i * (SEGMENT_DEGREES + GAP_DEGREES);
    const endAngle = startAngle + SEGMENT_DEGREES;
    const isFilled = elementsIncluded.includes(elementNumber);
    const path = describeArc(50, 50, 38, startAngle, endAngle);

    return { elementNumber, path, isFilled };
  });

  const gaugeContent = (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`Gold Standard gauge: ${score} of 7 elements included. ${label}.`}
      className="overflow-visible"
    >
      <defs>
        <linearGradient id="gauge-teal-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D7377" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>

      {/* Segments */}
      {segments.map(({ elementNumber, path, isFilled }) =>
        isFilled ? (
          <motion.path
            key={elementNumber}
            d={path}
            fill="none"
            stroke="url(#gauge-teal-gradient)"
            strokeWidth={6}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="cursor-default"
            onMouseMove={(e) =>
              handleSegmentHover(
                e as unknown as React.MouseEvent,
                elementNumber
              )
            }
            onMouseLeave={handleSegmentLeave}
          />
        ) : (
          <path
            key={elementNumber}
            d={path}
            fill="none"
            stroke="#d4d4d4"
            strokeWidth={6}
            strokeLinecap="round"
            className={cn(onElementClick && "cursor-pointer")}
            onClick={() => handleSegmentClick(elementNumber)}
            onMouseMove={(e) => handleSegmentHover(e, elementNumber)}
            onMouseLeave={handleSegmentLeave}
          />
        )
      )}

      {/* Center text */}
      <text
        x="50"
        y="46"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-display font-bold"
        fill="#171717"
        fontSize="16"
      >
        {score}/7
      </text>
      <text
        x="50"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-body"
        fill="#737373"
        fontSize={score === 0 ? "4" : "5"}
      >
        {label}
      </text>
    </svg>
  );

  return (
    <div className={cn("relative inline-block", className)}>
      {isGoldStandard ? (
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {gaugeContent}
        </motion.div>
      ) : (
        gaugeContent
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 rounded-md bg-neutral-900 px-3 py-1.5 text-xs text-white"
          style={{
            left: tooltip.x,
            top: tooltip.y - 36,
            transform: "translateX(-50%)",
          }}
        >
          <span>{tooltip.text}</span>
          <span className="ml-1.5 opacity-70">
            {tooltip.present ? "(included)" : "(missing)"}
          </span>
        </div>
      )}
    </div>
  );
}
