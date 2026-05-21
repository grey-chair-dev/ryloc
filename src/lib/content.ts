import reviewData from "../../content/review-flags.json";

export type ReviewFlagsContent = typeof reviewData;

export function getReviewFlags() {
  return reviewData;
}
