// Removed direct imports of client components
// Removed supabase import as it's now used in lib/data.ts
// Removed unused Project import
import { HomePageClient } from "@/components/home-page-client"; // Import the client component
import { getProjects } from "@/lib/data"; // Import the data fetching function

// Removed internal getProjects function
// Removed commented-out getProjectBySlug function

export default async function HomePage() { // Make the component async
  const projects = await getProjects(); // Fetch data using the imported function

  return (
    // Render the client component and pass the fetched projects data
    <HomePageClient projects={projects} />
  );
}
