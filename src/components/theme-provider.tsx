"use client"

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes"; // Revert to original type import path
import { useMounted } from "@/lib/hooks/useMounted"; // Import the hook

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const mounted = useMounted();

  // Only render the NextThemesProvider and its children once mounted on the client
  if (!mounted) {
    // Render nothing or a placeholder on the server and initial client render
    // Returning null might be simplest if children don't need SSR representation
    // Or return children directly if they should be server-rendered without theme context initially
    return <>{children}</>; // Render children directly during SSR/initial render
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
