export const NO_CHANGE_COMMENT = "No change needed — approved as shown.";

export function resolveReviewComment(
  comment: string | undefined,
  noChangeRequired?: boolean,
): string {
  if (noChangeRequired) return NO_CHANGE_COMMENT;
  return comment?.trim() ?? "";
}

export function resolveReviewerName(name: string | undefined): string {
  const trimmed = name?.trim();
  return trimmed || "Ben";
}
