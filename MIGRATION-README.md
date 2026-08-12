# Great Escape Consulting — migrated off Manus

This project was exported from Manus and reworked to run independently:
Postgres instead of Manus-hosted MySQL, email/password admin login instead
of "Sign in with Manus," and no dependency on Manus's backend services.

## What changed

- **Database**: Postgres (via Drizzle), designed for Vercel's native Neon
  integration. Schema is in `drizzle/schema.ts`.
- **Admin login**: plain email/password with bcrypt + JWT session cookies.
  No more OAuth redirect.
- **Removed**: Manus OAuth routes, the Forge notification/storage proxy,
  the Manus Vite plugins, and a few unused components that were never
  wired into any live page (`Map.tsx`, `AIChatBox.tsx`, `ManusDialog.tsx`,
  `ComponentShowcase.tsx`, `DashboardLayout.tsx`).
- **Vercel**: the Express/tRPC backend now runs as a serverless function
  at `api/index.ts`; `vercel.json` routes `/api/*` there and everything
  else to the built client (SPA fallback for client-side routing).

## ⚠️ One thing you need to do: add your images

Your logo and headshot were hosted on Manus's own storage, not included
in the export. The code now expects them at:

```
client/public/images/gec-logo.jpg
client/public/images/jason-headshot.jpg
```

Grab both from your live site (right-click → Save Image As, or however
Manus lets you download assets) and drop them in that folder before you
build. Any other images used the same way should go in the same folder —
search the codebase for `/images/` if you add more.

## First-time setup

1. **Push to GitHub**
   ```
   git init
   git add .
   git commit -m "Migrate off Manus: Postgres + email/password auth"
   git remote add origin <your-new-repo-url>
   git push -u origin main
   ```

2. **Create a Postgres database**
   In the Vercel dashboard: your project → Storage → connect a Postgres
   database (Neon-backed, native to Vercel). This auto-injects
   `DATABASE_URL` into your project's environment variables.

3. **Set the remaining env variable in Vercel**
   Project → Settings → Environment Variables:
   - `JWT_SECRET` — generate with `openssl rand -base64 32`

4. **Create the database tables**
   Locally, with `DATABASE_URL` set (copy it into a local `.env` file
   from Vercel's dashboard, or from your own Postgres provider):
   ```
   pnpm install
   pnpm db:push
   ```

5. **Create your admin login**
   ```
   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=your-password pnpm db:seed-admin
   ```
   Run this again any time to reset your password.

6. **Add your images** (see above), then deploy — Vercel will pick up
   the push automatically once the repo is connected.

7. **Verify**: visit `/admin`, log in with the credentials from step 5,
   and confirm the contact form (public) and admin panel (leads, case
   studies, FAQs, testimonials) both work end-to-end.

From here on, open this repo in Claude Code for ongoing edits — same
plain-English workflow you used with Manus, just running on your own
infrastructure.
