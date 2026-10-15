import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The page is deployed under /hair/ on the existing site. Change `base` if the path differs.
export default defineConfig({ base: '/hair/', plugins: [react()] });
