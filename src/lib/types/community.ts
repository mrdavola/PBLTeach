export interface CommunityProject {
  id: string;
  authorId: string;
  authorName: string;
  authorSchool?: string;
  title: string;
  drivingQuestion: string;
  gradeLevel: string;
  subjects: string[];
  duration: "single-day" | "micro" | "mini" | "full";
  description: string;
  tags: string[];
  views: number;
  adaptations: number;
  averageRating: number;
  reviewCount: number;
  featured: boolean;
  publishedAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}
