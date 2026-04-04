# PBLTeach Phase 4 -- Design Document

**Date:** 2026-04-03
**Status:** Approved
**Builds on:** Phase 1 + Phase 2 + Phase 3 (complete and deployed)

---

## Overview

Phase 4 adds the Community -- a free, curated library where teachers publish, discover, rate, and adapt PBL units from other educators. Think Teachers-Pay-Teachers but free, PBL-specific, and quality-curated.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Moderation | Light (post-hoc) | Projects publish immediately; admin can hide after the fact. Low friction for teachers. |
| Collections | Hybrid | Auto-generated carousels (newest, by subject) + `featured` flag for Staff Picks |
| Reviews | Star rating only (1-5) | Minimal friction; teachers are busy. Text reviews can be added later. |
| Exemplars | Seeded as real Project records | Go through same system; can be rated and adapted; seeds the community on day one |

## Data Model

### Published project fields (added to Project interface)

```typescript
published?: {
  publishedAt: Date;
  authorName: string;
  authorSchool?: string;
  featured: boolean;
  hidden: boolean;
  ratingSum: number;
  ratingCount: number;
  adaptationCount: number;
};
```

### Firestore structure

```
community/{projectId}                    → Full project data + published metadata
community/{projectId}/ratings/{userId}   → { score: 1-5, createdAt }
```

Publishing copies from `users/{userId}/projects/{projectId}` to `community/{projectId}`. The original stays in the user's collection. Edits to the original don't auto-sync to the published version.

### Queries

- Browse (newest): `community` ordered by `published.publishedAt` desc
- Staff Picks: `community` where `published.featured == true`
- Filter by subject: `community` where `subjects` array-contains "{subject}"`
- Filter by grade: `community` where `gradeLevel == "{grade}"`
- My projects: `community` where `userId == {currentUser}`
- Ratings: `community/{id}/ratings/{userId}` (one per user per project)

Compound queries (grade + subject) need Firestore composite indexes.

## Routes

```
/community                    → Browse page (editorial layout, anonymous OK)
/community/[projectId]        → Project detail page (anonymous OK)
/community/my-projects        → Teacher's published projects (auth required)
```

## Browse Page (Editorial Layout)

Three sections:

### Section 1: Staff Picks

Horizontal scroll of large feature cards (`published.featured == true`). Each card: project title, driving question, grade/subject badges, Gold Standard score, author name.

### Section 2: Collections (auto-generated)

Horizontal scroll carousels per collection, each with "See all" link:
- "New to PBL? Start here" -- micro/single-day duration projects
- "Just added" -- newest by publishedAt
- Subject collections: "Math + PBL", "ELA + PBL", "Science + PBL", etc. (generated from available subjects)

### Section 3: All Projects

Search bar + filter chips (not dropdowns). Chips: Grade level, Subject, Duration. Active filters are teal-filled; inactive are outlined.

Results: card grid (2-3 columns). Each card: title, DQ preview, grade, subject, duration badge, average rating, adaptation count.

## Project Detail Page

- Hero: title (large), driving question (prominent), author name + school, grade/subject badges, Gold Standard score gauge
- Phase timeline: expandable accordion showing the 5 Learning Narrative phases with content
- Star rating: interactive 1-5 stars (read-only for anonymous, tappable for logged in)
- "Adapt this project" button: clones into user's Builder as a new draft
- "Similar projects" recommendations at bottom (same grade or subject)

## Publish Flow

From existing project view (`/build/[projectId]`):
- "Publish to Community" button appears on completed projects (must have DQ + public product phase)
- Modal: confirm display name, optional school name
- On publish: copy to `community` collection, set `status: "published"` on original

## Adapt Flow

"Adapt this project" on detail page:
1. Clone community project data into `users/{userId}/projects/` as new draft
2. Increment `adaptationCount` on community doc
3. Redirect to `/build/{newProjectId}`
4. Auth gate: must be signed in to adapt

## Components

### Community browse
- `FeaturedCarousel` -- horizontal scroll of large Staff Pick cards
- `CollectionRow` -- reusable carousel row: title + "See all" + horizontal card scroll
- `ProjectGrid` -- search bar + filter chips + card grid
- `CommunityProjectCard` -- compact card with title, DQ, badges, rating, adaptation count

### Project detail
- `CommunityProjectDetail` -- hero + phases + rating + adapt
- `StarRating` -- interactive 1-5 stars component
- `PhaseTimeline` -- expandable accordion for 5 Learning Narrative phases

### Publishing
- `PublishModal` -- display name confirmation, optional school, publish action

## Quality Bar

Projects must have at minimum:
- A driving question (`drivingQuestion.selected` is non-empty)
- A public product (phase 5 share has at least one presentation format)

Projects missing these cannot be published. The UI disables the publish button with a tooltip explaining what's needed.

## Auth

- Browsing: anonymous OK
- Rating: requires sign-in
- Publishing: requires sign-in + completed project
- Adapting: requires sign-in
- My Projects: requires sign-in

## Navigation

Add "Community" to header and footer nav between "Analyze" and "About".
