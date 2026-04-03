# PBLTeach — UX Upgrades & Experience Design

**Companion to:** PBLTeach-Design-Doc.md, PBLTeach-Design-System.md
**Created:** April 2, 2026
**Purpose:** This document elevates PBLTeach from "functional product" to "emotional experience." Every upgrade here is about how the tool FEELS, not just what it does.

**Design references:**
- Apple product pages (scroll-driven storytelling, progressive reveal)
- Padlet Arcade (creation-first homepage, radical simplicity, three input methods)
- Stanford d.school (playful confidence, textured personality)
- BUILD.org (phase-as-journey sidebar navigation)
- Co-Designing Schools Toolkit (warm editorial quality, phase tabs)
- Ellusionist (bold premium energy, confident typography)
- Franki (modern typography, clean motion)
- mrcoby.com (creative educator personality)

---

## 1. Landing page: scroll-driven storytelling

**Replace:** Hero section + 4 pathway buttons
**With:** A narrative scroll experience that sells the feeling before the feature

### Structure

**Screen 1 (viewport height):**
A single bold statement in Space Grotesk, centered:

> "Every great project starts with a question."

Below: a subtle scroll indicator (animated chevron, not an emoji arrow). Clean, quiet, inviting. The background is the warm off-white (#F5F5F0).

**Screen 2 (scroll-triggered):**
As the user scrolls, a side-by-side transformation animates in. Left side: a flat, boring worksheet fading in with muted gray tones, labeled "The old way." Right side: a vibrant, phase-colored Learning Narrative timeline assembling itself piece by piece, labeled "The PBL way." The five phases build sequentially as you scroll, each in its phase color: Entry Event (coral), Investigation (indigo), Problem (teal), Create (amber), Share (purple).

This is the "before and after" moment. It takes 3 seconds of scrolling and teaches more about PBL than a paragraph of text.

**Screen 3 (scroll-triggered):**
Three stats or impact statements appear with stagger animation:
- "7 essential elements. Start with just 2."
- "Micro-projects take 3 days, not 3 months."
- "Your first one will be messy. That's the point."

These reframe the barriers teachers feel. Each appears with a subtle fade-up.

**Screen 4: The creation interface (Padlet Arcade-inspired)**

This is where Padlet Arcade's pattern lives. Three large, beautiful input cards side by side (stack on mobile):

**Card 1: "Describe your project"**
A large text area with placeholder: "I teach 5th grade science and we're starting an ecosystems unit next week..."
SVG icon: speech bubble with pencil

**Card 2: "Upload your curriculum"**
Drag-and-drop zone for scope & sequence documents (PDF, DOCX)
SVG icon: document with upload arrow
Subtext: "We'll find cross-curricular PBL opportunities"

**Card 3: "Just exploring"**
Links to Explore modules
SVG icon: compass/magnifying glass
Subtext: "Learn what PBL is and why it matters"

Below the three cards, a row of quick-start prompts (like suggested searches):
- "3rd grade math project ideas"
- "What's the difference between PBL and STEM?"
- "Help me write a driving question"
- "I'm mid-project and things are messy"

These are clickable and pre-fill the text area in Card 1.

**Below the fold:** Curated gallery of exemplar projects (editorial layout, not a grid). "Staff Picks" and "New to PBL? Start Here" collections.

### Why this works
- Teachers don't need to self-categorize ("am I an Explorer or a Builder?")
- The scroll story builds emotional buy-in before asking for action
- The three input cards reduce cognitive load to one choice: describe, upload, or explore
- Quick-start prompts eliminate the blank page problem
- The creation interface IS the homepage (Padlet Arcade pattern)

---

## 2. Streaming generation, not loading states

When the AI generates content (driving questions, Learning Narrative, facilitation calendar), the output streams in visually rather than appearing all at once after a loading spinner.

### Implementation

**Driving Question generation:**
- The formula components (role, action, product, audience, purpose) appear one at a time in labeled slots
- They animate into position like puzzle pieces
- Then the full question assembles from the components, text typing itself letter by letter
- Three questions build sequentially with a 500ms stagger between each

**Learning Narrative generation:**
- The phase timeline renders first (5 circles connected by a line, each in its phase color)
- Each phase card fades in sequentially as content generates
- Within each phase card, bullet points appear one by one with a subtle slide-up
- The Gold Standard gauge fills as elements are detected in the plan
- Total build time: 8-15 seconds of visual construction (matches actual API time)

**Facilitation calendar:**
- A calendar grid skeleton appears first
- Days fill in left-to-right, top-to-bottom, each cell populating with a phase color bar and session title
- Feels like watching a schedule paint itself

### Technical approach
Use Gemini's streaming API. Parse the JSON incrementally. Map each parsed chunk to a UI update. Use React state transitions with `startTransition` for smooth rendering. Framer Motion for the animations (lightweight, React-native, performant).

### Fallback
If streaming fails, show a skeleton screen with subtle pulse animation (not a spinner). Skeleton shapes match the exact layout of the final content so there's no layout shift when content appears.

---

## 3. Phase-as-world visual system

Each Learning Narrative phase has its own subtle visual personality beyond color. This creates a sense of PLACE when you're working within a phase.

### Phase visual identities

**Phase 1: Entry Event — "Ignition"**
- Color: Coral (#E8634A)
- SVG motif: Spark / flame / lightning bolt shapes
- Background pattern: Subtle radial burst (very faint, 3% opacity)
- Energy: Warm, exciting, anticipatory
- Icon: Flame or spark

**Phase 2: Investigation — "Discovery"**
- Color: Indigo (#4338CA)
- SVG motif: Magnifying glass / branching paths / constellation dots
- Background pattern: Subtle dot grid (like a research notebook)
- Energy: Curious, methodical, deep
- Icon: Magnifying glass with question mark

**Phase 3: Problem / Design Challenge — "Focus"**
- Color: Teal (#0D7377)
- SVG motif: Converging lines / crosshair / target
- Background pattern: Subtle converging lines toward center
- Energy: Clear, sharp, decisive
- Icon: Target or crosshair

**Phase 4: Create — "Making"**
- Color: Amber (#D97706)
- SVG motif: Rough/hand-drawn shapes / pencil marks / prototype wireframes
- Background pattern: Subtle cross-hatch (like sketch paper)
- Energy: Rough, iterative, hands-on
- Icon: Pencil / wrench / hands

**Phase 5: Share — "Broadcast"**
- Color: Purple (#7C3AED)
- SVG motif: Expanding circles / ripples / megaphone
- Background pattern: Subtle concentric rings expanding outward
- Energy: Open, celebratory, proud
- Icon: Expanding circles or broadcast

### Application
- When a teacher is working within Phase 3 of the Builder, the sidebar phase indicator highlights Phase 3, and the content area's background picks up the subtle teal converging-lines pattern
- Phase cards in the Learning Narrative output use these motifs as subtle background textures
- The Explore module on the Learning Narrative uses these phase identities in its interactive timeline
- Generated handouts/PDFs use the phase motif as a header decoration

---

## 4. The Driving Question "magic moment"

When a teacher's driving question is generated, the DQ Formula becomes an interactive animation.

### The animation sequence (2-3 seconds total)

1. Five empty labeled slots appear in a horizontal row: ROLE | ACTION | PRODUCT | AUDIENCE | PURPOSE
2. Each slot fills with its content, one at a time, left to right (200ms stagger)
3. Each slot briefly highlights with a subtle pulse when it fills
4. A brief pause (300ms)
5. The slots smoothly collapse and merge into a single line: the complete driving question
6. The question text scales up slightly and lands in its final position, bold and prominent

### After the animation
- The teacher can click any word in the DQ to re-edit just that component
- Clicking "role" reopens just the role slot for editing; the rest stays
- This teaches the formula implicitly: teachers learn by interacting with the structure

### The "pick one" moment
When 3 DQs are generated:
- They appear as 3 cards, each with the formula breakdown visible
- Hovering a card enlarges it slightly and shows "why this works" text
- Clicking a card selects it with a satisfying visual confirmation (checkmark, color shift)
- Unselected cards gracefully shrink and fade (not disappear; they stay accessible)

---

## 5. Contextual morphing

When a teacher provides their grade level and subject, the UI subtly adapts throughout the experience.

### What changes

**Example projects:** The exemplar gallery filters to show grade-appropriate examples first. A kindergarten teacher sees the Kindness Campaign; a 10th grader sees the Policy Proposal.

**Language and tone:** AI-generated content uses age-appropriate vocabulary. Elementary suggestions mention "families" as audience; high school mentions "community organizations" or "local government."

**Visual warmth:** Elementary grade levels get slightly warmer, more rounded UI elements (larger border-radius, warmer accent colors). High school gets slightly sharper, more professional styling. The difference is VERY subtle, maybe 4px vs 8px border-radius, not a different design system.

**Suggested tools:** The "Digital Tools by Phase" section filters to show grade-appropriate tools. Elementary sees Book Creator and Padlet; high school sees WeVideo and Google Workspace.

### Implementation
Store `gradeLevel` and `subjects` in React context. Components read these values and adjust rendering. Not a theme switch; more like a CSS custom property that shifts a few values.

---

## 6. Empty dashboard as invitation

When a logged-in teacher has zero saved projects:

### Instead of
"You have no projects yet. Click 'New Project' to get started."

### Show
A full-width canvas with a warm, hand-drawn SVG illustration of an empty workshop/studio (sketchy, light, not cheesy). In the center:

**"Every great project starts with a question."**
(Space Grotesk, 36px, centered)

Below: a single large input field with placeholder:
"What are you teaching next? Describe your topic, grade, and subject..."

Below the input: three quick-start pills:
"Write a driving question" / "Explore PBL 101" / "Browse community projects"

This means the empty dashboard IS the builder entry point. Zero extra clicks. The moment you type, you're building.

When the teacher has projects, the input field stays at the top (smaller) and saved projects appear below in a card grid.

---

## 7. Motion vocabulary

Three motion principles applied consistently everywhere:

### Assemble
Things build from component parts. Used for: DQ formula animation, Learning Narrative phases appearing, the landing page timeline construction.
- CSS: `transform: translateY(20px) + opacity: 0` → `translateY(0) + opacity: 1`, staggered
- Duration: 400ms per element, 150ms stagger

### Reveal
Content unfolds progressively as you need it. Used for: accordion sections, hover tooltips, phase deep-dives, streaming generation.
- CSS: `max-height: 0 + opacity: 0` → `max-height: auto + opacity: 1`
- Duration: 300ms ease-out

### Connect
Related elements draw visual relationships. Used for: Learning Narrative → Gold Standard mapping, cross-curricular connections, phase navigation highlighting.
- SVG: Animated dashed lines or curved connectors between related elements
- Duration: 600ms with ease-in-out

### Global motion rules
- All animations respect `prefers-reduced-motion`. When reduced motion is on, transitions are instant (0ms) with no movement, only opacity changes.
- No animation exceeds 600ms
- No bouncing, springing, or elastic effects
- No animation plays more than once (no loops except loading states)
- Stagger timing: 100-200ms between sequential elements

---

## 8. Explore modules as interactive essays

Explore modules should feel like beautifully designed editorial pages with scroll-triggered interactions, not course slides.

### Design pattern (per module)

**Structure:**
- Full-width sections separated by generous whitespace (80-120px)
- Each section has ONE concept and ONE interaction
- Scroll-triggered animations build diagrams and comparisons as you reach them
- Text is concise; visuals do the heavy lifting
- A sticky progress bar at the top shows how far through the module you are (thin, 2px, phase-colored)

**Interactive elements (not course quiz questions):**

- **Flip cards:** Click to reveal the PBL version of a "doing a project" trait. 6 cards total, each with a satisfying flip animation.
- **Comparison tool:** Two-column selector where you click any two approaches (PBL, STEM, design thinking, etc.) and see a side-by-side breakdown. Animated swap when you change a selection.
- **Timeline stepper:** The 5 phases as an interactive horizontal timeline. Click a phase to see it expand with details, examples, and a "what teachers do vs. what students do" comparison.
- **Scale slider:** A custom slider component for "Start Small." Drag from single-day to full, and the example project, time commitment, and complexity description all transition smoothly.
- **Drag-and-drop mapper:** For the Learning Narrative module. Given 6 example activities, drag each into the correct phase. Correct placements glow green; incorrect ones bounce back.

**End of each module:**
A single call-to-action card: "Ready to try this? [Start building]" with the input pre-filled based on the module context.

**NO next/previous buttons.** These are scroll-based pages, not paginated slides. The scroll IS the progression.

---

## 9. Sound design (optional, off by default)

### Sound moments
- **Learning Narrative complete:** A soft, warm chime (like a wooden xylophone, single note). 0.5 seconds.
- **DQ selected:** A subtle click-lock sound (like a puzzle piece connecting). 0.3 seconds.
- **Published to community:** A gentle whoosh-release (like opening a window). 0.5 seconds.
- **Gold Standard gauge reaching 7/7:** A ascending three-note sequence. 1 second.
- **Phase transition in Builder:** A very subtle page-turn sound. 0.2 seconds.

### Implementation
- Sounds are OFF by default
- Enabled via a "Sound effects" toggle in user settings
- All sounds are Web Audio API generated (tiny, no file downloads)
- Sounds are short, organic, never jarring
- They NEVER play on error states or loading; only on positive completions

---

## 10. Gold Standard Score as living gauge

### Design
A radial SVG gauge (not a progress bar). A circle made of 7 arc segments, one for each Gold Standard element. Empty segments are light gray outlines. Filled segments use the brand teal with a subtle gradient.

### Behavior
- **Initial state:** 0/7 segments filled. The gauge is visible but mostly empty.
- **As elements are added to the Learning Narrative:** Corresponding segments fill with a smooth arc animation (300ms)
- **Minimum viable PBL (2/7):** When a driving question and public product exist, the gauge shows 2/7 with a label: "Great start"
- **3-4/7:** Label changes to "Getting stronger"
- **5-6/7:** Label changes to "Robust project"
- **7/7:** All segments filled, a subtle celebration pulse. Label: "Gold Standard"

### Interactivity
- Hovering any segment shows which element it represents and whether it's present
- Clicking an empty segment shows a tooltip: "Add [element name] to your project. Here's how..." with a direct link to the relevant section of the Builder
- The gauge is always visible in the Builder sidebar, providing ambient feedback

### Placement
- Builder sidebar (always visible while building)
- Project detail page header
- Community listing cards (small version, showing the score at a glance)

---

## 11. Hover states that teach

### Implementation
Every framework term in the product is wrapped in a `<Tooltip>` component that provides a one-line definition on hover (desktop) or tap (mobile).

### Terms and definitions

**Gold Standard elements:**
- Challenging Problem/Question → "A meaningful question or problem that drives the entire project"
- Sustained Inquiry → "Students investigate over time, not in a single research session"
- Authenticity → "Real-world context plus a real audience plus real impact"
- Student Voice & Choice → "Structured choice within the teacher's framework, not unlimited freedom"
- Reflection → "Students think about what they're learning throughout, not just at the end"
- Critique & Revision → "Give and receive feedback, then actually use it"
- Public Product → "Shared beyond the classroom; the most distinguishing feature of PBL"

**Learning Narrative phases:**
- Entry Event → "A hook that sparks curiosity and generates student questions"
- Investigation → "Research, skill-building, and empathy work"
- Problem/Design Challenge → "Defining the driving question students will answer"
- Create → "The iterative design thinking process: ideate, prototype, test, refine"
- Share → "Present to an authentic audience and reflect on learning"

**Other terms:**
- Driving Question → "The central question that guides the entire PBL unit"
- DQ Formula → "How can we, as [role], [action] a [product] for [audience] to [purpose]?"
- Micro-PBL → "A 3-5 day project; a great way to start"
- Need to Know → "Questions students generate about what they need to learn to answer the DQ"

### Visual design
- Tooltip appears above the term on hover (200ms delay to prevent accidental triggers)
- Subtle pointer triangle connecting tooltip to the term
- Dark background (#1A1A2E), white text, 12px DM Sans, max-width 280px
- Dismissed on mouse-leave (100ms fade)
- On mobile: tap to show, tap elsewhere to dismiss

---

## 12. Print/export as first-class design

### PDF design system

Every generated PDF follows a consistent visual design:

**Header (every page):**
- PBLTeach wordmark (small, top-left)
- Project title (Space Grotesk Bold, top-center)
- Phase indicator (colored bar + phase name, top-right)

**Typography (PDF):**
- Headlines: Space Grotesk Bold, 24pt
- Subheads: Space Grotesk Medium, 16pt
- Body: DM Sans Regular, 11pt, 1.5 line-height
- Captions: DM Sans Regular, 9pt

**Layout:**
- 0.75" margins
- Two-column layout for facilitation calendars
- Single column for handouts and rubrics
- Phase color accent bar on the left edge of every page (4px wide)

**Materials to generate:**

| Material | Layout | Key features |
|----------|--------|-------------|
| Project overview (1-pager) | Single page | DQ prominent, 5-phase summary, Gold Standard score, timeline |
| Facilitation calendar | Multi-page, 2-column | Day-by-day, phase colors, "what to say" callouts |
| Student project brief | Single page | DQ, expectations, timeline, team roles (student-facing language) |
| Rubric (product) | Single page | Criteria rows, 4-level columns, phase-colored headers |
| Rubric (process) | Single page | Collaboration, inquiry, reflection criteria |
| Reflection journal | Multi-page | One page per phase, prompts, lined writing space |
| Peer critique protocol | Single page | Step-by-step, sentence starters, space for notes |
| Parent/guardian letter | Single page | What PBL is, what their child is working on, how to support |

**Implementation:** Use `@react-pdf/renderer` for server-side PDF generation. Define a PBLTeach PDF theme with the typography, colors, and layout rules above. Every generated material uses the same theme for consistency.

---

## 13. Accessibility as design value

### Requirements (not optional)

**Keyboard navigation:**
- Full tab-through navigation for all interactive elements
- Visible focus indicators (2px teal outline with 2px offset)
- Enter/Space to activate buttons and cards
- Escape to close modals, tooltips, and dropdowns
- Arrow keys for phase navigation and slider controls

**Screen reader support:**
- All SVG icons have `aria-label` attributes
- Phase navigation announces "Phase 2 of 5: Investigation, current"
- Gold Standard gauge announces "4 of 7 Gold Standard elements included"
- Streaming generation announces "Generating your Learning Narrative... Phase 1 ready... Phase 2 ready..."
- Tooltips are accessible via `aria-describedby`

**Color and contrast:**
- All text meets WCAG 2.1 AA contrast ratios (4.5:1 for body, 3:1 for large text)
- Phase colors are distinguishable for colorblind users (tested with deuteranopia and protanopia simulators)
- No information conveyed by color alone; always paired with text labels or icons

**Reduced motion:**
- `@media (prefers-reduced-motion: reduce)` disables all animations
- Transitions become instant (0ms duration)
- Scroll-triggered animations are replaced with static, pre-rendered states
- Streaming generation shows a simple skeleton → complete state with no animation

**Touch targets:**
- All interactive elements: minimum 44x44px touch target
- Adequate spacing between clickable elements (8px minimum gap)

---

## 14. Community browse as editorial experience

### Instead of
A grid of project cards with filter dropdowns.

### Build

**The browse page has three sections:**

**Section 1: "Curated for you" (personalized if logged in)**
Based on the teacher's grade level and subjects, show 3-4 hand-picked projects. If not logged in, show "Staff Picks" instead.

Layout: Horizontal scroll of large feature cards (like Apple Music's "New Releases"). Each card shows: project title, driving question, grade/subject badge, Gold Standard score (mini gauge), author name and school.

**Section 2: "Collections"**
Editorially curated groupings, each with a title and 4-6 projects. Examples:
- "New to PBL? Start here" (beginner-friendly micro-projects)
- "Cross-curricular gems" (projects connecting 2+ subjects)
- "Community favorites" (highest rated)
- "Just added" (newest)
- "Math + PBL" / "ELA + PBL" / "Science + PBL" (subject collections)

Layout: Horizontal scroll carousels per collection, like Netflix/Apple TV rows. Each carousel has a "See all" link.

**Section 3: "All projects" with smart filtering**
A search bar + filter chips (not dropdowns). Chips: Grade level, Subject, Duration, Gold Standard Score. Active filters are teal-filled; inactive are outlined.

Results: Card grid with 2-3 columns. Each card is a mini preview: title, DQ, grade, subject, duration badge, rating, adaptation count.

**Project detail page:**
- Hero section: Project title (large), DQ (prominent), author info
- Phase timeline (interactive, expandable)
- "Adapt this project" button (clones into their Builder)
- Materials preview (if generated)
- Reviews section
- "Similar projects" recommendations at bottom

---

## 15. Padlet Arcade-inspired creation flow (addendum to landing page)

### The "zero to project in 60 seconds" principle

Padlet Arcade's genius is radical reduction: describe, choose, build. Under a minute.

PBLTeach should have a similar "fast path" alongside the detailed Builder:

**Quick Create mode:**
1. Teacher types: "5th grade science, ecosystems, 2 weeks"
2. PBLTeach instantly generates: 1 driving question, a 5-phase overview (one sentence per phase), and a "Start Small" suggestion
3. This fits on ONE SCREEN. No wizard, no steps, no scrolling.
4. From this overview, the teacher can: "Looks good, build the full plan" (enters full Builder with pre-filled content) OR "Let me adjust..." (edit the DQ or parameters) OR "Save this for later"

This Quick Create is the DEFAULT when someone types in the homepage input field. The full, detailed Builder wizard is available via "Build the full plan" or from the dashboard. This way, teachers who just want a quick starting point get one in under a minute, and teachers who want the comprehensive experience can opt in.

### No-account creation
Like Padlet Arcade, teachers can create WITHOUT signing in. They get the Quick Create output and can view it. To save, generate facilitation materials, or publish to community, they need to sign in. The sign-in prompt appears naturally at the moment of value ("Want to save this? Sign in to keep it.").

---

## 16. Micro-interactions and polish details

### Details that make it feel premium

**The wordmark:** "PBLTeach" in Space Grotesk Bold, with "PBL" in Deep Teal and "Teach" in Near Black. Clean, no icon needed for MVP. The dot of the lowercase "i" in "Teach" (wait, there's no i) ... actually, keep it clean text only. Consider a subtle custom ligature between L and T.

**Card hover:** Cards lift 2px (translateY) with a shadow transition on hover. Not a dramatic jump; a subtle acknowledgment that you're there.

**Phase dot navigation:** The vertical phase dots (inspired by BUILD.org) have three states: completed (filled circle with checkmark SVG inside), active (filled circle, slightly larger, with a subtle pulse), and upcoming (outlined circle). A thin line connects them. As you complete phases, the connecting line fills with color from top to bottom.

**Input field focus:** When a text input gains focus, the border transitions from neutral-300 to brand-teal, and a very subtle teal glow appears (box-shadow: 0 0 0 3px rgba(13, 115, 119, 0.1)). The label above the input slides up and shrinks slightly (like Material Design float labels, but less dramatic).

**Button press:** Primary buttons scale to 0.98 on mousedown, then back to 1.0 on release. A 100ms transition. Just enough to feel tactile.

**Scrollbar:** Custom styled scrollbar (webkit) with teal thumb on light gray track. 6px wide, rounded. Disappears when not scrolling on mobile.

**Selection color:** Text selection uses brand teal at 20% opacity as background.

**Loading skeletons:** Match the exact dimensions and layout of the content they're replacing. Use the warm off-white (#F5F5F0) as the base with a slightly lighter pulse (#FAFAF7). No gray rectangles on white; that looks cold and broken.

---

*This document completes the PBLTeach design system. Together with PBLTeach-Design-Doc.md and PBLTeach-Design-System.md, you have a comprehensive blueprint for building a product that doesn't just work, but feels crafted.*

*Last updated: April 2, 2026*
