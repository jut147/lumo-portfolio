"use client"; // Ensure directive is present

import Image from "next/image";
import Link from "next/link";
// Removed incorrect SVG import
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types/project"; // Ensure Project type is imported

interface ProjectCardProps {
  project: Project; // Use the imported Project type
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Use the direct path string for the fallback SVG in /public
  const imageUrl = project.hero_image_url || "/placeholder-project.svg";

  return (
    <motion.div
      className="h-full hover:shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 ease-in-out">
        <Link href={`/projects/${project.slug}`} className="block group">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full overflow-hidden"> {/* Fixed height */}
              <Image
                src={imageUrl}
                alt={project.title_client || "Project image"} // Use project.title
                fill // Use fill instead of layout/objectFit
                className="object-cover transition-transform duration-300 group-hover:scale-105" // Add object-cover
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes prop
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <CardTitle className="mb-1 text-lg font-semibold group-hover:text-primary">
              {project.title_client} {/* Display title */}
            </CardTitle>
            {/* Use project_brief_description if available */}
            {project.project_brief_description && (
              <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                {project.project_brief_description}
              </CardDescription>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0">
            {/* Optional: Add category or tags here */}
            {project.category && (
              <span className="text-xs text-muted-foreground">{project.category}</span>
            )}
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  );
}
