import type { WorkExperience } from "@/app/types/resume";
import { formatDate } from "@/app/lib/formatDate";
import { parseMarkdown } from "@/app/lib/parseMarkdown";

interface TimelineItemProps {
  job: WorkExperience;
}

export function TimelineItem({ job }: TimelineItemProps) {
  return (
    <div className="relative pl-8">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent/20" />

      {/* Timeline dot */}
      <div className="absolute -left-1.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-card-bg" />

      <div className="rounded-lg border border-card-border bg-card-bg p-5 transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {job.position}
            </h3>
            <p className="text-sm font-medium text-accent">{job.name}</p>
          </div>
          <span className="mt-1 text-sm text-muted sm:mt-0 sm:shrink-0">
            {formatDate(job.startDate)} &ndash; {formatDate(job.endDate)}
          </span>
        </div>

        {job.summary && (
          <p className="mt-2 text-sm text-muted">{job.summary}</p>
        )}

        {job.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {job.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                <span dangerouslySetInnerHTML={{ __html: parseMarkdown(highlight) }} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
