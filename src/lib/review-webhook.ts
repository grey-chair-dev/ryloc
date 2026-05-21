import { sendMakeWebhook } from "@/lib/make-webhook";

const DEFAULT_REVIEW_EMAIL = "projects@greychair.io";
const DEFAULT_ACTION_ITEM_EMAIL = "will@greychair.io";

export function actionItemNotificationEmail(): string {
  return (
    process.env.ACTION_ITEM_EMAIL?.trim() ||
    process.env.LAUNCH_ACCESS_EMAIL?.trim() ||
    DEFAULT_ACTION_ITEM_EMAIL
  );
}

export type ReviewWebhookPayload = {
  type: "review-comment" | "launch-access" | "action-item";
  to: string;
  subject: string;
  body: string;
  html: string;
  reviewerName: string;
  pageUrl?: string;
  flagId?: string;
  question?: string;
  comment?: string;
  responseType?: string;
  note?: string;
  /** Present only for launch-access credential submissions. */
  credentials?: string;
};

export function reviewNotificationEmail(toOverride?: string): string {
  return (
    toOverride?.trim() ||
    process.env.REVIEW_NOTIFICATION_EMAIL?.trim() ||
    DEFAULT_REVIEW_EMAIL
  );
}

export async function sendReviewWebhook(
  payload: ReviewWebhookPayload,
): Promise<{ ok: boolean; error?: string }> {
  return sendMakeWebhook("review", payload, "review-webhook");
}
