"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { QuickCreateFlow } from "@/components/build/quick-create-flow";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function BuildPageContent() {
  const searchParams = useSearchParams();
  const description = searchParams.get("description");

  if (description) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold text-neutral-900 mb-8 text-center">
          Quick Create
        </h1>
        <QuickCreateFlow initialDescription={description} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-2 text-center">
        Build a PBL Unit
      </h1>
      <p className="text-center text-neutral-600 mb-10">
        Choose how you want to get started.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Quick Create */}
        <Card className="flex flex-col justify-between hover:border-brand-teal transition-colors">
          <CardContent className="space-y-3">
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Quick Create
            </h2>
            <p className="text-sm text-neutral-600">
              Describe your idea in a sentence and get an instant PBL overview
              with a driving question and 5-phase plan.
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <QuickCreateFlow />
          </div>
        </Card>

        {/* Full Builder */}
        <Card className="flex flex-col justify-between hover:border-brand-teal transition-colors">
          <CardContent className="space-y-3">
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Full Builder
            </h2>
            <p className="text-sm text-neutral-600">
              Step-by-step wizard: enter your details, choose a driving question,
              and get a complete learning narrative with assessment and resources.
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <Link
              href="/build/new"
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              Start Building
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function BuildPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-teal" />
        </div>
      }
    >
      <BuildPageContent />
    </Suspense>
  );
}
