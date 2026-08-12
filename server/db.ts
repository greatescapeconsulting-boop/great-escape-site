import { and, asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  CaseStudy,
  Faq,
  InsertCaseStudy,
  InsertFaq,
  InsertLead,
  InsertTestimonial,
  InsertUser,
  Lead,
  Testimonial,
  User,
  caseStudies,
  faqs,
  leads,
  testimonials,
  users,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      console.warn("[Database] DATABASE_URL is not set");
      return null;
    }
    const sql = neon(process.env.DATABASE_URL);
    _db = drizzle(sql);
  }
  return _db;
}

// ─── Users / auth ───────────────────────────────────────────────────────────

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function createUser(data: InsertUser): Promise<User> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(users).values(data).returning();
  return result[0];
}

export async function touchLastSignedIn(id: number): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, id));
}

// ─── Leads ───────────────────────────────────────────────────────────────────

export async function createLead(data: InsertLead): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(leads).values(data);
}

export async function listLeads(): Promise<Lead[]> {
  const db = getDb();
  if (!db) return [];
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function getLeadById(id: number): Promise<Lead | undefined> {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0];
}

export async function updateLeadStatus(id: number, status: Lead["status"]): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(leads).set({ status }).where(eq(leads.id, id));
}

export async function updateLeadNotes(id: number, notes: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(leads).set({ notes }).where(eq(leads.id, id));
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

export async function listCaseStudies(publishedOnly = false): Promise<CaseStudy[]> {
  const db = getDb();
  if (!db) return [];
  const query = db.select().from(caseStudies);
  if (publishedOnly) {
    return query.where(eq(caseStudies.published, true)).orderBy(asc(caseStudies.sortOrder));
  }
  return query.orderBy(asc(caseStudies.sortOrder));
}

export async function createCaseStudy(data: InsertCaseStudy): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(caseStudies).values(data);
}

export async function updateCaseStudy(
  id: number,
  data: Partial<InsertCaseStudy>
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(caseStudies).set(data).where(eq(caseStudies.id, id));
}

export async function deleteCaseStudy(id: number): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(caseStudies).where(eq(caseStudies.id, id));
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export async function listFaqs(publishedOnly = false): Promise<Faq[]> {
  const db = getDb();
  if (!db) return [];
  const query = db.select().from(faqs);
  if (publishedOnly) {
    return query.where(eq(faqs.published, true)).orderBy(asc(faqs.sortOrder));
  }
  return query.orderBy(asc(faqs.sortOrder));
}

export async function createFaq(data: InsertFaq): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(faqs).values(data);
}

export async function updateFaq(id: number, data: Partial<InsertFaq>): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(faqs).set(data).where(eq(faqs.id, id));
}

export async function deleteFaq(id: number): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(faqs).where(eq(faqs.id, id));
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function listTestimonials(publishedOnly = false): Promise<Testimonial[]> {
  const db = getDb();
  if (!db) return [];
  const query = db.select().from(testimonials);
  if (publishedOnly) {
    return query.where(eq(testimonials.published, true)).orderBy(asc(testimonials.sortOrder));
  }
  return query.orderBy(asc(testimonials.sortOrder));
}

export async function createTestimonial(data: InsertTestimonial): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(testimonials).values(data);
}

export async function updateTestimonial(
  id: number,
  data: Partial<InsertTestimonial>
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}
