import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react({ jsxRuntime: "automatic" })],
    esbuild: {
      jsx: "automatic",
      jsxDev: false,
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
});
