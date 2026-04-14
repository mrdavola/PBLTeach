# Rescue Mode -- Design Document

**Date:** 2026-04-04
**Status:** Approved

---

## Overview

A guided triage flow for teachers mid-project. 3-4 quick questions generate a prioritized action plan, with an option to revise their saved project. Available from multiple entry points across the app.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Input method | Guided questionnaire (3-4 MC questions) | Structured enough for good AI output, fast for teachers in crisis |
| Output | Triage card + optional plan revision | Immediate actions first, deeper revision optional |
| Saved project | Works with or without | Questionnaire adapts based on whether they select a saved project |
| Location | `/rescue` with multiple entry points | Easy to find from wherever a struggling teacher is |

## Route

`/rescue` -- single page, "use client"

## Entry Points

1. **Homepage** -- quick-start prompt "I'm mid-project and things are messy" routes to `/rescue`
2. **Builder** -- "Need help?" link on step 3 (learning narrative view)
3. **Dashboard** -- "Rescue a project" link

## Flow

### Step 1: Context

- "Select a project" dropdown (pulls from user's saved projects via `useProject().loadAll()`)
- OR "I don't have one saved" option
- If no saved project selected: show grade level, subject, topic, and brief description inputs
- If saved project selected: skip to Step 2 (context comes from the project)

### Step 2: Triage Questionnaire

4 questions, all on one screen:

1. **"What phase are you in?"** -- radio buttons
   - Entry Event / Investigation / Problem-Design / Create / Share / Not sure

2. **"What's going wrong?"** -- checkboxes (select all that apply)
   - Timing ("We're running out of time")
   - Engagement ("Students are checked out or off-task")
   - Quality ("The work is shallow or not rigorous")
   - Logistics ("I can't manage all the moving parts")
   - Scope ("The project got too big or too vague")

3. **"How much time do you have left?"** -- radio buttons
   - 1 day / 2-3 days / 1 week / 2+ weeks

4. **"Anything else?"** -- optional freeform textarea

"Get my rescue plan" button submits to Gemini.

### Step 3: Triage Card (Gemini-generated)

- Title: "Your Rescue Plan"
- 3-5 prioritized actions, each with:
  - Urgency label: "Do tomorrow" / "This week" / "Going forward"
  - Concrete action title (bold)
  - What to do (1-2 sentences)
  - Why it helps (1 sentence, lighter text)
- Sorted by urgency (tomorrow first)
- Clean, scannable layout

### Step 4: Actions

Below the triage card:
- **"Revise my plan"** button (if they selected a saved project):
  - Sends project + triage answers to Gemini
  - Gets a revised Learning Narrative with compressed timeline / adjusted activities
  - Saves as a NEW draft project (title: "Original Title (rescued)")
  - Navigates to `/build/{newProjectId}`
- **"Build a new project"** button (if no saved project):
  - Routes to `/build/new` with grade/subject/topic pre-filled from the questionnaire
- **"Save this rescue plan"** -- auto-saves the triage card to dashboard

## Data Model

Add `"rescue"` to the Project source type:
```typescript
source?: "builder" | "quick-create" | "analyze" | "rescue";
```

The rescue plan saves as a draft project with:
- `source: "rescue"`
- `title`: from the project or from the questionnaire topic
- Triage card content stored in a new optional field:
```typescript
rescue?: {
  currentPhase: string;
  problems: string[];
  timeLeft: string;
  additionalNotes?: string;
  triageActions: Array<{
    urgency: "tomorrow" | "this-week" | "going-forward";
    title: string;
    action: string;
    why: string;
  }>;
};
```

## Gemini Prompt

New prompt file: `src/lib/gemini/prompts/rescue-triage.ts`

Takes: project context (grade, subject, topic, DQ, current phase), problems array, time left, additional notes.

Returns JSON:
```json
{
  "triageActions": [
    {
      "urgency": "tomorrow",
      "title": "Reset expectations with students",
      "action": "Start class with a 5-minute 'where are we?' circle. Acknowledge the mess. Ask students what they think needs to happen.",
      "why": "Students who understand the situation become problem-solvers instead of passengers."
    }
  ]
}
```

## New Components

- `src/app/rescue/page.tsx` -- the rescue page
- `src/components/rescue/context-step.tsx` -- project selector or manual context input
- `src/components/rescue/triage-form.tsx` -- the 4-question form
- `src/components/rescue/triage-card.tsx` -- the generated rescue plan display

## Navigation

Update the homepage quick-start prompt "I'm mid-project and things are messy" to route to `/rescue` instead of `/build?description=...`.

Add a "Need help?" link to the builder step 3 view.

Add a "Rescue a project" link to the dashboard.
