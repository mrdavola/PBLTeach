export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: "teacher" | "admin" | "coordinator";
  gradeLevel?: string[];
  subjects?: string[];
  school?: string;
  district?: string;
  state?: string;
  pblExperience: "new" | "tried" | "experienced";
  createdAt: Date;
  lastActiveAt: Date;
  projectCount: number;
  completedModules: string[];
  preferences: {
    defaultDuration: "single-day" | "micro" | "mini" | "full";
    defaultGradeLevel?: string;
    defaultSubject?: string;
    soundEffects?: boolean;
  };
}
