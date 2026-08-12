import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { createSessionToken, verifyPassword } from "./_core/auth";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createCaseStudy,
  createFaq,
  createLead,
  createTestimonial,
  deleteCaseStudy,
  deleteFaq,
  deleteTestimonial,
  getLeadById,
  getUserByEmail,
  listCaseStudies,
  listFaqs,
  listLeads,
  listTestimonials,
  touchLastSignedIn,
  updateCaseStudy,
  updateFaq,
  updateLeadNotes,
  updateLeadStatus,
  updateTestimonial,
} from "./db";

function adminProcedure() {
  return protectedProcedure.use(({ ctx, next }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }
    return next({ ctx });
  });
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),

    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const user = await getUserByEmail(input.email.toLowerCase().trim());
        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
        }

        const validPassword = await verifyPassword(input.password, user.passwordHash);
        if (!validPassword) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
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
      return { success: true } as const;
    }),
  }),

  // ─── Public content ────────────────────────────────────────────────────────

  content: router({
    caseStudies: publicProcedure.query(() => listCaseStudies(true)),
    faqs: publicProcedure.query(() => listFaqs(true)),
    testimonials: publicProcedure.query(() => listTestimonials(true)),
  }),

  // ─── Lead submission ───────────────────────────────────────────────────────

  leads: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          company: z.string().optional(),
          website: z.string().optional(),
          industry: z.string().optional(),
          referralSource: z.string().optional(),
          promptedBy: z.string().optional(),
          learningGoal: z.string().optional(),
          sourcePage: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createLead(input);
        return { success: true };
      }),

    list: adminProcedure()
      .query(() => listLeads()),

    get: adminProcedure()
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const lead = await getLeadById(input.id);
        if (!lead) throw new TRPCError({ code: "NOT_FOUND" });
        return lead;
      }),

    updateStatus: adminProcedure()
      .input(z.object({ id: z.number(), status: z.enum(["new", "contacted", "qualified", "closed"]) }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status);
        return { success: true };
      }),

    updateNotes: adminProcedure()
      .input(z.object({ id: z.number(), notes: z.string() }))
      .mutation(async ({ input }) => {
        await updateLeadNotes(input.id, input.notes);
        return { success: true };
      }),

    exportAll: adminProcedure()
      .query(() => listLeads()),
  }),

  // ─── Admin content management ──────────────────────────────────────────────

  admin: router({
    // Case Studies
    caseStudies: router({
      list: adminProcedure().query(() => listCaseStudies()),
      create: adminProcedure()
        .input(
          z.object({
            title: z.string().min(1),
            summary: z.string().optional(),
            challenge: z.string().optional(),
            strategy: z.string().optional(),
            actionsTaken: z.string().optional(),
            results: z.string().optional(),
            mediaUrl: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await createCaseStudy(input);
          return { success: true };
        }),
      update: adminProcedure()
        .input(
          z.object({
            id: z.number(),
            title: z.string().min(1).optional(),
            summary: z.string().optional(),
            challenge: z.string().optional(),
            strategy: z.string().optional(),
            actionsTaken: z.string().optional(),
            results: z.string().optional(),
            mediaUrl: z.string().optional(),
            published: z.boolean().optional(),
            sortOrder: z.number().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateCaseStudy(id, data);
          return { success: true };
        }),
      delete: adminProcedure()
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteCaseStudy(input.id);
          return { success: true };
        }),
    }),

    // FAQs
    faqs: router({
      list: adminProcedure().query(() => listFaqs()),
      create: adminProcedure()
        .input(
          z.object({
            question: z.string().min(1),
            answer: z.string().min(1),
            category: z.string().optional(),
            sortOrder: z.number().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await createFaq(input);
          return { success: true };
        }),
      update: adminProcedure()
        .input(
          z.object({
            id: z.number(),
            question: z.string().optional(),
            answer: z.string().optional(),
            category: z.string().optional(),
            sortOrder: z.number().optional(),
            published: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateFaq(id, data);
          return { success: true };
        }),
      delete: adminProcedure()
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteFaq(input.id);
          return { success: true };
        }),
    }),

    // Testimonials
    testimonials: router({
      list: adminProcedure().query(() => listTestimonials()),
      create: adminProcedure()
        .input(
          z.object({
            clientName: z.string().min(1),
            organization: z.string().optional(),
            industry: z.string().optional(),
            testimonial: z.string().min(1),
          })
        )
        .mutation(async ({ input }) => {
          await createTestimonial(input);
          return { success: true };
        }),
      update: adminProcedure()
        .input(
          z.object({
            id: z.number(),
            clientName: z.string().optional(),
            organization: z.string().optional(),
            industry: z.string().optional(),
            testimonial: z.string().optional(),
            published: z.boolean().optional(),
            sortOrder: z.number().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateTestimonial(id, data);
          return { success: true };
        }),
      delete: adminProcedure()
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteTestimonial(input.id);
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
