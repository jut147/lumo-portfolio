// Removed supabase import, using lib/data.ts now
// import { Project } from "@/types/project"; // Keep type import
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/data"; // Import centralized function

// Removed local getProjects function definition

export default async function ProjectsPage() {
  const projects = await getAllProjects(); // Use imported function

  return (
    // Use direct padding and max-width, significantly increased vertical padding
    // Padding will be adjusted in the next step
    <div className="px-4 lg:px-8 pt-20 pb-16 max-w-screen-2xl mx-auto"> {/* Increased py */}
      <h1 className="mb-12 md:mb-16 text-center text-4xl font-bold">My Projects</h1> {/* Increased mb */}

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            // Ensure ProjectCard receives the correct props based on getAllProjects return type
            // Assuming getAllProjects now returns enough data for the card
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No projects found.</p>
      )}
    </div>
  );
}