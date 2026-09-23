import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const nav = [
    { to: "/", label: "Archive" },
    { to: "/bookshelf", label: "Bookshelf" },
    { to: "/honor-roll", label: "Honor Roll" },
  ];

  return (
    <header className="sticky top-3 z-40 px-4 sm:px-8 animate-header-enter">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between rounded-full border border-line bg-white/95 px-5 sm:px-7 shadow-sm backdrop-blur-md transition-shadow duration-300">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-85">
          <Logo size={20} />
          <span className="font-serif text-[17px] font-bold tracking-tight text-ink">
            ARCHIVE
          </span>
        </Link>

        {/* Center: Segmented Navigation Pill */}
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

        {/* Right: Search & Contribute */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="group flex items-center gap-2 rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft shadow-xs hover:border-ink hover:shadow-sm active:scale-[0.98] transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-ink-faint transition-transform duration-200 group-hover:scale-110">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-ink-faint">Search...</span>
            <kbd className="rounded bg-paper px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-ink-faint">
              ⌘K
            </kbd>
          </button>

          <Link
            to="/contribute"
            className="rounded-full bg-[#1C1B18] px-5 py-2 text-[13px] font-bold text-white shadow-sm hover:bg-black hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] transition-all duration-200"
          >
            Contribute
          </Link>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
