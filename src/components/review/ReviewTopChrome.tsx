"use client";

import { useState } from "react";
import { useReviewFlags } from "@/components/review/ReviewFlagsContext";
import { useReviewLayoutMetrics } from "@/lib/use-review-layout-metrics";

export function ReviewTopChrome() {
  const [chromeEl, setChromeEl] = useState<HTMLElement | null>(null);
  const { featureEnabled, visible, hydrated, reviewerName, setReviewerName, openFlags } =
    useReviewFlags();

  useReviewLayoutMetrics(chromeEl);

  if (!featureEnabled || !visible || !hydrated) return null;

  const openCount = openFlags.length;

  return (
    <header
      ref={setChromeEl}
      className="gc-review-top fixed inset-x-0 z-[55] border-b border-amber-500/25 bg-neutral-950/98 shadow-md backdrop-blur-md"
      aria-label="Review mode"
    >
      <div className="page-x mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-2 gap-y-1.5 py-1.5">
        <span className="shrink-0 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
          Review
        </span>
        <label htmlFor="gc-reviewer-name" className="sr-only">
          Your name
        </label>
        <input
          id="gc-reviewer-name"
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className="min-w-[7rem] max-w-[11rem] flex-1 rounded border border-neutral-600 bg-neutral-900 px-2 py-0.5 text-sm text-white focus:border-amber-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        />
        <span className="hidden text-xs text-neutral-400 sm:inline">Saved on this device</span>
        <a
          href="/review.html"
          className="ml-auto shrink-0 text-xs font-semibold text-amber-300 underline-offset-2 hover:text-amber-200 hover:underline"
        >
          {openCount} open question{openCount === 1 ? "" : "s"} — full list
        </a>
      </div>
    </header>
  );
}
