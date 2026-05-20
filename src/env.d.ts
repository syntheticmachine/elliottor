/// <reference types="vite/client" />

// Build-time-injected git short-hash, defined in vite.config.ts via
// the `define` option. Use as a deploy / cache-bust indicator.
declare const __APP_VERSION__: string;
