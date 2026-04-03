import React from "react";
import {
  Document,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  PDFPage,
  PDFSection,
  PDFBulletList,
  PDFCallout,
  PDFTable,
} from "./components";
import { pdfColors, phaseColors, pdfStyles } from "./theme";

// ─── Local Styles ────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  linedLine: {
    height: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: pdfColors.neutral300,
  },
  phaseHeader: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 3,
  },
  phaseHeaderText: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.white,
  },
  numberCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: pdfColors.brandTeal,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginRight: 8,
  },
  numberText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.white,
  },
  stepRow: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
    marginBottom: 12,
  },
  letterGreeting: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    color: pdfColors.neutral900,
  },
  letterParagraph: {
    fontSize: 11,
    lineHeight: 1.6,
    color: pdfColors.neutral700,
    marginBottom: 10,
  },
  letterClosing: {
    fontSize: 11,
    marginTop: 20,
    color: pdfColors.neutral700,
  },
  promptText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.neutral700,
    marginBottom: 4,
  },
});

// ─── Helper: extract string array from various data shapes ───────────────────

function toStringArray(val: any): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.map((v) => (typeof v === "string" ? v : v.text ?? v.name ?? v.description ?? String(v)));
  }
  if (typeof val === "string") return [val];
  return [];
}

// ─── Student Brief ───────────────────────────────────────────────────────────

function StudentBrief({
  data,
  project,
}: {
  data: any;
  project: { title: string; drivingQuestion: string };
}) {
  return (
    <Document>
      <PDFPage projectTitle={project.title} accentColor={pdfColors.brandTeal}>
        <Text style={pdfStyles.h1}>{project.title}</Text>

        <PDFCallout label="Driving Question" text={project.drivingQuestion} />

        {data.overview && (
          <PDFSection title="Overview">
            <Text style={pdfStyles.body}>{data.overview}</Text>
          </PDFSection>
        )}

        {toStringArray(data.expectations).length > 0 && (
          <PDFSection title="Expectations">
            <PDFBulletList items={toStringArray(data.expectations)} />
          </PDFSection>
        )}

        {toStringArray(data.timeline).length > 0 && (
          <PDFSection title="Timeline">
            <PDFBulletList items={toStringArray(data.timeline)} />
          </PDFSection>
        )}

        {toStringArray(data.teamRoles).length > 0 && (
          <PDFSection title="Team Roles">
            <PDFBulletList items={toStringArray(data.teamRoles)} />
          </PDFSection>
        )}
      </PDFPage>
    </Document>
  );
}

// ─── Reflection Journal ──────────────────────────────────────────────────────

function ReflectionJournal({
  data,
  project,
}: {
  data: any;
  project: { title: string; drivingQuestion: string };
}) {
  const phases = Array.isArray(data.phases)
    ? data.phases
    : Array.isArray(data)
      ? data
      : [1, 2, 3, 4, 5].map((n) => ({
          phase: n,
          prompts: data[`phase${n}`] ?? [],
        }));

  // Ensure we have 5 phases
  const allPhases = phases.slice(0, 5);

  return (
    <Document>
      {allPhases.map((phaseData: any, idx: number) => {
        const phaseNum = phaseData.phase ?? phaseData.phaseNumber ?? idx + 1;
        const pc = phaseColors[phaseNum] ?? {
          main: pdfColors.brandTeal,
          light: pdfColors.brandTealLight,
          name: `Phase ${phaseNum}`,
        };
        const prompts = toStringArray(phaseData.prompts ?? phaseData.questions ?? phaseData.reflectionPrompts);

        // Calculate how many lined lines we can fit after prompts
        const lineCount = Math.max(8, 18 - prompts.length * 2);

        return (
          <PDFPage
            key={phaseNum}
            projectTitle={project.title}
            phaseNumber={phaseNum}
            phaseName={pc.name}
          >
            <View style={[s.phaseHeader, { backgroundColor: pc.main }]}>
              <Text style={s.phaseHeaderText}>
                Phase {phaseNum}: {pc.name}
              </Text>
            </View>

            {prompts.map((prompt: string, pIdx: number) => (
              <View key={pIdx} style={pdfStyles.mb12}>
                <Text style={s.promptText}>
                  {pIdx + 1}. {prompt}
                </Text>
              </View>
            ))}

            {/* Lined paper area */}
            <View style={{ marginTop: 8 }}>
              {Array.from({ length: lineCount }).map((_, i) => (
                <View key={i} style={s.linedLine} />
              ))}
            </View>
          </PDFPage>
        );
      })}
    </Document>
  );
}

// ─── Critique Protocol ───────────────────────────────────────────────────────

function CritiqueProtocol({
  data,
  project,
}: {
  data: any;
  project: { title: string; drivingQuestion: string };
}) {
  const steps = Array.isArray(data.steps)
    ? data.steps
    : Array.isArray(data)
      ? data
      : [];
  const sentenceStarters = toStringArray(data.sentenceStarters ?? data.starters);

  return (
    <Document>
      <PDFPage projectTitle={project.title} accentColor={pdfColors.brandTeal}>
        <Text style={pdfStyles.h1}>Peer Critique Protocol</Text>
        <Text style={[pdfStyles.body, pdfStyles.mb16]}>
          {project.drivingQuestion}
        </Text>

        {steps.map((step: any, idx: number) => {
          const title = typeof step === "string" ? step : step.title ?? step.name ?? `Step ${idx + 1}`;
          const description =
            typeof step === "string" ? "" : step.description ?? step.instructions ?? "";

          return (
            <View key={idx} style={s.stepRow} wrap={false}>
              <View style={s.numberCircle}>
                <Text style={s.numberText}>{idx + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={pdfStyles.h3}>{title}</Text>
                {description ? (
                  <Text style={pdfStyles.body}>{description}</Text>
                ) : null}
              </View>
            </View>
          );
        })}

        {sentenceStarters.length > 0 && (
          <View style={{ marginTop: 12 }}>
            <PDFCallout
              label="Sentence Starters"
              text={sentenceStarters.join("\n")}
            />
          </View>
        )}
      </PDFPage>
    </Document>
  );
}

// ─── Parent Letter ───────────────────────────────────────────────────────────

function ParentLetter({
  data,
  project,
}: {
  data: any;
  project: { title: string; drivingQuestion: string };
}) {
  const paragraphs = toStringArray(data.paragraphs ?? data.body ?? data.content);
  const greeting = data.greeting ?? "Dear Families,";
  const closing = data.closing ?? "Sincerely,";
  const signature = data.signature ?? data.teacherName ?? "[Teacher Name]";

  return (
    <Document>
      <PDFPage projectTitle={project.title} accentColor={pdfColors.brandCoral}>
        <Text style={pdfStyles.h1}>{project.title}</Text>
        <Text style={[pdfStyles.caption, pdfStyles.mb16]}>
          Parent / Guardian Letter
        </Text>

        <Text style={s.letterGreeting}>{greeting}</Text>

        {paragraphs.map((p: string, idx: number) => (
          <Text key={idx} style={s.letterParagraph}>
            {p}
          </Text>
        ))}

        <Text style={s.letterClosing}>{closing}</Text>
        <Text style={[s.letterClosing, { marginTop: 4, fontFamily: "Helvetica-Bold" }]}>
          {signature}
        </Text>
      </PDFPage>
    </Document>
  );
}

// ─── Milestone Tracker ───────────────────────────────────────────────────────

function MilestoneTracker({
  data,
  project,
}: {
  data: any;
  project: { title: string; drivingQuestion: string };
}) {
  const milestones = Array.isArray(data.milestones)
    ? data.milestones
    : Array.isArray(data)
      ? data
      : [];

  const headers = ["Week", "Phase", "Milestone", "Deliverable"];
  const rows: string[][] = milestones.map((m: any) => [
    String(m.week ?? m.weekNumber ?? ""),
    m.phase ?? m.phaseName ?? "",
    m.milestone ?? m.title ?? m.name ?? "",
    m.deliverable ?? m.output ?? m.artifact ?? "",
  ]);

  return (
    <Document>
      <PDFPage projectTitle={project.title} accentColor={pdfColors.brandAmber}>
        <Text style={pdfStyles.h1}>Milestone Tracker</Text>
        <Text style={[pdfStyles.body, pdfStyles.mb16]}>
          {project.drivingQuestion}
        </Text>

        <PDFTable
          headers={headers}
          rows={rows}
          headerColor={pdfColors.brandTeal}
        />
      </PDFPage>
    </Document>
  );
}

// ─── HandoutPDF (Router) ─────────────────────────────────────────────────────

interface HandoutPDFProps {
  data: any;
  type: string;
  project: { title: string; drivingQuestion: string };
}

export function HandoutPDF({ data, type, project }: HandoutPDFProps) {
  switch (type) {
    case "student-brief":
      return <StudentBrief data={data} project={project} />;
    case "reflection-journal":
      return <ReflectionJournal data={data} project={project} />;
    case "critique-protocol":
      return <CritiqueProtocol data={data} project={project} />;
    case "parent-letter":
      return <ParentLetter data={data} project={project} />;
    case "milestone-tracker":
      return <MilestoneTracker data={data} project={project} />;
    default:
      // Fallback: render as student-brief layout
      return <StudentBrief data={data} project={project} />;
  }
}
