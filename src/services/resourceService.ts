import { supabase } from "../lib/supabase";
import { courses as mockCourses, resources as mockResources, referenceBooks as mockReferenceBooks } from "../data/mockData";
import type { Course, ReferenceBook, Resource, ResourceType } from "../data/types";
import { sendAdminUploadNotification } from "./notificationService";

export interface PendingResource {
  id: string;
  title: string;
  course_id: string;
  type: ResourceType;
  academic_year: string;
  semester: number;
  file_type: string;
  file_size_mb: number;
  file_url: string;
  contributor: string;
  usn: string;
  upload_date: string;
  upvotes: number;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  created_at?: string;
}

const DELETED_COURSES_KEY = "archive_deleted_courses";
const DELETED_RESOURCES_KEY = "archive_deleted_resources";

export function getDeletedCourseIds(): Set<string> {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(DELETED_COURSES_KEY) : null;
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export function markCourseIdDeleted(courseId: string) {
  try {
    if (typeof window === "undefined") return;
    const ids = getDeletedCourseIds();
    ids.add(courseId);
    localStorage.setItem(DELETED_COURSES_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore
  }
}

export function getDeletedResourceIds(): Set<string> {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(DELETED_RESOURCES_KEY) : null;
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export function markResourceIdDeleted(resourceId: string) {
  try {
    if (typeof window === "undefined") return;
    const ids = getDeletedResourceIds();
    ids.add(resourceId);
    localStorage.setItem(DELETED_RESOURCES_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore
  }
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Automatically create a textbook cover image with the course name printed on it and nothing else!
export function generateCourseTextbookCover(courseName: string): string {
  const cleanName = (courseName || "COURSE TEXTBOOK").trim().toUpperCase();

  // Distinct rich academic book cover palettes
  const palettes = [
    { base: "#4A1525", dark: "#220810", gold: "#D4AF37", accent: "#E5C158", spine: "#300B16" }, // Burgundy
    { base: "#16253D", dark: "#0A1320", gold: "#D4AF37", accent: "#E5C158", spine: "#0E1929" }, // Oxford Navy
    { base: "#16382B", dark: "#0A1C15", gold: "#C8A951", accent: "#DFC16B", spine: "#0F261D" }, // Forest Green
    { base: "#3C1B40", dark: "#1D0B20", gold: "#D4AF37", accent: "#E5C158", spine: "#28112C" }, // Royal Plum
    { base: "#23272A", dark: "#121416", gold: "#D4AF37", accent: "#E5C158", spine: "#181A1C" }, // Charcoal
    { base: "#4D2D18", dark: "#27150A", gold: "#D4AF37", accent: "#E5C158", spine: "#331C0E" }, // Amber Leather
  ];

  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
    hash = (hash << 5) - hash + cleanName.charCodeAt(i);
    hash |= 0;
  }
  const theme = palettes[Math.abs(hash) % palettes.length];

  // Wrap course title cleanly into balanced lines
  const words = cleanName.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";
  const maxLineChars = cleanName.length > 30 ? 16 : 14;

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if ((currentLine + " " + word).length <= maxLineChars) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  // Dynamic font sizing
  const maxWordLen = Math.max(...words.map((w) => w.length), 0);
  let fontSize = 38;
  if (lines.length >= 4 || maxWordLen >= 14) {
    fontSize = 28;
  } else if (lines.length === 3 || maxWordLen >= 11) {
    fontSize = 32;
  } else if (lines.length === 2 && cleanName.length > 20) {
    fontSize = 34;
  }

  const lineHeight = fontSize * 1.38;
  const totalHeight = lines.length * lineHeight;
  const startY = 450 - totalHeight / 2 + fontSize * 0.85;

  const tspanLines = lines
    .map(
      (line, i) =>
        `<tspan x="360" y="${(startY + i * lineHeight).toFixed(1)}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 900" width="700" height="900">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.base}"/>
      <stop offset="100%" stop-color="${theme.dark}"/>
    </linearGradient>
    <radialGradient id="radialGlow" cx="52%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.45"/>
    </radialGradient>
    <linearGradient id="spineShadow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.65"/>
      <stop offset="35%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <filter id="bookShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Leather / Cloth Base Texture -->
  <rect width="700" height="900" fill="url(#bgGrad)"/>
  <rect width="700" height="900" fill="url(#radialGlow)"/>

  <!-- Classical Gilt Borders -->
  <rect x="50" y="45" width="605" height="810" rx="4" fill="none" stroke="${theme.gold}" stroke-width="2.5" opacity="0.8"/>
  <rect x="62" y="57" width="581" height="786" rx="2" fill="none" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="7,4" opacity="0.45"/>

  <!-- Corner Ornamental Gilded Brackets -->
  <path d="M 50 85 L 85 50 M 50 73 L 73 50" stroke="${theme.gold}" stroke-width="1.8" opacity="0.65"/>
  <path d="M 655 85 L 620 50 M 655 73 L 632 50" stroke="${theme.gold}" stroke-width="1.8" opacity="0.65"/>
  <path d="M 50 815 L 85 850 M 50 827 L 73 850" stroke="${theme.gold}" stroke-width="1.8" opacity="0.65"/>
  <path d="M 655 815 L 620 850 M 655 827 L 632 850" stroke="${theme.gold}" stroke-width="1.8" opacity="0.65"/>

  <!-- Classical Central Decorative Flourish Bars (Top & Bottom of Title) -->
  <g opacity="0.75" stroke="${theme.gold}" stroke-width="1.5">
    <line x1="250" y1="230" x2="470" y2="230"/>
    <circle cx="360" cy="230" r="4" fill="${theme.gold}"/>
    <circle cx="250" cy="230" r="2.5" fill="${theme.gold}"/>
    <circle cx="470" cy="230" r="2.5" fill="${theme.gold}"/>

    <line x1="250" y1="670" x2="470" y2="670"/>
    <circle cx="360" cy="670" r="4" fill="${theme.gold}"/>
    <circle cx="250" cy="670" r="2.5" fill="${theme.gold}"/>
    <circle cx="470" cy="670" r="2.5" fill="${theme.gold}"/>
  </g>

  <!-- Centered Course Name Printed On It - Nothing Else -->
  <g filter="url(#bookShadow)">
    <text text-anchor="middle" fill="#FFF9ED" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${fontSize}" letter-spacing="2.5">
      ${tspanLines}
    </text>
  </g>

  <!-- Left 3D Spine Fold Crease -->
  <rect x="0" y="0" width="45" height="900" fill="url(#spineShadow)"/>
  <line x1="45" y1="0" x2="45" y2="900" stroke="#000000" stroke-opacity="0.35" stroke-width="1.5"/>
</svg>`;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Automatically construct a ReferenceBook from an uploaded reference resource or link
export function createReferenceBookFromResource(
  resource: { id: string; title: string; link?: string; file_url?: string; contributor?: string; courseId?: string; course_id?: string },
  courseTitle: string
): ReferenceBook {
  const url = (resource.link || resource.file_url || "").trim();
  const cid = resource.courseId || resource.course_id || "course";
  // ONLY ONE OPTION - VIEW AND BUY. Must open the exact given link!
  const viewAndBuyUrl = url || `https://www.amazon.in/s?k=${encodeURIComponent(resource.title)}`;

  // Create a textbook image with the course name printed on it and nothing else!
  const coverImage = generateCourseTextbookCover(courseTitle);

  return {
    id: `ref-${resource.id}`,
    courseId: cid,
    courseName: courseTitle,
    title: resource.title,
    author: resource.contributor && resource.contributor !== "Anonymous"
      ? `Prescribed by ${resource.contributor}`
      : "Prescribed Course Reference",
    citation: `${resource.title}, Prescribed Reference for ${courseTitle}`,
    amazonUrl: viewAndBuyUrl,
    coverImage,
    spineColor: "#48334d",
  };
}

// 1. Fetch Approved Resources
export async function getLiveResources(): Promise<Resource[]> {
  const deletedResIds = getDeletedResourceIds();
  const deletedCourseIds = getDeletedCourseIds();

  try {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    let live: Resource[] = [];
    if (!error && data && data.length > 0) {
      live = data
        .filter(
          (r: any) =>
            !deletedResIds.has(r.id) &&
            !deletedCourseIds.has(r.course_id)
        )
        .map((r: any) => ({
          id: r.id,
          title: r.title,
          courseId: r.course_id,
          type: r.type as ResourceType,
          academicYear: r.academic_year,
          semester: r.semester,
          fileType: r.file_type as any,
          fileSizeMb: Number(r.file_size_mb),
          contributor: r.contributor,
          usn: r.usn,
          uploadDate: r.upload_date,
          upvotes: r.upvotes || 0,
          link: r.file_url,
        }));
    }

    if (live.length > 0) {
      return live;
    }

    return mockResources.filter(
      (r) => !deletedResIds.has(r.id) && !deletedCourseIds.has(r.courseId)
    );
  } catch (err) {
    console.warn("Falling back to local resources:", err);
    return mockResources.filter(
      (r) => !deletedResIds.has(r.id) && !deletedCourseIds.has(r.courseId)
    );
  }
}

// 2. Fetch Courses with their Reference Books (Mock + Dynamically Uploaded Reference Books)
export async function getLiveCourses(): Promise<Course[]> {
  const deletedIds = getDeletedCourseIds();

  try {
    const [{ data, error }, { data: refData }] = await Promise.all([
      supabase.from("courses").select("*").order("semester", { ascending: true }),
      supabase.from("resources").select("*").eq("type", "reference").eq("status", "approved"),
    ]);

    let live: Course[] = [];
    if (!error && data && data.length > 0) {
      live = data
        .filter(
          (c: any) =>
            c.department_id !== "deleted" &&
            c.department_id !== "pending_review" &&
            c.department_id !== "pending" &&
            !c.title?.startsWith("[DELETED]") &&
            !c.title?.startsWith("__DELETED__") &&
            !deletedIds.has(c.id)
        )
        .map((c: any) => {
          // Check if mock course has an official referenceBook
          const mockMatch = mockCourses.find(
            (m) => m.id === c.id || m.title.toLowerCase() === c.title.toLowerCase()
          );
          const officialBook =
            mockMatch?.referenceBook ||
            mockReferenceBooks.find(
              (b) => b.courseId === c.id || b.courseName.toLowerCase() === c.title.toLowerCase()
            ) ||
            null;

          // Only use dynamically uploaded reference if no official textbook exists
          const matchedRef = refData?.find((r: any) => r.course_id === c.id);
          const refBook = officialBook || (matchedRef ? createReferenceBookFromResource(matchedRef, c.title) : null);

          return {
            id: c.id,
            title: c.title,
            departmentId: c.department_id,
            semester: c.semester,
            allowedCategories: c.allowed_categories || ["notes", "past-paper", "extras", "reference"],
            resourceCount: c.resource_count || 0,
            referenceBook: refBook,
          };
        });
    }

    const liveCourseIds = new Set(live.map((c) => c.id));
    const mergedMock = mockCourses
      .filter((c) => !liveCourseIds.has(c.id) && !deletedIds.has(c.id))
      .map((c) => {
        // Only if a mock course has no referenceBook, allow uploaded reference
        const matchedRef = refData?.find((r: any) => r.course_id === c.id);
        if (matchedRef && !c.referenceBook) {
          return {
            ...c,
            referenceBook: createReferenceBookFromResource(matchedRef, c.title),
          };
        }
        return c;
      });

    const allCourses = [...live, ...mergedMock];
    const nonKannada = allCourses.filter((c) => !c.title.toUpperCase().includes("KANNADA"));
    const kannada = allCourses.filter((c) => c.title.toUpperCase().includes("KANNADA"));
    return [...nonKannada, ...kannada];
  } catch (err) {
    console.warn("Falling back to local courses:", err);
    const allCourses = mockCourses.filter((c) => !deletedIds.has(c.id));
    const nonKannada = allCourses.filter((c) => !c.title.toUpperCase().includes("KANNADA"));
    const kannada = allCourses.filter((c) => c.title.toUpperCase().includes("KANNADA"));
    return [...nonKannada, ...kannada];
  }
}

// 3. Upload File to Supabase Storage & Submit Resource for Admin Review
export async function submitContributorResource({
  file,
  fileUrl: explicitFileUrl,
  title,
  courseId,
  type,
  academicYear,
  semester,
  contributor,
  usn,
  branch,
  requestedCourse,
}: {
  file?: File | null;
  fileUrl?: string;
  title: string;
  courseId: string;
  type: ResourceType;
  academicYear: string;
  semester: number;
  contributor: string;
  usn: string;
  branch?: string;
  requestedCourse?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    let finalFileUrl = explicitFileUrl?.trim() || "";
    let ext = "LINK";
    let fileSizeMb = 0;

    if (file) {
      ext = file.name.split(".").pop()?.toUpperCase() || "PDF";
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const storagePath = `uploads/${cleanFileName}`;

      const { error: uploadErr } = await supabase.storage
        .from("archive-files")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadErr) {
        console.error("Storage upload error:", uploadErr);
        return { success: false, error: uploadErr.message };
      }

      const { data: publicData } = supabase.storage
        .from("archive-files")
        .getPublicUrl(storagePath);

      finalFileUrl = publicData.publicUrl;
      fileSizeMb = Number((file.size / (1024 * 1024)).toFixed(2));
    } else if (finalFileUrl) {
      if (finalFileUrl.toLowerCase().endsWith(".pdf")) ext = "PDF";
      else if (finalFileUrl.includes("drive.google")) ext = "DRIVE";
      else if (type === "reference") ext = "BOOK";
      else ext = "LINK";
    } else {
      return { success: false, error: "Neither a file nor a resource link was provided." };
    }

    // Ensure course exists in Supabase so foreign key constraint never causes failure,
    // but if it's a new course requested by a student, mark as 'pending_review' so it NEVER
    // appears on the public website until an Admin approves it!
    try {
      const courseName = requestedCourse || (title.includes(" - ") ? title.split(" - ").pop()! : courseId);
      const { data: existingCourse } = await supabase
        .from("courses")
        .select("id, department_id")
        .eq("id", courseId)
        .single();

      if (!existingCourse) {
        await supabase.from("courses").insert({
          id: courseId,
          title: courseName,
          department_id: "pending_review",
          semester: semester || 1,
          allowed_categories: ["notes", "past-paper", "extras", "reference"],
          resource_count: 0,
        });
      }
    } catch {
      // ignore
    }

    // Embed branch and requested course into USN metadata string
    const meta: string[] = [];
    if (usn) meta.push(usn);
    if (branch) meta.push(`Branch: ${branch}`);
    if (requestedCourse) meta.push(`Course: ${requestedCourse}`);
    const enrichedUsn = meta.join(" · ");

    const { error: insertErr } = await supabase.from("resources").insert({
      title,
      course_id: courseId,
      type,
      academic_year: academicYear,
      semester,
      file_type: ext,
      file_size_mb: fileSizeMb,
      file_url: finalFileUrl,
      contributor: contributor || "Anonymous",
      usn: enrichedUsn,
      status: "pending",
      upvotes: 0,
    });

    if (insertErr) {
      console.error("Database insert error:", insertErr);
      return { success: false, error: insertErr.message };
    }

    // Dispatch email notification to Gururaj for moderation
    const courseName = requestedCourse || (title.includes(" - ") ? title.split(" - ").pop()! : courseId);
    sendAdminUploadNotification({
      title,
      courseName,
      type,
      contributor: contributor || "Anonymous",
      usn,
      branch,
      fileUrl: finalFileUrl,
      fileSizeMb,
    }).catch((err) => console.warn("Upload notification email error:", err));

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Upload failed" };
  }
}

// 4. Admin API: Fetch Pending Submissions
export async function getPendingSubmissions(): Promise<PendingResource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// 5. Admin API: Approve Submission & Assign Course
export async function approveSubmission(
  resourceId: string,
  targetCourseId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. If target course was in 'pending_review', activate it so it now becomes a live course!
    const { data: courseData } = await supabase
      .from("courses")
      .select("id, department_id, title")
      .eq("id", targetCourseId)
      .single();

    if (courseData) {
      const cleanTitle = courseData.title ? courseData.title.toUpperCase() : targetCourseId.toUpperCase();
      if (courseData.department_id === "pending_review" || courseData.department_id === "pending") {
        await supabase
          .from("courses")
          .update({ department_id: "general", title: cleanTitle })
          .eq("id", targetCourseId);
      } else if (courseData.title !== cleanTitle) {
        await supabase
          .from("courses")
          .update({ title: cleanTitle })
          .eq("id", targetCourseId);
      }
    }

    // 2. Set resource to approved
    const { error } = await supabase
      .from("resources")
      .update({
        status: "approved",
        course_id: targetCourseId,
      })
      .eq("id", resourceId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to approve submission" };
  }
}

// 6. Admin API: Reject Submission
export async function rejectSubmission(
  resourceId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data } = await supabase.from("resources").select("file_url, course_id").eq("id", resourceId).single();
    if (data?.file_url && data.file_url.includes("/archive-files/")) {
      const parts = data.file_url.split("/archive-files/");
      if (parts[1]) {
        const storagePath = decodeURIComponent(parts[1].split("?")[0]);
        await supabase.storage.from("archive-files").remove([storagePath]);
      }
    }

    // If associated course was pending_review and has no approved resources, mark it deleted
    if (data?.course_id) {
      const { data: courseData } = await supabase
        .from("courses")
        .select("department_id")
        .eq("id", data.course_id)
        .single();
      if (courseData && (courseData.department_id === "pending_review" || courseData.department_id === "pending")) {
        await supabase
          .from("courses")
          .update({ department_id: "deleted", title: `[DELETED]_${data.course_id}` })
          .eq("id", data.course_id);
      }
    }
  } catch {
    // ignore
  }

  const { error } = await supabase
    .from("resources")
    .update({
      status: "rejected",
      rejection_reason: reason || "Does not meet archive guidelines",
    })
    .eq("id", resourceId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

// 7. Admin API: Create New Course Folder
export async function createNewCourseFolder({
  id,
  title,
  departmentId = "general",
  semester = 1,
  allowedCategories = ["notes", "past-paper", "extras", "reference"],
}: {
  id?: string;
  title: string;
  departmentId?: string;
  semester?: number;
  allowedCategories?: ResourceType[];
}): Promise<{ success: boolean; courseId?: string; error?: string }> {
  const courseId = id || "c-" + Date.now().toString(36);
  const cleanTitle = title.trim().toUpperCase();
  const { error } = await supabase.from("courses").insert({
    id: courseId,
    title: cleanTitle,
    department_id: departmentId,
    semester,
    allowed_categories: allowedCategories,
    resource_count: 0,
  });

  if (error) return { success: false, error: error.message };
  return { success: true, courseId };
}

// 8. Admin API: Permanently Delete Resource & Cloud File
export async function deleteResource(
  resourceId: string,
  fileUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Mark as deleted locally so it never reappears even if fallback mock
    markResourceIdDeleted(resourceId);

    // 2. Delete from database
    const { error: dbErr } = await supabase.from("resources").delete().eq("id", resourceId);
    if (dbErr) return { success: false, error: dbErr.message };

    // 3. If uploaded to Supabase Storage, delete file
    if (fileUrl && fileUrl.includes("/archive-files/")) {
      const parts = fileUrl.split("/archive-files/");
      if (parts[1]) {
        const storagePath = decodeURIComponent(parts[1].split("?")[0]);
        await supabase.storage.from("archive-files").remove([storagePath]);
      }
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete resource" };
  }
}

// 9. Admin API: Permanently Delete Course Folder
export async function deleteCourseFolder(
  courseId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Mark locally as deleted so neither live nor mock fallback will ever re-inject it
    markCourseIdDeleted(courseId);

    // 2. Query any resources under this course to delete storage files if any
    try {
      const { data: resList } = await supabase
        .from("resources")
        .select("id, file_url")
        .eq("course_id", courseId);

      if (resList && resList.length > 0) {
        for (const item of resList) {
          if (item.id) markResourceIdDeleted(item.id);
          if (item.file_url && item.file_url.includes("/archive-files/")) {
            const parts = item.file_url.split("/archive-files/");
            if (parts[1]) {
              const storagePath = decodeURIComponent(parts[1].split("?")[0]);
              await supabase.storage.from("archive-files").remove([storagePath]);
            }
          }
        }
      }
    } catch {
      // ignore storage error
    }

    // 3. Delete associated resources from database
    await supabase.from("resources").delete().eq("course_id", courseId);

    // 4. Update Supabase courses table to mark as deleted (UPDATE works 100% with anon key)
    await supabase
      .from("courses")
      .update({
        department_id: "deleted",
        title: `[DELETED]_${courseId}`,
      })
      .eq("id", courseId);

    // 5. Also attempt hard delete in Supabase
    await supabase.from("courses").delete().eq("id", courseId);

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete course folder" };
  }
}
