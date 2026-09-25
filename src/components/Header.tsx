import { useState, useEffect } from "react";
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const nav = [
    { to: "/", label: "Archive" },
    { to: "/bookshelf", label: "Bookshelf" },
    { to: "/honor-roll", label: "Honor Roll" },
  ];

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 lg:px-8 animate-header-enter">
      <div className="relative mx-auto flex h-14 max-w-content items-center justify-between rounded-full border border-line bg-white/95 px-3.5 sm:px-5 lg:px-7 shadow-sm backdrop-blur-md transition-shadow duration-300">
        {/* Left: Logo */}
        <Link
          to="/"
          onClick={scrollToTop}
          className="flex items-center gap-2 sm:gap-2.5 transition-opacity hover:opacity-85 shrink-0 z-10"
        >
          <Logo size={20} />
          <span className="font-serif text-[16px] sm:text-[17px] font-bold tracking-tight text-ink">
            ARCHIVE
          </span>
        </Link>

        {/* Center: Segmented Navigation Pill (Tablet & Desktop) - Centered & Responsive */}
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

        {/* Right: Search, Contribute & Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0 z-10">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search archive"
            className="group flex items-center gap-2 rounded-full border border-line-strong bg-white p-2 sm:px-2.5 lg:px-3.5 sm:py-1.5 text-[13px] font-semibold text-ink-soft shadow-xs hover:border-ink hover:shadow-sm active:scale-[0.98] transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-ink-faint transition-transform duration-200 group-hover:scale-110 shrink-0">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="hidden lg:inline text-ink-faint">Search...</span>
            <kbd className="hidden xl:inline rounded bg-paper px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-ink-faint">
              ⌘K
            </kbd>
          </button>

          <Link
            to="/contribute"
            className="rounded-full bg-[#1C1B18] px-3.5 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-black hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] lg:px-5 lg:py-2 lg:text-[13px] transition-all duration-200 shrink-0"
          >
            Contribute
          </Link>

          {/* Mobile Navigation Toggle (Mobile Only) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper/80 text-ink md:hidden transition-colors hover:bg-white active:scale-95 shrink-0"
          >
            {mobileMenuOpen ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Card */}
      {mobileMenuOpen && (
        <div className="mt-2 mx-auto max-w-content overflow-hidden rounded-[16px] border border-line bg-white/98 p-2.5 shadow-lift backdrop-blur-md md:hidden animate-modal-in">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToTop();
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-[14px] font-bold transition-colors ${
                    active
                      ? "bg-[#7A2E2A] text-white shadow-xs"
                      : "text-ink hover:bg-paper"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="text-[10px]">●</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
