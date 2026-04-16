"use client";

import { ScrollReveal } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLayout } from "@/components/explore/module-layout";
import { ElementBuilder } from "@/components/explore/element-builder";

const dqExamples = [
  {
    grade: "Gr 1",
    question:
      "How can we, as animal experts, create a field guide for our families?",
  },
  {
    grade: "Gr 3",
    question:
      "How can we, as community planners, design a park within $500?",
  },
  {
    grade: "Gr 8",
    question:
      "How can we, as journalists, create a multimedia news magazine?",
  },
  {
    grade: "Gr 10",
    question:
      "How can we, as museum curators, design a virtual exhibit?",
  },
];

export default function GoldStandardPage() {
  return (
    <ModuleLayout
      slug="gold-standard"
      title="The Gold Standard"
      duration="7-10 min"
      learningGoal="Know the 7 elements and understand you can start with just 2"
      progressColor="bg-brand-teal"
    >
      {/* Section 1: Hook */}
      <section>
        <ScrollReveal>
          <p className="text-center font-display text-2xl font-bold text-neutral-900">
            What separates a great project from a mediocre one? Seven elements.
          </p>
        </ScrollReveal>
      </section>

      {/* Section 2: Interactive Element Builder */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            Build Your Gold Standard
          </h2>
        </ScrollReveal>
        <ElementBuilder />
      </section>

      {/* Section 3: Driving Question Formula */}
      <section>
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-bold text-neutral-900">
            The Driving Question Formula
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <Card className="border-brand-teal/30 bg-brand-teal-light/20">
            <CardContent>
              <p className="text-center font-display text-base font-semibold leading-relaxed text-neutral-800 md:text-lg">
                How can we, as{" "}
                <span className="rounded bg-brand-teal/10 px-1.5 py-0.5 text-brand-teal">
                  [ROLE]
                </span>
                ,{" "}
                <span className="rounded bg-brand-teal/10 px-1.5 py-0.5 text-brand-teal">
                  [ACTION]
                </span>{" "}
                a{" "}
                <span className="rounded bg-brand-teal/10 px-1.5 py-0.5 text-brand-teal">
                  [PRODUCT]
                </span>{" "}
                for{" "}
                <span className="rounded bg-brand-teal/10 px-1.5 py-0.5 text-brand-teal">
                  [AUDIENCE]
                </span>{" "}
                to{" "}
                <span className="rounded bg-brand-teal/10 px-1.5 py-0.5 text-brand-teal">
                  [PURPOSE]
                </span>
                ?
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {dqExamples.map((ex, i) => (
            <ScrollReveal key={ex.grade} delay={i * 0.08}>
              <Card size="sm" className="h-full">
                <CardContent>
                  <span className="mb-1 inline-block text-xs font-bold uppercase tracking-wide text-brand-teal">
                    {ex.grade}
                  </span>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    &ldquo;{ex.question}&rdquo;
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Section 4: Start with 2 callout */}
      <section>
        <ScrollReveal>
          <Card className="border-brand-teal bg-brand-teal-light/40">
            <CardContent>
              <h3 className="font-display text-lg font-bold text-brand-teal-dark">
                Start with 2
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-teal-dark/80">
                You don&apos;t need all 7. A driving question and a public
                product is your minimum viable PBL. Add the others as you get
                comfortable.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>
    </ModuleLayout>
  );
}
