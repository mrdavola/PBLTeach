"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { alphabetSoup } from "@/lib/data/alphabet-soup";
import { cn } from "@/lib/utils";

const properties = [
  { key: "duration", label: "Duration" },
  { key: "whoDrives", label: "Who Drives" },
  { key: "hasProduct", label: "Product?" },
  { key: "keyDistinction", label: "Key Distinction" },
] as const;

type PropKey = (typeof properties)[number]["key"];

export function ComparisonTool() {
  const [leftIndex, setLeftIndex] = useState(0); // Project-Based Learning
  const [rightIndex, setRightIndex] = useState(1); // Problem-Based Learning

  const left = alphabetSoup[leftIndex];
  const right = alphabetSoup[rightIndex];

  const bothSelected = left && right;

  function swap() {
    setLeftIndex(rightIndex);
    setRightIndex(leftIndex);
  }

  return (
    <div className="space-y-6">
      {/* Selects row */}
      <div className="flex items-center gap-3">
        <label className="sr-only" htmlFor="compare-left">First approach</label>
        <select
          id="compare-left"
          value={leftIndex}
          onChange={(e) => setLeftIndex(Number(e.target.value))}
          className="h-11 flex-1 rounded-lg border border-neutral-300 bg-white px-3 font-body text-sm text-neutral-700 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
        >
          {alphabetSoup.map((a, i) => (
            <option key={a.name} value={i}>
              {a.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={swap}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-brand-teal"
          aria-label="Swap approaches"
        >
          <ArrowLeftRight className="size-4" />
        </button>

        <label className="sr-only" htmlFor="compare-right">Second approach</label>
        <select
          id="compare-right"
          value={rightIndex}
          onChange={(e) => setRightIndex(Number(e.target.value))}
          className="h-11 flex-1 rounded-lg border border-neutral-300 bg-white px-3 font-body text-sm text-neutral-700 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
        >
          {alphabetSoup.map((a, i) => (
            <option key={a.name} value={i}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Comparison table */}
      <AnimatePresence mode="wait">
        {bothSelected && (
          <motion.div
            key={`${leftIndex}-${rightIndex}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="overflow-x-auto rounded-xl border border-neutral-200"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-600">
                    Property
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    {left.name}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    {right.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties.map((prop) => {
                  const lVal = left[prop.key as PropKey];
                  const rVal = right[prop.key as PropKey];
                  const differs = lVal !== rVal;

                  return (
                    <tr
                      key={prop.key}
                      className="border-b border-neutral-100 last:border-b-0"
                    >
                      <td className="px-4 py-3 font-medium text-neutral-600">
                        {prop.label}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-3 text-neutral-700",
                          differs && "bg-brand-teal-light"
                        )}
                      >
                        {lVal}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-3 text-neutral-700",
                          differs && "bg-brand-teal-light"
                        )}
                      >
                        {rVal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
