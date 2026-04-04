"use client";

import { useEffect, useMemo, useState } from "react";
import { getCommunityProjects } from "@/lib/firebase/firestore";
import { FeaturedCarousel } from "@/components/community/featured-carousel";
import { CollectionRow } from "@/components/community/collection-row";
import { ProjectGrid } from "@/components/community/project-grid";
import { Loader2 } from "lucide-react";
import type { CommunityProject } from "@/lib/types";

export default function CommunityPage() {
  const [projects, setProjects] = useState<CommunityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getCommunityProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.published.featured === true),
    [projects]
  );

  const starterProjects = useMemo(
    () =>
      projects
        .filter((p) => p.duration === "single-day" || p.duration === "micro")
        .slice(0, 8),
    [projects]
  );

  const justAdded = useMemo(() => projects.slice(0, 8), [projects]);

  const subjectRows = useMemo(() => {
    const subjectMap = new Map<string, CommunityProject[]>();
    for (const p of projects) {
      for (const subject of p.subjects) {
        const list = subjectMap.get(subject);
        if (list) {
          list.push(p);
        } else {
          subjectMap.set(subject, [p]);
        }
      }
    }
    return Array.from(subjectMap.entries())
      .filter(([, list]) => list.length >= 3)
      .map(([subject, list]) => ({
        title: `${subject} + PBL`,
        projects: list.slice(0, 8),
      }));
  }, [projects]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-neutral-900 text-center">
        Community
      </h1>
      <p className="text-center text-neutral-600 mb-10">
        Discover, rate, and adapt PBL units from fellow educators.
      </p>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
        </div>
      ) : (
        <>
          <FeaturedCarousel projects={featuredProjects} />

          <CollectionRow
            title="New to PBL? Start here"
            projects={starterProjects}
          />

          <CollectionRow title="Just added" projects={justAdded} />

          {subjectRows.map((row) => (
            <CollectionRow
              key={row.title}
              title={row.title}
              projects={row.projects}
            />
          ))}

          <h2 className="font-display text-2xl font-bold mt-12 mb-6">
            All Projects
          </h2>

          <ProjectGrid projects={projects} />
        </>
      )}
    </div>
  );
}
