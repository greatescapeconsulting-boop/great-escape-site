// server/_core/app.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/routers.ts
import { TRPCError as TRPCError2 } from "@trpc/server";
import { z as z2 } from "zod";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/auth.ts
import bcrypt from "bcryptjs";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";

// server/db.ts
import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// drizzle/schema.ts
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
var roleEnum = pgEnum("role", ["user", "admin"]);
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: text("name"),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in")
});
var leadStatusEnum = pgEnum("lead_status", ["new", "contacted", "qualified", "closed"]);
var leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }),
  website: varchar("website", { length: 500 }),
  industry: varchar("industry", { length: 255 }),
  referralSource: varchar("referral_source", { length: 255 }),
  promptedBy: text("prompted_by"),
  learningGoal: text("learning_goal"),
  sourcePage: varchar("source_page", { length: 255 }),
  status: leadStatusEnum("status").default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  summary: text("summary"),
  challenge: text("challenge"),
  strategy: text("strategy"),
  actionsTaken: text("actions_taken"),
  results: text("results"),
  mediaUrl: varchar("media_url", { length: 1e3 }),
  publishDate: timestamp("publish_date"),
  published: boolean("published").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 255 }),
  sortOrder: integer("sort_order").default(0).notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  organization: varchar("organization", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  testimonial: text("testimonial").notNull(),
  published: boolean("published").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// server/db.ts
var _db = null;
function getDb() {
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
async function getUserByEmail(email) {
  const db = getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
}
async function getUserById(id) {
  const db = getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}
async function touchLastSignedIn(id) {
  const db = getDb();
  if (!db) return;
  await db.update(users).set({ lastSignedIn: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
}
async function createLead(data) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(leads).values(data);
}
async function listLeads() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}
async function getLeadById(id) {
  const db = getDb();
  if (!db) return void 0;
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0];
}
async function updateLeadStatus(id, status) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(leads).set({ status }).where(eq(leads.id, id));
}
async function updateLeadNotes(id, notes) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(leads).set({ notes }).where(eq(leads.id, id));
}
async function listCaseStudies(publishedOnly = false) {
  const db = getDb();
  if (!db) return [];
  const query = db.select().from(caseStudies);
  if (publishedOnly) {
    return query.where(eq(caseStudies.published, true)).orderBy(asc(caseStudies.sortOrder));
  }
  return query.orderBy(asc(caseStudies.sortOrder));
}
async function createCaseStudy(data) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(caseStudies).values(data);
}
async function updateCaseStudy(id, data) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(caseStudies).set(data).where(eq(caseStudies.id, id));
}
async function deleteCaseStudy(id) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(caseStudies).where(eq(caseStudies.id, id));
}
async function listFaqs(publishedOnly = false) {
  const db = getDb();
  if (!db) return [];
  const query = db.select().from(faqs);
  if (publishedOnly) {
    return query.where(eq(faqs.published, true)).orderBy(asc(faqs.sortOrder));
  }
  return query.orderBy(asc(faqs.sortOrder));
}
async function createFaq(data) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(faqs).values(data);
}
async function updateFaq(id, data) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(faqs).set(data).where(eq(faqs.id, id));
}
async function deleteFaq(id) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(faqs).where(eq(faqs.id, id));
}
async function listTestimonials(publishedOnly = false) {
  const db = getDb();
  if (!db) return [];
  const query = db.select().from(testimonials);
  if (publishedOnly) {
    return query.where(eq(testimonials.published, true)).orderBy(asc(testimonials.sortOrder));
  }
  return query.orderBy(asc(testimonials.sortOrder));
}
async function createTestimonial(data) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(testimonials).values(data);
}
async function updateTestimonial(id, data) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}
async function deleteTestimonial(id) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// server/_core/env.ts
var ENV = {
  jwtSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production"
};

// server/_core/auth.ts
function getSessionSecret() {
  if (!ENV.jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(ENV.jwtSecret);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
async function createSessionToken(payload) {
  const issuedAt = Date.now();
  const expirationSeconds = Math.floor((issuedAt + ONE_YEAR_MS) / 1e3);
  const secretKey = getSessionSecret();
  return new SignJWT({ userId: payload.userId, email: payload.email }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
}
async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const secretKey = getSessionSecret();
    const { payload } = await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
    const { userId, email } = payload;
    if (typeof userId !== "number" || typeof email !== "string") {
      return null;
    }
    return { userId, email };
  } catch (error) {
    console.warn("[Auth] Session verification failed", String(error));
    return null;
  }
}
function parseCookies(cookieHeader) {
  if (!cookieHeader) return /* @__PURE__ */ new Map();
  const parsed = parseCookieHeader(cookieHeader);
  return new Map(Object.entries(parsed));
}
function getSessionTokenFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies.get(COOKIE_NAME);
  if (cookieToken) return cookieToken;
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return void 0;
}
async function authenticateRequest(req) {
  const token = getSessionTokenFromRequest(req);
  const session = await verifySessionToken(token);
  if (!session) {
    throw ForbiddenError("Invalid or missing session");
  }
  const user = await getUserById(session.userId);
  if (!user) {
    throw ForbiddenError("User not found");
  }
  return user;
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: isSecureRequest(req)
  };
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  }))
});

// server/routers.ts
function adminProcedure2() {
  return protectedProcedure.use(({ ctx, next }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: "Admin access required" });
    }
    return next({ ctx });
  });
}
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    login: publicProcedure.input(
      z2.object({
        email: z2.string().email(),
        password: z2.string().min(1)
      })
    ).mutation(async ({ input, ctx }) => {
      const user = await getUserByEmail(input.email.toLowerCase().trim());
      if (!user) {
        throw new TRPCError2({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }
      const validPassword = await verifyPassword(input.password, user.passwordHash);
      if (!validPassword) {
        throw new TRPCError2({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }
      const sessionToken = await createSessionToken({ userId: user.id, email: user.email });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      await touchLastSignedIn(user.id);
      return { success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  // ─── Public content ────────────────────────────────────────────────────────
  content: router({
    caseStudies: publicProcedure.query(() => listCaseStudies(true)),
    faqs: publicProcedure.query(() => listFaqs(true)),
    testimonials: publicProcedure.query(() => listTestimonials(true))
  }),
  // ─── Lead submission ───────────────────────────────────────────────────────
  leads: router({
    submit: publicProcedure.input(
      z2.object({
        name: z2.string().min(1),
        email: z2.string().email(),
        company: z2.string().optional(),
        website: z2.string().optional(),
        industry: z2.string().optional(),
        referralSource: z2.string().optional(),
        promptedBy: z2.string().optional(),
        learningGoal: z2.string().optional(),
        sourcePage: z2.string().optional()
      })
    ).mutation(async ({ input }) => {
      await createLead(input);
      return { success: true };
    }),
    list: adminProcedure2().query(() => listLeads()),
    get: adminProcedure2().input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      const lead = await getLeadById(input.id);
      if (!lead) throw new TRPCError2({ code: "NOT_FOUND" });
      return lead;
    }),
    updateStatus: adminProcedure2().input(z2.object({ id: z2.number(), status: z2.enum(["new", "contacted", "qualified", "closed"]) })).mutation(async ({ input }) => {
      await updateLeadStatus(input.id, input.status);
      return { success: true };
    }),
    updateNotes: adminProcedure2().input(z2.object({ id: z2.number(), notes: z2.string() })).mutation(async ({ input }) => {
      await updateLeadNotes(input.id, input.notes);
      return { success: true };
    }),
    exportAll: adminProcedure2().query(() => listLeads())
  }),
  // ─── Admin content management ──────────────────────────────────────────────
  admin: router({
    // Case Studies
    caseStudies: router({
      list: adminProcedure2().query(() => listCaseStudies()),
      create: adminProcedure2().input(
        z2.object({
          title: z2.string().min(1),
          summary: z2.string().optional(),
          challenge: z2.string().optional(),
          strategy: z2.string().optional(),
          actionsTaken: z2.string().optional(),
          results: z2.string().optional(),
          mediaUrl: z2.string().optional()
        })
      ).mutation(async ({ input }) => {
        await createCaseStudy(input);
        return { success: true };
      }),
      update: adminProcedure2().input(
        z2.object({
          id: z2.number(),
          title: z2.string().min(1).optional(),
          summary: z2.string().optional(),
          challenge: z2.string().optional(),
          strategy: z2.string().optional(),
          actionsTaken: z2.string().optional(),
          results: z2.string().optional(),
          mediaUrl: z2.string().optional(),
          published: z2.boolean().optional(),
          sortOrder: z2.number().optional()
        })
      ).mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateCaseStudy(id, data);
        return { success: true };
      }),
      delete: adminProcedure2().input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
        await deleteCaseStudy(input.id);
        return { success: true };
      })
    }),
    // FAQs
    faqs: router({
      list: adminProcedure2().query(() => listFaqs()),
      create: adminProcedure2().input(
        z2.object({
          question: z2.string().min(1),
          answer: z2.string().min(1),
          category: z2.string().optional(),
          sortOrder: z2.number().optional()
        })
      ).mutation(async ({ input }) => {
        await createFaq(input);
        return { success: true };
      }),
      update: adminProcedure2().input(
        z2.object({
          id: z2.number(),
          question: z2.string().optional(),
          answer: z2.string().optional(),
          category: z2.string().optional(),
          sortOrder: z2.number().optional(),
          published: z2.boolean().optional()
        })
      ).mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateFaq(id, data);
        return { success: true };
      }),
      delete: adminProcedure2().input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
        await deleteFaq(input.id);
        return { success: true };
      })
    }),
    // Testimonials
    testimonials: router({
      list: adminProcedure2().query(() => listTestimonials()),
      create: adminProcedure2().input(
        z2.object({
          clientName: z2.string().min(1),
          organization: z2.string().optional(),
          industry: z2.string().optional(),
          testimonial: z2.string().min(1)
        })
      ).mutation(async ({ input }) => {
        await createTestimonial(input);
        return { success: true };
      }),
      update: adminProcedure2().input(
        z2.object({
          id: z2.number(),
          clientName: z2.string().optional(),
          organization: z2.string().optional(),
          industry: z2.string().optional(),
          testimonial: z2.string().optional(),
          published: z2.boolean().optional(),
          sortOrder: z2.number().optional()
        })
      ).mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateTestimonial(id, data);
        return { success: true };
      }),
      delete: adminProcedure2().input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      })
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/app.ts
function createApp() {
  const app2 = express();
  app2.use(express.json({ limit: "50mb" }));
  app2.use(express.urlencoded({ limit: "50mb", extended: true }));
  app2.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  return app2;
}

// server/_core/vercelEntry.ts
var app = createApp();
var vercelEntry_default = app;
export {
  vercelEntry_default as default
};
