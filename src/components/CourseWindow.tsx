import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Button from "./Button";
import Tabs from "./Tabs";
import Modal from "./Modal";
import ContributeForm from "./ContributeForm";
import { UpvoteBadge } from "./Badge";
import { categoryThemes } from "../lib/categoryTheme";
import { useArchive } from "../context/ArchiveContext";
import { isResourceUpvoted, toggleResourceUpvote } from "../services/resourceService";
import type { Resource, ResourceType } from "../data/types";
import { RESOURCE_TYPE_LABEL } from "../data/types";

export default function CourseWindow({
  courseId,
  initialCategory = "all",
  onClose,
}: {
  courseId: string | null;
  initialCategory?: "all" | ResourceType;
  onClose: () => void;
}) {
  const { courses, resources } = useArchive();
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courses, courseId]);
  const [active, setActive] = useState<"all" | ResourceType>("all");
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    if (courseId) {
      if (initialCategory !== "all" && course?.allowedCategories.includes(initialCategory)) {
        setActive(initialCategory);
      } else {
        setActive("all");
      }
    }
  }, [courseId, initialCategory, course]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (courseId) {
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [courseId, onClose]);

  const courseResources = useMemo(() => {
    if (!course) return [];
    return resources.filter((r) => r.courseId === course.id);
  }, [course, resources]);

  const filtered = active === "all" ? courseResources : courseResources.filter((r) => r.type === active);

  if (!course) return null;

  const counts: Record<ResourceType, number> = {
    notes: courseResources.filter((r) => r.type === "notes").length,
    "past-paper": courseResources.filter((r) => r.type === "past-paper").length,
    extras: courseResources.filter((r) => r.type === "extras").length,
    reference: courseResources.filter((r) => r.type === "reference").length + (course.referenceBook ? 1 : 0),
  };

  const tabs = [
    { id: "all", label: "Everything", count: courseResources.length + (course.referenceBook ? 1 : 0) },
    ...course.allowedCategories.map((cat) => ({
      id: cat,
      label: RESOURCE_TYPE_LABEL[cat],
      count: counts[cat] || 0,
    })),
  ];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:px-4 animate-backdrop-in">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="relative flex max-h-[92vh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-[20px] border border-line-strong bg-white shadow-lift sm:rounded-[20px] animate-modal-in">
        {/* Header - BMSIT COURSE HUB removed, no department/semester */}
        <div className="shrink-0 border-b border-line bg-paper/60 px-6 pb-5 pt-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate font-serif text-[24px] font-bold leading-tight text-ink sm:text-[28px]">
                {course.title}
              </h2>
              <p className="mt-1 text-[13.5px] font-medium text-ink-soft">
                {courseResources.length + (course.referenceBook ? 1 : 0)} {(courseResources.length + (course.referenceBook ? 1 : 0)) === 1 ? "resource" : "resources"} available
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink-soft font-bold transition-all duration-150 hover:bg-ink hover:text-white hover:scale-105 active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="shrink-0 px-6 sm:px-8 bg-white border-b border-line">
          <Tabs items={tabs} active={active} onChange={(v) => setActive(v as typeof active)} />
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-8 space-y-4">
          {/* Reference Book Card Preview */}
          {course.referenceBook && (active === "all" || active === "reference") && (
            <div className="overflow-hidden rounded-[16px] border border-[#48334d]/25 bg-[#f3edf5] p-5 shadow-sm transition-all hover:border-[#48334d]/40">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="shrink-0 mx-auto sm:mx-0">
                  <img
                    src={course.referenceBook.coverImage}
                    alt={course.referenceBook.title}
                    className="h-44 w-32 rounded-lg object-cover shadow-md border border-black/10"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#48334d] px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Prescribed Syllabus Reference
                  </div>
                  <h3 className="mt-2 font-serif text-[18px] font-bold text-ink sm:text-[20px]">
                    {course.referenceBook.title}
                  </h3>
                  <p className="mt-1 text-[13.5px] font-semibold text-ink-soft">
                    {course.referenceBook.author}
                  </p>
                  <p className="mt-0.5 text-[12px] font-medium text-ink-faint">
                    {course.referenceBook.publisher} · {course.referenceBook.edition}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={course.referenceBook.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#48334d] px-4 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-[#37253b]"
                    >
                      <span>View and Buy</span>
                      <span className="text-[14px]">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resources List */}
          <div className="divide-y divide-line/60">
            {filtered
              .filter((r) => r.type !== "reference" || !course.referenceBook)
              .map((r) => (
                <CourseWindowResourceRow key={r.id} resource={r} showCategoryBadge={active === "all"} />
              ))}
          </div>

          {filtered.length === 0 && (!course.referenceBook || active !== "reference") && (
            <p className="py-16 text-center font-medium text-ink-faint">
              No {active !== "all" ? RESOURCE_TYPE_LABEL[active] : "resources"} found for this course.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-line bg-paper/40 px-6 py-4 sm:px-8">
          <Link
            to={`/course/${course.id}`}
            className="text-[13.5px] font-bold text-oxblood hover:text-oxblood-dark"
          >
            Open Full Course Page →
          </Link>
          <Button size="sm" onClick={() => setUploadOpen(true)}>
            Upload to this course
          </Button>
        </div>
      </div>

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Share Course Resources">
        <p className="-mt-2 mb-4 text-[13.5px] font-medium text-ink-soft">
          Help fellow students by uploading past papers, lecture notes, or extras for {course.title}.
        </p>
        <ContributeForm defaultCourse={course.title} onSubmitted={() => setUploadOpen(false)} />
      </Modal>
    </div>,
    document.body
  );
}

function CourseWindowResourceRow({
  resource,
  showCategoryBadge = false,
}: {
  resource: Resource;
  showCategoryBadge?: boolean;
}) {
  const theme = categoryThemes[resource.type];
  const [copied, setCopied] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const { updateResourceUpvotes } = useArchive();
  const upvoted = isResourceUpvoted(resource.id);

  function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/resource/${resource.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleToggleUpvote(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isVoting) return;
    setIsVoting(true);
    try {
      const res = await toggleResourceUpvote(resource.id, resource.upvotes);
      updateResourceUpvotes(resource.id, res.newCount);
    } catch (err) {
      console.error("Failed to toggle upvote:", err);
    } finally {
      setIsVoting(false);
    }
  }

  return (
    <div className="flex items-center gap-3 py-3 transition-colors hover:bg-paper/80 rounded-lg px-2 sm:gap-4 sm:px-3">
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: theme.dot }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[15px] font-bold text-ink">{resource.title}</p>
          {showCategoryBadge && (
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
              style={{ backgroundColor: `${theme.dot}18`, color: theme.dot }}
            >
              {RESOURCE_TYPE_LABEL[resource.type]}
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] font-medium text-ink-faint">
          <span>by {resource.contributor}</span>
          <span aria-hidden>·</span>
          <UpvoteBadge
            count={resource.upvotes}
            active={upvoted}
            onClick={handleToggleUpvote}
          />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={handleShare}
          className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-bold text-ink-soft transition-all duration-150 hover:border-ink hover:text-ink active:scale-95"
        >
          {copied ? "Copied" : "Share"}
        </button>
        <Link
          to={`/resource/${resource.id}`}
          className="rounded-full bg-ink px-3.5 py-1.5 text-[12.5px] font-bold text-white transition-all duration-150 hover:bg-oxblood hover:-translate-y-0.5 active:scale-95"
        >
          Open
        </Link>
      </div>
    </div>
  );
}
