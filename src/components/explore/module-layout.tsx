"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/explore/progress-bar";

interface ModuleLayoutProps {
  children: React.ReactNode;
  title: string;
  duration: string;
  learningGoal: string;
  progressColor: string; // Tailwind bg class, e.g. "bg-brand-coral"
  ctaLink?: string;
}

export function ModuleLayout({
  children,
  title,
  duration,
  learningGoal,
  progressColor,
  ctaLink,
}: ModuleLayoutProps) {
  const buildLink = ctaLink ?? "/build/new";

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
      </article>
    </>
  );
}
