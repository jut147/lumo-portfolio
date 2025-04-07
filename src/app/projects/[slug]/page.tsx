// Removed supabase import, using lib/data.ts now
// Removed unused Project import
import { ContentSection } from "@/types/project"; // Import ContentSection only
import { notFound } from 'next/navigation';
import { getProjectBySlug } from "@/lib/data"; // Import updated data fetching function by ID
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

// Removed standard Props type definition

// Define Props type properly
interface ProjectPageProps {
  params: {
    slug: string; // This will actually contain the ID
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // params.slug contains the ID because the route segment is [slug]
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound(); // Trigger 404 page if project not found
  }

  // Provide default empty array for gallery if undefined
  const galleryImages = project.gallery_images || [];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* 1. Hero Image */}
      {/* Use hero_image_url which is mapped from 'image' in data.ts */}
      {project.hero_image_url && (
        <div className="relative mb-8 h-64 md:h-96 w-full overflow-hidden rounded-lg">
          <Image src={project.hero_image_url} alt={`${project.title || 'Project'} Hero Image`} fill priority className="object-cover" /> {/* Added priority for LCP */}
        </div>
      )}

      {/* 2. Metadata Section (Example Layout) */}
      <div className="mb-8 rounded-lg bg-muted/50 p-6">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
           {project.client_name && <div><strong>Client:</strong> {project.client_name}</div>}
           {project.client_website && <div><strong>Website:</strong> <Link href={project.client_website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{project.client_website}</Link></div>} {/* Added rel attribute */}
           {project.category && <div><strong>Category:</strong> {project.category}</div>}
           {/* Use date_completed which is mapped from 'publish_date' in data.ts */}
           {project.date_completed && <div><strong>Date:</strong> {project.date_completed}</div>}
           {/* Use services which is mapped from 'client_services' in data.ts */}
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
      {/* Use title as primary, fallback to title_client if needed */}
      <h1 className="mb-2 text-3xl md:text-5xl font-bold">{project.title || project.title_client}</h1>
      {/* Use project_brief_description which is mapped from 'objective'/'challenge_details' in data.ts */}
      {project.project_brief_description && <p className="mb-8 text-lg text-muted-foreground">{project.project_brief_description}</p>}

      {/* 4. Tech Stack */}
      {/* Use tech_stack which is mapped from 'technologies' in data.ts */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map(tech => <Badge key={tech}>{tech}</Badge>)}
          </div>
        </div>
      )}

      {/* 5. Content Sections (Render based on project.content_sections structure) */}
      {/* NOTE: content_sections data is missing from the DB based on current schema */}
      {project.content_sections?.map((section: ContentSection, index: number) => ( // Use optional chaining
        <div key={index} className="mb-12 prose prose-invert max-w-none"> {/* Added prose styling */}
          {section.type === 'text' && section.content && (
            // TODO: Ensure section.content is sanitized before using dangerouslySetInnerHTML
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
            // <p>{section.content}</p> // Alternative for plain text
          )}
          {section.type === 'image' && section.src && (
            <div className="relative aspect-video my-6 overflow-hidden rounded-lg"> {/* Added margin */}
              <Image
                src={section.src} // section.src should be checked if it exists
                alt={section.alt || `Project content image ${index + 1}`}
                fill
                className="object-contain rounded-lg" // Use contain to avoid cropping important parts
              />
            </div>
          )}
          {/* Add handling for other section types if needed */}
        </div>
      ))}

      {/* 6. Gallery */}
      {/* NOTE: gallery_images data is missing from the DB based on current schema */}
      {galleryImages.length > 0 && ( // Use the checked galleryImages variable
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
               {galleryImages.map((imageUrl, index) => ( // Use the checked galleryImages variable
                 <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3"> {/* Adjust basis for responsiveness */}
                   <div className="p-1">
                     <div className="relative aspect-video overflow-hidden rounded-lg">
                       <Image src={imageUrl} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
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
             {galleryImages.map((img, index) => ( // Use the checked galleryImages variable
               <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image src={img} alt={`Gallery image ${index + 1}`} layout="fill" objectFit="cover" />
               </div>
             ))}
           </div> */}
         </div>
      )}

      {/* Optional: Link back to projects or next/prev project */}
    </div>
  );
}

import { getAllProjectSlugs } from "@/lib/data"; // Import the updated function for IDs

// Optional: Generate static paths if needed (for performance)
export async function generateStaticParams() {
   // Fetch all project IDs using the centralized function
   const projects = await getAllProjectSlugs(); // Function now returns { id: string }[]
   // Map the IDs to the 'slug' parameter name expected by the dynamic route segment [slug]
   return projects.map(({ slug }: { slug: string }) => ({ slug }));
}

// Removed commented-out generateMetadata function
