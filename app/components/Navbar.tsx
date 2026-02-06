"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  name: string;
  sectionIds: string[];
}

const LABELS: Record<string, string> = {
  summary: "Summary",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
  languages: "Languages",
};

export function Navbar({ name, sectionIds }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  const navLinks = sectionIds.filter((id) => id !== "hero");

  return (
    <nav
      className={`animate-nav-slide-down fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-nav-bg border-b border-nav-border backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => scrollTo("hero")}
          className={`text-lg font-bold tracking-tight transition-colors ${
            scrolled
              ? "text-foreground"
              : "text-white"
          }`}
        >
          {name}
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeSection === id
                  ? "bg-accent/10 text-accent"
                  : scrolled
                    ? "text-muted hover:text-foreground"
                    : "text-white/70 hover:text-white"
              }`}
            >
              {LABELS[id] ?? id}
            </button>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
              scrolled
                ? "text-foreground hover:bg-card-border/50"
                : "text-white hover:bg-white/10"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-nav-border bg-nav-bg backdrop-blur-md md:hidden">
          <div className="flex flex-col px-4 py-2">
            {navLinks.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                  activeSection === id
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {LABELS[id] ?? id}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                window.print();
              }}
              className="mt-1 flex items-center gap-2 rounded-md border-t border-nav-border px-3 py-2 text-left text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
