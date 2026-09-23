export interface PillOption {
  id: string;
  label: string;
  dot?: string;
}

export default function PillFilter({
  options,
  active,
  onChange,
  size = "md",
}: {
  options: PillOption[];
  active: string;
  onChange: (id: string) => void;
  size?: "md" | "lg";
}) {
  const padding = size === "lg" ? "px-3.5 py-1.5 sm:px-5 sm:py-2.5" : "px-3 py-1 sm:px-3.5 sm:py-1.5";
  const fontSize = size === "lg" ? "text-[13px] sm:text-[15px]" : "text-[12px] sm:text-[13.5px]";
  const dotSize = size === "lg" ? "h-2 w-2" : "h-1.5 w-1.5";
  const containerPad = size === "lg" ? "p-1 sm:p-1.5" : "p-1";

  return (
    <div className={`inline-flex max-w-full flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-1 rounded-full border border-line bg-line/25 overflow-x-auto ${containerPad}`}>
      {options.map((o) => {
        const isActive = active === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full font-medium transition-all duration-200 ease-out active:scale-[0.97] ${padding} ${fontSize} ${
              isActive
                ? "bg-card text-ink shadow-card scale-100"
                : "text-ink-soft hover:text-ink hover:bg-white/50"
            }`}
          >
            <span
              className={`shrink-0 rounded-full transition-transform duration-200 ${dotSize} ${
                isActive ? "scale-110" : ""
              }`}
              style={{ backgroundColor: o.dot ?? "#1C1B18" }}
            />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
