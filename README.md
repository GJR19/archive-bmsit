# ARCHIVE

> The institutional memory of BMSIT — BMS Institute of Technology and Management's searchable archive of past papers, lecture notes, reference textbooks, and academic resources.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live-success?style=flat-square&logo=vercel)](https://archive-bmsit.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

---

### Live Application
**[archive-bmsit.vercel.app](https://archive-bmsit.vercel.app/)**

### Repository
[github.com/GJR19/archive-bmsit](https://github.com/GJR19/archive-bmsit)

### Deployment
Vercel Git auto-deploy from `main`. Every push to `main` triggers a production release.

---

## Overview

**ARCHIVE** is a complete, production-grade academic repository created for the students of BMSIT&M. Built from the ground up to replace fragmented drive links and Telegram groups, ARCHIVE centralizes syllabus-prescribed notes, verified VTU past question papers, and professor-recommended textbooks into an intuitive, accessible catalog.

Unlike static prototypes, ARCHIVE is fully operational with live cloud storage, server-backed moderation, real-time upvotes, and contributor tracking.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, React Router v7
- **Styling**: Tailwind CSS, custom design tokens, responsive typography
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security)
- **File Storage**: Supabase Storage buckets for PDFs and study materials
- **Analytics**: Vercel Web Analytics (`@vercel/analytics`)
- **Hosting**: Vercel Edge Network

---

## What is Live

- **Instant Course Search**: Real-time fuzzy filtering across courses and syllabus subjects.
- **Category Filtering**: Granular classification across **Past Papers**, **Lecture Notes**, **Reference Books**, and **Extras**.
- **Interactive Bookshelf**: Realistic physical bookshelf experience displaying official prescribed VTU reference textbooks without hosting copyrighted copies.
- **Live Document Viewer**: Built-in document viewer with full-screen reading mode, quick zoom, and direct download links.
- **Device-Aware Upvotes**: Community resource voting engine synced with Supabase and persisted to client devices.
- **Honor Roll (Leaderboard)**: Automated student recognition calculating contributor rankings and points earned from verified contributions.
- **Public Contribution Flow**: Drag-and-drop file upload with course mapping, branch selection, and contributor attribution.
- **Quarantined Moderation Queue**: Uploads never go public automatically. All submissions land in a secure moderation queue until reviewed by an administrator.
- **Admin Management Console**: Dedicated portal for previewing incoming documents, correcting course mappings, approving files to the live catalog, or rejecting invalid uploads.
- **Responsive Layout**: Designed for seamless usage across both mobile and desktop screens with zero horizontal overflow.

---

## Architecture

```
archive-bmsit/
├── src/
│   ├── components/       # Header, Footer, Modals, Bookshelf, Cards, Dropzone
│   ├── pages/            # Home, Course, Bookshelf, HonorRoll, Resource, Admin, Terms, Releases
│   ├── services/         # Supabase API services (resourceService.ts)
│   ├── context/          # Global application state (ArchiveContext.tsx)
│   ├── data/             # Domain types and fallback schema definitions
│   └── lib/              # Theme definitions, helper utilities, and constants
├── public/               # Static assets, book covers, and icons
├── supabase/             # Database schema migrations & storage configurations
└── .env.example          # Environment variable reference
```

### Data & Moderation Pipeline

1. **Submission**: Students upload past papers or notes via `/contribute`.
2. **Quarantine**: Files are uploaded to Supabase Storage and registered in the `pending_submissions` table with status `pending`.
3. **Review**: The administrator logs into the moderation portal (`/moderation`), inspects the preview, verifies the file, and chooses the target course folder.
4. **Publish**: On approval, the resource moves into the live `resources` table and appears instantly across the website and contributor leaderboard.

---

## Local Development

### 1. Clone the repository
```bash
git clone https://github.com/GJR19/archive-bmsit.git
cd archive-bmsit
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PATH=/moderation
```

### 4. Run dev server
```bash
npm run dev
```
Open `http://localhost:5173` to test locally.

---

## Production Build

```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Contributing & Maintenance

- **Submissions**: All resource submissions go through student validation and admin review before publication.
- **Takedowns & Inquiries**: For copyright, errata, or takedown requests, contact the project maintainers via the links in the footer.
- **Built with pride by BMSIT students, for BMSIT students.**
