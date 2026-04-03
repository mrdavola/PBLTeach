export interface ExploreModule {
  id: string;
  slug: string;
  title: string;
  duration: string; // e.g. "5-7 min"
  learningGoal: string;
  description: string;
  phaseForMVP: 1 | 2; // 1 = MVP, 2 = Phase 2
}

export const exploreModules: ExploreModule[] = [
  {
    id: "what-is-pbl",
    slug: "what-is-pbl",
    title: "What IS PBL?",
    duration: "5-7 min",
    learningGoal: "Distinguish PBL from 'doing a project'",
    description: "The dessert vs. main course distinction, and why it matters for student learning.",
    phaseForMVP: 1
  },
  {
    id: "learning-narrative",
    slug: "learning-narrative",
    title: "The Learning Narrative",
    duration: "7-10 min",
    learningGoal: "Understand the 5-phase structure and map an existing unit to it",
    description: "Every great project has a structure. Learn the 5 phases that make PBL work.",
    phaseForMVP: 1
  },
  {
    id: "start-small",
    slug: "start-small",
    title: "Start Small",
    duration: "3-5 min",
    learningGoal: "Feel permission to try PBL at any scale",
    description: "You don't need to redesign your entire year. Start with a single class period.",
    phaseForMVP: 1
  },
  {
    id: "gold-standard",
    slug: "gold-standard",
    title: "The Gold Standard",
    duration: "7-10 min",
    learningGoal: "Know the 7 elements and understand you can start with just 2",
    description: "The 7 essential design elements that define high-quality PBL.",
    phaseForMVP: 2
  },
  {
    id: "design-thinking",
    slug: "design-thinking",
    title: "Design Thinking 101",
    duration: "7-10 min",
    learningGoal: "Understand the DT process and how it powers the Create phase",
    description: "The mindsets and process behind human-centered design.",
    phaseForMVP: 2
  },
  {
    id: "alphabet-soup",
    slug: "alphabet-soup",
    title: "The Alphabet Soup Explained",
    duration: "5-8 min",
    learningGoal: "Name the key approaches and understand how they relate",
    description: "PBL, STEM, design thinking, inquiry-based... what's the difference?",
    phaseForMVP: 2
  },
  {
    id: "pbl-and-ai",
    slug: "pbl-and-ai",
    title: "PBL + AI",
    duration: "5-7 min",
    learningGoal: "Understand how AI supports but doesn't replace PBL design",
    description: "How AI tools can help teachers design and facilitate PBL.",
    phaseForMVP: 2
  }
];
