export interface Phase {
  number: 1 | 2 | 3 | 4 | 5;
  name: string;
  shortName: string;
  description: string;
  designThinkingConnection: string;
  color: string; // hex
  colorLight: string; // hex
  tailwindColor: string; // e.g. "phase-entry"
  tailwindColorLight: string;
  icon: string; // icon component name reference
  motif: string; // SVG background pattern description
  backgroundPattern: string; // CSS for subtle bg pattern
  energy: string; // mood/feel description
  whatTeachersDo: string[];
  whatStudentsDo: string[];
}

export const phases: Phase[] = [
  {
    number: 1,
    name: "Entry Event",
    shortName: "Entry",
    description: "Sparks curiosity, hooks students, and elicits questions",
    designThinkingConnection: "—",
    color: "#E8634A",
    colorLight: "#FFF0EC",
    tailwindColor: "phase-entry",
    tailwindColorLight: "phase-entry-light",
    icon: "EntryEventIcon",
    motif: "Spark / flame / lightning bolt shapes",
    backgroundPattern: "radial-gradient(circle at 50% 50%, rgba(232,99,74,0.03) 0%, transparent 70%)",
    energy: "Warm, exciting, anticipatory",
    whatTeachersDo: [
      "Present the entry event to spark curiosity",
      "Facilitate initial questions and wonderings",
      "Capture student reactions and initial thinking"
    ],
    whatStudentsDo: [
      "Experience the hook or provocation",
      "Generate questions and wonderings",
      "Begin connecting to prior knowledge"
    ]
  },
  {
    number: 2,
    name: "Investigation",
    shortName: "Investigate",
    description: "Research, skill-building, and empathy work",
    designThinkingConnection: "Empathize",
    color: "#4338CA",
    colorLight: "#EEF2FF",
    tailwindColor: "phase-investigation",
    tailwindColorLight: "phase-investigation-light",
    icon: "InvestigationIcon",
    motif: "Magnifying glass / branching paths / constellation dots",
    backgroundPattern: "radial-gradient(circle, rgba(67,56,202,0.03) 1px, transparent 1px)",
    energy: "Curious, methodical, deep",
    whatTeachersDo: [
      "Guide research and skill-building activities",
      "Connect students with resources and experts",
      "Facilitate empathy exercises"
    ],
    whatStudentsDo: [
      "Research the topic from multiple perspectives",
      "Build needed skills and knowledge",
      "Develop empathy for stakeholders"
    ]
  },
  {
    number: 3,
    name: "Problem / Design Challenge",
    shortName: "Define",
    description: "Define the driving question students will answer",
    designThinkingConnection: "Define",
    color: "#0D7377",
    colorLight: "#E0F2F1",
    tailwindColor: "phase-problem",
    tailwindColorLight: "phase-problem-light",
    icon: "ProblemIcon",
    motif: "Converging lines / crosshair / target",
    backgroundPattern: "linear-gradient(135deg, rgba(13,115,119,0.02) 25%, transparent 25%)",
    energy: "Clear, sharp, decisive",
    whatTeachersDo: [
      "Help students refine the driving question",
      "Facilitate Need to Know list creation",
      "Connect students with expert resources"
    ],
    whatStudentsDo: [
      "Refine and own the driving question",
      "Create a Need to Know list",
      "Identify what they need to learn to solve the problem"
    ]
  },
  {
    number: 4,
    name: "Create",
    shortName: "Create",
    description: "The iterative design thinking process: ideate, prototype, test, refine",
    designThinkingConnection: "Ideate, Prototype, Test",
    color: "#D97706",
    colorLight: "#FFFBEB",
    tailwindColor: "phase-create",
    tailwindColorLight: "phase-create-light",
    icon: "CreateIcon",
    motif: "Rough/hand-drawn shapes / pencil marks / prototype wireframes",
    backgroundPattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(217,119,6,0.02) 10px, rgba(217,119,6,0.02) 11px)",
    energy: "Rough, iterative, hands-on",
    whatTeachersDo: [
      "Provide materials and tools for prototyping",
      "Facilitate critique and revision cycles",
      "Coach students through iteration"
    ],
    whatStudentsDo: [
      "Ideate and brainstorm solutions",
      "Build prototypes and test them",
      "Give and receive peer feedback, then revise"
    ]
  },
  {
    number: 5,
    name: "Share",
    shortName: "Share",
    description: "Present to an authentic audience and reflect on learning",
    designThinkingConnection: "—",
    color: "#7C3AED",
    colorLight: "#F5F3FF",
    tailwindColor: "phase-share",
    tailwindColorLight: "phase-share-light",
    icon: "ShareIcon",
    motif: "Expanding circles / ripples / megaphone",
    backgroundPattern: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.02) 0%, rgba(124,58,237,0.01) 30%, transparent 60%)",
    energy: "Open, celebratory, proud",
    whatTeachersDo: [
      "Arrange authentic audience for presentations",
      "Facilitate reflection on learning process",
      "Celebrate student work and growth"
    ],
    whatStudentsDo: [
      "Present their work to an authentic audience",
      "Reflect on what they learned",
      "Celebrate and share their accomplishments"
    ]
  }
];
