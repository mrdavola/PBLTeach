# PBLTeach Phase 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add facilitation materials generator with PDF downloads (Guide) and 4 remaining interactive Explore modules to complete the PBLTeach learning + building experience.

**Architecture:** Guide lives at `/build/[projectId]/guide` with a sidebar of 8 material types, Gemini streaming generation for content, HTML preview, and `@react-pdf/renderer` for PDF downloads. Explore modules follow the Phase 1 pattern (ModuleLayout wrapper, scroll-based, interactive elements). PajamaPD deck content enriches the modules.

**Tech Stack:** Next.js 16, Tailwind v4, Framer Motion, @react-pdf/renderer (new), Gemini AI streaming, shadcn/ui (@base-ui/react), @dnd-kit/core (existing)

**Reference docs:**
- `docs/plans/2026-04-03-phase2-design.md` -- approved design
- `PBLTeach-Design-Doc.md` Section 6a (Guide materials)
- `PBLTeach-Design-System.md` Section C5 (facilitation calendar prompt)
- `PBLTeach-UX-Upgrades.md` Section 12 (PDF design system)

---

## Task 1: Install @react-pdf/renderer

**Files:**
- Modify: `package.json`

**Step 1: Install dependency**

```bash
npm install @react-pdf/renderer
```

**Step 2: Verify build still works**

Run: `npm run build`
Expected: Build succeeds (react-pdf is server-only, no client issues)

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @react-pdf/renderer for PDF generation"
```

---

## Task 2: PDF Theme Components

**Files:**
- Create: `src/lib/pdf/theme.tsx`
- Create: `src/lib/pdf/components.tsx`

**Step 1: Create PDF theme**

Create `src/lib/pdf/theme.tsx`:

Define the PBLTeach PDF design system as react-pdf StyleSheet:
- Register fonts: Space Grotesk (Bold) and DM Sans (Regular, Medium) -- use Google Fonts URLs or bundle the .ttf files
- Page style: 0.75" margins (54pt), white bg
- Typography: headlines 24pt Space Grotesk Bold, subheads 16pt Space Grotesk Medium, body 11pt DM Sans Regular 1.5 line-height, captions 9pt DM Sans
- Phase colors as constants (same hex values as Tailwind config)
- Color accent bar style (4px wide, full page height, positioned absolute left)

**Step 2: Create reusable PDF components**

Create `src/lib/pdf/components.tsx`:

Using `@react-pdf/renderer` components (Document, Page, View, Text, StyleSheet):

- `PDFHeader` -- PBLTeach wordmark text (top-left), project title (center), phase name + color bar (top-right)
- `PDFFooter` -- Page number centered at bottom
- `PDFPage` -- Wraps content with header, footer, and phase-colored left accent bar
- `PDFSection` -- Section with headline + content area
- `PDFTable` -- Simple table component (rows + columns) for rubrics
- `PDFBulletList` -- Bulleted list for activities, materials, etc.
- `PDFPhaseTag` -- Small colored tag showing phase number + name

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/lib/pdf/
git commit -m "feat: add @react-pdf/renderer theme and reusable PDF components"
```

---

## Task 3: Gemini Prompts for Guide Materials

**Files:**
- Create: `src/lib/gemini/prompts/facilitation-calendar.ts`
- Create: `src/lib/gemini/prompts/rubric.ts`
- Create: `src/lib/gemini/prompts/handout.ts`

**Step 1: Create facilitation calendar prompt**

`src/lib/gemini/prompts/facilitation-calendar.ts`:

Export `buildFacilitationCalendarPrompt(project: Project, options: { classMinutes: number, classesPerWeek: number })`.

The prompt should:
- Include the full project JSON (title, DQ, all phases, duration)
- Request a day-by-day calendar where each day has: dayNumber, weekNumber, phase (1-5), sessionTitle (5 words max), openingPrompt (1-2 sentences, conversational -- what teacher actually says), activities (2-3 bullets), teacherMoves (1-2 key actions), closing (1 sentence), materialsNeeded (list), timeBreakdown (array of {activity, minutes})
- Phase transitions should feel natural
- Include 2+ reflection moments
- Include 1+ critique/revision cycle in Phase 4
- Final days include presentation AND reflection
- Keep opening prompt language natural
- Don't front-load instruction in week 1

Request JSON array of day objects.

**Step 2: Create rubric prompt**

`src/lib/gemini/prompts/rubric.ts`:

Export `buildRubricPrompt(project: Project, type: "product" | "process")`.

Product rubric: 4-5 criteria rows (relevant to the specific project product), 4-level columns (Beginning, Developing, Proficient, Exemplary), specific descriptors per cell.

Process rubric: criteria for Collaboration, Inquiry/Research, Reflection, Time Management. Same 4-level format.

Request JSON: `{ title, type, criteria: [{ criterion, levels: { beginning, developing, proficient, exemplary } }] }`

**Step 3: Create handout prompt**

`src/lib/gemini/prompts/handout.ts`:

Export `buildHandoutPrompt(project: Project, type: "student-brief" | "reflection-journal" | "critique-protocol" | "parent-letter" | "milestone-tracker")`.

Each type generates different content:
- student-brief: DQ, project overview, expectations, timeline, team roles -- student-facing language
- reflection-journal: one page of prompts per phase (5 sets of 3-4 prompts each)
- critique-protocol: step-by-step peer feedback protocol with sentence starters
- parent-letter: what PBL is (1 paragraph), what their child is working on, timeline, how to support
- milestone-tracker: key dates and deliverables as a list

Request JSON matching each type's structure.

**Step 4: Commit**

```bash
git add src/lib/gemini/prompts/facilitation-calendar.ts src/lib/gemini/prompts/rubric.ts src/lib/gemini/prompts/handout.ts
git commit -m "feat: add Gemini prompts for facilitation calendar, rubrics, and handouts"
```

---

## Task 4: API Routes for Guide Materials

**Files:**
- Create: `src/app/api/generate/facilitation-calendar/route.ts`
- Create: `src/app/api/generate/rubric/route.ts`
- Create: `src/app/api/generate/handout/route.ts`

**Step 1: Create facilitation calendar route**

POST handler. Accepts project data + classMinutes + classesPerWeek. Calls Gemini with facilitation calendar prompt. Returns streaming response. Same pattern as existing generation routes.

**Step 2: Create rubric route**

POST handler. Accepts project data + type ("product" | "process"). Returns streaming response.

**Step 3: Create handout route**

POST handler. Accepts project data + type (one of 5 handout types). Returns streaming response.

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/app/api/generate/facilitation-calendar/ src/app/api/generate/rubric/ src/app/api/generate/handout/
git commit -m "feat: add API routes for facilitation calendar, rubric, and handout generation"
```

---

## Task 5: Guide Page UI -- Sidebar and Layout

**Files:**
- Create: `src/app/build/[projectId]/guide/page.tsx`
- Create: `src/components/guide/guide-layout.tsx`
- Create: `src/components/guide/material-card.tsx`

**Step 1: Create material card component**

`src/components/guide/material-card.tsx` -- "use client":

Card for each material type in the sidebar:
- Props: `{ name, description, icon, status: "idle" | "generating" | "ready", onGenerate, onDownload }`
- Idle: icon + name + "Generate" button
- Generating: icon + name + pulse animation + "Generating..." text
- Ready: icon + name + "Preview" button + "Download PDF" button (small, ghost)
- Uses Card component, compact padding

**Step 2: Create guide layout**

`src/components/guide/guide-layout.tsx` -- "use client":

Props: `{ projectTitle, drivingQuestion, children }`

Layout:
- Back link to `/build/[projectId]`
- Page title: "Facilitation Materials" with project title below
- DQ displayed prominently
- Two-column layout: sidebar (material list, 300px) + main content area
- Mobile: sidebar stacks above content
- "Download All" button at top of sidebar (disabled until at least 1 material is ready)

**Step 3: Create guide page**

`src/app/build/[projectId]/guide/page.tsx` -- "use client":

- Define the 8 material types with name, description, Lucide icon, and generation config
- Manage state for each material: idle/generating/ready + generated data
- Sidebar renders 8 MaterialCards
- Main area shows preview of selected material (or instruction text when nothing selected)
- Auth gate: require sign-in to access

Material type definitions:
```typescript
const materials = [
  { id: "calendar", name: "Facilitation Calendar", icon: Calendar, description: "Day-by-day plan with what to say and when", apiRoute: "/api/generate/facilitation-calendar" },
  { id: "student-brief", name: "Student Project Brief", icon: FileText, description: "One-page overview for students", apiRoute: "/api/generate/handout", handoutType: "student-brief" },
  { id: "product-rubric", name: "Product Rubric", icon: ClipboardCheck, description: "Criteria for the final product", apiRoute: "/api/generate/rubric", rubricType: "product" },
  { id: "process-rubric", name: "Process Rubric", icon: ClipboardList, description: "Criteria for collaboration and inquiry", apiRoute: "/api/generate/rubric", rubricType: "process" },
  { id: "reflection-journal", name: "Reflection Journal", icon: BookOpen, description: "Phase-by-phase reflection prompts", apiRoute: "/api/generate/handout", handoutType: "reflection-journal" },
  { id: "critique-protocol", name: "Peer Critique Protocol", icon: MessageSquare, description: "Structured peer feedback process", apiRoute: "/api/generate/handout", handoutType: "critique-protocol" },
  { id: "parent-letter", name: "Parent/Guardian Letter", icon: Mail, description: "Explain PBL to families", apiRoute: "/api/generate/handout", handoutType: "parent-letter" },
  { id: "milestone-tracker", name: "Milestone Tracker", icon: Target, description: "Key dates and deliverables", apiRoute: "/api/generate/handout", handoutType: "milestone-tracker" },
];
```

**Step 4: Commit**

```bash
git add src/app/build/\\[projectId\\]/guide/ src/components/guide/
git commit -m "feat: add Guide page with material sidebar and generation flow"
```

---

## Task 6: Material Preview Components

**Files:**
- Create: `src/components/guide/calendar-preview.tsx`
- Create: `src/components/guide/rubric-preview.tsx`
- Create: `src/components/guide/handout-preview.tsx`

**Step 1: Create calendar preview**

`src/components/guide/calendar-preview.tsx` -- "use client":

HTML preview of the facilitation calendar:
- Renders day-by-day in a card grid
- Each day card: phase color accent bar on left, session title, opening prompt in a styled callout box ("What to say:" in italics), activities as bullets, teacher moves, materials badge list
- Days grouped by week with week headers
- Phase transitions visually marked with the phase color
- Time breakdown shown as a small bar chart or simple list

**Step 2: Create rubric preview**

`src/components/guide/rubric-preview.tsx` -- "use client":

HTML preview of a rubric:
- Table layout: criteria rows, 4 level columns
- Phase-colored header row
- Clean typography, cells with adequate padding
- Product vs process indicated in title

**Step 3: Create handout preview**

`src/components/guide/handout-preview.tsx` -- "use client":

HTML preview for all 5 handout types:
- Switch on handout type to render appropriate layout
- Student brief: clean one-page layout with DQ prominent
- Reflection journal: phase-by-phase prompts with phase color headers
- Critique protocol: numbered steps with sentence starter boxes
- Parent letter: letter format with warm tone
- Milestone tracker: timeline visualization

**Step 4: Integrate with guide page**

Wire the previews into the guide page: when a material is generated, show its preview in the main area.

**Step 5: Commit**

```bash
git add src/components/guide/
git commit -m "feat: add material preview components (calendar, rubric, handouts)"
```

---

## Task 7: PDF Document Templates

**Files:**
- Create: `src/lib/pdf/calendar-pdf.tsx`
- Create: `src/lib/pdf/rubric-pdf.tsx`
- Create: `src/lib/pdf/handout-pdf.tsx`

**Step 1: Create calendar PDF**

`src/lib/pdf/calendar-pdf.tsx`:

Using @react-pdf/renderer components + the PDF theme:
- Multi-page document
- Two-column layout for days (two days per row)
- Each day: phase color bar, session title, opening prompt callout, activities, teacher moves, materials, time breakdown
- Week headers as section dividers
- Uses PDFHeader and PDFFooter on each page

**Step 2: Create rubric PDF**

`src/lib/pdf/rubric-pdf.tsx`:

- Single page
- Table with criteria rows and 4-level columns
- Phase-colored header row
- Clean grid lines
- Title includes rubric type and project name

**Step 3: Create handout PDFs**

`src/lib/pdf/handout-pdf.tsx`:

Switch on handout type:
- Student brief: single page, DQ prominent, clean layout
- Reflection journal: 5 pages (one per phase), phase-colored headers, prompts + lined space (use repeated thin gray lines as View elements)
- Critique protocol: single page, numbered steps, sentence starter boxes
- Parent letter: single page, letter format
- Milestone tracker: single page, timeline layout

**Step 4: Commit**

```bash
git add src/lib/pdf/
git commit -m "feat: add @react-pdf/renderer PDF templates for all 8 materials"
```

---

## Task 8: PDF Download API Route

**Files:**
- Create: `src/app/api/pdf/route.ts`

**Step 1: Create PDF generation endpoint**

POST handler that:
- Accepts: `{ type: string, data: any, project: { title, drivingQuestion, gradeLevel, subjects } }`
- Renders the appropriate PDF template using @react-pdf/renderer's `renderToBuffer`
- Returns the PDF buffer as a Response with `Content-Type: application/pdf` and `Content-Disposition: attachment`

```typescript
import { renderToBuffer } from "@react-pdf/renderer";
// Import PDF templates...

export async function POST(request: Request) {
  const { type, data, project } = await request.json();
  
  // Select template based on type
  let doc;
  switch (type) {
    case "calendar": doc = <CalendarPDF data={data} project={project} />; break;
    case "product-rubric":
    case "process-rubric": doc = <RubricPDF data={data} project={project} type={type} />; break;
    default: doc = <HandoutPDF data={data} project={project} type={type} />; break;
  }
  
  const buffer = await renderToBuffer(doc);
  
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${type}-${project.title.replace(/\s+/g, "-")}.pdf"`,
    },
  });
}
```

**Step 2: Wire download buttons in guide page**

When "Download PDF" is clicked on a material card, POST to `/api/pdf` with the generated data, receive the buffer, trigger browser download.

**Step 3: Commit**

```bash
git add src/app/api/pdf/ src/components/guide/ src/app/build/\\[projectId\\]/guide/
git commit -m "feat: add PDF download endpoint and wire download buttons"
```

---

## Task 9: "Generate Materials" Entry Point

**Files:**
- Modify: `src/components/build/learning-narrative-view.tsx`

**Step 1: Add "Generate Materials" button**

Add a prominent "Generate Facilitation Materials" button at the bottom of the Learning Narrative view, below the cross-curricular section. Links to `/build/[projectId]/guide`.

- Only show when the project has a complete Learning Narrative (all 5 phases generated)
- Uses primary Button variant with a Lucide FileDown icon
- For projects without an ID yet (not saved), show "Save your project first" with auth gate

**Step 2: Commit**

```bash
git add src/components/build/learning-narrative-view.tsx
git commit -m "feat: add 'Generate Materials' entry point from Learning Narrative view"
```

---

## Task 10: Facilitation Calendar Input Modal

**Files:**
- Create: `src/components/guide/calendar-options-modal.tsx`

**Step 1: Create options modal**

Before generating the facilitation calendar, ask the teacher:
- Class duration (minutes): number input, default 45
- Classes per week: number input, default 5
- Any specific scheduling constraints: optional textarea

Modal uses shadcn Dialog. On submit, passes options to the calendar generation API.

**Step 2: Wire into guide page**

When "Generate" is clicked on the Calendar material card, show this modal first, then generate.

**Step 3: Commit**

```bash
git add src/components/guide/calendar-options-modal.tsx src/app/build/\\[projectId\\]/guide/
git commit -m "feat: add facilitation calendar options modal (class duration, frequency)"
```

---

## Task 11: Explore Module -- "The Gold Standard"

**Files:**
- Create: `src/app/explore/gold-standard/page.tsx`
- Create: `src/components/explore/element-builder.tsx`

**Step 1: Create Element Builder component**

`src/components/explore/element-builder.tsx` -- "use client":

- 7 Gold Standard elements as toggleable cards arranged in a responsive grid (not arc -- simpler for implementation, 2-3 columns)
- Each card: element icon + name + short description, click to toggle on/off
- Off: outlined, muted (neutral-300 border, neutral-500 text)
- On: filled with teal (brand-teal border, brand-teal-light bg, brand-teal-dark text)
- Center/top: GoldStandardGauge component (already built), `elementsIncluded` updates live from toggle state
- At 2/7: animated callout appears: "This is all you need to start -- a driving question and a public product."
- At 7/7: gauge celebration state triggers
- Below each element when toggled on: expandable "What this looks like" with 3 grade-band examples

Data: use `goldStandard` from frameworks.ts. Add grade-band examples as static data in the component.

**Step 2: Create the module page**

`src/app/explore/gold-standard/page.tsx`:

Wrap in ModuleLayout:
- title: "The Gold Standard"
- duration: "7-10 min"
- learningGoal: "Know the 7 elements and understand you can start with just 2"
- progressColor: "bg-brand-teal"

Sections:
1. Hook: "What separates a great project from a mediocre one? Seven elements."
2. Element Builder interactive component
3. DQ Formula section with grade-level examples from PajamaPD (Gr 1 animal experts, Gr 3 community planners, Gr 8 journalists, Gr 10 museum curators)
4. "Start with 2" callout: "You don't need all 7. A driving question and a public product is your minimum viable PBL."

**Step 3: Commit**

```bash
git add src/app/explore/gold-standard/ src/components/explore/element-builder.tsx
git commit -m "feat: add 'The Gold Standard' Explore module with interactive Element Builder"
```

---

## Task 12: Explore Module -- "Design Thinking 101"

**Files:**
- Create: `src/app/explore/design-thinking/page.tsx`
- Create: `src/components/explore/dt-process-simulator.tsx`
- Create: `src/components/explore/squiggle-birds.tsx`
- Create: `src/components/explore/mindset-cards.tsx`

**Step 1: Create DT Process Simulator**

`src/components/explore/dt-process-simulator.tsx` -- "use client":

5 DT stages (Empathize, Define, Ideate, Prototype, Test) as a horizontal process flow:
- 5 nodes connected by arrows, each with a label
- Click a stage to expand detail panel below: description, key activities, classroom example, which DT mindset it connects to
- Active stage: enlarged, colored (use a progression of brand colors or a DT-specific palette)
- AnimatePresence for panel transitions
- Below the process: an animated SVG showing how DT stages map to Learning Narrative phases (Empathize=Investigation, Define=Problem, Ideate+Prototype+Test=Create)

**Step 2: Create Squiggle Birds activity**

`src/components/explore/squiggle-birds.tsx` -- "use client":

Interactive "Squiggle to Star" demonstration:
- Show a random SVG squiggle (3-4 pre-drawn squiggle paths)
- Text: "What could this become?"
- After 3 seconds (or on click), reveal 3 possible transformations: fade in bird-like drawings that incorporate the squiggle
- Each transformation fades in sequentially with stagger
- Below: "Uncomfortable? Good. Good designers are comfortable being uncomfortable." (from PajamaPD slide 8)
- "Shuffle" button to show a new squiggle

**Step 3: Create Mindset Cards**

`src/components/explore/mindset-cards.tsx` -- "use client":

10 Design Thinking mindsets as flip cards (reuse FlipCard component pattern):
- Front: mindset name in large text
- Back: explanation (1-2 sentences)
- Responsive grid: 2-5 columns
- Highlight 3 key mindsets from PajamaPD: Creative Confidence, Culture of Prototyping, Human-Centered (make these slightly larger or featured)

**Step 4: Build the module page**

`src/app/explore/design-thinking/page.tsx`:

Wrap in ModuleLayout:
- title: "Design Thinking 101"
- duration: "7-10 min"
- learningGoal: "Understand the DT process and how it powers the Create phase"
- progressColor: "bg-brand-amber"

Sections:
1. Hook: "Design Thinking is the creative engine inside PBL."
2. GE MRI case study: Before (scary MRI for kids) / After (Adventure Series -- pirate ship, jungle). Two cards with ScrollReveal. (From PajamaPD slides 47-49)
3. DT Process Simulator
4. Squiggle Birds activity
5. Mindset Cards (10 flip cards)
6. "PBL by Design" section: PBL (pedagogical framework) + DT (creative framework) = PBL by Design (from PajamaPD slide 50)

**Step 5: Commit**

```bash
git add src/app/explore/design-thinking/ src/components/explore/dt-process-simulator.tsx src/components/explore/squiggle-birds.tsx src/components/explore/mindset-cards.tsx
git commit -m "feat: add 'Design Thinking 101' Explore module with process simulator, squiggle birds, and mindset cards"
```

---

## Task 13: Explore Module -- "The Alphabet Soup Explained"

**Files:**
- Create: `src/app/explore/alphabet-soup/page.tsx`
- Create: `src/components/explore/comparison-tool.tsx`
- Create: `src/components/explore/umbrella-diagram.tsx`

**Step 1: Create Comparison Tool**

`src/components/explore/comparison-tool.tsx` -- "use client":

- Two side-by-side selector columns
- Each column: a dropdown/select (native select styled with Tailwind) listing all 12 approaches from alphabetSoup data
- Default: "Project-Based Learning" vs "Problem-Based Learning"
- When both selected: a comparison table animates in below showing side-by-side: Duration, Who Drives, Product?, Key Distinction
- Differences between the two approaches highlighted with teal background
- Swap button between the two columns
- AnimatePresence for table entrance when selection changes

**Step 2: Create Umbrella Diagram**

`src/components/explore/umbrella-diagram.tsx` -- "use client":

Interactive SVG diagram:
- PBL as the large umbrella shape at top
- Other approaches nested beneath as labeled circles/bubbles
- Overlapping approaches (Design Thinking, Inquiry-Based) overlap with PBL
- Non-overlapping (STEM/STEAM as a "lens") positioned beside
- Click any approach bubble: a tooltip/panel shows its 2-sentence definition
- SVG-based, responsive
- Simplified version: can be a nested Venn-like diagram rather than a literal umbrella

**Step 3: Build the module page**

`src/app/explore/alphabet-soup/page.tsx`:

Wrap in ModuleLayout:
- title: "The Alphabet Soup Explained"
- duration: "5-8 min"
- learningGoal: "Name the key approaches and understand how they relate"
- progressColor: "bg-brand-indigo"

Sections:
1. Hook: "PBL, STEM, design thinking, inquiry-based... quick, what's the difference? If you paused, you're not alone." (from PajamaPD slide 11)
2. "How many can you define?" -- list all 12, scroll-triggered fade-in (from slide 12)
3. Comparison Tool
4. Umbrella Diagram
5. "The one thing to remember: PBL is the broadest framework. Everything else is either a subset, a lens, or a specific process within PBL."
6. Cheat sheet summary table (static, using alphabetSoup data)

**Step 4: Commit**

```bash
git add src/app/explore/alphabet-soup/ src/components/explore/comparison-tool.tsx src/components/explore/umbrella-diagram.tsx
git commit -m "feat: add 'Alphabet Soup Explained' Explore module with comparison tool and umbrella diagram"
```

---

## Task 14: Explore Module -- "PBL + AI"

**Files:**
- Create: `src/app/explore/pbl-and-ai/page.tsx`
- Create: `src/components/explore/ai-role-sorter.tsx`
- Create: `src/components/explore/philosophy-timeline.tsx`

**Step 1: Create AI Role Sorter**

`src/components/explore/ai-role-sorter.tsx` -- "use client":

Interactive sort exercise using @dnd-kit (already installed):
- 8 PBL task cards:
  1. "Write the driving question" (suggested: Human)
  2. "Generate research topic ideas" (suggested: AI can help)
  3. "Decide the public product format" (suggested: Human)
  4. "Create a rubric" (suggested: AI can help)
  5. "Facilitate peer critique" (suggested: Human)
  6. "Draft a day-by-day calendar" (suggested: AI can help)
  7. "Build relationships with community partners" (suggested: Human)
  8. "Generate reflection prompts" (suggested: Either/both)

- 3 drop zones/buckets: "Human should do this" / "AI can help with this" / "Either/both"
- Drag cards into buckets (or tap-to-select on mobile, same as Learning Narrative drag-drop)
- After all 8 placed: "See our suggestion" button reveals the suggested arrangement
- No hard "wrong" answers -- show agreement/disagreement count, then explain the philosophy
- Explanation: "The tasks requiring judgment, relationships, and student understanding stay human. The tasks involving content generation and formatting can be AI-assisted."

**Step 2: Create Philosophy Timeline**

`src/components/explore/philosophy-timeline.tsx` -- "use client":

"Start Human. Use AI. End Human." as a visual 3-step timeline:
- Step 1 "Start Human": Teacher chooses the topic, framework, and driving question structure (warm coral color)
- Step 2 "Use AI": AI generates content within the framework -- Learning Narrative, calendar, rubrics (brand-teal)
- Step 3 "End Human": Teacher reviews, edits, adapts to their students (warm purple)
- Animated: steps reveal on scroll, connecting arrows draw between them
- Below: "This is exactly what PBLTeach does. The frameworks are human-curated. AI fills in content. You make the final decisions."

**Step 3: Build the module page**

`src/app/explore/pbl-and-ai/page.tsx`:

Wrap in ModuleLayout:
- title: "PBL + AI"
- duration: "5-7 min"
- learningGoal: "Understand how AI supports but doesn't replace PBL design"
- progressColor: "bg-brand-purple"

Sections:
1. Hook: "AI can generate a lesson plan in seconds. But can it understand your students? That's the question."
2. AI Role Sorter exercise
3. "Start Human. Use AI. End Human." Philosophy Timeline
4. "How PBLTeach uses this philosophy" -- brief walkthrough showing: the frameworks (Gold Standard, Learning Narrative, DQ Formula) are human-curated -> AI generates content within them -> teacher edits and decides
5. "What AI is good at vs what humans are good at" comparison (two columns, scroll-triggered)

**Step 4: Commit**

```bash
git add src/app/explore/pbl-and-ai/ src/components/explore/ai-role-sorter.tsx src/components/explore/philosophy-timeline.tsx
git commit -m "feat: add 'PBL + AI' Explore module with AI role sorter and philosophy timeline"
```

---

## Task 15: Update Explore Hub with New Modules

**Files:**
- Modify: `src/lib/data/explore-content.ts`

**Step 1: Update phaseForMVP**

Change the 4 Phase 2 modules from `phaseForMVP: 2` to `phaseForMVP: 1` in the explore-content data (since they're now built). This removes the "Coming soon" treatment on the Explore hub page.

**Step 2: Verify**

Run `npm run build` -- all 7 Explore routes should appear.

**Step 3: Commit**

```bash
git add src/lib/data/explore-content.ts
git commit -m "feat: enable all 7 Explore modules (remove Coming Soon from Phase 2 modules)"
```

---

## Task 16: Wire Dashboard to Auth + Projects

**Files:**
- Modify: `src/app/dashboard/page.tsx`

**Step 1: Wire useAuth and useProject**

Replace the placeholder mock data with real hooks:
- Import `useAuth` and `useProject`
- If not authenticated, redirect to home or show sign-in prompt
- If authenticated but no projects, show EmptyDashboard
- If authenticated with projects, show project card grid
- Call `loadAll()` on mount to fetch user's projects

**Step 2: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: wire Dashboard to Firebase auth and project persistence"
```

---

## Task 17: Final Build Verification and Deploy

**Step 1: Full build**

Run: `npm run build`
Expected: All routes build, no errors.

**Step 2: Push and deploy**

```bash
git push
vercel --prod --yes
```

**Step 3: Verify all routes**

Expected routes:
- `/` -- Landing page
- `/explore` -- Hub with 7 modules (no more "Coming soon")
- `/explore/what-is-pbl`
- `/explore/learning-narrative`
- `/explore/start-small`
- `/explore/gold-standard` (NEW)
- `/explore/design-thinking` (NEW)
- `/explore/alphabet-soup` (NEW)
- `/explore/pbl-and-ai` (NEW)
- `/build` -- Quick Create entry
- `/build/new` -- Full Builder wizard
- `/build/[projectId]` -- Project view
- `/build/[projectId]/guide` -- Guide materials (NEW)
- `/dashboard` -- User dashboard (now wired to auth)
- `/about` -- About page
- `/api/generate/*` -- 6 API routes (3 existing + 3 new)
- `/api/pdf` -- PDF download (NEW)

---

## Summary

| Task | Description | Complexity |
|------|-------------|-----------|
| 1 | Install @react-pdf/renderer | Low |
| 2 | PDF theme + reusable components | High |
| 3 | Gemini prompts (calendar, rubric, handout) | Medium |
| 4 | API routes (3 new) | Medium |
| 5 | Guide page UI (sidebar + layout) | Medium |
| 6 | Material preview components | High |
| 7 | PDF document templates (8 materials) | High |
| 8 | PDF download API route + wiring | Medium |
| 9 | "Generate Materials" entry point | Low |
| 10 | Calendar options modal | Low |
| 11 | Explore: Gold Standard | High |
| 12 | Explore: Design Thinking 101 | High |
| 13 | Explore: Alphabet Soup | High |
| 14 | Explore: PBL + AI | High |
| 15 | Update Explore hub | Low |
| 16 | Wire Dashboard to auth | Low |
| 17 | Final build + deploy | Low |
