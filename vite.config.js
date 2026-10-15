import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production site lives under /hair/ on the existing domain.
// `vite build --mode ghpages` builds for the GitHub Pages project URL instead (see "deploy" script).
const GH_REPO = 'Grohair-kovilambakkam-hair';

export default defineConfig(({ mode }) => ({
  base: mode === 'ghpages' ? `/${GH_REPO}/` : '/hair/',
  plugins: [react()],
}));
