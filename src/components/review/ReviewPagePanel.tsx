import { ReviewFlagList } from "@/components/review/ReviewFlagList";
import type { ReviewFlag } from "@/lib/review-flags";

export function ReviewPagePanel({
  label,
  flags,
  grid = false,
}: {
  label: string;
  flags: ReviewFlag[];
  grid?: boolean;
}) {
  if (flags.length === 0) return null;

  return (
    <div className="review-page-panel w-full">
      <p className="mb-4 border-b border-amber-500/30 pb-2 text-xs font-semibold uppercase tracking-widest text-amber-300">
        Review · {label} · {flags.length} question{flags.length === 1 ? "" : "s"}
      </p>
      <ReviewFlagList flags={flags} compact grid={grid} variant="inline" />
    </div>
  );
}
