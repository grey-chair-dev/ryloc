"use client";

import { useReviewFlags } from "@/components/review/ReviewFlagsContext";

export function ReviewGate({ children }: { children: React.ReactNode }) {
  const { featureEnabled, visible, show } = useReviewFlags();

  if (!featureEnabled) {
    return (
      <div className="page-x mx-auto max-w-[800px] py-16 text-on-surface-variant">
        <p>Content review mode is not enabled on this environment.</p>
      </div>
    );
  }

  if (!visible) {
    return (
      <div className="page-x mx-auto max-w-[800px] py-16">
        <p className="text-on-surface-variant">
          The review questions are hidden. Click <strong>Show questions</strong> at the bottom-right
          of the screen, or use the button below.
        </p>
        <button
          type="button"
          onClick={show}
          className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Show questions
        </button>
      </div>
    );
  }

  return children;
}
