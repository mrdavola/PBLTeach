import type { Project } from "./project";

export interface CommunityProject extends Omit<Project, "status"> {
  status: "published";
  published: {
    publishedAt: Date;
    authorName: string;
    authorSchool?: string;
    featured: boolean;
    hidden: boolean;
    ratingSum: number;
    ratingCount: number;
    adaptationCount: number;
  };
}

export interface Rating {
  score: number; // 1-5
  createdAt: Date;
}
