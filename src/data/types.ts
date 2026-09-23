export type ResourceType = "notes" | "past-paper" | "extras" | "reference";

export const RESOURCE_TYPE_LABEL: Record<ResourceType, string> = {
  notes: "Notes",
  "past-paper": "Past Papers",
  extras: "Extras",
  reference: "References",
};

export interface Department {
  id: string;
  name: string;
  short: string;
  courseCount: number;
}

export interface ReferenceBook {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  author: string;
  edition?: string;
  publisher?: string;
  year?: string;
  citation: string;
  amazonUrl: string;
  doiUrl?: string;
  isbn?: string;
  coverImage: string;
  spineColor?: string;
}

export interface Course {
  id: string;
  title: string;
  departmentId: string;
  semester: number;
  allowedCategories: ResourceType[];
  resourceCount: number;
  referenceBook?: ReferenceBook | null;
}

export interface Resource {
  id: string;
  title: string;
  courseId: string;
  type: ResourceType;
  academicYear: string;
  semester: number;
  fileType: "PDF" | "DOCX" | "PPTX" | "ZIP" | "Link";
  fileSizeMb: number;
  contributor: string;
  usn?: string;
  uploadDate: string;
  upvotes: number;
  link?: string;
}

export interface Contributor {
  id: string;
  name: string;
  usn?: string;
  branch: string;
  contributions: number;
  points: number;
  pastPapers: number;
  notes: number;
  extras: number;
  reference: number;
  upvotes: number;
}

export interface Release {
  version: string;
  date: string;
  tag: "Major" | "Minor" | "Patch";
  features: string[];
  improvements: string[];
  fixes: string[];
}
