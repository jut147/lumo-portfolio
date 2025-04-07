"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
// Removed useTheme import - no longer needed for placeholder logic
import { Badge } from "@/components/ui/badge"; // Import Badge component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Removed theme logic - CSS will handle placeholder visibility

  return (
    <motion.div
      className="h-full hover:shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 ease-in-out">
        <Link href={`/projects/${project.slug}`} className="block group">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full overflow-hidden">
              {project.hero_image_url ? (
                <Image
                  src={project.hero_image_url} // Use actual image if available
                  alt={project.title_client || "Project image"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <>
                  {/* Light mode placeholder */}
                  <Image
                    src="/placeholder-project.svg"
                    alt="Project placeholder"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 block dark:hidden" // Show in light, hide in dark
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Dark mode placeholder */}
                  <Image
                    src="/placeholder-project-dark.svg"
                    alt="Project placeholder"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 hidden dark:block" // Hide in light, show in dark
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <CardTitle className="mb-1 text-lg font-semibold group-hover:text-primary">
              {project.title_client} {/* Use title_client */}
            </CardTitle>
            {project.project_brief_description && (
              <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                {project.project_brief_description}
              </CardDescription>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0">
            {project.category && (
              <Badge variant="outline">{project.category}</Badge>
            )}
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  );
}
