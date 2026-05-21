"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReviewFlag } from "@/lib/review-flags";
import {
  DEFAULT_REVIEWER_NAME,
  loadReviewerName,
  saveReviewerName,
} from "@/lib/review-comments-storage";

const VISIBILITY_KEY = "gc-review-flags-visible";

type ReviewFlagsContextValue = {
  featureEnabled: boolean;
  visible: boolean;
  hydrated: boolean;
  openFlags: ReviewFlag[];
  reviewerName: string;
  setReviewerName: (name: string) => void;
  toggle: () => void;
  show: () => void;
  hide: () => void;
};

const ReviewFlagsContext = createContext<ReviewFlagsContextValue | null>(null);

export function ReviewFlagsProvider({
  children,
  featureEnabled,
  openFlags,
}: {
  children: React.ReactNode;
  featureEnabled: boolean;
  openFlags: ReviewFlag[];
}) {
  const [visible, setVisible] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [reviewerName, setReviewerNameState] = useState(DEFAULT_REVIEWER_NAME);

  useEffect(() => {
    const stored = window.localStorage.getItem(VISIBILITY_KEY);
    setVisible(stored === null ? true : stored === "true");
    const savedName = loadReviewerName().trim();
    setReviewerNameState(savedName || DEFAULT_REVIEWER_NAME);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(VISIBILITY_KEY, visible ? "true" : "false");
  }, [visible, hydrated]);

  useEffect(() => {
    if (!featureEnabled) return;
    document.body.classList.toggle("gc-review-visible", visible && hydrated);
    return () => document.body.classList.remove("gc-review-visible");
  }, [featureEnabled, visible, hydrated]);

  const setReviewerName = useCallback((name: string) => {
    setReviewerNameState(name);
    saveReviewerName(name);
  }, []);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const toggle = useCallback(() => setVisible((current) => !current), []);

  const value = useMemo(
    () => ({
      featureEnabled,
      visible: featureEnabled && hydrated && visible,
      hydrated,
      openFlags,
      reviewerName,
      setReviewerName,
      toggle,
      show,
      hide,
    }),
    [featureEnabled, hydrated, visible, openFlags, reviewerName, setReviewerName, toggle, show, hide],
  );

  return (
    <ReviewFlagsContext.Provider value={value}>{children}</ReviewFlagsContext.Provider>
  );
}

export function useReviewFlags() {
  const context = useContext(ReviewFlagsContext);
  if (!context) {
    return {
      featureEnabled: false,
      visible: false,
      hydrated: true,
      openFlags: [] as ReviewFlag[],
      reviewerName: DEFAULT_REVIEWER_NAME,
      setReviewerName: () => {},
      toggle: () => {},
      show: () => {},
      hide: () => {},
    };
  }
  return context;
}
