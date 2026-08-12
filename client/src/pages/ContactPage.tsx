import { useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SeoHead from "@/components/SeoHead";

const industries = [
  "Real Estate / Realtor",
  "Winery / Craft Beverage",
  "Professional Services",
  "Retail / E-commerce",
  "Hospitality / Tourism",
  "Healthcare",
  "Other",
];

const referralSources = [
  "Google Search",
  "AI Search (ChatGPT, Perplexity, etc.)",
  "LinkedIn",
  "Referral from a colleague",
  "Social media",
  "Industry event or association",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  company: string;
  website: string;
  promptedBy: string;
  learningGoal: string;
  industry: string;
  referralSource: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => setError(true),
  });

  const onSubmit = (data: FormData) => {
    setError(false);
    submitLead.mutate(data);
  };

  return (
    <PageLayout>
      <SeoHead
        title="Contact | Great Escape Consulting"
        description="Start a conversation about your AI visibility situation. No pressure, no pitch — just an honest look at where you stand."
        canonicalPath="/contact"
      />

      <PageHero
        title="Start a Conversation"
        subtitle="No pressure, no pitch. Just an honest look at your situation."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="section-padding bg-white" aria-labelledby="contact-heading">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: what to expect */}
            <aside className="lg:col-span-2">
              <h2
                id="contact-heading"
                className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-4"
              >
                What to expect
              </h2>
              <div className="w-10 h-0.5 bg-[oklch(0.72_0.12_65)] mb-5 rounded-full" aria-hidden="true" />
              <div className="space-y-4 text-sm text-[oklch(0.45_0.03_60)] leading-relaxed">
                <p>
                  After you submit this form, Jason will review your information and reach out within
                  a few business days.
                </p>
                <p>
                  The first conversation is about understanding your situation — not selling you
                  something. If there's a good fit, we'll talk about what working together might look
                  like.
                </p>
                <p>
                  If your situation isn't one where Great Escape Consulting can genuinely help,
                  you'll hear that honestly.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src="/images/jason-headshot.jpg"
                  alt="Jason Kierstein"
                  className="w-12 h-12 rounded-full object-cover"
                  width="48"
                  height="48"
                />
                <div>
                  <p className="font-semibold text-[oklch(0.18_0.02_50)] text-sm">Jason Kierstein</p>
                  <p className="text-[oklch(0.55_0.03_60)] text-xs">Founder, Great Escape Consulting</p>
                </div>
              </div>
            </aside>

            {/* Right: form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-warm-gradient rounded-2xl p-10 border border-[oklch(0.88_0.02_70)] text-center">
                  <div className="w-12 h-12 rounded-full bg-[oklch(0.33_0.08_155)] flex items-center justify-center mx-auto mb-5">
                    <span className="text-white text-xl" aria-hidden="true">✓</span>
                  </div>
                  <h3 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                    Thank you for reaching out
                  </h3>
                  <p className="text-sm text-[oklch(0.45_0.03_60)] mb-6">
                    Your message has been received. Jason will review your information and be in touch
                    within a few business days.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-[oklch(0.33_0.08_155)] underline hover:no-underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                  aria-label="Contact form"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-[oklch(0.25_0.03_50)] mb-1.5 block"
                    >
                      Your name <span className="text-[oklch(0.55_0.245_27)] text-xs">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      className="w-full h-10 rounded-md border border-[oklch(0.82_0.02_70)] bg-white px-3 py-2 text-sm text-[oklch(0.25_0.03_50)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)] focus:border-[oklch(0.33_0.08_155)]"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-[oklch(0.55_0.245_27)] mt-1" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-[oklch(0.25_0.03_50)] mb-1.5 block"
                    >
                      Email address <span className="text-[oklch(0.55_0.245_27)] text-xs">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="w-full h-10 rounded-md border border-[oklch(0.82_0.02_70)] bg-white px-3 py-2 text-sm text-[oklch(0.25_0.03_50)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)] focus:border-[oklch(0.33_0.08_155)]"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                      })}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-[oklch(0.55_0.245_27)] mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-[oklch(0.25_0.03_50)] mb-1.5 block"
                    >
                      Business or company name{" "}
                      <span className="text-[oklch(0.55_0.245_27)] text-xs">*</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      className="w-full h-10 rounded-md border border-[oklch(0.82_0.02_70)] bg-white px-3 py-2 text-sm text-[oklch(0.25_0.03_50)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)] focus:border-[oklch(0.33_0.08_155)]"
                      aria-describedby={errors.company ? "company-error" : undefined}
                      {...register("company", { required: "Business name is required" })}
                    />
                    {errors.company && (
                      <p id="company-error" className="text-xs text-[oklch(0.55_0.245_27)] mt-1" role="alert">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label
                      htmlFor="website"
                      className="text-sm font-medium text-[oklch(0.25_0.03_50)] mb-1.5 flex items-center gap-1.5"
                    >
                      Website URL{" "}
                      <span className="text-[oklch(0.60_0.02_70)] font-normal">(optional)</span>
                    </label>
                    <input
                      id="website"
                      type="url"
                      placeholder="https://"
                      autoComplete="url"
                      className="w-full h-10 rounded-md border border-[oklch(0.82_0.02_70)] bg-white px-3 py-2 text-sm text-[oklch(0.25_0.03_50)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)] focus:border-[oklch(0.33_0.08_155)]"
                      {...register("website")}
                    />
                  </div>

                  {/* Prompted by */}
                  <div>
                    <label
                      htmlFor="promptedBy"
                      className="text-sm font-medium text-[oklch(0.25_0.03_50)] mb-1.5 block"
                    >
                      What prompted you to reach out?{" "}
                      <span className="text-[oklch(0.55_0.245_27)] text-xs">*</span>
                    </label>
                    <textarea
                      id="promptedBy"
                      rows={3}
                      className="w-full rounded-md border border-[oklch(0.82_0.02_70)] bg-white px-3 py-2 text-sm text-[oklch(0.25_0.03_50)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)] focus:border-[oklch(0.33_0.08_155)] resize-none"
                      aria-describedby={errors.promptedBy ? "promptedBy-error" : undefined}
                      {...register("promptedBy", { required: "Please tell us what prompted you" })}
                    />
                    {errors.promptedBy && (
                      <p id="promptedBy-error" className="text-xs text-[oklch(0.55_0.245_27)] mt-1" role="alert">
                        {errors.promptedBy.message}
                      </p>
                    )}
                  </div>

                  {/* Learning goal */}
                  <div>
                    <label
                      htmlFor="learningGoal"
                      className="text-sm font-medium text-[oklch(0.25_0.03_50)] mb-1.5 block"
                    >
                      What are you hoping to learn or accomplish?{" "}
                      <span className="text-[oklch(0.55_0.245_27)] text-xs">*</span>
                    </label>
                    <textarea
                      id="learningGoal"
                      rows={3}
                      className="w-full rounded-md border border-[oklch(0.82_0.02_70)] bg-white px-3 py-2 text-sm text-[oklch(0.25_0.03_50)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)] focus:border-[oklch(0.33_0.08_155)] resize-none"
                      aria-describedby={errors.learningGoal ? "learningGoal-error" : undefined}
                      {...register("learningGoal", { required: "Please describe your goal" })}
                    />
                    {errors.learningGoal && (
                      <p id="learningGoal-error" className="text-xs text-[oklch(0.55_0.245_27)] mt-1" role="alert">
                        {errors.learningGoal.message}
                      </p>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <label
                      htmlFor="industry"
                      className="text-sm font-medium text-[oklch(0.25_0.03_50)] mb-1.5 flex items-center gap-1.5"
                    >
                      Industry{" "}
                      <span className="text-[oklch(0.60_0.02_70)] font-normal">(optional)</span>
                    </label>
                    <select
                      id="industry"
                      className="w-full h-10 rounded-md border border-[oklch(0.82_0.02_70)] bg-white px-3 py-2 text-sm text-[oklch(0.25_0.03_50)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)] focus:border-[oklch(0.33_0.08_155)]"
                      {...register("industry")}
                    >
                      <option value="">Select an industry…</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Referral source */}
                  <div>
                    <label
                      htmlFor="referralSource"
                      className="text-sm font-medium text-[oklch(0.25_0.03_50)] mb-1.5 flex items-center gap-1.5"
                    >
                      How did you find us?{" "}
                      <span className="text-[oklch(0.60_0.02_70)] font-normal">(optional)</span>
                    </label>
                    <select
                      id="referralSource"
                      className="w-full h-10 rounded-md border border-[oklch(0.82_0.02_70)] bg-white px-3 py-2 text-sm text-[oklch(0.25_0.03_50)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)] focus:border-[oklch(0.33_0.08_155)]"
                      {...register("referralSource")}
                    >
                      <option value="">Select a source…</option>
                      {referralSources.map((src) => (
                        <option key={src} value={src}>
                          {src}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Privacy */}
                  <p className="text-xs text-[oklch(0.55_0.03_60)] leading-relaxed">
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy-policy" className="text-[oklch(0.33_0.08_155)] underline hover:no-underline">
                      Privacy Policy
                    </Link>
                    . We will only use your information to respond to your inquiry.
                  </p>

                  {error && (
                    <p className="text-sm text-[oklch(0.55_0.245_27)]" role="alert">
                      Something went wrong. Please try again or email{" "}
                      <a
                        href="mailto:jason@greatescapeconsulting.com"
                        className="underline hover:no-underline"
                      >
                        jason@greatescapeconsulting.com
                      </a>{" "}
                      directly.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting || submitLead.isPending}
                    className="w-full bg-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.28_0.07_155)] text-white font-semibold py-3 rounded-lg shadow-sm transition-all duration-150"
                  >
                    {isSubmitting || submitLead.isPending ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
