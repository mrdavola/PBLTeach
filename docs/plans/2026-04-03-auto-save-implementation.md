# Auto-Save Dashboard -- Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Auto-save drafts from Builder and Quick Create to Firestore on every meaningful action, show all saved items in a unified dashboard.

**Architecture:** Add a `source` field to Project, replace the manual "Save Draft" button with automatic saves at each step transition in the Builder wizard, and auto-save Quick Create results as draft projects. Dashboard shows all items with source badges.

**Tech Stack:** Next.js 16, Firebase Firestore, React hooks

---

## Task 1: Add `source` Field to Project Type

**Files:**
- Modify: `src/lib/types/project.ts`

**Step 1: Add source field**

Add after the `status` field (line 3 of the Project interface):

```typescript
source?: "builder" | "quick-create" | "analyze";
```

**Step 2: Commit**

```bash
git add src/lib/types/project.ts
git commit -m "feat: add source field to Project type for tracking origin"
```

---

## Task 2: Auto-Save in Builder Wizard

**Files:**
- Modify: `src/components/build/builder-wizard.tsx`

**Step 1: Add auto-save state and a saved indicator**

Add state:
```typescript
const [savedProjectId, setSavedProjectId] = useState<string | null>(null);
const [saveIndicator, setSaveIndicator] = useState<string | null>(null);
```

Add an `autoSave` function that silently saves to Firestore:
```typescript
const autoSave = useCallback(async (
  formData: BuilderInput | null,
  selectedDQ: string,
  narrativeData: any,
  currentStep: number,
) => {
  if (!user || !formData) return;

  const draftProject = buildProjectDraft({
    formData,
    selectedDQ,
    narrativeData,
    projectId: savedProjectId || undefined,
  });
  draftProject.source = "builder";

  try {
    const id = await save(draftProject);
    setSavedProjectId(id);
    setSaveIndicator("Saved");
    setTimeout(() => setSaveIndicator(null), 2000);
  } catch {
    // Silent fail — localStorage backup is still happening
  }
}, [user, save, savedProjectId]);
```

**Step 2: Call autoSave at each step transition**

In `handleFormSubmit`, after `setFormData(data)` and `setCurrentStep(2)`, add:
```typescript
autoSave(data, effectiveSelectedDQ, effectiveNarrativeData, 2);
```

In `handleDQSelect`, after `setSelectedDQ(dq)`, add:
```typescript
autoSave(effectiveFormData, dq, effectiveNarrativeData, 2);
```

In `handleGoToStep3`, the narrative hasn't generated yet, so don't save here. Instead, add a `useEffect` that watches `narrativeData` and saves when generation completes:
```typescript
useEffect(() => {
  if (narrativeData && !narrativeStreaming && effectiveFormData) {
    autoSave(effectiveFormData, effectiveSelectedDQ, narrativeData as any, 3);
  }
}, [narrativeData, narrativeStreaming]);
```

**Step 3: Remove the manual "Save Draft" button**

Remove the `handleSaveDraft` callback entirely.

Replace the "Save Draft" button in the step 3 UI with a save indicator:
```tsx
{saveIndicator && (
  <span className="text-sm text-brand-teal flex items-center gap-1">
    <Check className="size-4" />
    {saveIndicator}
  </span>
)}
```

Import `Check` from `lucide-react`.

Keep the `saveMessage` and `saveError` state display for backwards compatibility, but they won't be triggered anymore.

**Step 4: Remove the Back/Save Draft header row**

In the step 3 rendering section, find the row with "Back" button and "Save Draft" button. Remove the "Save Draft" button. Keep the "Back" button.

**Step 5: Commit**

```bash
git add src/components/build/builder-wizard.tsx
git commit -m "feat: auto-save builder drafts to Firestore on each step"
```

---

## Task 3: Auto-Save Quick Create Results

**Files:**
- Modify: `src/components/build/quick-create-flow.tsx`

**Step 1: Add auto-save after generation**

Add imports:
```typescript
import { useAuth } from "@/hooks/use-auth";
import { useProject } from "@/hooks/use-project";
import { Check } from "lucide-react";
import type { QuickCreateResult } from "@/lib/types/project";
```

Add state and hooks inside the component:
```typescript
const { user } = useAuth();
const { save } = useProject();
const [savedProjectId, setSavedProjectId] = useState<string | null>(null);
const [saveIndicator, setSaveIndicator] = useState<string | null>(null);
```

Add a `useEffect` that saves when `data` arrives and streaming is done:
```typescript
useEffect(() => {
  if (!data || isStreaming || !user || savedProjectId) return;

  const draftProject = {
    status: "draft" as const,
    source: "quick-create" as const,
    title: description.trim() || "Quick Plan",
    gradeLevel: "",
    subjects: [],
    topic: description.trim(),
    duration: data.suggestedDuration,
    comfortLevel: "new" as const,
    drivingQuestion: {
      selected: data.drivingQuestion,
      options: [data.drivingQuestion],
      formula: data.formula,
    },
  };

  save(draftProject)
    .then((id) => {
      setSavedProjectId(id);
      setSaveIndicator("Saved to dashboard");
      setTimeout(() => setSaveIndicator(null), 3000);
    })
    .catch(() => {
      // Silent fail
    });
}, [data, isStreaming, user, savedProjectId, description, save]);
```

**Step 2: Update "Build the full plan" to use saved project ID**

Replace `handleBuildFullPlan`:
```typescript
const handleBuildFullPlan = useCallback(() => {
  if (savedProjectId) {
    router.push(`/build/${savedProjectId}`);
  } else {
    const params = new URLSearchParams();
    if (data) {
      params.set("topic", description.trim());
      params.set("duration", data.suggestedDuration);
    }
    router.push(`/build/new?${params.toString()}`);
  }
}, [router, data, description, savedProjectId]);
```

**Step 3: Show save indicator and remove "Save for later" button**

Add the save indicator after the action buttons:
```tsx
{saveIndicator && (
  <p className="text-sm text-brand-teal flex items-center gap-1">
    <Check className="size-4" />
    {saveIndicator}
  </p>
)}
```

Remove the "Save for later" button `AssembleItem` entirely — saving is automatic now.

**Step 4: Commit**

```bash
git add src/components/build/quick-create-flow.tsx
git commit -m "feat: auto-save Quick Create results as draft projects"
```

---

## Task 4: Update Dashboard Project Card with Source Badge

**Files:**
- Modify: `src/components/dashboard/project-card.tsx`

**Step 1: Add source badge**

Update the status display section to also show source:
```typescript
const sourceLabel =
  project.source === "quick-create"
    ? "Quick Plan"
    : project.source === "analyze"
      ? "From Analysis"
      : null;
```

Add the source badge next to the status badge:
```tsx
{sourceLabel && (
  <span className="inline-flex items-center rounded-full bg-brand-indigo/10 px-2 py-0.5 text-xs font-medium text-brand-indigo">
    {sourceLabel}
  </span>
)}
```

**Step 2: Commit**

```bash
git add src/components/dashboard/project-card.tsx
git commit -m "feat: show source badge on dashboard project cards"
```

---

## Task 5: Add Dashboard to Navigation

**Files:**
- Modify: `src/components/layout/header.tsx`

**Step 1: Add Dashboard link for authenticated users**

In the header, add a "My Projects" link that only shows when the user is authenticated. Add it before the user dropdown (desktop) and before the nav links (mobile).

In the desktop nav section, after the nav links loop and before the auth section, add:
```tsx
{isAuthenticated && (
  <Link
    href="/dashboard"
    className={cn(
      "font-body font-medium transition-colors",
      pathname === "/dashboard"
        ? "text-brand-teal font-bold"
        : "text-neutral-700 hover:text-brand-teal"
    )}
  >
    My Projects
  </Link>
)}
```

Do the same in the mobile nav section.

**Step 2: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "feat: add My Projects link to nav for authenticated users"
```

---

## Task 6: Final Build + Deploy

**Step 1: Verify build**

Run: `npm run build`
Expected: All routes compile.

**Step 2: Push**

```bash
git push
```

---

## Summary

| Task | Description | Complexity |
|------|-------------|-----------|
| 1 | Add `source` field to Project type | Low |
| 2 | Auto-save in Builder wizard | High |
| 3 | Auto-save Quick Create results | Medium |
| 4 | Source badge on dashboard cards | Low |
| 5 | Dashboard link in nav | Low |
| 6 | Final build + deploy | Low |
