import type { ReactNode } from "react";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink-soft">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[11.5px] text-ink-faint">{hint}</span>}
    </label>
  );
}

const inputClasses =
  "w-full rounded-[5px] border border-line bg-paper px-3 py-2.5 text-[14px] text-ink placeholder:text-ink-faint transition-all duration-200 ease-out focus:border-oxblood focus:outline-none focus:ring-2 focus:ring-oxblood/15";

export function TextInput({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClasses} ${className}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputClasses} appearance-none bg-paper`}>
      {props.children}
    </select>
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClasses} min-h-[90px] resize-y`} />;
}
