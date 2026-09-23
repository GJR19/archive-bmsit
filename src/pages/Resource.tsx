import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useArchive } from "../context/ArchiveContext";
import { getCourse, getResource } from "../data/mockData";
import {
  createReferenceBookFromResource,
  isResourceUpvoted,
  toggleResourceUpvote,
  normalizeFileType,
} from "../services/resourceService";
import { RESOURCE_TYPE_LABEL } from "../data/types";
import type { ResourceType } from "../data/types";

export default function Resource() {
  const { id } = useParams();
  const { resources, courses, updateResourceUpvotes } = useArchive();
  const resource = resources.find((r) => r.id === id) || getResource(id ?? "");
  const [upvoted, setUpvoted] = useState(() => (id ? isResourceUpvoted(id) : false));
  const [isVoting, setIsVoting] = useState(false);
  const [reported, setReported] = useState(false);
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (resource?.id) {
      setUpvoted(isResourceUpvoted(resource.id));
    }
  }, [resource?.id]);

  const handleToggleUpvote = async () => {
    if (isVoting || !resource) return;
    setIsVoting(true);
    try {
      const res = await toggleResourceUpvote(resource.id, resource.upvotes);
      setUpvoted(res.isUpvoted);
      updateResourceUpvotes(resource.id, res.newCount);
    } catch (err) {
      console.error("Failed to toggle upvote:", err);
    } finally {
      setIsVoting(false);
    }
  };

  if (!resource) {
    return (
      <Layout>
        <div className="mx-auto max-w-content px-5 py-24 text-center sm:px-8">
          <p className="font-semibold text-ink-soft">Resource not found.</p>
          <Link to="/" className="mt-4 inline-block font-bold text-oxblood hover:underline">
            ← Back to Archive
          </Link>
        </div>
      </Layout>
    );
  }

  const course = courses.find((c) => c.id === resource.courseId) || getCourse(resource.courseId);
  const refBook =
    resource.type === "reference"
      ? createReferenceBookFromResource(resource, course?.title || resource.courseId)
      : null;

  const viewerUrl = getViewerUrl(resource.link, resource.fileType);

  const handleFullScreen = () => {
    if (viewerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        viewerContainerRef.current.requestFullscreen().catch(() => {
          // If browser restricts element fullscreen on cross-origin iframe, open in new tab
          if (resource.link) {
            window.open(resource.link, "_blank");
          }
        });
      }
    } else if (resource.link) {
      window.open(resource.link, "_blank");
    }
  };

  return (
    <Layout>
      {/* Breadcrumb Header */}
      <section className="border-b border-line px-5 py-6 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            to={course ? `/course/${course.id}` : "/"}
            className="text-[13.5px] font-bold text-ink-soft hover:text-oxblood transition-colors"
          >
            ← Back to {course ? course.title : "Archive"}
          </Link>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Resource Title */}
          <h1 className="font-serif text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
            {resource.title}
          </h1>

          {/* Badges Bar: Only Resource Type and Views */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
            {/* Type badge with red-brown dot: NOTES, PAST PAPERS, EXTRAS, REFERENCES */}
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f4ebd0] px-3.5 py-1 text-[12px] font-extrabold tracking-wide text-ink shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#8c2d19]"></span>
              <span>{RESOURCE_TYPE_LABEL[resource.type as ResourceType]?.toUpperCase() || "RESOURCE"}</span>
            </span>

            {/* Views counter pill */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4ebd0] px-3.5 py-1 text-[12px] font-extrabold tracking-wide text-ink shadow-xs">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-soft">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>{((resource.upvotes || 0) * 3 + 8)} views</span>
            </span>
          </div>

          {resource.type === "reference" && refBook ? (
            /* Prescribed Reference Book View with Cover */
            <div className="mt-7 overflow-hidden rounded-[16px] border border-[#48334d]/30 bg-[#f3edf5] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <img
                  src={refBook.coverImage}
                  alt={refBook.title}
                  className="h-56 w-40 rounded-lg object-cover shadow-lg border border-black/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="inline-block rounded-full bg-[#48334d] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    PRESCRIBED REFERENCE TEXTBOOK
                  </span>
                  <h3 className="mt-2.5 font-serif text-[22px] font-bold text-ink">
                    {refBook.title}
                  </h3>
                  <p className="mt-1 text-[14px] font-semibold text-ink-soft">
                    {refBook.author}
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium text-ink-faint">
                    {refBook.edition ? `${refBook.edition} · ` : ""}
                    {refBook.publisher} ({refBook.year})
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={refBook.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#48334d] px-5 py-2.5 text-[13.5px] font-bold text-white shadow hover:bg-[#37253b] transition-colors"
                    >
                      <span>View and Buy</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* In-Site Document Reader / PDF Viewer (matches reference screenshot) */
            <div
              ref={viewerContainerRef}
              className="relative mt-7 w-full overflow-hidden rounded-[16px] border border-[#2b2b2b] bg-[#1e1e1e] shadow-xl"
            >
              {viewerUrl ? (
                <iframe
                  ref={iframeRef}
                  src={viewerUrl}
                  title={resource.title}
                  className="w-full h-[460px] sm:h-[680px] md:h-[820px] border-none bg-[#2e2e2e]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                />
              ) : (
                <div className="flex h-[360px] sm:h-[450px] flex-col items-center justify-center gap-4 bg-[#242424] px-6 text-center text-white">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-serif text-[18px] sm:text-[20px] font-bold text-white">Document Preview</p>
                    <p className="mt-1 max-w-md text-[13px] sm:text-[14px] text-white/70">
                      No live file URL attached to this item. Contributed notes uploaded through Contribute or Admin display here automatically.
                    </p>
                  </div>
                  <Link
                    to="/contribute"
                    className="mt-2 inline-flex items-center gap-2 rounded-lg bg-oxblood px-5 py-2 text-sm font-bold text-white hover:bg-oxblood/90 transition-colors"
                  >
                    Upload Document
                  </Link>
                </div>
              )}

              {/* Floating 'Open full screen' button at bottom-right corner (exact match to screenshot) */}
              {viewerUrl && (
                <button
                  type="button"
                  onClick={handleFullScreen}
                  className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#1e1e1e]/90 px-3 py-1.5 sm:px-4 sm:py-2 text-[11.5px] sm:text-[12.5px] font-bold text-white shadow-xl backdrop-blur-md hover:bg-black transition-all hover:scale-105 active:scale-95 border border-white/10"
                  title="Open full screen"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[15px] sm:h-[15px]">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  <span>Open full screen</span>
                </button>
              )}
            </div>
          )}

          {/* Actions & File Details Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-t border-line pt-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Upvote button */}
              <button
                type="button"
                onClick={handleToggleUpvote}
                disabled={isVoting}
                title={upvoted ? "Click to remove your upvote" : "Click to upvote"}
                className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full border px-3.5 py-1.5 sm:px-4 sm:py-2 text-[12.5px] sm:text-[13px] font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                  upvoted
                    ? "border-oxblood bg-oxblood text-white shadow-sm animate-upvote-pop"
                    : "border-line bg-white text-ink-soft hover:border-ink hover:text-ink hover:shadow-xs"
                } ${isVoting ? "opacity-75 cursor-wait" : ""}`}
              >
                <span className={`inline-block transition-transform duration-200 ${upvoted ? "scale-110" : ""}`}>▲</span>
                <span>{upvoted ? "Upvoted" : "Upvote"} · {resource.upvotes}</span>
              </button>

              {/* Direct Download Button */}
              {resource.link && (
                <a
                  href={getDownloadUrl(resource.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-[12.5px] sm:text-[13px] font-bold text-ink-soft hover:border-ink hover:text-ink hover:shadow-xs transition-all duration-150"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download {normalizeFileType(resource.fileType) || "Document"}</span>
                </a>
              )}
            </div>

            <button
              onClick={() => setReported(true)}
              disabled={reported}
              className="text-[12.5px] font-semibold text-ink-faint hover:text-ink transition-colors duration-150 disabled:cursor-default"
            >
              {reported ? "Reported — thank you" : "Report resource"}
            </button>
          </div>

          {/* File Information Card */}
          <div className="mt-8 rounded-[14px] border border-line-strong bg-card p-6 shadow-xs">
            <h3 className="font-serif text-[18px] font-bold text-ink">File information</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[13.5px]">
              <div className="rounded-lg bg-paper/60 p-3 border border-line/60">
                <span className="block text-xs font-medium text-ink-faint uppercase tracking-wider">Course</span>
                <span className="mt-1 block font-bold text-ink">{course?.title || resource.courseId}</span>
              </div>
              <div className="rounded-lg bg-paper/60 p-3 border border-line/60">
                <span className="block text-xs font-medium text-ink-faint uppercase tracking-wider">Contributor</span>
                <span className="mt-1 block font-bold text-ink">{resource.contributor || "Anonymous"}</span>
              </div>
              <div className="rounded-lg bg-paper/60 p-3 border border-line/60">
                <span className="block text-xs font-medium text-ink-faint uppercase tracking-wider">Resource Type</span>
                <span className="mt-1 block font-bold text-ink">{RESOURCE_TYPE_LABEL[resource.type as ResourceType] || "Notes"}</span>
              </div>
              <div className="rounded-lg bg-paper/60 p-3 border border-line/60">
                <span className="block text-xs font-medium text-ink-faint uppercase tracking-wider">File Details</span>
                <span className="mt-1 block font-bold text-ink">{normalizeFileType(resource.fileType) || "PDF"} · {resource.fileSizeMb || 0} MB</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function getViewerUrl(link?: string, fileType?: string): string {
  if (!link) return "";
  const trimmed = link.trim();
  const lower = trimmed.toLowerCase();

  // Google Drive view/edit links -> convert to preview
  if (trimmed.includes("drive.google.com")) {
    return trimmed.replace(/\/view(\?.*)?$/, "/preview").replace(/\/edit(\?.*)?$/, "/preview");
  }

  // Direct PDF
  if (lower.endsWith(".pdf") || lower.includes(".pdf?") || fileType?.toLowerCase() === "pdf") {
    return trimmed.includes("#") ? trimmed : `${trimmed}#toolbar=1&navpanes=1`;
  }

  // Office Docs (DOCX, PPTX, XLSX) via Google Docs Viewer
  if (
    lower.endsWith(".doc") ||
    lower.endsWith(".docx") ||
    lower.endsWith(".ppt") ||
    lower.endsWith(".pptx") ||
    lower.endsWith(".xls") ||
    lower.endsWith(".xlsx")
  ) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(trimmed)}&embedded=true`;
  }

  return trimmed.includes("#") ? trimmed : `${trimmed}#toolbar=1&navpanes=1`;
}

function getDownloadUrl(link?: string): string {
  if (!link) return "#";
  const trimmed = link.trim();
  // If it's a Google Drive link, convert to direct export download stream
  if (trimmed.includes("drive.google.com/file/d/")) {
    const match = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return trimmed;
}
