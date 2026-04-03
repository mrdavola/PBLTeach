# Builder Drafts Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the step-3 builder crash, add hybrid draft persistence, and load saved drafts from `/build/[projectId]`.

**Architecture:** Normalize generated narrative data into render-safe strings before it reaches the phase cards. Persist the builder state through a shared draft serializer that writes to local storage for everyone and Firestore for signed-in users, then reuse that normalized project shape when loading a saved draft page.

**Tech Stack:** Next.js app router, React 19, TypeScript, Firebase Auth/Firestore, localStorage, node:test

---

### Task 1: Normalize phase content for step 3

**Files:**
- Modify: `/Users/md/PBLTeach/src/components/build/builder-wizard.tsx`
- Create: `/Users/md/PBLTeach/src/lib/project/builder-draft.ts`
- Create: `/Users/md/PBLTeach/src/lib/project/builder-draft.test.ts`

**Step 1: Write the failing test**

Write tests for a helper that converts the learning narrative response into render-safe `phaseContents`, especially phase 1 idea objects and phase 2 activity/resource objects.

**Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/lib/project/builder-draft.test.ts`

Expected: FAIL because the helper does not exist yet.

**Step 3: Write minimal implementation**

Create a helper module that:

- normalizes phase payloads into readable strings
- builds a normalized draft/project payload from builder state
- exposes local draft read/write helpers

Update `BuilderWizard` to use the normalized phase helper instead of passing raw objects through.

**Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/lib/project/builder-draft.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/build/builder-wizard.tsx src/lib/project/builder-draft.ts src/lib/project/builder-draft.test.ts
git commit -m "Fix builder phase content normalization"
```

### Task 2: Add hybrid draft saving to the builder

**Files:**
- Modify: `/Users/md/PBLTeach/src/components/build/builder-wizard.tsx`
- Modify: `/Users/md/PBLTeach/src/components/build/learning-narrative-view.tsx`
- Modify: `/Users/md/PBLTeach/src/components/build/dq-generator.tsx`
- Modify: `/Users/md/PBLTeach/src/components/build/quick-create-flow.tsx` if needed for entry consistency
- Reuse: `/Users/md/PBLTeach/src/hooks/use-project.ts`
- Reuse: `/Users/md/PBLTeach/src/hooks/use-auth.ts`

**Step 1: Write the failing test**

Extend the builder draft helper tests to cover local save/restore payload shape and project normalization for Firestore save.

**Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/lib/project/builder-draft.test.ts`

Expected: FAIL until serializer behavior is implemented.

**Step 3: Write minimal implementation**

In the builder:

- restore a local draft on load
- autosave draft state locally when builder inputs change
- add Save Draft button(s)
- if signed in, save normalized draft to Firestore and route to `/build/[projectId]`
- if signed out, save locally and show a confirmation message

**Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/lib/project/builder-draft.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/build/builder-wizard.tsx src/components/build/learning-narrative-view.tsx src/lib/project/builder-draft.ts src/lib/project/builder-draft.test.ts
git commit -m "Add hybrid draft saving to builder"
```

### Task 3: Load saved drafts at `/build/[projectId]`

**Files:**
- Modify: `/Users/md/PBLTeach/src/app/build/[projectId]/page.tsx`
- Possibly modify: `/Users/md/PBLTeach/src/components/build/learning-narrative-view.tsx`
- Reuse: `/Users/md/PBLTeach/src/hooks/use-project.ts`
- Reuse: `/Users/md/PBLTeach/src/hooks/use-auth.ts`

**Step 1: Write the failing test**

If practical, add a helper-level test for converting saved project data into `LearningNarrativeView` props. If not practical, rely on build verification after the page implementation.

**Step 2: Run test/build to verify current failure**

Run: `npm run build`

Expected: Existing build passes, but the page still renders placeholder behavior.

**Step 3: Write minimal implementation**

Replace the placeholder page with:

- auth-aware loader
- Firestore project fetch via `useProject().load`
- loading, error, and not-found states
- `LearningNarrativeView` rendering from saved project data
- “Back to dashboard” navigation

**Step 4: Run verification**

Run:

- `node --test --experimental-strip-types src/lib/project/builder-draft.test.ts`
- `npm run build`

Expected: PASS

**Step 5: Commit**

```bash
git add src/app/build/[projectId]/page.tsx src/components/build/learning-narrative-view.tsx src/lib/project/builder-draft.ts src/lib/project/builder-draft.test.ts
git commit -m "Load saved builder drafts from project page"
```

### Task 4: Final verification and publish

**Files:**
- Review touched builder, project, and page files only

**Step 1: Run focused tests**

Run: `node --test --experimental-strip-types src/lib/project/builder-draft.test.ts src/lib/gemini/client.test.ts src/lib/http/error-response.test.ts`

Expected: PASS

**Step 2: Run production build**

Run: `npm run build`

Expected: PASS

**Step 3: Inspect git diff**

Run: `git diff --stat`

Expected: only intended builder/draft files changed

**Step 4: Commit**

```bash
git add <touched files>
git commit -m "Complete builder draft and saved project flow"
```
