/**
 * Seed the community collection with 14 exemplar PBL projects.
 * Run: npx tsx scripts/seed-exemplars.ts
 *
 * Requires GEMINI_API_KEY and Firebase env vars in .env.local
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- Firebase setup ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// --- Gemini setup ---
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
if (!apiKey) {
  console.error("GEMINI_API_KEY not found in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    responseMimeType: "application/json",
  },
});

// --- System prompt ---
const SYSTEM_PROMPT = `You are an expert K-12 project-based learning coach with deep expertise in:
- PBLWorks Gold Standard PBL (7 Essential Design Elements)
- Design Thinking (Stanford d.school / IDEO framework)
- The Learning Narrative framework (5 phases: Entry Event, Investigation, Problem/Design Challenge, Create, Share)
- The Driving Question Formula: "How can we, as [ROLE], [ACTION] a [PRODUCT] for [AUDIENCE] to [PURPOSE]?"
- Cross-curricular connections and standards alignment

Output rules:
- Always respond in valid JSON matching the requested schema
- Keep descriptions concise: 1-3 sentences max per item
- Use active, teacher-friendly language (not academic jargon)
- Suggest specific, actionable ideas (not vague platitudes)
- Include grade-appropriate examples
- Never use emojis in any output`;

// --- Exemplar definitions ---
const EXEMPLARS = [
  { title: "School Community / Active Citizens", gradeLevel: "1", subjects: ["Social Studies"], duration: "mini" as const, topic: "How our school community works and how we can be active citizens who make it better", comfortLevel: "new" as const },
  { title: "Kindness Campaign", gradeLevel: "1", subjects: ["ELA", "SEL"], duration: "micro" as const, topic: "Creating a kindness campaign for our school using persuasive writing and empathy", comfortLevel: "new" as const },
  { title: "2nd Grade Street", gradeLevel: "2", subjects: ["Math", "Social Studies"], duration: "mini" as const, topic: "Designing and running small businesses like a mini community (inspired by Starbucks Day)", comfortLevel: "tried" as const },
  { title: "Create a Country", gradeLevel: "3", subjects: ["Social Studies", "Science"], duration: "full" as const, topic: "Designing a sustainable country with its own geography, government, economy, and environmental plan", comfortLevel: "tried" as const },
  { title: "Budget Park", gradeLevel: "3", subjects: ["Math"], duration: "mini" as const, topic: "Designing a community park within a budget using area, perimeter, and money math", comfortLevel: "new" as const },
  { title: "Museum of New York", gradeLevel: "4", subjects: ["Social Studies", "ELA"], duration: "full" as const, topic: "Creating museum exhibits about New York State history and regions for future 4th graders", comfortLevel: "tried" as const },
  { title: "EPCOT World's Fair", gradeLevel: "5", subjects: ["Social Studies", "Science"], duration: "full" as const, topic: "Building a miniature World's Fair with research-based country pavilions", comfortLevel: "experienced" as const },
  { title: "Eco-Report", gradeLevel: "5", subjects: ["Science"], duration: "mini" as const, topic: "Investigating a local environmental issue and presenting findings to the community", comfortLevel: "tried" as const },
  { title: "Genius Hour", gradeLevel: "6", subjects: ["Cross-curricular"], duration: "mini" as const, topic: "Student-driven inquiry projects where each student explores a passion topic and teaches others", comfortLevel: "tried" as const },
  { title: "Community Podcast", gradeLevel: "7", subjects: ["ELA"], duration: "mini" as const, topic: "Producing a podcast series that tells stories from the local community", comfortLevel: "tried" as const },
  { title: "PSA Campaign", gradeLevel: "8", subjects: ["Health"], duration: "mini" as const, topic: "Researching a teen health issue and creating a public service announcement campaign", comfortLevel: "tried" as const },
  { title: "UN Sustainable Development Goals", gradeLevel: "10", subjects: ["Social Studies"], duration: "full" as const, topic: "Investigating a UN Sustainable Development Goal and proposing local action plans", comfortLevel: "experienced" as const },
  { title: "Policy Proposal", gradeLevel: "10", subjects: ["Government"], duration: "mini" as const, topic: "Researching a local policy issue and presenting a formal proposal to community leaders", comfortLevel: "experienced" as const },
  { title: "Startup Pitch", gradeLevel: "11", subjects: ["Business", "Math", "ELA"], duration: "full" as const, topic: "Developing a startup business idea with market research, financial projections, and a pitch deck", comfortLevel: "experienced" as const },
];

// --- Helpers ---
function parseJSON(text: string) {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

async function generateWithRetry(prompt: string, retries = 2): Promise<any> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\n" + prompt }] }],
      });
      const text = result.response.text();
      return parseJSON(text);
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(`  Retry ${attempt + 1}...`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

function buildDQPrompt(input: typeof EXEMPLARS[number]): string {
  return `Generate 3 driving questions for a project-based learning unit.

Context:
- Grade Level: ${input.gradeLevel}
- Subject(s): ${input.subjects.join(", ")}
- Topic: ${input.topic}
- Duration: ${input.duration}

Use the Driving Question Formula:
"How can we, as [ROLE], [ACTION] a [PRODUCT] for [AUDIENCE] to [PURPOSE]?"

Each driving question should:
1. Be authentic and meaningful to students at this grade level
2. Allow for multiple valid approaches and solutions
3. Connect to real-world issues or audiences
4. Be achievable within the given duration

Provide 3 options with varying difficulty levels (beginner-friendly, balanced, ambitious).

Respond with valid JSON matching this exact schema:
{
  "drivingQuestions": [
    {
      "question": "The full driving question as a string",
      "formula": {
        "role": "The role students take on",
        "action": "The verb/action they perform",
        "product": "What they create",
        "audience": "Who they create it for",
        "purpose": "Why it matters"
      },
      "whyItWorks": "1-2 sentence explanation",
      "authenticityRating": "low" | "medium" | "high",
      "difficultyLevel": "beginner-friendly" | "balanced" | "ambitious"
    }
  ]
}`;
}

function buildNarrativePrompt(input: typeof EXEMPLARS[number], drivingQuestion: string): string {
  return `Generate a complete Learning Narrative for a project-based learning unit.

Context:
- Grade Level: ${input.gradeLevel}
- Subject(s): ${input.subjects.join(", ")}
- Topic: ${input.topic}
- Duration: ${input.duration}
- Teacher Comfort Level: ${input.comfortLevel}
- Driving Question: ${drivingQuestion}

Generate all 5 phases of the Learning Narrative, plus assessment and cross-curricular connections.

Respond with valid JSON matching this exact schema:
{
  "phases": {
    "entryEvent": {
      "ideas": [{ "title": "string", "description": "string", "materials": ["string"], "timeNeeded": "string", "type": "video" | "guest" | "activity" | "field-trip" | "simulation" | "artifact" | "other" }]
    },
    "investigation": {
      "activities": [{ "title": "string", "description": "string", "duration": "string", "phase": 2, "type": "research" | "skill-building" | "collaboration" | "reflection" | "creation" }],
      "skills": ["string"],
      "empathyExercises": ["string"],
      "resources": [{ "title": "string", "type": "article" | "video" | "tool" | "template" | "book", "description": "string" }]
    },
    "problemChallenge": { "refinedDQ": "string", "needToKnow": ["string"], "expertSuggestions": ["string"] },
    "create": { "prototypingIdeas": ["string"], "critiqueProtocol": "string", "iterationPlan": "string", "materials": ["string"] },
    "share": { "audienceSuggestions": ["string"], "presentationFormats": ["string"], "reflectionPrompts": ["string"] }
  },
  "assessment": {
    "formative": [{ "title": "string", "description": "string", "phase": 1, "type": "formative", "method": "rubric" | "self-assessment" | "peer-assessment" | "portfolio" | "presentation" | "journal" | "conference" }],
    "summative": [{ "title": "string", "description": "string", "phase": 5, "type": "summative", "method": "rubric" | "self-assessment" | "peer-assessment" | "portfolio" | "presentation" | "journal" | "conference" }],
    "rubricType": "product" | "process" | "both"
  },
  "crossCurricular": {
    "connections": [{ "subject": "string", "topic": "string", "connectionDescription": "string" }],
    "standardsAligned": [{ "code": "string", "description": "string", "subject": "string", "gradeLevel": "string" }]
  },
  "goldStandard": { "elementsIncluded": [1, 2, 3, 4, 5, 6, 7], "score": 7 }
}

The 7 Gold Standard PBL Essential Design Elements are:
1. Challenging Problem or Question
2. Sustained Inquiry
3. Authenticity
4. Student Voice & Choice
5. Reflection
6. Critique & Revision
7. Public Product

Ensure all suggestions are grade-appropriate for Grade ${input.gradeLevel} and achievable within a ${input.duration} timeframe.`;
}

// --- Main ---
async function main() {
  console.log("Seeding 14 exemplar projects...\n");

  for (let i = 0; i < EXEMPLARS.length; i++) {
    const exemplar = EXEMPLARS[i];
    console.log(`[${i + 1}/14] ${exemplar.title} (Grade ${exemplar.gradeLevel})...`);

    // Step 1: Generate driving questions
    console.log("  Generating driving questions...");
    const dqResult = await generateWithRetry(buildDQPrompt(exemplar));
    const dq = dqResult.drivingQuestions[0]; // Pick the first (beginner-friendly)
    console.log(`  DQ: "${dq.question.slice(0, 80)}..."`);

    // Step 2: Generate learning narrative
    console.log("  Generating learning narrative...");
    const narrative = await generateWithRetry(buildNarrativePrompt(exemplar, dq.question));
    console.log("  Narrative generated.");

    // Step 3: Build project document
    const projectId = `exemplar-${exemplar.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`;

    const project = {
      id: projectId,
      userId: "pblteach-team",
      status: "published",
      source: "builder",
      title: exemplar.title,
      gradeLevel: exemplar.gradeLevel,
      subjects: exemplar.subjects,
      topic: exemplar.topic,
      duration: exemplar.duration,
      comfortLevel: exemplar.comfortLevel,
      drivingQuestion: {
        selected: dq.question,
        options: dqResult.drivingQuestions.map((d: any) => d.question),
        formula: dq.formula,
      },
      phases: narrative.phases,
      assessment: narrative.assessment,
      crossCurricular: narrative.crossCurricular,
      goldStandard: narrative.goldStandard,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      published: {
        publishedAt: Timestamp.now(),
        authorName: "PBLTeach Team",
        authorSchool: null,
        featured: i < 4, // First 4 are Staff Picks
        hidden: false,
        ratingSum: 0,
        ratingCount: 0,
        adaptationCount: 0,
      },
    };

    // Step 4: Write to Firestore
    await setDoc(doc(db, "community", projectId), project);
    console.log(`  Published to community/${projectId} ${i < 4 ? "(featured)" : ""}\n`);

    // Small delay to avoid rate limiting
    if (i < EXEMPLARS.length - 1) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log("Done! 14 exemplar projects seeded.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
