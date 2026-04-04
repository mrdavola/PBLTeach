"use client";

import type { CommunityProject } from "@/lib/types";
import { CommunityProjectCard } from "./community-project-card";

interface FeaturedCarouselProps {
  projects: CommunityProject[];
}

export function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
  if (!projects.length) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-bold mb-4">Staff Picks</h2>
      <div
        className="overflow-x-auto flex gap-4 snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {projects.map((project) => (
          <div key={project.id} className="snap-start">
            <CommunityProjectCard project={project} size="featured" />
          </div>
        ))}
      </div>
    </section>
  );
}
