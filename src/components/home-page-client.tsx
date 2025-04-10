"use client"; // Mark as a Client Component

import { WavesHero } from "@/components/waves-hero";
// Removed Suspense, ProjectGrid, ProjectCardSkeleton imports
import { motion } from "framer-motion"; // Import motion factory
// import { Project } from "@/types/project"; // Removed unused Project type import
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
  // Accept children instead of promise
  children: React.ReactNode;
}

// ProjectGrid and ProjectGridSkeleton removed from this file

export function HomePageClient({ children }: HomePageClientProps) { // Destructure children
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
      <WavesHero className="mb-16" /> {/* Removed negative margin */}

      {/* Container for constrained content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Our Process Section */}
      {/* Wrap section with motion.section for scroll-triggered animation and add ID */}
      <motion.section
        id="process-section" // Added ID for linking
        // Removed px, max-w, mx-auto. Kept py and mb.
        className="py-16 md:py-24 mb-16"
        initial={{ opacity: 0, y: 50 }} // Start invisible and 50px down
        whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
        viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% is visible
        transition={{ duration: 0.6, ease: "easeOut" }} // Animation duration and easing
      >
        <h2 className="mb-16 md:mb-20 text-center text-3xl md:text-4xl font-bold">Our Process</h2>
        {/* Render the shadcn/ui Timeline structure - Left aligned */}
        <Timeline positions="left"> {/* Changed from center to left */}
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
            if (index === 1) { // Second item (Design) should be 'done' like the first
              dotStatus = "done"; // Changed from 'error' to 'done'
              itemStatus = "done"; // Also set itemStatus to 'done' for consistency
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
                  <TimelineContent className={isLast ? 'pb-0' : ''}>
                    {/* Use the original content string directly */}
                    {step.content}
                  </TimelineContent>
              </MotionTimelineItem>
            );
          })}
        </Timeline>
      </motion.section>

      {/* Project Showcase Section */}
      {/* Added margin-bottom */}
      {/* Wrap projects section with motion.div for scroll-triggered animation */}
      <motion.div
        id="projects-section"
        // Removed px, max-w, mx-auto. Kept py and mb.
        className="py-16 md:py-24 mb-16"
        initial={{ opacity: 0, y: 50 }} // Start invisible and 50px down
        whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
        viewport={{ once: true, amount: 0.1 }} // Trigger once when 10% is visible (adjust amount if needed)
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} // Add slight delay after process section
      >
        {/* Render children (which includes Suspense and ProjectGrid) */}
        {children}
      </motion.div>
      </div> {/* Close constrained content container */}
    </div>
  );
}
