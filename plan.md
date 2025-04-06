# Plan: Modern Portfolio Website with Next.js, shadcn/ui, and Supabase

## 1. Project Overview

Create a modern, high-class portfolio website showcasing projects dynamically fetched from Supabase. The site will feature interactive UI elements and animations.

**Technology Stack:**
*   Next.js (App Router)
*   React
*   TypeScript
*   Tailwind CSS
*   shadcn
*   Supabase (for data)
*   Framer Motion (for animations)
*   Lucide React (for icons)
*   Next Themes (for theme handling)

**Core Features:**
*   Homepage with interactive Waves hero section and dynamic project grid.
*   Dynamic Project Detail Pages (using slugs).
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

2.  **Initialize shadcn:**
    *   Run the `shadcn init` command to configure the project for shadcn components.
    *   Command:
        ```bash
        npx shadcn@latest init
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
    *   Create a table named `projectclayton` with columns corresponding to the `Project` type and Zod schema in `src/lib/data.ts`. Key columns include:
        *   `id` (uuid, primary key, default: `gen_random_uuid()`)
        *   `created_at` (timestamp with time zone, default: `now()`)
        *   `slug` (text, unique, not null)
        *   `title_client` (text) - Main display title
        *   `project_brief_description` (text) - Main description
        *   `hero_image_url` (text) - URL for the main project image
        *   `image_url` (text) - URL for the card image
        *   `project_link` (text) - URL to the live project or repository
        *   `client_name` (text)
        *   `client_website` (text)
        *   `category` (text)
        *   `date_completed` (text or date)
        *   `services` (text[])
        *   `tech_stack` (text[])
        *   `industry_tags` (text[])
        *   `gallery_images` (text[]) - Array of image URLs
        *   `content_sections` (jsonb) - Array of text/image objects
        *   `brief_block1_title`, `brief_block1_text`, `brief_block1_image` (text) - For content sections
        *   `brief_block2_title`, `brief_block2_text`, `brief_block2_image` (text)
        *   `brief_block3_title`, `brief_block3_text`, `brief_block3_image` (text)
        *   `brief_block4_title`, `brief_block4_text`, `brief_block4_image` (text)
        *   `outcome` (text)
        *   `testimonial` (text)
        *   `featured` (boolean)
    *   Enable Row Level Security (RLS) on the `projectclayton` table and create a policy that allows public read access (`SELECT`). Example Policy:
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
        // Note: This is illustrative. The actual type should align
        // with the Zod schema in src/lib/data.ts
        export interface Project {
          id: string;
          slug: string;
          title_client: string | null;
          project_brief_description: string | null;
          hero_image_url: string | null;
          image_url: string | null;
          project_link: string | null;
          client_name: string | null;
          client_website: string | null;
          category: string | null;
          date_completed: string | null;
          services: string[] | null;
          tech_stack: string[] | null;
          industry_tags: string[] | null;
          gallery_images: string[] | null; // Array of URLs
          content_sections: { type: 'text', content: string }[] | { type: 'image', src: string, alt?: string }[] | null; // Example structure
          brief_block1_title: string | null;
          brief_block1_text: string | null;
          brief_block1_image: string | null;
          // ... other brief blocks ...
          outcome: string | null;
          testimonial: string | null;
          featured: boolean | null;
          created_at: string | null; // ISO 8601 string
        }
        ```

6.  **Implement Data Fetching Function:**
    *   Data fetching functions are centralized in `src/lib/data.ts`. These functions use the `supabaseClient` and perform Zod validation. Server Components should import and use these functions.
    *   **Homepage Fetching:** Example usage within `src/app/page.tsx`:
        ```typescript
        import { WavesHero } from "@/components/waves-hero";
        import { getProjects } from "@/lib/data"; // Import the data fetching function
        import { ProjectCard } from "@/components/project-card"; // Import ProjectCard

        export default async function HomePage() { // Make the component async
          const projects = await getProjects(); // Fetch validated data using the function

          return (
            <div>
              <WavesHero />
              <div className="container mx-auto px-4 py-16">
                 <h2 className="mb-8 text-center text-3xl font-bold">Projects</h2>
                 {projects.length > 0 ? (
                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {projects.map((project) => (
                       <ProjectCard key={project.id} project={project} /> // Use ProjectCard
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

        export default async function HomePage() { // Make the component async
          const projects = await getProjects(); // Fetch data for the homepage grid

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
    *   Command to add Card component: `npx shadcn@latest add card`
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
        import { Button } from "@/components/ui/button"; // Add button: npx shadcn@latest add button
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
                    {/* Link the entire card or a specific button to the detail page */}
                    <Link href={`/projects/${project.slug}`} className="mt-auto"> {/* Link uses slug */}
                       <Button variant="outline" size="sm" className="w-full">
                         View Details
                       </Button>
                    </Link>
                  {/* Optionally keep external link if needed */}
                  {/* {project.project_link && (
                    <Button asChild variant="ghost" size="sm">
                      <Link href={project.project_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )} */}
              </CardFooter>
            </Card>
          );
        }
        ```
    *   **Update Homepage (`src/app/page.tsx`)**: Replace the placeholder `<p>` tag with `<ProjectCard key={project.id} project={project} />` and import `ProjectCard`. Add the Button component (`npx shadcn@latest add button`).

## 6. Dynamic Project Detail Page

Create the dynamic route and component to display individual project details.

**Steps:**

1.  **Create Dynamic Route File:**
    *   File: `src/app/projects/[slug]/page.tsx`
    *   This file will handle requests like `/projects/my-first-project`.

2.  **Implement Page Component:**
    *   This will be an `async` Server Component to fetch data based on the `slug` parameter.
    *   Import and use the `getProjectBySlug` function from `src/lib/data.ts`. This function handles fetching and Zod validation.
    *   Handle cases where the project is not found or validation fails (the function returns `null`) by calling `notFound()` from `next/navigation`.
    *   Structure the page layout based on the mockup and research:
        *   **Hero Image:** Display `project.hero_image_url`.
        *   **Metadata Section:** Show `client_name`, `website`, `category`, `date`, `services`. Use shadcn `Badge` for tags/services if desired (`npx shadcn@latest add badge`). Style with a distinct background as per mockup.
        *   **Project Brief:** Display `project.brief_title` prominently and the main `project.description`.
        *   **Tech Stack:** List `project.tech_stack`. Consider using icons alongside text.
        *   **Content Sections:** Render the data from `project.content_sections`. This might involve mapping over an array and using different layouts based on the section type.
        *   **Gallery:** Display images from `project.gallery_images`. Consider using a carousel component (e.g., shadcn `Carousel`: `npx shadcn@latest add carousel`) or a custom grid layout.
    *   **Modularity & Performance:** Build the page using reusable React components. Leverage Next.js Server Components for efficient data fetching and rendering. Consider using `generateStaticParams` if the number of projects is manageable, for optimal static generation performance.
    *   **SEO:** Implement dynamic metadata generation (title, description) based on project data using Next.js `generateMetadata` function. Ensure semantic HTML structure.
    *   Example Structure (`src/app/projects/[slug]/page.tsx`):
        ```typescript
        import { getProjectBySlug } from "@/lib/data"; // Import the data fetching function
        // Project type is likely inferred or imported within lib/data.ts
        import { notFound } from 'next/navigation';
        import Image from 'next/image';
        import Link from 'next/link';
        import { Badge } from "@/components/ui/badge";
        // Import other necessary components

        // Fetch function is defined in src/lib/data.ts

        interface ProjectPageProps {
          params: { slug: string };
        }

        export default async function ProjectPage({ params }: ProjectPageProps) {
          const project = await getProjectBySlug(params.slug);

          if (!project) {
            notFound(); // Trigger 404 page if project not found
          }

          return (
            <div className="container mx-auto px-4 py-16">
              {/* 1. Hero Image */}
              {project.hero_image_url && (
                <div className="relative mb-8 h-64 md:h-96 w-full overflow-hidden rounded-lg">
                  <Image src={project.hero_image_url} alt={`${project.title} Hero Image`} layout="fill" objectFit="cover" />
                </div>
              )}

              {/* 2. Metadata Section (Example Layout) */}
              <div className="mb-8 rounded-lg bg-muted/50 p-6">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                   {project.client_name && <div><strong>Client:</strong> {project.client_name}</div>}
                   {project.website && <div><strong>Website:</strong> <Link href={project.website} target="_blank" className="text-primary hover:underline">{project.website}</Link></div>}
                   {project.category && <div><strong>Category:</strong> {project.category}</div>}
                   {project.date && <div><strong>Date:</strong> {project.date}</div>}
                   {project.services && project.services.length > 0 && (
                     <div className="col-span-2 md:col-span-4">
                       <strong>Services:</strong>
                       <div className="mt-1 flex flex-wrap gap-2">
                         {project.services.map(service => <Badge key={service} variant="secondary">{service}</Badge>)}
                       </div>
                     </div>
                   )}
                 </div>
              </div>

              {/* 3. Project Brief */}
              <h1 className="mb-2 text-3xl md:text-5xl font-bold">{project.brief_title || project.title}</h1>
              {project.description && <p className="mb-8 text-lg text-muted-foreground">{project.description}</p>}

              {/* 4. Tech Stack */}
              {project.tech_stack && project.tech_stack.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-2 text-xl font-semibold">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map(tech => <Badge key={tech}>{tech}</Badge>)}
                  </div>
                </div>
              )}

              {/* 5. Content Sections (Render based on project.content_sections structure) */}
              {/* Example: Render simple title/text sections */}
              {/* {project.content_sections?.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <p>{section.text}</p>
                  {section.image_url && <Image src={section.image_url} alt={section.title} width={800} height={400} className="mt-4 rounded-lg"/>}
                </div>
              ))} */}

              {/* 6. Gallery */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                 <div className="mb-8">
                   <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
                   {/* Add Carousel or Grid component here */}
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {project.gallery_images.map((img, index) => (
                       <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                          <Image src={img.url} alt={img.caption || `Gallery image ${index + 1}`} layout="fill" objectFit="cover" />
                          {img.caption && <p className="absolute bottom-0 left-0 bg-black/50 text-white p-1 text-xs">{img.caption}</p>}
                       </div>
                     ))}
                   </div>
                 </div>
              )}

              {/* Optional: Link back to projects or next/prev project */}
            </div>
          );
        }

        // Optional: Generate static paths if needed (for performance)
        export async function generateStaticParams() {
           // Fetch all slugs using the dedicated function from src/lib/data.ts
           const slugs = await getAllProjectSlugs(); // Import and call function from lib/data.ts
           return slugs; // The function returns the correct format [{ slug: string }]
        }

        // Optional: Generate dynamic metadata for SEO
        // export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
        //   const project = await getProjectBySlug(params.slug);
        //   if (!project) {
        //     return { title: 'Project Not Found', description: '' };
        //   }
        //   return {
        //     title: `${project.title} | Portfolio`,
        //     description: project.description?.substring(0, 160) || 'Project details', // Truncate description
        //     // Add other metadata like open graph tags
        //   };
        // }
        ```

3.  **Add Necessary UI Components:**
    *   Install any shadcn components used in the detail page structure (e.g., `Badge`, `Carousel`).
    *   Commands:
        ```bash
        npx shadcn@latest add badge
        npx shadcn@latest add carousel
        ```

## 7. Page Creation (About, Contact)

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
        // Consider adding shadcn form components later: npx shadcn@latest add form input textarea label
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

## 8. Navigation (Basic)

Add a simple navigation bar. A more interactive one (like FloatingNav) can be added later.

**Steps:**

1.  **Add shadcn Navigation Menu:**
    *   Command: `npx shadcn@latest add navigation-menu`
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
            "Modern portfolio built with Next.js, shadcn, and Supabase.",
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

## 9. Further Enhancements (Future Steps)

*   **Interactive Components:** Integrate other components like `FloatingNav`, `Spotlight`, `AnimatedTestimonials`, `Sparkles`, `GooeyFilter` as needed, following similar integration steps (add component via shadcn CLI or copy code, install dependencies, use in pages/components).
*   **Contact Form:** Implement a functional contact form on the Contact page using shadcn Form components and potentially an API route or server action to handle submission.
*   **Styling & Polish:** Refine Tailwind CSS styles, add micro-interactions, and ensure responsiveness across devices.
*   **Image Optimization:** Use Next.js `<Image>` component effectively. Consider storing images in Supabase Storage or a dedicated CDN. Optimize image sizes and formats.
*   **SEO Optimization (Site-wide):** Implement comprehensive SEO strategy including:
    *   Dynamic metadata generation for all relevant pages (projects, potentially blog posts if added).
    *   Structured data (Schema.org) for projects and potentially the overall site/person.
    *   Generating a `sitemap.xml` and `robots.txt`.
    *   Ensuring semantic HTML and accessibility best practices.
*   **Performance Monitoring & Optimization:** Regularly analyze site performance using tools like Lighthouse and Vercel Analytics. Optimize bundle sizes, implement code splitting where necessary, and fine-tune caching strategies.
*   **Testing:** Implement unit and integration tests (Jest, React Testing Library). Add E2E tests with Playwright for critical user flows.
*   **Deployment:** Configure deployment (e.g., Vercel, Netlify, AWS). Set up CI/CD pipeline for automated testing and deployment.

## 10. Research and Documentation (Perplexity MCP)

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
