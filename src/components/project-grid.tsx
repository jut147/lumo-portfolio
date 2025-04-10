import { Project } from "@/types/project";
import { ProjectCard } from "@/components/project-card";
import { ProjectCardSkeleton } from "@/components/project-card-skeleton"; // Import card skeleton

// Skeleton component for the project grid section
export function ProjectGridSkeleton() { // Export the skeleton
  return (
    <>
      {/* Heading is now part of the actual ProjectGrid component */}
      <h2 className="mb-16 md:mb-20 text-center text-3xl md:text-4xl font-bold invisible">Projects</h2> {/* Keep for layout spacing, but hide */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => ( // Show 3 skeletons initially
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

// This is now a Server Component by default (no "use client")
export default async function ProjectGrid({ projectsPromise }: { projectsPromise: Promise<Project[]> }) {
  const projects = await projectsPromise;

  return (
    <>
      {/* Added heading here, removed from skeleton */}
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
    </>
  );
}
