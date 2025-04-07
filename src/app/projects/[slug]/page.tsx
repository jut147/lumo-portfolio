import { ContentSection } from "@/types/project";
import { notFound } from 'next/navigation';
import { getProjectBySlug } from "@/lib/data"; // Use correct function name
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Removed unused interface/type definitions

// Use standard inline type for props
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // params.slug contains the ID because the route segment is [slug]
  // Use params.slug directly in the fetch call
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound(); // Trigger 404 page if project not found
  }

  // Provide default empty array for gallery if undefined
  const galleryImages = project.gallery_images || [];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* 1. Hero Image */}
      {project.hero_image_url && (
        <div className="relative mb-8 h-64 md:h-96 w-full overflow-hidden rounded-lg">
          <Image src={project.hero_image_url} alt={`${project.title_client || 'Project'} Hero Image`} fill priority className="object-cover" />
        </div>
      )}

      {/* 2. Metadata Section */}
      <div className="mb-8 rounded-lg bg-muted/50 p-6">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
           {project.client_name && <div><strong>Client:</strong> {project.client_name}</div>}
           {project.client_website && <div><strong>Website:</strong> <Link href={project.client_website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{project.client_website}</Link></div>}
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
      <h1 className="mb-2 text-3xl md:text-5xl font-bold">{project.title_client}</h1>
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

      {/* 5. Content Sections */}
      {project.content_sections?.map((section: ContentSection, index: number) => (
        <div key={index} className="mb-12 prose prose-invert max-w-none">
          {section.type === 'text' && section.content && (
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          )}
          {section.type === 'image' && section.src && (
            <div className="relative aspect-video my-6 overflow-hidden rounded-lg">
              <Image
                src={section.src}
                alt={section.alt || `Project content image ${index + 1}`}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
        </div>
      ))}

      {/* 6. Gallery */}
      {galleryImages.length > 0 && (
         <div className="mb-8">
           <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
           <Carousel
             opts={{
               align: "start",
               loop: true,
             }}
             className="w-full"
           >
             <CarouselContent>
               {galleryImages.map((imageUrl, index) => (
                 <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                   <div className="p-1">
                     <div className="relative aspect-video overflow-hidden rounded-lg">
                       <Image src={imageUrl} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                     </div>
                   </div>
                 </CarouselItem>
               ))}
             </CarouselContent>
             <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
             <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
           </Carousel>
         </div>
      )}
    </div>
  );
}

import { getAllProjectSlugs } from "@/lib/data"; // Use correct function name

// Optional: Generate static paths if needed (for performance)
export async function generateStaticParams() {
   const projects = await getAllProjectSlugs();
   return projects.map(({ slug }: { slug: string }) => ({ slug }));
}
