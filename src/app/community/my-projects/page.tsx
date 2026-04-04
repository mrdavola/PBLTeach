"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AuthGate } from "@/components/auth/auth-gate";
import { getMyPublishedProjects } from "@/lib/firebase/firestore";
import { CommunityProjectCard } from "@/components/community/community-project-card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { CommunityProject } from "@/lib/types";

export default function MyProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<CommunityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await getMyPublishedProjects(user!.uid);
        if (!cancelled) {
          setProjects(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProjects();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/community"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Community
      </Link>

      <h1 className="font-display text-3xl font-bold mb-8">
        My Published Projects
      </h1>

      <AuthGate message="Sign in to see your published projects.">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <CommunityProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center">
            <p className="text-neutral-600">
              You haven&apos;t published any projects yet.
            </p>
            <Link
              href="/build"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Start building a project
            </Link>
          </div>
        )}
      </AuthGate>
    </div>
  );
}
