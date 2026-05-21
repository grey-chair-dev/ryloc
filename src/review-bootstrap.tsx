import { createRoot } from "react-dom/client";
import { getReviewFlags } from "@/lib/content";
import { getOpenFlags, isReviewFlagsUiEnabled } from "@/lib/review-flags";
import { ReviewFlagsProvider } from "@/components/review/ReviewFlagsContext";
import { ReviewFlagsChrome } from "@/components/review/ReviewFlagsChrome";
import { ReviewPageExtras } from "@/components/review/ReviewPageExtras";
import { ReviewStaticAnchors } from "@/components/review/ReviewStaticAnchors";
import { getSitePathname } from "@/lib/site-pathname";

function ReviewBootstrap() {
  const reviewOn = isReviewFlagsUiEnabled();
  const reviewFlags = reviewOn ? getOpenFlags(getReviewFlags()) : [];
  const pathname = getSitePathname();

  return (
    <ReviewFlagsProvider featureEnabled={reviewOn} openFlags={reviewFlags}>
      <ReviewFlagsChrome flags={reviewFlags} />
      <ReviewStaticAnchors flags={reviewFlags} pathname={pathname} />
      <ReviewPageExtras flags={reviewFlags} pathname={pathname} />
    </ReviewFlagsProvider>
  );
}

const root = document.getElementById("review-root");
if (root) {
  createRoot(root).render(<ReviewBootstrap />);
}
