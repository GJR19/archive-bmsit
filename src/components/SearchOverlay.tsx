import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { departments } from "../data/mockData";
import { useArchive } from "../context/ArchiveContext";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { courses, resources } = useArchive();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 30);
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return courses
      .filter((c) => c.title.toLowerCase().includes(needle))
      .slice(0, 8);
  }, [q, courses]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-3 pt-4 sm:px-4 sm:pt-[12vh] backdrop-blur-sm animate-backdrop-in">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-[8px] border border-line-strong bg-card shadow-lift animate-modal-in">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink-faint">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search course name"
            className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10.5px] text-ink-faint">
            Esc
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {q.trim() === "" && (
            <p className="px-3 py-6 text-center text-sm text-ink-faint">
              Start typing to search 34 courses across branches.
            </p>
          )}
          {q.trim() !== "" && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-ink-faint">
              No courses matched “{q}”.
            </p>
          )}
          {results.map((c) => {
            const dept = departments.find((d) => d.id === c.departmentId);
            const fileCount = resources.filter((r) => r.courseId === c.id).length + (c.referenceBook ? 1 : 0);
            return (
              <button
                key={c.id}
                onClick={() => {
                  navigate(`/course/${c.id}`);
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-[5px] px-3 py-2.5 text-left transition-all duration-150 hover:bg-ink/[0.04] active:scale-[0.99]"
              >
                <span>
                  <span className="block text-[14.5px] text-ink">{c.title}</span>
                  <span className="block text-[12.5px] text-ink-faint">{dept?.short}</span>
                </span>
                <span className="call-number">{fileCount} {fileCount === 1 ? "file" : "files"}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
