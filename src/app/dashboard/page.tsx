"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useProject } from "@/hooks/use-project";
import { EmptyDashboard } from "@/components/dashboard/empty-dashboard";
import { ProjectCard } from "@/components/dashboard/project-card";
import { SignInModal } from "@/components/auth/sign-in-modal";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { projects, loading: projectsLoading, loadAll } = useProject();
  const [signInOpen, setSignInOpen] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !hasFetched) {
      loadAll()
        .catch(() => {
          // error is surfaced via useProject().error
        })
        .finally(() => setHasFetched(true));
    }
  }, [isAuthenticated, hasFetched, loadAll]);

  // Auth still loading
  if (authLoading) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-24 flex justify-center">
        <Loader2 className="size-8 animate-spin text-brand-teal" />
      </div>
    );
  }

  // Not signed in
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-display text-3xl font-bold text-neutral-900">
            My Projects
          </h1>
          <p className="text-neutral-600">
            Sign in to save and manage your PBL projects.
          </p>
          <Button variant="default" onClick={() => setSignInOpen(true)}>
            Sign in to get started
          </Button>
          <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
        </div>
      </div>
    );
  }

  // Projects loading
  if (projectsLoading || !hasFetched) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-24 flex justify-center">
        <Loader2 className="size-8 animate-spin text-brand-teal" />
      </div>
    );
  }

  const hasProjects = projects.length > 0;

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      {hasProjects ? (
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900 mb-8">
            My Projects
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyDashboard />
      )}
    </div>
  );
}
