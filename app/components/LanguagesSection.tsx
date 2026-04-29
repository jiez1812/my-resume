import type { Language } from "@/app/types/resume";
import { SectionHeading } from "./SectionHeading";

interface LanguagesSectionProps {
  languages: Language[];
}

const FLUENCY_LEVELS: Record<string, number> = {
  Native: 100,
  "Professional Proficiency": 80,
  Conversational: 45,
};

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  if (languages.length === 0) return null;

  return (
    <section id="languages" className="mb-16">
      <SectionHeading>Languages</SectionHeading>
      <div className="grid gap-3 sm:grid-cols-2">
        {languages.map((lang) => (
          <div
            key={lang.language}
            className="rounded-lg border border-card-border bg-card-bg p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-semibold text-foreground">
                {lang.language}
              </h3>
              <span className="text-sm text-muted">{lang.fluency}</span>
            </div>
            {lang.description && (
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                {lang.description}
              </p>
            )}
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-card-border"
              aria-label={`${lang.language}: ${lang.fluency}`}
              role="img"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-blue-400"
                style={{ width: `${FLUENCY_LEVELS[lang.fluency] ?? 55}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
