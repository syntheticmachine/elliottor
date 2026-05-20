import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Inject the current git short-hash as __APP_VERSION__ at build time so
// the footer can display a unique tag per deploy. Falls back to 'dev'
// when git isn't available (shouldn't happen on Netlify, which clones
// the full repo).
function gitShortHash(): string {
  try {
    return execSync('git rev-parse --short HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    return 'dev';
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(gitShortHash()),
  },
});
