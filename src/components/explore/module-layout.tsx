"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/explore/progress-bar";
import { exploreModules } from "@/lib/data/explore-content";

interface ModuleLayoutProps {
  children: React.ReactNode;
  slug: string;
  title: string;
  duration: string;
  learningGoal: string;
  progressColor: string; // Tailwind bg class, e.g. "bg-brand-coral"
  ctaLink?: string;
}

export function ModuleLayout({
  children,
  slug,
  title,
  duration,
  learningGoal,
  progressColor,
  ctaLink,
}: ModuleLayoutProps) {
  const buildLink = ctaLink ?? "/build/new";

  const availableModules = exploreModules.filter((m) => m.phaseForMVP === 1);
  const currentIndex = availableModules.findIndex((m) => m.slug === slug);
  const prev = currentIndex > 0 ? availableModules[currentIndex - 1] : null;
  const next =
    currentIndex < availableModules.length - 1
      ? availableModules[currentIndex + 1]
      : null;

  return (
    <>
      <ProgressBar color={progressColor} />

      <article className="mx-auto max-w-[800px] px-6 py-12 md:py-20">
        {/* Back navigation */}
        <Link
          href="/explore"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-teal"
        >
          <ArrowLeft className="size-4" />
          Back to Explore
        </Link>

        {/* Module header */}
        <header className="mb-16">
          <h1 className="font-display text-3xl font-bold text-neutral-900 md:text-4xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge variant="default">
              <Clock className="size-3" />
              {duration}
            </Badge>
            <span className="text-sm italic text-neutral-500">
              {learningGoal}
            </span>
          </div>
        </header>

        {/* Module content */}
        <div className="space-y-20 md:space-y-28">{children}</div>

        {/* CTA */}
        <section className="mt-20 md:mt-28">
          <Card className="border-brand-teal/30 bg-brand-teal-light/30">
            <CardContent className="flex flex-col items-center gap-4 text-center py-8">
              <h2 className="font-display text-xl font-bold text-neutral-900">
                Ready to try this?
              </h2>
              <p className="max-w-md text-sm text-neutral-600">
                Put what you learned into practice. The builder will walk you
                through it step by step.
              </p>
              <Button render={<Link href={buildLink} />}>
                Start building
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Previous / Next navigation */}
        {(prev || next) && (
          <nav
            aria-label="Explore modules"
            className="mt-12 flex items-stretch gap-4"
          >
            {prev ? (
              <Link
                href={`/explore/${prev.slug}`}
                className="group flex flex-1 items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-md"
              >
                <ArrowLeft className="size-4 shrink-0 text-neutral-400 transition-colors group-hover:text-brand-teal" />
                <div className="min-w-0">
                  <span className="block text-xs font-medium text-neutral-400">
                    Previous
                  </span>
                  <span className="block truncate text-sm font-semibold text-neutral-700 group-hover:text-brand-teal-dark">
                    {prev.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              <Link
                href={`/explore/${next.slug}`}
                className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 text-right transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-md"
              >
                <div className="min-w-0">
                  <span className="block text-xs font-medium text-neutral-400">
                    Next
                  </span>
                  <span className="block truncate text-sm font-semibold text-neutral-700 group-hover:text-brand-teal-dark">
                    {next.title}
                  </span>
                </div>
                <ArrowRight className="size-4 shrink-0 text-neutral-400 transition-colors group-hover:text-brand-teal" />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        )}
      </article>
    </>
  );
}
