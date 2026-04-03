# PBLTeach — Master Design Document

**Domain:** PBLTeach.com
**Created:** April 2, 2026
**Owner:** Mike Davola, K-12 Technology Staff Developer, Garden City Public Schools
**Status:** Pre-build / Architecture finalized
**Target launch:** April 2026 (MVP)

---

## 1. The problem

Teachers know project-based learning matters, especially as AI reshapes what students need to learn. But they face a wall of overlapping barriers:

- **Confusion:** They can't distinguish between PBL, problem-based learning, challenge-based learning, design thinking, STEM/STEAM, genius hour, inquiry-based learning, interdisciplinary projects, or just "doing a project." The alphabet soup paralyzes them before they start.
- **No starting point:** Even teachers who are bought in don't know how to begin. They don't have a driving question, a framework, or a sense of what "good" looks like.
- **Messiness anxiety:** PBL feels chaotic, expensive, and time-consuming. Teachers are uncomfortable with the lack of control compared to traditional instruction.
- **Curriculum pressure:** Pacing guides, scope and sequences, and standardized testing make teachers feel like they can't afford to deviate. Missing a day or two feels impossible to recover from, especially at the middle and high school level.
- **Dessert, not main course:** When teachers DO incorporate projects, it's usually at the END of a unit, after the "real learning" happens. They treat projects as dessert, not the main course.
- **No facilitation support:** Even with a plan, teachers don't know what to say, when to say it, what to hand out, or how to manage the day-to-day of a PBL unit.
- **Existing AI tools produce garbage:** Current PBL generators (MasteryMate, LogicBalls, Eduaide, MagicSchool) drown teachers in walls of text. The output isn't beautiful, isn't curated, and isn't usable without significant editing.

## 2. The vision

PBLTeach is a co-pilot for project-based learning that meets teachers wherever they are in the process and gives them exactly what they need at that moment.

It is NOT a lesson plan generator. It is NOT a course. It is a single place where a teacher can:
- Learn what PBL actually is (and isn't) through interactive, bite-sized experiences
- Build a complete PBL unit customized to their grade, subject, and comfort level
- Get day-by-day facilitation guides with beautiful, designed, ready-to-use materials
- Upload scope and sequences to find cross-curricular PBL opportunities
- Share, discover, and adapt PBL units from a community of teachers

**Core philosophy:** Start Human. Use AI. End Human.

The AI is invisible. The frameworks are visible. Teachers never feel like they're "using an AI tool." They feel like they're getting expert PBL coaching.

## 3. Target users

### Four teacher personas

| Persona | Mindset | What they need | Entry pathway |
|---------|---------|---------------|---------------|
| **Explorer** | "I've heard of PBL but I don't really get it" | Conviction + clarity. Quick, visual, interactive learning. Not a 10-hour course. | "I'm curious about PBL and want to learn more" |
| **Beginner** | "I'm bought in but have no idea where to start" | A framework, a starting point, permission to start small | "I want to try PBL but don't know where to start" |
| **Builder** | "I have a topic and I'm ready to plan" | A complete Learning Narrative with all materials | "I have a topic and want to build a PBL unit" |
| **Rescuer** | "I'm mid-project and things are falling apart" | Triage, organization, specific fixes | "I'm mid-project and need help" |

**Additional user:** Curriculum coordinators and administrators who want to upload scope and sequences to find cross-curricular PBL opportunities district-wide.

**Important:** Many teachers don't know which persona they are. The tool must gently sort them without making them feel sorted. Some need starter pathways/prompts. Some will type a freeform description. Both must work.

### User access model

- **Anonymous:** Can use Explore (PBL 101), basic Builder (generates a Learning Narrative overview), and browse Community
- **Account (free):** Can save plans, generate full facilitation guides, upload scope and sequences, contribute to Community
- **No paid tier at launch** — this is a free tool for educators

## 4. Core frameworks (curated, not AI-generated)

These frameworks are baked into every output PBLTeach generates. They come from Mike's PD work, PBLWorks Gold Standard, John Spencer, and David Lee EdTech. The AI generates content WITHIN these structures; it doesn't invent its own.

### 4a. The Gold Standard — 7 Essential Design Elements (PBLWorks)

1. Challenging problem or driving question
2. Sustained inquiry
3. Authenticity (real-world context + real audience + real impact)
4. Student voice and choice (structured choice within a framework)
5. Reflection
6. Critique and revision
7. Public product

**Key insight for the tool:** Teachers don't need all 7 to start. Start with a driving question + a public product. Add others as comfort grows.

### 4b. The Learning Narrative — Garden City's 5-Phase Framework

| Phase | What happens | Design thinking connection |
|-------|-------------|--------------------------|
| 1. Entry Event | Sparks curiosity, hooks, elicits questions | — |
| 2. Investigation | Research + skills + empathize | Empathize |
| 3. Problem / Design Challenge | Define the driving question | Define |
| 4. Create | Iterative DT process: ideate, prototype, test | Ideate → Prototype → Test |
| 5. Share | Present to authentic audience + reflect | — |

### 4c. The Driving Question Formula

> "How can we, as [ROLE], [ACTION] a [PRODUCT] for [AUDIENCE] to [PURPOSE]?"

| Component | What it means | Example |
|-----------|--------------|---------|
| Role | Student identity in the project | "community planners" |
| Action | What they do | "design" |
| Product | What they make | "a park" |
| Audience | Who sees it | "panel of parents" |
| Purpose | Why it matters | "within a $500 budget" |

### 4d. The "Dessert vs. Main Course" Distinction

| "Doing a Project" (dessert) | PBL (main course) |
|----|-----|
| Comes AFTER the unit | IS the unit |
| Teacher assigns topic | Students have voice and choice |
| Often a poster | Public product |
| Assessed at the end | Ongoing assessment |
| Content learned first | Content learned as needed |
| Audience: the teacher | Audience: beyond the classroom |

### 4e. The "Start Small" Scaling

| Scale | Duration | Examples |
|-------|----------|----------|
| Single-day | 1 class period | Replace a test with "teach this concept", Need to Know activity, 15-min Zoom expert |
| Micro | 3-5 days | Infographic, letter to decision-maker, Shark Tank pitch, how-to guide |
| Mini | 1-2 weeks | Solution to school problem, short documentary |
| Full | 3+ weeks | Complete Learning Narrative with all 5 phases |

### 4f. The Alphabet Soup Cheat Sheet

| Approach | Duration | Who drives? | Product? | Key distinction |
|----------|----------|-------------|----------|-----------------|
| Project-Based Learning | Weeks-months | Teacher + Student | Yes, public | Learning THROUGH the project |
| Problem-Based | Days-weeks | Teacher | Not always | Specific problem, case studies, medical school origin |
| Design Thinking | Varies | Either | Prototype | Creative PROCESS, not method. Empathize→Define→Ideate→Prototype→Test |
| Challenge-Based | Weeks-months | Student | Yes, action | Students IDENTIFY the challenge. Apple initiative. |
| Genius Hour | Ongoing | Student | Student picks | Dedicated time for personal interests. Google's 20% time. |
| Inquiry-Based | Varies | Either | Not always | Ask questions and investigate. PBL is a form of inquiry. |
| STEM/STEAM | Varies | N/A (lens) | Depends | Content LENS, not teaching method |
| Service Learning | Varies | Either | Community action | Community-focused, civic engagement |
| Maker Ed | Varies | Student | Physical product | Hands-on fabrication, tinkering |
| Interdisciplinary | Varies | Teacher | Varies | Connecting 2+ subjects around a theme |
| Transdisciplinary | Varies | Student | Varies | Breaking down subject boundaries entirely |
| Performance-Based Assessment | Varies | Teacher | Demonstration | Assessing through doing, not testing |

### 4g. Design Thinking Mindsets (IDEO + d.school)

1. Human-centered
2. Mindful of process
3. Culture of prototyping ("Build to think, think to build")
4. Bias toward action
5. Show don't tell
6. Radical collaboration
7. Fail forward
8. Creative confidence
9. Growth mindset
10. Beginner's mindset

## 5. Competitive landscape

### What exists and where it falls short

**Learning / understanding PBL:**
- John Spencer (spencereducation.com, blendeducation.org): $165-240 self-paced video courses. Excellent content but passive consumption, not interactive, not integrated with a building tool.
- PBLWorks (pblworks.org): Workshops, certifications, articles. The "gold standard" authority but expensive, slow, and not a tool.
- David Lee EdTech (davidleeedtech.org, lpbeta.org): Video content, design thinking integration, "Learning Narrative" framework. Inspiration-level, not a tool.
- Cult of Pedagogy: Blog/podcast content. Awareness, not action.

**Building PBL units:**
- MasteryMate (masterymate.ai): AI PBL generator with community sharing. Produces generic output, no facilitation guides, no curated frameworks.
- LogicBalls PBL Generator: Free, simple form. Generic output, marketing-heavy, no depth.
- Eduaide: Design platform, not PBL-specific.
- MagicSchool Unit Plan Generator: Repurposable for PBL but not designed for it.
- AI for Education prompt templates (aiforeducation.io): Copy-paste prompts for ChatGPT. Teachers don't want to be prompt engineers.
- PBLWorks Project Designer (mypblworks.org): PBL-specific but basic output.
- Magnify Learning custom GPTs: PBL-focused GPTs but still require prompt engineering.

**Facilitation / day-by-day support:**
- PBLWorks TEACH: Pre-made, paid curriculum units with facilitation details. Not customizable, not AI-powered.
- **Basically nothing else exists here.** This is the biggest gap.

**Community:**
- Teachers Pay Teachers: Generic marketplace, not PBL-specific, no quality curation.
- No PBL-specific community for sharing, rating, and adapting units.

### PBLTeach's unique advantages

1. **All four quadrants in one tool:** Learn + Build + Guide + Community. Nobody else does this.
2. **Curated frameworks, not generic AI:** The Learning Narrative, Driving Question Formula, Gold Standard elements, and Start Small scaling are baked into every output. The AI fills in content within these proven structures.
3. **Beautiful, designed output:** Not walls of text. Visually appealing handouts, slide decks, calendars, rubrics that teachers actually want to use.
4. **Scope and sequence analyzer:** Upload your curriculum documents, find cross-curricular PBL opportunities. Nobody else has attempted this.
5. **Adaptive entry:** Meets teachers where they are without making them feel categorized.
6. **Interactive learning, not passive courses:** PBL 101 is learn-by-doing, not watch-and-listen.
7. **"Start Human, Use AI, End Human" philosophy:** AI is invisible. Human curation and teacher judgment are always in the loop.

## 6. Architecture

### 6a. Five core experiences

#### EXPLORE — Interactive PBL learning
Turns Mike's PD content into interactive, bite-sized modules (5-10 minutes each).

**Modules:**
- What IS PBL? (The dessert vs. main course distinction)
- The Alphabet Soup Explained (interactive comparison tool)
- The Gold Standard (7 elements, start with just 2)
- Design Thinking 101 (mindsets + process, with Squiggle Birds-style activities)
- The Learning Narrative (Garden City's 5-phase framework)
- PBL + AI (how AI supports PBL without replacing human skills)
- Start Small (micro, mini, full — give yourself permission)

**Each module ends with:** A "Try it now" prompt that sends the teacher into the Builder with context pre-filled.

**Design principles:**
- Visual, not text-heavy
- Interactive elements (quizzes, drag-and-drop, scenarios)
- 5-10 minutes max per module
- Can be completed in any order
- No account required

#### BUILD — PBL unit generator
The core engine. Teacher describes their situation; the tool generates a complete Learning Narrative.

**Input (gathered conversationally or via form):**
- Grade level
- Subject(s)
- Topic or curriculum unit
- Duration preference (single-day / micro / mini / full)
- Comfort level (first time / tried before / experienced)
- Standards (optional; fallback to Next Generation Learning Standards)
- Scope and sequence document (optional upload)

**Output — a complete Learning Narrative:**
1. **Overview:** Project summary, driving question (3 options using the DQ Formula), subject connections, estimated timeline
2. **Phase 1 — Entry Event:** 3 curated entry event ideas with descriptions and needed materials
3. **Phase 2 — Investigation:** Research activities, skill-building lessons, empathy exercises
4. **Phase 3 — Problem / Design Challenge:** Refined driving question, "Need to Know" list template, expert connection suggestions
5. **Phase 4 — Create:** Iterative design thinking process, prototyping ideas, critique and revision protocols
6. **Phase 5 — Share:** Authentic audience suggestions, presentation format options, reflection prompts
7. **Assessment map:** Formative + summative assessment ideas mapped to each phase
8. **Cross-curricular connections:** Other subjects this project naturally touches

**Design principles:**
- Output is visual and scannable, not walls of text
- Each section is expandable/collapsible
- Teachers can regenerate any single section without losing the rest
- "Start with 2" mode: just generates a driving question + public product idea for beginners
- AI generates within the curated frameworks; never invents its own structure

#### GUIDE — Facilitation materials generator
Takes a completed Learning Narrative and produces ready-to-use classroom materials.

**Output options (all beautifully designed):**
- Day-by-day facilitation calendar with "what to say and when"
- Student-facing project overview handout
- Driving question poster / display
- Entry event materials (slides, activity instructions)
- Rubrics (product rubric + process rubric)
- Reflection journal templates
- Peer critique protocol sheets
- Need to Know list template
- Project milestone tracker
- Parent/guardian communication template
- Presentation day materials

**Design principles:**
- All outputs are PDF/printable with professional formatting
- Consistent visual design (clean, modern, teacher-friendly)
- Downloadable individually or as a complete package
- Slide decks generated in a presentable format
- Account required (this is the "save and generate" value prop for sign-up)

#### ANALYZE — Scope and sequence pattern finder
The "killer feature" nobody else has.

**How it works:**
1. Teacher, curriculum coordinator, or administrator uploads scope and sequence documents (PDF, DOCX, or paste text)
2. Multiple subjects/grade levels can be uploaded for a single district
3. The tool analyzes all uploaded curricula and identifies:
   - Overlapping topics across subjects (e.g., ELA persuasive writing + Social Studies local government)
   - Natural PBL opportunities where 2+ subjects converge
   - Suggested driving questions for each cross-curricular opportunity
   - Optimal timing (which weeks the topics overlap)
4. If no scope and sequence is uploaded, falls back to Next Generation Learning Standards to suggest cross-curricular connections

**Output:**
- Visual timeline showing curriculum overlaps
- Suggested PBL projects for each overlap, with one-click "Build this" to enter the Builder
- Exportable report for sharing with administration or curriculum teams

**Design principles:**
- District-level view (multiple teachers/subjects can contribute)
- Account required
- Results are saved and can be shared with colleagues

#### COMMUNITY — Share, discover, and adapt (Phase 2)
A Teachers-Pay-Teachers-style library, but free, PBL-specific, and quality-curated.

**Features:**
- Teachers can publish completed Learning Narratives from the Builder
- Browse by grade level, subject, duration, topic
- Rate and review projects
- "Adapt this" button that clones a project into your Builder for customization
- Featured/spotlighted projects curated by Mike or community moderators
- Exemplar projects from Garden City and other sources

**Design principles:**
- Free to use (no paid content at launch)
- Quality bar: projects must have at least a driving question + public product to be published
- Account required to publish; browsing is anonymous
- Search and filter are first-class features

### 6b. Landing experience

**UPDATED: See PBLTeach-UX-Upgrades.md Section 1 for the full scroll-driven storytelling + Padlet Arcade-inspired creation interface design.**

The landing page is NOT a static hero + buttons. It's a scroll-driven narrative that:
1. Opens with a bold statement: "Every great project starts with a question."
2. Scroll-animates a "before/after" transformation from worksheet to Learning Narrative
3. Presents three impact statements that reframe PBL barriers
4. Arrives at three creation cards (Padlet Arcade pattern): Describe your project | Upload your curriculum | Just exploring
5. Below: quick-start prompts + curated exemplar gallery

Quick Create mode (from the homepage input) generates a one-screen overview in under 60 seconds. Full Builder wizard is opt-in from there. No account required to create; account required to save.

### 6c. Information architecture

```
PBLTeach.com
├── / (Landing — pathway selector + open input)
├── /explore
│   ├── /what-is-pbl
│   ├── /alphabet-soup
│   ├── /gold-standard
│   ├── /design-thinking
│   ├── /learning-narrative
│   ├── /pbl-and-ai
│   └── /start-small
├── /build
│   ├── /new (guided builder flow)
│   ├── /[project-id] (saved project view/edit)
│   └── /[project-id]/guide (facilitation materials)
├── /analyze
│   ├── /upload (scope and sequence upload)
│   └── /results (cross-curricular opportunities)
├── /community (Phase 2)
│   ├── /browse
│   ├── /[project-id] (community project detail)
│   └── /my-projects (teacher's published projects)
├── /dashboard (logged-in user home)
├── /auth (login/signup)
└── /about
```

## 7. Tech stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14+ (App Router) | Mike's preferred stack, SSR for SEO, API routes |
| Database | Firebase Firestore | Real-time, flexible schema, good for iterative development |
| Auth | Firebase Auth | Email/password + Google sign-in, easy anonymous-to-account upgrade |
| Storage | Firebase Storage | PDF uploads (scope and sequences), generated materials |
| AI | Google Gemini (via API) | Mike's preferred model, good for structured output |
| Hosting | Vercel | Free tier works for MVP, great Next.js integration |
| Styling | Tailwind CSS | Rapid iteration, consistent design system |
| PDF Generation | @react-pdf/renderer or jsPDF | For downloadable facilitation materials |
| Document Parsing | pdf-parse, mammoth | For scope and sequence upload parsing |

## 8. Design principles (global)

**See also:** PBLTeach-Design-System.md for full visual design system, Firestore schema, Gemini prompt architecture, Explore module content, and project setup instructions.

**See also:** PBLTeach-UX-Upgrades.md for Apple-inspired experience design upgrades including scroll-driven storytelling, streaming generation, phase-as-world visual system, DQ magic moment animation, contextual morphing, motion vocabulary, sound design, Gold Standard living gauge, hover tooltips, print/export design, accessibility, editorial community browse, and Padlet Arcade-inspired quick create flow.

1. **Beautiful over functional.** Teachers have been burned by ugly edtech tools. Every screen, every output, every handout should look like something they'd be proud to use. Visual appeal drives adoption.
2. **Scannable over readable.** No walls of text. Use visual hierarchy, icons, expandable sections, and progressive disclosure. Teachers should be able to glance and understand.
3. **Interactive over passive.** Every learning module should involve doing, not just reading. Every builder output should be editable and customizable.
4. **Curated over generated.** AI fills in content within proven frameworks. The structure is human-designed and research-backed. The tool never invents its own pedagogical approach.
5. **Permissive over prescriptive.** "Start with 2 elements" instead of "you must include all 7." "Try a micro-project first" instead of "plan a 6-week unit." Give teachers permission to start small and messy.
6. **Invisible AI.** Teachers should never feel like they're "using an AI tool." They should feel like they're getting expert PBL coaching. No visible prompts, no "regenerate" buttons with spinning wheels, no AI disclaimers.
7. **No emojis. Ever.** Use custom SVG icons (Lucide as base set) throughout the entire product. This is a hard rule, no exceptions.
8. **Inspired by:** Stanford d.school (playful confidence), BUILD.org (phase-based navigation), Co-Designing Schools Toolkit (warm editorial quality), Franki (modern typography), Ellusionist (bold premium feel), mrcoby.com (creative educator energy).

## 9. Phased build plan

### Phase 1: MVP (Weeks 1-2)
**Goal:** A teacher can visit PBLTeach.com, learn what PBL is, and build a complete Learning Narrative for their classroom.

**Build:**
- [ ] Landing page with 4 pathways + open input field
- [ ] Explore: 2-3 interactive modules (What IS PBL?, The Learning Narrative, Start Small)
- [ ] Build: Full builder flow (input form → Learning Narrative output with all 5 phases)
- [ ] Driving Question generator (using the DQ Formula)
- [ ] Beautiful output layout (scannable, expandable, visual)
- [ ] Firebase Auth (Google sign-in + email)
- [ ] Save/load projects for logged-in users
- [ ] Mobile-responsive design
- [ ] Basic about page

**Skip for now:**
- Guide (facilitation materials)
- Analyze (scope and sequence)
- Community
- PDF downloads

### Phase 2: Facilitation (Week 3)
**Goal:** A teacher with a completed Learning Narrative can generate ready-to-use classroom materials.

**Build:**
- [ ] Guide: Facilitation calendar generator (day-by-day plan)
- [ ] Guide: Handout generator (student project overview, reflection templates, critique protocols)
- [ ] Guide: Rubric generator (product + process rubrics)
- [ ] PDF download for all generated materials
- [ ] Remaining Explore modules (Gold Standard, Design Thinking, Alphabet Soup, PBL + AI)

### Phase 3: Analysis (Week 4)
**Goal:** Curriculum coordinators can upload scope and sequences and find cross-curricular PBL opportunities.

**Build:**
- [ ] Analyze: Document upload (PDF/DOCX parsing)
- [ ] Analyze: Cross-curricular pattern detection
- [ ] Analyze: Visual timeline of curriculum overlaps
- [ ] Analyze: "Build this" one-click to Builder
- [ ] Standards fallback (Next Generation Learning Standards database)

### Phase 4: Community (Weeks 5-6)
**Goal:** Teachers can share, discover, and adapt PBL units from other educators.

**Build:**
- [ ] Community: Publish a completed project
- [ ] Community: Browse/search/filter
- [ ] Community: Rate and review
- [ ] Community: "Adapt this" clone-to-builder
- [ ] Community: Featured/spotlighted projects
- [ ] Exemplar library (Garden City projects + curated external examples)

### Phase 5: Polish and expand (Ongoing)
- [ ] Slide deck generation (for entry events and student presentations)
- [ ] Parent communication templates
- [ ] Admin-facing reports and analytics
- [ ] District accounts (multiple teachers under one org)
- [ ] Integration with Google Classroom
- [ ] Expanded standards database
- [ ] AI-powered "rescue mode" for mid-project triage

## 10. Content sources and inspirations

### Primary frameworks
- PBLWorks Gold Standard (7 Essential Design Elements, 7 Teaching Practices)
- Mike Davola's Learning Narrative (5-phase GC framework)
- Mike Davola's Driving Question Formula
- Design Thinking (IDEO / Stanford d.school)
- Mike's PajamaPD PBL deck (96 slides of curated content)

### Inspirational educators and resources
- **John Spencer** (spencereducation.com): PBL courses, LAUNCH design thinking cycle, animated videos, free project resources. Author of "Empower" and other PBL books.
- **David Lee EdTech** (davidleeedtech.org, lpbeta.org): STEAM specialist, design thinking integration, "Learning Narrative" terminology, project videos, transdisciplinary unit design.
- **PBLWorks** (pblworks.org): Gold Standard model, project design rubric, teaching practices rubric, case study videos, pre-made curriculum units.
- **A.J. Juliani**: "The PBL Playbook" — practical, classroom-tested PBL guidance.
- **Cult of Pedagogy**: Jennifer Gonzalez's coverage of PBL accessibility and implementation.
- **Getting Smart**: Coverage of AI + PBL integration, structural approaches to PBL design.

### Garden City exemplars (available for inclusion)
- Grade 1: School Community / Active Citizens
- Grade 2: 2nd Grade Street (Starbucks Day → community businesses)
- Grade 3: Create a Country (sustainable country design)
- Grade 4: Museum of New York (exhibit design for future 4th graders)
- Grade 5: EPCOT / World's Fair (miniature World's Fair)
- Grade 6: Genius Hour (inquiry-driven learning)
- Grade 10: UN Sustainable Development Goals

### Example PBL projects for the exemplar library
- Kindness Campaign (Gr 1 ELA + SEL)
- Budget Park (Gr 3 Math)
- Eco-Report (Gr 5 Science)
- Community Podcast (Gr 7 ELA)
- PSA Campaign (Gr 8 Health)
- Policy Proposal (Gr 10 Government)
- Startup Pitch (HS cross-curricular)

## 11. Key decisions log

| Decision | Rationale | Date |
|----------|-----------|------|
| Name: PBLTeach | Clear, memorable, domain available, works as noun and verb-ish | April 2, 2026 |
| Free tool, no paid tier at launch | Maximize adoption; monetization decisions later | April 2, 2026 |
| Anonymous + account model | Low friction for exploration; account for saving/generating/sharing | April 2, 2026 |
| Firebase over Supabase | Mike has experience with Firebase; handles auth + storage + real-time well | April 2, 2026 |
| Gemini for AI layer | Mike's preferred model; good structured output; cost-effective | April 2, 2026 |
| Curated frameworks over generic AI | Differentiator from every other PBL generator; ensures quality | April 2, 2026 |
| Beautiful output as a core requirement | Teachers adopt tools that look good; visual appeal drives usage | April 2, 2026 |
| Mobile + desktop from day one | Teachers plan on their phones at night and at desks during planning periods | April 2, 2026 |
| Learning Narrative as core structure | GC's 5-phase framework is proven, maps to Gold Standard, and is unique to PBLTeach | April 2, 2026 |
| "Start with 2" philosophy | Reduces barrier to entry; driving question + public product is the minimum viable PBL | April 2, 2026 |

## 12. Open questions (to resolve during build)

- [ ] How should the freeform input routing work? Pure AI classification, or keyword matching + AI fallback?
- [ ] Should Explore modules be fully static (faster) or have AI-powered interactive elements (richer)?
- [ ] What's the exact visual design system? (Colors, typography, component library)
- [ ] How do we handle the "rescue mode" for mid-project teachers? Guided questionnaire or freeform conversation?
- [ ] Should the Analyze tool work at the individual teacher level, or is it primarily a district/admin tool?
- [ ] How much of the facilitation guide should be editable by the teacher before downloading?
- [ ] What standards database do we use? (CASE Network API? Static JSON? Upload-only?)
- [ ] How do we prevent the Community from becoming a dumping ground of low-quality projects?
- [ ] Should there be a "PBL readiness" self-assessment that helps teachers identify their persona?
- [ ] Integration with Google Classroom: scope and priority?

## 13. Success metrics (post-launch)

- **Adoption:** Number of teachers who complete a Learning Narrative
- **Completion rate:** % of builders who finish all 5 phases (vs. abandoning after driving question)
- **Return rate:** % of teachers who come back within 30 days
- **Guide generation:** Number of facilitation material downloads
- **Community:** Number of published projects, adaptation rate
- **Qualitative:** Teacher feedback on usability, output quality, and confidence to try PBL

---

*This document is a living reference. Update it as decisions are made and features are built.*
*Last updated: April 2, 2026*
