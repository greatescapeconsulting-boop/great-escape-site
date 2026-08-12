import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  heading: string;
  subtext?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "green" | "warm" | "plain";
}

export default function CtaSection({
  heading,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "green",
}: CtaSectionProps) {
  const bgClass =
    variant === "green"
      ? "bg-green-gradient"
      : variant === "warm"
      ? "bg-warm-gradient"
      : "bg-[oklch(0.97_0.01_70)]";

  const headingClass =
    variant === "green" ? "text-white" : "text-[oklch(0.18_0.02_50)]";

  const subtextClass =
    variant === "green" ? "text-[oklch(0.88_0.02_70)]" : "text-[oklch(0.45_0.03_60)]";

  return (
    <section className={`${bgClass} py-16 md:py-20`} aria-labelledby="cta-heading">
      <div className="container text-center">
        <h2
          id="cta-heading"
          className={`font-serif text-3xl md:text-4xl font-bold mb-4 ${headingClass}`}
        >
          {heading}
        </h2>
        {subtext && (
          <p className={`text-lg mb-8 max-w-xl mx-auto ${subtextClass}`}>{subtext}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryHref} className="no-underline">
            <Button
              size="lg"
              className={
                variant === "green"
                  ? "bg-[oklch(0.72_0.12_65)] hover:bg-[oklch(0.65_0.12_65)] text-[oklch(0.18_0.02_50)] font-semibold px-8 py-3 rounded-lg"
                  : "bg-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.28_0.07_155)] text-white font-semibold px-8 py-3 rounded-lg"
              }
            >
              {primaryLabel}
            </Button>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="no-underline">
              <Button
                size="lg"
                variant="outline"
                className={
                  variant === "green"
                    ? "border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg"
                    : "border-[oklch(0.33_0.08_155)] text-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.94_0.04_70)] font-semibold px-8 py-3 rounded-lg"
                }
              >
                {secondaryLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
