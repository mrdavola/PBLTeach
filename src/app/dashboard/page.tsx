"use client";

import { EmptyDashboard } from "@/components/dashboard/empty-dashboard";
import { ProjectCard } from "@/components/dashboard/project-card";
import type { Project } from "@/lib/types";

// TODO: Wire up useAuth and useProject to show real projects
// import { useAuth } from "@/lib/firebase/auth";
// import { useProjects } from "@/lib/firebase/projects";

// Temporary mock until auth is wired up
const user = null;
const projects: Project[] = [];

export default function DashboardPage() {
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
