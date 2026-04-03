"use client";

import { useState, useRef, useCallback } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createStreamAccumulator } from "@/lib/gemini/parse";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "Math",
  "ELA",
  "Science",
  "Social Studies",
  "Art",
  "Music",
  "Technology",
  "World Languages",
  "Health/PE",
  "Other",
];

const GRADE_LEVELS = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export interface ParsedDocument {
  id: string;
  fileName: string;
  subject: string;
  gradeLevel: string;
  units: Array<{
    title: string;
    topics: string[];
    standards: string[];
    estimatedWeeks: number;
    weekRange: [number, number];
  }>;
  totalWeeks: number;
}

interface UploadZoneProps {
  onDocumentParsed: (doc: ParsedDocument) => void;
}

export function UploadZone({ onDocumentParsed }: UploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const ext = f.name.toLowerCase().split(".").pop();
    if (ext !== "pdf" && ext !== "docx" && ext !== "doc") {
      setError("Please upload a PDF or DOCX file.");
      return;
    }
    setError("");
    setFile(f);
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  async function handleUpload() {
    if (!file || !subject || !gradeLevel) return;

    setParsing(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subject", subject);
      formData.append("gradeLevel", gradeLevel);

      const response = await fetch("/api/analyze/parse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Parsing failed");
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
        units: ParsedDocument["units"];
        totalWeeks: number;
      }>();

      if (!parsed || !parsed.units) {
        throw new Error("Failed to parse document structure");
      }

      onDocumentParsed({
        id: crypto.randomUUID(),
        fileName: file.name,
        subject,
        gradeLevel,
        units: parsed.units,
        totalWeeks: parsed.totalWeeks || 36,
      });

      // Reset form
      setFile(null);
      setSubject("");
      setGradeLevel("");
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parsing failed");
    } finally {
      setParsing(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-12 cursor-pointer transition-colors",
          dragOver
            ? "border-brand-teal bg-brand-teal/5"
            : "border-neutral-300 hover:border-neutral-400"
        )}
      >
        <FileUp
          className={cn(
            "size-10",
            dragOver ? "text-brand-teal" : "text-neutral-400"
          )}
        />
        {file ? (
          <p className="text-sm font-medium text-neutral-900">{file.name}</p>
        ) : (
          <>
            <p className="font-body font-medium text-neutral-700">
              Drop your scope and sequence here
            </p>
            <p className="text-sm text-neutral-500">PDF or DOCX</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* File details form */}
      {file && (
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
          >
            <option value="">Select subject...</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
          >
            <option value="">Select grade...</option>
            {GRADE_LEVELS.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>

          <Button
            onClick={handleUpload}
            disabled={!subject || !gradeLevel || parsing}
            className="sm:w-auto"
          >
            {parsing ? (
              <>
                <Loader2 className="size-4 animate-spin mr-1" />
                Parsing...
              </>
            ) : (
              "Upload & Parse"
            )}
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
