"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SUBJECT_COLORS = [
  { bg: "#0D9488", text: "#ffffff" }, // teal
  { bg: "#F97316", text: "#ffffff" }, // coral/orange
  { bg: "#6366F1", text: "#ffffff" }, // indigo
  { bg: "#F59E0B", text: "#1a1a1a" }, // amber
  { bg: "#A855F7", text: "#ffffff" }, // purple
  { bg: "#EC4899", text: "#ffffff" }, // pink
];

interface TimelineUnit {
  title: string;
  weekRange: [number, number];
}

interface TimelineDocument {
  subject: string;
  gradeLevel: string;
  units: TimelineUnit[];
}

interface TimelineOpportunity {
  weekRange: [number, number];
  subjects: string[];
}

interface CurriculumTimelineProps {
  documents: TimelineDocument[];
  opportunities?: TimelineOpportunity[];
  totalWeeks?: number;
  onOverlapClick?: (opportunityIndex: number) => void;
}

const ROW_HEIGHT = 52;
const HEADER_HEIGHT = 32;
const LEFT_MARGIN = 120;
const RIGHT_MARGIN = 16;
const TOP_MARGIN = 8;
const BAR_HEIGHT = 32;
const BAR_GAP = 10;

export function CurriculumTimeline({
  documents,
  opportunities = [],
  totalWeeks = 36,
  onOverlapClick,
}: CurriculumTimelineProps) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const width = 900;
  const chartWidth = width - LEFT_MARGIN - RIGHT_MARGIN;
  const height =
    TOP_MARGIN + HEADER_HEIGHT + documents.length * ROW_HEIGHT + 16;

  function weekToX(week: number): number {
    return LEFT_MARGIN + ((week - 1) / totalWeeks) * chartWidth;
  }

  function weekWidth(start: number, end: number): number {
    return ((end - start + 1) / totalWeeks) * chartWidth;
  }

  // Tick marks every 4 weeks
  const ticks: number[] = [];
  for (let w = 1; w <= totalWeeks; w += 4) {
    ticks.push(w);
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-neutral-200 bg-white">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[700px] w-full"
        role="img"
        aria-label="Curriculum timeline"
      >
        {/* Week axis */}
        {ticks.map((w) => (
          <g key={`tick-${w}`}>
            <line
              x1={weekToX(w)}
              y1={TOP_MARGIN + HEADER_HEIGHT - 4}
              x2={weekToX(w)}
              y2={height - 8}
              stroke="#e5e5e5"
              strokeWidth={1}
            />
            <text
              x={weekToX(w)}
              y={TOP_MARGIN + HEADER_HEIGHT - 8}
              textAnchor="middle"
              className="fill-neutral-400"
              fontSize={10}
              fontFamily="system-ui, sans-serif"
            >
              W{w}
            </text>
          </g>
        ))}

        {/* Subject rows */}
        {documents.map((doc, rowIndex) => {
          const rowY =
            TOP_MARGIN + HEADER_HEIGHT + rowIndex * ROW_HEIGHT + BAR_GAP;
          const color = SUBJECT_COLORS[rowIndex % SUBJECT_COLORS.length];

          return (
            <g key={doc.subject + rowIndex}>
              {/* Subject label */}
              <text
                x={LEFT_MARGIN - 8}
                y={rowY + BAR_HEIGHT / 2 + 4}
                textAnchor="end"
                fontSize={12}
                fontWeight={600}
                className="fill-neutral-700"
                fontFamily="system-ui, sans-serif"
              >
                {doc.subject}
              </text>

              {/* Row background */}
              <rect
                x={LEFT_MARGIN}
                y={rowY - BAR_GAP / 2}
                width={chartWidth}
                height={ROW_HEIGHT}
                fill={rowIndex % 2 === 0 ? "#fafafa" : "#ffffff"}
                rx={4}
              />

              {/* Unit bars */}
              {doc.units.map((unit, unitIndex) => {
                const x = weekToX(unit.weekRange[0]);
                const w = weekWidth(unit.weekRange[0], unit.weekRange[1]);
                const maxTextWidth = w - 8;

                return (
                  <motion.g
                    key={unit.title + unitIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: rowIndex * 0.1 + unitIndex * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <rect
                      x={x}
                      y={rowY}
                      width={w}
                      height={BAR_HEIGHT}
                      fill={color.bg}
                      rx={6}
                      className="cursor-pointer"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          text: `${unit.title} (Weeks ${unit.weekRange[0]}-${unit.weekRange[1]})`,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                    {maxTextWidth > 20 && (
                      <text
                        x={x + 6}
                        y={rowY + BAR_HEIGHT / 2 + 4}
                        fontSize={10}
                        fill={color.text}
                        fontFamily="system-ui, sans-serif"
                        fontWeight={500}
                      >
                        <tspan>
                          {unit.title.length > maxTextWidth / 6
                            ? unit.title.slice(0, Math.floor(maxTextWidth / 6)) +
                              "..."
                            : unit.title}
                        </tspan>
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </g>
          );
        })}

        {/* Opportunity overlays */}
        {opportunities.map((opp, i) => {
          const x = weekToX(opp.weekRange[0]);
          const w = weekWidth(opp.weekRange[0], opp.weekRange[1]);

          return (
            <motion.rect
              key={`opp-${i}`}
              x={x}
              y={TOP_MARGIN + HEADER_HEIGHT}
              width={w}
              height={documents.length * ROW_HEIGHT}
              fill="#0D9488"
              opacity={0.15}
              rx={4}
              className="cursor-pointer"
              onClick={() => onOverlapClick?.(i)}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          );
        })}
      </svg>

      {/* Tooltip rendered outside SVG for better styling */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-md bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg"
          style={{
            left: tooltip.x,
            top: tooltip.y - 32,
            transform: "translateX(-50%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
