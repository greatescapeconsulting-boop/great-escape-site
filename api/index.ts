import "dotenv/config";
import { createApp } from "../server/_core/app";

// Vercel treats any exported Express app (a (req, res) handler) in /api as a
// serverless function. All /api/* requests are routed here — see
// vercel.json for the rewrite rule.
const app = createApp();

export default app;
