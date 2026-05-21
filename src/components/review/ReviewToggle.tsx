"use client";

import { useReviewFlags } from "@/components/review/ReviewFlagsContext";

export function ReviewToggle() {
  const { featureEnabled, visible, toggle, openFlags } = useReviewFlags();

  if (!featureEnabled) return null;

  const openCount = openFlags.length;

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-4 right-4 z-[70] flex max-w-[min(100vw-2rem,18rem)] items-center gap-2 rounded-full border-2 border-secondary/40 bg-surface-container-lowest px-4 py-2.5 text-left text-sm font-semibold text-on-surface shadow-lg transition-[transform,box-shadow] hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-pressed={visible}
      aria-label={visible ? "Hide review questions" : "Show review questions"}
    >
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold uppercase tracking-wide text-on-secondary"
        aria-hidden
      >
        {visible ? "On" : "Off"}
      </span>
      <span className="leading-snug">
        {visible ? "Hide questions" : "Show questions"}
        {openCount > 0 ? (
          <span className="mt-0.5 block text-xs font-normal text-on-surface-variant">
            {openCount} still need an answer
          </span>
        ) : null}
      </span>
    </button>
  );
}
