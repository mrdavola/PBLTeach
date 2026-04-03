# PBLTeach Phase 3 -- Design Document

**Date:** 2026-04-03
**Status:** Approved
**Builds on:** Phase 1 + Phase 2 (complete and deployed)

---

## Overview

Phase 3 adds the Scope and Sequence Analyzer -- the "killer feature" nobody else has. Teachers and administrators upload curriculum documents and get cross-curricular PBL opportunities with visual timelines.

## Two User Flows

**Individual teacher:** Uploads 1 scope and sequence, gets PBL entry points within their existing curriculum.

**District/cross-curricular:** Uploads 2+ documents for different subjects/grades, finds overlapping topics where joint PBL projects naturally fit.

## New Routes

- `/analyze` -- Upload interface
- `/analyze/results` -- Results with timeline + opportunity cards

## Document Parsing Pipeline

```
Upload (PDF/DOCX)
  → pdf-parse / mammoth (text extraction)
  → Gemini (structured parsing: units, topics, standards, timing)
  → Firestore (save parsed data)
  → Analysis (Gemini finds PBL opportunities / cross-curricular overlaps)
```

### Text Extraction
- `pdf-parse` for PDFs -- extracts raw text
- `mammoth` for DOCX -- converts to plain text
- Server-side in API routes

### Gemini Structured Parsing
Extracted text sent to Gemini with a prompt requesting:
```json
{
  "units": [
    {
      "title": "Fractions",
      "topics": ["equivalent fractions", "comparing fractions"],
      "standards": ["4.NF.1", "4.NF.2"],
      "estimatedWeeks": 3,
      "weekRange": [4, 6]
    }
  ]
}
```

### Standards Fallback
No static standards database. When no documents are uploaded, Gemini's knowledge of CCSS/NGSS serves as fallback for suggesting cross-curricular connections based on grade + subject.

## Analysis Engine

### Individual Analysis
Gemini takes parsed units and suggests PBL entry points:
- Which units have natural real-world connections
- Authentic audience suggestions
- Product opportunities
- Suggested driving questions
- Recommended duration (micro/mini/full)

### Cross-Curricular Analysis
Gemini takes parsed units from multiple subjects:
- Finds overlapping timing (same or adjacent weeks)
- Identifies related topics across subjects
- Suggests joint PBL projects
- Provides driving questions for each opportunity
- Rates feasibility (easy/moderate/ambitious)
- Includes a one-line pitch for proposing to colleagues

## Results UI

### Visual Timeline (top)
- SVG Gantt-style chart
- X-axis: weeks 1-40
- Y-axis: one row per uploaded subject
- Units as colored bars (subject-specific colors)
- Overlapping periods: pulsing teal overlay
- Click overlap to scroll to opportunity card
- Horizontal scroll on mobile

### Opportunity Cards (below timeline)
Sorted by feasibility (easiest first). Each card:
- Subjects involved (badges)
- Overlapping topics from each subject
- Timing: "Weeks 4-6"
- Suggested driving question
- Feasibility badge (Easy / Moderate / Ambitious)
- One-line pitch
- "Build this" button → Builder with pre-filled data

## Storage

- Uploaded files: Firebase Storage (`users/{userId}/uploads/`)
- Parsed data: Firestore `users/{userId}/scopeSequences/{docId}` (matches ScopeSequence interface from types)
- Results cached in Firestore, re-analyzed only when documents change

## Auth

Upload + analysis requires sign-in (auth gate).

## Tech Additions

| Addition | Purpose |
|----------|---------|
| `pdf-parse` | PDF text extraction |
| `mammoth` | DOCX text extraction |

## Decisions

- Hybrid parsing: local text extraction + Gemini structured parsing
- Gemini knowledge as standards fallback (no static database)
- Both individual and cross-curricular from the start
- Timeline + cards for results (visual wow + actionable detail)
- Firebase Storage for uploaded files
