"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/motion";

const prompts = [
  "3rd grade math project ideas",
  "What's the difference between PBL and STEM?",
  "Help me write a driving question",
  "I'm mid-project and things are messy",
];

export function QuickStartPrompts() {
  const router = useRouter();

  return (
    <ScrollReveal delay={0.1}>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {prompts.map((prompt) => (
          <Badge
            key={prompt}
            variant="outline"
            className="cursor-pointer hover:bg-brand-teal-light transition-colors px-3 py-1.5 text-sm"
            onClick={() =>
              router.push(
                `/build?description=${encodeURIComponent(prompt)}`
              )
            }
          >
            {prompt}
          </Badge>
        ))}
      </div>
    </ScrollReveal>
  );
}
