"use client"; // Mark as a Client Component

import { WavesHero } from "@/components/waves-hero";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/project-card";
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline";

interface HomePageClientProps {
  projects: Project[];
}

export function HomePageClient({ projects }: HomePageClientProps) {
  return (
    <div>
      <WavesHero className="mb-16" /> {/* Added margin-bottom */}

      {/* Our Process Section */}
      <section className="px-4 lg:px-8 py-16 md:py-24 max-w-screen-2xl mx-auto mb-16">
        <h2 className="mb-16 md:mb-20 text-center text-3xl md:text-4xl font-bold">Our Process</h2>
        <Timeline positions="center"> {/* Added positions="center" */}
          <TimelineItem status="default"> {/* Using default status for all initially */}
            <TimelineHeading>Plan (Discovery & Strategy)</TimelineHeading>
            <TimelineDot status="default" />
            <TimelineLine />
            <TimelineContent>
              We start by deeply understanding your vision, target audience, and business goals. Through collaborative workshops, we define project scope, map user journeys, and create a clear strategic roadmap.
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="default">
            <TimelineHeading side="left">Design (UI/UX & Prototyping)</TimelineHeading> {/* Set side="left" */}
            <TimelineDot status="default" />
            <TimelineLine />
            <TimelineContent side="left"> {/* Set side="left" */}
              Our design phase focuses on crafting intuitive user experiences and visually stunning interfaces that align with your brand. We create wireframes, mockups, and interactive prototypes for your feedback and approval.
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="default">
            <TimelineHeading>Build (Development & Engineering)</TimelineHeading> {/* Default side="right" */}
            <TimelineDot status="default" />
            <TimelineLine />
            <TimelineContent>
              Translating designs into high-quality code using modern technologies like React, Next.js, and Tailwind CSS. We follow best practices for clean, scalable, and maintainable codebases.
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="default">
            <TimelineHeading side="left">Test (Quality Assurance)</TimelineHeading> {/* Set side="left" */}
            <TimelineDot status="default" />
            <TimelineLine />
            <TimelineContent side="left"> {/* Set side="left" */}
              Rigorous testing across devices and browsers ensures a seamless, bug-free experience. We conduct functional, performance, and usability testing, incorporating your feedback throughout.
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="default">
            <TimelineHeading>Launch (Deployment & Handover)</TimelineHeading> {/* Default side="right" */}
            <TimelineDot status="default" />
            <TimelineLine />
            <TimelineContent>
              We handle the deployment process, ensuring a smooth transition to live. You receive comprehensive documentation and training for a successful handover.
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="default">
            <TimelineHeading side="left">Done! (Support & Growth)</TimelineHeading> {/* Set side="left" */}
            <TimelineDot status="default" />
            {/* No TimelineLine needed for the last item */}
            <TimelineContent side="left"> {/* Set side="left" */}
              Project launch is just the beginning. We offer ongoing support and partnership to help your digital presence evolve and grow.
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </section>

      {/* Project Showcase Section */}
      {/* Added margin-bottom */}
      <div id="projects-section" className="px-4 lg:px-8 py-16 md:py-24 max-w-screen-2xl mx-auto mb-16">
         <h2 className="mb-16 md:mb-20 text-center text-3xl md:text-4xl font-bold">Projects</h2>
         {projects.length > 0 ? (
           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
             {projects.map((project) => (
               <ProjectCard key={project.id} project={project} />
             ))}
           </div>
         ) : (
           <p className="text-center text-muted-foreground">No projects found.</p>
         )}
      </div>
    </div>
  );
}
