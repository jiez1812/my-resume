import resumeData from "@/data/data.json";

// --- Type Definitions ---

interface Location {
  city: string;
  countryCode: string;
  region: string;
}

interface Profile {
  network: string;
  username: string;
  url: string;
}

interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

interface WorkExperience {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

interface Project {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  url: string;
}

interface Certificate {
  name: string;
  date: string;
  issuer: string;
  url: string;
}

interface Language {
  language: string;
  fluency: string;
}

interface ResumeData {
  basics: Basics;
  work: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
}

// --- Helpers ---

function formatDate(dateStr: string): string {
  if (dateStr === "Present") return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// --- Section Components ---

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-slate-800 border-b-2 border-slate-200 pb-2">
      {children}
    </h2>
  );
}

// --- Page ---

const data = resumeData as ResumeData;

export default function Home() {
  const { basics, work, education, skills, projects, certificates, languages } =
    data;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans sm:py-12">
      <main className="mx-auto max-w-4xl rounded-lg bg-white shadow-sm">
        {/* Header */}
        <header className="rounded-t-lg bg-slate-800 px-6 py-8 text-white sm:px-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {basics.name}
          </h1>
          <p className="mt-1 text-lg font-medium text-slate-300">
            {basics.label}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                className="hover:text-white transition-colors"
              >
                {basics.email}
              </a>
            )}
            {basics.phone && <span>{basics.phone}</span>}
            {basics.location?.city && (
              <span>
                {basics.location.city}, {basics.location.countryCode}
              </span>
            )}
          </div>

          {basics.profiles.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {basics.profiles.map((profile) => (
                <span key={profile.network} className="text-slate-400">
                  {profile.network}: {profile.username}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="px-6 py-8 sm:px-10">
          {/* Summary */}
          {basics.summary && (
            <section className="mb-8">
              <SectionHeading>Summary</SectionHeading>
              <p className="text-slate-600 leading-relaxed">
                {basics.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Skills</SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="mb-2 flex items-baseline justify-between">
                      <h3 className="font-semibold text-slate-800">
                        {skill.name}
                      </h3>
                      <span className="text-xs font-medium text-slate-500">
                        {skill.level}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {work.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-6">
                {work.map((job, index) => (
                  <div
                    key={`${job.name}-${index}`}
                    className="relative border-l-2 border-slate-200 pl-5"
                  >
                    <div className="absolute -left-1.75 top-1.5 h-3 w-3 rounded-full border-2 border-slate-400 bg-white" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                          {job.position}
                        </h3>
                        <p className="text-sm font-medium text-blue-700">
                          {job.name}
                        </p>
                      </div>
                      <span className="mt-1 text-sm text-slate-500 sm:mt-0 sm:shrink-0">
                        {formatDate(job.startDate)} &ndash;{" "}
                        {formatDate(job.endDate)}
                      </span>
                    </div>
                    {job.summary && (
                      <p className="mt-2 text-sm text-slate-600">
                        {job.summary}
                      </p>
                    )}
                    {job.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {job.highlights.map((highlight, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Projects</SectionHeading>
              <div className="grid gap-4 sm:grid-cols-1">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="rounded-lg border border-slate-200 p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {project.name}
                      </h3>
                      <span className="text-sm text-slate-500">
                        {formatDate(project.startDate)} &ndash;{" "}
                        {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {project.description}
                    </p>
                    {project.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {project.highlights.map((highlight, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={`${edu.institution}-${index}`}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {edu.studyType} in {edu.area}
                      </h3>
                      <p className="text-sm text-blue-700">{edu.institution}</p>
                      {edu.courses.length > 0 && (
                        <ul className="mt-1">
                          {edu.courses.map((course, cIdx) => (
                            <li
                              key={cIdx}
                              className="text-sm text-slate-500"
                            >
                              {course}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <span className="mt-1 text-sm text-slate-500 sm:mt-0 sm:shrink-0">
                      {formatDate(edu.startDate)} &ndash;{" "}
                      {formatDate(edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certificates.length > 0 && (
            <section className="mb-8">
              <SectionHeading>Certifications</SectionHeading>
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-slate-500">{cert.issuer}</p>
                    </div>
                    <span className="mt-1 text-sm text-slate-500 sm:mt-0 sm:shrink-0">
                      {formatDate(cert.date)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <SectionHeading>Languages</SectionHeading>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.language}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-center"
                  >
                    <p className="font-semibold text-slate-800">
                      {lang.language}
                    </p>
                    <p className="text-xs text-slate-500">{lang.fluency}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
