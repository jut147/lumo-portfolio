import { ContentSection } from "@/types/project";
import { notFound } from 'next/navigation';
import { getProjectBySlug } from "@/lib/data";
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

// Define standard Props type for App Router pages
// Note: Using 'any' for props as a workaround for the persistent build error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectPage(props: any) {
  const { params } = props; // Destructure params inside
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const galleryImages = project.gallery_images || [];

  return (
    <div className="container mx-auto px-4 pt-20 pb-16"> {/* Added page padding */}

      {/* 1. Hero Image */}
      {project.hero_image_url && (
        <div className="relative mb-12 h-64 md:h-96 lg:h-[500px] w-full overflow-hidden rounded-lg">
          <Image src={project.hero_image_url} alt={`${project.title_client || 'Project'} Hero Image`} fill priority className="object-cover" />
        </div>
      )}

      {/* 2. Two-Column Layout Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main Content Column (Takes 2/3 space on large screens) */}
        <div className="lg:col-span-2">
          {/* Project Brief Title */}
          <h1 className="mb-4 text-3xl md:text-5xl font-bold">{project.title_client}</h1>
          {/* Project Brief Description */}
          {project.project_brief_description && (
            <p className="mb-12 text-lg text-muted-foreground">{project.project_brief_description}</p>
          )}

          {/* Dynamic Content Sections */}
          <div className="max-w-none"> {/* Allow content to fill column */}
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
          </div>

          {/* Gallery Section */}
          {galleryImages.length > 0 && (
             <div className="mt-16 mb-12">
               <h2 className="mb-6 text-2xl font-semibold">Gallery</h2> {/* Align heading with content */}
               <Carousel
                 opts={{ align: "start", loop: true }}
                 className="w-full"
               >
                 <CarouselContent>
                   {galleryImages.map((imageUrl, index) => (
                     <CarouselItem key={index} className="md:basis-1/2"> {/* Adjust basis */}
                       <div className="p-1">
                         <div className="relative aspect-video overflow-hidden rounded-lg">
                           <Image src={imageUrl} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                         </div>
                       </div>
                     </CarouselItem>
                   ))}
                 </CarouselContent>
                 <CarouselPrevious className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 fill-current" />
                 <CarouselNext className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 fill-current" />
               </Carousel>
             </div>
          )}
        </div>

        {/* Sidebar Column (Takes 1/3 space on large screens) */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Metadata Section */}
          <div className="rounded-lg bg-muted/50 p-6 sticky top-24"> {/* Added sticky positioning */}
             <h2 className="text-xl font-semibold mb-4">Project Details</h2>
             <div className="grid grid-cols-1 gap-3 text-sm"> {/* Reduced gap */}
               {project.client_name && <div><strong>Client:</strong> {project.client_name}</div>}
               {project.client_website && <div><strong>Website:</strong> <Link href={project.client_website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{project.client_website}</Link></div>} {/* Added break-all */}
               {project.category && <div><strong>Category:</strong> {project.category}</div>}
               {project.date_completed && <div><strong>Date:</strong> {project.date_completed}</div>}
               {project.services && project.services.length > 0 && (
                 <div className="pt-2"> {/* Added padding top */}
                   <strong className="block mb-1.5">Services:</strong> {/* Made strong a block */}
                   <div className="flex flex-wrap gap-2">
                     {project.services.map(service => <Badge key={service} variant="secondary">{service}</Badge>)}
                   </div>
                 </div>
               )}
             </div>
          </div>

          {/* Tech Stack Section */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="rounded-lg bg-muted/50 p-6 sticky top-[calc(theme(spacing.24)+100px)]"> {/* Adjust top offset if needed */}
              <h2 className="mb-4 text-xl font-semibold">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map(tech => <Badge key={tech}>{tech}</Badge>)}
              </div>
            </div>
          )}
        </aside>

      </div> {/* End Grid Wrapper */}
    </div>
  );
}

import { getAllProjectSlugs } from "@/lib/data";

// Generate static paths (remains the same)
export async function generateStaticParams() {
   const projects = await getAllProjectSlugs();
   return projects.map(({ slug }: { slug: string }) => ({ slug }));
}
