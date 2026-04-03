"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuideLayoutProps {
  projectId: string;
  projectTitle: string;
  drivingQuestion: string;
  children: React.ReactNode;
  sidebar: React.ReactNode;
  hasReadyMaterials: boolean;
}

export function GuideLayout({
  projectId,
  projectTitle,
  drivingQuestion,
  children,
  sidebar,
  hasReadyMaterials,
}: GuideLayoutProps) {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/build/${projectId}`}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-teal transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to project
        </Link>

        <h1 className="font-display font-bold text-2xl text-neutral-900">
          Facilitation Materials
        </h1>
        <p className="mt-1 text-sm font-medium text-neutral-700">
          {projectTitle}
        </p>
        <p className="mt-0.5 text-sm text-neutral-500 italic line-clamp-2">
          {drivingQuestion}
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-80 shrink-0">
          <div className="flex flex-col gap-2">
            {sidebar}
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              disabled={!hasReadyMaterials}
            >
              <Download className="size-4" />
              Download All
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
