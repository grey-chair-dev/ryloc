import { createRoot } from "react-dom/client";
import { getReviewFlags } from "@/lib/content";
import { getOpenFlags, isReviewFlagsUiEnabled } from "@/lib/review-flags";
import { ReviewFlagsProvider } from "@/components/review/ReviewFlagsContext";
import { ReviewFlagsChrome } from "@/components/review/ReviewFlagsChrome";
import { ReviewGate } from "@/components/review/ReviewGate";
import { ReviewPage } from "@/components/review/ReviewPage";

function ReviewApp() {
  const reviewOn = isReviewFlagsUiEnabled();
  const reviewFlags = reviewOn ? getOpenFlags(getReviewFlags()) : [];

  return (
    <ReviewFlagsProvider featureEnabled={reviewOn} openFlags={reviewFlags}>
      <div className="min-h-screen bg-black text-white">
        <ReviewFlagsChrome flags={reviewFlags} />
        <ReviewGate>
          <ReviewPage review={getReviewFlags()} />
        </ReviewGate>
      </div>
    </ReviewFlagsProvider>
  );
}

const root = document.getElementById("review-app");
if (root) {
  createRoot(root).render(<ReviewApp />);
}
