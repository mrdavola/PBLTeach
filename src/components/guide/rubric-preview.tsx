"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const levels = ["Beginning", "Developing", "Proficient", "Exemplary"] as const;

interface RubricCriterion {
  criterion: string;
  levels: {
    beginning: string;
    developing: string;
    proficient: string;
    exemplary: string;
  };
}

interface RubricData {
  title?: string;
  type?: "product" | "process";
  criteria?: RubricCriterion[];
}

interface RubricPreviewProps {
  data: RubricData;
}

export function RubricPreview({ data }: RubricPreviewProps) {
  if (!data || !Array.isArray(data.criteria) || data.criteria.length === 0) {
    return (
      <p className="text-center text-neutral-500 py-12">
        No rubric data available.
      </p>
    );
  }

  const levelKeys = ["beginning", "developing", "proficient", "exemplary"] as const;

  return (
    <div>
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        {data.title && (
          <h2 className="font-display font-bold text-xl text-neutral-900">
            {data.title}
          </h2>
        )}
        {data.type && (
          <Badge variant="default">
            {data.type === "product" ? "Product" : "Process"}
          </Badge>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-brand-teal text-white font-display font-bold text-left px-4 py-3 rounded-tl-lg">
                Criterion
              </th>
              {levels.map((level, i) => (
                <th
                  key={level}
                  className={cn(
                    "bg-brand-teal text-white font-display font-bold text-left px-4 py-3",
                    i === levels.length - 1 && "rounded-tr-lg"
                  )}
                >
                  {level}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.criteria.map((row, idx) => (
              <tr
                key={idx}
                className={cn(
                  "border-b border-neutral-300",
                  idx % 2 === 1 && "bg-neutral-100"
                )}
              >
                <td className="px-4 py-3 font-medium text-neutral-900 align-top">
                  {row.criterion}
                </td>
                {levelKeys.map((key) => (
                  <td
                    key={key}
                    className="px-4 py-3 text-neutral-700 align-top"
                  >
                    {row.levels[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {data.criteria.map((row, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-neutral-300 bg-white overflow-hidden"
          >
            <div className="bg-brand-teal px-4 py-2">
              <h3 className="font-display font-bold text-white text-sm">
                {row.criterion}
              </h3>
            </div>
            <div className="divide-y divide-neutral-200">
              {levelKeys.map((key, i) => (
                <div key={key} className="px-4 py-2.5">
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    {levels[i]}
                  </span>
                  <p className="text-sm text-neutral-700 mt-0.5">
                    {row.levels[key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
