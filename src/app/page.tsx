// Remove direct imports of client components
// import { WavesHero } from "@/components/waves-hero";
// import { ProjectCard } from "@/components/project-card";
// import { supabase } from "@/lib/supabaseClient"; // No longer needed here
// import { Project } from "@/types/project"; // Keep type import if HomePageClient needs full type
import { HomePageClient } from "@/components/home-page-client"; // Import the client component
import { getAllProjects } from "@/lib/data"; // Import the corrected data fetching function

// Removed local getProjects function definition

export default function HomePage() { // Can be non-async now
  // Get the promise for the projects data
  const projectsPromise = getAllProjects();

  return (
    // Pass ProjectGrid Server Component as children, wrapped in Suspense
    <HomePageClient>
      <Suspense fallback={<ProjectGridSkeleton />}>
        {/* Removed unused @ts-expect-error */}
        <ProjectGrid projectsPromise={projectsPromise} />
      </Suspense>
    </HomePageClient>
  );
}
// Need to import Suspense and skeletons for this page
import { Suspense } from "react";
import ProjectGrid, { ProjectGridSkeleton } from "@/components/project-grid"; // Import both default and named export
