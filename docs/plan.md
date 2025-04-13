# Plan: Modern Portfolio Website with Next.js, shadcn/ui, and Supabase

## 1. Project Overview

Create a modern, high-class portfolio website showcasing projects dynamically fetched from Supabase. The site will feature interactive UI elements and animations.

**Technology Stack:**
*   Next.js (App Router)
*   React
*   TypeScript
*   Tailwind CSS
*   shadcn/ui
*   Supabase (for data)
*   Framer Motion (for animations)
*   Lucide React (for icons)
*   Next Themes (for theme handling)

**Core Features:**
*   Homepage with interactive Waves hero section and dynamic project grid.
*   About page.
*   Contact page.
*   Integration of modern UI components (Spotlight, FloatingNav, etc. - starting with Waves).
*   Responsive design.

**MCP Server Information (for reference):**
*   **Supabase MCP Server:**
    *   Executable: `/Users/jt/.local/bin/supabase-mcp-server`
    *   README: (Likely not available locally, as it appears to be an installed binary)
*   **Stripe MCP Server:**
    *   Executable Script: `/Users/jt/Documents/stripe-mcp-server/run_stripe_mcp.sh`
    *   README: `/Users/jt/Documents/stripe-mcp-server/README.md`

## 2. Project Setup

This phase establishes the foundational structure and installs core dependencies.

**Steps:**

1.  **Initialize Next.js Project:**
    *   Use `create-next-app` to scaffold the project with TypeScript and Tailwind CSS enabled.
    *   Command:
        ```bash
        npx create-next-app@latest portfolio-website --ts --tailwind --eslint --app --src-dir --use-npm # Using npm as an example, adjust if yarn/pnpm preferred
        cd portfolio-website
        ```
    *   *(Self-Correction: The user prompt didn't specify `--src-dir`, but it's common practice and aligns well with shadcn. Will assume its use unless told otherwise. Also assuming `npm`.)*

2.  **Initialize shadcn/ui:**
    *   Run the `shadcn-ui init` command to configure the project for shadcn components.
    *   Command:
        ```bash
        npx shadcn-ui@latest init
        ```
    *   **Configuration Prompts (Example Choices):**
        *   `Which style would you like to use? › Default`
        *   `Which color would you like to use as base color? › Slate`
        *   `Where is your global CSS file? › src/app/globals.css`
        *   `Do you want to use CSS variables for colors? › yes`
        *   `Where is your tailwind.config.js located? › tailwind.config.ts` *(Note: May be .js initially, shadcn might rename or adapt)*
        *   `Configure import alias for components: › @/components`
        *   `Configure import alias for utils: › @/lib/utils`
        *   `Are you using React Server Components? › yes`
        *   `Write configuration to components.json. Proceed? › yes`
    *   This command will:
        *   Install necessary dependencies (`class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`).
        *   Create `lib/utils.ts`.
        *   Create `components.json`.
        *   Update `tailwind.config.ts`.
        *   Update `src/app/globals.css`.
        *   Ensure the `/components/ui` directory exists or is the designated path for components.

3.  **Create `lib/utils.ts` (if not created by shadcn init):**
    *   Ensure the utility file for `cn` exists.
    *   File: `src/lib/utils.ts`
    *   Content:
        ```typescript
        import { type ClassValue, clsx } from "clsx"
        import { twMerge } from "tailwind-merge"

        export function cn(...inputs: ClassValue[]) {
          return twMerge(clsx(inputs))
        }
        ```

4.  **Install Additional Core Dependencies:**
    *   Install `framer-motion` for animations and `next-themes` for theme handling.
    *   Command:
        ```bash
        npm install framer-motion next-themes
        ```

5.  **Project Structure Verification:**
    *   Ensure the following structure (or similar) is present:
        ```
        portfolio-website/
        ├── src/
        │   ├── app/
        │   │   ├── globals.css
        │   │   ├── layout.tsx
        │   │   └── page.tsx
        │   ├── components/
        │   │   └── ui/  # <-- Target directory for shadcn components
        │   └── lib/
        │       └── utils.ts
        ├── public/
        ├── tailwind.config.ts
        ├── components.json
        ├── tsconfig.json
        ├── package.json
        └── ...
        ```

## 3. Theme Provider Setup

Configure `next-themes` to handle light/dark mode switching.

**Steps:**

1.  **Create Theme Provider Component:**
    *   File: `src/components/theme-provider.tsx`
    *   Content:
        ```typescript
        "use client"

        import * as React from "react"
        import { ThemeProvider as NextThemesProvider } from "next-themes"
        import { type ThemeProviderProps } from "next-themes/dist/types"

        export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
          return <NextThemesProvider {...props}>{children}</NextThemesProvider>
        }
        ```

2.  **Integrate Provider in Root Layout:**
    *   File: `src/app/layout.tsx`
    *   Update the layout to wrap children with `ThemeProvider`.
    *   Content Snippet (Illustrative):
        ```typescript
        import type { Metadata } from "next";
        import { Inter } from "next/font/google";
        import "./globals.css";
        import { ThemeProvider } from "@/components/theme-provider"; // Adjust path if needed
        import { cn } from "@/lib/utils"; // Import cn

        const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); // Example font setup

        export const metadata: Metadata = {
          title: "Modern Portfolio",
          description: "Showcasing projects and skills",
        };

        export default function RootLayout({
          children,
        }: Readonly<{
          children: React.ReactNode;
        }>) {
          return (
            <html lang="en" suppressHydrationWarning>
              <body
                className={cn(
                  "min-h-screen bg-background font-sans antialiased",
                  inter.variable
                )}
              >
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  {/* Add Header/Navbar component here later */}
                  <main>{children}</main>
                  {/* Add Footer component here later */}
                </ThemeProvider>
              </body>
            </html>
          );
        }
        ```

## 4. Waves Hero Component Integration

Integrate the provided interactive Waves component into the project.

**Steps:**

1.  **Create Waves Component File:**
    *   File: `src/components/ui/waves-background.tsx`
    *   Copy the provided `component.tsx` code into this file.
    *   **Important:** Update the import path for `cn` within this file:
        *   Change `import { cn } from "'lib/utils'"` to `import { cn } from "@/lib/utils"`

2.  **Create Waves Demo/Wrapper (Optional but Recommended):**
    *   This helps encapsulate the demo logic and makes it easier to use on the page.
    *   File: `src/components/waves-hero.tsx`
    *   Adapt the provided `demo.tsx` code.
    *   Content:
        ```typescript
        "use client" // Required because it uses hooks (useTheme)

        import { useTheme } from "next-themes"
        import { Waves } from "@/components/ui/waves-background" // Use correct import alias
        import { cn } from "@/lib/utils"

        export function WavesHero() {
          const { theme } = useTheme()

          return (
            <div className="relative flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background antialiased">
              {/* Container for Waves */}
              <div className="absolute inset-0 z-0">
                 <Waves
                   lineColor={theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} // Adjusted opacity
                   backgroundColor="transparent" // Background handled by parent
                   waveSpeedX={0.02}
                   waveSpeedY={0.01}
                   waveAmpX={40}
                   waveAmpY={20}
                   friction={0.9}
                   tension={0.01}
                   maxCursorMove={120}
                   xGap={12}
                   yGap={36}
                 />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-4 text-center">
                <h1 className="mt-20 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                  Your Name / Brand
                </h1>
                <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-300">
                  Modern Portfolio showcasing dynamic projects.
                </p>
                {/* Add Call to Action Button later if needed */}
              </div>
            </div>
          )
        }
        ```
    *   *(Self-Correction: Renamed `WavesDemo` to `WavesHero` for clarity. Added sample overlay content. Adjusted wave line color opacity for better subtlety.)*

3.  **Integrate into Homepage:**
    *   File: `src/app/page.tsx`
    *   Import and use the `WavesHero` component.
    *   Content:
        ```typescript
        import { WavesHero } from "@/components/waves-hero"; // Adjust path if needed

        export default function HomePage() {
          return (
            <div>
              <WavesHero />
              {/* Project Showcase Section will go here */}
              <div className="container mx-auto px-4 py-16">
                 <h2 className="mb-8 text-center text-3xl font-bold">Projects</h2>
                 {/* Placeholder for dynamic project grid */}
                 <p className="text-center text-muted-foreground">Project loading area...</p>
              </div>
            </div>
          );
        }
        ```

## 5. Supabase Integration

Set up Supabase client and fetch project data.

**Steps:**

1.  **Install Supabase Client:**
    *   Command:
        ```bash
        npm install @supabase/supabase-js
        ```

2.  **Set up Supabase Project:**
    *   Go to [supabase.com](https://supabase.com/), create an account/project if you haven't already.
    *   Create a table named `projects` with the following columns:
        *   `id` (uuid, primary key, default: `gen_random_uuid()`)
        *   `created_at` (timestamp with time zone, default: `now()`)
        *   `title` (text, not null)
        *   `description` (text)
        *   `image_url` (text) - Store URL to image (e.g., hosted on Supabase Storage or elsewhere)
        *   `project_link` (text) - URL to the live project or repository
    *   Enable Row Level Security (RLS) on the `projects` table and create a policy that allows public read access (`SELECT`). Example Policy:
        *   Name: `Allow public read access`
        *   Target roles: `anon`, `authenticated`
        *   Using expression: `true`
        *   Command: `SELECT`
    *   *(Note: For simplicity, this plan assumes public read access. Adjust RLS if authentication is added later.)*
    *   Add some sample project data to the table.

3.  **Configure Environment Variables:**
    *   Create a `.env.local` file in the project root.
    *   Add your Supabase Project URL and Anon Key:
        ```
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```
    *   *(Security Note: The Anon key is safe to expose in client-side code as it relies on RLS for security.)*

4.  **Create Supabase Client Utility:**
    *   File: `src/lib/supabaseClient.ts`
    *   Content:
        ```typescript
        import { createClient } from '@supabase/supabase-js'

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error("Supabase URL or Anon Key is missing from environment variables.");
        }

        export const supabase = createClient(supabaseUrl, supabaseAnonKey)
        ```

5.  **Create Project Type Definition:**
    *   File: `src/types/project.ts` (Create this file/directory if needed)
    *   Content:
        ```typescript
        export interface Project {
          id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          project_link: string | null;
          created_at: string; // Or Date if you parse it
        }
        ```

6.  **Implement Data Fetching Function:**
    *   This function can be placed in `src/lib/data.ts` or directly used within the server component. For server components, direct fetching is often simpler.
    *   Example fetching logic within `src/app/page.tsx`:
        ```typescript
        import { WavesHero } from "@/components/waves-hero";
        import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
        import { Project } from "@/types/project"; // Import Project type

        // Function to fetch projects (can be defined here or in lib/data.ts)
        async function getProjects(): Promise<Project[]> {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false }); // Example ordering

          if (error) {
            console.error("Error fetching projects:", error);
            // Handle error appropriately - maybe return empty array or throw
            return [];
          }
          // Basic type assertion (consider more robust validation if needed)
          return data as Project[];
        }

        export default async function HomePage() { // Make the component async
          const projects = await getProjects(); // Fetch data

          return (
            <div>
              <WavesHero />
              <div className="container mx-auto px-4 py-16">
                 <h2 className="mb-8 text-center text-3xl font-bold">Projects</h2>
                 {projects.length > 0 ? (
                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {/* Map projects to ProjectCard components here */}
                     {projects.map((project) => (
                       <p key={project.id}>{project.title}</p> // Placeholder
                       // <ProjectCard key={project.id} project={project} />
                     ))}
                   </div>
                 ) : (
                   <p className="text-center text-muted-foreground">No projects found.</p>
                 )}
              </div>
            </div>
          );
        }
        ```

7.  **Create Project Card Component:**
    *   File: `src/components/project-card.tsx`
    *   Use shadcn Card component as a base.
    *   Command to add Card component: `npx shadcn-ui@latest add card`
    *   Content (Example):
        ```typescript
        import Image from "next/image";
        import Link from "next/link";
        import {
          Card,
          CardContent,
          CardDescription,
          CardFooter,
          CardHeader,
          CardTitle,
        } from "@/components/ui/card"; // Auto-imported by shadcn add
        import { Button } from "@/components/ui/button"; // Add button: npx shadcn-ui@latest add button
        import { Project } from "@/types/project";
        import { ExternalLink } from "lucide-react"; // Icon

        interface ProjectCardProps {
          project: Project;
        }

        export function ProjectCard({ project }: ProjectCardProps) {
          // Basic placeholder image if none provided
          const imageUrl = project.image_url || "https://via.placeholder.com/400x250?text=Project+Image";

          return (
            <Card className="flex h-full flex-col overflow-hidden">
              <CardHeader>
                <div className="relative mb-4 h-48 w-full">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardTitle>{project.title}</CardTitle>
                {project.description && (
                  <CardDescription className="line-clamp-3"> {/* Limit description lines */}
                    {project.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow"></CardContent> {/* Pushes footer down */}
              <CardFooter>
                {project.project_link && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={project.project_link} target="_blank" rel="noopener noreferrer">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        }
        ```
    *   **Update Homepage (`src/app/page.tsx`)**: Replace the placeholder `<p>` tag with `<ProjectCard key={project.id} project={project} />` and import `ProjectCard`. Add the Button component (`npx shadcn-ui@latest add button`).

## 6. Page Creation (About, Contact)

Create the basic structure for the About and Contact pages.

**Steps:**

1.  **Create About Page:**
    *   File: `src/app/about/page.tsx`
    *   Content (Placeholder):
        ```typescript
        export default function AboutPage() {
          return (
            <div className="container mx-auto px-4 py-16">
              <h1 className="mb-4 text-4xl font-bold">About Me</h1>
              <p className="text-lg text-muted-foreground">
                Information about skills, experience, and background will go here.
              </p>
              {/* Add more sections, maybe use shadcn components */}
            </div>
          );
        }
        ```

2.  **Create Contact Page:**
    *   File: `src/app/contact/page.tsx`
    *   Content (Placeholder):
        ```typescript
        // Consider adding shadcn form components later: npx shadcn-ui@latest add form input textarea label
        export default function ContactPage() {
          return (
            <div className="container mx-auto px-4 py-16">
              <h1 className="mb-4 text-4xl font-bold">Contact</h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Get in touch via the form below or through other channels.
              </p>
              {/* Placeholder for contact form or contact details */}
              <div className="max-w-md mx-auto">
                 <p className="text-center text-muted-foreground">[Contact Form Placeholder]</p>
                 {/* Example: Add shadcn Form here later */}
              </div>
            </div>
          );
        }
        ```

## 7. Navigation (Basic)

Add a simple navigation bar. A more interactive one (like FloatingNav) can be added later.

**Steps:**

1.  **Add shadcn Navigation Menu:**
    *   Command: `npx shadcn-ui@latest add navigation-menu`
2.  **Create Header Component:**
    *   File: `src/components/header.tsx`
    *   Content (Example):
        ```typescript
        "use client"

        import * as React from "react"
        import Link from "next/link"
        import { usePathname } from "next/navigation" // Hook to get current path

        import { siteConfig } from "@/config/site" // Create this config file
        import { cn } from "@/lib/utils"
        import {
          NavigationMenu,
          NavigationMenuItem,
          NavigationMenuLink,
          NavigationMenuList,
          navigationMenuTriggerStyle,
        } from "@/components/ui/navigation-menu"
        // import { Icons } from "@/components/icons" // Optional: for logo
        // import { ThemeToggle } from "@/components/theme-toggle" // Add later

        export function Header() {
          const pathname = usePathname()

          return (
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 max-w-screen-2xl items-center">
                {/* Logo/Brand */}
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  {/* <Icons.logo className="h-6 w-6" /> */}
                  <span className="font-bold sm:inline-block">
                    {siteConfig.name}
                  </span>
                </Link>

                {/* Main Navigation */}
                <NavigationMenu className="hidden sm:flex">
                  <NavigationMenuList>
                    {siteConfig.mainNav?.map(
                      (item) =>
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
                   {/* <ThemeToggle /> */}
                </div>
              </div>
            </header>
          )
        }
        ```
3.  **Create Site Configuration:**
    *   File: `src/config/site.ts`
    *   Content:
        ```typescript
        export type SiteConfig = typeof siteConfig

        export const siteConfig = {
          name: "Portfolio",
          description:
            "Modern portfolio built with Next.js, shadcn/ui, and Supabase.",
          mainNav: [
            {
              title: "Home",
              href: "/",
            },
            {
              title: "About",
              href: "/about",
            },
            {
              title: "Contact",
              href: "/contact",
            },
          ],
          links: {
            // Add social links later if needed
            // github: "https://github.com/yourusername",
          },
        }
        ```
4.  **Add Header to Layout:**
    *   File: `src/app/layout.tsx`
    *   Import and include the `<Header />` component within the `ThemeProvider`.
        ```typescript
        // ... other imports
        import { Header } from "@/components/header";

        export default function RootLayout({ children }: ...) {
          return (
            <html lang="en" suppressHydrationWarning>
              <body ...>
                <ThemeProvider ...>
                  <div className="relative flex min-h-screen flex-col bg-background">
                     <Header /> {/* Add Header */}
                     <main className="flex-1">{children}</main>
                     {/* Footer later */}
                  </div>
                </ThemeProvider>
              </body>
            </html>
          );
        }
        ```

## 8. Further Enhancements (Future Steps)

*   **Interactive Components:** Integrate other components like `FloatingNav`, `Spotlight`, `AnimatedTestimonials`, `Sparkles`, `GooeyFilter` as needed, following similar integration steps (add component via shadcn CLI or copy code, install dependencies, use in pages/components).
*   **Contact Form:** Implement a functional contact form on the Contact page using shadcn Form components and potentially an API route or server action to handle submission.
*   **Styling & Polish:** Refine Tailwind CSS styles, add micro-interactions, and ensure responsiveness across devices.
*   **Image Optimization:** Use Next.js `<Image>` component effectively. Consider storing images in Supabase Storage.
*   **SEO:** Add appropriate metadata to pages.
*   **Testing:** Implement unit and integration tests (Jest, React Testing Library).
*   **Deployment:** Configure deployment (e.g., Vercel, Netlify, AWS).

## 9. Research and Documentation (Perplexity MCP)

Throughout the development process, the Perplexity MCP server can be used for:

*   Looking up specific **Tailwind CSS class** usage or combinations.
*   Finding documentation for **Next.js features** (e.g., Server Components, App Router data fetching patterns).
*   Getting examples for **Supabase query syntax** or RLS policies.
*   Understanding **Framer Motion** animation properties or hooks.
*   Checking **TypeScript** type definitions or best practices.
*   Troubleshooting errors encountered during development.

**Example Usage:**
*   "How to implement a grid layout with dynamic columns in Tailwind CSS?"
*   "Show me an example of fetching data in a Next.js 14 Server Component using Supabase."
*   "What are the common props for Framer Motion's `motion.div` component?"

This plan provides a structured approach to building the portfolio website. Each step builds upon the previous one, starting with the core setup and gradually adding features and complexity.

## 10. About Page Redesign (Phase 1: Premium Enhancement)

**Goal:** Elevate the design of the About page (`src/app/about/page.tsx`) to feel more premium, cohesive, and aligned with top-tier design standards, integrating the Services and Skills sections more thoughtfully.

**Phase 10.1: Analysis & Research**

1.  **Baseline Code Review:** Re-read `src/app/about/page.tsx` for the current structure.
2.  **Component Inventory:** Check `src/components/ui/` for available Shadcn UI components (Card, Tabs, Accordion, Badge, etc.).
3.  **Design Trend Research (Perplexity):** Use Perplexity MCP to research:
    *   "UI/UX design trends for modern portfolio 'About' pages 2025"
    *   "Best practices for showcasing services and skills visually on agency/portfolio websites"
    *   "Examples of award-winning 'About Us' page designs"
4.  **Current Page Analysis:** Evaluate flow, hierarchy, consistency, and engagement.

**Phase 10.2: Redesign Strategy**

1.  **Refine Core Message:** Ensure the "What We Do" intro paragraph is impactful.
2.  **Integrate Services & Skills:** Create a unified "Capabilities" or "Expertise" section.
    *   **Approach:** Use a responsive grid of `Card` components.
    *   **Card Content:** Each card represents a high-level capability (e.g., "Web Design & Development", "Branding & Visual Identity"). Include title, optional icon, and list related services/skills (using text or subtle `Badge` components).
3.  **Elevate "Notable Highlights":** Enhance the existing card-based structure.
    *   **Styling:** Ensure consistent `Card` styling (background, border, padding) and add subtle hover effects.
    *   **Typography:** Refine text presentation for readability and impact.
    *   **Layout:** Maintain vertical stack with generous spacing.
4.  **Visual Polish & Consistency:**
    *   Apply consistent spacing, typography, and component variants.
    *   Utilize whitespace effectively for a clean look.

**Phase 10.3: Implementation (Requires ACT MODE)**

1.  Perform research steps (Perplexity).
2.  Implement the redesign in `src/app/about/page.tsx` based on the strategy.
3.  Update relevant documentation (`FRONTEND_GUIDELINES.md`, `QA_Test_Plan.md`).
