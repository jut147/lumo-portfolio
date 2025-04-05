"use client"; // Ensure client directive is present

import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import useRouter
import { motion } from "framer-motion"; // Add motion import back
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Auto-imported by shadcn add
import { RainbowButton } from "@/components/ui/rainbow-button"; // Import RainbowButton
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter(); // Get router instance
  // Basic placeholder image if none provided
  const imageUrl = project.image_url || "https://placehold.co/400x250?text=Project+Image"; // Use placehold.co

  return (
    // Wrap the original Card with motion.div for scale/shadow animation
    <motion.div
      className="h-full hover:shadow-lg" // Apply hover shadow here, keep h-full
      initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
      animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
      transition={{ duration: 0.5, delay: Math.random() * 0.2 }} // Add duration and slight random delay
      whileHover={{ scale: 1.03 }}
      // Removed the spring transition from the main animation, keep it for hover if desired or adjust
    >
      <Card className="flex h-full flex-col overflow-hidden"> {/* Keep original Card structure */}
        <CardHeader>
          <div className="relative mb-4 h-48 w-full"> {/* Keep image container simple for now */}
            <Image
              src={imageUrl}
              alt={project.title_client || 'Project image'} // Use title_client for alt text
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-lg"
            />
          </div>
          {/* Use title_client */}
          <CardTitle>{project.title_client}</CardTitle>
          {/* Add client_name */}
          {project.client_name && (
            <p className="text-sm text-muted-foreground mt-1">{project.client_name}</p>
          )}
        </CardHeader>
        <CardContent className="flex-grow pt-4"> {/* Add padding top */}
          {/* Use project_brief_description */}
          {project.project_brief_description && (
            <CardDescription className="line-clamp-2 mb-3"> {/* Limit description lines, add margin bottom */}
              {project.project_brief_description}
            </CardDescription>
          )}
          {/* Add industry tags */}
          {project.industry_tags && project.industry_tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.industry_tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent> {/* Pushes footer down */}
        <CardFooter>
          {/* Use onClick for navigation instead of asChild + Link */}
          <RainbowButton
            className="w-full h-9 text-sm" // Keep styling
            onClick={() => router.push(`/projects/${project.slug}`)} // Add onClick handler
          >
            View Details
          </RainbowButton>
          {/* Removed commented-out external link button */}
      </CardFooter>
      </Card> {/* Close the original Card */}
    </motion.div> // Close the wrapping motion.div
  );
}
