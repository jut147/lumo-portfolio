import { z } from 'zod';
import { supabase } from "@/lib/supabaseClient"; // Corrected import path
import { Project } from "@/types/project";

// Function to fetch projects
// Zod schema for ContentSection
const contentSectionSchema = z.union([
  z.object({ type: z.literal('text'), content: z.string() }),
  z.object({ type: z.literal('image'), src: z.string().url(), alt: z.string().optional() })
]);

// Zod schema for Project
const projectSchema = z.object({
  id: z.string().uuid(),
  title_client: z.string().nullable(),
  slug: z.string(),
  category: z.string().nullable(),
  date_completed: z.string().nullable(), // Could add .refine for date format if needed
  client_name: z.string().nullable(),
  client_website: z.string().url().nullable(),
  services: z.array(z.string()).nullable(),
  project_brief_title: z.string().nullable(),
  project_brief_description: z.string().nullable(),
  gallery_images: z.array(z.string().url()).nullable(),
  tech_stack: z.array(z.string()).nullable(),
  outcome: z.string().nullable(),
  testimonial: z.string().nullable(),
  featured: z.boolean().nullable(),
  industry_tags: z.array(z.string()).nullable(),
  brief_block1_title: z.string().nullable(),
  brief_block1_text: z.string().nullable(),
  brief_block1_image: z.string().url().nullable(),
  brief_block2_title: z.string().nullable(),
  brief_block2_text: z.string().nullable(),
  brief_block2_image: z.string().url().nullable(),
  brief_block3_title: z.string().nullable(),
  brief_block3_text: z.string().nullable(),
  brief_block3_image: z.string().url().nullable(),
  brief_block4_title: z.string().nullable(),
  brief_block4_text: z.string().nullable(),
  brief_block4_image: z.string().url().nullable(),
  created_at: z.string().datetime({ offset: true }).nullable(), // Expect ISO 8601 with timezone
  content_sections: z.array(contentSectionSchema).nullable(),
  image_url: z.string().url().nullable(),
  hero_image_url: z.string().url().nullable(),
  project_link: z.string().url().nullable(),
});

// Zod schema for an array of projects
const projectsSchema = z.array(projectSchema);

// Zod schema for slugs array
const slugsSchema = z.array(z.object({ slug: z.string() }));

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projectclayton')
    .select('*')
    .order('created_at', { ascending: false }); // Example ordering

  if (error || !data) {
    console.error("Error fetching projects:", error);
    // Handle error appropriately - maybe return empty array or throw
    return [];
  }

  // Validate data with Zod
  const validationResult = projectsSchema.safeParse(data);
  if (!validationResult.success) {
    console.error("Zod validation failed for projects:", validationResult.error);
    // Handle validation error - return empty array for now
    return [];
  }

  console.log(`Fetched ${validationResult.data.length} projects successfully.`); // Add log
  return validationResult.data;
}

// Function to fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  console.log(`Fetching project with slug: ${slug}...`); // Add log
  const { data, error } = await supabase
    .from('projectclayton')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    // Log different errors depending on the cause
    if (error.code === 'PGRST116') { // Code for 'No rows found' with .single()
      console.warn(`Project with slug "${slug}" not found.`);
    } else {
      console.error(`Error fetching project ${slug}:`, error);
    }
    return null; // Return null for not found or other errors
  }

  // Validate data with Zod
  const validationResult = projectSchema.safeParse(data);
  if (!validationResult.success) {
    console.error(`Zod validation failed for project ${slug}:`, validationResult.error);
    // Handle validation error - return null for now
    return null;
  }

  console.log(`Fetched project "${slug}" successfully.`); // Add log
  return validationResult.data;
}

// Function to fetch all project slugs for static generation
export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  console.log("Fetching all project slugs..."); // Add log
  const { data, error } = await supabase
    .from('projectclayton')
    .select('slug');

  if (error || !data) {
    console.error("Error fetching project slugs:", error);
    return [];
  }

  // Validate data with Zod
  const validationResult = slugsSchema.safeParse(data);
   if (!validationResult.success) {
    console.error("Zod validation failed for slugs:", validationResult.error);
    // Handle validation error - return empty array for now
    return [];
  }

  console.log(`Fetched ${validationResult.data.length} slugs successfully.`); // Add log
  return validationResult.data;
}

// Add other data fetching functions related to the project here in the future
