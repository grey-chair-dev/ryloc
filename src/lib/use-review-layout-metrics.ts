import { useEffect } from "react";

/** Syncs --gc-nav-height and optional --gc-review-chrome-h from live DOM measurements. */
export function useReviewLayoutMetrics(chromeEl: HTMLElement | null) {
  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (!nav) return;

    const update = () => {
      const navH = nav.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--gc-nav-height",
        `${Math.ceil(navH)}px`,
      );

      if (chromeEl) {
        const chromeH = chromeEl.getBoundingClientRect().height;
        document.documentElement.style.setProperty(
          "--gc-review-chrome-h",
          `${Math.ceil(chromeH)}px`,
        );
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(nav);
    if (chromeEl) ro.observe(chromeEl);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [chromeEl]);
}
