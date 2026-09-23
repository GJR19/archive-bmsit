import type { ResourceType } from "../data/types";

export interface CategoryTheme {
  id: ResourceType;
  label: string;
  blurb: string;
  accent: string; // tailwind color token root, e.g. "notes"
  gradient: string; // tailwind classes for a colorful card background
  badgeClasses: string;
  iconBg: string;
  dot: string; // hex color for small indicator dots
}

export const categoryThemes: Record<ResourceType, CategoryTheme> = {
  notes: {
    id: "notes",
    label: "Notes",
    blurb: "Lecture decks & handwritten",
    accent: "notes",
    gradient: "from-[#56793b] via-[#4d6f34] to-[#43602d]",
    badgeClasses: "bg-notes-tint text-notes-dark border-notes/30 font-semibold",
    iconBg: "bg-notes/20 text-notes-dark",
    dot: "#56793b",
  },
  "past-paper": {
    id: "past-paper",
    label: "Past Papers",
    blurb: "Endsems, midsems, quizzes",
    accent: "papers",
    gradient: "from-[#f28a26] via-[#ea7d16] to-[#d97316]",
    badgeClasses: "bg-papers-tint text-papers-dark border-papers/30 font-semibold",
    iconBg: "bg-papers/20 text-papers-dark",
    dot: "#f28a26",
  },
  extras: {
    id: "extras",
    label: "Extras",
    blurb: "Labs, tutorials, projects",
    accent: "extras",
    gradient: "from-[#b6766a] via-[#a86559] to-[#99594e]",
    badgeClasses: "bg-extras-tint text-extras-dark border-extras/30 font-semibold",
    iconBg: "bg-extras/20 text-extras-dark",
    dot: "#b6766a",
  },
  reference: {
    id: "reference",
    label: "References",
    blurb: "Textbooks & reading",
    accent: "refs",
    gradient: "from-[#48334d] via-[#3f2b43] to-[#37253b]",
    badgeClasses: "bg-refs-tint text-refs-dark border-refs/30 font-semibold",
    iconBg: "bg-refs/20 text-refs-dark",
    dot: "#48334d",
  },
};

export const categoryOrder: ResourceType[] = ["notes", "past-paper", "extras", "reference"];
