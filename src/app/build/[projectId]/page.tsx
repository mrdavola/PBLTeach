"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useProject } from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LearningNarrativeView } from "@/components/build/learning-narrative-view";
import { buildPhaseContentsFromProject } from "@/lib/project/builder-draft";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { currentProject, loading, error, load } = useProject();

  useEffect(() => {
    if (!isAuthenticated) return;
    load(projectId).catch(() => {
      // surfaced via hook error state
    });
  }, [isAuthenticated, load, projectId]);

  if (authLoading || (isAuthenticated && loading && !currentProject)) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-24 flex justify-center">
        <Loader2 className="size-8 animate-spin text-brand-teal" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <Link
          href="/dashboard"
          className="mb-4 inline-block text-sm text-neutral-500 hover:text-brand-teal transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Sign in to view this saved draft
            </h1>
            <p className="mt-2 text-neutral-500">
              Saved cloud drafts are tied to your account.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !currentProject) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <Link
          href="/dashboard"
          className="mb-4 inline-block text-sm text-neutral-500 hover:text-brand-teal transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              We couldn&apos;t load this project
            </h1>
            <p className="mt-2 text-neutral-500">
              {error ?? "The project may have been deleted or is unavailable."}
            </p>
            <div className="mt-6">
              <Button variant="outline" render={<Link href="/dashboard" />}>
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <Link
        href="/dashboard"
        className="mb-4 inline-block text-sm text-neutral-500 hover:text-brand-teal transition-colors"
      >
        &larr; Back to Dashboard
      </Link>
      <LearningNarrativeView
        project={currentProject}
        isStreaming={false}
        streamText=""
        phaseContents={buildPhaseContentsFromProject(currentProject)}
        projectId={projectId}
      />
    </div>
  );
}
