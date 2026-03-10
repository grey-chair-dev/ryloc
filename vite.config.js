import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        parts: resolve(__dirname, 'parts.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        engineering: resolve(__dirname, 'engineering.html'),
        product: resolve(__dirname, 'product.html'),
        thankyou: resolve(__dirname, 'thank-you.html'),
      },
    },
  },
})
