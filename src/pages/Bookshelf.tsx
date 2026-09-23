import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";
import ShelfBook from "../components/ShelfBook";
import ContributeCTA from "../components/ContributeCTA";
import { referenceBooks as mockReferenceBooks } from "../data/mockData";
import { useArchive } from "../context/ArchiveContext";
import type { ReferenceBook } from "../data/types";

export default function Bookshelf() {
  const { courses } = useArchive();
  const [selectedBook, setSelectedBook] = useState<ReferenceBook | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedBook(null);
    }
    if (selectedBook) {
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedBook]);

  // Strictly 1 book per course: preserves official reference textbooks and prevents duplicate generated books
  const allBooks = useMemo(() => {
    const list: ReferenceBook[] = [];
    const seenCourseKeys = new Set<string>();

    // 1. Add all official prescribed reference books first (from mockReferenceBooks)
    mockReferenceBooks.forEach((book) => {
      const idKey = (book.courseId || "").trim().toLowerCase();
      const nameKey = (book.courseName || "").trim().toLowerCase();

      // Only 1 book per course
      if ((idKey && seenCourseKeys.has(idKey)) || (nameKey && seenCourseKeys.has(nameKey))) {
        return;
      }

      list.push(book);
      if (idKey) seenCourseKeys.add(idKey);
      if (nameKey) seenCourseKeys.add(nameKey);
    });

    // 2. Only for brand-new courses (e.g. newly created by user) that don't already have an official book
    courses.forEach((c) => {
      if (c.referenceBook) {
        const idKey = (c.id || "").trim().toLowerCase();
        const nameKey = (c.title || "").trim().toLowerCase();

        // If this course already has an official book, never add a duplicate
        if ((idKey && seenCourseKeys.has(idKey)) || (nameKey && seenCourseKeys.has(nameKey))) {
          return;
        }

        list.push(c.referenceBook);
        if (idKey) seenCourseKeys.add(idKey);
        if (nameKey) seenCourseKeys.add(nameKey);
      }
    });

    return list;
  }, [courses]);

  const filtered = useMemo(() => {
    if (!search.trim()) return allBooks;
    const q = search.toLowerCase();
    return allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.courseName.toLowerCase().includes(q)
    );
  }, [allBooks, search]);

  const shelves = useMemo(() => {
    const res: ReferenceBook[][] = [];
    const chunkSize = 7;
    for (let i = 0; i < filtered.length; i += chunkSize) {
      res.push(filtered.slice(i, i + chunkSize));
    }
    return res;
  }, [filtered]);

  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-line bg-card px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-content">
          <span className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-refs">
            DIGITAL LIBRARY · BMSIT SYLLABUS
          </span>
          <h1 className="mt-2 font-serif text-[34px] font-bold text-ink sm:text-[46px]">
            Every textbook, on one shelf.
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] font-medium leading-relaxed text-ink-soft sm:text-[17.5px]">
            The reference books your professors actually cite — scanned, searchable, and organized by the course that needs them.
          </p>

          <div className="mt-6 max-w-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by book title, author, or course..."
              className="w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-[15px] font-semibold text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-refs"
            />
          </div>
        </div>
      </section>

      {/* Realistic Shelves View */}
      <section className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-content space-y-12">
          {shelves.map((shelf, sIdx) => (
            <div key={sIdx} className="relative">
              <div className="flex items-end justify-start sm:justify-center gap-3 sm:gap-6 overflow-x-auto pb-1 px-4 min-h-[280px]">
                {shelf.map((book, bIdx) => (
                  <div
                    key={book.id}
                    className="animate-card-enter"
                    style={{ animationDelay: `${Math.min((sIdx * 3 + bIdx) * 30, 300)}ms` }}
                  >
                    <ShelfBook
                      book={book}
                      isSelected={selectedBook?.id === book.id}
                      onSelect={() => setSelectedBook(book)}
                    />
                  </div>
                ))}
              </div>

              <div className="h-4 w-full rounded-md bg-[#D6CEB5] shadow-md border-t border-[#C7BFA8]" />
              <div className="h-2 w-full bg-[#BFB69D] opacity-80" />
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="py-20 text-center text-ink-faint font-semibold">
              No reference books match your search query.
            </p>
          )}
        </div>
      </section>

      {/* Contribute CTA right before footer */}
      <ContributeCTA
        title="Got past papers or notes sitting in your drive?"
        subtitle="Share your course files and help build the resource hub every BMSIT student wishes they had."
      />

      {/* Selected Book Floating Detail Modal */}
      {selectedBook &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4 animate-backdrop-in">
            <div
              className="absolute inset-0"
              onClick={() => setSelectedBook(null)}
              aria-hidden
            />
            <div className="relative w-full max-w-2xl rounded-2xl border border-line-strong bg-white p-6 sm:p-8 shadow-lift z-10 animate-modal-in">
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink-soft font-bold hover:bg-ink hover:text-white hover:scale-105 active:scale-95 transition-all duration-150"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-40 h-56 rounded-lg object-cover shadow-lg border border-black/10 shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                />

                <div className="flex-1 min-w-0">
                  <span className="inline-block rounded-full bg-[#48334d] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    PRESCRIBED REFERENCE
                  </span>

                  <h3 className="mt-3 font-serif text-[22px] font-bold leading-tight text-ink">
                    {selectedBook.title}
                  </h3>

                  <p className="mt-1.5 text-[14.5px] font-semibold text-ink-soft">
                    {selectedBook.author}
                  </p>

                  <p className="mt-1 text-[13px] font-medium text-ink-faint">
                    {selectedBook.edition ? `${selectedBook.edition} · ` : ""}
                    {selectedBook.publisher} ({selectedBook.year})
                  </p>

                  <div className="mt-3 rounded-lg bg-paper p-3 border border-line">
                    <span className="text-[11.5px] font-bold uppercase text-ink-faint">
                      Related Course
                    </span>
                    <p className="text-[14px] font-bold text-ink">
                      {selectedBook.courseName}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={selectedBook.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#48334d] px-5 py-2.5 text-[13.5px] font-bold text-white shadow hover:bg-[#37253b] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150"
                    >
                      <span>View and Buy</span>
                      <span>↗</span>
                    </a>

                    {!selectedBook.courseId.startsWith("bookshelf-") && (
                      <a
                        href={`/course/${selectedBook.courseId}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-bold text-ink hover:border-ink hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150"
                      >
                        <span>Go to Course Folder →</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </Layout>
  );
}
