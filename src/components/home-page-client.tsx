"use client"; // Mark as a Client Component

import { WavesHero } from "@/components/waves-hero";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/project-card";

interface HomePageClientProps {
  projects: Project[];
}

export function HomePageClient({ projects }: HomePageClientProps) {
  return (
    <div>
      <WavesHero className="mb-16" /> {/* Added margin-bottom */}
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
