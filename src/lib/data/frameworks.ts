export interface GoldStandardElement {
  number: number;
  name: string;
  description: string;
  tooltip: string;
  icon: string;
}

export const goldStandard: GoldStandardElement[] = [
  { number: 1, name: "Challenging Problem or Question", description: "A meaningful question or problem that drives the entire project", tooltip: "A meaningful question or problem that drives the entire project", icon: "ChallengingProblemIcon" },
  { number: 2, name: "Sustained Inquiry", description: "Students investigate over time, not in a single research session", tooltip: "Students investigate over time, not in a single research session", icon: "SustainedInquiryIcon" },
  { number: 3, name: "Authenticity", description: "Real-world context plus a real audience plus real impact", tooltip: "Real-world context plus a real audience plus real impact", icon: "AuthenticityIcon" },
  { number: 4, name: "Student Voice & Choice", description: "Structured choice within the teacher's framework, not unlimited freedom", tooltip: "Structured choice within the teacher's framework, not unlimited freedom", icon: "StudentVoiceIcon" },
  { number: 5, name: "Reflection", description: "Students think about what they're learning throughout, not just at the end", tooltip: "Students think about what they're learning throughout, not just at the end", icon: "ReflectionIcon" },
  { number: 6, name: "Critique & Revision", description: "Give and receive feedback, then actually use it", tooltip: "Give and receive feedback, then actually use it", icon: "CritiqueRevisionIcon" },
  { number: 7, name: "Public Product", description: "Shared beyond the classroom; the most distinguishing feature of PBL", tooltip: "Shared beyond the classroom; the most distinguishing feature of PBL", icon: "PublicProductIcon" }
];

export const dqFormula = {
  template: "How can we, as [ROLE], [ACTION] a [PRODUCT] for [AUDIENCE] to [PURPOSE]?",
  components: [
    { key: "role", label: "Role", description: "Student identity in the project", example: "community planners" },
    { key: "action", label: "Action", description: "What they do", example: "design" },
    { key: "product", label: "Product", description: "What they make", example: "a park" },
    { key: "audience", label: "Audience", description: "Who sees it", example: "panel of parents" },
    { key: "purpose", label: "Purpose", description: "Why it matters", example: "within a $500 budget" }
  ]
};

export interface ComparisonPair {
  doingAProject: string;
  pbl: string;
}

export const dessertVsMainCourse: ComparisonPair[] = [
  { doingAProject: "Comes AFTER the unit", pbl: "IS the unit" },
  { doingAProject: "Teacher assigns topic", pbl: "Students have voice and choice" },
  { doingAProject: "Often a poster", pbl: "Public product" },
  { doingAProject: "Assessed at the end", pbl: "Ongoing assessment" },
  { doingAProject: "Content learned first", pbl: "Content learned as needed" },
  { doingAProject: "Audience: the teacher", pbl: "Audience: beyond the classroom" }
];

export const designThinkingMindsets = [
  "Human-centered",
  "Mindful of process",
  "Culture of prototyping",
  "Bias toward action",
  "Show don't tell",
  "Radical collaboration",
  "Fail forward",
  "Creative confidence",
  "Growth mindset",
  "Beginner's mindset"
];
