"use client";

import { ScrollReveal } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";

import { ModuleLayout } from "@/components/explore/module-layout";
import { DtProcessSimulator } from "@/components/explore/dt-process-simulator";
import { SquiggleBirds } from "@/components/explore/squiggle-birds";
import { MindsetCards } from "@/components/explore/mindset-cards";

export default function DesignThinkingPage() {
  return (
    <ModuleLayout
      slug="design-thinking"
      title="Design Thinking 101"
      duration="7-10 min"
      learningGoal="Understand the DT process and how it powers the Create phase"
      progressColor="bg-brand-amber"
    >
      {/* Section 1: Hook */}
      <section>
        <ScrollReveal>
          <p className="text-center font-display text-2xl font-bold text-neutral-900">
            Design Thinking is the creative engine inside PBL.
          </p>
        </ScrollReveal>
      </section>

      {/* Section 2: GE MRI Case Study */}
      <section>
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-bold text-neutral-900">
            How design thinking transformed a terrifying experience for children
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScrollReveal>
            <Card className="h-full border-neutral-300 bg-neutral-100">
              <CardContent>
                <span className="mb-3 inline-block text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Before
                </span>
                <p className="text-sm leading-relaxed text-neutral-700">
                  Children screamed and cried during MRI scans. 80% needed
                  sedation.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Card className="h-full border-brand-teal bg-brand-teal-light">
              <CardContent>
                <span className="mb-3 inline-block text-xs font-medium uppercase tracking-wide text-brand-teal">
                  After
                </span>
                <p className="text-sm leading-relaxed text-brand-teal-dark">
                  GE&apos;s Adventure Series transformed MRI rooms into pirate
                  ships, jungles, and space stations. Sedation dropped
                  dramatically. Kids asked to come back.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <p className="mt-6 text-center text-sm italic text-neutral-500">
            They used the exact same process you&apos;re about to learn.
          </p>
        </ScrollReveal>
      </section>

      {/* Section 3: DT Process Simulator */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            The 5 Stages of Design Thinking
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <DtProcessSimulator />
        </ScrollReveal>
      </section>

      {/* Section 4: Squiggle Birds */}
      <section>
        <ScrollReveal>
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-neutral-900">
            Squiggle Birds
          </h2>
          <p className="mx-auto mb-8 max-w-md text-center text-sm text-neutral-500">
            A quick warm-up to practice creative confidence. Look at the
            squiggle and imagine what it could become.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <SquiggleBirds />
        </ScrollReveal>
      </section>

      {/* Section 5: Mindset Cards */}
      <section>
        <ScrollReveal>
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-neutral-900">
            10 Design Thinking Mindsets
          </h2>
          <p className="mx-auto mb-8 max-w-md text-center text-sm text-neutral-500">
            Tap any card to flip it and read what each mindset means in
            practice.
          </p>
        </ScrollReveal>
        <MindsetCards />
      </section>

      {/* Section 6: PBL by Design */}
      <section>
        <ScrollReveal>
          <h2 className="mb-4 text-center font-display text-2xl font-bold text-neutral-900">
            PBL + Design Thinking = PBL by Design
          </h2>
          <p className="mx-auto max-w-lg text-center text-sm text-neutral-600">
            PBL is the pedagogical framework &mdash; the WHY and WHAT. Design
            Thinking is the creative framework &mdash; the HOW.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-auto mt-10 flex items-center justify-center">
            {/* Simple Venn diagram */}
            <svg
              viewBox="0 0 400 220"
              className="h-auto w-full max-w-md"
              aria-label="Venn diagram: PBL and Design Thinking overlap to form PBL by Design"
            >
              {/* PBL circle */}
              <circle
                cx="150"
                cy="110"
                r="90"
                fill="#0D737710"
                stroke="#0D7377"
                strokeWidth="2"
              />
              {/* DT circle */}
              <circle
                cx="250"
                cy="110"
                r="90"
                fill="#D9770610"
                stroke="#D97706"
                strokeWidth="2"
              />
              {/* Labels */}
              <text
                x="100"
                y="108"
                textAnchor="middle"
                fill="#0D7377"
                fontSize="14"
                fontWeight="bold"
              >
                PBL
              </text>
              <text
                x="100"
                y="126"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="10"
              >
                Why &amp; What
              </text>
              <text
                x="300"
                y="108"
                textAnchor="middle"
                fill="#D97706"
                fontSize="14"
                fontWeight="bold"
              >
                Design
              </text>
              <text
                x="300"
                y="126"
                textAnchor="middle"
                fill="#D97706"
                fontSize="14"
                fontWeight="bold"
              >
                Thinking
              </text>
              <text
                x="300"
                y="144"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="10"
              >
                How
              </text>
              {/* Overlap label */}
              <text
                x="200"
                y="105"
                textAnchor="middle"
                fill="#1A1A2E"
                fontSize="12"
                fontWeight="bold"
              >
                PBL by
              </text>
              <text
                x="200"
                y="121"
                textAnchor="middle"
                fill="#1A1A2E"
                fontSize="12"
                fontWeight="bold"
              >
                Design
              </text>
            </svg>
          </div>
        </ScrollReveal>
      </section>
    </ModuleLayout>
  );
}
