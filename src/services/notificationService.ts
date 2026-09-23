export interface UploadNotificationData {
  title: string;
  courseName: string;
  type: string;
  contributor: string;
  usn?: string;
  branch?: string;
  fileUrl: string;
  fileSizeMb?: number;
  resourceId?: string;
}

/**
 * Send an email notification to Gururaj whenever a student/contributor uploads a resource.
 * Supports:
 * - Web3Forms (VITE_WEB3FORMS_ACCESS_KEY)
 * - Resend API (VITE_RESEND_API_KEY)
 * - Formspree (VITE_FORMSPREE_URL)
 */
export async function sendAdminUploadNotification(data: UploadNotificationData): Promise<boolean> {
  const adminEmail =
    (typeof window !== "undefined" && localStorage.getItem("archive_notification_email")) ||
    import.meta.env.VITE_ADMIN_EMAIL ||
    "gjr19atwork@gmail.com";
  const web3Key =
    (typeof window !== "undefined" && localStorage.getItem("archive_web3forms_key")) ||
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const resendKey = import.meta.env.VITE_RESEND_API_KEY;
  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;

  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";
  const rawAdminPath = (import.meta.env.VITE_ADMIN_PATH || "/moderation").trim();
  const adminPath = rawAdminPath.startsWith("/") ? rawAdminPath : `/${rawAdminPath}`;
  const adminPortalUrl = `${currentOrigin}${adminPath}`;

  const subject = `[ARCHIVE BMSIT] New Resource Upload: ${data.title} (${data.type.toUpperCase()})`;

  const messageText = `
New file uploaded to ARCHIVE:
- Title: ${data.title}
- Course: ${data.courseName}
- Category: ${data.type.toUpperCase()}
- Contributor: ${data.contributor} ${data.usn ? `(${data.usn})` : ""}
- Branch: ${data.branch || "N/A"}
- File URL: ${data.fileUrl}

Review, approve, or reject this file in the Admin Portal:
${adminPortalUrl}
  `.trim();

  // 1. If Resend API Key is configured
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ARCHIVE <onboarding@resend.dev>",
          to: [adminEmail],
          subject,
          text: messageText,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e0d8; border-radius: 12px; background: #faf8f5;">
              <h2 style="color: #7A2E2A; margin-top: 0;">ARCHIVE BMSIT · New Upload Submitted</h2>
              <p style="font-size: 15px; color: #1c1b18;">A contributor just uploaded a new resource for moderation:</p>
              
              <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #eae5dd; margin: 16px 0;">
                <p style="margin: 4px 0;"><strong>Resource Title:</strong> ${data.title}</p>
                <p style="margin: 4px 0;"><strong>Course:</strong> ${data.courseName}</p>
                <p style="margin: 4px 0;"><strong>Category:</strong> ${data.type.toUpperCase()}</p>
                <p style="margin: 4px 0;"><strong>Contributor:</strong> ${data.contributor} ${data.usn ? `(${data.usn})` : ""}</p>
                <p style="margin: 4px 0;"><strong>Branch:</strong> ${data.branch || "N/A"}</p>
                <p style="margin: 8px 0 0 0;"><a href="${data.fileUrl}" style="color: #7A2E2A; text-decoration: underline;" target="_blank">Preview / Download Submitted File</a></p>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a href="${adminPortalUrl}" style="display: inline-block; background: #7A2E2A; color: #ffffff; padding: 12px 24px; font-weight: bold; text-decoration: none; border-radius: 8px;">
                  Open Admin Portal to Approve / Reject
                </a>
              </div>
            </div>
          `,
        }),
      });
      if (res.ok) {
        console.log("Upload notification email sent via Resend to", adminEmail);
        return true;
      }
    } catch (e) {
      console.warn("Resend notification failed:", e);
    }
  }

  // 2. If Web3Forms access key is configured
  if (web3Key) {
    try {
      const formData = new FormData();
      formData.append("access_key", web3Key);
      formData.append("subject", subject);
      formData.append("from_name", "ARCHIVE BMSIT Moderation");
      formData.append("title", data.title);
      formData.append("course", data.courseName);
      formData.append("category", data.type.toUpperCase());
      formData.append("contributor", `${data.contributor} ${data.usn ? `(${data.usn})` : ""}`);
      formData.append("file_url", data.fileUrl);
      formData.append("admin_portal", adminPortalUrl);
      formData.append("message", messageText);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const resJson = await res.json().catch(() => null);
      if (res.ok || resJson?.success) {
        console.log("Upload notification email sent via Web3Forms to", adminEmail);
        return true;
      }
    } catch (e) {
      console.warn("Web3Forms notification failed:", e);
    }
  }

  // 3. If Formspree is configured
  if (formspreeUrl) {
    try {
      const res = await fetch(formspreeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          title: data.title,
          course: data.courseName,
          category: data.type,
          contributor: data.contributor,
          usn: data.usn,
          fileUrl: data.fileUrl,
          adminPortal: adminPortalUrl,
        }),
      });
      if (res.ok) {
        console.log("Upload notification email sent via Formspree to", adminEmail);
        return true;
      }
    } catch (e) {
      console.warn("Formspree notification failed:", e);
    }
  }

  // Development / fallback logger
  console.log(`[Email Notification Queued for ${adminEmail}]`, {
    subject,
    data,
    adminPortalUrl,
  });

  return false;
}
