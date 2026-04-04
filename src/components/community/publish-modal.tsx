"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { publishProject } from "@/lib/firebase/firestore";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublishModalProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublished: () => void;
}

export function PublishModal({
  project,
  open,
  onOpenChange,
  onPublished,
}: PublishModalProps) {
  const [authorName, setAuthorName] = useState("");
  const [authorSchool, setAuthorSchool] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasDrivingQuestion = !!project.drivingQuestion?.selected;
  const hasPresentationFormats =
    !!project.phases?.share?.presentationFormats?.length;
  const canPublish = hasDrivingQuestion && hasPresentationFormats;

  async function handlePublish() {
    if (!canPublish || !authorName.trim()) return;
    setError(null);
    setLoading(true);
    try {
      await publishProject(
        project.userId,
        project.id,
        authorName.trim(),
        authorSchool.trim() || undefined
      );
      onPublished();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to publish project."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="font-display text-xl font-bold">
          Publish to Community
        </h2>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="publish-author-name"
              className="text-sm font-medium text-neutral-700"
            >
              Display name
            </label>
            <input
              id="publish-author-name"
              type="text"
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="publish-author-school"
              className="text-sm font-medium text-neutral-700"
            >
              School or district
            </label>
            <input
              id="publish-author-school"
              type="text"
              placeholder="School or district (optional)"
              value={authorSchool}
              onChange={(e) => setAuthorSchool(e.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
            />
          </div>

          {!canPublish && (
            <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
              Your project needs a driving question and at least one
              presentation format in the Share phase to be published.
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handlePublish}
              disabled={!canPublish || !authorName.trim() || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
