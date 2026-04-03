# PBLTeach Phase 1 MVP -- Implementation Design

**Date:** 2026-04-02
**Status:** Approved
**References:** PBLTeach-Design-Doc.md, PBLTeach-UX-Upgrades.md, PBLTeach-Design-System.md

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router, TypeScript, src/ dir) |
| Styling | Tailwind CSS + shadcn/ui (customized to PBLTeach design system) |
| Animation | Framer Motion |
| Icons | Lucide React + custom SVGs for PBL concepts |
| AI | Google Gemini via @google/generative-ai (streaming) |
| Auth | Firebase Auth (Google + email) |
| Database | Firebase Firestore |
| Storage | Firebase Storage |
| Hosting | Vercel (GitHub auto-deploy) |
| Content | Static TypeScript data files |

## Key Decisions

1. Framer Motion for all animations (scroll-driven, DQ assembly, streaming, phase-as-world)
2. shadcn/ui as base, heavily customized to PBLTeach design system
3. Both Quick Create AND Full Builder in MVP
4. ALL interactive elements in Explore modules (flip cards, comparison tool, timeline stepper, scale slider, drag-and-drop mapper)
5. GitHub -> Vercel auto-deploy from day one
6. Custom SVG icons for PBL concepts + Lucide as base set
7. Static TypeScript data files for curated framework content
8. Firebase + Gemini use placeholder env vars until accounts are set up
9. Page-driven build approach (design system woven in as pages are built)
10. No emojis anywhere, ever

## Phase 1 Build Sequence

### Step 1: Project Init & Design System Core

- Next.js scaffold: TypeScript, Tailwind, App Router, src/ directory
- Tailwind config: full PBLTeach color palette
  - Brand: Deep Teal #0D7377, Coral #E8634A, Indigo #4338CA, Amber #D97706, Purple #7C3AED
  - Phase colors mapped: Entry Event (coral), Investigation (indigo), Problem (teal), Create (amber), Share (purple)
  - Neutrals: Near Black #1A1A2E through Off White #F5F5F0
- Google Fonts: Space Grotesk (display), DM Sans (body), JetBrains Mono (mono)
- shadcn/ui installed and customized:
  - Deep Teal primary
  - 8px border-radius on buttons/inputs
  - 12px border-radius on cards
  - 44px minimum touch targets
  - Custom focus ring (2px teal outline, 2px offset)
- cn() utility (clsx + tailwind-merge)
- CSS custom properties for phase colors
- Motion utilities:
  - Assemble: translateY(20px) + opacity:0 -> translateY(0) + opacity:1, 400ms, 150ms stagger
  - Reveal: max-height:0 + opacity:0 -> max-height:auto + opacity:1, 300ms ease-out
  - Connect: animated SVG dashed lines, 600ms ease-in-out
  - All respect prefers-reduced-motion
- Custom SVG icon components:
  - 5 phase icons (flame, magnifying glass+?, crosshair, pencil/wrench, expanding circles)
  - 7 Gold Standard element icons
  - 5 DQ formula component icons
  - 4 scale indicators (single-day, micro, mini, full)
- PBLTeach wordmark ("PBL" Deep Teal + "Teach" Near Black, Space Grotesk Bold)
- GitHub repo created + Vercel deployment connected

### Step 2: Landing Page

- Screen 1 (viewport height):
  - "Every great project starts with a question." centered, Space Grotesk
  - Animated scroll chevron indicator
  - Warm off-white background (#F5F5F0)
- Screen 2 (scroll-triggered):
  - Side-by-side transformation: muted worksheet (left) vs vibrant Learning Narrative timeline (right)
  - 5 phases build sequentially in phase colors as user scrolls
- Screen 3 (scroll-triggered):
  - Three impact statements with stagger fade-up:
    - "7 essential elements. Start with just 2."
    - "Micro-projects take 3 days, not 3 months."
    - "Your first one will be messy. That's the point."
- Screen 4 (creation interface):
  - Three large creation cards (Padlet Arcade pattern):
    - "Describe your project" -- large text area
    - "Upload your curriculum" -- drag-and-drop zone
    - "Just exploring" -- links to Explore
  - Quick-start prompt pills below cards
  - Cards stack on mobile
- Below fold: Curated exemplar gallery (editorial layout)
- Header: PBLTeach wordmark + nav (Explore, Build, About, Sign In)
- Footer
- Full responsive

### Step 3: Explore Modules

Each module has:
- Sticky 2px progress bar (phase-colored, scroll-based)
- Scroll-triggered animations
- "Try it" CTA at end linking to Builder
- prefers-reduced-motion: static pre-rendered states

**Module: "What IS PBL?"**
- Interactive yes/no scenario hook
- Dessert vs main course SVG illustration
- 6 flip cards (click to reveal PBL version of "doing a project" trait)
- Real classroom before/after case study (Mrs. Garcia, 3rd grade math)
- "Try it" CTA

**Module: "The Learning Narrative"**
- "Every great story has a structure" hook
- Interactive 5-phase horizontal timeline stepper (click phase to expand)
- Phase deep dives with grade band examples (elementary, middle, high)
- Drag-and-drop mapper: 6 example activities -> correct phases (green glow on correct, bounce back on incorrect)
- Gold Standard mapping visual
- "Try it" CTA

**Module: "Start Small"**
- "You don't have to redesign your entire year" hook
- Interactive scale slider (single-day to full)
  - Examples, time commitment, complexity transition smoothly
- 5 single-day actionable ideas (what it is, how long, what students produce, Gold Standard elements)
- 3 micro-project examples with grade context
- Growth path visual
- "Try it" CTA with duration pre-selected

### Step 4: Builder

**Quick Create (homepage default):**
- Teacher types in homepage input field
- Gemini streaming API generates:
  - 1 driving question
  - 5-phase one-liner overview
  - "Start Small" suggestion
- Streams in with assemble animation, fits one screen
- Options: "Build the full plan" | "Let me adjust" | "Save for later"
- No account required

**Full Builder Wizard:**
- Input form:
  - Grade level, subject(s), topic/unit
  - Duration (single-day / micro / mini / full)
  - Comfort level (first time / tried before / experienced)
  - Standards (optional)
- DQ Generator:
  - Magic moment animation: 5 empty slots (ROLE|ACTION|PRODUCT|AUDIENCE|PURPOSE) fill one-by-one, 200ms stagger, then collapse into full question
  - 3 DQs generated, displayed as cards
  - Hover: card enlarges, shows "why this works"
  - Click to select: checkmark + color shift, unselected fade
  - Click any word in selected DQ to re-edit that component
- Learning Narrative output:
  - Phase timeline renders first (5 circles + connecting line in phase colors)
  - Each phase card fades in sequentially as content streams
  - Bullet points within each phase slide-up one by one
  - Phase-as-world visual system: each phase has color, SVG motif, subtle background pattern
    - Entry Event: coral, radial burst, spark motif
    - Investigation: indigo, dot grid, magnifying glass motif
    - Problem: teal, converging lines, crosshair motif
    - Create: amber, cross-hatch, pencil marks motif
    - Share: purple, concentric rings, expanding circles motif
- Gold Standard gauge:
  - Radial SVG gauge in builder sidebar (always visible)
  - 7 arc segments, fill as elements are detected
  - Labels: "Great start" (2/7), "Getting stronger" (3-4), "Robust project" (5-6), "Gold Standard" (7/7)
  - Hover segment: shows element name + present/absent
  - Click empty segment: tooltip with "Add [element]. Here's how..." + link
- Expandable/collapsible sections per phase
- Regenerate any single section
- Hover tooltips on all framework terms (Gold Standard, phases, DQ terms)
  - Dark background (#1A1A2E), white text, 12px DM Sans, max-width 280px
  - 200ms hover delay, 100ms fade dismiss
  - Mobile: tap to show, tap elsewhere to dismiss

### Step 5: Firebase Auth

- Firebase Auth with Google sign-in + email/password
- AuthProvider context wrapping the app
- Sign-in modal (Radix dialog via shadcn)
- Anonymous browsing: Explore + Quick Create work without auth
- "Want to save this? Sign in." prompt at point of value
- User document created in Firestore on first sign-in (matching User interface from design system doc)

### Step 6: Save/Load Projects

- Save project to Firestore (users/{userId}/projects/{projectId})
- Dashboard page (/dashboard):
  - Empty state: hand-drawn SVG workshop illustration + "Every great project starts with a question." + large input field + 3 quick-start pills
  - With projects: input field (smaller) at top + project card grid below
- Project cards: title, DQ, grade/subject badges, duration badge, Gold Standard mini gauge, last edited
- Click card to load project in Builder for continued editing
- Project data matches Project interface from design system doc

### Step 7: About Page + Responsive Polish

- About page: Mike's story, PBLTeach philosophy, how it works
- Full responsive audit across all pages
- Mobile touch targets verified (44px minimum)
- Card hover states (2px lift + shadow)
- Input focus states (teal border + glow)
- Button press (scale 0.98 on mousedown)
- Custom scrollbar (teal thumb, 6px, rounded)
- Selection color (teal 20% opacity)
- Loading skeletons (warm off-white pulse, match content dimensions)

## Data Architecture

Static data files in lib/data/:
- frameworks.ts: Gold Standard 7 elements, DQ Formula, dessert vs main course, design thinking mindsets
- alphabet-soup.ts: 12 approaches comparison data
- explore-content.ts: module content, interactive element data
- exemplars.ts: curated example projects (7 from design doc)
- tooltips.ts: all framework term definitions from UX doc Section 11

Firestore (when auth is ready):
- users/{userId}: profile, preferences, completedModules
- users/{userId}/projects/{projectId}: full Project interface

## Accessibility (Non-Negotiable)

- Full keyboard navigation with visible focus indicators
- Screen reader support (aria-labels on SVGs, phase announcements, gauge announcements)
- WCAG 2.1 AA contrast ratios
- Phase colors tested for colorblindness (deuteranopia, protanopia)
- No info conveyed by color alone
- prefers-reduced-motion: all animations instant, static states
- 44x44px minimum touch targets, 8px minimum gap
