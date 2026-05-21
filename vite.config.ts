import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.VITE_SHOW_REVIEW_FLAGS": JSON.stringify(
        env.VITE_SHOW_REVIEW_FLAGS ?? (mode === "development" ? "true" : ""),
      ),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          parts: path.resolve(__dirname, "parts.html"),
          about: path.resolve(__dirname, "about.html"),
          contact: path.resolve(__dirname, "contact.html"),
          engineering: path.resolve(__dirname, "engineering.html"),
          product: path.resolve(__dirname, "product.html"),
          thankyou: path.resolve(__dirname, "thank-you.html"),
          review: path.resolve(__dirname, "review.html"),
        },
      },
    },
  };
});
