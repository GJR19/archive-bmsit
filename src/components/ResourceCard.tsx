import { Link } from "react-router-dom";
import type { Resource } from "../data/types";
import { RESOURCE_TYPE_LABEL } from "../data/types";
import { TypeBadge, UpvoteBadge } from "./Badge";
import { categoryThemes } from "../lib/categoryTheme";
import { isResourceUpvoted } from "../services/resourceService";

export default function ResourceRow({ resource }: { resource: Resource }) {
  const theme = categoryThemes[resource.type];
  const upvoted = isResourceUpvoted(resource.id);
  return (
    <Link
      to={`/resource/${resource.id}`}
      className="group flex items-center gap-4 rounded-[8px] border border-transparent px-3 py-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-line hover:bg-card hover:shadow-card active:scale-[0.99] will-change-transform sm:px-4"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] text-[10px] font-semibold transition-transform duration-200 group-hover:scale-105 ${theme.iconBg}`}>
        {resource.fileType}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] text-ink transition-colors duration-200 group-hover:text-oxblood">
          {resource.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-faint">
          <span>{resource.academicYear}</span>
          <span aria-hidden>·</span>
          <span>{resource.type === "reference" ? "External link" : `${resource.fileSizeMb} MB`}</span>
          <span aria-hidden>·</span>
          <span>by {resource.contributor}</span>
        </div>
      </div>
      <div className="hidden shrink-0 sm:block">
        <UpvoteBadge count={resource.upvotes} active={upvoted} />
      </div>
      <div className="hidden shrink-0 sm:block">
        <TypeBadge type={resource.type} label={RESOURCE_TYPE_LABEL[resource.type]} />
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="hidden shrink-0 text-ink-faint transition-transform duration-200 ease-out group-hover:translate-x-1 sm:block"
      >
        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
