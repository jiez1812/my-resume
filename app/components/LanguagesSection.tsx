import type { Language } from "@/app/types/resume";
import { SectionHeading } from "./SectionHeading";

interface LanguagesSectionProps {
  languages: Language[];
}

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  if (languages.length === 0) return null;

  return (
    <section id="languages" className="mb-16">
      <SectionHeading>Languages</SectionHeading>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <div
            key={lang.language}
            className="rounded-lg border border-card-border bg-card-bg px-5 py-3 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            <p className="font-semibold text-foreground">{lang.language}</p>
            <p className="text-xs text-muted">{lang.fluency}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
