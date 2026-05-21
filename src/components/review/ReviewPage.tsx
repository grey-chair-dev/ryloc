import type { ReviewFlagsContent } from "@/lib/content";
import { ReviewFlagList } from "@/components/review/ReviewFlagList";
import { partitionReviewFlags } from "@/lib/review-flags";

export function ReviewPage({ review }: { review: ReviewFlagsContent }) {
  const open = review.flags.filter((flag) => flag.status === "open");
  const resolved = review.flags.filter((flag) => flag.status !== "open");
  const { actionItems: openActionItems, questions: openQuestions } = partitionReviewFlags(open);

  const byPage = openQuestions.reduce<Record<string, typeof openQuestions>>((acc, flag) => {
    const key = flag.page;
    acc[key] = acc[key] ?? [];
    acc[key].push(flag);
    return acc;
  }, {});

  return (
    <div className="page-x mx-auto max-w-[800px] py-12 md:py-16">
      <p className="type-label-lg text-secondary">For leadership review · not on the main menu</p>
      <h1 className="type-headline-lg mt-2 text-primary">{review.title}</h1>
      <p className="type-body-lg mt-4 text-on-surface-variant">{review.intro}</p>

      <p className="mt-6 rounded-xl border border-outline-variant/50 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
        <strong className="text-on-surface">{open.length}</strong> item
        {open.length === 1 ? "" : "s"} still need your answer
        {openActionItems.length > 0 ? (
          <>
            {" "}
            (including <strong className="text-on-surface">{openActionItems.length}</strong> action
            {openActionItems.length === 1 ? "" : "s"})
          </>
        ) : null}
        {resolved.length > 0 ? (
          <>
            {" "}
            · <strong className="text-on-surface">{resolved.length}</strong> already finished
          </>
        ) : null}
        . The same questions also appear in yellow boxes as you browse the website.
      </p>

      {openActionItems.length > 0 ? (
        <section className="mt-10" aria-labelledby="review-action-items">
          <h2
            id="review-action-items"
            className="type-headline-sm border-b border-secondary/40 pb-3 text-on-surface"
          >
            Action items
          </h2>
          {"actionItemsIntro" in review && review.actionItemsIntro ? (
            <p className="mt-3 text-sm text-on-surface-variant">{review.actionItemsIntro}</p>
          ) : null}
          <div className="mt-4">
            <ReviewFlagList flags={openActionItems} />
          </div>
        </section>
      ) : null}

      {openQuestions.length > 0 ? (
        <div className="mt-10 space-y-10">
          <h2 className="type-headline-sm text-on-surface">Questions by page</h2>
          {Object.entries(byPage).map(([page, flags]) => (
            <section key={page} aria-labelledby={`review-${page.replace(/\s+/g, "-")}`}>
              <h3
                id={`review-${page.replace(/\s+/g, "-")}`}
                className="type-headline-sm border-b border-outline-variant/40 pb-3 text-on-surface"
              >
                {page}
              </h3>
              <div className="mt-4">
                <ReviewFlagList flags={flags} />
              </div>
            </section>
          ))}
        </div>
      ) : null}

      {resolved.length > 0 ? (
        <section className="mt-12 border-t border-outline-variant/40 pt-10">
          <h2 className="type-headline-sm text-on-surface-variant">Already finished</h2>
          <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
            {resolved.map((flag) => (
              <li key={flag.id}>
                <span className="line-through opacity-70">{flag.question}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
