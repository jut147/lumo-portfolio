// Remove direct imports of client components
// import { WavesHero } from "@/components/waves-hero";
// import { ProjectCard } from "@/components/project-card";
import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/project";
import { HomePageClient } from "@/components/home-page-client"; // Import the new client component

// Function to fetch projects (can be defined here or in lib/data.ts)
async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projectclayton')
    .select('*')
    .order('created_at', { ascending: false }); // Example ordering

  if (error) {
    console.error("Error fetching projects:", error);
    // Handle error appropriately - maybe return empty array or throw
    return [];
  }
  // Basic type assertion (consider more robust validation if needed)
  // Basic type assertion (consider more robust validation if needed)
  return data as Project[];
}

// Function to fetch a single project by slug (can be defined here or in lib/data.ts)
// Remove unused function getProjectBySlug
/*
async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projectclayton')
    .select('*')
    .eq('slug', slug) // Filter by slug
    .single(); // Expect only one result

  if (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    // Return null if not found or error occurs
    return null;
  }
  return data as Project;
}
*/

export default async function HomePage() { // Make the component async
  const projects = await getProjects(); // Fetch data

  return (
    // Render the client component and pass the fetched projects data
    <HomePageClient projects={projects} />
  );
}
