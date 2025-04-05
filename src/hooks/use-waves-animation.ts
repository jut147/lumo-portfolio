"use client"; // This hook uses browser APIs and useEffect

import { useRef, useEffect, RefObject } from "react";
import { Noise } from "@/lib/perlin-noise";

// Re-define Point interface here or import from a shared types file if created
interface Point {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}

// Define props needed by the hook (subset of WavesProps)
interface UseWavesAnimationProps {
  lineColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
}

export function useWavesAnimation(
  containerRef: RefObject<HTMLDivElement | null>, // Allow null for containerRef
  canvasRef: RefObject<HTMLCanvasElement | null>, // Allow null for canvasRef as well for consistency
  {
    lineColor = "hsl(var(--foreground))",
    waveSpeedX = 0.0125,
    waveSpeedY = 0.005,
    waveAmpX = 32,
    waveAmpY = 16,
    xGap = 10,
    yGap = 32,
    friction = 0.925,
    tension = 0.005,
    maxCursorMove = 100,
  }: UseWavesAnimationProps,
) {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const noiseRef = useRef(new Noise(Math.random()));
  const linesRef = useRef<Point[][]>([]);
  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });
  const animationFrameRef = useRef<number | null>(null); // To store animation frame ID

  useEffect(() => {
    // Ensure refs are current
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return; // Exit if refs are not available

    ctxRef.current = canvas.getContext("2d");
    if (!ctxRef.current) return; // Exit if context couldn't be obtained

    // --- Helper Functions (moved inside useEffect) ---
    function setSize() {
      const ctx = ctxRef.current;
      if (!ctx || !container || !canvas) return;

      boundingRef.current = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = boundingRef.current.width * dpr;
      canvas.height = boundingRef.current.height * dpr;
      canvas.style.width = `${boundingRef.current.width}px`;
      canvas.style.height = `${boundingRef.current.height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr); // Scale for DPR
    }

    function setLines() {
      const { width, height } = boundingRef.current;
      if (width === 0 || height === 0) return; // Avoid running if dimensions are zero

      linesRef.current = [];
      const oWidth = width + 200; // Add buffer
      const oHeight = height + 30; // Add buffer
      const totalLines = Math.ceil(oWidth / xGap);
      const totalPoints = Math.ceil(oHeight / yGap);
      const xStart = (width - xGap * (totalLines -1)) / 2; // Center calculation adjusted
      const yStart = (height - yGap * (totalPoints -1)) / 2; // Center calculation adjusted

      for (let i = 0; i < totalLines; i++) {
        const pts: Point[] = [];
        for (let j = 0; j < totalPoints; j++) {
          pts.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }
        linesRef.current.push(pts);
      }
    }

    function movePoints(time: number) {
      const lines = linesRef.current;
      const mouse = mouseRef.current;
      const noise = noiseRef.current;
      lines.forEach((pts) => {
        pts.forEach((p) => {
          const move =
            noise.perlin2(
              (p.x + time * waveSpeedX) * 0.002,
              (p.y + time * waveSpeedY) * 0.0015,
            ) * 12;
          p.wave.x = Math.cos(move) * waveAmpX;
          p.wave.y = Math.sin(move) * waveAmpY;

          const dx = p.x - mouse.sx;
          const dy = p.y - mouse.sy;
          const dist = Math.hypot(dx, dy);
          const l = Math.max(175, mouse.vs); // Interaction radius
          if (dist < l) {
            const s = 1 - dist / l; // Scale factor based on distance
            const f = Math.cos(dist * 0.001) * s; // Force factor
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
          }

          // Apply tension and friction
          p.cursor.vx += (0 - p.cursor.x) * tension;
          p.cursor.vy += (0 - p.cursor.y) * tension;
          p.cursor.vx *= friction;
          p.cursor.vy *= friction;
          p.cursor.x += p.cursor.vx * 2; // Update position
          p.cursor.y += p.cursor.vy * 2;

          // Clamp cursor movement
          p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));
          p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y));
        });
      });
    }

    function moved(point: Point, withCursor = true): { x: number; y: number } {
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
      return { x: Math.round(x), y: Math.round(y) };
    }

    function drawLines() {
      const ctx = ctxRef.current;
      const { width, height } = boundingRef.current;
      if (!ctx || width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height); // Use CSS dimensions for clearing
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1; // Example line width

      linesRef.current.forEach((points) => {
        if (points.length === 0) return;
        let p1 = moved(points[0], false);
        ctx.moveTo(p1.x, p1.y);

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const isLast = i === points.length - 1;
          p1 = moved(p, !isLast); // Apply cursor effect except for the very last point of the line?

          // For smooth curves, consider using quadraticCurveTo or bezierCurveTo
          // This example uses lineTo for simplicity based on original code
          ctx.lineTo(p1.x, p1.y);

          // The original logic had complex moveTo based on next point, simplifying here
          // If curves are needed, calculate control points based on neighbors
        }
      });
      ctx.stroke();
    }


    function tick(t: number) {
      const mouse = mouseRef.current;

      // Smooth mouse position
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      // Calculate mouse velocity and angle
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1; // Smoothed velocity
      mouse.vs = Math.min(100, mouse.vs); // Clamp velocity
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      if (d > 0) { // Avoid atan2(0,0) -> 0
        mouse.a = Math.atan2(dy, dx);
      }


      // Update CSS variables for potential external use (like the cursor follower)
      if (container) {
        container.style.setProperty("--x", `${mouse.sx}px`);
        container.style.setProperty("--y", `${mouse.sy}px`);
      }


      movePoints(t);
      drawLines();
      animationFrameRef.current = requestAnimationFrame(tick); // Store frame ID
    }

    function onResize() {
      setSize();
      setLines();
      // Redraw immediately after resize/setup
      drawLines();
    }

    function updateMouse(x: number, y: number) {
      const mouse = mouseRef.current;
      const b = boundingRef.current;
      if (!b) return;
      mouse.x = x - b.left;
      mouse.y = y - b.top + (window.scrollY || document.documentElement.scrollTop); // Include scroll offset
      if (!mouse.set) {
        // Initialize smoothed/previous positions on first move
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    }

    function onMouseMove(e: MouseEvent) {
      updateMouse(e.pageX, e.pageY);
    }

    function onTouchMove(e: TouchEvent) {
      // Don't prevent default if passive is true (default)
      // e.preventDefault(); // Removed as passive is often default
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMouse(touch.clientX, touch.clientY);
      }
    }

    // --- Initialization and Event Listeners ---
    setSize();
    setLines();
    animationFrameRef.current = requestAnimationFrame(tick); // Start animation loop

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    // Use passive: true for touchmove unless preventDefault is strictly needed
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    // --- Cleanup ---
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current); // Cancel animation frame
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (container) { // Check if container exists before removing listener
        container.removeEventListener("touchmove", onTouchMove);
      }
    };
  }, [ // Dependency array includes all props used inside useEffect
    canvasRef, containerRef, // Include refs if their identity matters (usually stable)
    lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY,
    xGap, yGap, friction, tension, maxCursorMove
  ]);

  // The hook itself doesn't need to return anything if it operates via refs
}
