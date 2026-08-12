import { Link } from "wouter";
import { ArrowRight, Users, User, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SeoHead from "@/components/SeoHead";

const offerings = [
  {
    icon: Users,
    title: "Group Workshops",
    description:
      "Interactive sessions for real estate teams, brokerage offices, winery associations, chambers of commerce, and other business groups. Designed to build shared understanding and generate practical insights for participants.",
    details: [
      "2–3 hour interactive sessions",
      "Q&A and discussion built in",
      "Customized for your industry",
      "Available in-person or virtual",
    ],
  },
  {
    icon: User,
    title: "One-on-One Advisory",
    description:
      "Individual sessions for business owners who want to understand their specific AI visibility situation and develop a clear picture of what matters for their business.",
    details: [
      "Focused on your specific situation",
      "Honest assessment of current visibility",
      "Prioritized action areas",
      "Follow-up support available",
    ],
  },
  {
    icon: Presentation,
    title: "Educational Presentations",
    description:
      "Keynote-style presentations for conferences, association meetings, and industry events. Designed to introduce AI visibility concepts to audiences who are new to the topic.",
    details: [
      "45–90 minute presentations",
      "Audience Q&A included",
      "Industry-specific examples",
      "Available in-person or virtual",
    ],
  },
];

const topicsCovered = [
  "What AI-driven search is and how it differs from traditional search",
  "How AI systems interpret and evaluate businesses",
  "What 'AI visibility' actually means for your specific industry",
  "The six factors that influence AI recommendation behavior",
  "Common AI visibility mistakes and how to avoid them",
  "How to assess your current AI visibility situation",
  "What to prioritize and what to ignore",
  "How AI visibility relates to (and differs from) traditional SEO",
];

const audienceTypes = [
  "Real estate professionals and brokerage teams",
  "Winery owners and craft beverage businesses",
  "Local service businesses and professional practices",
  "Business associations and chambers of commerce",
  "Anyone who wants to understand AI visibility without the jargon",
];

export default function TrainingWorkshops() {
  return (
    <PageLayout>
      <SeoHead
        title="AI Visibility Training & Workshops | Great Escape Consulting"
        description="Practical, educational workshops and advisory sessions on AI visibility for Realtors, wineries, and trust-driven businesses. Available in-person or virtual."
        canonicalPath="/training-workshops"
      />

      <PageHero
        title="Training & Workshops"
        subtitle="Practical, educational sessions designed to help business owners and teams understand AI visibility — without the jargon or the hype."
        breadcrumbs={[{ label: "Training & Workshops" }]}
      />

      {/* Offerings */}
      <section className="section-padding bg-white" aria-labelledby="offerings-heading">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
              How We Work Together
            </p>
            <h2
              id="offerings-heading"
              className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
            >
              Training formats available
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((offering) => {
              const Icon = offering.icon;
              return (
                <article
                  key={offering.title}
                  className="bg-warm-gradient rounded-2xl p-8 border border-[oklch(0.88_0.02_70)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.33_0.08_155)] flex items-center justify-center mb-5">
                    <Icon size={20} className="text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[oklch(0.18_0.02_50)] mb-3">
                    {offering.title}
                  </h3>
                  <p className="text-sm text-[oklch(0.45_0.03_60)] leading-relaxed mb-5">
                    {offering.description}
                  </p>
                  <ul className="space-y-2" role="list">
                    {offering.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="text-[oklch(0.33_0.08_155)] mt-1 flex-shrink-0" aria-hidden="true">
                          ✓
                        </span>
                        <span className="text-xs text-[oklch(0.45_0.03_60)]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section-padding bg-warm-gradient" aria-labelledby="topics-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
                What We Cover
              </p>
              <h2
                id="topics-heading"
                className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
              >
                Topics covered
              </h2>
              <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
              <ul className="space-y-3" role="list">
                {topicsCovered.map((topic) => (
                  <li key={topic} className="flex items-start gap-3">
                    <span className="text-[oklch(0.33_0.08_155)] mt-0.5 flex-shrink-0" aria-hidden="true">
                      →
                    </span>
                    <span className="text-sm text-[oklch(0.40_0.03_55)] leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
                Who This Is For
              </p>
              <h2 className="font-serif text-[oklch(0.18_0.02_50)] mb-4">
                Who attends
              </h2>
              <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
              <ul className="space-y-3" role="list">
                {audienceTypes.map((audience) => (
                  <li key={audience} className="flex items-start gap-3">
                    <span className="text-[oklch(0.33_0.08_155)] mt-0.5 flex-shrink-0" aria-hidden="true">
                      →
                    </span>
                    <span className="text-sm text-[oklch(0.40_0.03_55)] leading-relaxed">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white" aria-labelledby="cta-heading">
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.72_0.12_65)] mb-3">
            Get Started
          </p>
          <h2
            id="cta-heading"
            className="font-serif text-[oklch(0.18_0.02_50)] mb-4"
          >
            Interested in a workshop or presentation?
          </h2>
          <div className="w-14 h-0.5 bg-[oklch(0.72_0.12_65)] mb-6 rounded-full" aria-hidden="true" />
          <p className="text-[oklch(0.40_0.03_55)] leading-relaxed mb-8">
            Reach out to discuss your group's needs, timing, and format. Sessions are customized
            for each audience — no two workshops are identical.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="no-underline">
              <Button
                size="lg"
                className="bg-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.28_0.07_155)] text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-all duration-150"
              >
                Inquire About a Workshop
                <ArrowRight size={16} className="ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
