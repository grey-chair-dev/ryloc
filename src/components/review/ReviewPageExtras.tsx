"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReviewFlag } from "@/lib/review-flags";
import { PageAnythingElseReview } from "@/components/review/PageAnythingElseReview";
import { PageFooterReview } from "@/components/review/PageFooterReview";

export function ReviewPageExtras({
  flags,
  pathname,
}: {
  flags: ReviewFlag[];
  pathname: string;
}) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById("gc-review-page-slot"));
  }, [pathname]);

  if (!slot) return null;

  return createPortal(
    <>
      <PageAnythingElseReview flags={flags} pathname={pathname} />
      <PageFooterReview flags={flags} pathname={pathname} />
    </>,
    slot,
  );
}
