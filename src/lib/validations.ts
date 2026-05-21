import { z } from "zod";

export const reviewCommentSchema = z
  .object({
    flagId: z.string().min(1),
    question: z.string().min(1),
    reviewerName: z.string().optional(),
    comment: z.string().optional(),
    noChangeRequired: z.boolean().optional(),
    pageUrl: z.string().optional(),
  })
  .refine((data) => data.noChangeRequired || (data.comment?.trim().length ?? 0) > 0, {
    message: 'Check "No change needed" or type your answer.',
    path: ["comment"],
  });

export const launchAccessResponseTypes = [
  "will_send_separately",
  "dont_have_yet",
  "submit_credentials",
] as const;

export type LaunchAccessResponseType = (typeof launchAccessResponseTypes)[number];

export const launchAccessSchema = z
  .object({
    reviewerName: z.string().optional(),
    responseType: z.enum(launchAccessResponseTypes),
    credentials: z.string().optional(),
    note: z.string().optional(),
    pageUrl: z.string().optional(),
  })
  .refine(
    (data) =>
      data.responseType === "will_send_separately" ||
      data.responseType === "dont_have_yet" ||
      (data.credentials?.trim().length ?? 0) > 0,
    {
      message: "Choose an option above or add login details.",
      path: ["credentials"],
    },
  );
