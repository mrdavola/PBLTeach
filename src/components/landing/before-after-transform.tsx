"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { phases } from "@/lib/data/phases";

export function BeforeAfterTransform() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const node1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const node1Y = useTransform(scrollYProgress, [0.2, 0.3], [12, 0]);
  const node2Opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const node2Y = useTransform(scrollYProgress, [0.3, 0.4], [12, 0]);
  const node3Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const node3Y = useTransform(scrollYProgress, [0.4, 0.5], [12, 0]);
  const node4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const node4Y = useTransform(scrollYProgress, [0.5, 0.6], [12, 0]);
  const node5Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const node5Y = useTransform(scrollYProgress, [0.6, 0.7], [12, 0]);

  const nodeOpacities = [node1Opacity, node2Opacity, node3Opacity, node4Opacity, node5Opacity];
  const nodeYs = [node1Y, node2Y, node3Y, node4Y, node5Y];

  // Line grows as nodes appear
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);

  return (
    <section ref={ref} className="min-h-[150vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="mx-auto max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left side -- The old way */}
          <motion.div style={{ opacity: leftOpacity }} className="flex flex-col items-center md:items-end gap-4">
            <p className="text-neutral-500 text-sm font-medium uppercase tracking-wider mb-4">
              The old way
            </p>
            <div className="w-full max-w-[320px] rounded-lg border border-neutral-200 bg-neutral-50 p-6 space-y-4">
              {/* Fake worksheet mockup */}
              <div className="h-4 w-3/4 rounded bg-neutral-300" />
              <div className="h-3 w-full rounded bg-neutral-200" />
              <div className="h-3 w-full rounded bg-neutral-200" />
              <div className="h-3 w-5/6 rounded bg-neutral-200" />
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded border border-neutral-300" />
                  <div className="h-3 w-3/4 rounded bg-neutral-200" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded border border-neutral-300" />
                  <div className="h-3 w-2/3 rounded bg-neutral-200" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded border border-neutral-300" />
                  <div className="h-3 w-4/5 rounded bg-neutral-200" />
                </div>
              </div>
              <div className="mt-4 h-3 w-1/2 rounded bg-neutral-200" />
            </div>
          </motion.div>

          {/* Right side -- The PBL way */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.p
              style={{ opacity: node1Opacity }}
              className="text-neutral-500 text-sm font-medium uppercase tracking-wider mb-4"
            >
              The PBL way
            </motion.p>
            <div className="relative pl-8">
              {/* Vertical connecting line */}
              <div className="absolute left-[5px] top-[6px] bottom-[6px] w-[2px] bg-neutral-200">
                <motion.div
                  style={{ height: lineHeight }}
                  className="w-full bg-neutral-400 origin-top"
                />
              </div>

              {/* Phase nodes */}
              <div className="space-y-6">
                {phases.map((phase, i) => (
                  <motion.div
                    key={phase.number}
                    style={{ opacity: nodeOpacities[i], y: nodeYs[i] }}
                    className="flex items-center gap-3 relative"
                  >
                    <div
                      className="absolute -left-8 w-3 h-3 rounded-full ring-2 ring-white"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="font-display font-medium text-neutral-900 text-sm">
                      {phase.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
