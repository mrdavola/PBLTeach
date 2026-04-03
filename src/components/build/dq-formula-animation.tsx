"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RoleIcon,
  ActionIcon,
  ProductIcon,
  AudienceIcon,
  PurposeIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface DQFormulaAnimationProps {
  formula: {
    role: string;
    action: string;
    product: string;
    audience: string;
    purpose: string;
  };
  onComplete?: () => void;
}

const SLOT_KEYS = ["role", "action", "product", "audience", "purpose"] as const;

const SLOT_CONFIG = {
  role: { label: "Role", Icon: RoleIcon },
  action: { label: "Action", Icon: ActionIcon },
  product: { label: "Product", Icon: ProductIcon },
  audience: { label: "Audience", Icon: AudienceIcon },
  purpose: { label: "Purpose", Icon: PurposeIcon },
} as const;

type AnimationPhase = "slots" | "filling" | "pause" | "merge" | "complete";

export function DQFormulaAnimation({
  formula,
  onComplete,
}: DQFormulaAnimationProps) {
  const [phase, setPhase] = useState<AnimationPhase>("slots");
  const [filledSlots, setFilledSlots] = useState<Set<string>>(new Set());
  const [highlightedSlot, setHighlightedSlot] = useState<string | null>(null);

  const fullQuestion = `How can ${formula.role} ${formula.action} ${formula.product} for ${formula.audience} to ${formula.purpose}?`;

  const startFilling = useCallback(() => {
    setPhase("filling");
    SLOT_KEYS.forEach((key, i) => {
      setTimeout(() => {
        setFilledSlots((prev) => new Set([...prev, key]));
        setHighlightedSlot(key);
        setTimeout(() => setHighlightedSlot(null), 300);
      }, i * 200);
    });

    // After all slots filled (5 * 200ms = 1000ms) + brief pause
    setTimeout(() => {
      setPhase("pause");
      setTimeout(() => setPhase("merge"), 300);
    }, 1200);
  }, []);

  useEffect(() => {
    // Phase 1: slots appear with stagger, then start filling
    const timer = setTimeout(startFilling, 600);
    return () => clearTimeout(timer);
  }, [startFilling]);

  useEffect(() => {
    if (phase === "merge") {
      const timer = setTimeout(() => {
        setPhase("complete");
        onComplete?.();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const isMerged = phase === "merge" || phase === "complete";

  return (
    <div className="w-full py-4">
      <AnimatePresence mode="wait">
        {!isMerged ? (
          <motion.div
            key="slots"
            className="flex flex-wrap justify-center gap-3"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {SLOT_KEYS.map((key, i) => {
              const { label, Icon } = SLOT_CONFIG[key];
              const isFilled = filledSlots.has(key);
              const isHighlighted = highlightedSlot === key;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.25 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <motion.span
                    className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-neutral-500"
                    animate={{ opacity: 1 }}
                  >
                    <Icon size={14} className="text-neutral-400" />
                    {label}
                  </motion.span>
                  <motion.div
                    className={cn(
                      "flex min-h-[40px] min-w-[100px] items-center justify-center rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors duration-200",
                      isFilled
                        ? "border-neutral-300 bg-white text-neutral-900"
                        : "border-dashed border-neutral-300 bg-neutral-50 text-transparent",
                      isHighlighted && "border-brand-teal bg-brand-teal-light"
                    )}
                    animate={
                      isHighlighted
                        ? { scale: [1, 1.05, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {isFilled ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formula[key]}
                      </motion.span>
                    ) : (
                      <span className="text-neutral-300">...</span>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="merged"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <motion.p
              className="font-display text-xl font-bold text-neutral-900 md:text-2xl"
              animate={{ scale: [1.02, 1] }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {fullQuestion}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
