"use client";

import type { ReviewFlag } from "@/lib/review-flags";
import { flagsForPageBar } from "@/lib/review-flags";
import { ReviewFlagList } from "@/components/review/ReviewFlagList";

export function PageReviewFlags({ flags }: { flags: ReviewFlag[] }) {
  const visible = flagsForPageBar(flags);
  if (visible.length === 0) return null;

  return (
    <aside
      className="gc-review-site-bar fixed left-0 right-0 top-[6.25rem] z-[47] max-h-[min(38vh,18rem)] overflow-y-auto border-b-2 border-amber-500/25 bg-neutral-950/95 py-3 shadow-md backdrop-blur-md page-x md:top-[7.75rem]"
      aria-label="Questions for Ben on this page"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-on-surface">
            <span className="mr-2 inline-flex rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-secondary">
              Review
            </span>
            {visible.length} question{visible.length === 1 ? "" : "s"} about the whole site — type your
            answer below each box
          </p>
          <a href="/review.html" className="text-sm font-semibold text-primary hover:underline">
            See all questions →
          </a>
        </div>
        <ReviewFlagList flags={visible} />
      </div>
    </aside>
  );
}
