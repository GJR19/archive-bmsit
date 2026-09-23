import { useMemo } from "react";
import type { Course, ResourceType } from "../data/types";
import { RESOURCE_TYPE_LABEL } from "../data/types";
import { useArchive } from "../context/ArchiveContext";

export default function CourseCard({
  course,
  activeCategory = "all",
  onOpen,
  className = "",
}: {
  course: Course;
  activeCategory?: "all" | ResourceType;
  onOpen: (courseId: string, category?: ResourceType) => void;
  className?: string;
}) {
  const { resources } = useArchive();
  const isFiltered = activeCategory !== "all";

  // Resources belonging to this course
  const courseResources = useMemo(() => {
    return resources.filter((r) => r.courseId === course.id);
  }, [resources, course.id]);

  // Actual resource categories that currently have files in this folder
  const presentCategories = useMemo(() => {
    const cats = new Set<ResourceType>();
    for (const r of courseResources) {
      if (r.type) cats.add(r.type);
    }
    if (course.referenceBook) {
      cats.add("reference");
    }
    const order: ResourceType[] = ["notes", "past-paper", "extras", "reference"];
    return order.filter((cat) => cats.has(cat));
  }, [courseResources, course.referenceBook]);

  // File count: active category or total live files in this folder
  const count = useMemo(() => {
    if (isFiltered) {
      return courseResources.filter((r) => r.type === activeCategory).length;
    }
    return courseResources.length + (course.referenceBook ? 1 : 0);
  }, [isFiltered, activeCategory, courseResources, course.referenceBook]);

  // Styling based on category filter
  const theme = useMemo(() => {
    if (!isFiltered) {
      // In "Everything", card represents the actual contents of the folder
      const categoriesSummary =
        presentCategories.length > 0
          ? presentCategories.map((cat) => RESOURCE_TYPE_LABEL[cat].toUpperCase()).join(" · ")
          : "EMPTY ARCHIVE";

      return {
        bg: "bg-[#7A2E2A]",
        dash: "bg-[#7A2E2A]",
        subtag: categoriesSummary,
        action: presentCategories.length > 0 ? "VIEW ALL RESOURCES →" : "CONTRIBUTE FIRST FILE →",
      };
    }

    // Specific category styling
    switch (activeCategory) {
      case "past-paper":
        return {
          bg: "bg-[#f28a26]",
          dash: "bg-[#f28a26]",
          subtag: "PAST PAPERS",
          action: "VIEW ALL FILES →",
        };
      case "notes":
        return {
          bg: "bg-[#56793b]",
          dash: "bg-[#56793b]",
          subtag: "LECTURE NOTES",
          action: "VIEW ALL FILES →",
        };
      case "extras":
        return {
          bg: "bg-[#b6766a]",
          dash: "bg-[#b6766a]",
          subtag: "EXTRAS",
          action: "VIEW ALL FILES →",
        };
      case "reference":
        return {
          bg: "bg-[#48334d]",
          dash: "bg-[#48334d]",
          subtag: "REFERENCES",
          action: "OPEN THE BOOK →",
        };
      default:
        return {
          bg: "bg-[#7A2E2A]",
          dash: "bg-[#7A2E2A]",
          subtag: "COURSE ARCHIVE",
          action: "VIEW ALL FILES →",
        };
    }
  }, [isFiltered, activeCategory, presentCategories]);

  return (
    <div
      onClick={() => onOpen(course.id, isFiltered ? activeCategory : undefined)}
      className={`group relative flex cursor-pointer flex-col select-none transition-all duration-250 ease-out hover:-translate-y-1.5 active:scale-[0.985] will-change-transform ${className}`}
    >
      {/* Top Layer: Protruding Document Sheet showing ONLY the Course Name (no Module 1, no year) */}
      <div className="mx-3.5 relative z-0 -mb-2 rounded-t-[14px] border border-black/10 bg-white px-4 pb-4 pt-2.5 shadow-xs transition-transform duration-250 ease-out group-hover:-translate-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className={`h-1.5 w-6 rounded-full ${theme.dash}`} />
        </div>
        <p className="mt-1 truncate font-serif text-[12.5px] font-bold text-ink">
          {course.title}
        </p>
        <div className="mt-1.5 space-y-1">
          <div className="h-[2px] w-full rounded bg-line/60" />
          <div className="h-[2px] w-3/4 rounded bg-line/50" />
        </div>
      </div>

      {/* Main Folder Pocket */}
      <div
        className={`relative z-10 flex min-h-[180px] flex-col justify-between rounded-[22px] p-5 text-white shadow-card transition-shadow duration-250 ease-out group-hover:shadow-lift ${theme.bg}`}
      >
        <div>
          {isFiltered ? (
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-white/90">
              {theme.subtag}
            </span>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5">
              {presentCategories.length > 0 ? (
                presentCategories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded bg-white/20 px-2 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-wider text-white"
                  >
                    {RESOURCE_TYPE_LABEL[cat]}
                  </span>
                ))
              ) : (
                <span className="rounded bg-white/15 px-2 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-wider text-white/70">
                  NO FILES YET
                </span>
              )}
            </div>
          )}
        </div>

        <div className="my-2 flex items-end justify-between gap-3">
          <h3 className="line-clamp-2 font-serif text-[17px] font-bold leading-snug tracking-tight text-white sm:text-[18px]">
            {course.title}
          </h3>

          <div className="shrink-0 text-right">
            <span className="block text-[28px] font-extrabold leading-none text-white sm:text-[32px]">
              {count}
            </span>
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-white/90">
              FILES
            </span>
          </div>
        </div>

        <div className="pt-2.5 border-t border-white/25">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold tracking-wider uppercase text-white">
            <span>{theme.action.replace(" →", "")}</span>
            <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
