import Link from "next/link";
import { exploreModules } from "@/lib/data/explore-content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssembleGroup, AssembleItem } from "@/components/ui/motion";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Explore PBL — PBLTeach",
  description:
    "Interactive, bite-sized modules to learn project-based learning. 5-10 minutes each. No account required.",
};

export default function ExplorePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-neutral-900 md:text-5xl">
            Explore PBL
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            Interactive, bite-sized modules. 5-10 minutes each. No account
            required.
          </p>
        </div>

        {/* Module grid */}
        <AssembleGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exploreModules.map((mod) => {
            const isAvailable = mod.phaseForMVP === 1;

            const cardContent = (
              <Card
                className={cn(
                  "h-full transition-shadow duration-200",
                  isAvailable
                    ? "hover:-translate-y-1 hover:shadow-md"
                    : "cursor-not-allowed opacity-60"
                )}
              >
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">
                      <Clock className="size-3" />
                      {mod.duration}
                    </Badge>
                    {!isAvailable && (
                      <Badge variant="secondary">Coming soon</Badge>
                    )}
                  </div>

                  <h2 className="font-display text-lg font-bold text-neutral-900">
                    {mod.title}
                  </h2>

                  <p className="text-sm text-neutral-700">{mod.description}</p>

                  <p className="text-xs italic text-neutral-500">
                    {mod.learningGoal}
                  </p>

                  {isAvailable && (
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand-teal">
                      Start module <ArrowRight className="size-4" />
                    </span>
                  )}
                </CardContent>
              </Card>
            );

            return (
              <AssembleItem key={mod.id}>
                {isAvailable ? (
                  <Link
                    href={`/explore/${mod.slug}`}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50 rounded-xl"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div className="h-full">{cardContent}</div>
                )}
              </AssembleItem>
            );
          })}
        </AssembleGroup>
      </div>
    </section>
  );
}
