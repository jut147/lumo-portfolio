import { ContentSection } from "@/types/project"; // Removed unused Project type import
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data";
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button for CTA
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery"; // Add import for Bento Gallery

// Define props type expecting params as a Promise (for Next.js 15+)
type ProjectPageProps = {
  params: Promise<{ slug: string }>;
  // searchParams?: { [key: string]: string | string[] | undefined }; // Optional searchParams if needed
};

// Use the defined props type and await params
export default async function ProjectPage({ params }: ProjectPageProps) {
  // Await params before accessing slug
  const { slug } = await params;
  const project = await getProjectBySlug(slug); // Use awaited slug

  if (!project) {
    notFound();
  }

  // Ensure bento_gallery_items is always an array for the new gallery
  const bentoGalleryItems = project.bento_gallery_items ?? [];
  // Ensure services and tech_stack are arrays for mapping
  const services = project.services ?? [];
  const techStack = project.tech_stack ?? [];

  return (
    // Removed container classes, added padding back
    <main className="pt-20 pb-16">
      {/* --- Top Section Grid --- */}
      {/* Reduced large screen gap from lg:gap-12 to lg:gap-8 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

        {/* --- Left Column (Main Content) --- */}
        {/* Added max-w-prose to constrain text width */}
        <div className="lg:col-span-2 space-y-12 max-w-prose">

          {/* Title & Description Group */}
          <div>
            <h1 className="mb-4 text-3xl md:text-5xl font-bold text-left">
              {project.title_client || project.title}
            </h1>
            {project.project_brief_description ? (
              <p className="text-lg text-muted-foreground text-left">
                {project.project_brief_description}
              </p>
            ) : null}
          </div>

          {/* Narrative Section 1 */}
          {project.brief_block1_title && project.brief_block1_text && (
            <div>
              <h2 className="mb-4 text-xl md:text-2xl font-semibold">{project.brief_block1_title}</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>{project.brief_block1_text}</p>
              </div>
            </div>
          )}

          {/* Narrative Section 2 */}
          {project.brief_block2_title && project.brief_block2_text && (
            <div>
              <h2 className="mb-4 text-xl md:text-2xl font-semibold">{project.brief_block2_title}</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>{project.brief_block2_text}</p>
              </div>
            </div>
          )}

          {/* Dynamic Content Sections (Conditional) */}
          {project.content_sections && project.content_sections.length > 0 ? (
            <div className="space-y-12">
              {project.content_sections.map((section: ContentSection, index: number) => (
                <div key={index}>
                  {section.type === 'text' && typeof section.content === 'string' ? (
                    <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                  ) : null}
                  {section.type === 'image' && typeof section.src === 'string' ? (
                    <div className="relative aspect-video my-6 overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={section.src}
                        alt={section.alt || `Project content image ${index + 1}`}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div> {/* --- End Left Column --- */}

        {/* --- Right Column (Key Info Panel) --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-muted/50 dark:bg-neutral-900/50 p-6 rounded-lg border border-border space-y-4 text-sm">
             <h3 className="font-semibold text-lg text-foreground mb-4">Project Details</h3>
             {project.client_name && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-foreground w-16 flex-shrink-0">Client:</span>
                <span>{project.client_name}</span>
              </div>
            )}
            {project.date_completed && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-foreground w-16 flex-shrink-0">Date:</span>
                <span>{project.date_completed}</span>
              </div>
            )}
            {project.category && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-foreground w-16 flex-shrink-0">Category:</span>
                <span>{project.category}</span>
              </div>
            )}
            {project.client_website && (
               <div className="flex items-start gap-2">
                 <span className="font-medium text-foreground w-16 flex-shrink-0">Website:</span>
                 <Link
                   href={project.client_website}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-primary hover:underline break-all"
                  >
                   <span>{project.client_website.replace(/^https?:\/\//, '')}</span> {/* Wrap text in span */}
                 </Link>
               </div>
            )}
            {services.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-foreground w-16 flex-shrink-0">Services:</span>
                <div className="flex flex-wrap gap-1">
                  {services.map(service => <Badge key={service} variant="secondary" className="text-xs">{service}</Badge>)}
                </div>
              </div>
            )}
            {techStack.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-foreground w-16 flex-shrink-0">Tech:</span>
                <div className="flex flex-wrap gap-1">
                  {techStack.map(tech => <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>)}
                </div>
              </div>
            )}
          </div>
        </div> {/* --- End Right Column --- */}

      </div> {/* --- End Top Section Grid --- */}
      {/* --- Gallery Section (Below Grid) --- */}
      {bentoGalleryItems.length > 0 ? (
        <div className="my-16">
          <h2 className="mb-8 text-xl md:text-2xl font-semibold text-center">Visual Showcase</h2>
          <InteractiveBentoGallery
            mediaItems={bentoGalleryItems}
          />
        </div>
      ) : null}
      {/* --- CTA Section --- */}
      <div className="text-center mt-16">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Interested in a similar project?</h2>
        <Button asChild size="lg">
          <Link href="/contact">Get In Touch</Link>
        </Button>
      </div>
    </main>
  );
}

// Generate static paths (remains the same)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
   const projects = await getAllProjectSlugs();
   return projects.map((proj: { slug: string }) => ({
     slug: proj.slug,
   }));
}

// Optional: Revalidate data periodically or on demand
// export const revalidate = 3600; // Revalidate every hour
