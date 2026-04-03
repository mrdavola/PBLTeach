"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadZone, type ParsedDocument } from "@/components/analyze/upload-zone";
import { DocumentList } from "@/components/analyze/document-list";
import { AuthGate } from "@/components/auth/auth-gate";
import { Button } from "@/components/ui/button";
import { Search, GitCompareArrows } from "lucide-react";

export default function AnalyzePage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<ParsedDocument[]>([]);

  function handleDocumentParsed(doc: ParsedDocument) {
    setDocuments((prev) => [...prev, doc]);
  }

  function handleRemove(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  function handleAnalyze(type: "individual" | "cross-curricular") {
    // Store documents in sessionStorage for the results page
    sessionStorage.setItem(
      "analyzeDocuments",
      JSON.stringify(documents)
    );
    sessionStorage.setItem("analyzeType", type);
    router.push("/analyze/results");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-neutral-900 mb-2 text-center">
        Analyze Your Curriculum
      </h1>
      <p className="text-center text-neutral-600 mb-10">
        Upload scope and sequence documents to find PBL opportunities.
      </p>

      <AuthGate message="Sign in to upload and analyze your curriculum documents.">
        <div className="space-y-8">
          <UploadZone onDocumentParsed={handleDocumentParsed} />

          <DocumentList documents={documents} onRemove={handleRemove} />

          {documents.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {documents.length >= 2 && (
                <Button
                  onClick={() => handleAnalyze("cross-curricular")}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <GitCompareArrows className="size-5" />
                  Find Cross-Curricular Opportunities
                </Button>
              )}
              <Button
                onClick={() => handleAnalyze("individual")}
                variant={documents.length >= 2 ? "outline" : "default"}
                className="flex-1 gap-2"
                size="lg"
              >
                <Search className="size-5" />
                {documents.length === 1
                  ? "Analyze for PBL Opportunities"
                  : "Analyze Individual"}
              </Button>
            </div>
          )}
        </div>
      </AuthGate>
    </div>
  );
}
