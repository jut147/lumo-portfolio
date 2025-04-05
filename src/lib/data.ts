import { supabase } from "@/lib/supabaseClient"; // Corrected import path
import { Project } from "@/types/project";

// Function to fetch projects
export async function getProjects(): Promise<Project[]> {
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

// Function to fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projectclayton')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error(`Error fetching project ${slug}:`, error);
    // Return null; the page component will handle the 404
    return null;
  }
  // Basic type assertion (consider more robust validation if needed)
  return data as Project;
}

// Function to fetch all project slugs for static generation
export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase
    .from('projectclayton')
    .select('slug');

  if (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
  // Ensure data is not null and is an array before returning
  return (data || []) as { slug: string }[];
}

// Add other data fetching functions related to the project here in the future
