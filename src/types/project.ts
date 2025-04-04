export interface Project {
  id: string;
  title: string;
  description: string | null;
  image: string | null; // Changed from image_url
  project_link: string | null;
  created_at: string; // Or Date if you parse it
}
