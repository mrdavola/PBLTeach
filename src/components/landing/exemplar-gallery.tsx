"use client";

import { exemplars } from "@/lib/data/exemplars";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/motion";

const durationLabels: Record<string, string> = {
  "single-day": "1 day",
  micro: "2-3 days",
  mini: "1-2 weeks",
  full: "3+ weeks",
};

function subjectToBadgeVariant(subject: string) {
  const map: Record<string, string> = {
    ELA: "investigation",
    Science: "entry",
    Math: "create",
    Health: "entry",
    Government: "problem",
    Business: "share",
    SEL: "share",
  };
  return (map[subject] ?? "secondary") as
    | "entry"
    | "investigation"
    | "problem"
    | "create"
    | "share"
    | "secondary";
}

export function ExemplarGallery() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <h2 className="font-display font-bold text-2xl text-neutral-900 mb-8">
            Staff Picks
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {exemplars.map((exemplar) => (
              <Card
                key={exemplar.id}
                className="min-w-[300px] snap-start shrink-0 p-6"
              >
                <CardContent className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-lg">
                    {exemplar.title}
                  </h3>
                  <p className="text-sm text-neutral-700 line-clamp-2">
                    {exemplar.drivingQuestion}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    <Badge variant="outline" className="text-xs">
                      Grade {exemplar.gradeLevel}
                    </Badge>
                    {exemplar.subjects.map((subject) => (
                      <Badge
                        key={subject}
                        variant={subjectToBadgeVariant(subject)}
                        className="text-xs"
                      >
                        {subject}
                      </Badge>
                    ))}
                    <Badge variant="secondary" className="text-xs">
                      {durationLabels[exemplar.duration]}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
