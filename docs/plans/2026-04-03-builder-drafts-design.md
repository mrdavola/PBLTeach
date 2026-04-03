# Builder Drafts Design

**Date:** 2026-04-03

## Goal

Fix the step-3 builder crash, add draft persistence for signed-in and signed-out users, and make saved drafts resumable from a stable project URL.

## Current Context

- Step 3 (`LearningNarrativeView`) renders phase content through [`PhaseCard`](/Users/md/PBLTeach/src/components/build/phase-card.tsx).
- The learning narrative prompt returns rich objects for several phase sections, but [`BuilderWizard`](/Users/md/PBLTeach/src/components/build/builder-wizard.tsx) currently passes some of those objects straight through as arrays expected to be strings.
- Firestore project persistence already exists in [`useProject`](/Users/md/PBLTeach/src/hooks/use-project.ts) and [`firestore.ts`](/Users/md/PBLTeach/src/lib/firebase/firestore.ts), but the builder never calls it and [`/build/[projectId]`](/Users/md/PBLTeach/src/app/build/[projectId]/page.tsx) is still a placeholder.

## Decision

Use a hybrid draft approach:

- Always save a local draft in `localStorage` while the user builds.
- If the user is signed in, expose a Save Draft action that writes the same normalized project payload to Firestore.
- Saved cloud drafts should reopen at `/build/[projectId]`.
- Signed-out users can resume locally on the same device.

## Data Flow

### Builder state

The builder keeps three kinds of state:

- form inputs from step 1
- selected driving question from step 2
- generated learning narrative and derived project data from step 3

This state should be normalized into a draft shape that can be stored either locally or in Firestore.

### Phase rendering

Before rendering, narrative phase payloads must be converted into readable string lists:

- entry event ideas -> strings combining title, description, materials, and time needed
- investigation activities -> strings combining title, description, duration, and type
- investigation resources -> strings combining title and description
- problem/design challenge -> need-to-know + expert suggestions + refined DQ as readable bullets
- create/share -> arrays and scalar fields flattened into strings

### Draft persistence

- Local draft key should be stable and builder-specific, for example `pblteach:builder-draft`.
- Firestore save should use existing `saveProject`.
- The draft payload should include `status: "draft"` plus title, overview fields, driving question, phases, assessment, cross-curricular, and gold-standard data when available.

## UI Changes

### Builder wizard

- Add a visible Save Draft button in step 2 and step 3.
- Show a short status message when a draft is saved locally or to the account.
- If a local draft exists when the builder loads, restore it automatically.

### Saved project page

- Replace the placeholder `/build/[projectId]` page with a real project loader using `useProject`.
- Render `LearningNarrativeView` from saved project data.
- Keep failure states friendly if the user is not signed in or the project cannot be found.

## Error Handling

- Step-3 generation/rendering should never pass raw objects into JSX list items.
- Save Draft should fail gracefully:
  - signed-out users still get local save
  - signed-in users get an inline error if Firestore save fails
- Local draft parsing should be defensive and ignore malformed saved data.

## Testing

- Add a focused test for phase-content normalization so object payloads become strings.
- Add a focused test for draft serialization/restoration helpers.
- Run targeted build verification after wiring `/build/[projectId]`.
