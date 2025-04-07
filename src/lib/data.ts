import { supabase } from './supabaseClient';
import { Project } from '@/types/project'; // Import Project type

// Fetch all projects for the listing page
// Select fields needed for cards from projectclayton
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projectclayton') // Use correct table name
    .select('*') // Select relevant fields
    .order('date_completed', { ascending: false, nullsFirst: false }); // Order by date

  if (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
  // Type assertion should be safe if type definition matches schema
  return data as Project[]; // Return array of full Project objects
}

// Fetch a single project by its slug for the detail page
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projectclayton') // Use correct table name
    .select('*') // Select all columns
    .eq('slug', slug) // Filter by slug
    .single(); // Expect only one result

  if (error) {
     // Log specific error for not found vs other errors
    if (error.code === 'PGRST116') { // Code for "Resource Not Found"
        console.log(`Project with slug "${slug}" not found.`);
    } else {
        console.error(`Error fetching project with slug "${slug}":`, error);
    }
    return null; // Return null if not found or error occurs
  }

  // Type assertion should be safe if type definition matches schema
  // Ensure content_sections is parsed correctly if needed (Supabase client might handle jsonb automatically)
  return data as Project;
}

// Fetch all project slugs for generateStaticParams
export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase
    .from('projectclayton') // Use correct table name
    .select('slug'); // Select slug

  if (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }

  return data as { slug: string }[];
}