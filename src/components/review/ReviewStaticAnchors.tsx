"use client";

import { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ReviewFlag } from "@/lib/review-flags";
import {
  flagsForAnchor,
  flagsForPagePanel,
  parseReviewHref,
} from "@/lib/review-flags";
import { useReviewFlags } from "@/components/review/ReviewFlagsContext";
import { ReviewPagePanel } from "@/components/review/ReviewPagePanel";

type ReviewStaticAnchorsProps = {
  flags: ReviewFlag[];
  pathname: string;
};

type MountRecord = { host: HTMLElement; root: Root; anchorId: string };

const PANEL_LABELS: Record<string, string> = {
  story: "About",
  "story-review": "About",
  "page-review": "This page",
  form: "Contact",
  info: "Contact",
  "contact-review": "Contact",
  featured: "Featured",
  upcoming: "Upcoming",
  merchandise: "Merchandise",
  newsletter: "Newsletter",
  "hero-review": "Hero",
  "project-form": "Engineering form",
  "project-form-review": "Engineering form",
};

function panelLabel(target: HTMLElement): string {
  return PANEL_LABELS[target.id] ?? target.getAttribute("aria-label") ?? "This section";
}

function mountFlags(target: HTMLElement, matched: ReviewFlag[]): MountRecord {
  const host = document.createElement("div");
  const innerSlot = target.dataset.reviewSlot === "inner";
  const label = panelLabel(target);
  const grid = matched.length > 1;

  host.className = [
    "review-flag-anchor-host",
    innerSlot ? "review-flag-anchor-host--inner" : "review-flag-anchor-host--before-section",
  ]
    .filter(Boolean)
    .join(" ");

  if (innerSlot) {
    target.appendChild(host);
  } else {
    target.parentNode?.insertBefore(host, target);
  }

  const root = createRoot(host);
  const panel = <ReviewPagePanel label={label} flags={matched} grid={grid} />;

  root.render(
    innerSlot ? (
      panel
    ) : (
      <div className="page-x mx-auto w-full max-w-4xl pb-4 md:max-w-6xl">{panel}</div>
    ),
  );

  return { host, root, anchorId: target.id };
}

function unmountAll(records: MountRecord[]) {
  for (const { host, root } of records) {
    root.unmount();
    host.remove();
  }
  records.length = 0;
}

export function ReviewStaticAnchors({ flags, pathname }: ReviewStaticAnchorsProps) {
  const { visible, hydrated } = useReviewFlags();
  const recordsRef = useRef<MountRecord[]>([]);
  const mountedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const records = recordsRef.current;
    const mountedIds = mountedIdsRef.current;

    function cleanup() {
      unmountAll(records);
      mountedIds.clear();
    }

    if (!visible || !hydrated) {
      cleanup();
      return;
    }

    function attachMissing() {
      const pageReview = document.getElementById("page-review");
      if (pageReview && !mountedIds.has("page-review")) {
        const pageFlags = flagsForPagePanel(flags, pathname);
        if (pageFlags.length > 0) {
          records.push(mountFlags(pageReview, pageFlags));
          mountedIds.add("page-review");
        }
      }

      const sectionFlags = flags.filter((flag) => {
        const { pathname: flagPath, hash } = parseReviewHref(flag.href);
        return flagPath === pathname && hash.length > 0;
      });

      const byHash = new Map<string, ReviewFlag[]>();
      for (const flag of sectionFlags) {
        const { hash } = parseReviewHref(flag.href);
        const list = byHash.get(hash) ?? [];
        list.push(flag);
        byHash.set(hash, list);
      }

      for (const [, hashFlags] of byHash) {
        const { hash } = parseReviewHref(hashFlags[0].href);
        if (mountedIds.has(hash)) continue;

        const target = document.getElementById(hash);
        if (!target) continue;
        if (target.querySelector(".review-flag-anchor-host")) {
          mountedIds.add(hash);
          continue;
        }

        const matched = hashFlags.filter(
          (flag) => flagsForAnchor(flags, { flagIds: [flag.id] }).length > 0,
        );
        if (matched.length === 0) continue;

        records.push(mountFlags(target, matched));
        mountedIds.add(hash);
      }

      document.querySelectorAll("[data-review-flag-ids]").forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        const anchorId = `data-ids:${el.getAttribute("data-review-flag-ids") ?? ""}`;
        if (mountedIds.has(anchorId)) return;
        if (el.querySelector(".review-flag-anchor-host")) {
          mountedIds.add(anchorId);
          return;
        }

        const raw = el.getAttribute("data-review-flag-ids");
        if (!raw) return;
        const flagIds = raw.split(",").map((id) => id.trim()).filter(Boolean);
        const matched = flagsForAnchor(flags, { flagIds });
        if (matched.length === 0) return;

        records.push(mountFlags(el, matched));
        mountedIds.add(anchorId);
      });
    }

    attachMissing();

    const app = document.getElementById("app");
    if (!app) return cleanup;

    const observer = new MutationObserver(() => {
      attachMissing();
    });
    observer.observe(app, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [flags, pathname, visible, hydrated]);

  return null;
}
