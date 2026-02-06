"use client";

import { useEffect, useState } from "react";
import type { Basics } from "@/app/types/resume";

interface HeroSectionProps {
  basics: Basics;
}

export function HeroSection({ basics }: HeroSectionProps) {
  const [nameRevealed, setNameRevealed] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Trigger name reveal
  useEffect(() => {
    const timer = setTimeout(() => setNameRevealed(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect for label
  useEffect(() => {
    if (!nameRevealed) return;

    const startDelay = basics.name.length * 60 + 400;
    const startTimer = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const label = basics.label;
      const interval = setInterval(() => {
        i++;
        setTypedText(label.slice(0, i));
        if (i >= label.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowCursor(false);
            setShowDetails(true);
          }, 800);
        }
      }, 40);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [nameRevealed, basics.name.length, basics.label]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        className="animate-gradient-shift absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--hero-from) 0%, var(--hero-via) 50%, var(--hero-to) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Name - letter reveal */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ perspective: "600px" }}
        >
          {basics.name.split("").map((char, i) => (
            <span
              key={i}
              className={nameRevealed ? "animate-letter-reveal inline-block" : "inline-block opacity-0"}
              style={{
                animationDelay: `${i * 60}ms`,
                display: char === " " ? "inline" : "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Title - typing effect */}
        <div className="mb-8 h-8 text-xl font-medium text-blue-300 sm:text-2xl">
          <span>{typedText}</span>
          {showCursor && (
            <span className="animate-blink ml-0.5 inline-block w-0.5 h-6 bg-blue-300 align-middle" />
          )}
        </div>

        {/* Contact details - fade in */}
        <div
          className={`transition-all duration-700 ${
            showDetails
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {basics.email}
              </a>
            )}
            {basics.phone && (
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {basics.phone}
              </span>
            )}
            {basics.location?.city && (
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                </svg>
                {basics.location.city}, {basics.location.countryCode}
              </span>
            )}
          </div>

          {basics.profiles.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              {basics.profiles.map((profile) => (
                <span key={profile.network} className="flex items-center gap-1.5">
                  {profile.network === "GitHub" && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {profile.network === "LinkedIn" && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {profile.username}
                </span>
              ))}
            </div>
          )}

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <svg className="mx-auto h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
