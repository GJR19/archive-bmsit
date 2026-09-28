import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and listen for Escape key when mobile menu modal is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Desktop segmented pill items
  const nav = [
    { to: "/", label: "Archive" },
    { to: "/bookshelf", label: "Bookshelf" },
    { to: "/honor-roll", label: "Honor Roll" },
  ];

  // Mobile modal navigation items matching media_1790596492143.png
  const mobileNavItems = [
    {
      to: "/",
      label: "Archive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <rect x="8" y="9" width="8" height="4" rx="1" />
        </svg>
      ),
    },
    {
      to: "/bookshelf",
      label: "Bookshelf",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="6" y1="7" x2="18" y2="7" />
          <line x1="6" y1="12" x2="15" y2="12" />
          <line x1="6" y1="17" x2="11" y2="17" />
        </svg>
      ),
    },
    {
      to: "/honor-roll",
      label: "Honor Roll",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      ),
    },
    {
      to: "/releases",
      label: "Releases",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="12" y1="4" x2="12" y2="7" />
          <line x1="12" y1="17" x2="12" y2="20" />
          <line x1="4" y1="12" x2="7" y2="12" />
          <line x1="17" y1="12" x2="20" y2="12" />
          <line x1="6.34" y1="6.34" x2="8.46" y2="8.46" />
          <line x1="15.54" y1="15.54" x2="17.66" y2="17.66" />
          <line x1="6.34" y1="17.66" x2="8.46" y2="15.54" />
          <line x1="15.54" y1="8.46" x2="17.66" y2="6.34" />
        </svg>
      ),
    },
    {
      to: "/terms",
      label: "Terms & Rules",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <header className="sticky top-2 sm:top-3 z-40 px-3 sm:px-6 lg:px-8 animate-header-enter">
        <div className="relative mx-auto flex h-20 md:h-14 max-w-content items-center justify-between rounded-full border border-line bg-white/95 pl-5 sm:pl-6 pr-3 sm:pr-4 md:px-5 lg:px-7 shadow-sm backdrop-blur-md transition-shadow duration-300">
          {/* Left: Logo & ARCHIVE Text */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center gap-3 sm:gap-3.5 transition-opacity hover:opacity-85 shrink-0 z-10"
          >
            <div className="md:hidden flex items-center">
              <Logo size={42} />
            </div>
            <div className="hidden md:block">
              <Logo size={20} />
            </div>
            <span className="font-serif text-[23px] sm:text-[25px] md:text-[17px] font-bold tracking-tight text-ink">
              ARCHIVE
            </span>
          </Link>

          {/* Center: Segmented Navigation Pill (Tablet & Desktop) */}
          <nav className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2 items-center rounded-full bg-[#F2EFE9] p-1 lg:p-1.5 shadow-xs whitespace-nowrap">
            {nav.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={scrollToTop}
                  className={`rounded-full px-3.5 md:px-4 lg:px-6 py-1.5 lg:py-2 text-[13px] lg:text-[14px] font-bold transition-all duration-200 ${
                    active
                      ? "bg-white text-ink shadow-sm scale-100"
                      : "text-ink-soft hover:text-ink hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search (Desktop), Contribute (Desktop) & Mobile 3-Lines Menu */}
          <div className="flex items-center gap-2.5 md:gap-2 lg:gap-3 shrink-0 z-10">
            {/* Search Button - Desktop only */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search archive"
              className="hidden md:flex items-center justify-start gap-2 rounded-full border border-line-strong bg-white p-2 sm:px-2.5 lg:px-3.5 sm:py-1.5 text-[13px] font-semibold text-ink-soft shadow-xs hover:border-ink hover:shadow-sm active:scale-[0.98] transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-[15px] h-[15px] text-ink-faint transition-transform duration-200 group-hover:scale-110 shrink-0">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="hidden lg:inline text-ink-faint">Search...</span>
              <kbd className="hidden xl:inline rounded bg-paper px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-ink-faint">
                ⌘K
              </kbd>
            </button>

            {/* Contribute Button - Hidden on Mobile, Visible on Tablet & Desktop */}
            <Link
              to="/contribute"
              className="hidden md:inline-flex rounded-full bg-[#1C1B18] px-3.5 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-black hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] lg:px-5 lg:py-2 lg:text-[13px] transition-all duration-200 shrink-0"
            >
              Contribute
            </Link>

            {/* Mobile Search Button (Mobile Only) - Exact same size as 3 lines button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search archive"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-line/80 bg-[#FAF7EE] text-ink md:hidden transition-colors hover:bg-white active:scale-95 shrink-0 shadow-2xs"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21L16.65 16.65" />
              </svg>
            </button>

            {/* Mobile Navigation Toggle (Mobile Only) - Big Concentric Button matching media_1790597064759.png */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation menu"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-line/80 bg-[#FAF7EE] text-ink md:hidden transition-colors hover:bg-white active:scale-95 shrink-0 shadow-2xs"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>

        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>

      {/* Large Mobile Menu Modal Window (Mobile Only) - matching media_1790596492143.png */}
      {mobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-black/45 backdrop-blur-md px-3 pt-2 sm:pt-3 md:hidden overflow-y-auto animate-backdrop-in">
            {/* Top Bar inside modal overlay matching mobile header */}
            <div className="mx-auto flex h-20 w-full max-w-content items-center justify-between rounded-full border border-line bg-white/95 pl-5 sm:pl-6 pr-3 sm:pr-4 shadow-sm backdrop-blur-md mb-4 shrink-0">
              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToTop();
                }}
                className="flex items-center gap-3 sm:gap-3.5 transition-opacity hover:opacity-85 shrink-0"
              >
                <Logo size={42} />
                <span className="font-serif text-[23px] sm:text-[25px] font-bold tracking-tight text-ink">
                  ARCHIVE
                </span>
              </Link>

              {/* Circular Dark Close Button matching media_1790596492143.png */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1C1B18] text-white shadow-sm hover:bg-black active:scale-95 transition-all shrink-0"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Backdrop click dismiss area */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Large Modal Window Card matching media_1790596492143.png */}
            <div
              className="relative w-full max-w-[360px] rounded-[32px] border border-[#ECE5D8] bg-[#FDFBF7] p-4 sm:p-5 shadow-2xl animate-modal-in my-auto pb-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu items */}
              <div className="flex flex-col gap-1.5">
                {mobileNavItems.map((item) => {
                  const active = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className={`flex items-center gap-3.5 rounded-[22px] p-2.5 transition-all duration-200 ${
                        active
                          ? "border border-[#E8DEC8] bg-[#FAF6EE] shadow-xs"
                          : "border border-transparent hover:bg-black/5"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] transition-colors ${
                          active
                            ? "bg-[#FCEAD2] text-[#B86B14]"
                            : "bg-[#EFECE6] text-[#55504A]"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span
                        className={`text-[16px] tracking-tight ${
                          active ? "font-bold text-ink" : "font-semibold text-ink"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-3.5 border-t border-[#EAE3D8]" />

              {/* Orange Pill Contribute Button */}
              <Link
                to="/contribute"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToTop();
                }}
                className="flex w-full items-center justify-between rounded-full bg-[#F27A00] hover:bg-[#E06E00] active:scale-[0.98] py-3.5 px-5 text-white shadow-md shadow-orange-500/25 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/80 bg-white/30 shrink-0">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span className="text-[15px] font-bold text-white tracking-tight">
                    Contribute to Archive
                  </span>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
