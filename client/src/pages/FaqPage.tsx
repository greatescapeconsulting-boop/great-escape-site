import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SeoHead from "@/components/SeoHead";

const staticFaqs = [
  {
    question: "What is AI visibility?",
    answer:
      "AI visibility is how clearly and confidently AI-driven search and recommendation systems can interpret, understand, and recommend your business. It's about whether AI systems can find you, understand what you do, trust the information they find, and include you in their recommendations.",
  },
  {
    question: "Is AI visibility the same as SEO?",
    answer:
      "No — but they're related. Traditional SEO focuses on ranking in search engine results pages. AI visibility is about how AI-driven systems interpret and recommend your business. Some traditional SEO practices support AI visibility, but AI systems evaluate businesses differently than traditional search algorithms.",
  },
  {
    question: "Who is this for?",
    answer:
      "Great Escape Consulting works primarily with Realtors, wineries, craft beverage businesses, and other trust-driven local businesses. These are industries where trust, relationships, and local reputation are central to how business gets done — and where AI visibility has particular significance.",
  },
  {
    question: "Can you guarantee that AI systems will recommend my business?",
    answer:
      "No. No one can guarantee that. AI systems make their own determinations, and those determinations aren't fully transparent or predictable. What can be improved are the signals that influence AI interpretation and confidence — clarity, authority, consistency, trust, positioning, and corroboration.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "AI visibility improvements don't happen overnight, and the timeline varies depending on your starting point, the changes made, and how quickly AI systems re-index and re-evaluate your digital presence. Realistic expectations are important here — this is not a quick fix.",
  },
  {
    question: "What does working with Great Escape Consulting look like?",
    answer:
      "It starts with a conversation — an honest look at your current situation, what you're trying to achieve, and whether there's a good fit. From there, the work is customized to your specific situation. It might involve education and strategy, specific changes to your digital presence, or both.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = question.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="border-b border-[oklch(0.88_0.02_70)] last:border-0">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`faq-${id}`}
      >
        <span className="font-serif text-base font-semibold text-[oklch(0.18_0.02_50)] leading-snug">
          {question}
        </span>
        {open ? (
          <ChevronUp size={18} className="text-[oklch(0.55_0.03_60)] flex-shrink-0 mt-0.5" aria-hidden="true" />
        ) : (
          <ChevronDown size={18} className="text-[oklch(0.55_0.03_60)] flex-shrink-0 mt-0.5" aria-hidden="true" />
        )}
      </button>
      {open && (
        <div id={`faq-${id}`} className="pb-5">
          <p className="text-[oklch(0.40_0.03_55)] leading-relaxed text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const { data: dynamicFaqs } = trpc.content.faqs.useQuery();
  const allFaqs = dynamicFaqs && dynamicFaqs.length > 0 ? dynamicFaqs : staticFaqs;

  return (
    <PageLayout>
      <SeoHead
        title="Frequently Asked Questions | Great Escape Consulting"
        description="Common questions about AI visibility, how it works, who it's for, and what working with Great Escape Consulting looks like."
        canonicalPath="/faq"
      />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Common questions about AI visibility, how it works, and what to expect."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section className="section-padding bg-white" aria-labelledby="faq-heading">
        <div className="container max-w-3xl">
          <div className="bg-warm-gradient rounded-2xl border border-[oklch(0.88_0.02_70)] px-8 py-2 mb-12">
            {allFaqs.map((faq: any) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-[oklch(0.45_0.03_60)] mb-2">Have a question that isn't answered here?</p>
            <p className="text-sm text-[oklch(0.55_0.03_60)] mb-6">
              Reach out directly. If it's a question worth answering publicly, it may end up in the FAQ.
            </p>
            <Link href="/contact" className="no-underline">
              <Button
                className="bg-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.28_0.07_155)] text-white font-semibold"
              >
                Ask a Question
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
