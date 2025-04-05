// Removed supabase import, using lib/data.ts now
import { Project, ContentSection } from "@/types/project"; // Import ContentSection
import { notFound } from 'next/navigation';
import { getProjectBySlug } from "@/lib/data"; // Import data fetching function
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import Carousel components
// Import other necessary components (Button, etc.)

// Removed internal getProjectBySlug function definition

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound(); // Trigger 404 page if project not found
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* 1. Hero Image */}
      {project.hero_image_url && (
        <div className="relative mb-8 h-64 md:h-96 w-full overflow-hidden rounded-lg">
          <Image src={project.hero_image_url} alt={`${project.title_client || 'Project'} Hero Image`} layout="fill" objectFit="cover" />
        </div>
      )}

      {/* 2. Metadata Section (Example Layout) */}
      <div className="mb-8 rounded-lg bg-muted/50 p-6">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
           {project.client_name && <div><strong>Client:</strong> {project.client_name}</div>}
           {project.client_website && <div><strong>Website:</strong> <Link href={project.client_website} target="_blank" className="text-primary hover:underline">{project.client_website}</Link></div>}
           {project.category && <div><strong>Category:</strong> {project.category}</div>}
           {project.date_completed && <div><strong>Date:</strong> {project.date_completed}</div>}
           {project.services && project.services.length > 0 && (
             <div className="col-span-2 md:col-span-4">
               <strong>Services:</strong>
               <div className="mt-1 flex flex-wrap gap-2">
                 {project.services.map(service => <Badge key={service} variant="secondary">{service}</Badge>)}
               </div>
             </div>
           )}
         </div>
      </div>

      {/* 3. Project Brief */}
      <h1 className="mb-2 text-3xl md:text-5xl font-bold">{project.project_brief_title || project.title_client}</h1>
      {project.project_brief_description && <p className="mb-8 text-lg text-muted-foreground">{project.project_brief_description}</p>}

      {/* 4. Tech Stack */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map(tech => <Badge key={tech}>{tech}</Badge>)}
          </div>
        </div>
      )}

      {/* 5. Content Sections (Render based on project.content_sections structure) */}
      {/* 5. Content Sections (Render based on project.content_sections structure) */}
      {project.content_sections?.map((section: ContentSection, index: number) => ( // Add types
        <div key={index} className="mb-12 prose prose-invert max-w-none"> {/* Added prose styling */}
          {section.type === 'text' && section.content && (
            // TODO: Ensure section.content is sanitized before using dangerouslySetInnerHTML
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
            // <p>{section.content}</p> // Alternative for plain text
          )}
          {section.type === 'image' && section.src && (
            <div className="relative aspect-video my-6 overflow-hidden rounded-lg"> {/* Added margin */}
              <Image
                src={section.src}
                alt={section.alt || `Project content image ${index + 1}`}
                layout="fill"
                objectFit="contain" // Use contain to avoid cropping important parts
                className="rounded-lg"
              />
            </div>
          )}
          {/* Add handling for other section types if needed */}
        </div>
      ))}

      {/* 6. Gallery */}
      {project.gallery_images && project.gallery_images.length > 0 && (
         <div className="mb-8">
           <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
           <Carousel
             opts={{
               align: "start",
               loop: true,
             }}
             className="w-full" // Adjust width as needed
           >
             <CarouselContent>
               {/* Updated map function to handle string array */}
               {project.gallery_images?.map((imageUrl, index) => (
                 <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3"> {/* Adjust basis for responsiveness */}
                   <div className="p-1">
                     <div className="relative aspect-video overflow-hidden rounded-lg">
                       <Image src={imageUrl} alt={`Gallery image ${index + 1}`} layout="fill" objectFit="cover" />
                       {/* Captions are not available in the current schema */}
                     </div>
                   </div>
                 </CarouselItem>
               ))}
             </CarouselContent>
             <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" /> {/* Adjust positioning */}
             <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" /> {/* Adjust positioning */}
           </Carousel>
           {/* Fallback Grid (optional) */}
           {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {project.gallery_images.map((img, index) => (
               <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image src={img.url} alt={img.caption || `Gallery image ${index + 1}`} layout="fill" objectFit="cover" />
                  {img.caption && <p className="absolute bottom-0 left-0 bg-black/50 text-white p-1 text-xs">{img.caption}</p>}
               </div>
             ))}
           </div> */}
         </div>
      )}

      {/* Optional: Link back to projects or next/prev project */}
    </div>
  );
}

import { getAllProjectSlugs } from "@/lib/data"; // Import the new function

// Optional: Generate static paths if needed (for performance)
export async function generateStaticParams() {
   // Fetch all slugs using the centralized function
   const slugs = await getAllProjectSlugs();
   // Add explicit type for the destructured slug parameter
   return slugs.map(({ slug }: { slug: string }) => ({ slug }));
}

// Removed commented-out generateMetadata function
