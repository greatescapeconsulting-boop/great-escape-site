import { createApp } from "./app";

// This file is the source for the bundled api/index.js Vercel Function.
// It's bundled (not just transpiled) because Vercel's Node runtime uses
// Node's native ESM loader, which requires explicit file extensions on
// every relative import and doesn't understand TypeScript path aliases
// (@shared/*). Bundling inlines everything into one file, sidestepping
// that entirely. Run `npm run build:api` after changing any server code
// to regenerate api/index.js.
const app = createApp();

export default app;
