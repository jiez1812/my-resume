import type { Education } from "@/app/types/resume";
import { SectionHeading } from "./SectionHeading";
import { formatDate } from "@/app/lib/formatDate";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) return null;

  return (
    <section id="education" className="mb-16">
      <SectionHeading>Education</SectionHeading>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={`${edu.institution}-${index}`}
            className="rounded-lg border border-card-border bg-card-bg p-5 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="font-semibold text-foreground">
                  {edu.studyType} in {edu.area}
                </h3>
                <p className="text-sm font-medium text-accent">
                  {edu.institution}
                </p>
              </div>
              <span className="mt-1 text-sm text-muted sm:mt-0 sm:shrink-0">
                {formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}
              </span>
            </div>
            {edu.courses.length > 0 && (
              <ul className="mt-2">
                {edu.courses.map((course, cIdx) => (
                  <li key={cIdx} className="text-sm text-muted">
                    {course}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
