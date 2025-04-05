export interface Project {
  id: string; // uuid
  title_client: string | null; // text
  slug: string; // text, NOT NULL
  category: string | null; // text
  date_completed: string | null; // date (keep as string for flexibility)
  client_name: string | null; // text
  client_website: string | null; // text
  services: string[] | null; // ARRAY
  project_brief_title: string | null; // text
  project_brief_description: string | null; // text
  gallery_images: string[] | null; // ARRAY (assuming array of URLs)
  tech_stack: string[] | null; // ARRAY
  outcome: string | null; // text
  testimonial: string | null; // text
  featured: boolean | null; // boolean
  industry_tags: string[] | null; // ARRAY
  brief_block1_title: string | null; // text
  brief_block1_text: string | null; // text
  brief_block1_image: string | null; // text
  brief_block2_title: string | null; // text
  brief_block2_text: string | null; // text
  brief_block2_image: string | null; // text
  brief_block3_title: string | null; // text
  brief_block3_text: string | null; // text
  brief_block3_image: string | null; // text
  brief_block4_title: string | null; // text
  brief_block4_text: string | null; // text
  brief_block4_image: string | null; // text
  created_at: string | null; // timestamp with time zone
  content_sections: ContentSection[] | null; // jsonb (assuming compatible structure)
  image_url: string | null; // text (for card/list view)
  hero_image_url: string | null; // text (for project page hero)
  project_link: string | null; // text
}

// Define a more specific type for content sections stored in jsonb
// Keep this definition as it likely matches the intended structure
export type ContentSection =
  | { type: 'text'; content: string }
  | { type: 'image'; src: string; alt?: string };
