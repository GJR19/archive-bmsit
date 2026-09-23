import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { referenceBooks } from "../data/mockData";
import type { ReferenceBook } from "../data/types";
import ShelfBook from "./ShelfBook";

export default function ShelfPreview() {
  const [selectedBook, setSelectedBook] = useState<ReferenceBook | null>(null);
  const previewBooks = referenceBooks.slice(0, 6);

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

  return (
    <div className="relative">
      <div className="flex items-end justify-center gap-4 sm:gap-7 overflow-x-auto pb-2 px-2">
        {previewBooks.map((book) => (
          <ShelfBook
            key={book.id}
            book={book}
            isSelected={selectedBook?.id === book.id}
            onSelect={() => setSelectedBook(book)}
          />
        ))}
      </div>

      {/* Wooden Beam */}
      <div className="h-4 w-full rounded-md bg-[#D6CEB5] shadow-md border-t border-[#C7BFA8]" />
      <div className="h-2 w-full bg-[#BFB69D] opacity-80" />

      {/* Modal Popup */}
      {selectedBook &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4 animate-backdrop-in">
            <div
              className="absolute inset-0"
              onClick={() => setSelectedBook(null)}
              aria-hidden
            />
            <div className="relative w-full max-w-lg rounded-2xl border border-line-strong bg-white p-6 shadow-lift z-10 animate-modal-in">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink font-bold hover:bg-ink hover:text-white"
            >
              ✕
            </button>
            <div className="flex gap-5 items-start">
              <img
                src={selectedBook.coverImage}
                alt={selectedBook.title}
                className="w-28 h-40 rounded object-cover shadow-md border border-black/10 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#48334d]">
                  {selectedBook.courseName}
                </span>
                <h3 className="font-serif text-[17px] font-bold text-ink mt-1">
                  {selectedBook.title}
                </h3>
                <p className="text-[13px] font-medium text-ink-soft mt-1">
                  {selectedBook.author}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={selectedBook.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-[#48334d] px-3.5 py-1.5 text-[12.5px] font-bold text-white hover:bg-[#37253b]"
                  >
                    View and Buy ↗
                  </a>
                  <Link
                    to="/bookshelf"
                    className="text-[12.5px] font-bold text-oxblood hover:underline"
                  >
                    All Books →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
