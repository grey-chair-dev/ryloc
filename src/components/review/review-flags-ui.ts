import type { ReviewFlag } from "@/lib/review-flags";
import { reviewFlagsConfig } from "@/lib/review-flags-config";

/** Clear fixed nav when jumping to #anchors */
export const REVIEW_FLAG_SCROLL_MT = "scroll-mt-[8.5rem]";

export function reviewFlagElementId(flagId: string): string {
  return `${reviewFlagsConfig.storagePrefix}-flag-${flagId}`;
}

export const reviewPriorityLabel: Record<ReviewFlag["priority"], string> = {
  high: "Answer soon",
  medium: "Important",
  low: "When you can",
};

export const reviewPriorityClass: Record<ReviewFlag["priority"], string> = {
  high: "bg-amber-500/20 text-amber-200",
  medium: "bg-amber-500/15 text-amber-300/90",
  low: "bg-neutral-800 text-neutral-400",
};
