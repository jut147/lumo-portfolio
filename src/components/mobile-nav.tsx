"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation" // Added usePathname
import Image from "next/image" // Added Image
import { useTheme } from "next-themes" // Added useTheme
import { Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet" // Added SheetTitle

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const { theme } = useTheme() // Get current theme
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname() // Get current path

  // Effect for mounting state
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
           className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden" // Only show on mobile
         >
           <Menu className="h-10 w-10" /> {/* Increased size */}
           <span className="sr-only">Toggle Menu</span>
         </Button>
       </SheetTrigger>
       <SheetContent side="right" className="p-6 pt-8"> {/* Added padding */}
         <SheetTitle className="sr-only">Navigation Menu</SheetTitle> {/* Added visually hidden title */}
         {/* Header Section */}
         <div className="mb-4 flex items-center border-b pb-4"> {/* Added border and spacing */}
           <MobileLink
            href="/"
            className="flex items-center gap-2" // Added gap
            onOpenChange={setOpen}
            pathname={pathname} // Pass pathname
          >
            {/* Logo - Conditionally set src based on theme after mount */}
            <div className="h-6 w-6 rounded overflow-hidden">
              <Image
                // Default to light logo, switch to dark logo if mounted and theme is dark
                src={mounted && theme === 'dark' ? "/logo-white-black-bacground.svg" : "/logo-black-trans-bacground.svg"}
                alt={`${siteConfig.name} Logo`}
                width={24}
                height={24}
                priority
              />
            </div>
            <span className="font-bold">{siteConfig.name}</span>
          </MobileLink>
        </div>
        {/* Navigation Links */}
        <ScrollArea className="h-[calc(100vh-8rem)] pb-10"> {/* Removed pl-6 */}
          <div className="flex flex-col space-y-4"> {/* Increased space-y */}
            {siteConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    pathname={pathname} // Pass pathname
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          {/* Optional: Add other sections like social links or CTAs here */}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  pathname: string // Added pathname prop
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  pathname, // Destructure pathname
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={(e) => { // Add event parameter 'e'
        const hrefString = href.toString();
        const isHomePageAnchor = hrefString.startsWith("/#");

        if (isHomePageAnchor) {
          e.preventDefault(); // Prevent default link navigation
          const targetId = hrefString.substring(2); // Get the ID after '/#'

          // If already on homepage, scroll immediately
          if (pathname === "/") {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            onOpenChange?.(false); // Close the sheet
          } else {
            // If not on homepage, navigate first, then scroll after delay
            router.push("/"); // Navigate to home
            // Wait for navigation and rendering before scrolling
            setTimeout(() => {
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 100); // Adjust delay if needed
            onOpenChange?.(false); // Close the sheet
          }
        } else {
          // Default behavior for non-anchor links
          router.push(hrefString);
          onOpenChange?.(false);
        }
      }}
      className={cn(
        "text-lg transition-colors hover:text-primary", // Increased font size, added hover
        isActive ? "text-primary font-medium" : "text-foreground", // Active style, changed default color
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
