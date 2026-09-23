import type { ReferenceBook } from "../data/types";

export default function ShelfBook({
  book,
  isSelected,
  onSelect,
}: {
  book: ReferenceBook;
  isSelected?: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex cursor-pointer flex-col items-center transition-all duration-250 ease-out will-change-transform ${
        isSelected ? "-translate-y-4 scale-105" : "hover:-translate-y-3.5 hover:scale-[1.02] active:scale-[0.98]"
      }`}
    >
      {/* Textbook Cover Presentation */}
      <div className="relative overflow-hidden rounded-[6px] shadow-lift border border-black/15 transition-all duration-250 ease-out group-hover:shadow-2xl">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-[210px] w-[140px] sm:h-[240px] sm:w-[160px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.01]"
          loading="lazy"
        />

        {/* 3D spine depth effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-black/10" />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#48334d]/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 ease-out group-hover:opacity-100 p-3 text-center">
          <div>
            <p className="font-serif text-[12px] font-bold text-white line-clamp-3">
              {book.title}
            </p>
            <span className="mt-2 inline-block rounded bg-white px-2.5 py-1 text-[10.5px] font-bold uppercase text-[#48334d] shadow-sm transition-transform duration-150 group-hover:scale-105 active:scale-95">
              Inspect
            </span>
          </div>
        </div>
      </div>

      {/* Title snippet below */}
      <div className="mt-2 w-[140px] sm:w-[160px] text-center">
        <p className="truncate font-serif text-[12px] font-bold text-ink">
          {book.title}
        </p>
        <p className="truncate text-[10.5px] font-semibold text-ink-faint">
          {book.courseName}
        </p>
      </div>
    </div>
  );
}
