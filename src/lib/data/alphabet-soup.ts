export interface LearningApproach {
  name: string;
  duration: string;
  whoDrives: string;
  hasProduct: string;
  keyDistinction: string;
}

export const alphabetSoup: LearningApproach[] = [
  { name: "Project-Based Learning", duration: "Weeks-months", whoDrives: "Teacher + Student", hasProduct: "Yes, public", keyDistinction: "Learning THROUGH the project" },
  { name: "Problem-Based Learning", duration: "Days-weeks", whoDrives: "Teacher", hasProduct: "Not always", keyDistinction: "Specific problem, case studies, medical school origin" },
  { name: "Design Thinking", duration: "Varies", whoDrives: "Either", hasProduct: "Prototype", keyDistinction: "Creative PROCESS, not method. Empathize, Define, Ideate, Prototype, Test" },
  { name: "Challenge-Based Learning", duration: "Weeks-months", whoDrives: "Student", hasProduct: "Yes, action", keyDistinction: "Students IDENTIFY the challenge. Apple initiative." },
  { name: "Genius Hour", duration: "Ongoing", whoDrives: "Student", hasProduct: "Student picks", keyDistinction: "Dedicated time for personal interests. Google's 20% time." },
  { name: "Inquiry-Based Learning", duration: "Varies", whoDrives: "Either", hasProduct: "Not always", keyDistinction: "Ask questions and investigate. PBL is a form of inquiry." },
  { name: "STEM/STEAM", duration: "Varies", whoDrives: "N/A (lens)", hasProduct: "Depends", keyDistinction: "Content LENS, not teaching method" },
  { name: "Service Learning", duration: "Varies", whoDrives: "Either", hasProduct: "Community action", keyDistinction: "Community-focused, civic engagement" },
  { name: "Maker Education", duration: "Varies", whoDrives: "Student", hasProduct: "Physical product", keyDistinction: "Hands-on fabrication, tinkering" },
  { name: "Interdisciplinary", duration: "Varies", whoDrives: "Teacher", hasProduct: "Varies", keyDistinction: "Connecting 2+ subjects around a theme" },
  { name: "Transdisciplinary", duration: "Varies", whoDrives: "Student", hasProduct: "Varies", keyDistinction: "Breaking down subject boundaries entirely" },
  { name: "Performance-Based Assessment", duration: "Varies", whoDrives: "Teacher", hasProduct: "Demonstration", keyDistinction: "Assessing through doing, not testing" }
];
