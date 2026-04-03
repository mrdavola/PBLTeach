# PBLTeach Phase 3: Scope and Sequence Analyzer -- Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a scope and sequence analyzer that lets teachers upload curriculum documents, extracts structured data, finds PBL opportunities (individual and cross-curricular), and displays results with an interactive timeline and opportunity cards.

**Architecture:** Upload page with drag-and-drop for PDF/DOCX files. Server-side text extraction via `pdf-parse`/`mammoth`, then Gemini for structured parsing. Analysis via Gemini to find PBL opportunities and cross-curricular overlaps. Results rendered as an SVG Gantt timeline + opportunity cards with "Build this" links to the Builder.

**Tech Stack:** Next.js 16, pdf-parse, mammoth, Gemini AI (streaming), Firebase Storage + Firestore, Framer Motion, SVG

---

## Task 1: Install Document Parsing Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install**

```bash
npm install pdf-parse mammoth
npm install -D @types/pdf-parse
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install pdf-parse and mammoth for document parsing"
```

---

## Task 2: Document Parsing Utilities

**Files:**
- Create: `src/lib/analyze/parse-pdf.ts`
- Create: `src/lib/analyze/parse-docx.ts`
- Create: `src/lib/analyze/extract-text.ts`

**Step 1: Create PDF parser**

`src/lib/analyze/parse-pdf.ts`:
```typescript
import pdf from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer);
  return data.text;
}
```

**Step 2: Create DOCX parser**

`src/lib/analyze/parse-docx.ts`:
```typescript
import mammoth from "mammoth";

export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}
```

**Step 3: Create unified extractor**

`src/lib/analyze/extract-text.ts`:
```typescript
import { extractTextFromPDF } from "./parse-pdf";
import { extractTextFromDOCX } from "./parse-docx";

export async function extractText(buffer: Buffer, filename: string): Promise<string> {
  const ext = filename.toLowerCase().split(".").pop();
  
  switch (ext) {
    case "pdf":
      return extractTextFromPDF(buffer);
    case "docx":
    case "doc":
      return extractTextFromDOCX(buffer);
    default:
      throw new Error(`Unsupported file type: ${ext}. Please upload PDF or DOCX files.`);
  }
}
```

**Step 4: Commit**

```bash
git add src/lib/analyze/
git commit -m "feat: add document text extraction for PDF and DOCX"
```

---

## Task 3: Gemini Prompts for Analysis

**Files:**
- Create: `src/lib/gemini/prompts/parse-scope-sequence.ts`
- Create: `src/lib/gemini/prompts/analyze-individual.ts`
- Create: `src/lib/gemini/prompts/analyze-cross-curricular.ts`

**Step 1: Create structured parsing prompt**

`src/lib/gemini/prompts/parse-scope-sequence.ts`:

Export `buildParsePrompt(rawText: string, subject: string, gradeLevel: string): string`

Prompt asks Gemini to parse extracted text into structured data:
```
Given this scope and sequence document for {subject}, Grade {gradeLevel}:

{rawText}

Extract the curriculum units. For each unit, identify:
- title: The unit/topic name
- topics: Key topics and concepts covered (array of strings)
- standards: Any standards codes mentioned (array of strings, empty if none found)
- estimatedWeeks: How many weeks this unit likely takes (number)
- weekRange: Approximate week numbers [start, end] based on position in the document

Return JSON:
{
  "units": [
    { "title": "...", "topics": ["..."], "standards": ["..."], "estimatedWeeks": 3, "weekRange": [1, 3] }
  ],
  "totalWeeks": 36
}

If week ranges aren't explicit, estimate based on unit count and a typical 36-week school year.
```

**Step 2: Create individual analysis prompt**

`src/lib/gemini/prompts/analyze-individual.ts`:

Export `buildIndividualAnalysisPrompt(parsedUnits: any[], subject: string, gradeLevel: string): string`

Prompt asks Gemini to find PBL opportunities within one subject:
```
Given these curriculum units for {subject}, Grade {gradeLevel}:

{JSON.stringify(parsedUnits)}

For each unit (or combination of adjacent units), identify PBL opportunities. For each opportunity:
- unitTitles: Which unit(s) it connects to
- weekRange: When it could happen [start, end]
- suggestedDQ: A driving question using the formula "How can we, as [role], [action] a [product] for [audience] to [purpose]?"
- description: 1-2 sentences describing the project
- suggestedDuration: "micro" | "mini" | "full"
- feasibility: "easy" | "moderate" | "ambitious"
- goldStandardElements: Which of the 7 Gold Standard elements this naturally includes (array of numbers 1-7)
- pitch: One sentence a teacher could use to get excited about this project

Return JSON:
{
  "opportunities": [...]
}

Focus on opportunities with real-world connections, authentic audiences, and meaningful products. Prioritize feasibility -- suggest projects that work within the existing curriculum pacing.
```

**Step 3: Create cross-curricular analysis prompt**

`src/lib/gemini/prompts/analyze-cross-curricular.ts`:

Export `buildCrossCurricularPrompt(documents: Array<{ subject: string, gradeLevel: string, units: any[] }>): string`

Prompt asks Gemini to find overlaps across subjects:
```
Given these scope and sequence documents for multiple subjects:

{JSON.stringify(documents)}

Find cross-curricular PBL opportunities where 2 or more subjects have related topics in overlapping or adjacent time periods.

For each opportunity:
- subjects: Array of subjects involved
- unitConnections: For each subject, which unit(s) connect and their topics
- weekRange: Optimal timing [start, end] (when topics overlap)
- suggestedDQ: A driving question connecting the subjects
- description: 1-2 sentences
- feasibility: "easy" | "moderate" | "ambitious"
- pitch: One sentence to propose this to a colleague
- standardsAddressed: Standards from each subject that would be covered

Return JSON:
{
  "opportunities": [...],
  "summary": "Found N cross-curricular opportunities across these subjects."
}

Sort by feasibility (easiest first). Focus on natural connections, not forced ones.
```

**Step 4: Commit**

```bash
git add src/lib/gemini/prompts/parse-scope-sequence.ts src/lib/gemini/prompts/analyze-individual.ts src/lib/gemini/prompts/analyze-cross-curricular.ts
git commit -m "feat: add Gemini prompts for scope and sequence parsing and analysis"
```

---

## Task 4: API Routes for Upload and Analysis

**Files:**
- Create: `src/app/api/analyze/parse/route.ts`
- Create: `src/app/api/analyze/individual/route.ts`
- Create: `src/app/api/analyze/cross-curricular/route.ts`

**Step 1: Create parse route**

`src/app/api/analyze/parse/route.ts`:

POST handler that accepts FormData with:
- `file`: the uploaded file (PDF or DOCX)
- `subject`: string
- `gradeLevel`: string

Flow:
1. Extract file from FormData
2. Get buffer from file
3. Extract text using `extractText(buffer, filename)`
4. Send to Gemini with `buildParsePrompt` for structured parsing
5. Return streaming response with parsed JSON

```typescript
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const subject = formData.get("subject") as string;
    const gradeLevel = formData.get("gradeLevel") as string;
    
    if (!file || !subject || !gradeLevel) {
      return Response.json({ error: "Missing file, subject, or gradeLevel" }, { status: 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const rawText = await extractText(buffer, file.name);
    
    // Send to Gemini for structured parsing
    const model = getModel();
    const prompt = getSystemPrompt() + "\n\n" + buildParsePrompt(rawText, subject, gradeLevel);
    
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    // Stream response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(encoder.encode(chunk.text()));
          }
        } catch (error) { controller.error(error); }
        finally { controller.close(); }
      },
    });
    
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    return Response.json({ error: "Parsing failed" }, { status: 500 });
  }
}
```

**Step 2: Create individual analysis route**

`src/app/api/analyze/individual/route.ts`:

POST handler accepting JSON: `{ units, subject, gradeLevel }`. Calls Gemini with individual analysis prompt. Returns streaming response.

**Step 3: Create cross-curricular analysis route**

`src/app/api/analyze/cross-curricular/route.ts`:

POST handler accepting JSON: `{ documents: [{ subject, gradeLevel, units }] }`. Calls Gemini with cross-curricular prompt. Returns streaming response.

**Step 4: Commit**

```bash
git add src/app/api/analyze/
git commit -m "feat: add API routes for document parsing, individual analysis, and cross-curricular analysis"
```

---

## Task 5: Firebase Storage Integration

**Files:**
- Create: `src/lib/firebase/storage.ts`

**Step 1: Create storage helpers**

```typescript
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from "./config";

const storage = app ? getStorage(app) : null;

export async function uploadDocument(userId: string, file: File): Promise<string | null> {
  if (!storage) return null;
  const storageRef = ref(storage, `users/${userId}/uploads/${Date.now()}-${file.name}`);
  const buffer = await file.arrayBuffer();
  await uploadBytes(storageRef, new Uint8Array(buffer));
  return getDownloadURL(storageRef);
}

export async function deleteDocument(path: string): Promise<void> {
  if (!storage) return;
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
```

**Step 2: Add Firestore helpers for scope sequences**

Add to `src/lib/firebase/firestore.ts`:

```typescript
// Scope sequence operations
export async function saveScopeSequence(userId: string, data: any): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  const colRef = collection(db, "users", userId, "scopeSequences");
  const docId = doc(colRef).id;
  const docRef = doc(colRef, docId);
  await setDoc(docRef, { ...data, id: docId, uploadedAt: serverTimestamp() });
  return docId;
}

export async function getUserScopeSequences(userId: string): Promise<any[]> {
  if (!db) return [];
  const q = query(collection(db, "users", userId, "scopeSequences"), orderBy("uploadedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deleteScopeSequence(userId: string, docId: string): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await deleteDoc(doc(db, "users", userId, "scopeSequences", docId));
}
```

**Step 3: Commit**

```bash
git add src/lib/firebase/storage.ts src/lib/firebase/firestore.ts
git commit -m "feat: add Firebase Storage for document uploads and Firestore helpers for scope sequences"
```

---

## Task 6: Upload Page UI

**Files:**
- Create: `src/app/analyze/page.tsx`
- Create: `src/components/analyze/upload-zone.tsx`
- Create: `src/components/analyze/document-list.tsx`

**Step 1: Create upload zone component**

`src/components/analyze/upload-zone.tsx` -- "use client":

Drag-and-drop file upload area:
- Dashed border zone (neutral-300, rounded-xl, p-12)
- Icon: FileUp from Lucide, centered
- Text: "Drop your scope and sequence here" + "PDF or DOCX"
- Click to open file picker
- Drag over: border turns teal, bg turns brand-teal-light
- After file selected: show file name, subject dropdown, grade level dropdown
- "Upload & Parse" button
- Handles the FormData POST to `/api/analyze/parse`
- Shows streaming parsing progress
- On complete: saves parsed data to Firestore and adds to the document list

Props: `{ onDocumentParsed: (doc: { subject, gradeLevel, units, fileName }) => void }`

**Step 2: Create document list component**

`src/components/analyze/document-list.tsx` -- "use client":

Shows uploaded and parsed documents:
- Each document as a compact card: file name, subject badge, grade badge, unit count
- Delete button (X icon) to remove a document
- Props: `{ documents: Array<{ id, fileName, subject, gradeLevel, units }>, onRemove: (id: string) => void }`

**Step 3: Create analyze page**

`src/app/analyze/page.tsx` -- "use client":

Layout:
- Auth gate (require sign-in)
- Page title: "Analyze Your Curriculum" (font-display font-bold text-4xl)
- Subtitle: "Upload scope and sequence documents to find PBL opportunities."
- Two sections:
  - Upload section: UploadZone + DocumentList below it
  - Action section (appears when 1+ documents are uploaded):
    - If 1 document: "Analyze for PBL Opportunities" button
    - If 2+ documents: "Find Cross-Curricular Opportunities" button (primary, prominent) + "Analyze Individual" button (secondary)
  - Buttons trigger API calls and navigate to `/analyze/results` with data in state (or URL params / session storage)

**Step 4: Commit**

```bash
git add src/app/analyze/ src/components/analyze/
git commit -m "feat: add Analyze upload page with drag-and-drop, document list, and parsing flow"
```

---

## Task 7: SVG Timeline Component

**Files:**
- Create: `src/components/analyze/curriculum-timeline.tsx`

**Step 1: Create timeline component**

`src/components/analyze/curriculum-timeline.tsx` -- "use client":

Props:
```typescript
interface CurriculumTimelineProps {
  documents: Array<{
    subject: string;
    gradeLevel: string;
    units: Array<{ title: string; weekRange: [number, number] }>;
  }>;
  opportunities?: Array<{
    weekRange: [number, number];
    subjects: string[];
  }>;
  totalWeeks?: number; // default 36
  onOverlapClick?: (opportunityIndex: number) => void;
}
```

SVG Gantt chart:
- ViewBox calculated from totalWeeks and number of subjects
- X-axis: week numbers 1-36 (or totalWeeks), with tick marks every 4 weeks and labels
- Y-axis: one row per subject (labeled on left)
- Each unit: a rounded rect colored by subject
  - Subject colors: cycle through brand colors (teal, coral, indigo, amber, purple)
  - Unit title as text inside the bar (truncated if too long)
  - Hover: show full unit title + week range in a tooltip
- Overlapping periods (from opportunities): teal translucent overlay rect with pulsing animation
  - Click overlay: calls onOverlapClick
- Responsive: wrap in a horizontally scrollable container on mobile
- Framer Motion: bars animate in from left with stagger

**Step 2: Commit**

```bash
git add src/components/analyze/curriculum-timeline.tsx
git commit -m "feat: add SVG Gantt-style curriculum timeline with overlap highlighting"
```

---

## Task 8: Opportunity Card Component

**Files:**
- Create: `src/components/analyze/opportunity-card.tsx`

**Step 1: Create opportunity card**

`src/components/analyze/opportunity-card.tsx` -- "use client":

Props:
```typescript
interface OpportunityCardProps {
  subjects: string[];
  unitConnections?: Array<{ subject: string; topics: string[] }>;
  weekRange: [number, number];
  suggestedDQ: string;
  description: string;
  feasibility: "easy" | "moderate" | "ambitious";
  pitch?: string;
  goldStandardElements?: number[];
  onBuildThis: () => void;
  id?: string; // for scroll-to
}
```

Card layout:
- Subject badges at top (using brand colors)
- Timing: "Weeks {start}-{end}" badge
- Driving question: font-display font-bold, prominent
- Description: text-sm
- Unit connections: for each subject, show the overlapping topics as small badges
- Feasibility badge: Easy (green), Moderate (amber), Ambitious (coral)
- Pitch: italics, text-neutral-600 (if provided)
- Gold Standard mini indicators (if provided): small dots showing which elements are covered
- "Build this project" button (primary) -> navigates to Builder with pre-filled data
- Card has `id` attribute for scroll-to from timeline clicks
- ScrollReveal entrance animation

**Step 2: Commit**

```bash
git add src/components/analyze/opportunity-card.tsx
git commit -m "feat: add opportunity card component with feasibility badges and Build This button"
```

---

## Task 9: Results Page

**Files:**
- Create: `src/app/analyze/results/page.tsx`
- Create: `src/components/analyze/results-view.tsx`

**Step 1: Create results view component**

`src/components/analyze/results-view.tsx` -- "use client":

Props:
```typescript
interface ResultsViewProps {
  documents: Array<{ subject: string; gradeLevel: string; units: any[] }>;
  opportunities: any[];
  analysisType: "individual" | "cross-curricular";
  isStreaming: boolean;
}
```

Layout:
- Summary bar: "Found {N} PBL opportunities across {subjects}" or "Found {N} opportunities in {subject}"
- CurriculumTimeline at top (full width, with opportunities overlay)
- Below: OpportunityCards in a list, separated by generous spacing
- Timeline overlap clicks scroll to the corresponding card (using element IDs)
- While streaming: show skeleton cards with pulse animation
- Empty state: "No opportunities found" with suggestion to try different documents

**Step 2: Create results page**

`src/app/analyze/results/page.tsx` -- "use client":

- Auth gate
- Read analysis data from URL search params or React state (passed from analyze page)
- Alternatively: store the documents + analysis request in session storage from the analyze page, read it here
- Call the appropriate analysis API (individual or cross-curricular) and stream results
- Render ResultsView with the streamed data
- Back link to /analyze

For passing data between pages without a full state management library:
- Option A: Use `sessionStorage` to pass the documents array from /analyze to /analyze/results
- Option B: Store in Firestore and pass an ID via URL param
- Use Option A for simplicity (no extra Firestore writes for temporary state)

**Step 3: Commit**

```bash
git add src/app/analyze/results/ src/components/analyze/results-view.tsx
git commit -m "feat: add Analyze results page with timeline and opportunity cards"
```

---

## Task 10: "Build This" Integration

**Files:**
- Modify: `src/components/analyze/opportunity-card.tsx`

**Step 1: Wire "Build this" button**

When clicked, navigate to `/build/new` with query params pre-filled from the opportunity:
```typescript
const router = useRouter();

function handleBuildThis() {
  const params = new URLSearchParams({
    topic: description,
    subjects: subjects.join(","),
    gradeLevel: documents[0]?.gradeLevel || "",
    drivingQuestion: suggestedDQ,
    duration: suggestedDuration || "mini",
    source: "analyze",
  });
  router.push(`/build/new?${params.toString()}`);
}
```

**Step 2: Update Builder to accept analyze params**

Modify `src/app/build/new/page.tsx` to also read `drivingQuestion` and `source` from search params, pre-filling the form and optionally skipping to the DQ step if a DQ is provided.

**Step 3: Commit**

```bash
git add src/components/analyze/opportunity-card.tsx src/app/build/new/page.tsx
git commit -m "feat: wire 'Build this' from Analyze to Builder with pre-filled data"
```

---

## Task 11: Navigation Update

**Files:**
- Modify: `src/components/layout/header.tsx`

**Step 1: Add Analyze to navigation**

Add "Analyze" link to the header nav between "Build" and "About":
```typescript
const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/build", label: "Build" },
  { href: "/analyze", label: "Analyze" },
  { href: "/about", label: "About" },
];
```

Also add to footer links.

**Step 2: Commit**

```bash
git add src/components/layout/header.tsx src/components/layout/footer.tsx
git commit -m "feat: add Analyze to header and footer navigation"
```

---

## Task 12: Final Build + Deploy

**Step 1: Verify build**

Run: `npm run build`
Expected: All routes including `/analyze` and `/analyze/results` compile.

**Step 2: Push and deploy**

```bash
git push
vercel --prod --yes
```

**Step 3: Verify routes**

New routes:
- `/analyze` -- Upload page
- `/analyze/results` -- Results with timeline + cards
- `/api/analyze/parse` -- Document parsing
- `/api/analyze/individual` -- Individual analysis
- `/api/analyze/cross-curricular` -- Cross-curricular analysis

---

## Summary

| Task | Description | Complexity |
|------|-------------|-----------|
| 1 | Install pdf-parse + mammoth | Low |
| 2 | Document parsing utilities | Low |
| 3 | Gemini prompts (parse, individual, cross-curricular) | Medium |
| 4 | API routes (3 new) | Medium |
| 5 | Firebase Storage integration | Low |
| 6 | Upload page UI (drag-drop, document list, actions) | High |
| 7 | SVG curriculum timeline | High |
| 8 | Opportunity card component | Medium |
| 9 | Results page (timeline + cards) | Medium |
| 10 | "Build this" integration with Builder | Low |
| 11 | Navigation update | Low |
| 12 | Final build + deploy | Low |
