# PBLTeach Phase 2 -- Design Document

**Date:** 2026-04-03
**Status:** Approved
**Builds on:** Phase 1 MVP (complete and deployed)

---

## Overview

Phase 2 adds two tracks:
1. **Guide** -- Facilitation materials generator (the "killer feature" gap in the market)
2. **Explore modules** -- 4 remaining interactive learning modules

## Track A: Guide (Facilitation Materials)

### New Route: `/build/[projectId]/guide`

Teacher with a completed Learning Narrative generates classroom-ready materials.

### Architecture

- Sidebar: 8 material types as cards (icon + name + Generate button)
- Main area: HTML preview of generated content
- Download: `@react-pdf/renderer` generates formatted PDFs
- "Download All" button generates zip of all materials

### Materials (8 total)

| Material | Pages | Key Content |
|----------|-------|-------------|
| Facilitation Calendar | 3-8 | Day-by-day: session title, opening prompt, activities, teacher moves, closing, materials, time breakdown |
| Student Project Brief | 1 | DQ, expectations, timeline, team roles (student-facing language) |
| Product Rubric | 1 | Criteria rows, 4-level columns (Beginning/Developing/Proficient/Exemplary) |
| Process Rubric | 1 | Collaboration, inquiry, reflection criteria |
| Reflection Journal | 5 | One page per phase with prompts + lined writing space |
| Peer Critique Protocol | 1 | Step-by-step with sentence starters |
| Parent/Guardian Letter | 1 | What PBL is, what their child is working on, how to support |
| Project Milestone Tracker | 1 | Visual timeline of key dates and deliverables |

### PDF Design System

Every PDF follows:
- Header: PBLTeach wordmark (top-left), project title (center), phase indicator (top-right)
- Fonts: Space Grotesk Bold 24pt headlines, DM Sans Regular 11pt body (1.5 line-height)
- 0.75" margins
- Phase color accent bar on left edge (4px)
- Footer: page number
- Two-column layout for facilitation calendars
- Single column for handouts and rubrics

### New Gemini Prompts

- `facilitation-calendar.ts` -- Full project JSON -> day-by-day calendar with all fields
- `rubric.ts` -- Product and process rubric variants
- `handout.ts` -- Student brief, reflection journal, critique protocol, parent letter, milestone tracker

### New API Routes

- `POST /api/generate/facilitation-calendar`
- `POST /api/generate/rubric`
- `POST /api/generate/handout`

### UI Flow

1. Teacher navigates from Learning Narrative view -> "Generate Materials" button
2. Guide page loads with 8 material cards in sidebar
3. Click "Generate" on any -> Gemini streams content -> HTML preview in main area
4. "Download PDF" generates @react-pdf/renderer version
5. Account required (auth gate on this page)

---

## Track B: Explore Modules (4 remaining)

All modules wrap in ModuleLayout with progress bar and "Try it" CTA.

### Module: "The Gold Standard" (`/explore/gold-standard`)

**Duration:** 7-10 min
**Learning goal:** Know the 7 elements, understand you can start with just 2

**Interactive element: Element Builder**
- 7 Gold Standard elements as toggleable cards in an arc layout
- Gold Standard Gauge (existing component) in center, updates live
- At 2/7: callout "This is all you need to start -- a driving question and a public product"
- At 7/7: celebration state
- Each element: expandable "What this looks like" with grade-band examples (elementary, middle, high)
- DQ Formula section with grade-level examples from PajamaPD deck (Gr 1, 3, 8, 10)

**Content from PajamaPD:** Slides 23-35 (Gold Standard elements, DQ Formula, grade examples, "Start with 2")

### Module: "Design Thinking 101" (`/explore/design-thinking`)

**Duration:** 7-10 min
**Learning goal:** Understand the DT process and how it powers the Create phase

**Interactive elements:**
1. **Process Simulator** -- 5 DT stages (Empathize, Define, Ideate, Prototype, Test) as horizontal flow. Click to expand with description, activities, classroom example, mindset connection.
2. **Squiggle to Star** -- Show a random squiggle SVG, user imagines transformation, reveal 3 possible outcomes with fade animation. Teaches "creative confidence" mindset. (From PajamaPD slide 7)
3. **Mindset Flip Cards** -- 10 Design Thinking mindsets as clickable cards, flip to see explanation. (From PajamaPD slide 42)
4. **DT ↔ Learning Narrative Connection** -- Animated SVG showing how DT stages map to Learning Narrative phases

**Content from PajamaPD:** Slides 39-52 (DT mindsets, creative confidence, culture of prototyping, GE MRI case study, PBL by Design framing)

### Module: "The Alphabet Soup Explained" (`/explore/alphabet-soup`)

**Duration:** 5-8 min
**Learning goal:** Name the key approaches and understand how they relate

**Interactive elements:**
1. **Comparison Tool** -- Two dropdown selectors, pick any 2 of 12 approaches, animated side-by-side comparison table. Differences highlighted in teal.
2. **Umbrella Diagram** -- Interactive SVG: PBL as large umbrella, other approaches nested/overlapping. Click any to see 2-sentence definition.
3. **"They're Related, Not Identical"** visual from PajamaPD slide 13

**Content from PajamaPD:** Slides 11-21 (alphabet soup problem, each approach defined, cheat sheet, umbrella diagram)

### Module: "PBL + AI" (`/explore/pbl-and-ai`)

**Duration:** 5-7 min
**Learning goal:** Understand how AI supports but doesn't replace PBL design

**Interactive elements:**
1. **AI Role Sorter** -- 8 PBL tasks, drag/click into 3 buckets: "Human should do this" / "AI can help" / "Either/both". No single right answer -- show suggested arrangement after.
2. **"Start Human, Use AI, End Human" Timeline** -- Visual process showing the philosophy in action
3. **Live demo connection** -- "You're using PBLTeach right now -- here's how it applies this philosophy"

**Content from PajamaPD:** Slides 82-87 (AI prompting examples, 4-step workflow, "Start Human. Use AI. End Human.")

---

## Tech Additions

| Addition | Purpose |
|----------|---------|
| `@react-pdf/renderer` | Server-side PDF generation |
| PDF theme components | Reusable header, footer, typography for all PDFs |

## Decisions

- `@react-pdf/renderer` for PDFs (not HTML print)
- Full detail for every day in facilitation calendar (not partial)
- Full interactivity for all 4 Explore modules
- PajamaPD content woven into Explore modules (GE MRI, Squiggle Birds, DQ examples, Garden City spotlights)
