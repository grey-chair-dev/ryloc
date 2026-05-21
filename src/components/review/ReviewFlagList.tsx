import type { ReviewFlag } from "@/lib/review-flags";
import { LaunchAccessReviewCard } from "@/components/review/LaunchAccessReviewCard";
import { ReviewFlagCard } from "@/components/review/ReviewFlagCard";

const LAUNCH_ACCESS_FLAG_ID = "launch-access";
import { cn } from "@/lib/utils";

export function ReviewFlagList({
  flags,
  compact = false,
  grid = false,
  variant = "default",
}: {
  flags: ReviewFlag[];
  compact?: boolean;
  grid?: boolean;
  variant?: "default" | "inline";
}) {
  if (flags.length === 0) return null;

  return (
    <ul
      className={cn(
        grid ? "grid gap-3 md:grid-cols-2 md:items-start" : compact ? "space-y-3" : "space-y-4",
        compact && !grid ? "mb-0" : "",
      )}
      aria-label="Questions for Ben"
    >
      {flags.map((flag) =>
        flag.id === LAUNCH_ACCESS_FLAG_ID ? (
          <LaunchAccessReviewCard key={flag.id} flag={flag} compact={compact} variant={variant} />
        ) : (
          <ReviewFlagCard key={flag.id} flag={flag} compact={compact} variant={variant} />
        ),
      )}
    </ul>
  );
}
