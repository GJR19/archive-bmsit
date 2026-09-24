import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Field, TextInput } from "../components/FormField";
import { useArchive } from "../context/ArchiveContext";
import { courses as fallbackCourses } from "../data/mockData";
import { filterAndRankCourses } from "../lib/courseSearch";
import type { Course } from "../data/types";
import { RESOURCE_TYPE_LABEL } from "../data/types";
import {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
  deleteResource,
  deleteCourseFolder,
  createNewCourseFolder,
  getLiveCourses,
  normalizeFileType,
  type PendingResource,
} from "../services/resourceService";

const ADMIN_USERNAME = (import.meta.env.VITE_ADMIN_USERNAME || "").trim();
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD || import.meta.env.VITE_ADMIN_PASSCODE || "").trim();

export default function Admin() {
  const { resources: archiveResources, refreshData } = useArchive();
  const [authed, setAuthed] = useState<boolean>(() => {
    return sessionStorage.getItem("archive_admin_auth") === "true";
  });
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // Tab navigation: pending submissions | live approved resources | course folders
  const [activeTab, setActiveTab] = useState<"pending" | "live" | "courses">("pending");

  const [pending, setPending] = useState<PendingResource[]>([]);
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [loading, setLoading] = useState(false);
  const [selectedCourseMap, setSelectedCourseMap] = useState<Record<string, string>>({});

  // Search filters
  const [liveSearchQuery, setLiveSearchQuery] = useState("");
  const [courseSearchQuery, setCourseSearchQuery] = useState("");

  // Rejection modal
  const [rejectingItem, setRejectingItem] = useState<PendingResource | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Delete modal (for files and course folders)
  const [deletingTarget, setDeletingTarget] = useState<{
    type: "pending" | "resource" | "course";
    id: string;
    title: string;
    fileUrl?: string;
  } | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  // New Course Modal (ONLY asks for Course Name!)
  const [newCourseModalOpen, setNewCourseModalOpen] = useState(false);
  const [targetResourceIdForNewCourse, setTargetResourceIdForNewCourse] = useState<string | null>(null);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [creatingCourse, setCreatingCourse] = useState(false);

  // Success flash message
  const [flashMsg, setFlashMsg] = useState<string | null>(null);

  function triggerFlash(msg: string) {
    setFlashMsg(msg);
    setTimeout(() => setFlashMsg(null), 3500);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const u = userInput.trim().toLowerCase();
    const p = passInput.trim();

    if (ADMIN_USERNAME && ADMIN_PASSWORD && u === ADMIN_USERNAME.toLowerCase() && p === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("archive_admin_auth", "true");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("archive_admin_auth");
    setAuthed(false);
    setUserInput("");
    setPassInput("");
  }

  async function loadData() {
    setLoading(true);
    try {
      const [pData, cData] = await Promise.all([
        getPendingSubmissions().catch(() => []),
        getLiveCourses().catch(() => fallbackCourses),
      ]);
      setPending(pData);
      setCourses(cData);

      // Pre-select suggested course for each pending item
      const map: Record<string, string> = {};
      pData.forEach((item) => {
        map[item.id] = item.course_id || (cData[0]?.id ?? "c01");
      });
      setSelectedCourseMap(map);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) {
      loadData();
    }
  }, [authed]);

  async function handleApprove(item: PendingResource) {
    const chosenCourseId = selectedCourseMap[item.id] || item.course_id || courses[0]?.id;
    const courseObj = courses.find((c) => c.id === chosenCourseId);
    const requestedCourse = getContributorCourseName(item);
    const targetTitle = (courseObj?.title || requestedCourse || chosenCourseId).toUpperCase();

    const res = await approveSubmission(item.id, chosenCourseId);
    if (res.success) {
      setPending((prev) => prev.filter((p) => p.id !== item.id));

      // Immediately add/update the course in `courses` state so it appears in the dropdown options
      // for all remaining files below it in the approval queue!
      const activeCourse: Course = {
        id: chosenCourseId,
        title: targetTitle,
        departmentId: "general",
        semester: item.semester || 1,
        allowedCategories: ["notes", "past-paper", "extras", "reference"],
        resourceCount: (courseObj?.resourceCount || 0) + 1,
        referenceBook: courseObj?.referenceBook || null,
      };

      setCourses((prev) => {
        if (prev.some((c) => c.id === chosenCourseId)) {
          return prev.map((c) =>
            c.id === chosenCourseId
              ? { ...c, title: targetTitle, resourceCount: c.resourceCount + 1 }
              : c
          );
        }
        return [activeCourse, ...prev];
      });

      triggerFlash(`Approved "${item.title}" into ${targetTitle}!`);
      await refreshData();
    } else {
      alert("Error approving submission: " + res.error);
    }
  }

  async function handleRejectSubmit() {
    if (!rejectingItem) return;
    const res = await rejectSubmission(rejectingItem.id, rejectReason);
    if (res.success) {
      setPending((prev) => prev.filter((p) => p.id !== rejectingItem.id));
      setRejectingItem(null);
      setRejectReason("");
      triggerFlash("Submission rejected.");
      refreshData();
    } else {
      alert("Error rejecting submission: " + res.error);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingTarget) return;
    setDeletingLoading(true);

    if (deletingTarget.type === "pending" || deletingTarget.type === "resource") {
      const res = await deleteResource(deletingTarget.id, deletingTarget.fileUrl);
      setDeletingLoading(false);
      if (res.success) {
        if (deletingTarget.type === "pending") {
          setPending((prev) => prev.filter((p) => p.id !== deletingTarget.id));
        }
        triggerFlash(`Permanently deleted "${deletingTarget.title}".`);
        setDeletingTarget(null);
        await refreshData();
        await loadData();
      } else {
        alert("Error deleting file: " + res.error);
      }
    } else if (deletingTarget.type === "course") {
      const res = await deleteCourseFolder(deletingTarget.id);
      setDeletingLoading(false);
      if (res.success) {
        setCourses((prev) => prev.filter((c) => c.id !== deletingTarget.id));
        triggerFlash(`Deleted course folder "${deletingTarget.title}".`);
        setDeletingTarget(null);
        await refreshData();
        await loadData();
      } else {
        alert("Error deleting course folder: " + res.error);
      }
    }
  }

  async function handleCreateCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    setCreatingCourse(true);

    const newId = "c-" + Date.now().toString(36);
    const titleFormatted = newCourseTitle.trim().toUpperCase();
    const res = await createNewCourseFolder({
      id: newId,
      title: titleFormatted,
      departmentId: "general",
      semester: 1,
      allowedCategories: ["notes", "past-paper", "extras", "reference"],
    });

    setCreatingCourse(false);

    if (res.success) {
      const created: Course = {
        id: newId,
        title: titleFormatted,
        departmentId: "general",
        semester: 1,
        allowedCategories: ["notes", "past-paper", "extras", "reference"],
        resourceCount: 0,
      };

      const updated = [created, ...courses];
      setCourses(updated);

      if (targetResourceIdForNewCourse) {
        setSelectedCourseMap((prev) => ({
          ...prev,
          [targetResourceIdForNewCourse]: newId,
        }));
      }

      setNewCourseModalOpen(false);
      setNewCourseTitle("");
      setTargetResourceIdForNewCourse(null);
      triggerFlash(`Created course folder: "${created.title}"`);
      refreshData();
    } else {
      alert("Error creating course: " + res.error);
    }
  }

  // Helpers to parse metadata entered by student
  function getContributorCourseName(item: PendingResource) {
    if (item.usn && item.usn.includes("Course: ")) {
      const match = item.usn.match(/Course:\s*([^·]+)/);
      if (match && match[1]) return match[1].trim();
    }
    if (item.academic_year && item.academic_year.includes(" · ")) {
      const parts = item.academic_year.split(" · ");
      if (parts.length >= 3) return parts[2].trim();
    }
    if (item.title && item.title.includes(" - ")) {
      return item.title.split(" - ").pop()!.trim();
    }
    const matched = courses.find((c) => c.id === item.course_id);
    if (matched) return matched.title;
    return item.course_id || "Not specified";
  }

  function getContributorBranch(item: PendingResource) {
    if (item.usn && item.usn.includes("Branch: ")) {
      const match = item.usn.match(/Branch:\s*([^·]+)/);
      if (match && match[1]) return match[1].trim();
    }
    return null;
  }

  function getCleanUsn(item: PendingResource) {
    if (!item.usn) return "";
    return item.usn.split(" · ")[0].trim();
  }

  // Collect any unique pending courses requested across the queue that aren't yet in `courses`
  const pendingCourseOptions = useMemo(() => {
    const map = new Map<string, string>();
    pending.forEach((p) => {
      if (p.course_id && !courses.some((c) => c.id === p.course_id)) {
        const name = getContributorCourseName(p) || p.course_id;
        map.set(p.course_id, name.toUpperCase());
      }
    });
    return Array.from(map.entries()).map(([id, title]) => ({ id, title }));
  }, [pending, courses]);

  // Filtered live resources for the Live Resources tab
  const filteredLiveResources = useMemo(() => {
    if (!liveSearchQuery.trim()) return archiveResources;
    const q = liveSearchQuery.toLowerCase();
    return archiveResources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.contributor.toLowerCase().includes(q) ||
        courses.find((c) => c.id === r.courseId)?.title.toLowerCase().includes(q)
    );
  }, [archiveResources, liveSearchQuery, courses]);

  // Filtered courses for the Course Folders tab
  const filteredCourses = useMemo(() => {
    if (!courseSearchQuery.trim()) return courses;
    return filterAndRankCourses(courses, courseSearchQuery);
  }, [courses, courseSearchQuery]);

  if (!authed) {
    return (
      <Layout>
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-sm rounded-[14px] border border-line-strong bg-card p-6 shadow-lift sm:p-8 animate-modal-in">
            <div className="text-center">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-oxblood">
                MODERATION ACCESS
              </span>
              <h1 className="mt-1 font-serif text-[24px] font-bold text-ink">
                Review Portal
              </h1>
              <p className="mt-1.5 text-[13px] font-medium text-ink-soft">
                Enter your credentials to access moderation controls.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder=""
                  className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] font-medium text-ink placeholder:text-ink-faint focus:border-oxblood focus:outline-none"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  placeholder=""
                  className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] font-medium text-ink placeholder:text-ink-faint focus:border-oxblood focus:outline-none"
                  required
                />
              </div>

              {authError && (
                <p className="rounded-md bg-oxblood-tint border border-oxblood/20 p-2 text-[12.5px] font-semibold text-oxblood-dark text-center">
                  Invalid username or password. Please try again.
                </p>
              )}

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="border-b border-line bg-paper/60 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-content flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-oxblood/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-oxblood">
                MODERATION DESK
              </span>
              <span className="text-[12px] font-semibold text-ink-faint">
                Logged in as <strong className="text-ink">{ADMIN_USERNAME}</strong>
              </span>
              <span className="text-line-strong">·</span>
              <button
                onClick={handleLogout}
                className="text-[11.5px] font-bold text-ink-faint hover:text-oxblood transition-colors underline cursor-pointer"
              >
                Sign Out
              </button>
            </div>
            <h1 className="mt-1.5 font-serif text-[28px] font-bold text-ink sm:text-[34px]">
              Archive Control Center
            </h1>
            <p className="mt-1 text-[14px] font-medium text-ink-soft">
              Moderate contributor uploads, manage live archive files, and organize course folders.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setTargetResourceIdForNewCourse(null);
                setNewCourseModalOpen(true);
              }}
            >
              + Create Course Folder
            </Button>
            <Button size="sm" onClick={loadData} disabled={loading}>
              {loading ? "Refreshing..." : "↻ Refresh"}
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto max-w-content mt-6 flex items-center gap-2 border-b border-line pb-0">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-[13.5px] font-bold transition-colors ${
              activeTab === "pending"
                ? "border-oxblood text-oxblood"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            <span>Pending Review</span>
            <span
              className={`rounded-full px-2 py-0.2 text-[11px] font-extrabold ${
                pending.length > 0 ? "bg-oxblood text-white" : "bg-line text-ink-faint"
              }`}
            >
              {pending.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("live")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-[13.5px] font-bold transition-colors ${
              activeTab === "live"
                ? "border-oxblood text-oxblood"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            <span>Live Resources</span>
            <span className="rounded-full bg-paper border border-line px-2 py-0.2 text-[11px] font-semibold text-ink-faint">
              {archiveResources.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-[13.5px] font-bold transition-colors ${
              activeTab === "courses"
                ? "border-oxblood text-oxblood"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            <span>Course Folders</span>
            <span className="rounded-full bg-paper border border-line px-2 py-0.2 text-[11px] font-semibold text-ink-faint">
              {courses.length}
            </span>
          </button>
        </div>
      </section>

      {flashMsg && (
        <div className="bg-moss-tint/80 border-b border-[#4B5E45]/20 py-2.5 px-5 text-center text-[13.5px] font-bold text-[#354832] animate-page-enter">
          ✓ {flashMsg}
        </div>
      )}

      {/* TAB 1: PENDING REVIEW QUEUE */}
      {activeTab === "pending" && (
        <section className="px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-content">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="font-serif text-[19px] font-bold text-ink">
                Pending Submissions ({pending.length})
              </h2>
              <span className="text-[13px] font-medium text-ink-faint">
                {pending.length === 0 ? "Queue is empty" : "Awaiting your approval"}
              </span>
            </div>

            {loading && (
              <p className="py-20 text-center font-medium text-ink-faint">Loading queue from Supabase...</p>
            )}

            {!loading && pending.length === 0 && (
              <div className="py-24 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper border border-line text-[24px]">
                  📦
                </div>
                <h3 className="mt-4 font-serif text-[20px] font-bold text-ink">Queue is completely empty</h3>
                <p className="mt-1 max-w-sm mx-auto text-[14px] font-medium text-ink-soft">
                  When students upload notes or past papers through the Contribute form, they will appear here for you to review, file, and publish.
                </p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              {pending.map((item) => {
                const selectedCourseId = selectedCourseMap[item.id] || item.course_id;
                const requestedCourse = getContributorCourseName(item);
                const contributorBranch = getContributorBranch(item);
                const cleanUsn = getCleanUsn(item);

                return (
                  <div
                    key={item.id}
                    className="rounded-[12px] border border-line bg-card p-5 shadow-xs transition-all hover:border-line-strong sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      {/* File Meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="rounded-full bg-ink/10 px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase text-ink">
                            {RESOURCE_TYPE_LABEL[item.type] || item.type}
                          </span>
                          <span className="rounded-full bg-paper px-2 py-0.5 text-[11.5px] font-semibold text-ink-faint border border-line">
                            {item.file_size_mb > 0 ? `${normalizeFileType(item.file_type)} · ${item.file_size_mb} MB` : normalizeFileType(item.file_type) || "LINK"}
                          </span>
                          <span className="text-[12px] text-ink-faint">Uploaded {item.upload_date}</span>
                        </div>

                        <h3 className="mt-2 font-serif text-[18px] font-bold text-ink leading-snug">
                          {item.title}
                        </h3>

                        <div className="mt-2 flex items-center gap-3 text-[13px] text-ink-soft">
                          <span className="font-semibold text-ink">By {item.contributor}</span>
                          {cleanUsn && (
                            <>
                              <span aria-hidden>·</span>
                              <span className="font-mono text-ink-faint font-semibold">{cleanUsn}</span>
                            </>
                          )}
                          {contributorBranch && (
                            <>
                              <span aria-hidden>·</span>
                              <span className="rounded bg-paper px-2 py-0.2 font-mono text-[11px] font-bold text-oxblood">
                                {contributorBranch}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Course Name Entered by Contributor */}
                        <div className="mt-3 rounded-lg border border-oxblood/20 bg-oxblood-tint/40 p-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[13px]">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">
                                Course requested by student:
                              </span>
                              <span className="font-serif font-bold text-oxblood text-[14px]">
                                {requestedCourse}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Preview / Download file link */}
                        {item.file_url && (
                          <div className="mt-3">
                            <a
                              href={item.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-oxblood hover:underline"
                            >
                              <span>{item.file_type === "LINK" || item.file_type === "DRIVE" || item.file_type === "BOOK" ? "Open Resource Link" : "Preview Document"}</span>
                              <span>↗</span>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Course Selection & Actions */}
                      <div className="shrink-0 flex flex-col gap-3 lg:w-[320px]">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[12px] font-bold uppercase tracking-wider text-ink-soft">
                              Target Course Folder
                            </label>
                            <button
                              onClick={() => {
                                setTargetResourceIdForNewCourse(item.id);
                                setNewCourseModalOpen(true);
                              }}
                              className="text-[11.5px] font-bold text-oxblood hover:underline"
                            >
                              + New Course
                            </button>
                          </div>
                          {/* ONLY COURSE NAME DISPLAYED - NO SEMESTER INFO */}
                          <select
                            value={selectedCourseId}
                            onChange={(e) =>
                              setSelectedCourseMap((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-[13.5px] font-semibold text-ink focus:border-oxblood focus:outline-none"
                          >
                            {/* If the current item has a custom requested folder not yet in courses, show it as an option */}
                            {item.course_id && !courses.some((c) => c.id === item.course_id) && (
                              <option value={item.course_id}>
                                ★ {requestedCourse} (Publish as New Folder)
                              </option>
                            )}

                            {/* All live and newly created/approved courses */}
                            {courses.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.title}
                              </option>
                            ))}

                            {/* Other new course folders requested across the queue */}
                            {pendingCourseOptions.filter((pc) => pc.id !== item.course_id && !courses.some((c) => c.id === pc.id)).length > 0 && (
                              <optgroup label="Other New Folders in Queue">
                                {pendingCourseOptions
                                  .filter((pc) => pc.id !== item.course_id && !courses.some((c) => c.id === pc.id))
                                  .map((pc) => (
                                    <option key={pc.id} value={pc.id}>
                                      ★ {pc.title} (New Folder from Queue)
                                    </option>
                                  ))}
                              </optgroup>
                            )}
                          </select>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleApprove(item)}
                            className="flex-1 rounded-full bg-ink px-4 py-2 text-[13px] font-bold text-white transition-all hover:bg-oxblood active:scale-95 shadow-sm"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => {
                              setRejectingItem(item);
                              setRejectReason("");
                            }}
                            className="rounded-full border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-ink-soft hover:bg-red-50 hover:text-red-700 hover:border-red-200 active:scale-95 transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: LIVE APPROVED RESOURCES (Admin File Management & Deletion) */}
      {activeTab === "live" && (
        <section className="px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-content">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line pb-4">
              <div>
                <h2 className="font-serif text-[19px] font-bold text-ink">
                  Live Archive Resources ({filteredLiveResources.length})
                </h2>
                <p className="text-[13px] text-ink-soft">
                  Browse all active files published on the site. You can preview or permanently delete files here.
                </p>
              </div>

              <div className="w-full sm:w-72">
                <input
                  type="text"
                  value={liveSearchQuery}
                  onChange={(e) => setLiveSearchQuery(e.target.value)}
                  placeholder="Filter resources…"
                  className="w-full rounded-md border border-line bg-white px-3 py-1.5 text-[13px] font-medium text-ink focus:border-oxblood focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {filteredLiveResources.map((r) => {
                const courseName = courses.find((c) => c.id === r.courseId)?.title || r.courseId;
                return (
                  <div
                    key={r.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-line bg-card p-4 transition-all hover:border-line-strong"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono text-ink-faint">
                        <span className="font-bold text-oxblood">{RESOURCE_TYPE_LABEL[r.type] || r.type}</span>
                        <span>·</span>
                        <span>{r.fileType} · {r.fileSizeMb} MB</span>
                        <span>·</span>
                        <span className="font-sans font-semibold text-ink-soft">Course: {courseName}</span>
                      </div>
                      <h4 className="mt-1 font-serif text-[15px] font-bold text-ink truncate">
                        {r.title}
                      </h4>
                      <p className="text-[12.5px] text-ink-faint">
                        Contributed by <strong className="text-ink-soft">{r.contributor}</strong> {r.usn ? `(${r.usn})` : ""} · {r.upvotes} upvotes
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {r.link ? (
                        <a
                          href={r.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12.5px] font-bold text-oxblood hover:underline"
                        >
                          Preview ↗
                        </a>
                      ) : (
                        <Link
                          to={`/resource/${r.id}`}
                          className="text-[12.5px] font-bold text-ink-soft hover:underline"
                        >
                          View Page ↗
                        </Link>
                      )}
                      <button
                        onClick={() =>
                          setDeletingTarget({
                            type: "resource",
                            id: r.id,
                            title: r.title,
                            fileUrl: r.link,
                          })
                        }
                        className="rounded border border-red-200 bg-red-50/70 px-3 py-1.5 text-[12px] font-bold text-red-700 hover:bg-red-100 transition-colors"
                      >
                        Delete File
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredLiveResources.length === 0 && (
                <p className="py-12 text-center text-[13.5px] text-ink-faint">
                  No resources match your search query.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: COURSE FOLDERS MANAGEMENT */}
      {activeTab === "courses" && (
        <section className="px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-content">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line pb-4">
              <div>
                <h2 className="font-serif text-[19px] font-bold text-ink">
                  Course Folders ({filteredCourses.length})
                </h2>
                <p className="text-[13px] text-ink-soft">
                  Manage all course archive directories. You can create new course folders or delete folders here.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  type="text"
                  value={courseSearchQuery}
                  onChange={(e) => setCourseSearchQuery(e.target.value)}
                  placeholder="Filter courses…"
                  className="rounded-md border border-line bg-white px-3 py-1.5 text-[13px] font-medium text-ink focus:border-oxblood focus:outline-none"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    setTargetResourceIdForNewCourse(null);
                    setNewCourseModalOpen(true);
                  }}
                >
                  + Add Course
                </Button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredCourses.map((c) => {
                const count = archiveResources.filter((r) => r.courseId === c.id).length;
                return (
                  <div
                    key={c.id}
                    className="flex flex-col justify-between rounded-lg border border-line bg-card p-4 shadow-2xs hover:border-line-strong transition-all"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                        {c.departmentId?.toUpperCase() || "COURSE"}
                      </span>
                      <h4 className="mt-1 font-serif text-[15px] font-bold text-ink leading-snug line-clamp-2">
                        {c.title}
                      </h4>
                      <p className="mt-1 text-[12px] font-medium text-ink-soft">
                        {count} file{count === 1 ? "" : "s"} in folder
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-2.5">
                      <Link
                        to={`/course/${c.id}`}
                        className="text-[12px] font-bold text-oxblood hover:underline"
                      >
                        Open Course →
                      </Link>
                      <button
                        onClick={() =>
                          setDeletingTarget({
                            type: "course",
                            id: c.id,
                            title: c.title,
                          })
                        }
                        className="text-[12px] font-bold text-red-600 hover:text-red-800 hover:underline"
                      >
                        Delete Folder
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        open={Boolean(deletingTarget)}
        onClose={() => setDeletingTarget(null)}
        title={
          deletingTarget?.type === "course"
            ? "Delete Course Folder"
            : "Permanently Delete File"
        }
      >
        <div className="space-y-3">
          <p className="text-[14px] text-ink leading-relaxed">
            Are you sure you want to permanently delete{" "}
            <strong className="text-oxblood font-bold">"{deletingTarget?.title}"</strong>?
          </p>
          <p className="text-[12.5px] text-ink-faint">
            {deletingTarget?.type === "course"
              ? "This will remove the course folder from ARCHIVE and Supabase. This action cannot be undone."
              : "This will remove the file from ARCHIVE and permanently delete it from Supabase cloud storage. This action cannot be undone."}
          </p>

          <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-line">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setDeletingTarget(null)}
            >
              Cancel
            </Button>
            <button
              onClick={handleConfirmDelete}
              disabled={deletingLoading}
              className="rounded-[8px] bg-red-600 px-4 py-2 text-[13px] font-bold text-white hover:bg-red-700 active:scale-95 shadow-sm disabled:opacity-50"
            >
              {deletingLoading ? "Deleting..." : "Permanently Delete"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        open={Boolean(rejectingItem)}
        onClose={() => setRejectingItem(null)}
        title="Reject Resource Submission"
      >
        <p className="text-[13.5px] text-ink-soft mb-3">
          Rejecting "{rejectingItem?.title}". You can optionally state a reason for internal logs.
        </p>
        <Field label="Rejection Reason">
          <TextInput
            placeholder="e.g. Duplicate notes, low resolution, or incomplete scan"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </Field>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setRejectingItem(null)}>
            Cancel
          </Button>
          <Button onClick={handleRejectSubmit}>
            Confirm Rejection
          </Button>
        </div>
      </Modal>

      {/* New Course Folder Modal (ONLY Course Name) */}
      <Modal
        open={newCourseModalOpen}
        onClose={() => setNewCourseModalOpen(false)}
        title="Create Course Folder"
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <p className="text-[13px] text-ink-soft -mt-2 mb-3">
            Type the course name below. It will immediately appear as an available course folder in the archive and in your moderation queue.
          </p>

          <Field label="Course Name">
            <TextInput
              placeholder="e.g. Distributed Systems"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
              autoFocus
              required
            />
          </Field>

          <div className="mt-6 flex justify-end gap-2 pt-2 border-t border-line">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setNewCourseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creatingCourse}>
              {creatingCourse ? "Creating..." : "Create Course Folder"}
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}
