import type { Profile, ResumeData } from "@/app/types/resume";
import { formatDate } from "@/app/lib/formatDate";
import { parseMarkdown } from "@/app/lib/parseMarkdown";

interface PrintResumeProps {
  data: ResumeData;
}

function cleanUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function profileHandle(profile: Profile) {
  const path = cleanUrl(profile.url).split("/").filter(Boolean);
  const handle = path.at(-1);

  return handle || profile.username;
}

function profileLabel(profile: Profile) {
  return `${profile.network.toLowerCase()}/${profileHandle(profile)}`;
}

export function PrintResume({ data }: PrintResumeProps) {
  const { basics, work, education, skills, projects, certificates, languages } =
    data;
  const hasSupplemental = certificates.length > 0 || languages.length > 0;

  return (
    <div className="print-only">
      {/* Header */}
      <header className="print-header">
        <h1 className="print-name">{basics.name}</h1>
        <p className="print-label">{basics.label}</p>
        <div className="print-contact">
          {basics.email && <a href={`mailto:${basics.email}`}>{basics.email}</a>}
          {basics.phone && <a href={`tel:${basics.phone}`}>{basics.phone}</a>}
          {basics.location?.city && (
            <span>
              {basics.location.city}, {basics.location.countryCode}
            </span>
          )}
          {basics.url && <a href={basics.url}>{cleanUrl(basics.url)}</a>}
          {basics.profiles.map((p) => (
            <a key={`${p.network}-${p.url}`} href={p.url}>
              {profileLabel(p)}
            </a>
          ))}
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="print-section">
          <h2 className="print-section-title">Professional Summary</h2>
          <p className="print-text">{basics.summary}</p>
        </section>
      )}

      {/* Experience */}
      {work.length > 0 && (
        <section className="print-section">
          <h2 className="print-section-title">Professional Experience</h2>
          {work.map((job, i) => (
            <div key={`${job.name}-${i}`} className="print-job">
              <div className="print-job-header">
                <div>
                  <span className="print-job-title">{job.position}</span>
                  <span className="print-job-separator"> | </span>
                  <span className="print-job-company">{job.name}</span>
                </div>
                <span className="print-job-dates">
                  {formatDate(job.startDate)} &ndash; {formatDate(job.endDate)}
                </span>
              </div>
              {job.highlights.length > 0 && (
                <ul className="print-job-highlights">
                  {job.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(h) }}
                    />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="print-section">
          <h2 className="print-section-title">Projects</h2>
          {projects.map((project) => (
            <div key={project.name} className="print-job">
              <div className="print-job-header">
                <span className="print-job-title">{project.name}</span>
                {project.startDate && (
                  <span className="print-job-dates">
                    {formatDate(project.startDate)} &ndash;{" "}
                    {formatDate(project.endDate ?? "")}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="print-text print-project-description">
                  {project.description}
                </p>
              )}
              {project.highlights.length > 0 && (
                <ul className="print-job-highlights">
                  {project.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(h) }}
                    />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="print-section print-skills-section">
          <h2 className="print-section-title">Technical Skills</h2>
          <div className="print-skills-list">
            {skills.map((skill) => (
              <div key={skill.name} className="print-skill-group">
                <span className="print-skills-category">{skill.name}</span>
                <span className="print-skills-keywords">
                  {skill.keywords.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="print-section">
          <h2 className="print-section-title">Education</h2>
          {education.map((edu, i) => (
            <div key={`${edu.institution}-${i}`} className="print-edu">
              <div className="print-job-header">
                <div>
                  <span className="print-job-title">
                    {edu.studyType} in {edu.area}
                  </span>
                  <span className="print-job-separator"> | </span>
                  <span className="print-job-company">{edu.institution}</span>
                </div>
                <span className="print-job-dates">
                  {formatDate(edu.startDate)} &ndash;{" "}
                  {formatDate(edu.endDate)}
                </span>
              </div>
              {edu.courses.length > 0 && (
                <ul className="print-job-highlights">
                  {edu.courses.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Languages side by side */}
      {hasSupplemental && (
        <div className="print-two-col">
          {certificates.length > 0 && (
            <section className="print-section print-col">
              <h2 className="print-section-title">Certifications</h2>
              {certificates.map((cert) => (
                <div key={cert.name} className="print-cert">
                  <span className="print-cert-name">{cert.name}</span>
                  <span className="print-cert-detail">
                    {cert.issuer} &mdash; {formatDate(cert.date)}
                  </span>
                </div>
              ))}
            </section>
          )}
          {languages.length > 0 && (
            <section className="print-section print-col">
              <h2 className="print-section-title">Languages</h2>
              <div className="print-languages">
                {languages.map((lang) => (
                  <div key={lang.language} className="print-lang">
                    <span className="print-lang-line">
                      <strong>{lang.language}</strong> ({lang.fluency})
                    </span>
                    {lang.description && (
                      <span className="print-lang-desc">{lang.description}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
