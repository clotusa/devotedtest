import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Ensures relative asset paths work on GitHub Pages subpaths & Vercel
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
