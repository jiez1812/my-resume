import type { Certificate } from "@/app/types/resume";
import { SectionHeading } from "./SectionHeading";
import { formatDate } from "@/app/lib/formatDate";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (certificates.length === 0) return null;

  return (
    <section id="certifications" className="mb-16">
      <SectionHeading>Certifications</SectionHeading>
      <div className="space-y-3">
        {certificates.map((cert) => (
          <div
            key={cert.name}
            className="flex flex-col rounded-lg border border-card-border bg-card-bg p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md sm:flex-row sm:items-baseline sm:justify-between"
          >
            <div>
              <h3 className="font-semibold text-foreground">{cert.name}</h3>
              <p className="text-sm text-muted">{cert.issuer}</p>
            </div>
            <span className="mt-1 text-sm text-muted sm:mt-0 sm:shrink-0">
              {formatDate(cert.date)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
