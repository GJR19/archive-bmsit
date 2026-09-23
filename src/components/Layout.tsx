import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main key={location.pathname} className="flex-1 animate-page-enter">
        {children}
      </main>
      <Footer />
    </div>
  );
}
