"use client";

import { ScrollReveal, AssembleGroup, AssembleItem } from "@/components/ui/motion";
import { ModuleLayout } from "@/components/explore/module-layout";
import { ComparisonTool } from "@/components/explore/comparison-tool";
import { UmbrellaDiagram } from "@/components/explore/umbrella-diagram";
import { alphabetSoup } from "@/lib/data/alphabet-soup";

export default function AlphabetSoupPage() {
  return (
    <ModuleLayout
      slug="alphabet-soup"
      title="The Alphabet Soup Explained"
      duration="5-8 min"
      learningGoal="Name the key approaches and understand how they relate"
      progressColor="bg-brand-indigo"
    >
      {/* Section 1: Hook */}
      <section>
        <ScrollReveal>
          <p className="text-center font-display text-2xl font-bold leading-snug text-neutral-900">
            PBL, STEM, design thinking, inquiry-based&hellip; quick, what&apos;s
            the difference?
          </p>
          <p className="mt-3 text-center text-base text-neutral-500">
            If you paused, you&apos;re not alone.
          </p>
        </ScrollReveal>
      </section>

      {/* Section 2: How many can you define? */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            How many can you define?
          </h2>
        </ScrollReveal>

        <AssembleGroup
          className="flex flex-wrap justify-center gap-3"
          stagger={0.06}
        >
          {alphabetSoup.map((approach) => (
            <AssembleItem key={approach.name}>
              <span className="inline-block rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
                {approach.name}
              </span>
            </AssembleItem>
          ))}
        </AssembleGroup>
      </section>

      {/* Section 3: Comparison Tool */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            Compare Any Two
          </h2>
        </ScrollReveal>
        <ComparisonTool />
      </section>

      {/* Section 4: Umbrella Diagram */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            How They All Relate
          </h2>
        </ScrollReveal>
        <UmbrellaDiagram />
      </section>

      {/* Section 5: Takeaway */}
      <section>
        <ScrollReveal>
          <div className="rounded-xl border border-brand-indigo/30 bg-brand-indigo-light/40 p-6">
            <p className="text-center font-display text-lg font-bold text-brand-indigo">
              PBL is the broadest framework. Everything else is either a subset,
              a lens, or a specific process within PBL.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Cheat Sheet Table */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            Cheat Sheet
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-neutral-700">
                    Approach
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-neutral-700">
                    Duration
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-neutral-700">
                    Who Drives
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-neutral-700">
                    Product?
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                    Key Distinction
                  </th>
                </tr>
              </thead>
              <tbody>
                {alphabetSoup.map((a) => (
                  <tr
                    key={a.name}
                    className="border-b border-neutral-100 last:border-b-0"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-neutral-900">
                      {a.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                      {a.duration}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                      {a.whoDrives}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                      {a.hasProduct}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {a.keyDistinction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </section>
    </ModuleLayout>
  );
}
