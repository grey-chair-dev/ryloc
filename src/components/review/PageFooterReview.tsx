"use client";

import { ReviewPagePanel } from "@/components/review/ReviewPagePanel";
import { useReviewFlags } from "@/components/review/ReviewFlagsContext";
import type { ReviewFlag } from "@/lib/review-flags";

export function PageFooterReview({
  flags,
  pathname,
}: {
  flags: ReviewFlag[];
  pathname: string;
}) {
  const { featureEnabled, visible } = useReviewFlags();

  if (!featureEnabled || !visible || !pathname || pathname === "/review") {
    return null;
  }

  const footerFlags = flags.filter((flag) => flag.page === "Footer");
  if (footerFlags.length === 0) return null;

  return (
    <aside className="page-x py-6" aria-label="Footer review questions">
      <div className="mx-auto max-w-[800px]">
        <ReviewPagePanel label="Footer" flags={footerFlags} grid={footerFlags.length > 1} />
      </div>
    </aside>
  );
}
