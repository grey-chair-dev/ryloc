"use client";

import { ReviewPagePanel } from "@/components/review/ReviewPagePanel";
import { useReviewFlags } from "@/components/review/ReviewFlagsContext";
import { getPageOtherFlagForPath, type ReviewFlag } from "@/lib/review-flags";

export function PageAnythingElseReview({
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

  const flag = getPageOtherFlagForPath(flags, pathname);
  if (!flag) return null;

  return (
    <aside className="page-x py-6" aria-label="Anything else for this page">
      <div className="mx-auto max-w-[800px]">
        <ReviewPagePanel label="Anything else" flags={[flag]} />
      </div>
    </aside>
  );
}
