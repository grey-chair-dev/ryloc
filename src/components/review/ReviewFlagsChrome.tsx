"use client";

import type { ReviewFlag } from "@/lib/review-flags";
import { useReviewFlags } from "@/components/review/ReviewFlagsContext";
import { ReviewTopChrome } from "@/components/review/ReviewTopChrome";
import { ReviewToggle } from "@/components/review/ReviewToggle";
import { useReviewLayoutMetrics } from "@/lib/use-review-layout-metrics";

export function ReviewFlagsChrome({ flags: _flags }: { flags: ReviewFlag[] }) {
  const { featureEnabled, visible } = useReviewFlags();

  useReviewLayoutMetrics(null);

  if (!featureEnabled) return null;

  return (
    <>
      <ReviewToggle />
      {visible ? <ReviewTopChrome /> : null}
    </>
  );
}
