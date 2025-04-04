"use client"; // Add directive back

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Add motion import back
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Auto-imported by shadcn add
import { Button } from "@/components/ui/button"; // Auto-imported by shadcn add
import { Project } from "@/types/project";
import { ExternalLink } from "lucide-react"; // Icon

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Basic placeholder image if none provided
  const imageUrl = project.image || "https://via.placeholder.com/400x250?text=Project+Image"; // Use project.image

  return (
    // Wrap the original Card with motion.div for scale/shadow animation
    <motion.div
      className="h-full hover:shadow-lg" // Apply hover shadow here, keep h-full
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="flex h-full flex-col overflow-hidden"> {/* Keep original Card structure */}
        <CardHeader>
          <div className="relative mb-4 h-48 w-full"> {/* Keep image container simple for now */}
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-lg"
            />
          </div>
          <CardTitle>{project.title}</CardTitle>
        {project.description && (
          <CardDescription className="line-clamp-3"> {/* Limit description lines */}
            {project.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow"></CardContent> {/* Pushes footer down */}
      <CardFooter>
        {project.project_link && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.project_link} target="_blank" rel="noopener noreferrer">
              View Project <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
      </Card> {/* Close the original Card */}
    </motion.div> // Close the wrapping motion.div
  );
}
