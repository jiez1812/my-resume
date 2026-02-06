interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-card-border bg-card-bg py-8 text-center">
      <p className="text-sm text-muted">
        {year} {name}. Built with Next.js & Tailwind CSS.
      </p>
    </footer>
  );
}
