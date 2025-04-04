"use client"

import { useTheme } from "next-themes"
import { Waves } from "@/components/ui/waves-background"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react" // Import icon

interface WavesHeroProps {
  className?: string; // Add className prop
}

export function WavesHero({ className }: WavesHeroProps) { // Destructure className
  const { theme } = useTheme()

  return (
    // Use cn to merge existing classes with the passed className
    <div className={cn("relative flex min-h-screen max-md:h-auto w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background antialiased", className)}> {/* Use min-h-screen and override for mobile */}
      {/* Container for Waves */}
      <div className="absolute inset-0 z-0">
         <Waves
           lineColor={theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} // Adjusted opacity
           backgroundColor="transparent" // Background handled by parent
           waveSpeedX={0.02}
           waveSpeedY={0.01}
           waveAmpX={40}
           waveAmpY={20}
           friction={0.9}
           tension={0.01}
           maxCursorMove={120}
           xGap={12}
           yGap={36}
         />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center"> {/* Added flex, flex-col, items-center */}
        {/* Text Content Wrapper */}
        <div>
          <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            Lumo Studios
          </h1>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-300">
            Design | Web Development | Action VFX
          </p>
          {/* Add Call to Action Button later if needed */}
        </div>

        {/* Scroll Down Icon - Positioned below text, mobile only */}
        <button
          onClick={() => {
          const projectsSection = document.getElementById("projects-section");
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        className="mt-12 block md:hidden cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-300" // Removed absolute positioning, bounce; Added mt-12, block, md:hidden
        aria-label="Scroll down to projects"
      >
        <ChevronDown className="h-10 w-10 stroke-width-[1.5]" />
      </button>
    </div> {/* Closes Content Overlay div */}
  </div> // Added missing closing tag for main component div
  )
}
