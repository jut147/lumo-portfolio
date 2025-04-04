"use client"

import * as React from "react" // Import React for potential future use if needed
import { useTheme } from "next-themes" // Import useTheme
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {} // Extend HTMLDivElement attributes

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme() // Use the hook
  const [mounted, setMounted] = React.useState(false) // State to prevent hydration mismatch

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder or nothing on the server to avoid hydration mismatch
    return <div className={cn("w-16 h-8 rounded-full", className)} {...props} />;
  }

  const isDark = resolvedTheme === "dark" // Determine theme from useTheme

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-zinc-950 border border-zinc-800" // Keep existing styles
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")} // Use setTheme onClick
      role="button"
      tabIndex={0}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} // Add aria-label
      {...props} // Spread remaining props
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "transform translate-x-0 bg-zinc-800"
              : "transform translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon
              className="w-4 h-4 text-white"
              strokeWidth={1.5}
            />
          ) : (
            <Sun
              className="w-4 h-4 text-gray-700"
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "bg-transparent"
              : "transform -translate-x-8"
          )}
        >
          {isDark ? (
            <Sun
              className="w-4 h-4 text-gray-500"
              strokeWidth={1.5}
            />
          ) : (
            <Moon
              className="w-4 h-4 text-black"
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  )
}
