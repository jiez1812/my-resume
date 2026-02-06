interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-8 w-1 rounded-full bg-accent" />
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {children}
      </h2>
    </div>
  );
}
