"use client"; // Mark as a Client Component

import { WavesHero } from "@/components/waves-hero";
import { motion } from "framer-motion"; // Import motion factory
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/project-card";
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline"; // Import sub-components again
// Define the data for the timeline steps
const processSteps = [
  {
    heading: "Plan (Discovery & Strategy)",
    content: "We start by deeply understanding your vision, target audience, and business goals. Through collaborative workshops, we define project scope, map user journeys, and create a clear strategic roadmap.",
  },
  {
    heading: "Design (UI/UX & Prototyping)",
    content: "Our design phase focuses on crafting intuitive user experiences and visually stunning interfaces that align with your brand. We create wireframes, mockups, and interactive prototypes for your feedback and approval.",
  },
  {
    heading: "Build (Development & Engineering)",
    content: "Translating designs into high-quality code using modern technologies like React, Next.js, and Tailwind CSS. We follow best practices for clean, scalable, and maintainable codebases.",
  },
  {
    heading: "Test (Quality Assurance)",
    content: "Rigorous testing across devices and browsers ensures a seamless, bug-free experience. We conduct functional, performance, and usability testing, incorporating your feedback throughout.",
  },
  {
    heading: "Launch (Deployment & Handover)",
    content: "We handle the deployment process, ensuring a smooth transition to live. You receive comprehensive documentation and training for a successful handover.",
  },
  {
    heading: "Done! (Support & Growth)",
    content: "Project launch is just the beginning. We offer ongoing support and partnership to help your digital presence evolve and grow.",
  },
];


interface HomePageClientProps {
  projects: Project[]; // Assuming Project type is correct, adjust if needed based on lib/data
}

export function HomePageClient({ projects }: HomePageClientProps) {
  // Define variants for timeline items *before* the return statement
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <div>
      <WavesHero className="mb-16" /> {/* Added margin-bottom */}

      {/* Our Process Section */}
      {/* Wrap section with motion.section for scroll-triggered animation and add ID */}
      <motion.section
        id="process-section" // Added ID for linking
        className="px-4 lg:px-8 py-16 md:py-24 max-w-screen-lg mx-auto mb-16" // Reduced max-width
        initial={{ opacity: 0, y: 50 }} // Start invisible and 50px down
        whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
        viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% is visible
        transition={{ duration: 0.6, ease: "easeOut" }} // Animation duration and easing
      >
        <h2 className="mb-16 md:mb-20 text-center text-3xl md:text-4xl font-bold">Our Process</h2>
        {/* Render the shadcn/ui Timeline structure - Left aligned */}
        <Timeline positions="left"> {/* Changed from center to left */}
          {/* Add motion wrapper for staggering children */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Adjust amount as needed
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2, // Delay between each item animation
                },
              },
            }}
          >
          {/* itemVariants is now defined above the return statement */}
          {processSteps.map((step, index) => {
            // Create an animatable version of TimelineItem
            const MotionTimelineItem = motion(TimelineItem);

            // const isFirst = index === 0; // Removed unused variable
            const isLast = index === processSteps.length - 1;
            let itemStatus: "done" | "current" | "default" = "default";
            let dotStatus: "done" | "current" | "error" | "default" = "default";
            let lineDone = false;

            if (index < 2) { // First two items (Plan, Design)
              itemStatus = "done";
              dotStatus = "done";
              lineDone = true;
            }
            if (index === 1) { // Second item (Design) has error dot
              // Note: The screenshot shows a red 'X' which corresponds to 'error' status in the component
              // Let's correct the dotStatus here to 'error' as intended previously.
              dotStatus = "error";
              // Keep itemStatus as 'done' or 'default' for text color, let's use default
              itemStatus = "default";
            }
            if (index === 2) { // Third item (Code) is current
              itemStatus = "current";
              dotStatus = "current";
              lineDone = false; // Line leading *from* current is not done
            }
// No need to determine side when positions="left"
// const side: "left" | "right" = index % 2 === 0 ? 'right' : 'left';

            // itemVariants is defined outside the loop now
            return (
              // Use the animatable MotionTimelineItem directly
              <MotionTimelineItem key={index} variants={itemVariants} status={itemStatus}>
                  <TimelineHeading>{step.heading}</TimelineHeading>
                  <TimelineDot status={dotStatus} />
                  {!isLast && <TimelineLine done={lineDone} />}
                  <TimelineContent>
                    {/* Use the original content string directly */}
                    {step.content}
                  </TimelineContent>
              </MotionTimelineItem>
            );
          })}
          </motion.div> {/* Close motion wrapper */}
        </Timeline>
      </motion.section>

      {/* Project Showcase Section */}
      {/* Added margin-bottom */}
      {/* Wrap projects section with motion.div for scroll-triggered animation */}
      <motion.div
        id="projects-section"
        className="px-4 lg:px-8 py-16 md:py-24 max-w-screen-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 50 }} // Start invisible and 50px down
        whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
        viewport={{ once: true, amount: 0.1 }} // Trigger once when 10% is visible (adjust amount if needed)
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} // Add slight delay after process section
      >
         <h2 className="mb-16 md:mb-20 text-center text-3xl md:text-4xl font-bold">Projects</h2>
         {projects.length > 0 ? (
           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
             {projects.map((project) => (
               <ProjectCard key={project.id} project={project} />
             ))}
           </div>
         ) : (
           <p className="text-center text-muted-foreground">No projects found.</p>
         )}
      </motion.div>
    </div>
  );
}
