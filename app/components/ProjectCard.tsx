import type { Project } from "@/app/types/resume";
import { formatDate } from "@/app/lib/formatDate";
import { parseMarkdown } from "@/app/lib/parseMarkdown";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-300 hover:-translate-y-1 hover:border-l-4 hover:border-l-accent hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {project.name}
        </h3>
        <span className="text-sm text-muted">
          {formatDate(project.startDate)} &ndash;{" "}
          {formatDate(project.endDate)}
        </span>
      </div>

      <p className="mt-2 text-sm text-foreground/80">{project.description}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {project.highlights.map((highlight, idx) => (
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
  );
}
