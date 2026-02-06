import resumeData from "@/data/data.json";
import type { ResumeData } from "@/app/types/resume";
import { Navbar } from "@/app/components/Navbar";
import { HeroSection } from "@/app/components/HeroSection";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { SectionHeading } from "@/app/components/SectionHeading";
import { SkillsSection } from "@/app/components/SkillsSection";
import { ExperienceTimeline } from "@/app/components/ExperienceTimeline";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { EducationSection } from "@/app/components/EducationSection";
import { CertificatesSection } from "@/app/components/CertificatesSection";
import { LanguagesSection } from "@/app/components/LanguagesSection";
import { Footer } from "@/app/components/Footer";
import { PrintResume } from "@/app/components/PrintResume";
import { PrintButton } from "@/app/components/PrintButton";

const data = resumeData as ResumeData;

const SECTION_IDS = [
  "hero",
  "summary",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
  "languages",
];

export default function Home() {
  const { basics, work, education, skills, projects, certificates, languages } =
    data;

  return (
    <>
      {/* Website UI (hidden when printing) */}
      <div className="screen-only min-h-screen bg-background">
        <Navbar name={basics.name} sectionIds={SECTION_IDS} />

        <HeroSection basics={basics} />

        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Summary */}
          {basics.summary && (
            <ScrollReveal>
              <section id="summary" className="mb-16">
                <SectionHeading>Summary</SectionHeading>
                <p className="max-w-3xl text-lg leading-relaxed text-foreground/80">
                  {basics.summary}
                </p>
              </section>
            </ScrollReveal>
          )}

          {/* Skills */}
          <ScrollReveal>
            <SkillsSection skills={skills} />
          </ScrollReveal>

          {/* Experience */}
          <ScrollReveal>
            <ExperienceTimeline work={work} />
          </ScrollReveal>

          {/* Projects */}
          <ScrollReveal>
            <ProjectsSection projects={projects} />
          </ScrollReveal>

          {/* Education */}
          <ScrollReveal delay={100}>
            <EducationSection education={education} />
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal delay={100}>
            <CertificatesSection certificates={certificates} />
          </ScrollReveal>

          {/* Languages */}
          <ScrollReveal delay={100}>
            <LanguagesSection languages={languages} />
          </ScrollReveal>
        </main>

        <Footer name={basics.name} />
      </div>

      {/* Print-friendly resume (hidden on screen, shown when printing) */}
      <PrintResume data={data} />

      {/* Floating download button */}
      <PrintButton />
    </>
  );
}
