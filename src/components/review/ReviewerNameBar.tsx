"use client";

import { useReviewFlags } from "@/components/review/ReviewFlagsContext";

export function ReviewerNameBar() {
  const { featureEnabled, visible, hydrated, reviewerName, setReviewerName } = useReviewFlags();

  if (!featureEnabled || !visible || !hydrated) return null;

  return (
    <div
      className="gc-review-name-bar fixed left-0 right-0 top-16 z-[48] border-b border-amber-500/30 bg-neutral-950/95 py-2 shadow-md backdrop-blur-md page-x md:top-20"
      aria-label="Reviewer name"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2 gap-y-1">
        <label
          htmlFor="gc-reviewer-name"
          className="shrink-0 text-xs font-semibold text-on-surface-variant"
        >
          Your name
        </label>
        <input
          id="gc-reviewer-name"
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder=""
          autoComplete="name"
          className="min-w-[10rem] flex-1 rounded-lg border border-outline-variant bg-surface px-3 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 sm:max-w-xs"
        />
        <span className="text-xs text-on-surface-variant">Saved once — used for every answer</span>
      </div>
    </div>
  );
}
