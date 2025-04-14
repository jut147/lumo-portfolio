import { supabase } from './supabaseClient';
import { Project } from '@/types/project'; // Import Project type

// Fetch all projects for the listing page
// Select fields needed for cards from projectclayton
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projectclayton') // Use correct table name
    .select('id, slug, title_client, category, hero_image_url, project_brief_description') // Select relevant fields
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

  // Safely parse JSONB fields returned as strings
  if (data && typeof data.bento_gallery_items === 'string') {
    try {
      data.bento_gallery_items = JSON.parse(data.bento_gallery_items);
    } catch (parseError) {
      console.error(`Error parsing bento_gallery_items for slug "${slug}":`, parseError);
      data.bento_gallery_items = null; // Set to null on parse error
    }
  } else if (data && data.bento_gallery_items !== null) {
     // If it's not a string and not null, ensure it's an array (or set to null if invalid)
     if (!Array.isArray(data.bento_gallery_items)) {
        console.warn(`Unexpected type for bento_gallery_items for slug "${slug}":`, typeof data.bento_gallery_items);
        data.bento_gallery_items = null;
     }
  }

  // Add similar parsing for content_sections if it's also JSONB
  if (data && typeof data.content_sections === 'string') {
    try {
      data.content_sections = JSON.parse(data.content_sections);
    } catch (parseError) {
      console.error(`Error parsing content_sections for slug "${slug}":`, parseError);
      data.content_sections = null; // Set to null on parse error
    }
  } else if (data && data.content_sections !== null) {
     if (!Array.isArray(data.content_sections)) {
        console.warn(`Unexpected type for content_sections for slug "${slug}":`, typeof data.content_sections);
        data.content_sections = null;
     }
  }


  // Type assertion is now safer after parsing
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