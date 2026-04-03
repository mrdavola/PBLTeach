"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Answer = "yes" | "no" | null;

export function ScenarioHook() {
  const [answer, setAnswer] = useState<Answer>(null);

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-6 text-lg leading-relaxed text-neutral-700">
        Your colleague assigns a poster project after a unit on the American
        Revolution. Students research a topic, create a poster, and present it
        to the class.{" "}
        <span className="font-display font-bold text-neutral-900">
          Is this PBL?
        </span>
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setAnswer("yes")}
          disabled={answer !== null}
          className={cn(
            "rounded-lg border px-6 py-2.5 text-sm font-medium transition-all duration-200",
            answer === null
              ? "border-neutral-300 bg-white text-neutral-700 hover:border-brand-teal hover:bg-brand-teal-light"
              : answer === "yes"
                ? "border-brand-coral bg-brand-coral-light text-brand-coral"
                : "border-neutral-300 bg-neutral-100 text-neutral-400",
          )}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setAnswer("no")}
          disabled={answer !== null}
          className={cn(
            "rounded-lg border px-6 py-2.5 text-sm font-medium transition-all duration-200",
            answer === null
              ? "border-neutral-300 bg-white text-neutral-700 hover:border-brand-teal hover:bg-brand-teal-light"
              : answer === "no"
                ? "border-brand-teal bg-brand-teal-light text-brand-teal-dark"
                : "border-neutral-300 bg-neutral-100 text-neutral-400",
          )}
        >
          No
        </button>
      </div>

      <AnimatePresence>
        {answer !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ overflow: "hidden" }}
          >
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-neutral-300 bg-white p-5">
              {answer === "no" ? (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-teal-light">
                  <Check className="size-4 text-brand-teal" />
                </div>
              ) : (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-coral-light">
                  <X className="size-4 text-brand-coral" />
                </div>
              )}
              <p className="text-sm leading-relaxed text-neutral-700">
                {answer === "no" ? (
                  <>
                    <span className="font-display font-bold text-brand-teal-dark">
                      Correct!
                    </span>{" "}
                    This is &ldquo;doing a project&rdquo; &mdash; the project
                    comes AFTER the learning, not THROUGH it. In PBL, the
                    project IS the unit.
                  </>
                ) : (
                  <>
                    <span className="font-display font-bold text-brand-coral">
                      Not quite!
                    </span>{" "}
                    This is a common misconception. This is &ldquo;doing a
                    project&rdquo; &mdash; the poster comes after the unit is
                    taught. In PBL, students learn THROUGH the project, not
                    before it.
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
