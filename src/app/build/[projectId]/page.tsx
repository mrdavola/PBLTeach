"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// TODO: Wire up useProject to load from Firestore
// import { useProject } from "@/lib/firebase/projects";
// import { LearningNarrativeView } from "@/components/build/learning-narrative-view";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  // TODO: Load project from Firestore, render LearningNarrativeView with saved data, enable inline editing
  // const { project, loading, error } = useProject(projectId);

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
            Project: {projectId}
          </h1>
          <p className="mt-2 text-neutral-500">
            Connect your Firebase account to load saved projects.
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            Add your Firebase credentials to .env.local to enable project
            persistence.
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              render={<Link href="/dashboard" />}
            >
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
