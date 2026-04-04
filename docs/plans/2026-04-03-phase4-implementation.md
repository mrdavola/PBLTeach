# PBLTeach Phase 4: Community -- Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a community library where teachers publish, discover, rate, and adapt PBL units from other educators.

**Architecture:** Published projects are copied to a top-level `community` Firestore collection for anonymous browsing. Browse page uses an editorial layout (Staff Picks carousel + auto-generated collection rows + filtered grid). Project detail shows full Learning Narrative with star rating and "Adapt this" cloning. Publish flow is a modal on the existing project view page.

**Tech Stack:** Next.js 16, Firebase Firestore, Framer Motion, Lucide icons, shadcn/ui components

---

## Task 1: Update Community Types

**Files:**
- Modify: `src/lib/types/community.ts`

**Step 1: Update the CommunityProject interface**

Replace the existing `CommunityProject` and `Review` interfaces. The new `CommunityProject` extends the full Project data with community-specific fields:

```typescript
import type { Project } from "./project";

export interface CommunityProject extends Omit<Project, "status"> {
  status: "published";
  published: {
    publishedAt: Date;
    authorName: string;
    authorSchool?: string;
    featured: boolean;
    hidden: boolean;
    ratingSum: number;
    ratingCount: number;
    adaptationCount: number;
  };
}

export interface Rating {
  score: number; // 1-5
  createdAt: Date;
}
```

**Step 2: Commit**

```bash
git add src/lib/types/community.ts
git commit -m "feat: update CommunityProject type to extend Project with published metadata"
```

---

## Task 2: Community Firestore Helpers

**Files:**
- Modify: `src/lib/firebase/firestore.ts`

**Step 1: Add imports**

Add `where`, `limit`, `increment` to the existing firebase/firestore import. Add `CommunityProject`, `Rating` to the types import.

**Step 2: Add community operations**

Append these functions after the scope sequence operations:

```typescript
// Community operations
export async function publishProject(
  userId: string,
  projectId: string,
  authorName: string,
  authorSchool?: string
): Promise<void> {
  if (!db) throw new Error("Firebase not configured");

  // Read the user's project
  const projectSnap = await getDoc(
    doc(db, "users", userId, "projects", projectId)
  );
  if (!projectSnap.exists()) throw new Error("Project not found");

  const projectData = projectSnap.data();

  // Write to community collection
  const communityRef = doc(db, "community", projectId);
  await setDoc(communityRef, {
    ...projectData,
    id: projectId,
    userId,
    status: "published",
    published: {
      publishedAt: serverTimestamp(),
      authorName,
      authorSchool: authorSchool || null,
      featured: false,
      hidden: false,
      ratingSum: 0,
      ratingCount: 0,
      adaptationCount: 0,
    },
  });

  // Update original project status
  await updateDoc(doc(db, "users", userId, "projects", projectId), {
    status: "published",
  });
}

export async function getCommunityProjects(
  filters?: {
    subject?: string;
    gradeLevel?: string;
    duration?: string;
    featured?: boolean;
  },
  maxResults = 50
): Promise<CommunityProject[]> {
  if (!db) return [];

  const constraints: any[] = [
    where("published.hidden", "==", false),
  ];

  if (filters?.featured) {
    constraints.push(where("published.featured", "==", true));
  }
  if (filters?.subject) {
    constraints.push(where("subjects", "array-contains", filters.subject));
  }
  if (filters?.gradeLevel) {
    constraints.push(where("gradeLevel", "==", filters.gradeLevel));
  }
  if (filters?.duration) {
    constraints.push(where("duration", "==", filters.duration));
  }

  constraints.push(orderBy("published.publishedAt", "desc"));
  constraints.push(limit(maxResults));

  const q = query(collection(db, "community"), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => normalizeFirestoreDates({ id: d.id, ...d.data() }) as CommunityProject
  );
}

export async function getCommunityProject(
  projectId: string
): Promise<CommunityProject | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, "community", projectId));
  return snap.exists()
    ? (normalizeFirestoreDates({ id: snap.id, ...snap.data() }) as CommunityProject)
    : null;
}

export async function rateCommunityProject(
  projectId: string,
  userId: string,
  score: number
): Promise<void> {
  if (!db) throw new Error("Firebase not configured");

  const ratingRef = doc(db, "community", projectId, "ratings", userId);
  const existingSnap = await getDoc(ratingRef);
  const communityRef = doc(db, "community", projectId);

  if (existingSnap.exists()) {
    const oldScore = existingSnap.data().score as number;
    await setDoc(ratingRef, { score, createdAt: serverTimestamp() });
    await updateDoc(communityRef, {
      "published.ratingSum": increment(score - oldScore),
    });
  } else {
    await setDoc(ratingRef, { score, createdAt: serverTimestamp() });
    await updateDoc(communityRef, {
      "published.ratingSum": increment(score),
      "published.ratingCount": increment(1),
    });
  }
}

export async function getUserRating(
  projectId: string,
  userId: string
): Promise<number | null> {
  if (!db) return null;
  const snap = await getDoc(
    doc(db, "community", projectId, "ratings", userId)
  );
  return snap.exists() ? (snap.data().score as number) : null;
}

export async function adaptCommunityProject(
  projectId: string,
  userId: string
): Promise<string> {
  if (!db) throw new Error("Firebase not configured");

  // Read community project
  const communitySnap = await getDoc(doc(db, "community", projectId));
  if (!communitySnap.exists()) throw new Error("Project not found");

  const data = communitySnap.data();

  // Create a new draft in the user's projects
  const projectsRef = collection(db, "users", userId, "projects");
  const newId = doc(projectsRef).id;
  const newRef = doc(projectsRef, newId);

  const { published, ...projectData } = data;
  await setDoc(newRef, {
    ...projectData,
    id: newId,
    userId,
    status: "draft",
    title: `${data.title} (adapted)`,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Increment adaptation count
  await updateDoc(doc(db, "community", projectId), {
    "published.adaptationCount": increment(1),
  });

  return newId;
}

export async function getMyPublishedProjects(
  userId: string
): Promise<CommunityProject[]> {
  if (!db) return [];
  const q = query(
    collection(db, "community"),
    where("userId", "==", userId),
    orderBy("published.publishedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => normalizeFirestoreDates({ id: d.id, ...d.data() }) as CommunityProject
  );
}
```

**Step 3: Commit**

```bash
git add src/lib/firebase/firestore.ts
git commit -m "feat: add community Firestore helpers for publish, browse, rate, and adapt"
```

---

## Task 3: Star Rating Component

**Files:**
- Create: `src/components/community/star-rating.tsx`

**Step 1: Create component**

```typescript
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;        // current average or user's rating (0-5)
  count?: number;        // number of ratings
  interactive?: boolean; // whether user can rate
  onRate?: (score: number) => void;
  size?: "sm" | "md";
}
```

Render 5 stars. If interactive, hovering fills stars up to the hovered position. Clicking calls `onRate`. If not interactive, shows the average with filled/half/empty stars. Shows count in parentheses if provided.

Stars use `fill-amber-400 text-amber-400` when filled, `text-neutral-300` when empty.

**Step 2: Commit**

```bash
git add src/components/community/star-rating.tsx
git commit -m "feat: add interactive StarRating component"
```

---

## Task 4: Community Project Card

**Files:**
- Create: `src/components/community/community-project-card.tsx`

**Step 1: Create compact card component**

Props: `CommunityProject` data. Renders:
- Title (font-display font-bold, truncated to 2 lines)
- Driving question (text-sm text-neutral-600, truncated to 2 lines)
- Grade + subject badges (small, teal/neutral)
- Duration badge
- StarRating (read-only, sm size) + adaptation count
- Links to `/community/{id}`
- Card has hover:border-brand-teal transition

Two variants via a `size` prop:
- `"default"` — for the grid (fixed height card)
- `"featured"` — for Staff Picks carousel (larger, includes author name + Gold Standard score)

**Step 2: Commit**

```bash
git add src/components/community/community-project-card.tsx
git commit -m "feat: add CommunityProjectCard component with default and featured variants"
```

---

## Task 5: Featured Carousel & Collection Row

**Files:**
- Create: `src/components/community/featured-carousel.tsx`
- Create: `src/components/community/collection-row.tsx`

**Step 1: Create FeaturedCarousel**

Horizontal scroll container with large featured `CommunityProjectCard` components. Uses `overflow-x-auto` with `snap-x snap-mandatory` and `scroll-smooth`. Each card gets `snap-start`. Shows "Staff Picks" heading above.

**Step 2: Create CollectionRow**

Reusable component: title string + `CommunityProject[]` + optional "See all" href. Same horizontal scroll pattern but with default-size cards. Used for "New to PBL?", "Just added", and subject collections.

**Step 3: Commit**

```bash
git add src/components/community/featured-carousel.tsx src/components/community/collection-row.tsx
git commit -m "feat: add FeaturedCarousel and CollectionRow components"
```

---

## Task 6: Project Grid with Filters

**Files:**
- Create: `src/components/community/project-grid.tsx`

**Step 1: Create filtered grid component**

Props: `{ projects: CommunityProject[] }` (all non-hidden community projects).

State: `searchQuery`, `activeFilters: { subject?: string, gradeLevel?: string, duration?: string }`.

UI:
- Search bar (text input with Search icon)
- Filter chips row: Grade levels (K-12), Subjects (from SUBJECTS constant), Duration (single-day/micro/mini/full). Active chips: `bg-brand-teal text-white`. Inactive: `border border-neutral-300 text-neutral-600`.
- Results grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
- Client-side filtering (search matches title, DQ, or subjects; chips filter by exact match)

**Step 2: Commit**

```bash
git add src/components/community/project-grid.tsx
git commit -m "feat: add ProjectGrid with search and filter chips"
```

---

## Task 7: Community Browse Page

**Files:**
- Create: `src/app/community/page.tsx`

**Step 1: Create browse page**

Server-rendered page that fetches community projects and renders the editorial layout:

1. Page title: "Community" (font-display text-4xl font-bold)
2. Subtitle: "Discover, rate, and adapt PBL units from fellow educators."
3. FeaturedCarousel (projects with `published.featured == true`)
4. CollectionRows:
   - "New to PBL? Start here" — filter `duration` in `["single-day", "micro"]`
   - "Just added" — first 8 by publishedAt
   - Subject-specific rows generated from unique subjects in the data
5. "All Projects" section heading
6. ProjectGrid with all projects

Since Firestore queries run client-side (Firebase JS SDK), this will be a `"use client"` page that fetches on mount.

**Step 2: Commit**

```bash
git add src/app/community/page.tsx
git commit -m "feat: add Community browse page with editorial layout"
```

---

## Task 8: Phase Timeline Component

**Files:**
- Create: `src/components/community/phase-timeline.tsx`

**Step 1: Create expandable phase accordion**

Props: `{ phases: Project["phases"] }`

Shows the 5 Learning Narrative phases as an accordion. Each phase header: phase number + name + color dot. Clicking expands to show the phase content (entry event ideas, investigation activities, etc.). Uses Framer Motion for expand/collapse animation.

Phase colors: Entry Event (coral), Investigation (indigo), Problem (teal), Create (amber), Share (purple) — matching the existing design system.

**Step 2: Commit**

```bash
git add src/components/community/phase-timeline.tsx
git commit -m "feat: add PhaseTimeline accordion for community project detail"
```

---

## Task 9: Community Project Detail Page

**Files:**
- Create: `src/app/community/[projectId]/page.tsx`

**Step 1: Create detail page**

`"use client"` page. Reads `projectId` from params. Fetches from `getCommunityProject(projectId)`.

Layout:
- Back link to /community
- Hero section: title (text-3xl font-display font-bold), driving question (text-lg text-neutral-700), author name + school, grade/subject/duration badges, Gold Standard score (number of elements out of 7)
- StarRating (interactive if logged in, calls `rateCommunityProject`)
- "Adapt this project" button (auth gated, calls `adaptCommunityProject` then redirects to `/build/{newId}`)
- PhaseTimeline showing all 5 phases
- "Similar projects" section: query community for same grade or subject, show 3-4 cards

**Step 2: Commit**

```bash
git add src/app/community/[projectId]/page.tsx
git commit -m "feat: add community project detail page with rating and adapt"
```

---

## Task 10: Publish Modal

**Files:**
- Create: `src/components/community/publish-modal.tsx`

**Step 1: Create publish modal**

Props: `{ project: Project, open: boolean, onOpenChange: (open: boolean) => void, onPublished: () => void }`

Modal contents:
- Title: "Publish to Community"
- Display name input (pre-filled from user profile)
- School name input (optional, pre-filled if available)
- Quality bar check: if project is missing DQ or share phase content, show a warning and disable the publish button
- "Publish" button: calls `publishProject`, then calls `onPublished`

Uses the existing modal/dialog pattern from shadcn/ui.

**Step 2: Commit**

```bash
git add src/components/community/publish-modal.tsx
git commit -m "feat: add PublishModal for publishing projects to community"
```

---

## Task 11: Add Publish Button to Project View

**Files:**
- Modify: `src/app/build/[projectId]/page.tsx`

**Step 1: Add publish button and modal**

After the `LearningNarrativeView`, add:
- If project status is "complete" or "draft" (not yet published): show "Publish to Community" button
- If project status is "published": show "Published" badge with a link to `/community/{projectId}`
- Wire up the PublishModal

Import `PublishModal` and add state for `publishOpen`.

**Step 2: Commit**

```bash
git add src/app/build/[projectId]/page.tsx
git commit -m "feat: add Publish to Community button on project view page"
```

---

## Task 12: My Published Projects Page

**Files:**
- Create: `src/app/community/my-projects/page.tsx`

**Step 1: Create my-projects page**

Auth-gated page showing the current user's published projects. Uses `getMyPublishedProjects(userId)`. Renders a grid of `CommunityProjectCard` components. Empty state: "You haven't published any projects yet."

Link to this page from the dashboard.

**Step 2: Commit**

```bash
git add src/app/community/my-projects/page.tsx
git commit -m "feat: add My Published Projects page"
```

---

## Task 13: Navigation Update

**Files:**
- Modify: `src/components/layout/header.tsx`
- Modify: `src/components/layout/footer.tsx`

**Step 1: Add Community to nav**

Add "Community" link between "Analyze" and "About" in both header `navLinks` and footer `footerLinks`:

```typescript
{ href: "/community", label: "Community" },
```

**Step 2: Commit**

```bash
git add src/components/layout/header.tsx src/components/layout/footer.tsx
git commit -m "feat: add Community to header and footer navigation"
```

---

## Task 14: Final Build + Deploy

**Step 1: Verify build**

Run: `npm run build`
Expected: All routes including `/community`, `/community/[projectId]`, `/community/my-projects` compile.

**Step 2: Push and deploy**

```bash
git push
```

**Step 3: Verify routes**

New routes:
- `/community` — Browse page
- `/community/[projectId]` — Project detail
- `/community/my-projects` — User's published projects

---

## Summary

| Task | Description | Complexity |
|------|-------------|-----------|
| 1 | Update CommunityProject types | Low |
| 2 | Community Firestore helpers | High |
| 3 | Star rating component | Medium |
| 4 | Community project card | Medium |
| 5 | Featured carousel + collection row | Medium |
| 6 | Project grid with filters | Medium |
| 7 | Community browse page | High |
| 8 | Phase timeline component | Medium |
| 9 | Project detail page | High |
| 10 | Publish modal | Medium |
| 11 | Publish button on project view | Low |
| 12 | My published projects page | Low |
| 13 | Navigation update | Low |
| 14 | Final build + deploy | Low |
