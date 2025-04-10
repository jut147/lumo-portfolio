import { ProjectCardSkeleton } from "@/components/project-card-skeleton";

export default function ProjectsLoading() {
  return (
    // Match page padding
    <div className="pt-20 pb-16">
      {/* Static Heading */}
      <h1 className="mb-12 md:mb-16 text-center text-4xl font-bold">My Projects</h1>

      {/* Grid of Skeletons */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Render multiple skeletons to mimic loading state */}
        {[...Array(6)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
