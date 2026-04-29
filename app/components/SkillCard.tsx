import type { Skill } from "@/app/types/resume";

const LEVEL_MAP: Record<string, number> = {
  Beginner: 25,
  Competent: 50,
  Proficient: 75,
  Advanced: 90,
  Expert: 100,
};

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const pct = LEVEL_MAP[skill.level] ?? 50;

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-semibold text-foreground">{skill.name}</h3>
        <span className="text-xs font-medium text-muted">{skill.level}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {skill.keywords.map((keyword) => (
          <span
            key={keyword}
            className="inline-block rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent"
          >
            {keyword}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-card-border">
        <div
          className="animate-progress-fill h-full rounded-full bg-gradient-to-r from-accent to-blue-400"
          style={{ "--tw-scale-x": "1", width: `${pct}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
