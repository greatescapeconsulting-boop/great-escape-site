import { trpc } from "@/lib/trpc";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SeoHead from "@/components/SeoHead";

export default function ResultsCaseStudies() {
  const { data: testimonials, isLoading } = trpc.content.testimonials.useQuery();

  return (
    <PageLayout>
      <SeoHead
        title="Results & Case Studies | Great Escape Consulting"
        description="Real results from real clients. See how Great Escape Consulting has helped businesses improve their AI visibility."
        canonicalPath="/results-case-studies"
      />

      <PageHero
        title="Results & Case Studies"
        subtitle="Real results from real clients. Published with permission."
        breadcrumbs={[{ label: "Results & Case Studies" }]}
      />

      <section className="section-padding bg-white" aria-labelledby="results-heading">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-xl bg-[oklch(0.94_0.04_70)] animate-pulse"
                />
              ))}
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <div className="space-y-8">
              {testimonials.map((t: any) => (
                <article
                  key={t.id}
                  className="bg-warm-gradient rounded-2xl p-8 border border-[oklch(0.88_0.02_70)]"
                >
                  <blockquote className="text-[oklch(0.25_0.03_50)]">
                    <p className="font-serif text-lg italic leading-relaxed mb-5">
                      "{t.testimonial}"
                    </p>
                    <footer className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold text-[oklch(0.18_0.02_50)] text-sm">
                          {t.clientName}
                        </p>
                        {t.organization && (
                          <p className="text-[oklch(0.55_0.03_60)] text-xs">
                            {t.organization}
                            {t.industry ? ` · ${t.industry}` : ""}
                          </p>
                        )}
                      </div>
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[oklch(0.45_0.03_60)] text-lg mb-3">
                Client testimonials will be published here as they are collected.
              </p>
              <p className="text-[oklch(0.55_0.03_60)] text-sm">
                We only publish testimonials from real clients with their permission.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
