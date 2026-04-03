import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { pdfColors, pdfStyles, phaseColors } from "./theme";

// ─── Local Styles ────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.neutral300,
  },
  headerBrand: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.brandTeal,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.neutral900,
    textAlign: "center",
    flex: 1,
    marginHorizontal: 12,
  },
  phaseTag: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 54,
    right: 54,
    textAlign: "center",
    fontSize: 9,
    color: pdfColors.neutral500,
  },

  // Accent bar (left side)
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },

  // Section
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    color: pdfColors.neutral900,
  },

  // Table
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: pdfColors.neutral300,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.white,
    padding: 6,
    flex: 1,
  },
  tableCell: {
    fontSize: 10,
    padding: 6,
    flex: 1,
    color: pdfColors.neutral700,
  },

  // Bullet list
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 12,
    fontSize: 11,
    color: pdfColors.neutral500,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.5,
    color: pdfColors.neutral700,
  },

  // Callout
  callout: {
    backgroundColor: pdfColors.brandTealLight,
    borderLeftWidth: 3,
    borderLeftColor: pdfColors.brandTeal,
    padding: 10,
    marginBottom: 12,
    borderRadius: 2,
  },
  calloutLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.brandTealDark,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  calloutText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: pdfColors.neutral700,
  },
});

// ─── PDFHeader ───────────────────────────────────────────────────────────────

interface PDFHeaderProps {
  projectTitle: string;
  phaseName?: string;
  phaseNumber?: number;
}

export function PDFHeader({
  projectTitle,
  phaseName,
  phaseNumber,
}: PDFHeaderProps) {
  const phase =
    phaseNumber != null ? phaseColors[phaseNumber] ?? null : null;

  return (
    <View style={s.header} fixed>
      <Text style={s.headerBrand}>PBLTeach</Text>
      <Text style={s.headerTitle}>{projectTitle}</Text>
      {phaseName && phase ? (
        <Text
          style={[
            s.phaseTag,
            { backgroundColor: phase.light, color: phase.main },
          ]}
        >
          Phase {phaseNumber}: {phaseName}
        </Text>
      ) : (
        <Text style={{ width: 60 }} />
      )}
    </View>
  );
}

// ─── PDFFooter ───────────────────────────────────────────────────────────────

interface PDFFooterProps {
  pageNumber?: number;
}

export function PDFFooter(_props: PDFFooterProps) {
  return (
    <Text
      style={s.footer}
      fixed
      render={({ pageNumber, totalPages }) =>
        `${pageNumber} / ${totalPages}`
      }
    />
  );
}

// ─── PDFPage ─────────────────────────────────────────────────────────────────

interface PDFPageProps {
  children: React.ReactNode;
  projectTitle: string;
  phaseName?: string;
  phaseNumber?: number;
  accentColor?: string;
}

export function PDFPage({
  children,
  projectTitle,
  phaseName,
  phaseNumber,
  accentColor,
}: PDFPageProps) {
  const resolvedAccent =
    accentColor ??
    (phaseNumber != null
      ? phaseColors[phaseNumber]?.main ?? pdfColors.brandTeal
      : undefined);

  return (
    <Page size="A4" style={pdfStyles.page}>
      {resolvedAccent && (
        <View
          style={[s.accentBar, { backgroundColor: resolvedAccent }]}
          fixed
        />
      )}
      <PDFHeader
        projectTitle={projectTitle}
        phaseName={phaseName}
        phaseNumber={phaseNumber}
      />
      {children}
      <PDFFooter />
    </Page>
  );
}

// ─── PDFSection ──────────────────────────────────────────────────────────────

interface PDFSectionProps {
  title: string;
  children: React.ReactNode;
}

export function PDFSection({ title, children }: PDFSectionProps) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

// ─── PDFTable ────────────────────────────────────────────────────────────────

interface PDFTableProps {
  headers: string[];
  rows: string[][];
  headerColor?: string;
}

export function PDFTable({ headers, rows, headerColor }: PDFTableProps) {
  const bgColor = headerColor ?? pdfColors.brandTeal;

  return (
    <View style={{ marginBottom: 12 }}>
      {/* Header row */}
      <View style={[s.tableRow, { backgroundColor: bgColor, borderBottomWidth: 0 }]}>
        {headers.map((header, i) => (
          <Text key={i} style={s.tableHeaderCell}>
            {header}
          </Text>
        ))}
      </View>

      {/* Data rows */}
      {rows.map((row, rowIdx) => (
        <View
          key={rowIdx}
          style={[
            s.tableRow,
            rowIdx % 2 === 0
              ? { backgroundColor: pdfColors.neutral100 }
              : { backgroundColor: pdfColors.white },
          ]}
        >
          {row.map((cell, cellIdx) => (
            <Text key={cellIdx} style={s.tableCell}>
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

// ─── PDFBulletList ───────────────────────────────────────────────────────────

interface PDFBulletListProps {
  items: string[];
}

export function PDFBulletList({ items }: PDFBulletListProps) {
  return (
    <View style={{ marginBottom: 8 }}>
      {items.map((item, i) => (
        <View key={i} style={s.bulletRow}>
          <Text style={s.bulletDot}>{"\u2022"}</Text>
          <Text style={s.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── PDFCallout ──────────────────────────────────────────────────────────────

interface PDFCalloutProps {
  text: string;
  label?: string;
}

export function PDFCallout({ text, label }: PDFCalloutProps) {
  return (
    <View style={s.callout}>
      {label && <Text style={s.calloutLabel}>{label}</Text>}
      <Text style={s.calloutText}>{text}</Text>
    </View>
  );
}

// ─── Re-export Document for convenience ──────────────────────────────────────

export { Document };
