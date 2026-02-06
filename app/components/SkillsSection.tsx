import type { Skill } from "@/app/types/resume";
import { SectionHeading } from "./SectionHeading";
import { SkillCard } from "./SkillCard";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="mb-16">
      <SectionHeading>Skills</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}
