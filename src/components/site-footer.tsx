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
  const logoElement = mounted && theme === 'dark' ? (
    // Wrap Image in a div with rounding and overflow hidden
    <div className="h-8 w-8 rounded overflow-hidden">
      <Image
        src="/logo-white-black-bacground.svg" // Dark theme logo
        alt={`${siteConfig.name} Logo`}
        width={32}
        height={32}
        // className="h-8" // Class moved to wrapper
        priority
      />
    </div>
  ) : (
    // Render light theme logo by default (server & initial client) or if theme is light
    // Wrap Image in a div with rounding and overflow hidden
    <div className="h-8 w-8 rounded overflow-hidden">
      <Image
        src="/logo-black-trans-bacground.svg" // Light theme logo (default)
        alt={`${siteConfig.name} Logo`}
        width={32}
        height={32}
        // className="h-8" // Class moved to wrapper
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

  // Placeholder social links
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "#", // Replace with actual GitHub link
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
