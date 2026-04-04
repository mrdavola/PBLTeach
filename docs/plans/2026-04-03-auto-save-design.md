# Auto-Save Dashboard -- Design Document

**Date:** 2026-04-03
**Status:** Approved

---

## Overview

Every flow (Builder, Quick Create, Analyze) auto-saves to Firestore on each meaningful action. The dashboard shows a single unified list of all saved items. All saved items open in the Builder.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Save trigger | On every meaningful action | Teachers shouldn't think about saving |
| Dashboard layout | Single unified list | Simplest; teachers don't think in flow types |
| Saved item behavior | Everything opens in Builder | Builder is the hub; all flows converge there |

## Save Triggers

### Builder Wizard
- After form submit (step 1 complete): save project draft with form data
- After DQ selection (step 2): update draft with selected DQ
- After narrative generation complete (step 3): update draft with full narrative
- Silent saves, no button click needed

### Quick Create
- After generation completes: convert to `Partial<Project>` with `status: "draft"`, save via `saveProject`
- Title comes from the user's description
- "Build the full plan" navigates to `/build/{savedProjectId}` instead of `/build/new?params`

### Analyze
- Parsed documents already save to `scopeSequences` (existing)
- "Build this" on opportunities already creates a Builder draft (existing)
- No additional changes needed for Analyze

## Data Model

Add `source` field to Project interface:

```typescript
source?: "builder" | "quick-create" | "analyze";
```

No new collections or types. Quick Create results map to existing `Partial<Project>` and save via `saveProject`.

## Dashboard Changes

- Add `source` badge on project cards ("Draft", "Quick Plan")
- All cards already link to `/build/{projectId}` (existing)
- Add "Dashboard" link to header nav (between logo and Explore)

## Builder Changes

- Remove manual "Save Draft" button
- Add small "Saved" indicator (checkmark + "Saved" text, fades after 2s)
- Auto-save on each step transition
- Keep localStorage fallback for unauthenticated users

## Quick Create Changes

- After generation: auto-save as draft project if signed in
- Store the `projectId` so "Build the full plan" can navigate to `/build/{projectId}`
- Show "Saved to dashboard" indicator

## Auth Behavior

- Signed in: auto-save to Firestore, show "Saved" indicator
- Not signed in: localStorage fallback (existing), prompt to sign in to save
