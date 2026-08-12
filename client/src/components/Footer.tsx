import { Link } from "wouter";

const footerNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-is-ai-visibility", label: "What Is AI Visibility?" },
  { href: "/ai-visibility-for-realtors", label: "AI Visibility for Realtors" },
  { href: "/ai-visibility-for-wineries", label: "AI Visibility for Wineries" },
  { href: "/training-workshops", label: "Training & Workshops" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[oklch(0.18_0.03_155)] text-[oklch(0.88_0.02_70)]"
      role="contentinfo"
    >
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <img
              src="/images/gec-logo.jpg"
              alt="Great Escape Consulting"
              className="h-12 w-auto mb-4 brightness-0 invert"
              width="120"
              height="48"
            />
            <p className="text-sm text-[oklch(0.75_0.02_70)] leading-relaxed max-w-xs">
              Helping trust-driven businesses become easier for AI systems to understand, trust, and recommend.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-[oklch(0.95_0.01_70)] font-semibold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2" role="list">
              {footerNavLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[oklch(0.75_0.02_70)] hover:text-[oklch(0.95_0.01_70)] no-underline transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[oklch(0.95_0.01_70)] font-semibold text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <p className="text-sm text-[oklch(0.75_0.02_70)] mb-4 leading-relaxed">
              Have questions about AI visibility? Start with a conversation.
            </p>
            <Link href="/contact" className="no-underline">
              <span className="inline-block bg-[oklch(0.72_0.12_65)] hover:bg-[oklch(0.65_0.12_65)] text-[oklch(0.18_0.02_50)] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-150 cursor-pointer">
                Start a Conversation
              </span>
            </Link>
            <div className="mt-6">
              <a
                href="mailto:jason@greatescapeconsulting.com"
                className="text-sm text-[oklch(0.75_0.02_70)] hover:text-[oklch(0.95_0.01_70)] transition-colors"
              >
                jason@greatescapeconsulting.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[oklch(0.30_0.03_155)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[oklch(0.60_0.02_70)]">
            © {year} Great Escape Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-[oklch(0.60_0.02_70)] hover:text-[oklch(0.80_0.02_70)] no-underline transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[oklch(0.60_0.02_70)] hover:text-[oklch(0.80_0.02_70)] no-underline transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
