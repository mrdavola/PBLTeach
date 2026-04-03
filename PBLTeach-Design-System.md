# PBLTeach — Design System, Schema & Prompt Architecture

**Companion to:** PBLTeach-Design-Doc.md
**Created:** April 2, 2026
**Last updated:** April 2, 2026

---

## A. Visual Design System

### A1. Design philosophy

PBLTeach should feel like the love child of Stanford d.school's playful confidence, BUILD.org's phase-based clarity, and Ellusionist's bold premium energy. It's a tool made by educators for educators, but it doesn't look like edtech. It looks like something a designer would use.

**No emojis. Ever.** Use custom SVG icons throughout. Clean, purposeful, hand-crafted feeling.

Core visual principles:
- Bold typography with personality (not generic)
- Generous white space (let things breathe)
- Phase-based visual patterns (inspired by BUILD.org sidebar and Co-Designing Schools tabs)
- Warm, creative color palette (not corporate blue)
- Card-based content areas with subtle depth
- SVG icons and illustrations, never emoji
- Light backgrounds with bold accent moments
- Interactive elements feel tactile and responsive

### A2. Typography

**Display / headlines:** Space Grotesk (Google Fonts, free)
- Why: Geometric sans-serif with distinctive character. The slightly squared terminals give it personality without sacrificing readability. Feels modern and maker-ish. Similar energy to Franki's headline treatment and d.school's confident typography.
- Usage: H1, H2, hero text, section headers, the "PBLTeach" wordmark
- Weights: Bold (700) for primary headlines, Medium (500) for secondary

**Body / UI text:** DM Sans (Google Fonts, free)
- Why: Clean, modern, highly readable at small sizes. Pairs beautifully with Space Grotesk. Similar feel to the Co-Designing Schools toolkit body text.
- Usage: Paragraphs, form labels, navigation, buttons, card content
- Weights: Regular (400) for body, Medium (500) for emphasis, Bold (700) for strong

**Monospace (code/data moments):** JetBrains Mono (Google Fonts, free)
- Why: For any moment where we show standards codes, data, or structured output
- Usage: Standards references, code-like content

**Type scale (desktop):**
```
H1:       48px / 56px line-height / Space Grotesk Bold
H2:       36px / 44px line-height / Space Grotesk Bold
H3:       24px / 32px line-height / Space Grotesk Medium
H4:       20px / 28px line-height / DM Sans Bold
Body:     16px / 26px line-height / DM Sans Regular
Body sm:  14px / 22px line-height / DM Sans Regular
Caption:  12px / 18px line-height / DM Sans Medium
```

**Type scale (mobile):**
```
H1:       32px / 40px line-height
H2:       26px / 34px line-height
H3:       20px / 28px line-height
H4:       18px / 26px line-height
Body:     16px / 26px line-height (unchanged)
```

### A3. Color palette

**Primary brand color:** Deep Teal `#0D7377`
- Why: Teal sits at the intersection of trustworthy (blue family) and growth (green family). It feels educational without being boring. Nods to BUILD.org's teal energy.
- Usage: Primary buttons, active states, links, accent borders

**Extended palette:**

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Teal | `#0D7377` | Buttons, links, active states |
| Primary light | Soft Teal | `#E0F2F1` | Backgrounds, hover states, tags |
| Primary dark | Dark Teal | `#064E50` | Text on light teal backgrounds |
| Secondary | Warm Coral | `#E8634A` | CTAs, highlights, alerts, energy moments |
| Secondary light | Peach | `#FFF0EC` | Coral background tints |
| Accent | Indigo | `#4338CA` | Explore modules, learning content |
| Accent light | Soft Indigo | `#EEF2FF` | Indigo background tints |
| Accent 2 | Amber | `#D97706` | Warnings, "in progress" states, stars |
| Accent 2 light | Soft Amber | `#FFFBEB` | Amber background tints |
| Neutral 900 | Near Black | `#1A1A2E` | Primary text |
| Neutral 700 | Dark Gray | `#374151` | Secondary text |
| Neutral 500 | Mid Gray | `#6B7280` | Tertiary text, placeholders |
| Neutral 300 | Light Gray | `#D1D5DB` | Borders, dividers |
| Neutral 100 | Off White | `#F5F5F0` | Page backgrounds (warm, like Co-Designing Schools) |
| Neutral 50 | White | `#FFFFFF` | Cards, inputs, content areas |
| Success | Green | `#059669` | Completed states, success messages |
| Error | Red | `#DC2626` | Error states, destructive actions |

**Phase colors** (for the Learning Narrative phases):

| Phase | Color | Hex | Light bg |
|-------|-------|-----|----------|
| 1. Entry Event | Coral | `#E8634A` | `#FFF0EC` |
| 2. Investigation | Indigo | `#4338CA` | `#EEF2FF` |
| 3. Problem / Challenge | Teal | `#0D7377` | `#E0F2F1` |
| 4. Create | Amber | `#D97706` | `#FFFBEB` |
| 5. Share | Purple | `#7C3AED` | `#F5F3FF` |

These phase colors are used consistently everywhere a phase is referenced: in the builder, in the guide, in the timeline, in navigation.

### A4. SVG icon system

Use Lucide icons (lucide.dev) as the base icon set. They're clean, consistent, MIT licensed, and available as React components via `lucide-react`.

Custom SVG icons needed for PBLTeach-specific concepts:
- Learning Narrative phases (5 custom phase icons)
- Gold Standard elements (7 custom element icons)
- DQ Formula components (role, action, product, audience, purpose)
- "Start Small" scale indicators (single-day, micro, mini, full)
- PBLTeach wordmark / logo

Icon sizing:
- Inline (with text): 16px
- UI elements (buttons, nav): 20px
- Feature cards: 24px
- Hero / empty states: 48px

### A5. Component patterns

**Cards:** White background, 1px `neutral-300` border, 12px border-radius, 24px padding. On hover: subtle shadow (`0 4px 12px rgba(0,0,0,0.08)`). No heavy shadows at rest.

**Buttons:**
- Primary: Deep Teal bg, white text, 8px border-radius, 500 weight
- Secondary: White bg, Teal border, Teal text
- Ghost: No bg, no border, Teal text
- Destructive: Coral bg, white text
- All buttons: 44px min height (touch target), 16px horizontal padding

**Phase navigation (sidebar or tabs):**
Inspired by BUILD.org's sidebar. Vertical dots/circles connected by a line, with phase names beside each. Active phase gets the phase color fill; completed phases get a checkmark; upcoming phases are outlined.

**Input fields:** 44px height, 8px border-radius, `neutral-300` border, `neutral-500` placeholder text. On focus: Teal border with soft teal glow.

**Badges/tags:** Pill-shaped (20px border-radius), 12px font, DM Sans Medium. Use phase colors or semantic colors for background.

### A6. Layout patterns

**Max content width:** 1200px, centered
**Grid:** 12-column, 24px gutters
**Section spacing:** 64px between major sections (desktop), 40px (mobile)
**Card grid:** 3-column desktop, 2-column tablet, 1-column mobile

**Page patterns:**
- **Landing:** Full-width hero → pathway cards → social proof → CTA
- **Explore module:** Sidebar navigation (phase dots) + main content area (like BUILD.org)
- **Builder:** Step-by-step wizard with progress indicator → output view with expandable sections
- **Guide:** Sidebar of materials list + main preview/download area
- **Community:** Filter bar + card grid (like a clean TPT)

### A7. Motion and interaction

- Transitions: 200ms ease-out for color/opacity, 300ms ease-out for layout/size
- Hover: Scale 1.02 on cards, color shift on buttons
- Loading: Skeleton screens (not spinners) with subtle pulse animation
- Page transitions: Fade-in content blocks with 50ms stagger
- No bouncy, springy, or attention-grabbing animations. Smooth and intentional.

### A8. Dark mode

Not for MVP. Teachers will primarily use this in well-lit classrooms and at home. If added later, follow the color system with inverted neutrals and adjusted brand colors.

---

## B. Firestore data model

### B1. Collections overview

```
users/
  {userId}/
    profile: { ... }
    projects/ (subcollection)
      {projectId}/
        overview: { ... }
        phases: { ... }
        guide: { ... }
        meta: { ... }
    scopeSequences/ (subcollection)
      {docId}/
        content: { ... }

community/
  {projectId}/
    listing: { ... }
    reviews/ (subcollection)
      {reviewId}: { ... }

exemplars/
  {exemplarId}/
    content: { ... }

standards/
  {standardId}/
    content: { ... }
```

### B2. User document

```typescript
interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'teacher' | 'admin' | 'coordinator';
  gradeLevel?: string[];           // e.g. ["3", "4", "5"]
  subjects?: string[];             // e.g. ["Math", "ELA"]
  school?: string;
  district?: string;
  state?: string;
  pblExperience: 'new' | 'tried' | 'experienced';
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  projectCount: number;
  completedModules: string[];      // Explore module IDs completed
  preferences: {
    defaultDuration: 'single-day' | 'micro' | 'mini' | 'full';
    defaultGradeLevel?: string;
    defaultSubject?: string;
  };
}
```

### B3. Project document (the Learning Narrative)

```typescript
interface Project {
  id: string;
  userId: string;                   // owner
  status: 'draft' | 'complete' | 'published';
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // Overview
  title: string;
  gradeLevel: string;
  subjects: string[];
  topic: string;
  duration: 'single-day' | 'micro' | 'mini' | 'full';
  durationWeeks?: number;
  comfortLevel: 'new' | 'tried' | 'experienced';

  // Driving Question
  drivingQuestion: {
    selected: string;               // the chosen DQ
    options: string[];              // 3 generated options
    formula: {
      role: string;
      action: string;
      product: string;
      audience: string;
      purpose: string;
    };
  };

  // Learning Narrative Phases
  phases: {
    entryEvent: {
      ideas: EntryEventIdea[];      // 3 curated ideas
      selectedIndex?: number;
      customNotes?: string;
    };
    investigation: {
      activities: Activity[];
      skills: string[];
      empathyExercises: string[];
      resources: Resource[];
    };
    problemChallenge: {
      refinedDQ: string;
      needToKnow: string[];
      expertSuggestions: string[];
    };
    create: {
      prototypingIdeas: string[];
      critiqueProtocol: string;
      iterationPlan: string;
      materials: string[];
    };
    share: {
      audienceSuggestions: string[];
      presentationFormats: string[];
      reflectionPrompts: string[];
    };
  };

  // Assessment
  assessment: {
    formative: AssessmentItem[];
    summative: AssessmentItem[];
    rubricType: 'product' | 'process' | 'both';
  };

  // Cross-curricular
  crossCurricular: {
    connections: SubjectConnection[];
    standardsAligned: Standard[];
  };

  // Gold Standard alignment
  goldStandard: {
    elementsIncluded: number[];     // which of the 7 are present (1-7)
    score?: number;                 // 0-7 how many elements
  };

  // Guide materials (generated later)
  guide?: {
    calendarGenerated: boolean;
    handoutsGenerated: boolean;
    rubricsGenerated: boolean;
    generatedAt?: Timestamp;
  };
}

interface EntryEventIdea {
  title: string;
  description: string;
  materials: string[];
  timeNeeded: string;
  type: 'video' | 'guest' | 'activity' | 'field-trip' | 'simulation' | 'artifact' | 'other';
}

interface Activity {
  title: string;
  description: string;
  duration: string;
  phase: 1 | 2 | 3 | 4 | 5;
  type: 'research' | 'skill-building' | 'collaboration' | 'reflection' | 'creation';
}

interface Resource {
  title: string;
  url?: string;
  type: 'article' | 'video' | 'tool' | 'template' | 'book';
  description: string;
}

interface SubjectConnection {
  subject: string;
  topic: string;
  connectionDescription: string;
  suggestedDQ?: string;
}

interface AssessmentItem {
  title: string;
  description: string;
  phase: 1 | 2 | 3 | 4 | 5;
  type: 'formative' | 'summative';
  method: 'rubric' | 'self-assessment' | 'peer-assessment' | 'portfolio' | 'presentation' | 'journal' | 'conference';
}

interface Standard {
  code: string;
  description: string;
  subject: string;
  gradeLevel: string;
}
```

### B4. Community listing document

```typescript
interface CommunityProject {
  id: string;                       // same as project ID
  authorId: string;
  authorName: string;
  authorSchool?: string;

  // Listing info
  title: string;
  drivingQuestion: string;
  gradeLevel: string;
  subjects: string[];
  duration: 'single-day' | 'micro' | 'mini' | 'full';
  description: string;              // 2-3 sentence summary
  tags: string[];

  // Metrics
  views: number;
  adaptations: number;              // how many times cloned
  averageRating: number;
  reviewCount: number;
  featured: boolean;

  publishedAt: Timestamp;
  updatedAt: Timestamp;
}
```

### B5. Scope and sequence document

```typescript
interface ScopeSequence {
  id: string;
  userId: string;
  districtId?: string;

  subject: string;
  gradeLevel: string;
  schoolYear: string;
  fileName: string;
  uploadedAt: Timestamp;

  // Parsed content
  units: ParsedUnit[];
  standards: string[];
  rawText: string;                   // full extracted text for AI analysis
}

interface ParsedUnit {
  title: string;
  topics: string[];
  standards: string[];
  estimatedWeeks: number;
  weekRange: [number, number];      // e.g. [4, 6] for weeks 4-6
}
```

---

## C. Gemini prompt architecture

### C1. Prompt design principles

1. **Framework-first:** Every prompt includes the relevant PBLTeach framework (Learning Narrative, DQ Formula, Gold Standard) as structured context. The AI fills in content WITHIN the framework; it never invents structure.
2. **Structured output:** All prompts request JSON output. The frontend parses and renders beautifully. Teachers never see raw AI text.
3. **Persona:** The AI operates as "an experienced PBL coach who has designed hundreds of projects across K-12." Not a generic assistant.
4. **Constraints:** Every prompt includes explicit constraints about length, tone, and format. No walls of text. Concise, actionable, teacher-friendly.
5. **Human-in-the-loop:** Outputs are always editable. The AI suggests; the teacher decides.

### C2. System prompt (global)

```
You are an expert K-12 project-based learning coach with deep expertise in:
- PBLWorks Gold Standard PBL (7 Essential Design Elements)
- Design Thinking (Stanford d.school / IDEO framework)
- The Learning Narrative framework (5 phases: Entry Event, Investigation, Problem/Design Challenge, Create, Share)
- The Driving Question Formula: "How can we, as [ROLE], [ACTION] a [PRODUCT] for [AUDIENCE] to [PURPOSE]?"
- Cross-curricular connections and standards alignment

Your philosophy:
- PBL is the main course, not dessert. Students learn THROUGH the project, not after it.
- Start small. A single-day micro-project is a valid entry point.
- Structure enables creativity. Give teachers frameworks, not blank pages.
- Beautiful, scannable output. Never produce walls of text.
- "Start Human, Use AI, End Human" -- you support teacher judgment, never replace it.

Output rules:
- Always respond in valid JSON matching the requested schema
- Keep descriptions concise: 1-3 sentences max per item
- Use active, teacher-friendly language (not academic jargon)
- Suggest specific, actionable ideas (not vague platitudes)
- Include grade-appropriate examples
- Never use emojis in any output
```

### C3. Driving Question generator prompt

```
Given the following teacher context:
- Grade level: {gradeLevel}
- Subject(s): {subjects}
- Topic/unit: {topic}
- Duration: {duration}
- Additional context: {teacherNotes}

Generate 3 driving questions using the formula:
"How can we, as [ROLE], [ACTION] a [PRODUCT] for [AUDIENCE] to [PURPOSE]?"

For each driving question, provide:
1. The complete driving question
2. The formula breakdown (role, action, product, audience, purpose)
3. A one-sentence explanation of why this DQ works
4. An authenticity rating (low/medium/high) based on real-world context + real audience + real impact

Make each question meaningfully different:
- One should be more structured/scaffolded (good for PBL beginners)
- One should offer more student voice and choice
- One should maximize community/real-world connection

Respond in this JSON format:
{
  "drivingQuestions": [
    {
      "question": "...",
      "formula": { "role": "...", "action": "...", "product": "...", "audience": "...", "purpose": "..." },
      "whyItWorks": "...",
      "authenticityRating": "high",
      "difficultyLevel": "beginner-friendly"
    }
  ]
}
```

### C4. Learning Narrative generator prompt

```
Generate a complete Learning Narrative for a PBL unit with these parameters:

Teacher context:
- Grade level: {gradeLevel}
- Subject(s): {subjects}
- Topic/unit: {topic}
- Duration: {duration} ({durationWeeks} weeks)
- Driving question: {drivingQuestion}
- Comfort level: {comfortLevel}
- Standards to address: {standards}

Generate all 5 phases of the Learning Narrative:

PHASE 1 - ENTRY EVENT:
Generate 3 entry event ideas. Each should:
- Spark genuine curiosity (not just "watch a video")
- Be feasible for a classroom teacher to execute
- Include specific materials needed
- Include estimated time
- Vary in type (e.g., one guest speaker, one hands-on activity, one multimedia)

PHASE 2 - INVESTIGATION:
Generate:
- 3-5 research/skill-building activities appropriate for the grade level
- 1-2 empathy exercises (connecting students to real people affected by the topic)
- 3-4 recommended resources (articles, videos, tools)

PHASE 3 - PROBLEM/DESIGN CHALLENGE:
Generate:
- A refined version of the driving question (if needed)
- 5-8 "Need to Know" questions students might generate
- 2-3 expert connection suggestions (types of professionals to invite)

PHASE 4 - CREATE:
Generate:
- 3 prototyping/creation ideas appropriate for the grade level
- A simple critique protocol (peer feedback structure)
- Suggested materials and tools
- An iteration prompt ("After feedback, consider...")

PHASE 5 - SHARE:
Generate:
- 3 authentic audience suggestions (specific, not generic)
- 2-3 presentation format options
- 3 reflection prompts for students

Also generate:
- 3 formative assessment ideas mapped to specific phases
- 2 summative assessment ideas
- 2-3 cross-curricular connections with other subjects
- Which Gold Standard elements (1-7) this plan addresses

Adjust complexity and vocabulary for {gradeLevel}.
If comfort level is "new", keep suggestions simpler and more scaffolded.
If comfort level is "experienced", include more ambitious ideas.

Respond in the JSON schema matching the Project interface.
```

### C5. Facilitation calendar prompt

```
Generate a day-by-day facilitation calendar for this PBL unit:

Project overview:
{projectJSON}

Duration: {durationWeeks} weeks, {classMinutes} minutes per class, {classesPerWeek} classes per week

For each day, provide:
- Day number and week number
- Phase (1-5)
- Session title (5 words max)
- Opening prompt: What the teacher says to start the session (1-2 sentences, conversational)
- Activities: What students do (2-3 bullet points, concise)
- Teacher moves: What the teacher does during the session (1-2 key actions)
- Closing: How to wrap up (1 sentence)
- Materials needed: List of specific items
- Time breakdown: How to allocate the {classMinutes} minutes

Important:
- Phase transitions should feel natural, not abrupt
- Build in at least 2 reflection moments across the project
- Include at least 1 critique/revision cycle in Phase 4
- The final day(s) should include both presentation AND reflection
- Keep "opening prompt" language natural; this is what a teacher actually says out loud
- Do NOT front-load all instruction in week 1; weave content learning throughout

Respond as JSON array of day objects.
```

### C6. Scope and sequence analyzer prompt

```
Analyze the following scope and sequence documents for cross-curricular PBL opportunities.

Documents provided:
{documentsArray}

For each document, the subject, grade level, and parsed units with topics and timing are included.

Find opportunities where:
1. Two or more subjects cover related topics in overlapping or adjacent time periods
2. A topic in one subject could serve as authentic context for skills in another
3. Multiple standards from different subjects could be addressed through a single PBL unit

For each opportunity found, provide:
- The subjects involved and specific units/topics that overlap
- The approximate timing (which weeks)
- A suggested driving question for a cross-curricular PBL project
- Which standards from each subject would be addressed
- A feasibility rating (easy/moderate/ambitious) based on how naturally the subjects connect
- A one-sentence pitch a teacher could use to propose this to a colleague

If no uploaded scope and sequences are available, use Next Generation Learning Standards for {gradeLevel} to suggest cross-curricular connections for the topic: {topic}.

Respond as JSON array of opportunity objects, sorted by feasibility (easiest first).
```

### C7. "Rescue mode" triage prompt (Phase 5)

```
A teacher is mid-PBL-project and needs help. Here's what they described:

"{teacherDescription}"

Their current project:
{projectJSON if available, otherwise "No saved project"}

Diagnose the situation:
1. Which phase of the Learning Narrative are they likely in? (1-5)
2. What is the core problem? (categorize as: pacing, engagement, scope, assessment, management, other)
3. What are 3 specific, actionable steps they can take THIS WEEK to get back on track?
4. Is there a simpler version of their project that would still hit the learning goals? (suggest a "scope down" option)
5. What's one encouraging thing about what they've done so far?

Keep the tone supportive and practical. This teacher is stressed.
Respond as JSON.
```

---

## D. Explore module content outlines

### D1. Module: "What IS PBL?"
**Duration:** 5-7 minutes
**Learning goal:** Teacher can distinguish PBL from "doing a project"

Sections:
1. **Hook:** Interactive scenario -- "Your colleague assigns a poster project after a unit. Is this PBL?" (clickable yes/no with explanation)
2. **The dessert vs. main course metaphor:** Visual comparison (SVG illustration). Two side-by-side plates. Left: cupcake labeled "project after learning." Right: full meal labeled "learning through the project."
3. **The 6 key differences:** Interactive flip cards (click to reveal). Each card shows the "doing a project" version on front, the PBL version on back.
4. **Real example:** A 30-second case study. "Mrs. Garcia teaches 3rd grade math. Here's how she turned a fraction unit into PBL..." (Before/after comparison)
5. **Try it:** "Take a unit you're currently teaching. Could it become PBL? Here's one question to ask yourself..." Links to Builder.

### D2. Module: "The Alphabet Soup Explained"
**Duration:** 5-8 minutes
**Learning goal:** Teacher can name the key approaches and understand how they relate

Sections:
1. **Hook:** "Quick -- what's the difference between PBL and problem-based learning? If you paused, you're not alone."
2. **Interactive comparison tool:** A visual where you can click any two approaches and see a side-by-side comparison (duration, who drives, product, key distinction). Built as a React component with the cheat sheet data.
3. **The umbrella diagram:** SVG showing PBL as the large umbrella with the other approaches nested or overlapping beneath it. Interactive; click any approach to see a 2-sentence definition.
4. **The one thing to remember:** "PBL is the broadest framework. Everything else is either a subset, a lens, or a specific process within PBL."
5. **Downloadable cheat sheet:** (Account required) PDF of the comparison table for their planning binder.

### D3. Module: "The Learning Narrative"
**Duration:** 7-10 minutes
**Learning goal:** Teacher understands the 5-phase structure and can map an existing unit to it

Sections:
1. **Hook:** "Every great story has a structure. So does every great project."
2. **The 5 phases (interactive):** A horizontal timeline/stepper. Click each phase to see: what happens, what design thinking stage it connects to, a real example from a classroom, and "what the teacher does vs. what students do."
3. **Phase deep dives:** Expandable sections with 2-3 concrete examples per phase across grade bands (elementary, middle, high).
4. **Mapping exercise (interactive):** "Think of a unit you've taught. Can you identify where each phase might fit?" Drag-and-drop activity where teachers place example activities into the correct phase.
5. **The connection to Gold Standard:** Quick visual showing how the 5 phases map to the 7 Gold Standard elements.
6. **Try it:** "Ready to build a Learning Narrative for your own classroom?" Direct link to Builder with context.

### D4. Module: "Start Small"
**Duration:** 3-5 minutes
**Learning goal:** Teacher feels permission to try PBL at any scale

Sections:
1. **Hook:** "You don't have to redesign your entire year. You can try PBL in a single class period."
2. **The scale spectrum:** Interactive slider showing single-day to full, with examples at each point. As you slide, the examples, time commitment, and complexity change.
3. **Single-day ideas:** 5 specific, immediately actionable ideas any teacher can try tomorrow. Each with: what it is, how long it takes, what students produce, which Gold Standard elements it hits.
4. **Micro project gallery:** 3 example micro-projects (3-5 days) with grade-level context.
5. **The growth path:** "Start with single-day. Try a micro. Then a mini. You're building your PBL muscle."
6. **Try it:** "Pick your scale and start building." Links to Builder with duration pre-selected.

### D5. Module: "The Gold Standard" (Phase 2)
**Duration:** 7-10 minutes
**Learning goal:** Teacher knows the 7 elements and understands they can start with just 2

### D6. Module: "Design Thinking 101" (Phase 2)
**Duration:** 7-10 minutes
**Learning goal:** Teacher understands the DT process and how it powers the "Create" phase of PBL

### D7. Module: "PBL + AI" (Phase 2)
**Duration:** 5-7 minutes
**Learning goal:** Teacher understands how AI supports (but doesn't replace) PBL design

---

## E. Project setup instructions (for Claude Code / VS Code)

### E1. Initialize the project

```bash
# Create Next.js project
npx create-next-app@latest pblteach --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd pblteach

# Install core dependencies
npm install firebase lucide-react @google/generative-ai
npm install -D @types/node

# Install UI utilities
npm install clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-accordion
npm install @radix-ui/react-select @radix-ui/react-tooltip

# Install fonts
npm install @fontsource/space-grotesk @fontsource/dm-sans @fontsource/jetbrains-mono

# Or use next/font with Google Fonts (preferred for performance)
```

### E2. Project structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout with fonts and providers
│   ├── page.tsx                    # Landing page (pathway selector)
│   ├── explore/
│   │   ├── page.tsx                # Explore hub (module list)
│   │   ├── what-is-pbl/page.tsx
│   │   ├── alphabet-soup/page.tsx
│   │   ├── learning-narrative/page.tsx
│   │   └── start-small/page.tsx
│   ├── build/
│   │   ├── page.tsx                # Builder entry (input form)
│   │   ├── new/page.tsx            # Guided builder wizard
│   │   └── [projectId]/
│   │       ├── page.tsx            # Project view/edit
│   │       └── guide/page.tsx      # Facilitation materials
│   ├── analyze/
│   │   ├── page.tsx                # Upload interface
│   │   └── results/page.tsx        # Cross-curricular results
│   ├── community/                  # Phase 2
│   │   ├── page.tsx
│   │   └── [projectId]/page.tsx
│   ├── dashboard/page.tsx          # User dashboard
│   ├── about/page.tsx
│   └── api/
│       ├── generate/
│       │   ├── driving-question/route.ts
│       │   ├── learning-narrative/route.ts
│       │   ├── facilitation-calendar/route.ts
│       │   └── rubric/route.ts
│       ├── analyze/
│       │   └── scope-sequence/route.ts
│       └── auth/
│           └── [...nextauth]/route.ts
├── components/
│   ├── ui/                         # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   └── ...
│   ├── layout/                     # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── phase-nav.tsx           # Phase navigation (BUILD.org style)
│   ├── explore/                    # Explore module components
│   │   ├── module-card.tsx
│   │   ├── flip-card.tsx
│   │   ├── comparison-tool.tsx
│   │   ├── interactive-timeline.tsx
│   │   └── scale-slider.tsx
│   ├── build/                      # Builder components
│   │   ├── builder-wizard.tsx
│   │   ├── step-indicator.tsx
│   │   ├── dq-generator.tsx
│   │   ├── phase-editor.tsx
│   │   ├── learning-narrative-view.tsx
│   │   └── gold-standard-checker.tsx
│   ├── guide/                      # Guide components
│   │   ├── calendar-view.tsx
│   │   ├── handout-preview.tsx
│   │   └── material-card.tsx
│   └── icons/                      # Custom SVG icons
│       ├── phase-icons.tsx
│       ├── gold-standard-icons.tsx
│       └── logo.tsx
├── lib/
│   ├── firebase/
│   │   ├── config.ts               # Firebase initialization
│   │   ├── auth.ts                 # Auth helpers
│   │   ├── firestore.ts            # Firestore helpers
│   │   └── storage.ts              # Storage helpers
│   ├── gemini/
│   │   ├── client.ts               # Gemini API client
│   │   ├── prompts/
│   │   │   ├── system.ts           # Global system prompt
│   │   │   ├── driving-question.ts
│   │   │   ├── learning-narrative.ts
│   │   │   ├── facilitation.ts
│   │   │   ├── rubric.ts
│   │   │   └── scope-analyzer.ts
│   │   └── parse.ts                # Response parsing helpers
│   ├── types/
│   │   ├── project.ts              # TypeScript interfaces
│   │   ├── user.ts
│   │   └── community.ts
│   ├── data/
│   │   ├── frameworks.ts           # Gold Standard, DQ Formula, etc.
│   │   ├── exemplars.ts            # Curated example projects
│   │   ├── alphabet-soup.ts        # Comparison data
│   │   └── explore-content.ts      # Module content
│   └── utils/
│       ├── cn.ts                   # clsx + tailwind-merge helper
│       └── format.ts               # Formatting helpers
├── hooks/
│   ├── use-auth.ts
│   ├── use-project.ts
│   └── use-generate.ts
└── styles/
    └── globals.css                 # Tailwind + custom CSS variables
```

### E3. Environment variables

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Gemini
GEMINI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://pblteach.com
```

### E4. Tailwind config additions

```javascript
// tailwind.config.ts additions
{
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0D7377',
          'teal-light': '#E0F2F1',
          'teal-dark': '#064E50',
          coral: '#E8634A',
          'coral-light': '#FFF0EC',
          indigo: '#4338CA',
          'indigo-light': '#EEF2FF',
          amber: '#D97706',
          'amber-light': '#FFFBEB',
          purple: '#7C3AED',
          'purple-light': '#F5F3FF',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#F5F5F0',
          300: '#D1D5DB',
          500: '#6B7280',
          700: '#374151',
          900: '#1A1A2E',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

### E5. Build order for Claude Code

When you open Claude Code, point it to these documents and say:

**"Read PBLTeach-Design-Doc.md and PBLTeach-Design-System.md. Start building Phase 1 of the MVP. Begin with:**
1. **Project initialization (Next.js + Firebase + Tailwind)**
2. **Design system setup (colors, typography, base components)**
3. **Landing page with 4 pathways + open input field**
4. **Builder wizard flow (input form through Learning Narrative output)**
5. **Driving Question generator with DQ Formula**
6. **Firebase auth (Google sign-in + email)**
7. **Save/load projects**

**Build each piece completely before moving to the next. After each major component, show me what it looks like."**

---

*This document is a companion to PBLTeach-Design-Doc.md. Both should be referenced together.*
*Last updated: April 2, 2026*
