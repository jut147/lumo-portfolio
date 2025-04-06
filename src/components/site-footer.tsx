"use client" // Add use client directive

import * as React from "react"; // Import React
import { useState, useEffect } from "react"; // Import hooks
import { Github } from "lucide-react"
import Image from "next/image" // Import Next Image
import { useTheme } from "next-themes" // Import useTheme
import { Footer } from "@/components/ui/footer"
import { siteConfig } from "@/config/site"

export function SiteFooter() {
  const { theme } = useTheme(); // Get current theme
  const [mounted, setMounted] = useState(false);

  // Effect for mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Create the logo element based on the theme *after mount*
  const logoElement = (
    <div className="h-8 w-8 rounded overflow-hidden">
      <Image
        // Default to light logo, switch to dark logo if mounted and theme is dark
        src={mounted && theme === 'dark' ? "/logo-white-black-bacground.svg" : "/logo-black-trans-bacground.svg"}
        alt={`${siteConfig.name} Logo`}
        width={32}
        height={32}
        priority
      />
    </div>
  );

  // Extract main navigation links from siteConfig
  const mainLinks = siteConfig.mainNav.map(item => ({
    href: item.href || "#", // Use # if href is missing (shouldn't happen with current config)
    label: item.title,
  }));

  // Placeholder legal links
  const legalLinks = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  // Social links using siteConfig
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: siteConfig.links.github, // Use link from config
      label: "GitHub",
    },
  ];

  return (
    <Footer
      logo={logoElement} // Use the dynamic logo element
      brandName={siteConfig.name} // Use name from config
      socialLinks={socialLinks}
      mainLinks={mainLinks}
      legalLinks={legalLinks}
      copyright={{
        text: `© ${new Date().getFullYear()} ${siteConfig.name}`, // Dynamic year and name
        license: "All rights reserved",
      }}
    />
  )
}
