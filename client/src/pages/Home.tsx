import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Home as HomeIcon, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import CtaSection from "@/components/CtaSection";
import SeoHead from "@/components/SeoHead";

const serviceCards = [
  {
    title: "Realtors",
    description:
      "When buyers ask AI who to trust in your market, does your name come up? Learn how to become the agent AI systems confidently recommend.",
    href: "/ai-visibility-for-realtors",
    cta: "AI Visibility for Realtors",
  },
  {
    title: "Wineries & Craft Beverage",
    description:
      "When visitors ask AI for winery recommendations, tasting room experiences, or local wine trails — is your business part of the answer?",
    href: "/ai-visibility-for-wineries",
    cta: "AI Visibility for Wineries",
  },
  {
    title: "Workshops & Training",
    description:
      "Practical, educational workshops for business owners and teams who want to understand AI visibility without the jargon or the hype.",
    href: "/training-workshops",
    cta: "Explore Workshops",
  },
];

const approachPoints = [
  "Educational, not sales-driven",
  "Honest about what is and isn't known",
  "Focused on your specific situation",
  "No jargon, no hype, no empty promises",
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://greatescapeconsulting.com/#person",
  name: "Jason Kierstein",
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: "Great Escape Consulting" },
  url: "https://greatescapeconsulting.com/about",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://greatescapeconsulting.com/#organization",
  name: "Great Escape Consulting",
  url: "https://greatescapeconsulting.com",
  founder: { "@id": "https://greatescapeconsulting.com/#person" },
  description:
    "AI Visibility consulting, training, and advisory services for Realtors, wineries, and trust-driven businesses.",
};

export default function Home() {
  return (
    <PageLayout>
      <SeoHead
        title="Great Escape Consulting | AI Visibility for Trust-Driven Businesses"
        description="Great Escape Consulting helps Realtors, wineries, and trust-driven businesses become easier for AI systems to understand, trust, and recommend. Start with a conversation."
        canonicalPath="/"
        schema={[personSchema, orgSchema]}
      />

      {/* Hero */}
      <section className="bg-warm-gradient section-padding" aria-labelledby="hero-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
                AI Visibility Consulting
              </p>
              <h1
                id="hero-heading"
                className="font-serif text-[oklch(0.18_0.02_50)] mb-5"
              >
                Your business exists.{" "}
                <em className="text-[oklch(0.33_0.08_155)] not-italic">
                  Does AI know it?
                </em>
              </h1>
              <div
                className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl text-[oklch(0.35_0.03_55)] leading-relaxed mb-8 max-w-xl">
                AI-driven search is changing how buyers find businesses, choose who to trust, and
                decide who to recommend. Great Escape Consulting helps you understand what that
                means for your business — and what to do about it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/jason-headshot.jpg"
                alt="Jason Kierstein, Founder of Great Escape Consulting"
                className="w-72 h-72 md:w-80 md:h-80 rounded-2xl object-cover shadow-xl"
                width="320"
                height="320"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's changing */}
      <section className="section-padding bg-white" aria-labelledby="changing-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            The Shift
          </p>
          <h2
            id="changing-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            Search is changing. Visibility is changing with it.
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <p className="text-[oklch(0.40_0.03_55)] leading-relaxed mb-5">
            Traditional search returned a list of results. You competed for a spot on that list.
            AI-driven search works differently. It narrows choices, makes recommendations, and
            increasingly decides who gets mentioned and who gets skipped.
          </p>
          <p className="text-[oklch(0.40_0.03_55)] leading-relaxed mb-6">
            If AI systems can't clearly interpret your business — who you are, what you do, who you
            serve, why you're credible — you may be invisible to the very buyers who are looking for
            exactly what you offer.
          </p>
          <Link href="/what-is-ai-visibility" className="no-underline">
            <Button
              variant="outline"
              className="border-[oklch(0.33_0.08_155)] text-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.94_0.04_70)] bg-transparent font-semibold"
            >
              Learn More About AI Visibility
              <ArrowRight size={16} className="ml-2" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Who this is for */}
      <section className="section-padding bg-warm-gradient" aria-labelledby="who-heading">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
              Who This Is For
            </p>
            <h2
              id="who-heading"
              className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
            >
              Focused on industries where trust matters
            </h2>
            <p className="text-[oklch(0.45_0.03_60)] max-w-xl mx-auto">
              Focused on industries where trust, relationships, and local reputation are central to
              how business gets done.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <article
                key={card.href}
                className="bg-white rounded-2xl p-8 border border-[oklch(0.88_0.02_70)] shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-serif text-lg font-semibold text-[oklch(0.18_0.02_50)] mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-[oklch(0.45_0.03_60)] leading-relaxed mb-6">
                  {card.description}
                </p>
                <Link href={card.href} className="no-underline">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[oklch(0.33_0.08_155)] text-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.94_0.04_70)] bg-transparent font-semibold text-xs"
                  >
                    {card.cta}
                    <ArrowRight size={14} className="ml-1.5" aria-hidden="true" />
                  </Button>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section className="section-padding bg-white" aria-labelledby="approach-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
                The Approach
              </p>
              <h2
                id="approach-heading"
                className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
              >
                Educational first. Honest always.
              </h2>
              <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
              <p className="text-[oklch(0.40_0.03_55)] leading-relaxed mb-5">
                Most business owners don't need to become AI experts. They need to understand what's
                changing, what it means for their specific business, and what actually matters versus
                what's just noise.
              </p>
              <p className="text-[oklch(0.40_0.03_55)] leading-relaxed mb-6">
                The work starts with education and clarity — not tactics, not templates, not a
                checklist someone else built for a different business. Every situation is different.
                The goal is to help you understand yours.
              </p>
              <ul className="space-y-3" role="list">
                {approachPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[oklch(0.33_0.08_155)] mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-[oklch(0.35_0.03_55)] text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-warm-gradient rounded-2xl p-8 md:p-10 border border-[oklch(0.88_0.02_70)]">
              <blockquote className="text-[oklch(0.25_0.03_50)]">
                <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-6">
                  "The question isn't whether AI is changing how buyers find businesses. It already
                  has. The question is whether your business is positioned to benefit from that
                  change — or get left behind by it."
                </p>
                <footer className="flex items-center gap-4">
                  <img
                    src="/images/jason-headshot.jpg"
                    alt=""
                    aria-hidden="true"
                    className="w-12 h-12 rounded-full object-cover"
                    width="48"
                    height="48"
                  />
                  <div>
                    <p className="font-semibold text-[oklch(0.18_0.02_50)] text-sm">
                      Jason Kierstein
                    </p>
                    <p className="text-[oklch(0.55_0.03_60)] text-xs">
                      Founder, Great Escape Consulting
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Ready to understand how AI systems see your business?"
        subtext="Start with a conversation. No pressure, no pitch — just clarity."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
        secondaryLabel="Learn About AI Visibility"
        secondaryHref="/what-is-ai-visibility"
        variant="green"
      />
    </PageLayout>
  );
}
