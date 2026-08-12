import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  variant?: "warm" | "green" | "plain";
  centered?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
  variant = "warm",
  centered = false,
}: PageHeroProps) {
  const bgClass =
    variant === "green"
      ? "bg-green-gradient text-white"
      : variant === "warm"
      ? "bg-warm-gradient"
      : "bg-[oklch(0.97_0.01_70)]";

  const titleClass =
    variant === "green" ? "text-white" : "text-[oklch(0.18_0.02_50)]";

  const subtitleClass =
    variant === "green" ? "text-[oklch(0.88_0.02_70)]" : "text-[oklch(0.45_0.03_60)]";

  const breadcrumbClass =
    variant === "green" ? "text-[oklch(0.80_0.02_70)]" : "text-[oklch(0.55_0.03_60)]";

  return (
    <section
      className={`${bgClass} py-16 md:py-20`}
      aria-label="Page header"
    >
      <div className={`container ${centered ? "text-center" : ""}`}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol
              className={`flex items-center gap-1 text-sm ${breadcrumbClass} ${centered ? "justify-center" : ""}`}
              role="list"
            >
              <li>
                <Link
                  href="/"
                  className={`no-underline hover:underline ${breadcrumbClass}`}
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1">
                  <ChevronRight size={14} aria-hidden="true" className="opacity-60" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={`no-underline hover:underline ${breadcrumbClass}`}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1
          className={`font-serif text-4xl md:text-5xl font-bold leading-tight mb-4 ${titleClass}`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className={`text-lg md:text-xl leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""} ${subtitleClass}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
