import { buildActionItemEmail, buildLaunchAccessEmail, buildReviewCommentEmail } from "@/lib/review-email-html";
import { getReviewFlags } from "@/lib/content";
import {
  actionItemNotificationEmail,
  reviewNotificationEmail,
  sendReviewWebhook,
} from "@/lib/review-webhook";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isActionItem } from "@/lib/review-flags";
import { resolveReviewComment, resolveReviewerName } from "@/lib/review-comment-text";
import { launchAccessSchema, reviewCommentSchema } from "@/lib/validations";

type ReqLike = {
  ip?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

export async function handleReviewCommentPost(req: ReqLike) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`review-comment:${ip}`)) {
    return {
      status: 429,
      body: { success: false, message: "Too many requests. Please try again later." },
    };
  }

  const parsed = reviewCommentSchema.safeParse(req.body);
  if (!parsed.success) {
    return {
      status: 400,
      body: {
        success: false,
        message: 'Check "No change needed" or type your answer.',
        errors: parsed.error.flatten().fieldErrors,
      },
    };
  }

  const { flagId, question, reviewerName, comment, noChangeRequired, pageUrl } = parsed.data;
  const resolvedName = resolveReviewerName(reviewerName);
  const resolvedComment = resolveReviewComment(comment, noChangeRequired);
  const flag = getReviewFlags().flags.find((item) => item.id === flagId);
  const forActionItem = flag ? isActionItem(flag) : false;
  const to = forActionItem ? actionItemNotificationEmail() : reviewNotificationEmail();
  const sentAt = new Date().toISOString();
  const email = forActionItem
    ? buildActionItemEmail({
        reviewerName: resolvedName,
        flagId,
        question,
        comment: resolvedComment,
        pageUrl,
        sentAt,
      })
    : buildReviewCommentEmail({
        reviewerName: resolvedName,
        flagId,
        question,
        comment: resolvedComment,
        pageUrl,
        sentAt,
      });

  const result = await sendReviewWebhook({
    type: forActionItem ? "action-item" : "review-comment",
    to,
    subject: email.subject,
    body: email.body,
    html: email.html,
    reviewerName: resolvedName,
    flagId,
    question,
    comment: resolvedComment,
    pageUrl,
  });

  if (!result.ok) {
    return {
      status: 503,
      body: {
        success: false,
        message:
          "We could not send your answer right now. Please email projects@greychair.io instead.",
      },
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      message: forActionItem
        ? "Thank you — your response was sent to Will."
        : "Thank you — your answer was sent to the team.",
    },
  };
}

export async function handleReviewLaunchAccessPost(req: ReqLike) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`review-launch-access:${ip}`)) {
    return {
      status: 429,
      body: {
        success: false,
        message: "Too many requests. Please try again in a few minutes.",
      },
    };
  }

  const parsed = launchAccessSchema.safeParse(req.body);
  if (!parsed.success) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Please choose an option and fill in what is needed.",
        errors: parsed.error.flatten().fieldErrors,
      },
    };
  }

  const { reviewerName, responseType, credentials, note, pageUrl } = parsed.data;
  const resolvedName = resolveReviewerName(reviewerName);
  const to = actionItemNotificationEmail();
  const sentAt = new Date().toISOString();
  const email = buildLaunchAccessEmail({
    reviewerName: resolvedName,
    responseType,
    credentials,
    note,
    pageUrl,
    sentAt,
  });

  const result = await sendReviewWebhook({
    type: "launch-access",
    to,
    subject: email.subject,
    body: email.body,
    html: email.html,
    reviewerName: resolvedName,
    responseType,
    note,
    pageUrl,
    credentials: responseType === "submit_credentials" ? credentials : undefined,
  });

  if (!result.ok) {
    return {
      status: 503,
      body: {
        success: false,
        message:
          "We could not send this right now. Please give Will the logins by phone or in person instead.",
      },
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      message:
        responseType === "will_send_separately"
          ? "Thank you — Will was notified that you will send the logins another way."
          : responseType === "dont_have_yet"
            ? "Thank you — Will was notified that you don't have domain/DNS access yet."
            : "Thank you — your login details were sent securely to Will.",
    },
  };
}
