import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-5 pb-10 pt-14 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand & Mission Statement */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <Logo size={20} />
              <span className="font-serif text-[17px] font-bold tracking-tight text-ink">
                ARCHIVE
              </span>
            </Link>
            <p className="mt-4 text-[14px] font-medium leading-relaxed text-ink-soft">
              Built by one, shared with everyone.
              <br />
              Sharing is caring.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-ink-faint">
              Explore
            </h4>
            <ul className="mt-3.5 space-y-2.5 text-[14px] font-semibold text-ink-soft">
              <li>
                <Link to="/" className="hover:text-ink transition-colors">
                  The Archive
                </Link>
              </li>
              <li>
                <Link to="/bookshelf" className="hover:text-ink transition-colors">
                  Bookshelf
                </Link>
              </li>
              <li>
                <Link to="/honor-roll" className="hover:text-ink transition-colors">
                  Honor Roll
                </Link>
              </li>
              <li>
                <Link to="/releases" className="hover:text-ink transition-colors">
                  Releases & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-ink-faint">
              Support
            </h4>
            <ul className="mt-3.5 space-y-2.5 text-[14px] font-semibold text-ink-soft">
              <li>
                <Link to="/terms" className="hover:text-ink transition-colors">
                  Terms & Rules
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="hover:text-ink transition-colors">
                  Contribute a file
                </Link>
              </li>
              <li>
                <a
                  href="mailto:gjr19atwork@gmail.com"
                  className="hover:text-ink transition-colors"
                >
                  Report an issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and copyright row */}
        <div className="mt-12 border-t border-line/70 pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row text-[12.5px] font-medium text-ink-faint">
          <p>
            © 2026 ARCHIVE · Built with ♥ by{" "}
            <a
              href="https://github.com/GJR19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold underline transition-all duration-150 hover:text-ink hover:-translate-y-0.5"
            >
              Gururaj Reddy
            </a>
          </p>
          <p>Not an official BMSIT platform</p>
        </div>
      </div>
    </footer>
  );
}
