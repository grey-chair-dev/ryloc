const DRAFTS_KEY = "gc-review-drafts";
const NAME_KEY = "gc-reviewer-name";

export const DEFAULT_REVIEWER_NAME = "Ben";

export type ReviewCommentDraft = {
  comment: string;
  noChangeRequired?: boolean;
  submittedAt?: string;
};

export type ReviewDraftStore = Record<string, ReviewCommentDraft>;

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

export function loadReviewDrafts(): ReviewDraftStore {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(DRAFTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ReviewDraftStore;
  } catch {
    return {};
  }
}

export function saveReviewDraft(flagId: string, draft: ReviewCommentDraft) {
  if (!canUseStorage()) return;
  const store = loadReviewDrafts();
  store[flagId] = draft;
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(store));
}

export function loadReviewerName(): string {
  if (!canUseStorage()) return "";
  return window.localStorage.getItem(NAME_KEY) ?? "";
}

export function saveReviewerName(name: string) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(NAME_KEY, name);
}
