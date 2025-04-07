export interface ContentSection {
  type: 'text' | 'image' | string; // Allow other types potentially
  content?: string; // For type 'text', potentially HTML
  src?: string; // For type 'image'
  alt?: string; // For type 'image'
}

export interface Project {
  id: string; // uuid
  title_client?: string | null; // text
  slug: string; // text, non-nullable
  category?: string | null; // text
  date_completed?: string | null; // date (consider using string for simplicity or Date if parsed)
  client_name?: string | null; // text
  client_website?: string | null; // text
  services?: string[] | null; // ARRAY of text
  project_brief_title?: string | null; // text
  project_brief_description?: string | null; // text
  gallery_images?: string[] | null; // ARRAY of text (assuming URLs)
  tech_stack?: string[] | null; // ARRAY of text
  outcome?: string | null; // text
  testimonial?: string | null; // text
  featured?: boolean | null; // boolean
  industry_tags?: string[] | null; // ARRAY of text
  brief_block1_title?: string | null; // text
  brief_block1_text?: string | null; // text
  brief_block1_image?: string | null; // text (URL?)
  brief_block2_title?: string | null; // text
  brief_block2_text?: string | null; // text
  brief_block2_image?: string | null; // text (URL?)
  brief_block3_title?: string | null; // text
  brief_block3_text?: string | null; // text
  brief_block3_image?: string | null; // text (URL?)
  brief_block4_title?: string | null; // text
  brief_block4_text?: string | null; // text
  brief_block4_image?: string | null; // text (URL?)
  created_at?: string | null; // timestamp with time zone
  content_sections?: ContentSection[] | null; // jsonb (assuming array of ContentSection)
  image_url?: string | null; // text (Is this the thumbnail?)
  hero_image_url?: string | null; // text
  project_link?: string | null; // text

  // Add 'title' based on usage in components, maybe map from title_client?
  title: string;

  // Add 'thumbnail_url' based on usage, map from image_url?
  thumbnail_url?: string | null;
}

// Note: The Project type now includes fields based on the DB schema.
// The data fetching logic in data.ts might need minor adjustments
// if we decide to map fields like 'image_url' to 'thumbnail_url' differently.
// For now, this type definition aims for closer alignment with the DB.
