"use client";

import { X } from "lucide-react";
import type { ParsedDocument } from "./upload-zone";

interface DocumentListProps {
  documents: ParsedDocument[];
  onRemove: (id: string) => void;
}

export function DocumentList({ documents, onRemove }: DocumentListProps) {
  if (documents.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
        Uploaded Documents
      </h3>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 rounded-md bg-brand-teal/10 px-2 py-0.5 text-xs font-medium text-brand-teal">
                {doc.subject}
              </span>
              <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                Grade {doc.gradeLevel}
              </span>
              <span className="truncate text-sm text-neutral-700">
                {doc.fileName}
              </span>
              <span className="shrink-0 text-xs text-neutral-400">
                {doc.units.length} units
              </span>
            </div>
            <button
              onClick={() => onRemove(doc.id)}
              className="shrink-0 ml-2 p-1 text-neutral-400 hover:text-red-500 transition-colors"
              aria-label={`Remove ${doc.fileName}`}
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
