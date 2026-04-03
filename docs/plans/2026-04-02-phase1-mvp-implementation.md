# PBLTeach Phase 1 MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the complete PBLTeach Phase 1 MVP -- a PBL co-pilot with scroll-driven landing page, 3 interactive Explore modules, Quick Create + Full Builder with streaming Gemini AI, DQ magic moment animation, Gold Standard gauge, Firebase auth, and project save/load.

**Architecture:** Next.js 14+ App Router with TypeScript. Static curated content in data files, Gemini AI for generation via API routes with streaming, Firebase for auth and persistence. Framer Motion for all animations. shadcn/ui base components customized to PBLTeach design system. Page-driven build -- design system woven in as pages are built.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Firebase (Auth + Firestore), Google Gemini AI, Lucide React, Vercel

**Reference docs (read before each task):**
- `PBLTeach-Design-Doc.md` -- product spec, frameworks, data model
- `PBLTeach-Design-System.md` -- visual design, Firestore schema, Gemini prompts, project structure
- `PBLTeach-UX-Upgrades.md` -- animations, interactions, micro-interactions, accessibility

---

## Task 1: Project Initialization

**Files:**
- Create: entire project scaffold via `create-next-app`
- Create: `.env.local.example`
- Create: `.gitignore`

**Step 1: Scaffold Next.js project**

Run:
```bash
cd /Users/md/PBLTeach
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

Note: Running in existing directory (the design docs are already here). The `--yes` flag accepts defaults.

**Step 2: Verify scaffold works**

Run: `npm run dev`
Expected: Dev server starts on localhost:3000

**Step 3: Create environment variables template**

Create `.env.local.example`:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Gemini
GEMINI_API_KEY=your_gemini_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Create `.env.local` with same content (gitignored, for local dev).

**Step 4: Install core dependencies**

Run:
```bash
npm install firebase @google/generative-ai lucide-react framer-motion clsx tailwind-merge class-variance-authority
```

**Step 5: Install Radix primitives (for shadcn customization)**

Run:
```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Slate (we'll override)
- CSS variables: Yes

Then install components we need:
```bash
npx shadcn@latest add button card input badge tabs accordion select tooltip dialog label textarea separator
```

**Step 6: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js project with core dependencies"
```

---

## Task 2: GitHub + Vercel Deployment

**Step 1: Create GitHub repo**

Run:
```bash
gh repo create PBLTeach --public --source=. --remote=origin --push
```

**Step 2: Connect to Vercel**

Run:
```bash
npx vercel link
```

Follow prompts to link to Vercel project. Then:
```bash
npx vercel --prod
```

**Step 3: Verify deployment**

Open the Vercel URL. Should see the default Next.js page.

**Step 4: Commit any Vercel config**

```bash
git add -A
git commit -m "chore: connect GitHub repo to Vercel"
git push
```

---

## Task 3: Tailwind Design System Configuration

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `src/lib/utils.ts` (cn utility)

**Step 1: Configure Tailwind with PBLTeach design tokens**

Modify `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0D7377",
          "teal-light": "#E0F2F1",
          "teal-dark": "#064E50",
          coral: "#E8634A",
          "coral-light": "#FFF0EC",
          indigo: "#4338CA",
          "indigo-light": "#EEF2FF",
          amber: "#D97706",
          "amber-light": "#FFFBEB",
          purple: "#7C3AED",
          "purple-light": "#F5F3FF",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#F5F5F0",
          300: "#D1D5DB",
          500: "#6B7280",
          700: "#374151",
          900: "#1A1A2E",
        },
        success: "#059669",
        error: "#DC2626",
        // Phase colors (aliases for clarity)
        phase: {
          entry: "#E8634A",
          "entry-light": "#FFF0EC",
          investigation: "#4338CA",
          "investigation-light": "#EEF2FF",
          problem: "#0D7377",
          "problem-light": "#E0F2F1",
          create: "#D97706",
          "create-light": "#FFFBEB",
          share: "#7C3AED",
          "share-light": "#F5F3FF",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-1": ["48px", { lineHeight: "56px" }],
        "display-2": ["36px", { lineHeight: "44px" }],
        "display-3": ["24px", { lineHeight: "32px" }],
        "display-4": ["20px", { lineHeight: "28px" }],
        "body-base": ["16px", { lineHeight: "26px" }],
        "body-sm": ["14px", { lineHeight: "22px" }],
        caption: ["12px", { lineHeight: "18px" }],
      },
      borderRadius: {
        button: "8px",
        card: "12px",
        badge: "20px",
      },
      spacing: {
        "section-desktop": "64px",
        "section-mobile": "40px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        "card-hover": "0 4px 12px rgba(0,0,0,0.08)",
        "focus-teal": "0 0 0 3px rgba(13, 115, 119, 0.1)",
      },
      keyframes: {
        "skeleton-pulse": {
          "0%, 100%": { backgroundColor: "#F5F5F0" },
          "50%": { backgroundColor: "#FAFAF7" },
        },
      },
      animation: {
        "skeleton-pulse": "skeleton-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

**Step 2: Set up globals.css with CSS custom properties**

Modify `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Phase colors as CSS variables for dynamic usage */
    --phase-1-entry: #E8634A;
    --phase-1-entry-light: #FFF0EC;
    --phase-2-investigation: #4338CA;
    --phase-2-investigation-light: #EEF2FF;
    --phase-3-problem: #0D7377;
    --phase-3-problem-light: #E0F2F1;
    --phase-4-create: #D97706;
    --phase-4-create-light: #FFFBEB;
    --phase-5-share: #7C3AED;
    --phase-5-share-light: #F5F3FF;

    /* Brand */
    --brand-teal: #0D7377;
    --brand-coral: #E8634A;

    /* Scrollbar */
    scrollbar-width: thin;
    scrollbar-color: #0D7377 #F5F5F0;
  }

  /* Custom scrollbar (webkit) */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #F5F5F0;
  }
  ::-webkit-scrollbar-thumb {
    background: #0D7377;
    border-radius: 3px;
  }

  /* Text selection */
  ::selection {
    background: rgba(13, 115, 119, 0.2);
  }

  /* Base body styles */
  body {
    font-family: var(--font-dm-sans), sans-serif;
    color: #1A1A2E;
    background-color: #F5F5F0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Focus visible for keyboard navigation */
  *:focus-visible {
    outline: 2px solid #0D7377;
    outline-offset: 2px;
  }
}

/* Reduced motion: disable all animations */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0ms !important;
    transition-delay: 0ms !important;
  }
}
```

**Step 3: Create cn() utility**

Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 4: Verify Tailwind config compiles**

Run: `npm run dev`
Expected: No errors, dev server starts

**Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/lib/utils.ts
git commit -m "feat: configure Tailwind with PBLTeach design system tokens"
```

---

## Task 4: Font Setup

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Configure Google Fonts via next/font**

Modify `src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "PBLTeach — Your PBL Co-Pilot",
  description:
    "Learn, build, and facilitate project-based learning with expert coaching and beautiful, ready-to-use materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-neutral-100 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Verify fonts load**

Run: `npm run dev`
Visit localhost:3000. Inspect elements -- body should use DM Sans, headings should be configurable with `font-display`.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure Space Grotesk, DM Sans, JetBrains Mono fonts"
```

---

## Task 5: Customize shadcn/ui Components

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/badge.tsx`
- Modify: `src/components/ui/tooltip.tsx`
- Modify: all other shadcn components as needed

**Step 1: Customize Button component**

Update `src/components/ui/button.tsx` to match PBLTeach design:
- Primary: Deep Teal bg (#0D7377), white text, 8px border-radius, font-medium (DM Sans 500)
- Secondary: White bg, Teal border, Teal text
- Ghost: No bg, no border, Teal text
- Destructive: Coral bg, white text
- All: 44px min height, 16px horizontal padding
- Press: scale 0.98 on mousedown (add via CSS active state)
- Focus: 2px teal outline, 2px offset

**Step 2: Customize Card component**

Update `src/components/ui/card.tsx`:
- White bg, 1px neutral-300 border, 12px border-radius, 24px padding
- Hover: shadow-card-hover, translateY(-2px) transition 200ms

**Step 3: Customize Input component**

Update `src/components/ui/input.tsx`:
- 44px height, 8px border-radius, neutral-300 border, neutral-500 placeholder
- Focus: teal border + shadow-focus-teal

**Step 4: Customize Badge component**

Update `src/components/ui/badge.tsx`:
- Pill-shaped (20px border-radius), 12px font, DM Sans Medium
- Variants for each phase color

**Step 5: Customize Tooltip component**

Update `src/components/ui/tooltip.tsx`:
- Dark bg (#1A1A2E), white text, 12px DM Sans, max-width 280px
- 200ms delay, 100ms fade dismiss
- Subtle pointer triangle

**Step 6: Verify all components render correctly**

Create a temporary test page at `src/app/test/page.tsx` that renders each component variant. Visually verify. Delete the test page after.

**Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: customize shadcn/ui components to PBLTeach design system"
```

---

## Task 6: Motion Utilities

**Files:**
- Create: `src/lib/motion.ts`
- Create: `src/components/ui/motion.tsx`

**Step 1: Create motion configuration**

Create `src/lib/motion.ts`:
```typescript
// PBLTeach Motion Vocabulary
// See PBLTeach-UX-Upgrades.md Section 7

export const motionConfig = {
  // Assemble: things build from component parts
  assemble: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
    stagger: 0.15, // 150ms between children
  },

  // Reveal: content unfolds progressively
  reveal: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  // Connect: related elements draw visual relationships
  connect: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 0.6, ease: "easeInOut" },
  },

  // Fade up (for staggered lists)
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },

  // Card hover
  cardHover: {
    whileHover: { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
    transition: { duration: 0.2 },
  },

  // Button press
  buttonPress: {
    whileTap: { scale: 0.98 },
    transition: { duration: 0.1 },
  },

  // Scroll-triggered (for viewport entry)
  scrollReveal: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

// Stagger container for children
export const staggerContainer = (staggerDelay = 0.15) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

// Phase-specific config
export const phaseTransition = {
  duration: 0.4,
  ease: "easeOut" as const,
};
```

**Step 2: Create reusable motion components**

Create `src/components/ui/motion.tsx`:
```typescript
"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { motionConfig, staggerContainer } from "@/lib/motion";
import { forwardRef } from "react";

// Assemble container - staggers children
export function AssembleGroup({
  children,
  stagger = 0.15,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer(stagger)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Assemble item - used inside AssembleGroup
export const AssembleItem = forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & { className?: string }
>(({ children, className, ...props }, ref) => (
  <motion.div
    ref={ref}
    variants={{
      initial: motionConfig.assemble.initial,
      animate: motionConfig.assemble.animate,
    }}
    transition={motionConfig.assemble.transition}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
));
AssembleItem.displayName = "AssembleItem";

// Scroll-triggered reveal
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={motionConfig.scrollReveal.initial}
      whileInView={motionConfig.scrollReveal.whileInView}
      viewport={motionConfig.scrollReveal.viewport}
      transition={{
        ...motionConfig.scrollReveal.transition,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Reveal/accordion wrapper
export function Reveal({
  children,
  isOpen,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        isOpen
          ? { opacity: 1, height: "auto" }
          : { opacity: 0, height: 0 }
      }
      transition={motionConfig.reveal.transition}
      className={className}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 3: Verify motion components work**

Create a quick test in the dev page. Render an AssembleGroup with 5 items and a ScrollReveal. Verify animations play. Verify `prefers-reduced-motion` disables them (toggle in browser dev tools).

**Step 4: Commit**

```bash
git add src/lib/motion.ts src/components/ui/motion.tsx
git commit -m "feat: add PBLTeach motion vocabulary (assemble, reveal, connect, scroll)"
```

---

## Task 7: Custom SVG Icons

**Files:**
- Create: `src/components/icons/phase-icons.tsx`
- Create: `src/components/icons/gold-standard-icons.tsx`
- Create: `src/components/icons/dq-icons.tsx`
- Create: `src/components/icons/scale-icons.tsx`
- Create: `src/components/icons/logo.tsx`

**Step 1: Create phase icons**

Create `src/components/icons/phase-icons.tsx` with 5 SVG icons:
1. Entry Event (flame/spark) -- coral
2. Investigation (magnifying glass with ?) -- indigo
3. Problem/Challenge (crosshair/target) -- teal
4. Create (pencil + wrench) -- amber
5. Share (expanding circles/broadcast) -- purple

Each icon should:
- Accept `size` prop (default 24)
- Accept `className` prop
- Have proper `aria-label`
- Use `currentColor` for fill so color can be set via Tailwind text color
- Be clean, geometric, minimal (matching Lucide style)

**Step 2: Create Gold Standard icons**

Create `src/components/icons/gold-standard-icons.tsx` with 7 SVG icons for:
1. Challenging Problem/Question
2. Sustained Inquiry
3. Authenticity
4. Student Voice & Choice
5. Reflection
6. Critique & Revision
7. Public Product

Same props pattern as phase icons.

**Step 3: Create DQ Formula icons**

Create `src/components/icons/dq-icons.tsx` with 5 icons:
1. Role (person silhouette)
2. Action (arrow/lightning)
3. Product (box/package)
4. Audience (people group)
5. Purpose (target/bullseye)

**Step 4: Create scale icons**

Create `src/components/icons/scale-icons.tsx` with 4 icons:
1. Single-day (clock)
2. Micro (calendar-few)
3. Mini (calendar-week)
4. Full (calendar-month)

**Step 5: Create PBLTeach wordmark**

Create `src/components/icons/logo.tsx`:
```typescript
export function PBLTeachLogo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-bold text-2xl", className)}>
      <span className="text-brand-teal">PBL</span>
      <span className="text-neutral-900">Teach</span>
    </span>
  );
}
```

**Step 6: Create barrel export**

Create `src/components/icons/index.ts` that re-exports all icons.

**Step 7: Commit**

```bash
git add src/components/icons/
git commit -m "feat: add custom SVG icons for phases, Gold Standard, DQ formula, scales, and wordmark"
```

---

## Task 8: Static Data Files

**Files:**
- Create: `src/lib/data/frameworks.ts`
- Create: `src/lib/data/alphabet-soup.ts`
- Create: `src/lib/data/explore-content.ts`
- Create: `src/lib/data/exemplars.ts`
- Create: `src/lib/data/tooltips.ts`
- Create: `src/lib/data/phases.ts`

**Step 1: Create phases data**

Create `src/lib/data/phases.ts` with all 5 Learning Narrative phases:
- Phase number, name, description, design thinking connection
- Color (hex + Tailwind class), light color
- SVG motif description
- Background pattern CSS
- "What teachers do" vs "what students do" for each phase

Source: PBLTeach-Design-Doc.md Section 4b, PBLTeach-UX-Upgrades.md Section 3

**Step 2: Create frameworks data**

Create `src/lib/data/frameworks.ts`:
- Gold Standard 7 elements (name, description, icon reference, tooltip text)
- DQ Formula (components, template, examples)
- Dessert vs Main Course (6 comparison pairs)
- Design Thinking mindsets (10 items)
- "Start with 2" philosophy

Source: PBLTeach-Design-Doc.md Section 4

**Step 3: Create alphabet soup data**

Create `src/lib/data/alphabet-soup.ts`:
- 12 approaches from the cheat sheet (PBL, Problem-Based, Design Thinking, Challenge-Based, Genius Hour, Inquiry-Based, STEM/STEAM, Service Learning, Maker Ed, Interdisciplinary, Transdisciplinary, Performance-Based Assessment)
- Each with: name, duration, who drives, product, key distinction

Source: PBLTeach-Design-Doc.md Section 4f

**Step 4: Create exemplars data**

Create `src/lib/data/exemplars.ts`:
- 7 example projects (Kindness Campaign, Budget Park, Eco-Report, Community Podcast, PSA Campaign, Policy Proposal, Startup Pitch)
- Each with: title, grade, subject, driving question, duration, description, Gold Standard score

Source: PBLTeach-Design-Doc.md Section 10

**Step 5: Create tooltips data**

Create `src/lib/data/tooltips.ts`:
- All framework term definitions from UX doc Section 11
- Gold Standard elements (7), Learning Narrative phases (5), other terms (4)
- Each with: term, definition (one line)

Source: PBLTeach-UX-Upgrades.md Section 11

**Step 6: Create explore content data**

Create `src/lib/data/explore-content.ts`:
- Module metadata (title, duration, learning goal, slug)
- Content structure for each of the 3 MVP modules
- Interactive element data (flip card content, drag-drop items, scale slider data)

Source: PBLTeach-Design-System.md Section D

**Step 7: Commit**

```bash
git add src/lib/data/
git commit -m "feat: add all curated framework data (phases, Gold Standard, DQ, alphabet soup, exemplars, tooltips)"
```

---

## Task 9: TypeScript Interfaces

**Files:**
- Create: `src/lib/types/project.ts`
- Create: `src/lib/types/user.ts`
- Create: `src/lib/types/community.ts`

**Step 1: Create project types**

Create `src/lib/types/project.ts` matching the Project interface from PBLTeach-Design-System.md Section B3. Include all sub-interfaces: EntryEventIdea, Activity, Resource, SubjectConnection, AssessmentItem, Standard.

**Step 2: Create user types**

Create `src/lib/types/user.ts` matching the User interface from PBLTeach-Design-System.md Section B2.

**Step 3: Create community types**

Create `src/lib/types/community.ts` matching the CommunityProject interface from PBLTeach-Design-System.md Section B4.

**Step 4: Create barrel export**

Create `src/lib/types/index.ts`.

**Step 5: Commit**

```bash
git add src/lib/types/
git commit -m "feat: add TypeScript interfaces for Project, User, and Community"
```

---

## Task 10: Layout Components (Header + Footer)

**Files:**
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/footer.tsx`
- Modify: `src/app/layout.tsx` to include header/footer

**Step 1: Build Header**

Create `src/components/layout/header.tsx`:
- PBLTeach wordmark (left)
- Nav links: Explore, Build, About (center or right)
- Sign In button (right, ghost style initially, primary when auth is built)
- Sticky top, white bg with subtle bottom border
- Mobile: hamburger menu (Radix dialog or sheet)
- Max content width 1200px, centered

**Step 2: Build Footer**

Create `src/components/layout/footer.tsx`:
- PBLTeach wordmark
- "Built for teachers, by teachers" tagline
- Links: About, Explore, Build
- Copyright
- Simple, clean, not heavy

**Step 3: Add to root layout**

Modify `src/app/layout.tsx` to wrap children with Header and Footer.

**Step 4: Verify**

Run dev server. Header and footer should appear on all pages, be responsive, and use correct fonts/colors.

**Step 5: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add Header and Footer layout components"
```

---

## Task 11: Landing Page -- Screen 1 (Hero)

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Build Screen 1**

Full viewport height section:
- "Every great project starts with a question." -- Space Grotesk Bold, centered vertically and horizontally
- Animated scroll chevron at bottom (Framer Motion, subtle bounce, `animate` with `y` oscillation)
- Warm off-white background (#F5F5F0)
- The text should be large: `text-display-1` on desktop, `text-display-2` (or 32px) on mobile

**Step 2: Verify**

Run dev server. Hero should fill viewport, text centered, scroll indicator animating.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add landing page hero section"
```

---

## Task 12: Landing Page -- Screen 2 (Before/After Scroll Animation)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/landing/before-after-transform.tsx`

**Step 1: Build the BeforeAfterTransform component**

This is the scroll-triggered side-by-side:
- Left: muted worksheet mockup (SVG or styled div) fading in, labeled "The old way"
- Right: Learning Narrative timeline assembling piece by piece in phase colors, labeled "The PBL way"
- 5 phases build sequentially as user scrolls (use Framer Motion `useScroll` + `useTransform` to tie animation progress to scroll position)
- Each phase appears as a small card/node on a vertical timeline, in its phase color
- Total animation tied to ~3 seconds of scroll distance

Use `useScroll({ target, offset })` with a ref on the section to create scroll-linked animations.

**Step 2: Add to landing page**

Import and render below the hero section.

**Step 3: Verify**

Scroll through. Worksheet should fade in on left, timeline should build sequentially on right. Test with `prefers-reduced-motion` -- should show static final state.

**Step 4: Commit**

```bash
git add src/app/page.tsx src/components/landing/
git commit -m "feat: add scroll-driven before/after transformation on landing page"
```

---

## Task 13: Landing Page -- Screen 3 (Impact Statements)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/landing/impact-statements.tsx`

**Step 1: Build ImpactStatements component**

Three statements with stagger fade-up animation (ScrollReveal + stagger):
1. "7 essential elements. Start with just 2."
2. "Micro-projects take 3 days, not 3 months."
3. "Your first one will be messy. That's the point."

Each appears with `scrollReveal` + staggered delay (0, 0.15s, 0.3s). Space Grotesk Medium, large text, centered.

**Step 2: Add to landing page**

**Step 3: Verify and commit**

```bash
git add src/app/page.tsx src/components/landing/impact-statements.tsx
git commit -m "feat: add staggered impact statements to landing page"
```

---

## Task 14: Landing Page -- Screen 4 (Creation Cards)

**Files:**
- Create: `src/components/landing/creation-cards.tsx`
- Create: `src/components/landing/quick-start-prompts.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build CreationCards component**

Three large cards side by side (stack on mobile):

Card 1 -- "Describe your project":
- Large textarea with placeholder: "I teach 5th grade science and we're starting an ecosystems unit next week..."
- SVG icon: speech bubble with pencil (custom or Lucide MessageSquarePlus)
- On submit: navigates to Quick Create flow (Task 26+)

Card 2 -- "Upload your curriculum":
- Drag-and-drop zone for PDF/DOCX
- SVG icon: document with upload arrow (Lucide FileUp)
- Subtext: "We'll find cross-curricular PBL opportunities"
- For MVP: shows "Coming soon in Phase 3" or stores the intent

Card 3 -- "Just exploring":
- Links to /explore
- SVG icon: compass (Lucide Compass)
- Subtext: "Learn what PBL is and why it matters"

Cards use the PBLTeach card style (white bg, 12px radius, 24px padding) with hover lift effect. Each card is generous in size -- these are the primary CTAs.

**Step 2: Build QuickStartPrompts component**

Row of clickable pill buttons below the cards:
- "3rd grade math project ideas"
- "What's the difference between PBL and STEM?"
- "Help me write a driving question"
- "I'm mid-project and things are messy"

Clicking a pill pre-fills the textarea in Card 1. Use badge styling (pill-shaped, outlined, clickable).

**Step 3: Add to landing page**

**Step 4: Verify**

Cards should be side by side on desktop, stacked on mobile. Quick-start prompts should pre-fill the textarea. Card hover should lift 2px.

**Step 5: Commit**

```bash
git add src/components/landing/ src/app/page.tsx
git commit -m "feat: add Padlet Arcade-style creation cards and quick-start prompts"
```

---

## Task 15: Landing Page -- Exemplar Gallery

**Files:**
- Create: `src/components/landing/exemplar-gallery.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build ExemplarGallery component**

Below the fold, editorial layout (not a grid):
- "Staff Picks" section header
- Horizontal scroll of exemplar project cards
- Each card: title, driving question, grade/subject badge, duration badge, brief description
- Uses data from `src/lib/data/exemplars.ts`
- Cards use phase-colored accent bars based on primary subject

**Step 2: Add to landing page**

**Step 3: Verify and commit**

```bash
git add src/components/landing/exemplar-gallery.tsx src/app/page.tsx
git commit -m "feat: add exemplar gallery to landing page"
```

---

## Task 16: Explore Hub Page

**Files:**
- Create: `src/app/explore/page.tsx`
- Create: `src/components/explore/module-card.tsx`

**Step 1: Build Explore hub page**

Route: `/explore`

- Page title: "Explore PBL" (Space Grotesk Bold)
- Subtitle: "Interactive, bite-sized modules. 5-10 minutes each. No account required."
- Grid of module cards (3 for MVP, with "Coming soon" cards for Phase 2 modules)
- Each module card shows: title, duration, learning goal, a visual indicator of completion (if logged in)

**Step 2: Build ModuleCard component**

- Title (Space Grotesk), duration badge, one-sentence description
- Subtle icon or illustration per module
- Hover: lift + shadow
- Links to `/explore/[slug]`

**Step 3: Verify and commit**

```bash
git add src/app/explore/ src/components/explore/
git commit -m "feat: add Explore hub page with module cards"
```

---

## Task 17: Explore Module Layout (Shared)

**Files:**
- Create: `src/components/explore/module-layout.tsx`
- Create: `src/components/explore/progress-bar.tsx`
- Create: `src/components/explore/try-it-cta.tsx`

**Step 1: Build ModuleLayout component**

Shared wrapper for all Explore modules:
- Sticky 2px progress bar at top (scroll-based, phase-colored)
- Full-width sections separated by generous whitespace (80-120px)
- Consistent max-width (800px for readability)
- "Try it" CTA at the end

**Step 2: Build ProgressBar component**

- Thin (2px) bar fixed at top of viewport
- Width calculated from scroll position within the module page
- Color matches the module's primary phase color
- Uses Framer Motion `useScroll` + `useTransform`

**Step 3: Build TryItCTA component**

- Card with: "Ready to try this? [Start building]"
- Links to Builder with context pre-filled based on module
- Uses PBLTeach card style with teal accent

**Step 4: Commit**

```bash
git add src/components/explore/
git commit -m "feat: add shared Explore module layout with progress bar and CTA"
```

---

## Task 18: Explore Module -- "What IS PBL?"

**Files:**
- Create: `src/app/explore/what-is-pbl/page.tsx`
- Create: `src/components/explore/flip-card.tsx`
- Create: `src/components/explore/scenario-hook.tsx`

**Step 1: Build FlipCard component**

Reusable flip card with:
- Front: "doing a project" version (muted styling)
- Back: PBL version (vibrant, phase-colored)
- Click to flip (CSS 3D transform, 400ms)
- Flip animation: rotateY(0) -> rotateY(180deg) with backface-visibility
- Card dimensions: ~280px wide, ~180px tall
- 6 cards in a responsive grid (3x2 desktop, 2x3 tablet, 1x6 mobile)

**Step 2: Build ScenarioHook component**

Interactive yes/no scenario:
- "Your colleague assigns a poster project after a unit. Is this PBL?"
- Two buttons: Yes / No
- On click: reveal explanation with Reveal animation
- Teal checkmark or coral X icon for correct/incorrect

**Step 3: Build the full module page**

`src/app/explore/what-is-pbl/page.tsx`:
1. ScenarioHook
2. Dessert vs Main Course SVG illustration (two plates, custom SVG)
3. 6 FlipCards with data from frameworks.ts (dessertVsMainCourse)
4. Mrs. Garcia case study (before/after comparison, scroll-triggered)
5. TryItCTA

Wrap in ModuleLayout with progress bar.

**Step 4: Verify**

All interactions work. Flip cards flip. Scenario responds. Scroll progress tracks. Reduced motion shows static states.

**Step 5: Commit**

```bash
git add src/app/explore/what-is-pbl/ src/components/explore/flip-card.tsx src/components/explore/scenario-hook.tsx
git commit -m "feat: add 'What IS PBL?' Explore module with flip cards and interactive scenario"
```

---

## Task 19: Explore Module -- "The Learning Narrative"

**Files:**
- Create: `src/app/explore/learning-narrative/page.tsx`
- Create: `src/components/explore/interactive-timeline.tsx`
- Create: `src/components/explore/drag-drop-mapper.tsx`

**Step 1: Build InteractiveTimeline component**

Horizontal timeline with 5 phase nodes:
- Each node is a circle in its phase color, connected by lines
- Click a phase to expand: shows details, examples, "what teachers do vs students do"
- Active phase is enlarged with subtle pulse
- Expansion uses Reveal animation
- Phase details include elementary, middle, high school examples
- Uses data from phases.ts

**Step 2: Build DragDropMapper component**

Interactive drag-and-drop exercise:
- 6 example activities displayed as draggable cards
- 5 drop zones (one per phase) displayed as labeled areas
- Drag: card lifts with shadow, follows cursor/touch
- Drop correct: green glow animation on the zone, card snaps into place
- Drop incorrect: card bounces back to original position with a subtle shake
- Use HTML5 Drag and Drop API or a lightweight library (dnd-kit recommended for React)
- Mobile: consider tap-to-select, tap-target approach as alternative to drag

Install dnd-kit:
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Step 3: Build the full module page**

`src/app/explore/learning-narrative/page.tsx`:
1. "Every great story has a structure" hook
2. InteractiveTimeline (5 phases)
3. Phase deep dives (expandable, per phase, with grade band examples)
4. DragDropMapper exercise
5. Gold Standard mapping visual (simple: which phases map to which GS elements)
6. TryItCTA

**Step 4: Verify**

Timeline expands on click. Drag-and-drop works on desktop and mobile. Correct/incorrect feedback works. Progress bar tracks.

**Step 5: Commit**

```bash
git add src/app/explore/learning-narrative/ src/components/explore/interactive-timeline.tsx src/components/explore/drag-drop-mapper.tsx
git commit -m "feat: add 'The Learning Narrative' Explore module with timeline and drag-drop mapper"
```

---

## Task 20: Explore Module -- "Start Small"

**Files:**
- Create: `src/app/explore/start-small/page.tsx`
- Create: `src/components/explore/scale-slider.tsx`

**Step 1: Build ScaleSlider component**

Custom slider with 4 positions:
- Single-day | Micro (3-5 days) | Mini (1-2 weeks) | Full (3+ weeks)
- As slider moves, the content below transitions smoothly:
  - Example project name and description
  - Time commitment
  - Complexity description
  - Which Gold Standard elements are typically included
- Use Framer Motion `AnimatePresence` for content crossfade between positions
- Slider track uses a gradient of phase colors
- Thumb is a teal circle with shadow
- Keyboard accessible (arrow keys)

**Step 2: Build the full module page**

`src/app/explore/start-small/page.tsx`:
1. "You don't have to redesign your entire year" hook
2. ScaleSlider with transitioning content
3. 5 single-day ideas (cards with: what, how long, what students produce, GS elements)
4. 3 micro-project examples (slightly larger cards with grade context)
5. Growth path visual (simple: single-day -> micro -> mini -> full with arrow progression)
6. TryItCTA with duration pre-selected based on last slider position

**Step 3: Verify**

Slider moves smoothly. Content transitions on each position. Keyboard navigation works. Try-it CTA carries the selected duration.

**Step 4: Commit**

```bash
git add src/app/explore/start-small/ src/components/explore/scale-slider.tsx
git commit -m "feat: add 'Start Small' Explore module with interactive scale slider"
```

---

## Task 21: Gemini Client Setup

**Files:**
- Create: `src/lib/gemini/client.ts`
- Create: `src/lib/gemini/prompts/system.ts`
- Create: `src/lib/gemini/prompts/driving-question.ts`
- Create: `src/lib/gemini/prompts/learning-narrative.ts`
- Create: `src/lib/gemini/prompts/quick-create.ts`
- Create: `src/lib/gemini/parse.ts`

**Step 1: Create Gemini client**

Create `src/lib/gemini/client.ts`:
- Initialize GoogleGenerativeAI with `GEMINI_API_KEY`
- Export a `getModel()` function that returns a configured model instance
- Use `gemini-1.5-pro` or `gemini-2.0-flash` (check latest available)
- Set temperature to 0.7 for creative but structured output
- Configure for JSON output mode

**Step 2: Create system prompt**

Create `src/lib/gemini/prompts/system.ts` with the exact system prompt from PBLTeach-Design-System.md Section C2.

**Step 3: Create DQ generation prompt**

Create `src/lib/gemini/prompts/driving-question.ts` with the prompt template from Section C3. Export a function that takes teacher context and returns the formatted prompt.

**Step 4: Create Learning Narrative prompt**

Create `src/lib/gemini/prompts/learning-narrative.ts` with the prompt from Section C4.

**Step 5: Create Quick Create prompt**

Create `src/lib/gemini/prompts/quick-create.ts`:
- A lighter prompt that takes a freeform teacher description
- Returns: 1 driving question (with formula breakdown), 5-phase one-liner overview, "Start Small" suggestion
- Output is much simpler than full Learning Narrative -- fits on one screen

**Step 6: Create response parser**

Create `src/lib/gemini/parse.ts`:
- Functions to safely parse JSON responses from Gemini
- Handle streaming chunks (partial JSON parsing)
- Type guards for each expected response shape (DQ response, Learning Narrative response, Quick Create response)

**Step 7: Commit**

```bash
git add src/lib/gemini/
git commit -m "feat: set up Gemini client with system prompt, DQ, Learning Narrative, and Quick Create prompts"
```

---

## Task 22: API Routes for Generation

**Files:**
- Create: `src/app/api/generate/driving-question/route.ts`
- Create: `src/app/api/generate/learning-narrative/route.ts`
- Create: `src/app/api/generate/quick-create/route.ts`

**Step 1: Build DQ generation API route**

`src/app/api/generate/driving-question/route.ts`:
- POST handler
- Accepts: { gradeLevel, subjects, topic, duration, teacherNotes }
- Calls Gemini with DQ prompt
- Returns streaming response (use `ReadableStream` for incremental delivery)
- Error handling: return appropriate status codes

**Step 2: Build Learning Narrative API route**

`src/app/api/generate/learning-narrative/route.ts`:
- POST handler
- Accepts: full builder input (grade, subject, topic, duration, DQ, comfort level, standards)
- Calls Gemini with Learning Narrative prompt
- Returns streaming response
- This is the big one -- response will be large JSON

**Step 3: Build Quick Create API route**

`src/app/api/generate/quick-create/route.ts`:
- POST handler
- Accepts: { description } (freeform text from homepage input)
- Calls Gemini with Quick Create prompt
- Returns streaming response
- Response is small -- should complete in <10 seconds

**Step 4: Verify routes respond**

Use `curl` or a REST client to POST to each route with sample data. Verify streaming works (if Gemini key is set) or verify proper error message (if not set).

**Step 5: Commit**

```bash
git add src/app/api/generate/
git commit -m "feat: add streaming API routes for DQ, Learning Narrative, and Quick Create generation"
```

---

## Task 23: Generation Hook

**Files:**
- Create: `src/hooks/use-generate.ts`

**Step 1: Build useGenerate hook**

Create `src/hooks/use-generate.ts`:
- Generic hook for calling generation API routes with streaming
- Manages state: `loading`, `data`, `error`, `streamingChunks`
- Uses `fetch` with streaming response reader
- Parses incremental JSON chunks as they arrive
- Returns: `{ generate, data, isStreaming, error, reset }`
- Separate exported hooks for each generation type:
  - `useGenerateDQ()`
  - `useGenerateLearningNarrative()`
  - `useQuickCreate()`

**Step 2: Commit**

```bash
git add src/hooks/use-generate.ts
git commit -m "feat: add useGenerate hook for streaming AI generation"
```

---

## Task 24: Tooltip Component (Framework Terms)

**Files:**
- Create: `src/components/ui/framework-tooltip.tsx`

**Step 1: Build FrameworkTooltip component**

Wraps any framework term with a hover tooltip:
- Takes `term` prop, looks up definition from tooltips.ts
- Dark bg (#1A1A2E), white text, 12px DM Sans, max-width 280px
- 200ms hover delay, 100ms fade dismiss
- Subtle pointer triangle
- Uses Radix Tooltip (via shadcn) with custom styling
- Mobile: tap to show, tap elsewhere to dismiss
- Accessible: `aria-describedby`

Can also be used inline: `<FrameworkTooltip term="driving-question">driving question</FrameworkTooltip>`

**Step 2: Commit**

```bash
git add src/components/ui/framework-tooltip.tsx
git commit -m "feat: add FrameworkTooltip component for hover definitions"
```

---

## Task 25: Phase Navigation Component

**Files:**
- Create: `src/components/build/phase-nav.tsx`

**Step 1: Build PhaseNav component**

Vertical phase navigation (BUILD.org inspired) for the Builder sidebar:
- 5 phase dots connected by a vertical line
- Each dot: phase icon + phase name beside it
- States: completed (filled + checkmark), active (filled + larger + subtle pulse), upcoming (outlined)
- Connecting line fills with color from top to bottom as phases complete
- Click a phase to navigate to it
- Phase colors match the phase-as-world system
- Keyboard accessible (arrow keys)

**Step 2: Commit**

```bash
git add src/components/build/phase-nav.tsx
git commit -m "feat: add vertical phase navigation component (BUILD.org style)"
```

---

## Task 26: Gold Standard Gauge

**Files:**
- Create: `src/components/build/gold-standard-gauge.tsx`

**Step 1: Build GoldStandardGauge component**

Radial SVG gauge:
- Circle made of 7 arc segments
- Empty: light gray outlines
- Filled: brand teal with subtle gradient
- Segments fill with smooth arc animation (300ms) when elements are added
- Labels: "Great start" (2/7), "Getting stronger" (3-4), "Robust project" (5-6), "Gold Standard" (7/7)
- 7/7: subtle celebration pulse
- Hover segment: shows which element it represents, present/absent
- Click empty segment: tooltip "Add [element name] to your project. Here's how..." with link
- Props: `elementsIncluded: number[]` (1-7 indices)
- Uses Framer Motion for arc fill animations
- Accessible: announces score via aria-label

**Step 2: Commit**

```bash
git add src/components/build/gold-standard-gauge.tsx
git commit -m "feat: add Gold Standard radial gauge with interactive segments"
```

---

## Task 27: DQ Generator Component (Magic Moment)

**Files:**
- Create: `src/components/build/dq-generator.tsx`
- Create: `src/components/build/dq-formula-animation.tsx`
- Create: `src/components/build/dq-card.tsx`

**Step 1: Build DQFormulaAnimation component**

The magic moment animation (UX Upgrades Section 4):
1. 5 empty labeled slots appear: ROLE | ACTION | PRODUCT | AUDIENCE | PURPOSE
2. Each slot fills with content (200ms stagger, left to right)
3. Brief highlight pulse when each fills
4. 300ms pause
5. Slots smoothly collapse/merge into the complete DQ text
6. Question scales up slightly, lands in final position

Uses Framer Motion `AnimatePresence` and layout animations.

**Step 2: Build DQCard component**

Card for displaying a single DQ option:
- Shows the full question
- Formula breakdown visible (labeled components)
- "Why this works" text appears on hover (desktop) or tap (mobile)
- Difficulty level badge (beginner-friendly / balanced / ambitious)
- Selected state: checkmark + teal border, slightly larger
- Unselected: graceful shrink + fade (but still accessible)
- Click any word in selected DQ to re-edit just that formula component

**Step 3: Build DQGenerator component**

Orchestrates the full DQ generation flow:
- Takes teacher input (grade, subject, topic, duration, notes)
- Calls `useGenerateDQ()` hook
- Shows DQFormulaAnimation as each DQ streams in
- Displays 3 DQCards with stagger animation (500ms between each)
- Teacher clicks to select one
- Selected DQ is editable (click component to re-edit)
- Exposes selected DQ + formula to parent

**Step 4: Commit**

```bash
git add src/components/build/dq-generator.tsx src/components/build/dq-formula-animation.tsx src/components/build/dq-card.tsx
git commit -m "feat: add DQ Generator with magic moment animation and selectable cards"
```

---

## Task 28: Quick Create Flow

**Files:**
- Create: `src/components/build/quick-create.tsx`
- Create: `src/components/build/quick-create-result.tsx`

**Step 1: Build QuickCreateResult component**

One-screen result display:
- Driving question (prominent, Space Grotesk)
- 5-phase overview (one sentence per phase, with phase color indicators)
- "Start Small" suggestion with scale badge
- All streams in with assemble animation as content arrives
- Fits on one screen -- compact layout

**Step 2: Build QuickCreate component**

Full Quick Create flow:
- Takes the teacher's freeform description (from homepage textarea)
- Calls `useQuickCreate()` hook
- Shows streaming result via QuickCreateResult
- Three action buttons at bottom:
  - "Looks good, build the full plan" -> navigates to full Builder with pre-filled data
  - "Let me adjust..." -> allows editing the description and re-generating
  - "Save for later" -> prompts sign-in if not authenticated, then saves

**Step 3: Integration with landing page**

When teacher submits the homepage textarea (Card 1), navigate to `/build?mode=quick&description=...` or render QuickCreate inline on the same page (better UX -- no page navigation).

**Step 4: Commit**

```bash
git add src/components/build/quick-create.tsx src/components/build/quick-create-result.tsx
git commit -m "feat: add Quick Create flow with streaming one-screen result"
```

---

## Task 29: Builder Input Form

**Files:**
- Create: `src/app/build/new/page.tsx`
- Create: `src/components/build/builder-wizard.tsx`
- Create: `src/components/build/builder-input-form.tsx`

**Step 1: Build BuilderInputForm component**

Form collecting:
- Grade level (select: K, 1-12)
- Subject(s) (multi-select or checkboxes: Math, ELA, Science, Social Studies, Art, Music, PE, Technology, World Languages, Other)
- Topic/curriculum unit (text input)
- Duration (4 radio cards: single-day, micro, mini, full -- with scale icons)
- Comfort level (3 radio cards: first time, tried before, experienced)
- Standards (optional textarea: "Paste specific standards you need to address")
- Additional notes (optional textarea)

All inputs use PBLTeach styled components. Duration and comfort level use visual card-style selectors, not plain radios.

**Step 2: Build BuilderWizard component**

Multi-step wizard:
- Step 1: Input form (BuilderInputForm)
- Step 2: DQ generation (DQGenerator)
- Step 3: Learning Narrative output (Task 30)
- Step indicator at top showing current step
- Can navigate back to previous steps
- Data flows through React state (or context)

**Step 3: Build the /build/new page**

`src/app/build/new/page.tsx`:
- Renders BuilderWizard
- If URL has query params from Quick Create, pre-fills the form

**Step 4: Also create /build/page.tsx**

`src/app/build/page.tsx`:
- Entry point: if user navigates to /build directly
- Shows the input form or redirects to /build/new

**Step 5: Verify**

Form renders, all inputs work, validation on required fields (grade, subject, topic). Duration and comfort cards are visually correct.

**Step 6: Commit**

```bash
git add src/app/build/ src/components/build/builder-wizard.tsx src/components/build/builder-input-form.tsx
git commit -m "feat: add Builder input form and wizard flow"
```

---

## Task 30: Learning Narrative Output View

**Files:**
- Create: `src/components/build/learning-narrative-view.tsx`
- Create: `src/components/build/phase-card.tsx`
- Create: `src/components/build/phase-timeline.tsx`

**Step 1: Build PhaseTimeline component**

The 5-circle timeline that renders first during generation:
- 5 circles connected by a line, each in phase color
- Circles are initially empty/outlined
- Fill in sequentially as each phase content generates
- Horizontal on desktop, vertical on mobile
- Uses Connect motion pattern for the line animation

**Step 2: Build PhaseCard component**

Card for a single phase's content:
- Phase color accent bar on left edge
- Phase icon + name in header
- Phase-as-world subtle background pattern (from UX doc Section 3):
  - Entry Event: subtle radial burst at 3% opacity
  - Investigation: subtle dot grid
  - Problem: subtle converging lines
  - Create: subtle cross-hatch
  - Share: subtle concentric rings
- Content: bullet points that slide-up one by one during streaming
- Expandable/collapsible (default: expanded for active, collapsed for others)
- "Regenerate this section" button (subtle, ghost style)
- Framework terms wrapped in FrameworkTooltip

**Step 3: Build LearningNarrativeView component**

Full output view combining:
- PhaseTimeline at top
- 5 PhaseCards below
- Sidebar (desktop): PhaseNav + GoldStandardGauge
- Gold Standard gauge fills as elements are detected in the generated content
- Streaming: phases appear sequentially with assemble animation
- Assessment section (expandable, below phases)
- Cross-curricular connections (expandable, below assessment)

**Step 4: Integrate with BuilderWizard**

BuilderWizard Step 3 renders LearningNarrativeView:
- Calls `useGenerateLearningNarrative()` with all collected data
- Passes streaming data to LearningNarrativeView
- Shows skeleton layout while waiting, phases fill as content arrives

**Step 5: Verify**

The complete flow works: input form -> DQ selection -> Learning Narrative generation with streaming animations. Phase-as-world backgrounds render. Gold Standard gauge tracks. Sections expand/collapse. Tooltips work.

**Step 6: Commit**

```bash
git add src/components/build/learning-narrative-view.tsx src/components/build/phase-card.tsx src/components/build/phase-timeline.tsx
git commit -m "feat: add Learning Narrative output view with streaming phases, phase-as-world, and Gold Standard gauge"
```

---

## Task 31: Firebase Configuration

**Files:**
- Create: `src/lib/firebase/config.ts`
- Create: `src/lib/firebase/auth.ts`
- Create: `src/lib/firebase/firestore.ts`

**Step 1: Create Firebase config**

Create `src/lib/firebase/config.ts`:
- Initialize Firebase app with env vars
- Export `app`, `auth`, `db` (Firestore)
- Guard against re-initialization in dev (hot reload)
- If env vars are missing, export null/undefined and let consumers handle gracefully

**Step 2: Create auth helpers**

Create `src/lib/firebase/auth.ts`:
- `signInWithGoogle()` -- Google popup sign-in
- `signInWithEmail(email, password)` -- email/password sign-in
- `signUpWithEmail(email, password, displayName)` -- create account
- `signOut()` -- sign out
- `onAuthStateChange(callback)` -- auth state listener

**Step 3: Create Firestore helpers**

Create `src/lib/firebase/firestore.ts`:
- `createUserProfile(userId, data)` -- create user doc
- `getUserProfile(userId)` -- get user doc
- `updateUserProfile(userId, data)` -- update user doc
- `saveProject(userId, project)` -- save project to user's subcollection
- `getProject(userId, projectId)` -- get single project
- `getUserProjects(userId)` -- get all user's projects
- `deleteProject(userId, projectId)` -- delete project
- All functions typed with the interfaces from types/

**Step 4: Commit**

```bash
git add src/lib/firebase/
git commit -m "feat: set up Firebase config, auth helpers, and Firestore helpers"
```

---

## Task 32: Auth Provider and Hook

**Files:**
- Create: `src/hooks/use-auth.ts`
- Create: `src/components/providers/auth-provider.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Build AuthProvider**

Create `src/components/providers/auth-provider.tsx`:
- React context wrapping the app
- Listens to Firebase auth state changes
- Provides: `user`, `loading`, `signIn`, `signUp`, `signOut`, `signInWithGoogle`
- Creates Firestore user profile on first sign-in
- Handles anonymous-to-authenticated upgrade gracefully

**Step 2: Build useAuth hook**

Create `src/hooks/use-auth.ts`:
- Consumes AuthProvider context
- Returns: `{ user, loading, isAuthenticated, signIn, signUp, signOut, signInWithGoogle }`

**Step 3: Add to root layout**

Wrap `{children}` in `<AuthProvider>` in `src/app/layout.tsx`.

**Step 4: Commit**

```bash
git add src/hooks/use-auth.ts src/components/providers/auth-provider.tsx src/app/layout.tsx
git commit -m "feat: add AuthProvider context and useAuth hook"
```

---

## Task 33: Sign-In Modal

**Files:**
- Create: `src/components/auth/sign-in-modal.tsx`
- Modify: `src/components/layout/header.tsx`

**Step 1: Build SignInModal component**

Modal (Radix Dialog via shadcn):
- Two tabs: "Sign in" and "Create account"
- Sign in tab: email + password fields + "Sign in" button + "Sign in with Google" button
- Create account tab: name + email + password + "Create account" button + "Sign up with Google"
- Google button: white bg, Google icon, "Continue with Google" text
- Error display for invalid credentials
- Loading state on buttons during auth
- Clean, minimal design matching PBLTeach style
- Can be triggered from anywhere via a global state or callback

**Step 2: Add sign-in trigger to Header**

Update header "Sign In" button to open SignInModal. When authenticated, show user avatar/name with dropdown (Sign out).

**Step 3: Contextual sign-in prompt**

Create a reusable "Want to save this? Sign in." prompt component that can be placed at points of value (after Quick Create, after generating a Learning Narrative).

**Step 4: Commit**

```bash
git add src/components/auth/ src/components/layout/header.tsx
git commit -m "feat: add sign-in modal with Google + email auth"
```

---

## Task 34: Project Save/Load Hook

**Files:**
- Create: `src/hooks/use-project.ts`

**Step 1: Build useProject hook**

Create `src/hooks/use-project.ts`:
- `saveProject(projectData)` -- saves to Firestore, returns projectId
- `loadProject(projectId)` -- loads from Firestore
- `updateProject(projectId, updates)` -- partial update
- `deleteProject(projectId)` -- delete
- `listProjects()` -- get all user's projects
- Auto-detects auth state from useAuth
- Returns: `{ projects, currentProject, save, load, update, remove, loading, error }`

**Step 2: Integrate with Builder**

After a Learning Narrative is generated, show "Save this project" button. If not authenticated, trigger sign-in modal first, then save.

**Step 3: Commit**

```bash
git add src/hooks/use-project.ts
git commit -m "feat: add useProject hook for Firestore project CRUD"
```

---

## Task 35: Dashboard Page

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/components/dashboard/empty-dashboard.tsx`
- Create: `src/components/dashboard/project-card.tsx`

**Step 1: Build EmptyDashboard component**

When user has zero projects (UX Upgrades Section 6):
- Full-width canvas with hand-drawn SVG workshop/studio illustration (light, sketchy, warm)
- "Every great project starts with a question." (Space Grotesk, 36px, centered)
- Large input field: "What are you teaching next? Describe your topic, grade, and subject..."
- Three quick-start pills: "Write a driving question" / "Explore PBL 101" / "Browse community projects"
- The input field submits to Quick Create flow

**Step 2: Build ProjectCard component**

Card for a saved project:
- Title (Space Grotesk Bold)
- Driving question (DM Sans, truncated to 2 lines)
- Grade + subject badges
- Duration badge
- Gold Standard mini gauge (small version of the radial gauge)
- Last edited timestamp
- Status badge (draft / complete)
- Click: navigate to `/build/[projectId]`
- Hover: lift + shadow

**Step 3: Build Dashboard page**

`src/app/dashboard/page.tsx`:
- Protected route (redirect to sign-in if not authenticated)
- If no projects: render EmptyDashboard
- If projects exist: input field (smaller) at top + project card grid below
- Card grid: 3 columns desktop, 2 tablet, 1 mobile

**Step 4: Commit**

```bash
git add src/app/dashboard/ src/components/dashboard/
git commit -m "feat: add Dashboard with empty state, project cards, and quick create entry"
```

---

## Task 36: Project View/Edit Page

**Files:**
- Create: `src/app/build/[projectId]/page.tsx`

**Step 1: Build project detail page**

`src/app/build/[projectId]/page.tsx`:
- Loads project from Firestore via `useProject`
- Renders LearningNarrativeView with the saved data
- Sidebar: PhaseNav + GoldStandardGauge
- All sections are editable (click to edit text, save updates to Firestore)
- "Regenerate" button per section (calls Gemini to regenerate just that section)
- Project title editable at top
- Auto-saves on changes (debounced, 2 second delay)

**Step 2: Verify**

Load a saved project. Edit a section. Verify it saves. Regenerate a section. Verify the new content replaces the old.

**Step 3: Commit**

```bash
git add src/app/build/\[projectId\]/
git commit -m "feat: add project view/edit page with inline editing and regeneration"
```

---

## Task 37: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Build About page**

`src/app/about/page.tsx`:
- "About PBLTeach" heading
- Mike's story / PBLTeach philosophy (can be placeholder text for now, Mike can edit later)
- How it works: visual 3-step (Learn -> Build -> Guide)
- The "Start Human, Use AI, End Human" philosophy explained
- Garden City connection
- Clean editorial layout, generous whitespace
- Scroll-triggered fade-in animations

**Step 2: Commit**

```bash
git add src/app/about/
git commit -m "feat: add About page"
```

---

## Task 38: Responsive Audit and Micro-Interactions Polish

**Files:**
- Modify: various components across the project

**Step 1: Full responsive audit**

Check every page at:
- Desktop (1200px+)
- Tablet (768px-1199px)
- Mobile (320px-767px)

Fix any layout issues. Verify:
- Cards stack correctly on mobile
- Header has mobile menu
- Touch targets are 44px minimum
- Font sizes follow mobile type scale
- Section spacing follows mobile rules (40px instead of 64px)

**Step 2: Micro-interactions polish**

Verify all micro-interactions from UX Upgrades Section 16:
- Card hover: 2px lift + shadow transition
- Input focus: teal border + glow
- Button press: scale 0.98
- Custom scrollbar: teal on light gray, 6px, rounded
- Selection color: teal 20% opacity
- Loading skeletons: warm off-white pulse matching content dimensions

**Step 3: Accessibility audit**

- Tab through every interactive element -- focus indicators visible?
- Screen reader test (VoiceOver): major flows make sense?
- Color contrast: spot check key text/bg combinations
- Reduced motion: toggle and verify all pages

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: responsive audit and micro-interactions polish"
```

---

## Task 39: Final Integration Test

**Step 1: Test the complete flow**

Walk through the entire MVP as a teacher would:

1. Land on homepage, scroll through story
2. Click "Just exploring" -> read all 3 modules, interact with each element
3. Return to homepage, type in the textarea -> Quick Create result appears
4. Click "Build the full plan" -> full Builder wizard
5. Fill in form, generate DQs, select one, generate Learning Narrative
6. Sign in (Google or email)
7. Save project
8. Visit dashboard, see project card
9. Click project, edit a section, regenerate a phase
10. Check About page
11. Test on mobile

**Step 2: Fix any issues found**

**Step 3: Final commit and deploy**

```bash
git add -A
git commit -m "feat: PBLTeach Phase 1 MVP complete"
git push
```

Vercel auto-deploys from the push.

---

## Summary

| Task | Description | Estimated Complexity |
|------|-------------|---------------------|
| 1 | Project initialization | Low |
| 2 | GitHub + Vercel deployment | Low |
| 3 | Tailwind design system config | Medium |
| 4 | Font setup | Low |
| 5 | Customize shadcn/ui components | Medium |
| 6 | Motion utilities | Medium |
| 7 | Custom SVG icons | Medium |
| 8 | Static data files | Medium |
| 9 | TypeScript interfaces | Low |
| 10 | Layout (Header + Footer) | Medium |
| 11 | Landing: Screen 1 (Hero) | Low |
| 12 | Landing: Screen 2 (Before/After) | High |
| 13 | Landing: Screen 3 (Impact) | Low |
| 14 | Landing: Screen 4 (Creation Cards) | Medium |
| 15 | Landing: Exemplar Gallery | Medium |
| 16 | Explore hub page | Low |
| 17 | Explore module layout (shared) | Medium |
| 18 | Explore: What IS PBL? | High |
| 19 | Explore: Learning Narrative | High |
| 20 | Explore: Start Small | High |
| 21 | Gemini client setup | Medium |
| 22 | API routes for generation | Medium |
| 23 | Generation hook | Medium |
| 24 | Framework tooltip component | Low |
| 25 | Phase navigation component | Medium |
| 26 | Gold Standard gauge | High |
| 27 | DQ Generator (magic moment) | High |
| 28 | Quick Create flow | Medium |
| 29 | Builder input form + wizard | Medium |
| 30 | Learning Narrative output view | High |
| 31 | Firebase configuration | Low |
| 32 | Auth provider + hook | Medium |
| 33 | Sign-in modal | Medium |
| 34 | Project save/load hook | Medium |
| 35 | Dashboard page | Medium |
| 36 | Project view/edit page | Medium |
| 37 | About page | Low |
| 38 | Responsive + polish audit | Medium |
| 39 | Final integration test | Medium |
