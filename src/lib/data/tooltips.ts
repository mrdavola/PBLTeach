export interface TooltipDefinition {
  term: string;
  slug: string; // kebab-case for lookup
  definition: string;
  category: "gold-standard" | "phase" | "general";
}

export const tooltipDefinitions: TooltipDefinition[] = [
  // Gold Standard elements
  { term: "Challenging Problem/Question", slug: "challenging-problem", definition: "A meaningful question or problem that drives the entire project", category: "gold-standard" },
  { term: "Sustained Inquiry", slug: "sustained-inquiry", definition: "Students investigate over time, not in a single research session", category: "gold-standard" },
  { term: "Authenticity", slug: "authenticity", definition: "Real-world context plus a real audience plus real impact", category: "gold-standard" },
  { term: "Student Voice & Choice", slug: "student-voice-choice", definition: "Structured choice within the teacher's framework, not unlimited freedom", category: "gold-standard" },
  { term: "Reflection", slug: "reflection", definition: "Students think about what they're learning throughout, not just at the end", category: "gold-standard" },
  { term: "Critique & Revision", slug: "critique-revision", definition: "Give and receive feedback, then actually use it", category: "gold-standard" },
  { term: "Public Product", slug: "public-product", definition: "Shared beyond the classroom; the most distinguishing feature of PBL", category: "gold-standard" },

  // Learning Narrative phases
  { term: "Entry Event", slug: "entry-event", definition: "A hook that sparks curiosity and generates student questions", category: "phase" },
  { term: "Investigation", slug: "investigation", definition: "Research, skill-building, and empathy work", category: "phase" },
  { term: "Problem/Design Challenge", slug: "problem-design-challenge", definition: "Defining the driving question students will answer", category: "phase" },
  { term: "Create", slug: "create", definition: "The iterative design thinking process: ideate, prototype, test, refine", category: "phase" },
  { term: "Share", slug: "share", definition: "Present to an authentic audience and reflect on learning", category: "phase" },

  // General terms
  { term: "Driving Question", slug: "driving-question", definition: "The central question that guides the entire PBL unit", category: "general" },
  { term: "DQ Formula", slug: "dq-formula", definition: "How can we, as [role], [action] a [product] for [audience] to [purpose]?", category: "general" },
  { term: "Micro-PBL", slug: "micro-pbl", definition: "A 3-5 day project; a great way to start", category: "general" },
  { term: "Need to Know", slug: "need-to-know", definition: "Questions students generate about what they need to learn to answer the DQ", category: "general" }
];

// Helper to look up a tooltip by slug
export function getTooltip(slug: string): TooltipDefinition | undefined {
  return tooltipDefinitions.find(t => t.slug === slug);
}
