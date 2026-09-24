import type { Course } from "../data/types";

// Common abbreviations and aliases mapping for all archive courses
export const COURSE_ALIASES: Record<string, string[]> = {
  c01: ["ada", "daa", "algorithms", "algo", "algorithm", "design of algorithms", "analysis of algorithms"],
  c02: ["ai", "aiml", "artificial intelligence", "intel", "machine learning", "ml"],
  c03: ["bio", "biology", "biology for it", "bit", "bio4it"],
  c04: ["caed", "cad", "drawing", "caed drawing", "computer aided engineering drawing", "eg", "engineering graphics"],
  c05: ["cv", "computer vision", "vision", "image processing", "dip"],
  c06: ["dcn", "cn", "computer networks", "networking", "network", "networks", "data communication", "data communication and networking"],
  c07: ["dsa", "ds", "data structures", "data structure", "data structure and applications", "structures"],
  c08: ["dbms", "db", "database", "databases", "sql", "rdbms", "database management", "database management systems"],
  c09: ["dl", "deep learning", "neural networks", "neural", "ann"],
  c10: ["ddco", "dd", "co", "coa", "digital design", "computer organization", "verilog", "logic design"],
  c11: ["eng", "english", "professional writing", "communicative english", "technical english"],
  c12: ["idt", "dt", "design thinking", "innovation and design thinking", "innovation"],
  c13: ["cip", "coi", "constitution", "constitution of india", "indian constitution", "law", "civics"],
  c14: ["ele", "bee", "eee", "electrical", "basic electrical", "introduction to electrical engineering", "electrical engineering"],
  c15: ["eln", "bec", "ece", "electronics", "basic electronics", "introduction to electronics engineering", "electronics engineering"],
  c16: ["py", "python", "python programming", "ipp", "intro to python"],
  c17: ["iot", "internet of things", "intro to iot", "introduction to iot", "embedded"],
  c18: ["kan", "kannada", "balake kannada", "samskruthika kannada"],
  c19: ["chem", "chemistry", "materials chemistry", "applied chemistry", "mat chem"],
  c20: ["m1", "math1", "math 1", "maths 1", "mathematics 1", "maths", "math", "calculus", "linear algebra"],
  c21: ["m2", "math2", "math 2", "maths 2", "mathematics 2", "maths", "math", "advanced calculus", "differential equations"],
  c22: ["m3", "math3", "math 3", "maths 3", "mathematics 3", "maths", "math", "probability", "statistics", "stats"],
  c23: ["mongo", "mongodb", "nosql", "db", "database"],
  c24: ["nlp", "natural language processing", "text processing"],
  c25: ["oops", "oop", "c++", "cpp", "object oriented", "object oriented programming", "oops with c++"],
  c26: ["os", "operating systems", "operating system", "unix", "linux"],
  c27: ["ot", "or", "optimization", "optimization techniques", "operations research"],
  c28: ["popc", "c", "c programming", "pop", "pcd", "principles of programming using c", "c prog"],
  c29: ["git", "github", "vcs", "version control", "project management with git"],
  c30: ["qc", "quantum", "quantum computing", "photonics", "quantum computing and photonics"],
  c31: ["rm", "ipr", "rmipr", "research methodology", "intellectual property", "research methodology and ipr", "patent"],
  c32: ["sfh", "health", "scientific foundations", "scientific foundations of health"],
  c33: ["se", "sepm", "spm", "software engineering", "software engineering and project management", "software"],
  c34: ["uhv", "values", "human values", "universal human values", "ethics"],
};

export function getCourseAcronyms(title: string): string[] {
  const clean = title.replace(/[^a-zA-Z0-9\s]/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const stopWords = new Set(["and", "of", "to", "for", "with", "in", "using", "the"]);

  const allLetters = words.map((w) => w[0].toLowerCase()).join("");
  const contentWords = words.filter((w) => !stopWords.has(w.toLowerCase()));
  const contentLetters = contentWords.map((w) => w[0].toLowerCase()).join("");

  const result: string[] = [];
  if (allLetters.length >= 2) result.push(allLetters);
  if (contentLetters.length >= 2 && contentLetters !== allLetters) result.push(contentLetters);
  return result;
}

export interface CourseMatchResult {
  matched: boolean;
  score: number;
}

export function matchCourse(course: Course, query: string): CourseMatchResult {
  const q = query.trim().toLowerCase();
  if (!q) return { matched: true, score: 0 };

  const titleLower = course.title.toLowerCase();
  const titleWords = titleLower.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const aliases = COURSE_ALIASES[course.id] || [];
  const acronyms = getCourseAcronyms(course.title);

  // 1. Exact abbreviation, acronym, or title match (highest priority)
  if (titleLower === q || aliases.includes(q) || acronyms.includes(q)) {
    return { matched: true, score: 100 };
  }

  // 2. Starts with query
  if (titleLower.startsWith(q) || aliases.some((a) => a.startsWith(q))) {
    return { matched: true, score: 80 };
  }

  // 3. Any word in title starts with query
  if (titleWords.some((w) => w.startsWith(q))) {
    return { matched: true, score: 70 };
  }

  // 4. For short queries (<= 2 chars), only allow word-boundary matches
  if (q.length <= 2) {
    const aliasWords = aliases.flatMap((a) => a.split(/\s+/));
    if (aliasWords.some((w) => w.startsWith(q))) {
      return { matched: true, score: 65 };
    }
    return { matched: false, score: 0 };
  }

  // 5. Substring in title or any alias
  if (
    titleLower.includes(q) ||
    aliases.some((a) => a.includes(q)) ||
    acronyms.some((a) => a.includes(q))
  ) {
    return { matched: true, score: 60 };
  }

  // 6. Multi-token partial match (e.g. "oper sys", "data struct")
  const queryTokens = q.split(/\s+/).filter(Boolean);
  if (queryTokens.length > 1) {
    const allTokensMatch = queryTokens.every(
      (tok) =>
        titleWords.some((w) => w.startsWith(tok) || w.includes(tok)) ||
        aliases.some((a) => a.includes(tok)) ||
        acronyms.some((ac) => ac.includes(tok))
    );
    if (allTokensMatch) {
      return { matched: true, score: 50 };
    }
  }

  return { matched: false, score: 0 };
}

export function filterAndRankCourses(courses: Course[], query: string): Course[] {
  const q = query.trim();
  if (!q) return courses;

  return courses
    .map((c) => ({ course: c, ...matchCourse(c, q) }))
    .filter((res) => res.matched)
    .sort((a, b) => b.score - a.score)
    .map((res) => res.course);
}
