"use client"

import * as React from "react"
import { useState, useEffect } from "react"; // Import useState and useEffect
import Link from "next/link"
import Image from "next/image"; // Import Next Image
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"; // Import useTheme

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
 } from "@/components/ui/navigation-menu"
 // import { Icons } from "@/components/icons" // Optional: for logo
 import { ThemeToggle } from "@/components/ui/theme-toggle" // Import ThemeToggle
 import { MobileNav } from "@/components/mobile-nav" // Import MobileNav

 export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme(); // Get current theme
  const [mounted, setMounted] = useState(false);

  // Effect for scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect for mounting state - ensures theme is read only client-side initially
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={cn(
        "absolute top-0 z-50 w-full transition-colors duration-300 ease-in-out", // Base styles + transition
        scrolled
          ? "bg-background/95 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60" // Scrolled styles
           : "bg-transparent border-transparent" // Initial transparent styles
       )}
     >
       {/* Use direct padding and max-width instead of container class */}
       <div className="flex h-14 items-center px-4 lg:px-8 max-w-screen-2xl mx-auto">
         {/* Logo/Brand */}
         <Link href="/" className="mr-6 flex items-center space-x-2">
           {/* Conditionally render logo based on theme *after mount* */}
           {mounted && theme === 'dark' ? (
             // Wrap Image in a div with rounding and overflow hidden
             <div className="h-6 w-6 rounded overflow-hidden">
               <Image
                 src="/logo-white-black-bacground.svg" // Dark theme logo
                 alt={`${siteConfig.name} Logo`}
                 width={24}
                 height={24}
                 // className="h-6" // Class moved to wrapper
                 priority // Prioritize loading the visible logo
               />
             </div>
           ) : (
             // Render light theme logo by default (server & initial client) or if theme is light
             // Wrap Image in a div with rounding and overflow hidden
             <div className="h-6 w-6 rounded overflow-hidden">
               <Image
                 src="/logo-black-trans-bacground.svg" // Light theme logo (default)
                 alt={`${siteConfig.name} Logo`}
                 width={24}
                 height={24}
                 // className="h-6" // Class moved to wrapper
                 priority // Prioritize loading the visible logo
               />
             </div>
           )}
           {/* Remove the text span */}
           {/* <span className="font-bold sm:inline-block">
             {siteConfig.name}
           </span> */}
         </Link>

        {/* Main Navigation */}
        <NavigationMenu className="hidden md:flex"> {/* Changed sm:flex to md:flex */}
          <NavigationMenuList>
            {siteConfig.mainNav?.map(
              (item: { href?: string; title: string }) => // Add type for item
                item.href && (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === item.href} // Highlight active link
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
            )}
          </NavigationMenuList>
        </NavigationMenu>

         {/* Right side items (Theme toggle, etc.) */}
         <div className="flex flex-1 items-center justify-end space-x-4">
           <div className="hidden md:flex"> {/* Wrapper to hide ThemeToggle on mobile */}
             <ThemeToggle />
           </div>
           <MobileNav /> {/* Add MobileNav */}
         </div>
       </div>
    </header>
  )
}
