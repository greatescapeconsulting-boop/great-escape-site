import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import SeoHead from "@/components/SeoHead";

const challenges = [
  "Buyers increasingly begin their search by asking AI who to trust in a market",
  "AI systems may not be able to clearly interpret your expertise, specialization, or market knowledge",
  "Inconsistent information across profiles and platforms creates interpretive friction",
  "Generic positioning makes it harder for AI to distinguish you from every other agent",
  "Missing or weak authority signals reduce AI confidence in recommending you",
];

const factors = [
  {
    title: "Positioning clarity",
    description:
      "Is it clear what makes you distinctly relevant to the buyers and sellers you serve? Vague positioning is one of the most common AI visibility problems for Realtors.",
  },
  {
    title: "Authority signals",
    description:
      "Do your digital presence and professional profiles clearly establish your expertise, market knowledge, and track record in a way AI systems can interpret?",
  },
  {
    title: "Consistency across platforms",
    description:
      "Is your information consistent across your website, social profiles, real estate platforms, and other digital touchpoints? Inconsistency creates confusion for AI systems.",
  },
  {
    title: "Trust and credibility",
    description:
      "Are there corroborating signals — reviews, mentions, testimonials, third-party references — that confirm your credibility beyond your own website?",
  },
  {
    title: "Local market relevance",
    description:
      "Is it clear which markets, neighborhoods, and property types you specialize in? Geographic and specialization clarity matters for AI recommendation.",
  },
];

export default function RealtorsPage() {
  return (
    <PageLayout>
      <SeoHead
        title="AI Visibility for Realtors | Great Escape Consulting"
        description="When buyers ask AI who to trust in your market, does your name come up? Learn how AI-driven search is changing real estate visibility and what to do about it."
        canonicalPath="/ai-visibility-for-realtors"
      />

      <PageHero
        title="AI Visibility for Realtors"
        subtitle="When buyers ask AI who to trust in your market, does your name come up? AI-driven search is changing how buyers find and choose real estate professionals."
        breadcrumbs={[{ label: "AI Visibility for Realtors" }]}
      />

      {/* The challenge */}
      <section className="section-padding bg-white" aria-labelledby="challenge-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            The Challenge
          </p>
          <h2
            id="challenge-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            What's changing for Realtors
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <ul className="space-y-3" role="list">
            {challenges.map((challenge) => (
              <li
                key={challenge}
                className="flex items-start gap-3 bg-warm-gradient rounded-lg px-5 py-4 border border-[oklch(0.88_0.02_70)]"
              >
                <span className="text-[oklch(0.40_0.03_55)] leading-relaxed text-sm">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Key factors */}
      <section className="section-padding bg-warm-gradient" aria-labelledby="factors-heading">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
              What Matters
            </p>
            <h2
              id="factors-heading"
              className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
            >
              Key AI visibility factors for Realtors
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factors.map((factor) => (
              <article
                key={factor.title}
                className="bg-white rounded-xl p-6 border border-[oklch(0.88_0.02_70)] shadow-sm"
              >
                <h3 className="font-serif text-base font-semibold text-[oklch(0.18_0.02_50)] mb-3">
                  {factor.title}
                </h3>
                <p className="text-sm text-[oklch(0.45_0.03_60)] leading-relaxed">
                  {factor.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What to do */}
      <section className="section-padding bg-white" aria-labelledby="action-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            The Path Forward
          </p>
          <h2
            id="action-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            What to do about it
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <div className="space-y-5">
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              The first step is understanding where you currently stand. Not every Realtor has the
              same gaps, and not every gap matters equally. The goal is to identify what's actually
              affecting your AI visibility — and what to prioritize.
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
            <Link href="/what-is-ai-visibility" className="no-underline">
              <Button
                size="lg"
                variant="outline"
                className="border-[oklch(0.33_0.08_155)] text-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.94_0.04_70)] bg-transparent font-semibold px-8 py-3 rounded-lg transition-all duration-150"
              >
                What Is AI Visibility?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
