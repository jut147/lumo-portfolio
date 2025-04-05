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
      <WavesHero className="mb-24" /> {/* Added margin-bottom */}
      {/* Introduction Section */}
      <section className="px-4 lg:px-8 py-16 md:py-24 max-w-screen-lg mx-auto text-center">
        <h2 className="mb-4 text-2xl md:text-3xl font-semibold">Welcome!</h2>
        <p className="text-muted-foreground md:text-lg">
          This is a placeholder for the introductory bio section. Here you can talk about yourself, your passion for web development, and what visitors can expect to find on your site.
        </p>
        {/* Optional: Add a Call to Action button here */}
      </section>

      {/* Project Showcase Section */}
      {/* Added margin-bottom */}
      <div id="projects-section" className="px-4 lg:px-8 py-32 md:py-48 max-w-screen-2xl mx-auto mb-24">
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
