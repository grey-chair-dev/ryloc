import { getReviewFlags, type ReviewFlagsContent } from "@/lib/content";

export type ReviewFlag = ReviewFlagsContent["flags"][number];

export function isActionItem(flag: ReviewFlag): boolean {
  return flag.kind === "action";
}

export function partitionReviewFlags(flags: ReviewFlag[]) {
  const actionItems: ReviewFlag[] = [];
  const questions: ReviewFlag[] = [];

  for (const flag of flags) {
    if (isActionItem(flag)) actionItems.push(flag);
    else questions.push(flag);
  }

  return { actionItems, questions };
}

export function isReviewFlagsUiEnabled(): boolean {
  if (process.env.VITE_SHOW_REVIEW_FLAGS === "false") return false;
  if (process.env.VITE_SHOW_REVIEW_FLAGS === "true") return true;
  return process.env.NODE_ENV === "development";
}

export function getOpenFlags(review: ReviewFlagsContent): ReviewFlag[] {
  return review.flags.filter((flag) => flag.status === "open");
}

export function getOpenReviewFlags(): ReviewFlag[] {
  return getOpenFlags(getReviewFlags());
}

export function parseReviewHref(href: string): { pathname: string; hash: string } {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return { pathname: href || "/", hash: "" };
  }
  return {
    pathname: href.slice(0, hashIndex) || "/",
    hash: href.slice(hashIndex + 1),
  };
}

/** Flags for the page bar (site-wide only; section flags use ReviewFlagAnchor). */
export function flagsForPageBar(flags: ReviewFlag[]): ReviewFlag[] {
  return flags.filter((flag) => flag.page === "Whole site");
}

export function isPageOtherFlag(flag: ReviewFlag): boolean {
  return flag.id.startsWith("page-other-");
}

/** Match a page-footer “anything else?” flag to the current URL. */
export function flagMatchesPathname(flag: ReviewFlag, pathname: string): boolean {
  if (!isPageOtherFlag(flag)) return false;
  const { pathname: flagPath } = parseReviewHref(flag.href);
  return flagPath === pathname;
}

export function getPageOtherFlagForPath(
  flags: ReviewFlag[],
  pathname: string,
): ReviewFlag | undefined {
  return flags.find((flag) => isPageOtherFlag(flag) && flagMatchesPathname(flag, pathname));
}

/** Page-top panel: pathname matches, no hash, not footer/other/review-only. */
export function flagsForPagePanel(flags: ReviewFlag[], pathname: string): ReviewFlag[] {
  return flags.filter((flag) => {
    if (isPageOtherFlag(flag)) return false;
    if (flag.page === "Footer") return false;
    const { pathname: flagPath, hash } = parseReviewHref(flag.href);
    if (hash.length > 0) return false;
    if (flagPath === "/review") return false;
    return flagPath === pathname;
  });
}

/** Flags pinned to a specific section (by id list or exact href). */
export function flagsForAnchor(
  flags: ReviewFlag[],
  options: { href?: string; flagIds?: string[] },
): ReviewFlag[] {
  if (options.flagIds?.length) {
    const ids = new Set(options.flagIds);
    return flags.filter((flag) => ids.has(flag.id));
  }

  if (!options.href) return [];

  const target = parseReviewHref(options.href);
  return flags.filter((flag) => {
    const flagTarget = parseReviewHref(flag.href);
    return (
      flagTarget.pathname === target.pathname &&
      flagTarget.hash === target.hash &&
      target.hash.length > 0
    );
  });
}
