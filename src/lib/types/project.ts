export interface Project {
  id: string;
  userId: string;
  status: "draft" | "complete" | "published";
  createdAt: Date;
  updatedAt: Date;

  // Overview
  title: string;
  gradeLevel: string;
  subjects: string[];
  topic: string;
  duration: "single-day" | "micro" | "mini" | "full";
  durationWeeks?: number;
  comfortLevel: "new" | "tried" | "experienced";

  // Driving Question
  drivingQuestion: {
    selected: string;
    options: string[];
    formula: {
      role: string;
      action: string;
      product: string;
      audience: string;
      purpose: string;
    };
  };

  // Learning Narrative Phases
  phases: {
    entryEvent: {
      ideas: EntryEventIdea[];
      selectedIndex?: number;
      customNotes?: string;
    };
    investigation: {
      activities: Activity[];
      skills: string[];
      empathyExercises: string[];
      resources: Resource[];
    };
    problemChallenge: {
      refinedDQ: string;
      needToKnow: string[];
      expertSuggestions: string[];
    };
    create: {
      prototypingIdeas: string[];
      critiqueProtocol: string;
      iterationPlan: string;
      materials: string[];
    };
    share: {
      audienceSuggestions: string[];
      presentationFormats: string[];
      reflectionPrompts: string[];
    };
  };

  // Assessment
  assessment: {
    formative: AssessmentItem[];
    summative: AssessmentItem[];
    rubricType: "product" | "process" | "both";
  };

  // Cross-curricular
  crossCurricular: {
    connections: SubjectConnection[];
    standardsAligned: Standard[];
  };

  // Gold Standard alignment
  goldStandard: {
    elementsIncluded: number[];
    score: number;
  };

  // Guide materials
  guide?: {
    calendarGenerated: boolean;
    handoutsGenerated: boolean;
    rubricsGenerated: boolean;
    generatedAt?: Date;
  };
}

export interface EntryEventIdea {
  title: string;
  description: string;
  materials: string[];
  timeNeeded: string;
  type: "video" | "guest" | "activity" | "field-trip" | "simulation" | "artifact" | "other";
}

export interface Activity {
  title: string;
  description: string;
  duration: string;
  phase: 1 | 2 | 3 | 4 | 5;
  type: "research" | "skill-building" | "collaboration" | "reflection" | "creation";
}

export interface Resource {
  title: string;
  url?: string;
  type: "article" | "video" | "tool" | "template" | "book";
  description: string;
}

export interface SubjectConnection {
  subject: string;
  topic: string;
  connectionDescription: string;
  suggestedDQ?: string;
}

export interface AssessmentItem {
  title: string;
  description: string;
  phase: 1 | 2 | 3 | 4 | 5;
  type: "formative" | "summative";
  method: "rubric" | "self-assessment" | "peer-assessment" | "portfolio" | "presentation" | "journal" | "conference";
}

export interface Standard {
  code: string;
  description: string;
  subject: string;
  gradeLevel: string;
}

// Quick Create result (simplified version of Project)
export interface QuickCreateResult {
  drivingQuestion: string;
  formula: {
    role: string;
    action: string;
    product: string;
    audience: string;
    purpose: string;
  };
  phaseOverview: {
    entryEvent: string;
    investigation: string;
    problemChallenge: string;
    create: string;
    share: string;
  };
  startSmallSuggestion: string;
  suggestedDuration: "single-day" | "micro" | "mini" | "full";
}

// Builder input form data
export interface BuilderInput {
  gradeLevel: string;
  subjects: string[];
  topic: string;
  duration: "single-day" | "micro" | "mini" | "full";
  comfortLevel: "new" | "tried" | "experienced";
  standards?: string;
  additionalNotes?: string;
}

// DQ generation response
export interface DQGenerationResponse {
  drivingQuestions: Array<{
    question: string;
    formula: {
      role: string;
      action: string;
      product: string;
      audience: string;
      purpose: string;
    };
    whyItWorks: string;
    authenticityRating: "low" | "medium" | "high";
    difficultyLevel: "beginner-friendly" | "balanced" | "ambitious";
  }>;
}
