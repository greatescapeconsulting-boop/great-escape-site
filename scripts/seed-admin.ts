/**
 * One-time script to create (or update) your admin login.
 *
 * Usage:
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=your-password pnpm db:seed-admin
 *
 * Requires DATABASE_URL to be set (e.g. in a local .env file).
 */
import "dotenv/config";
import { hashPassword } from "../server/_core/auth";
import { getUserByEmail, createUser, getDb } from "../server/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function main() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables and re-run.");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const existing = await getUserByEmail(email);

  if (existing) {
    const db = getDb();
    if (!db) throw new Error("Database not available");
    await db.update(users).set({ passwordHash, role: "admin" }).where(eq(users.id, existing.id));
    console.log(`Updated existing admin user: ${email}`);
  } else {
    await createUser({ email, passwordHash, name: "Admin", role: "admin" });
    console.log(`Created admin user: ${email}`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
