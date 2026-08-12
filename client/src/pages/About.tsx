import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import SeoHead from "@/components/SeoHead";

export default function About() {
  return (
    <PageLayout>
      <SeoHead
        title="About | Great Escape Consulting"
        description="Jason Kierstein brings an unusual combination of backgrounds — engineering, mathematics, computer science, operations research, and law enforcement — to AI visibility consulting."
        canonicalPath="/about"
      />

      <PageHero
        title="About Great Escape Consulting"
        subtitle="Great Escape Consulting was built around a simple observation: most business owners don't understand what AI-driven search is doing to their visibility — and most of the people selling solutions in this space aren't making it easier to understand."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="section-padding bg-white" aria-labelledby="about-jason-heading">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
              <img
                src="/images/jason-headshot.jpg"
                alt="Jason Kierstein, Founder of Great Escape Consulting"
                className="w-56 h-56 rounded-2xl object-cover shadow-lg mb-4"
                width="224"
                height="224"
              />
              <p className="font-semibold text-[oklch(0.18_0.02_50)] text-sm">Jason Kierstein</p>
              <p className="text-[oklch(0.55_0.03_60)] text-xs">Founder, Great Escape Consulting</p>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <h2
                id="about-jason-heading"
                className="font-serif text-2xl text-[oklch(0.18_0.02_50)]"
              >
                About Jason
              </h2>
              <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
                Jason Kierstein brings an unusual combination of backgrounds to this work. His
                academic and professional experience spans chemical engineering, mathematics,
                computer science, operations research, applied statistics, enterprise CRM, and law
                enforcement. That breadth shapes how he approaches AI visibility — analytically,
                honestly, and with a focus on what actually matters rather than what sounds
                impressive.
              </p>
              <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
                He is AI Authority Engine Certified through YROC Consulting and works with business
                owners in industries where trust, relationships, and local reputation are central to
                how business gets done — including Realtors, wineries, and other relationship-driven
                local businesses.
              </p>
              <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
                The name Great Escape Consulting reflects a genuine belief: that understanding is
                the escape from confusion, anxiety, and bad decisions. The goal isn't to make AI
                visibility seem more complicated than it needs to be. It's to help you understand
                your situation clearly enough to make good decisions about it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-gradient" aria-labelledby="background-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            Why It Matters
          </p>
          <h2
            id="background-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            A different kind of background for a different kind of problem
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <div className="space-y-5">
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              AI visibility isn't purely a marketing problem. It involves how information systems
              interpret signals, how trust is established across distributed data sources, and how
              recommendation behavior is influenced by authority, clarity, and consistency. That
              requires a different kind of analytical lens.
            </p>
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              The businesses most affected by AI-driven visibility changes are often the ones least
              equipped to understand what's happening. Small business owners, local service
              providers, independent professionals — people who built their businesses on
              relationships and reputation, not on digital marketing expertise.
            </p>
            <p className="text-[oklch(0.40_0.03_55)] leading-relaxed">
              That's who this work is for. Not enterprise marketing teams with dedicated SEO staff.
              Business owners who need to understand what's changing, what it means for them
              specifically, and what to actually do about it.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Ready to have an honest conversation about your AI visibility?"
        subtext="No pressure, no pitch. Just clarity about your situation."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
        secondaryLabel="What Is AI Visibility?"
        secondaryHref="/what-is-ai-visibility"
        variant="green"
      />
    </PageLayout>
  );
}
