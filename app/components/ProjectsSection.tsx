import type { Project } from "@/app/types/resume";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="mb-16">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
