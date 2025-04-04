"use client"

import { useTheme } from "next-themes"
import { Waves } from "@/components/ui/waves-background"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react" // Import icon

export function WavesHero() {
  const { theme } = useTheme()

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background antialiased"> {/* Changed h-[40rem] to h-screen */}
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
      <div className="relative z-10 text-center"> {/* Removed p-4 */}
        <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          Lumo Studios
        </h1>
        <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-300">
          Design | Web Development | Action VFX
        </p>
        {/* Add Call to Action Button later if needed */}
      </div>
      {/* Scroll Down Icon */}
      <button
        onClick={() => {
          const projectsSection = document.getElementById("projects-section");
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-300 animate-bounce" // Adjusted colors and added bounce animation
        aria-label="Scroll down to projects"
      >
        <ChevronDown className="h-10 w-10 stroke-width-[1.5]" /> {/* Increased size and slightly thicker stroke */}
      </button>
    </div>
  )
}
