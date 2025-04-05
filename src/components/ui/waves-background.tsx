"use client";

import { useRef } from "react" // Removed useEffect
import { cn } from "@/lib/utils"
// Noise import is no longer needed here, it's used within the hook
import { useWavesAnimation } from "@/hooks/use-waves-animation" // Import the custom hook

// Removed unused Point interface definition (it's defined within the hook)

interface WavesProps {
  /**
   * Color of the wave lines
   */
  lineColor?: string
  /**
   * Background color of the container
   */
  backgroundColor?: string
  waveSpeedX?: number
  waveSpeedY?: number
  waveAmpX?: number
  waveAmpY?: number
  xGap?: number
  yGap?: number
  friction?: number
  tension?: number
  maxCursorMove?: number
  className?: string
}

// Define props needed by the component (can reuse WavesProps or define separately)
// interface WavesComponentProps extends WavesProps {} // Example if needed

export function Waves({
  // Destructure all props needed by the hook and the component itself
  lineColor,
  backgroundColor = "transparent", // Keep background color for the div style
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove,
  className,
}: // Removed unused ...props from destructuring
WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Pass only the necessary props to the hook
  useWavesAnimation(containerRef, canvasRef, {
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    xGap,
    yGap,
    friction,
    tension,
    maxCursorMove,
  });

  // The component now only renders the container and canvas
  // The hook handles all the animation logic and event listeners
  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor,
      }}
      className={cn(
        "absolute top-0 left-0 w-full h-full overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute top-0 left-0 rounded-full",
          "w-2 h-2 bg-foreground/10",
        )}
        style={{
          transform:
            "translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)",
          willChange: "transform",
        }}
      />
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
