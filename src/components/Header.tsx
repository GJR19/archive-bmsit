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

  const nav = [
    { to: "/", label: "Archive" },
    { to: "/bookshelf", label: "Bookshelf" },
    { to: "/honor-roll", label: "Honor Roll" },
  ];

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-8 animate-header-enter">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between rounded-full border border-line bg-white/95 px-3.5 sm:px-7 shadow-sm backdrop-blur-md transition-shadow duration-300">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 transition-opacity hover:opacity-85 shrink-0">
          <Logo size={20} />
          <span className="font-serif text-[16px] sm:text-[17px] font-bold tracking-tight text-ink">
            ARCHIVE
          </span>
        </Link>

        {/* Center: Segmented Navigation Pill (Desktop) */}
        <nav className="hidden items-center rounded-full bg-[#F2EFE9] p-1 sm:flex">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-5 py-1.5 text-[13.5px] font-bold transition-all duration-200 ${
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
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search archive"
            className="group flex items-center gap-2 rounded-full border border-line-strong bg-white p-2 sm:px-3.5 sm:py-1.5 text-[13px] font-semibold text-ink-soft shadow-xs hover:border-ink hover:shadow-sm active:scale-[0.98] transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-ink-faint transition-transform duration-200 group-hover:scale-110">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="hidden md:inline text-ink-faint">Search...</span>
            <kbd className="hidden lg:inline rounded bg-paper px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-ink-faint">
              ⌘K
            </kbd>
          </button>

          <Link
            to="/contribute"
            className="rounded-full bg-[#1C1B18] px-3.5 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-black hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] sm:px-5 sm:py-2 sm:text-[13px] transition-all duration-200"
          >
            Contribute
          </Link>

          {/* Mobile Navigation Toggle (Mobile Only) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper/80 text-ink sm:hidden transition-colors hover:bg-white active:scale-95"
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
        <div className="mt-2 mx-auto max-w-content overflow-hidden rounded-[16px] border border-line bg-white/98 p-2.5 shadow-lift backdrop-blur-md sm:hidden animate-modal-in">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
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
