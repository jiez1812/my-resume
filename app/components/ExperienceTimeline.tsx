import type { WorkExperience } from "@/app/types/resume";
import { SectionHeading } from "./SectionHeading";
import { TimelineItem } from "./TimelineItem";
import { ScrollReveal } from "./ScrollReveal";

interface ExperienceTimelineProps {
  work: WorkExperience[];
}

export function ExperienceTimeline({ work }: ExperienceTimelineProps) {
  if (work.length === 0) return null;

  return (
    <section id="experience" className="mb-16">
      <SectionHeading>Experience</SectionHeading>
      <div className="space-y-6">
        {work.map((job, index) => (
          <ScrollReveal
            key={`${job.name}-${index}`}
            direction="left"
            delay={index * 150}
          >
            <TimelineItem job={job} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
