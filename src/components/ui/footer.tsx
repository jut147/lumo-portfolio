import { buttonVariants } from "@/components/ui/button" // Import buttonVariants, removed unused Button
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle"; // Import ThemeToggle

interface FooterProps {
  logo: React.ReactNode
  brandName: string
  socialLinks: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  mainLinks: Array<{
    href: string
    label: string
  }>
  legalLinks: Array<{
    href: string
    label: string
  }>
  copyright: {
    text: string
    license?: string
  }
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    // Increased top padding
    <footer className="pb-6 pt-24 lg:pb-8 lg:pt-32"> {/* Increased pt */}
      <div className="px-4 lg:px-8 max-w-screen-2xl mx-auto">
        <div className="md:flex md:items-start md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
           >
            <> {/* Wrap children in a single element */}
              {logo}
              <span className="font-bold text-xl">{brandName}</span>
            </>
          </Link>
          {/* Container for social links and mobile theme toggle */}
          <div className="flex items-center mt-6 md:mt-0 space-x-3">
            <ul className="flex list-none space-x-3">
              {socialLinks.map((link, i) => (
                <li key={i}>
                  {/* Apply button styles directly to the anchor tag */}
                  <a
                    href={link.href}
                    target="_blank"
                    aria-label={link.label}
                    className={buttonVariants({ variant: "secondary", size: "icon", className: "h-10 w-10 rounded-full" })}
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
            {/* Mobile Theme Toggle - Hidden on md and larger screens */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </footer>
  );
}
