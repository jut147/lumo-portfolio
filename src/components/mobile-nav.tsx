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
           <Menu className="h-8 w-8" /> {/* Increased size further for visual balance */}
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
            {/* Conditionally render logo based on theme *after mount* */}
            {mounted && theme === 'dark' ? (
              <div className="h-6 w-6 rounded overflow-hidden">
                <Image
                  src="/logo-white-black-bacground.svg" // Dark theme logo
                  alt={`${siteConfig.name} Logo`}
                  width={24}
                  height={24}
                  priority
                />
              </div>
            ) : (
              <div className="h-6 w-6 rounded overflow-hidden">
                <Image
                  src="/logo-black-trans-bacground.svg" // Light theme logo (default)
                  alt={`${siteConfig.name} Logo`}
                  width={24}
                  height={24}
                  priority
                />
              </div>
            )}
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
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
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
