# Review flags — wire-up

## 1. `src/lib/content.ts`

```ts
import reviewData from "../../content/review-flags.json";
export type ReviewFlagsContent = typeof reviewData;
export function getReviewFlags() { return reviewData; }
```

Ensure `review-flags.ts` imports `getReviewFlags` / `ReviewFlagsContent`.

## 2. `SiteShell`

```tsx
import { getReviewFlags } from "@/lib/content";
import { getOpenFlags, isReviewFlagsUiEnabled } from "@/lib/review-flags";
import { ReviewFlagsProvider } from "@/components/review/ReviewFlagsContext";
import { ReviewFlagsChrome } from "@/components/review/ReviewFlagsChrome";
import { PageAnythingElseReview } from "@/components/review/PageAnythingElseReview";

const on = isReviewFlagsUiEnabled();
const flags = on ? getOpenFlags(getReviewFlags()) : [];

<ReviewFlagsProvider featureEnabled={on} openFlags={flags}>
  <ReviewFlagsChrome flags={flags} />
  <main>{children}<PageAnythingElseReview flags={flags} /></main>
</ReviewFlagsProvider>
```

## 3. Sections

```tsx
<ReviewFlagAnchor flags={getOpenReviewFlags()} flagIds={["flag-id"]}>
  <section id="section-id">…</section>
</ReviewFlagAnchor>
```

## 4. Env (same webhook every Grey Chair site)

```
VITE_SHOW_REVIEW_FLAGS=true
REVIEW_WEBHOOK_URL=<shared Make URL>
REVIEW_NOTIFICATION_EMAIL=projects@greychair.io
ACTION_ITEM_EMAIL=will@greychair.io
```

Copy `reviewCommentSchema` + `launchAccessSchema` from reference repo `validations.ts` if missing.

Preview: `/review` · production: `VITE_SHOW_REVIEW_FLAGS=false`
