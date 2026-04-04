"use client";

import Link from "next/link";
import type { CommunityProject } from "@/lib/types";
import { CommunityProjectCard } from "./community-project-card";

interface CollectionRowProps {
  title: string;
  projects: CommunityProject[];
  seeAllHref?: string;
}

export function CollectionRow({ title, projects, seeAllHref }: CollectionRowProps) {
  if (!projects.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {seeAllHref && (
          <Link href={seeAllHref} className="text-sm text-brand-teal hover:underline">
            See all
          </Link>
        )}
      </div>
      <div
        className="overflow-x-auto flex gap-4 snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {projects.map((project) => (
          <div key={project.id} className="snap-start">
            <CommunityProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
