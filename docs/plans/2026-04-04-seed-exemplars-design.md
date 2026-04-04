# Seed Exemplar Projects -- Design Document

**Date:** 2026-04-04
**Status:** Approved

---

## Overview

A one-time Node script that generates 14 full PBL exemplar projects using the existing Gemini prompts and publishes them to the `community` Firestore collection under "PBLTeach Team."

## The 14 Projects

| # | Title | Grade | Subject(s) | Duration |
|---|-------|-------|-----------|----------|
| 1 | School Community / Active Citizens | 1 | Social Studies | mini |
| 2 | Kindness Campaign | 1 | ELA, SEL | micro |
| 3 | 2nd Grade Street | 2 | Math, Social Studies | mini |
| 4 | Create a Country | 3 | Social Studies, Science | full |
| 5 | Budget Park | 3 | Math | mini |
| 6 | Museum of New York | 4 | Social Studies, ELA | full |
| 7 | EPCOT World's Fair | 5 | Social Studies, Science | full |
| 8 | Eco-Report | 5 | Science | mini |
| 9 | Genius Hour | 6 | Cross-curricular | mini |
| 10 | Community Podcast | 7 | ELA | mini |
| 11 | PSA Campaign | 8 | Health | mini |
| 12 | UN Sustainable Development Goals | 10 | Social Studies | full |
| 13 | Policy Proposal | 10 | Government | mini |
| 14 | Startup Pitch | 11 | Cross-curricular | full |

## Script Flow

1. For each project: call Gemini with the DQ generation prompt -> get driving questions, pick the first
2. Call Gemini with the Learning Narrative prompt -> get full 5-phase content
3. Build a complete Project object
4. Write to `community/{id}` with published metadata
5. First 4 projects get `featured: true` for the Staff Picks carousel

## Published Metadata

```typescript
published: {
  publishedAt: serverTimestamp(),
  authorName: "PBLTeach Team",
  authorSchool: undefined,
  featured: index < 4, // first 4 are Staff Picks
  hidden: false,
  ratingSum: 0,
  ratingCount: 0,
  adaptationCount: 0,
}
```

## Script Location

`scripts/seed-exemplars.ts`, run with `npx tsx scripts/seed-exemplars.ts`

## Dependencies

- `GEMINI_API_KEY` from `.env.local`
- Firebase config from `.env.local`
- `tsx` (dev dependency for running TypeScript scripts)
