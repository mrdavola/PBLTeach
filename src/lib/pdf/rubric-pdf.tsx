import React from "react";
import { Document, View, Text } from "@react-pdf/renderer";
import { PDFPage, PDFTable } from "./components";
import { pdfColors, pdfStyles } from "./theme";

// ─── RubricPDF ───────────────────────────────────────────────────────────────

interface RubricPDFProps {
  data: {
    title?: string;
    type?: string;
    criteria?: any[];
  };
  project: { title: string };
}

export function RubricPDF({ data, project }: RubricPDFProps) {
  const title = data.title ?? `${data.type ?? "Product"} Rubric`;
  const criteria = Array.isArray(data.criteria) ? data.criteria : [];

  const headers = ["Criteria", "Beginning", "Developing", "Proficient", "Exemplary"];

  const rows: string[][] = criteria.map((c: any) => {
    if (Array.isArray(c.levels)) {
      // levels is an array of level descriptions
      const name = c.name ?? c.criterion ?? c.criteria ?? "";
      const levels = c.levels.map((l: any) =>
        typeof l === "string" ? l : l.description ?? l.text ?? String(l)
      );
      // Pad to 4 columns
      while (levels.length < 4) levels.push("");
      return [name, ...levels.slice(0, 4)];
    }

    // levels as named keys
    return [
      c.name ?? c.criterion ?? c.criteria ?? "",
      c.beginning ?? c.level1 ?? c.novice ?? "",
      c.developing ?? c.level2 ?? c.apprentice ?? "",
      c.proficient ?? c.level3 ?? c.practitioner ?? "",
      c.exemplary ?? c.level4 ?? c.expert ?? c.advanced ?? "",
    ];
  });

  return (
    <Document>
      <PDFPage projectTitle={project.title} accentColor={pdfColors.brandTeal}>
        <Text style={pdfStyles.h1}>{title}</Text>
        {data.type && (
          <Text style={[pdfStyles.caption, pdfStyles.mb12]}>
            Type: {data.type}
          </Text>
        )}

        <PDFTable
          headers={headers}
          rows={rows}
          headerColor={pdfColors.brandTeal}
        />
      </PDFPage>
    </Document>
  );
}
