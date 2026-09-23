import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ContributeForm from "../components/ContributeForm";
import ResourceCard from "../components/ResourceCard";
import { useArchive } from "../context/ArchiveContext";
import type { ResourceType } from "../data/types";
import { RESOURCE_TYPE_LABEL } from "../data/types";

export default function Course() {
  const { id } = useParams<{ id: string }>();
  const { courses, resources } = useArchive();
  const course = useMemo(() => courses.find((c) => c.id === id), [courses, id]);
  const [active, setActive] = useState<"all" | ResourceType>("all");
  const [uploadOpen, setUploadOpen] = useState(false);

  const courseResources = useMemo(() => {
    if (!course) return [];
    return resources.filter((r) => r.courseId === course.id);
  }, [course, resources]);

  const filtered = active === "all" ? courseResources : courseResources.filter((r) => r.type === active);

  if (!course) {
    return (
      <Layout>
        <div className="mx-auto max-w-content px-5 py-24 text-center">
          <h1 className="font-serif text-[28px] font-bold text-ink">Course not found</h1>
          <p className="mt-2 text-ink-soft">The requested course could not be found.</p>
          <Link to="/" className="mt-6 inline-block font-bold text-oxblood hover:underline">
            ← Back to Archive
          </Link>
        </div>
      </Layout>
    );
  }

  const counts: Record<ResourceType, number> = {
    notes: courseResources.filter((r) => r.type === "notes").length,
    "past-paper": courseResources.filter((r) => r.type === "past-paper").length,
    extras: courseResources.filter((r) => r.type === "extras").length,
    reference: courseResources.filter((r) => r.type === "reference").length,
  };

  const tabs = [
    { id: "all", label: "Everything", count: courseResources.length },
    ...course.allowedCategories.map((cat) => ({
      id: cat,
      label: RESOURCE_TYPE_LABEL[cat],
      count: counts[cat] || 0,
    })),
  ];

  return (
    <Layout>
      <div className="border-b border-line bg-card px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-content">
          <Link to="/" className="text-[13px] font-bold text-oxblood hover:underline">
            ← Back to all courses
          </Link>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              {/* Semester and department details removed */}
              <h1 className="font-serif text-[32px] font-bold text-ink sm:text-[40px]">
                {course.title}
              </h1>
              <p className="mt-2 text-[15px] font-medium text-ink-soft">
                {courseResources.length} resources available across configured categories
              </p>
            </div>
            <Button onClick={() => setUploadOpen(true)}>Contribute Resource</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-content px-5 py-8 sm:px-8">
        <Tabs items={tabs} active={active} onChange={(v) => setActive(v as typeof active)} />

        {/* Reference Textbook Card if configured and active */}
        {course.referenceBook && (active === "all" || active === "reference") && (
          <div className="mt-6 overflow-hidden rounded-[18px] border border-[#48334d]/30 bg-[#f3edf5] p-6 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={course.referenceBook.coverImage}
                alt={course.referenceBook.title}
                className="h-48 w-36 rounded-lg object-cover shadow-md border border-black/10 mx-auto sm:mx-0"
              />
              <div className="flex-1 min-w-0">
                <span className="inline-flex rounded-full bg-[#48334d] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                  PRESCRIBED REFERENCE TEXTBOOK
                </span>
                <h3 className="mt-2.5 font-serif text-[22px] font-bold text-ink">
                  {course.referenceBook.title}
                </h3>
                <p className="mt-1 text-[14.5px] font-semibold text-ink-soft">
                  {course.referenceBook.author}
                </p>
                <p className="mt-0.5 text-[13.5px] font-medium text-ink-faint">
                  {course.referenceBook.edition ? `${course.referenceBook.edition} · ` : ""}
                  {course.referenceBook.publisher} ({course.referenceBook.year})
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={course.referenceBook.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#48334d] px-5 py-2.5 text-[13.5px] font-bold text-white shadow hover:bg-[#37253b] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150"
                  >
                    <span>View and Buy</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered
            .filter((r) => r.type !== "reference" || !course.referenceBook)
            .map((r, idx) => (
              <div
                key={r.id}
                className="animate-card-enter"
                style={{ animationDelay: `${Math.min(idx * 25, 250)}ms` }}
              >
                <ResourceCard resource={r} />
              </div>
            ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-medium text-ink-faint">
            No resources available for this category yet.
          </p>
        )}
      </div>

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Course Resource">
        <ContributeForm defaultCourse={course.title} onSubmitted={() => setUploadOpen(false)} />
      </Modal>
    </Layout>
  );
}
