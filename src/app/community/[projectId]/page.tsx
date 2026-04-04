"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import {
  getCommunityProject,
  getUserRating,
  rateCommunityProject,
  adaptCommunityProject,
  getCommunityProjects,
} from "@/lib/firebase/firestore";
import { StarRating } from "@/components/community/star-rating";
import { PhaseTimeline } from "@/components/community/phase-timeline";
import { CommunityProjectCard } from "@/components/community/community-project-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Loader2 } from "lucide-react";
import type { CommunityProject } from "@/lib/types";

const DURATION_LABELS: Record<string, string> = {
  "single-day": "1 Day",
  micro: "1-2 Weeks",
  mini: "2-4 Weeks",
  full: "6+ Weeks",
};

export default function CommunityProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [project, setProject] = useState<CommunityProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [similarProjects, setSimilarProjects] = useState<CommunityProject[]>(
    []
  );
  const [adapting, setAdapting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const fetched = await getCommunityProject(projectId);
      if (cancelled) return;

      setProject(fetched);

      if (fetched) {
        // Fetch similar projects
        const similar = await getCommunityProjects({
          subject: fetched.subjects[0],
        });
        if (!cancelled) {
          setSimilarProjects(
            similar.filter((p) => p.id !== projectId).slice(0, 4)
          );
        }
      }

      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  // Fetch user rating when auth state is available
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    let cancelled = false;

    getUserRating(projectId, user.uid).then((rating) => {
      if (!cancelled) setUserRating(rating);
    });

    return () => {
      cancelled = true;
    };
  }, [projectId, isAuthenticated, user]);

  async function handleRate(score: number) {
    if (!user) return;
    setUserRating(score);
    await rateCommunityProject(projectId, user.uid, score);
    // Refresh project to get updated average
    const updated = await getCommunityProject(projectId);
    if (updated) setProject(updated);
  }

  async function handleAdapt() {
    if (!user) return;
    setAdapting(true);
    try {
      const newId = await adaptCommunityProject(projectId, user.uid);
      router.push(`/build/${newId}`);
    } catch {
      setAdapting(false);
    }
  }

  const avgRating =
    project && project.published.ratingCount > 0
      ? project.published.ratingSum / project.published.ratingCount
      : 0;

  const goldStandardScore =
    project?.goldStandard?.elementsIncluded?.length ?? 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to Community
      </Link>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="size-8 animate-spin text-brand-teal" />
        </div>
      )}

      {/* Not found */}
      {!loading && !project && (
        <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center">
          <h2 className="font-display text-xl font-bold text-neutral-900">
            Project not found
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            This project may have been removed or doesn&apos;t exist.
          </p>
        </div>
      )}

      {/* Project detail */}
      {!loading && project && (
        <>
          {/* Hero section */}
          <section>
            <h1 className="font-display text-3xl font-bold text-neutral-900">
              {project.title}
            </h1>

            <p className="text-lg text-neutral-600 mt-2">
              {project.drivingQuestion.selected}
            </p>

            <p className="text-sm text-neutral-500 mt-3">
              {project.published.authorName}
              {project.published.authorSchool &&
                `, ${project.published.authorSchool}`}
            </p>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                {project.gradeLevel}
              </span>
              {project.subjects.map((subject) => (
                <span
                  key={subject}
                  className="inline-flex items-center rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand-teal"
                >
                  {subject}
                </span>
              ))}
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                {DURATION_LABELS[project.duration] ?? project.duration}
              </span>
            </div>

            {/* Gold Standard */}
            {goldStandardScore > 0 && (
              <p className="mt-3 text-sm font-medium text-amber-600">
                Gold Standard: {goldStandardScore}/7 elements
              </p>
            )}
          </section>

          {/* Star Rating section */}
          <section className="mt-8 rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {isAuthenticated ? (
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-1">
                    Your Rating
                  </p>
                  <StarRating
                    rating={userRating ?? 0}
                    interactive
                    onRate={handleRate}
                  />
                </div>
              ) : (
                <p className="text-sm text-neutral-500">Sign in to rate</p>
              )}

              <div className="text-right">
                <p className="text-sm text-neutral-500 mb-1">
                  Average: {avgRating.toFixed(1)}
                </p>
                <StarRating
                  rating={avgRating}
                  count={project.published.ratingCount}
                  size="sm"
                />
              </div>
            </div>
          </section>

          {/* Adapt button */}
          <section className="mt-6">
            {isAuthenticated ? (
              <Button onClick={handleAdapt} disabled={adapting}>
                {adapting ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Copy className="mr-2 size-4" />
                )}
                Adapt this project
              </Button>
            ) : (
              <p className="text-sm text-neutral-500">
                <Link
                  href="/auth/sign-in"
                  className="text-brand-teal hover:underline"
                >
                  Sign in
                </Link>{" "}
                to adapt this project
              </p>
            )}
          </section>

          {/* Phase Timeline */}
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-neutral-900 mb-4">
              Project Phases
            </h2>
            <PhaseTimeline phases={project.phases} />
          </section>

          {/* Similar Projects */}
          {similarProjects.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-bold text-neutral-900 mb-4">
                Similar Projects
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {similarProjects.map((p) => (
                  <CommunityProjectCard key={p.id} project={p} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
