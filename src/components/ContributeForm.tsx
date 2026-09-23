import { useMemo, useState } from "react";
import UploadDropzone from "./UploadDropzone";
import Button from "./Button";
import { Field, Select, TextInput } from "./FormField";
import type { ResourceType } from "../data/types";
import { RESOURCE_TYPE_LABEL } from "../data/types";
import { useArchive } from "../context/ArchiveContext";
import { submitContributorResource } from "../services/resourceService";

const resourceTypeOptions: ResourceType[] = ["notes", "past-paper", "extras", "reference"];

export default function ContributeForm({
  defaultCourse = "",
  defaultType,
  onSubmitted,
}: {
  compact?: boolean;
  defaultCourse?: string;
  defaultType?: ResourceType;
  onSubmitted?: () => void;
}) {
  const { courses } = useArchive();
  const courseOptions = useMemo(() => {
    const nonKannada = courses.filter(
      (c) => !c.title.toUpperCase().includes("KANNADA")
    );
    const kannadaCourses = courses.filter(
      (c) => c.title.toUpperCase().includes("KANNADA")
    );
    nonKannada.sort((a, b) => a.title.localeCompare(b.title));
    return [...nonKannada, ...kannadaCourses];
  }, [courses]);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [anonymous, setAnonymous] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [courseInput, setCourseInput] = useState(defaultCourse ? defaultCourse.toUpperCase() : "");
  const [type, setType] = useState<ResourceType | "">(defaultType ?? "notes");
  const [titleInput, setTitleInput] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentUsn, setStudentUsn] = useState("");
  const [branch, setBranch] = useState("AI&ML");
  const [refLink, setRefLink] = useState("");

  const isReference = type === "reference";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titleInput.trim()) {
      setSubmitError("Resource Title is mandatory.");
      return;
    }

    if (isReference) {
      if (!refLink.trim()) {
        setSubmitError("Please provide a link to this reference book.");
        return;
      }
    } else {
      if (!selectedFile) {
        setSubmitError("Please select a file to upload.");
        return;
      }
    }

    setUploading(true);
    setSubmitError(null);

    try {
      const cleanCourseName = courseInput.trim().toUpperCase();
      const matchedCourse = courses.find(
        (c) => c.title.toLowerCase() === cleanCourseName.toLowerCase()
      );
      const courseId = matchedCourse
        ? matchedCourse.id
        : "c-" + cleanCourseName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30);

      const finalTitle = titleInput.trim().toUpperCase();
      const finalStudentName = studentName.trim().toUpperCase();
      const finalUsn = studentUsn.trim().toUpperCase();

      const res = await submitContributorResource({
        file: isReference ? null : selectedFile,
        fileUrl: isReference ? refLink.trim() : undefined,
        title: finalTitle,
        courseId,
        type: (type || "notes") as ResourceType,
        academicYear: "2025-26",
        semester: matchedCourse ? matchedCourse.semester : 1,
        contributor: anonymous ? "Anonymous" : finalStudentName || "Gururaj Reddy",
        usn: anonymous ? "" : finalUsn || "1BY24AI049",
        branch: anonymous ? "" : branch,
        requestedCourse: cleanCourseName,
      });

      if (!res.success) {
        setSubmitError(res.error || "Upload failed. Please try again.");
        setUploading(false);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        onSubmitted?.();
      }, 1200);
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "Failed to submit resource.");
    } finally {
      setUploading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-10 text-center animate-modal-in">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-moss-tint shadow-xs transition-transform duration-300 scale-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="#4B5E45" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 font-serif text-[18px] text-ink font-bold">Resource submitted & queued!</p>
        <p className="mt-1.5 max-w-xs text-[13.5px] text-ink-soft">
          Thank you for contributing! Your upload has been routed to the <strong>Admin Moderation Queue</strong>. Once approved by Gururaj Reddy, it will go live on the course page and award Honor Roll points.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isReference ? (
        <Field label="Link to this book" hint="e.g. an Amazon.in listing — paste a link instead of uploading a file">
          <TextInput
            type="url"
            placeholder="https://www.amazon.in/…"
            value={refLink}
            onChange={(e) => setRefLink(e.target.value)}
            required
          />
        </Field>
      ) : (
        <div>
          <UploadDropzone onFiles={(files) => setSelectedFile(files[0] || null)} />
          {selectedFile && (
            <p className="mt-2 text-[12.5px] font-semibold text-[#4B5E45]">
              ✓ Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field label="Course Name" hint="Type course name or pick below">
          <input
            list="course-list"
            placeholder="e.g. ANALYSIS AND DESIGN OF ALGORITHMS"
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value.toUpperCase())}
            required
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-[13.5px] font-medium text-ink placeholder:text-ink-faint focus:border-oxblood focus:outline-none uppercase"
          />
          <datalist id="course-list">
            {courseOptions.map((c) => (
              <option key={c.id} value={c.title} />
            ))}
          </datalist>
        </Field>

        <Field label="Resource Type">
          <Select
            required
            value={type}
            onChange={(e) => setType(e.target.value as ResourceType)}
          >
            <option value="" disabled>Select a type</option>
            {resourceTypeOptions.map((t) => (
              <option key={t} value={t}>{RESOURCE_TYPE_LABEL[t]}</option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Resource Title" hint="Mandatory descriptive title for this upload">
        <TextInput
          placeholder="e.g. MODULE 3 COMPLETE HANDWRITTEN NOTES"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value.toUpperCase())}
          className="uppercase"
          required
        />
      </Field>

      {/* Contributor Name, Branch, and USN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <Field label="Student Name">
          <TextInput
            placeholder="YOUR FULL NAME"
            disabled={anonymous}
            required={!anonymous}
            value={studentName}
            onChange={(e) => setStudentName(e.target.value.toUpperCase())}
            className="uppercase"
          />
        </Field>

        <Field label="Branch / Department">
          <Select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            disabled={anonymous}
            required={!anonymous}
          >
            <option value="CSE">CSE — Computer Science</option>
            <option value="ISE">ISE — Information Science</option>
            <option value="AI&ML">AI&ML — Artificial Intelligence & ML</option>
            <option value="ECE">ECE — Electronics & Communication</option>
            <option value="EEE">EEE — Electrical & Electronics</option>
            <option value="MECH">MECH — Mechanical</option>
            <option value="CIVIL">CIVIL — Civil Engineering</option>
          </Select>
        </Field>

        <Field label="USN" hint="For Honor Roll points">
          <TextInput
            placeholder="e.g. 1BY24AI049"
            disabled={anonymous}
            required={!anonymous}
            value={studentUsn}
            onChange={(e) => setStudentUsn(e.target.value.toUpperCase())}
            className="uppercase"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2.5 text-[13px] font-medium text-ink-soft">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="h-4 w-4 rounded-sm border-line-strong accent-oxblood"
        />
        Contribute anonymously (you won't appear on the Honor Roll)
      </label>

      {submitError && (
        <p className="rounded-md bg-oxblood-tint border border-oxblood/20 p-2.5 text-[12.5px] font-semibold text-oxblood-dark">
          ⚠ {submitError}
        </p>
      )}

      <Button type="submit" disabled={uploading} className="w-full sm:w-auto">
        {uploading ? "Uploading to Cloud..." : "Submit Resource"}
      </Button>
    </form>
  );
}
