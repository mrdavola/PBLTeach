export interface Exemplar {
  id: string;
  title: string;
  gradeLevel: string;
  subjects: string[];
  drivingQuestion: string;
  duration: "single-day" | "micro" | "mini" | "full";
  description: string;
  goldStandardScore: number;
  tags: string[];
}

export const exemplars: Exemplar[] = [
  {
    id: "kindness-campaign",
    title: "Kindness Campaign",
    gradeLevel: "1",
    subjects: ["ELA", "SEL"],
    drivingQuestion: "How can we, as kindness ambassadors, create a campaign for our school to make everyone feel welcome?",
    duration: "mini",
    description: "First graders design and launch a school-wide kindness campaign with posters, morning announcements, and a kindness wall.",
    goldStandardScore: 5,
    tags: ["elementary", "SEL", "community"]
  },
  {
    id: "budget-park",
    title: "Budget Park",
    gradeLevel: "3",
    subjects: ["Math"],
    drivingQuestion: "How can we, as city planners, design a neighborhood park for our community within a $500 budget?",
    duration: "mini",
    description: "Third graders use math skills to design a park within budget constraints, presenting to a panel of parents and local officials.",
    goldStandardScore: 6,
    tags: ["elementary", "math", "budgeting", "design"]
  },
  {
    id: "eco-report",
    title: "Eco-Report",
    gradeLevel: "5",
    subjects: ["Science"],
    drivingQuestion: "How can we, as environmental journalists, produce a report for our community to understand the health of our local ecosystem?",
    duration: "full",
    description: "Fifth graders investigate local ecosystems, collect data, and produce multimedia reports shared with community environmental groups.",
    goldStandardScore: 7,
    tags: ["elementary", "science", "environment", "journalism"]
  },
  {
    id: "community-podcast",
    title: "Community Podcast",
    gradeLevel: "7",
    subjects: ["ELA"],
    drivingQuestion: "How can we, as podcast producers, create an episode for our community to amplify unheard local voices?",
    duration: "full",
    description: "Seventh graders research, interview, write, record, and edit podcast episodes featuring community members, published on the school website.",
    goldStandardScore: 7,
    tags: ["middle-school", "ELA", "media", "community"]
  },
  {
    id: "psa-campaign",
    title: "PSA Campaign",
    gradeLevel: "8",
    subjects: ["Health"],
    drivingQuestion: "How can we, as health advocates, design a PSA campaign for teens to address a health issue that matters to us?",
    duration: "mini",
    description: "Eighth graders research a health topic, design multi-format PSA campaigns, and present to school administrators and health professionals.",
    goldStandardScore: 6,
    tags: ["middle-school", "health", "advocacy", "media"]
  },
  {
    id: "policy-proposal",
    title: "Policy Proposal",
    gradeLevel: "10",
    subjects: ["Government"],
    drivingQuestion: "How can we, as civic researchers, draft a policy proposal for our local government to address an issue affecting our community?",
    duration: "full",
    description: "Tenth graders research community issues, draft real policy proposals, and present to local government representatives.",
    goldStandardScore: 7,
    tags: ["high-school", "government", "civic", "research"]
  },
  {
    id: "startup-pitch",
    title: "Startup Pitch",
    gradeLevel: "11-12",
    subjects: ["Business", "Math", "ELA"],
    drivingQuestion: "How can we, as entrepreneurs, develop and pitch a startup idea to a panel of local business leaders to solve a real problem?",
    duration: "full",
    description: "High schoolers develop business plans with financial models, build prototypes, and pitch to real business leaders in a Shark Tank format.",
    goldStandardScore: 7,
    tags: ["high-school", "cross-curricular", "business", "entrepreneurship"]
  }
];
