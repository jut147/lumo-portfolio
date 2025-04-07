import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/project-card";

// Function to fetch projects (Consider moving to lib/data.ts later)
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
  return data as Project[];
}

export default async function ProjectsPage() {
  const projects = await getProjects(); // Fetch data

  return (
    // Use direct padding and max-width, significantly increased vertical padding
    <div className="px-4 lg:px-8 py-32 md:py-48 max-w-screen-2xl mx-auto"> {/* Increased py */}
      <h1 className="mb-12 md:mb-16 text-center text-4xl font-bold">My Projects</h1> {/* Increased mb */}

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
  );
}