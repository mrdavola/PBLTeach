"use client";

import Link from "next/link";
import { Cake, UtensilsCrossed } from "lucide-react";

import { dessertVsMainCourse } from "@/lib/data/frameworks";
import { ScrollReveal } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

import { FlipCard } from "@/components/explore/flip-card";
import { ScenarioHook } from "@/components/explore/scenario-hook";

export default function WhatIsPblPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-4 text-center">
        <span className="inline-block rounded-full bg-brand-coral-light px-3 py-1 text-xs font-medium text-brand-coral">
          5-7 min
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
          What IS PBL?
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Distinguish PBL from &ldquo;doing a project&rdquo;
        </p>
      </div>

      {/* ================================================================== */}
      {/* Section 1: Scenario Hook                                           */}
      {/* ================================================================== */}
      <section className="py-16">
        <ScenarioHook />
      </section>

      {/* ================================================================== */}
      {/* Section 2: Dessert vs Main Course                                  */}
      {/* ================================================================== */}
      <section className="py-16">
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-bold text-neutral-900">
            The Dessert vs. Main Course
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-neutral-500">
            This is the single most important distinction in PBL.
          </p>
        </ScrollReveal>

        {/* Visual comparison */}
        <ScrollReveal className="mt-10">
          <div className="grid grid-cols-2 gap-6">
            {/* Doing a Project - muted */}
            <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-300 bg-neutral-100 p-6">
              <div className="flex size-16 items-center justify-center rounded-full bg-white">
                <Cake className="size-8 text-neutral-500" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Doing a Project
              </span>
              <p className="text-center text-xs text-neutral-500">
                Dessert after the meal &mdash; a fun add-on after the
                &ldquo;real&rdquo; teaching is done
              </p>
            </div>

            {/* PBL - vibrant */}
            <div className="flex flex-col items-center gap-3 rounded-xl border border-brand-teal bg-brand-teal-light p-6">
              <div className="flex size-16 items-center justify-center rounded-full bg-white">
                <UtensilsCrossed className="size-8 text-brand-teal" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-brand-teal">
                PBL
              </span>
              <p className="text-center text-xs text-brand-teal-dark">
                The main course &mdash; the project IS how students learn the
                content
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Flip cards grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dessertVsMainCourse.map((pair, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <FlipCard
                front={pair.doingAProject}
                back={pair.pbl}
                frontLabel="Doing a Project"
                backLabel="PBL"
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 3: Real Example (Case Study)                               */}
      {/* ================================================================== */}
      <section className="py-16">
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-bold text-neutral-900">
            See it in action
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScrollReveal>
            <Card className="h-full border-neutral-300 bg-neutral-100">
              <CardContent>
                <span className="mb-3 inline-block text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Before &mdash; Doing a Project
                </span>
                <p className="text-sm leading-relaxed text-neutral-700">
                  Mrs. Garcia teaches fractions for 3 weeks, then assigns a
                  poster project where students illustrate fraction concepts.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Card className="h-full border-brand-teal bg-brand-teal-light">
              <CardContent>
                <span className="mb-3 inline-block text-xs font-medium uppercase tracking-wide text-brand-teal">
                  After &mdash; PBL
                </span>
                <p className="text-sm leading-relaxed text-brand-teal-dark">
                  Mrs. Garcia&apos;s students run a class bakery. They learn
                  fractions by halving and doubling recipes, pricing items, and
                  making change. The bakery sale IS the unit.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 4: Try It CTA                                              */}
      {/* ================================================================== */}
      <section className="py-16">
        <ScrollReveal>
          <Card className="border-brand-teal/20 bg-brand-teal-light/50 text-center">
            <CardContent className="flex flex-col items-center gap-4 py-4">
              <p className="font-display text-lg font-bold text-neutral-900">
                Ready to see how your next unit could become PBL?
              </p>
              <Link href="/build/new" className={buttonVariants()}>
                Start building
              </Link>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>
    </div>
  );
}
