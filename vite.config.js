import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AboutMe/', // ← nome do seu repositório aqui!
  build: {
    outDir: 'docs',        // ← GitHub Pages só aceita root ou docs/
  },
});
