// Enum for course level
export enum CourseLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

// Enum for categories (5-8 categories as requested)
export enum CourseCategory {
  WEB_DEVELOPMENT = "Web Development",
  APP_DEVELOPMENT = "App Development",
  PROJECT_MANAGEMENT = "Project Management",
  DATA_SCIENCE = "Data Science",
  UI_UX_DESIGN = "UI/UX Design",
  MOBILE_DEVELOPMENT = "Mobile Development",
  DEVOPS = "DevOps",
  OTHER = "Other",
}

// Interface for TypeScript
export interface ICourse extends Document {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: "string";
    fullName: "string";
  };
  price: number;
  level: CourseLevel;
  thumbnail: string;
  category: CourseCategory;
  createdAt: Date;
  updatedAt: Date;
}
