import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

const durationLabels: Record<Project["duration"], string> = {
  "single-day": "1 Day",
  micro: "2-3 Days",
  mini: "1-2 Weeks",
  full: "3+ Weeks",
};

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHr = Math.floor(diffMs / 3_600_000);
  const diffDay = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColor =
    project.status === "complete"
      ? "bg-success/10 text-success"
      : "bg-brand-amber-light text-brand-amber";

  const sourceLabel =
    project.source === "quick-create"
      ? "Quick Plan"
      : project.source === "analyze"
        ? "From Analysis"
        : null;

  return (
    <Link href={`/build/${project.id}`} className="block">
      <Card className="cursor-pointer hover:shadow-card-hover">
        <CardContent className="flex flex-col gap-3">
          <h3 className="font-display text-lg font-bold text-neutral-900 leading-snug">
            {project.title}
          </h3>

          {project.drivingQuestion?.selected && (
            <p className="text-sm text-neutral-700 line-clamp-2 leading-relaxed">
              {project.drivingQuestion.selected}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="text-xs">
              {project.gradeLevel}
            </Badge>
            {project.subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">
              {durationLabels[project.duration]}
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColor}`}
            >
              {project.status === "complete" ? "Complete" : "Draft"}
            </span>
            {sourceLabel && (
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
                {sourceLabel}
              </span>
            )}
            <span className="text-xs text-neutral-500">
              {formatRelativeDate(project.updatedAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
