import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Relative asset paths for GitHub Pages and Vercel
  build: {
    outDir: 'docs', // Builds compiled production assets into /docs for GitHub Pages
  },
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
