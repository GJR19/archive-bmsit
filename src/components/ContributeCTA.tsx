import { Link } from "react-router-dom";
import Button from "./Button";

export default function ContributeCTA({
  title,
  subtitle,
  buttonLabel = "Contribute a file",
}: {
  title: string;
  subtitle: string;
  buttonLabel?: string;
}) {
  return (
    <section className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-content overflow-hidden rounded-[10px] border border-line bg-[radial-gradient(circle_at_top_right,rgba(122,46,42,0.10),transparent_55%)] bg-card p-8 sm:p-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-lg">
            <h2 className="font-serif text-[26px] leading-tight text-ink sm:text-[30px]">
              {title}
            </h2>
            <p className="mt-2.5 text-[15px] text-ink-soft">{subtitle}</p>
          </div>
          <Link to="/contribute" className="shrink-0">
            <Button size="md">{buttonLabel}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
