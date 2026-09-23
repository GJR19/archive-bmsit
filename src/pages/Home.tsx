import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CourseCard from "../components/CourseCard";
import CourseWindow from "../components/CourseWindow";
import ShelfPreview from "../components/ShelfPreview";
import PillFilter from "../components/PillFilter";
import ContributeCTA from "../components/ContributeCTA";
import { useArchive } from "../context/ArchiveContext";
import { categoryOrder, categoryThemes } from "../lib/categoryTheme";
import type { ResourceType } from "../data/types";

export default function Home() {
  const { courses, resources } = useArchive();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | ResourceType>("all");
  const [openCourseId, setOpenCourseId] = useState<string | null>(null);

  const filteredCourses = useMemo(() => {
    let list = courses;
    if (activeCategory !== "all") {
      list = list.filter((c) => {
        const hasResource = resources.some(
          (r) => r.courseId === c.id && r.type === activeCategory
        );
        const hasRefBook = activeCategory === "reference" && Boolean(c.referenceBook);
        return hasResource || hasRefBook;
      });
    }
    if (query.trim()) {
      const needle = query.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(needle));
    }
    return list;
  }, [courses, resources, query, activeCategory]);

  const pillOptions = [
    { id: "all", label: "Everything", dot: "#1C1B18" },
    ...categoryOrder.map((id) => ({
      id,
      label: categoryThemes[id].label,
      dot: categoryThemes[id].dot,
    })),
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-line px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
        <div className="relative mx-auto flex max-w-content flex-col items-center text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-oxblood/30 bg-oxblood-tint px-3.5 py-1 text-[12px] font-bold text-oxblood-dark">
            BMSIT · Academic Resource Hub
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-[36px] font-bold leading-[1.08] tracking-tightish text-ink sm:text-[50px]">
            Notes, papers and books,
            <br />
            <span className="text-oxblood">all in one place.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[16px] font-medium leading-relaxed text-ink-soft sm:text-[18px]">
            Organized by course, kept up to date by students across every branch. Find exactly what you need in seconds.
          </p>

          {/* Search Box */}
          <div className="mt-9 w-full max-w-2xl">
            <div
              title="Search is limited to course names"
              className="group flex items-center gap-3 rounded-[12px] border border-line-strong bg-white px-5 py-4 shadow-card sm:px-6 sm:py-4.5 transition-all duration-200 focus-within:border-oxblood/60 focus-within:shadow-lift focus-within:ring-2 focus-within:ring-oxblood/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink-soft transition-colors duration-200 group-focus-within:text-oxblood">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search course name (e.g. Operating Systems, Mathematics)"
                className="flex-1 cursor-text bg-transparent text-[16px] font-semibold text-ink placeholder:text-ink-faint focus:outline-none sm:text-[17px]"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs font-bold text-ink-faint hover:text-ink transition-colors duration-150 active:scale-95"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 w-full overflow-x-auto pb-1">
            <PillFilter
              size="lg"
              options={pillOptions}
              active={activeCategory}
              onChange={(v) => setActiveCategory(v as typeof activeCategory)}
            />
          </div>
        </div>
      </section>

      {/* Course Cards Grid - Max 4 columns on desktop, 2 on tablet, 1 on mobile */}
      <section className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-content">
          {activeCategory !== "all" && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[14.5px] font-bold text-ink">
                Showing courses with {categoryThemes[activeCategory].label} ({filteredCourses.length})
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="text-[13.5px] font-bold text-oxblood hover:text-oxblood-dark transition-colors duration-150"
              >
                Clear filter ✕
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((c, idx) => (
              <div
                key={c.id}
                className="animate-card-enter"
                style={{ animationDelay: `${Math.min(idx * 30, 300)}ms` }}
              >
                <CourseCard
                  course={c}
                  activeCategory={activeCategory}
                  onOpen={(id) => setOpenCourseId(id)}
                />
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[17px] font-semibold text-ink-soft">
                No courses match your search or category filter.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 inline-block text-[14px] font-bold text-oxblood hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bookshelf preview */}
      <section className="border-t border-line bg-card px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-content">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-refs">
                PRESCRIBED SYLLABUS
              </span>
              <h2 className="font-serif text-[28px] font-bold text-ink sm:text-[32px]">
                The reference shelf
              </h2>
              <p className="mt-1 text-[15px] font-medium text-ink-soft">
                The textbooks your courses actually lean on.
              </p>
            </div>
            <Link
              to="/bookshelf"
              className="hidden shrink-0 text-[14.5px] font-bold text-oxblood hover:text-oxblood-dark sm:block"
            >
              All shelves →
            </Link>
          </div>
          <div className="mt-8">
            <ShelfPreview />
          </div>
          <Link
            to="/bookshelf"
            className="mt-6 block text-center text-[14.5px] font-bold text-oxblood hover:text-oxblood-dark sm:hidden"
          >
            All shelves →
          </Link>
        </div>
      </section>

      {/* Contribution CTA Box right before footer */}
      <ContributeCTA
        title="Got past papers or notes sitting in your drive?"
        subtitle="Share your course files and help build the resource hub every BMSIT student wishes they had."
      />

      <CourseWindow
        courseId={openCourseId}
        initialCategory={activeCategory}
        onClose={() => setOpenCourseId(null)}
      />
    </Layout>
  );
}
