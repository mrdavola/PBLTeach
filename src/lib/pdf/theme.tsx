import { StyleSheet } from "@react-pdf/renderer";

// ─── Color Tokens ────────────────────────────────────────────────────────────

export const pdfColors = {
  brandTeal: "#0D7377",
  brandTealLight: "#E0F2F1",
  brandTealDark: "#064E50",
  brandCoral: "#E8634A",
  coralLight: "#FFF0EC",
  brandIndigo: "#4338CA",
  indigoLight: "#EEF2FF",
  brandAmber: "#D97706",
  amberLight: "#FFFBEB",
  brandPurple: "#7C3AED",
  purpleLight: "#F5F3FF",
  neutral900: "#1A1A2E",
  neutral700: "#374151",
  neutral500: "#6B7280",
  neutral300: "#D1D5DB",
  neutral100: "#F5F5F0",
  white: "#FFFFFF",
  success: "#059669",
  error: "#DC2626",
};

// ─── Phase Colors ────────────────────────────────────────────────────────────

export const phaseColors: Record<
  number,
  { main: string; light: string; name: string }
> = {
  1: { main: "#E8634A", light: "#FFF0EC", name: "Entry Event" },
  2: { main: "#4338CA", light: "#EEF2FF", name: "Investigation" },
  3: { main: "#0D7377", light: "#E0F2F1", name: "Problem / Design Challenge" },
  4: { main: "#D97706", light: "#FFFBEB", name: "Create" },
  5: { main: "#7C3AED", light: "#F5F3FF", name: "Share" },
};

// ─── Shared Styles ───────────────────────────────────────────────────────────

export const pdfStyles = StyleSheet.create({
  // Page
  page: {
    padding: 54,
    paddingBottom: 72,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    color: pdfColors.neutral900,
  },

  // Typography
  h1: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    color: pdfColors.neutral900,
  },
  h2: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    color: pdfColors.neutral900,
  },
  h3: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    color: pdfColors.neutral900,
  },
  body: {
    fontSize: 11,
    lineHeight: 1.5,
    color: pdfColors.neutral700,
  },
  caption: {
    fontSize: 9,
    color: pdfColors.neutral500,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
  },

  // Layout helpers
  row: {
    flexDirection: "row" as const,
  },
  spaceBetween: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
});
