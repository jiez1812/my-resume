import type { ResumeData } from "@/app/types/resume";
import { formatDate } from "@/app/lib/formatDate";

interface PrintResumeProps {
  data: ResumeData;
}

export function PrintResume({ data }: PrintResumeProps) {
  const { basics, work, education, skills, projects, certificates, languages } =
    data;

  return (
    <div className="print-only">
      {/* Header */}
      <header className="print-header">
        <h1 className="print-name">{basics.name}</h1>
        <p className="print-label">{basics.label}</p>
        <div className="print-contact">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location?.city && (
            <span>
              {basics.location.city}, {basics.location.countryCode}
            </span>
          )}
          {basics.profiles.map((p) => (
            <span key={p.network}>
              {p.network}: {p.username}
            </span>
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

      {/* Skills */}
      {skills.length > 0 && (
        <section className="print-section">
          <h2 className="print-section-title">Technical Skills</h2>
          <table className="print-skills-table">
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.name}>
                  <td className="print-skills-category">{skill.name}</td>
                  <td className="print-skills-keywords">
                    {skill.keywords.join("  |  ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    <li key={idx}>{h}</li>
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
                <span className="print-job-dates">
                  {formatDate(project.startDate)} &ndash;{" "}
                  {formatDate(project.endDate)}
                </span>
              </div>
              <p className="print-text" style={{ marginBottom: "2pt" }}>
                {project.description}
              </p>
              {project.highlights.length > 0 && (
                <ul className="print-job-highlights">
                  {project.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
                <span key={lang.language} className="print-lang">
                  <strong>{lang.language}</strong> ({lang.fluency})
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
