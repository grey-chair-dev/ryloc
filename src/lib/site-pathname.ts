/** Map static .html URLs to review-flag href paths (e.g. /index.html → /). */
export function getSitePathname(): string {
  if (typeof window === "undefined") return "/";

  let path = window.location.pathname;

  if (path.endsWith("/index.html")) {
    return path.slice(0, -"/index.html".length) || "/";
  }

  if (path.endsWith("/review.html")) {
    return "/review";
  }

  if (path.endsWith(".html")) {
    const base = path.slice(0, -".html".length);
    return base || "/";
  }

  return path || "/";
}
