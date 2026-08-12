import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import SeoHead from "@/components/SeoHead";

const glossaryTerms = [
  {
    term: "Clarity",
    definition:
      "Can AI systems clearly understand who you are, what you do, who you serve, and why you are credible? Ambiguity is the enemy of AI recommendation.",
  },
  {
    term: "Authority",
    definition:
      "Does your digital presence signal genuine expertise and credibility? AI systems look for corroborating evidence that you are who you say you are.",
  },
  {
    term: "Trust",
    definition:
      "Are there consistent, credible signals across your digital presence that establish you as a trustworthy source? Trust is built through consistency and corroboration.",
  },
  {
    term: "Positioning",
    definition:
      "Is it clear what makes you distinctly relevant to the people you serve? Vague positioning makes it harder for AI systems to confidently recommend you.",
  },
  {
    term: "Consistency",
    definition:
      "Does information about your business appear consistently across your website, profiles, and other digital touchpoints? Inconsistency creates interpretive friction.",
  },
  {
    term: "Corroboration",
    definition:
      "Is your expertise and credibility confirmed by sources beyond your own website? Third-party mentions, reviews, and citations strengthen AI confidence.",
  },
];

const notPoints = [
  "It's not a replacement for SEO.",
  "It's not a guaranteed outcome.",
  "It's not a one-time fix.",
  "It's not purely technical.",
];

export default function WhatIsAiVisibility() {
  return (
    <PageLayout>
      <SeoHead
        title="What Is AI Visibility? | Great Escape Consulting"
        description="AI visibility is how clearly and confidently AI-driven search and recommendation systems can interpret, understand, and recommend your business. Learn what it means and why it matters."
        canonicalPath="/what-is-ai-visibility"
      />

      <PageHero
        title="What Is AI Visibility?"
        subtitle="AI visibility is how clearly and confidently AI-driven search and recommendation systems can interpret, understand, and recommend your business."
        breadcrumbs={[{ label: "What Is AI Visibility?" }]}
      />

      {/* The shift */}
      <section className="section-padding bg-white" aria-labelledby="shift-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            The Shift
          </p>
          <h2
            id="shift-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            The shift from search ranking to AI recommendation
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <div className="space-y-5">
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              Traditional search engines returned lists of results. Businesses competed for position
              on those lists through a combination of relevance signals, backlinks, and technical
              optimization. That model is still relevant — but it's no longer the whole picture.
            </p>
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              AI-driven search and recommendation systems work differently. Instead of returning a
              list of results and letting the user choose, they increasingly synthesize information
              and make recommendations. They attempt to answer questions directly, suggest specific
              businesses, and provide guidance — often without the user ever clicking through to a
              website.
            </p>
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              That shift changes the nature of visibility. It's no longer just about ranking. It's
              about whether AI systems can confidently interpret your business, trust the information
              they find about you, and include you in their recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section-padding bg-warm-gradient" aria-labelledby="why-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            Why It Matters
          </p>
          <h2
            id="why-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            Why AI visibility matters for trust-driven businesses
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <div className="space-y-5">
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              For businesses where trust is central to the buying decision — Realtors, wineries,
              professional service providers, local businesses — AI visibility has particular
              significance.
            </p>
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              Businesses that are ambiguous, inconsistently represented, or simply not well-understood
              by AI systems may be invisible — even if they are genuinely excellent at what they do.
            </p>
          </div>
        </div>
      </section>

      {/* The six factors */}
      <section className="section-padding bg-white" aria-labelledby="factors-heading">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
              The Framework
            </p>
            <h2
              id="factors-heading"
              className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
            >
              The six factors that influence AI visibility
            </h2>
            <p className="text-[oklch(0.45_0.03_60)] max-w-xl mx-auto">
              AI visibility isn't a single metric. It's the result of multiple factors working
              together to help AI systems confidently interpret and recommend your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {glossaryTerms.map((item) => (
              <article
                key={item.term}
                className="bg-warm-gradient rounded-xl p-6 border border-[oklch(0.88_0.02_70)]"
              >
                <h3 className="font-serif text-lg font-semibold text-[oklch(0.18_0.02_50)] mb-3">
                  {item.term}
                </h3>
                <p className="text-sm text-[oklch(0.45_0.03_60)] leading-relaxed">
                  {item.definition}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What it's not */}
      <section className="section-padding bg-warm-gradient" aria-labelledby="not-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            Clarifying the Concept
          </p>
          <h2
            id="not-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            What AI visibility is not
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <ul className="space-y-3" role="list">
            {notPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 bg-white rounded-lg px-5 py-4 border border-[oklch(0.88_0.02_70)]"
              >
                <span className="text-[oklch(0.40_0.03_55)] leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where to start */}
      <section className="section-padding bg-white" aria-labelledby="start-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            Getting Started
          </p>
          <h2
            id="start-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            Where to start
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <div className="space-y-5">
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              The first step is usually understanding where you currently stand. Not every business
              has the same gaps, and not every gap matters equally. The goal is to identify what's
              actually affecting your AI visibility — and what to prioritize.
            </p>
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              That starts with a conversation. No pressure, no pitch — just an honest look at your
              situation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/contact" className="no-underline">
              <Button
                size="lg"
                className="bg-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.28_0.07_155)] text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-all duration-150"
              >
                Start a Conversation
                <ArrowRight size={16} className="ml-2" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/faq" className="no-underline">
              <Button
                size="lg"
                variant="outline"
                className="border-[oklch(0.33_0.08_155)] text-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.94_0.04_70)] bg-transparent font-semibold px-8 py-3 rounded-lg transition-all duration-150"
              >
                Read the FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
