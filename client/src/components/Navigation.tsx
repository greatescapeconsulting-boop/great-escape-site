import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ai-visibility-for-realtors", label: "Realtors" },
  { href: "/ai-visibility-for-wineries", label: "Wineries" },
  { href: "/training-workshops", label: "Workshops" },
  { href: "/faq", label: "FAQ" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[oklch(0.88_0.02_70)]"
          : "bg-white/90 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <nav
        className="container flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-3 no-underline"
          aria-label="Great Escape Consulting — Home"
        >
          <img
            src="/images/gec-logo.jpg"
            alt="Great Escape Consulting logo"
            className="h-10 md:h-12 w-auto"
            width="120"
            height="48"
          />
          <span className="sr-only">Great Escape Consulting</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map(({ href, label }) => {
            const isActive = location === href || (href !== "/" && location.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors duration-150 ${
                    isActive
                      ? "text-[oklch(0.33_0.08_155)] bg-[oklch(0.94_0.04_70)]"
                      : "text-[oklch(0.30_0.03_50)] hover:text-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.96_0.02_70)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden md:inline-flex no-underline">
            <Button
              size="sm"
              className="bg-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.28_0.07_155)] text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition-all duration-150"
            >
              Start a Conversation
            </Button>
          </Link>
          <button
            className="lg:hidden p-2 rounded-md text-[oklch(0.30_0.03_50)] hover:bg-[oklch(0.94_0.04_70)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[oklch(0.88_0.02_70)] ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="container py-4 flex flex-col gap-1" role="list">
          {navLinks.map(({ href, label }) => {
            const isActive = location === href || (href !== "/" && location.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-4 py-3 rounded-md text-base font-medium no-underline transition-colors ${
                    isActive
                      ? "text-[oklch(0.33_0.08_155)] bg-[oklch(0.94_0.04_70)]"
                      : "text-[oklch(0.30_0.03_50)] hover:text-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.96_0.02_70)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <Link href="/contact" className="no-underline">
              <Button className="w-full bg-[oklch(0.33_0.08_155)] hover:bg-[oklch(0.28_0.07_155)] text-white font-semibold">
                Start a Conversation
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
