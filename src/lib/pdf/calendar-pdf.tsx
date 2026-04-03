import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { PDFPage, PDFSection, PDFBulletList, PDFCallout } from "./components";
import { pdfColors, phaseColors, pdfStyles } from "./theme";

// ─── Local Styles ────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  weekHeader: {
    backgroundColor: pdfColors.brandTealLight,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderRadius: 2,
  },
  weekHeaderText: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.brandTealDark,
  },
  dayRow: {
    flexDirection: "row" as const,
    gap: 8,
    marginBottom: 8,
  },
  dayBlock: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: pdfColors.neutral300,
    borderRadius: 3,
    padding: 8,
    paddingLeft: 12,
    position: "relative" as const,
  },
  phaseBar: {
    position: "absolute" as const,
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  dayTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.neutral900,
    marginBottom: 4,
  },
  dayPhaseLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  teacherMoves: {
    fontSize: 9,
    fontFamily: "Helvetica-Oblique",
    color: pdfColors.neutral500,
    marginBottom: 4,
  },
  materialsRow: {
    fontSize: 8,
    color: pdfColors.neutral500,
    marginTop: 2,
  },
  timeItem: {
    fontSize: 8,
    color: pdfColors.neutral500,
  },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function groupByWeek(days: any[]): Map<number, any[]> {
  const weeks = new Map<number, any[]>();
  for (const day of days) {
    const week = day.week ?? Math.ceil((day.day ?? 1) / 5);
    if (!weeks.has(week)) weeks.set(week, []);
    weeks.get(week)!.push(day);
  }
  return weeks;
}

function getPhaseColor(phase: number | undefined) {
  if (phase == null) return { main: pdfColors.brandTeal, light: pdfColors.brandTealLight, name: "" };
  return phaseColors[phase] ?? { main: pdfColors.brandTeal, light: pdfColors.brandTealLight, name: "" };
}

// ─── Day Block ───────────────────────────────────────────────────────────────

function DayBlock({ day }: { day: any }) {
  const phase = getPhaseColor(day.phase);
  const activities: string[] = Array.isArray(day.activities)
    ? day.activities.map((a: any) => (typeof a === "string" ? a : a.activity ?? a.name ?? String(a)))
    : [];
  const teacherMoves: string[] = Array.isArray(day.teacherMoves)
    ? day.teacherMoves
    : day.teacherMoves
      ? [day.teacherMoves]
      : [];
  const materials: string[] = Array.isArray(day.materials) ? day.materials : [];
  const timeBreakdown: any[] = Array.isArray(day.timeBreakdown)
    ? day.timeBreakdown
    : Array.isArray(day.schedule)
      ? day.schedule
      : [];

  return (
    <View style={s.dayBlock} wrap={false}>
      <View style={[s.phaseBar, { backgroundColor: phase.main }]} />

      <Text style={s.dayTitle}>
        Day {day.day ?? day.dayNumber ?? "?"} — {day.title ?? day.sessionTitle ?? "Session"}
      </Text>

      {phase.name ? (
        <Text style={[s.dayPhaseLabel, { color: phase.main }]}>
          {phase.name}
        </Text>
      ) : null}

      {(day.openingPrompt || day.whatToSay) ? (
        <PDFCallout
          label="What to say:"
          text={day.openingPrompt ?? day.whatToSay ?? ""}
        />
      ) : null}

      {activities.length > 0 && <PDFBulletList items={activities} />}

      {teacherMoves.length > 0 && (
        <Text style={s.teacherMoves}>
          Teacher moves: {teacherMoves.join("; ")}
        </Text>
      )}

      {materials.length > 0 && (
        <Text style={s.materialsRow}>
          Materials: {materials.join(", ")}
        </Text>
      )}

      {timeBreakdown.length > 0 && (
        <View style={{ marginTop: 2 }}>
          {timeBreakdown.map((t: any, i: number) => (
            <Text key={i} style={s.timeItem}>
              {typeof t === "string" ? t : `${t.duration ?? t.minutes ?? ""}min — ${t.activity ?? t.task ?? t.description ?? ""}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── CalendarPDF ─────────────────────────────────────────────────────────────

interface CalendarPDFProps {
  data: any[];
  project: { title: string; drivingQuestion: string };
}

export function CalendarPDF({ data, project }: CalendarPDFProps) {
  const weeks = groupByWeek(data);
  const weekEntries = Array.from(weeks.entries()).sort(([a], [b]) => a - b);

  return (
    <Document>
      <PDFPage projectTitle={project.title} accentColor={pdfColors.brandTeal}>
        <Text style={pdfStyles.h1}>Facilitation Calendar</Text>
        <Text style={[pdfStyles.body, pdfStyles.mb16]}>
          {project.drivingQuestion}
        </Text>

        {weekEntries.map(([weekNum, days]) => {
          // Pair days for side-by-side layout
          const pairs: any[][] = [];
          for (let i = 0; i < days.length; i += 2) {
            pairs.push(days.slice(i, i + 2));
          }

          return (
            <View key={weekNum} style={pdfStyles.mb16}>
              <View style={s.weekHeader}>
                <Text style={s.weekHeaderText}>Week {weekNum}</Text>
              </View>

              {pairs.map((pair, pairIdx) => (
                <View key={pairIdx} style={s.dayRow}>
                  {pair.map((day: any, dayIdx: number) => (
                    <DayBlock key={dayIdx} day={day} />
                  ))}
                  {pair.length === 1 && <View style={{ flex: 1 }} />}
                </View>
              ))}
            </View>
          );
        })}
      </PDFPage>
    </Document>
  );
}
