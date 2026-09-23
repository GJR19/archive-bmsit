import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ArchiveProvider } from "./context/ArchiveContext";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Bookshelf from "./pages/Bookshelf";
import HonorRoll from "./pages/HonorRoll";
import Contribute from "./pages/Contribute";
import Resource from "./pages/Resource";
import Terms from "./pages/Terms";
import Releases from "./pages/Releases";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

const rawAdminPath = (import.meta.env.VITE_ADMIN_PATH || "/moderation").trim();
const ADMIN_PATH = rawAdminPath.startsWith("/") ? rawAdminPath : `/${rawAdminPath}`;

export default function App() {
  return (
    <ArchiveProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/honor-roll" element={<HonorRoll />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/resource/:id" element={<Resource />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/releases" element={<Releases />} />
          <Route path={ADMIN_PATH} element={<Admin />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
        </Routes>
        <Analytics />
      </BrowserRouter>
    </ArchiveProvider>
  );
}

