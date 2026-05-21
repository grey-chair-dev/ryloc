"use client";

import { useEffect, useState } from "react";
import type { ReviewFlag } from "@/lib/review-flags";
import {
  reviewFlagElementId,
  reviewPriorityClass,
  reviewPriorityLabel,
} from "@/components/review/review-flags-ui";
import { isActionItem } from "@/lib/review-flags";
import { useReviewFlags } from "@/components/review/ReviewFlagsContext";
import {
  loadReviewDrafts,
  saveReviewDraft,
} from "@/lib/review-comments-storage";
import { cn } from "@/lib/utils";

type ReviewFlagCardProps = {
  flag: ReviewFlag;
  compact?: boolean;
  variant?: "default" | "inline";
};

export function ReviewFlagCard({
  flag,
  compact = false,
  variant = "default",
}: ReviewFlagCardProps) {
  const inline = variant === "inline";
  const { reviewerName } = useReviewFlags();
  const [comment, setComment] = useState("");
  const [noChangeRequired, setNoChangeRequired] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  useEffect(() => {
    const drafts = loadReviewDrafts();
    const draft = drafts[flag.id];
    setComment(draft?.comment ?? "");
    setNoChangeRequired(draft?.noChangeRequired ?? false);
    setSubmittedAt(draft?.submittedAt ?? null);
  }, [flag.id]);

  useEffect(() => {
    saveReviewDraft(flag.id, {
      comment: noChangeRequired ? "" : comment,
      noChangeRequired,
      submittedAt: submittedAt ?? undefined,
    });
  }, [flag.id, comment, noChangeRequired, submittedAt]);

  const canSubmit = noChangeRequired || comment.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/review-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flagId: flag.id,
          question: flag.question,
          reviewerName,
          comment: noChangeRequired ? undefined : comment,
          noChangeRequired,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      const json = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || !json.success) {
        setStatus("error");
        setMessage(json.message ?? "Something went wrong. Please try again.");
        return;
      }

      const sentAt = new Date().toISOString();
      setSubmittedAt(sentAt);
      saveReviewDraft(flag.id, {
        comment: noChangeRequired ? "" : comment,
        noChangeRequired,
        submittedAt: sentAt,
      });
      setStatus("success");
      setMessage(
        json.message ??
          (isActionItem(flag) ? "Your response was sent to Will." : "Your answer was sent."),
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  function handleNoChangeChange(checked: boolean) {
    setNoChangeRequired(checked);
    if (checked) setComment("");
  }

  return (
    <li
      id={reviewFlagElementId(flag.id)}
      className={cn(
        "scroll-mt-28 rounded-xl border-2",
        inline
          ? "border border-amber-500/30 bg-neutral-950/90 shadow-sm"
          : "border-dashed border-secondary/50 bg-secondary/5",
        compact || inline ? "p-3 sm:p-4" : "p-5",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-secondary">Review</span>
        {isActionItem(flag) ? (
          <span className="inline-flex items-center rounded-full border border-secondary/50 bg-surface px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
            Action item
          </span>
        ) : null}
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            reviewPriorityClass[flag.priority],
          )}
        >
          {reviewPriorityLabel[flag.priority]}
        </span>
        {!compact ? (
          <span className="text-[10px] font-medium uppercase tracking-wider text-on-surface-variant">
            {flag.page}
          </span>
        ) : null}
      </div>

      <p
        className={cn(
          "mt-2 font-medium text-on-surface",
          compact ? "text-sm leading-snug" : "text-base leading-relaxed",
        )}
      >
        {flag.question}
      </p>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "mt-3 space-y-3 border-t border-secondary/20",
          compact ? "pt-3" : "mt-4 pt-4",
        )}
      >
        <label
          className={cn(
            "flex cursor-pointer gap-3 rounded-lg border-2 px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5",
            inline
              ? "border-neutral-600 bg-neutral-900 has-[:checked]:bg-amber-500/10"
              : "border-outline-variant/80 bg-surface",
          )}
        >
          <input
            type="checkbox"
            checked={noChangeRequired}
            onChange={(e) => handleNoChangeChange(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          <span className="text-sm leading-snug text-on-surface">
            <strong className="font-semibold">No change needed</strong> — looks good to me
          </span>
        </label>

        {!noChangeRequired ? (
          <div>
            <label
              htmlFor={`${flag.id}-comment`}
              className="text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant"
            >
              Your answer
            </label>
            <textarea
              id={`${flag.id}-comment`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={compact ? 3 : 4}
              placeholder="Type your answer here (yes/no is fine, or explain what should change)…"
              className={cn(
                "mt-1 w-full resize-y rounded-lg border-2 px-3 py-2 text-sm focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                inline
                  ? "border-neutral-600 bg-neutral-900 text-white placeholder:text-neutral-500"
                  : "border-outline-variant bg-surface text-on-surface placeholder:text-on-surface-variant/60",
              )}
            />
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === "loading" || !canSubmit}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-[filter,transform] hover:brightness-110 active:scale-[0.98] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {status === "loading" ? "Sending…" : noChangeRequired ? "Send — no change" : "Send answer"}
          </button>
          {submittedAt ? (
            <span className="text-xs font-medium text-primary">
              Last sent {new Date(submittedAt).toLocaleString()}
            </span>
          ) : (
            <span className="text-xs text-on-surface-variant">Your choices are saved on this device</span>
          )}
        </div>

        {message ? (
          <p
            role="status"
            className={cn(
              "text-sm font-medium",
              status === "success" ? "text-primary" : "text-error",
            )}
          >
            {message}
          </p>
        ) : null}
      </form>
    </li>
  );
}
