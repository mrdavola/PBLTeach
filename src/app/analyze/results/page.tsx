"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ResultsView } from "@/components/analyze/results-view";
import { createStreamAccumulator } from "@/lib/gemini/parse";
import { ArrowLeft } from "lucide-react";
import type { ParsedDocument } from "@/components/analyze/upload-zone";

interface Opportunity {
  subjects: string[];
  unitConnections?: Array<{
    subject: string;
    unitTitle?: string;
    topics: string[];
  }>;
  unitTitles?: string[];
  weekRange: [number, number];
  suggestedDQ: string;
  description: string;
  feasibility: "easy" | "moderate" | "ambitious";
  pitch?: string;
  goldStandardElements?: number[];
  suggestedDuration?: string;
  standardsAddressed?: string[];
}

export default function AnalyzeResultsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<ParsedDocument[]>([]);
  const [analysisType, setAnalysisType] = useState<
    "individual" | "cross-curricular"
  >("individual");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [error, setError] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const storedDocs = sessionStorage.getItem("analyzeDocuments");
    const storedType = sessionStorage.getItem("analyzeType") as
      | "individual"
      | "cross-curricular"
      | null;

    if (!storedDocs) {
      router.replace("/analyze");
      return;
    }

    const docs: ParsedDocument[] = JSON.parse(storedDocs);
    setDocuments(docs);
    setAnalysisType(storedType || "individual");

    runAnalysis(docs, storedType || "individual");
  }, [router]);

  async function runAnalysis(
    docs: ParsedDocument[],
    type: "individual" | "cross-curricular"
  ) {
    setIsStreaming(true);
    setError("");

    try {
      let response: Response;

      if (type === "cross-curricular") {
        response = await fetch("/api/analyze/cross-curricular", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documents: docs.map((d) => ({
              subject: d.subject,
              gradeLevel: d.gradeLevel,
              units: d.units,
            })),
          }),
        });
      } else {
        // For individual analysis, analyze the first document
        const doc = docs[0];
        response = await fetch("/api/analyze/individual", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            units: doc.units,
            subject: doc.subject,
            gradeLevel: doc.gradeLevel,
          }),
        });
      }

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Analysis failed");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const accumulator = createStreamAccumulator();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulator.add(decoder.decode(value, { stream: true }));
      }

      const parsed = accumulator.tryParse<{
        opportunities: Opportunity[];
        summary?: string;
      }>();

      if (!parsed || !parsed.opportunities) {
        throw new Error("Failed to parse analysis results");
      }

      // For individual analysis, add the subject to each opportunity
      const opps = parsed.opportunities.map((o) => ({
        ...o,
        subjects: o.subjects || [docs[0].subject],
      }));

      setOpportunities(opps);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/analyze"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-brand-teal transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to Upload
      </Link>

      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-8">
        {analysisType === "cross-curricular"
          ? "Cross-Curricular Opportunities"
          : "PBL Opportunities"}
      </h1>

      {error ? (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : (
        <ResultsView
          documents={documents.map((d) => ({
            subject: d.subject,
            gradeLevel: d.gradeLevel,
            units: d.units,
          }))}
          opportunities={opportunities}
          analysisType={analysisType}
          isStreaming={isStreaming}
        />
      )}
    </div>
  );
}
