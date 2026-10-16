import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Production site lives under /hair/ on the existing domain.
// `vite build --mode ghpages` builds for the GitHub Pages project URL instead (see "deploy" script).
const GH_REPO = 'Grohair-kovilambakkam-hair';

export default defineConfig(({ mode }) => ({
  base: mode === 'ghpages' ? `/${GH_REPO}/` : '/hair/',
  plugins: [
    react(),
    {
      // Static hosts (GitHub Pages) serve 404.html for unknown paths like /concerns; reuse the SPA shell.
      name: 'spa-404-fallback',
      apply: 'build',
      closeBundle() {
        const index = resolve('dist/index.html');
        if (existsSync(index)) copyFileSync(index, resolve('dist/404.html'));
      },
    },
  ],
}));
