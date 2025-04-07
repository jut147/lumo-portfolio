// Remove direct imports of client components
// import { WavesHero } from "@/components/waves-hero";
// import { ProjectCard } from "@/components/project-card";
// import { supabase } from "@/lib/supabaseClient"; // No longer needed here
// import { Project } from "@/types/project"; // Keep type import if HomePageClient needs full type
import { HomePageClient } from "@/components/home-page-client"; // Import the client component
import { getAllProjects } from "@/lib/data"; // Import the corrected data fetching function

// Removed local getProjects function definition

export default async function HomePage() { // Make the component async
  // Fetch data using the corrected function from lib/data.ts
  // Note: getAllProjects returns a Pick<...> type, adjust HomePageClient props if needed
  const projects = await getAllProjects();

  return (
    // Render the client component and pass the fetched projects data
    <HomePageClient projects={projects} />
  );
}
