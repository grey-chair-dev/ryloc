import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import {
  handleReviewCommentPost,
  handleReviewLaunchAccessPost,
} from "./src/lib/review-api.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/review-comments", async (req, res) => {
    const result = await handleReviewCommentPost(req);
    res.status(result.status).json(result.body);
  });

  app.post("/api/review-launch-access", async (req, res) => {
    const result = await handleReviewLaunchAccessPost(req);
    res.status(result.status).json(result.body);
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "mpa",
  });

  app.use((req, res, next) => {
    if (req.method !== "GET" || !req.url) return next();

    const [pathname, search = ""] = req.url.split("?");
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/@") ||
      pathname.startsWith("/src/") ||
      pathname.includes(".")
    ) {
      return next();
    }

    const htmlPath =
      pathname === "/" || pathname === ""
        ? "/index.html"
        : `${pathname}.html`;
    req.url = search ? `${htmlPath}?${search}` : htmlPath;
    next();
  });

  app.use(vite.middlewares);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
