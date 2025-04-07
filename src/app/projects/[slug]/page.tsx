// All imports commented out for debugging
// import { ContentSection } from "@/types/project";
// import { notFound } from 'next/navigation';
// import { getProjectBySlug } from "@/lib/data";
// import Image from 'next/image';
// import Link from 'next/link';
// import { Badge } from "@/components/ui/badge";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectPage(props: any) {
  const { params } = props; // Destructure params inside
  // Comment out internal logic
  // const project = await getProjectBySlug(params.slug);
  // if (!project) {
  //   notFound();
  // }
  // const galleryImages = project.gallery_images || [];

  return (
    <div>Minimal Project Page for {params.slug}</div>
  );
}

// Comment out generateStaticParams
// import { getAllProjectSlugs } from "@/lib/data";
// export async function generateStaticParams() {
//    const projects = await getAllProjectSlugs();
//    return projects.map(({ slug }: { slug: string }) => ({ slug }));
// }
