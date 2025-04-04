import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo_Black } from "next/font/google"; // Import Archivo_Black
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner" // Import Toaster
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Load Archivo Black
const archivoBlack = Archivo_Black({
  variable: "--font-display",
  weight: "400", // Archivo Black only has weight 400
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumo Studios | Your Web Design Partner", // Updated title
  description: "Lumo Studios | Your Web Design Partner", // Using config description
  openGraph: {
    images: [
      {
        url: "https://lumo-kappa.vercel.app/logo-white-black-bacground.svg", // Must be an absolute URL
        width: 800, // Optional: Specify image width
        height: 600, // Optional: Specify image height
        alt: "Lumo Studios Logo", // Optional: Alt text for the image
      },
    ],
    type: 'website', // Optional: Specify content type
  },
  twitter: { // Optional: Add Twitter card metadata
    card: 'summary_large_image',
    title: "Lumo Studios | Your Web Design Partner",
    description: "Lumo Studios | Your Web Design Partner",
    images: ['https://lumo-kappa.vercel.app/logo-white-black-bacground.svg'], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col", // Added flex flex-col
          geistSans.variable,
          geistMono.variable,
          archivoBlack.variable // Add Archivo Black variable
       )}
       >
         <ThemeProvider
           attribute="class"
           defaultTheme="dark" // Set default to dark
           enableSystem={false} // Disable system preference if forcing dark default
           disableTransitionOnChange
         >
           {/* Ensure body or an outer wrapper enables flex column layout if needed */}
           <Header />
           {/* Removed the intermediate div */}
           <main className="flex-1">{children}</main>
           <SiteFooter />
           <Toaster />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
       </body>
    </html>
  );
}
