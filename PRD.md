# Product Requirements Document: Portfolio Website

## 1. Introduction & Goals

### 1.1. Introduction
This document outlines the product requirements for a personal portfolio website. The website will serve as a central hub to showcase projects, skills, and experience, and provide a means for professional contact.

### 1.2. Goals
*   **Showcase Expertise:** Effectively display projects and technical skills to potential employers, collaborators, or clients.
*   **Modern & Performant:** Build a fast, responsive, and visually appealing website using modern web technologies (Next.js 15, React 19, Tailwind CSS v4).
*   **Easy Maintenance:** Utilize a structured approach (TypeScript, `src` directory) and potentially a headless CMS or database (Supabase) for easier content updates.
*   **Professional Contact:** Provide a clear and functional way for visitors to get in touch.
*   **Accessibility & SEO:** Ensure the site is accessible to all users and optimized for search engines.

## 2. Target Audience

*   **Potential Employers:** Recruiters, hiring managers looking for software engineers/developers.
*   **Potential Clients:** Individuals or companies seeking freelance development services.
*   **Collaborators:** Other developers or professionals interested in collaboration.
*   **Peers:** Other individuals in the tech community.

## 3. Key Features

### 3.1. Home Page (`/`)
*   **Purpose:** Landing page providing a brief introduction, highlighting key skills or recent projects, and guiding users to other sections.
*   **Components:**
    *   Hero section (potentially using `WavesHero` component).
    *   Brief "About Me" snippet.
    *   Featured projects section (linking to project detail pages).
    *   Call-to-action (e.g., "View Projects", "Contact Me").

### 3.2. About Page (`/about`)
*   **Purpose:** Provide detailed background information, skills, experience, and professional philosophy.
*   **Content:**
    *   Detailed biography/professional summary.
    *   Skills list (categorized: languages, frameworks, tools).
    *   Experience timeline (optional).
    *   Resume download link (optional).

### 3.3. Projects List Page (`/projects`)
*   **Purpose:** Display a gallery or list of all showcased projects.
*   **Components:**
    *   Grid or list view of project cards (`ProjectCard` component).
    *   Each card should display: Project thumbnail/image, title, brief description/tags.
    *   Each card links to the corresponding dynamic project detail page.
    *   Filtering/Sorting capabilities (Future Consideration).

### 3.4. Project Detail Page (`/projects/[slug]`)
*   **Purpose:** Provide in-depth information about a specific project.
*   **Content:**
    *   Project Title.
    *   Detailed Description.
    *   Key Features/Technologies Used.
    *   `content_sections`: Dynamically render text blocks and images based on Supabase data.
    *   Link to live demo (if applicable).
    *   Link to source code repository (if applicable).
    *   Screenshots/Videos.

### 3.5. Contact Page (`/contact`)
*   **Purpose:** Allow visitors to send messages directly through the website.
*   **Components:**
    *   Contact form (Name, Email, Message).
    *   Submission handled by a Next.js Server Action (`src/app/contact/actions.ts`).
    *   Success/Error feedback messages (using `sonner` toast notifications).
    *   Basic spam protection (e.g., honeypot, rate limiting - Future Consideration).

### 3.6. Theme Toggle
*   **Purpose:** Allow users to switch between light and dark color themes.
*   **Implementation:**
    *   Uses `next-themes` library.
    *   Toggle button (`ThemeToggle` component) likely placed in the header.
    *   Default theme: Dark.
    *   Theme preference persisted across sessions (using `localStorage`).

### 3.7. Global Layout & Navigation
*   **Components:**
    *   **Header (`Header` component):** Contains site logo/name, navigation links (Home, About, Projects, Contact), theme toggle. Includes `MobileNav` for smaller screens.
    *   **Footer (`SiteFooter` component):** Contains copyright information, links to social profiles (e.g., GitHub, LinkedIn), links to Privacy Policy and Terms of Service.
*   **Structure:** Defined in `src/app/layout.tsx`, wrapping all page content.

### 3.8. Legal Pages
*   **Privacy Policy (`/privacy`):** Placeholder page for privacy information.
*   **Terms of Service (`/terms`):** Placeholder page for terms of service.

## 4. Functional Requirements

### 4.1. Data Fetching
*   Project data (list and details) will be fetched from the Supabase `projectclayton` table.
*   Fetching will occur server-side (React Server Components) for optimal performance and SEO.
*   The `supabaseClient` (`src/lib/supabaseClient.ts`) will be used for database interactions.

### 4.2. Contact Form Submission
*   The contact form will submit data via a Next.js Server Action.
*   The Server Action will validate input data.
*   Upon successful validation, the action will insert the message into a Supabase table (e.g., `contact_submissions`).
*   Appropriate success or error feedback will be displayed to the user.

### 4.3. Theming
*   The site will support light and dark themes.
*   Theme switching will be instant and persistent.
*   Tailwind CSS utility classes will adapt based on the active theme (`dark:` variant).

### 4.4. Routing
*   Utilizes the Next.js App Router (`src/app` directory).
*   Static routes for Home, About, Projects List, Contact, Privacy, Terms.
*   Dynamic routes for individual Project Detail pages based on project slugs.

## 5. Non-Functional Requirements

### 5.1. Performance
*   **Target:** Fast load times (e.g., LCP < 2.5s, FID < 100ms, CLS < 0.1).
*   **Strategies:** Next.js static/server rendering, image optimization (`next/image`), code splitting, minimal client-side JavaScript, efficient data fetching.
*   **Measurement:** Lighthouse audits, Vercel Analytics.

### 5.2. Accessibility (A11y)
*   **Target:** WCAG 2.1 AA compliance.
*   **Strategies:** Semantic HTML, ARIA attributes where necessary, keyboard navigation, sufficient color contrast (handled partly by `shadcn/ui` and Tailwind), focus management.
*   **Testing:** Manual testing (keyboard navigation, screen readers), automated tools (e.g., Axe DevTools, Playwright accessibility checks).

### 5.3. Security
*   **Data:** Supabase Row Level Security (RLS) configured to allow public read access to `projects` and restrict write access (e.g., requires authenticated admin role or specific API key). Contact form submissions should be stored securely.
*   **Dependencies:** Keep dependencies updated to patch vulnerabilities.
*   **Server Actions:** Implement necessary validation and rate limiting (future) to prevent abuse.
*   **Environment Variables:** Sensitive keys (Supabase API keys) stored securely in environment variables (`.env.local`) and not exposed client-side unless necessary (using `NEXT_PUBLIC_` prefix).

### 5.4. Responsiveness
*   The website must adapt gracefully to various screen sizes (desktop, tablet, mobile).
*   Tailwind CSS responsive modifiers will be used extensively.

### 5.5. Browser Compatibility
*   Support the latest two versions of major browsers (Chrome, Firefox, Safari, Edge).

### 5.6. SEO
*   Utilize Next.js metadata API for page titles, descriptions, and other SEO tags.
*   Semantic HTML structure.
*   Fast performance.
*   Generate `sitemap.xml` and `robots.txt` (Future Consideration).

### 5.7. Testability
*   Implement unit/integration tests for critical components and utilities.
*   Expand End-to-End (E2E) tests using Playwright (`tests/example.spec.ts`) to cover key user flows (navigation, project viewing, form submission). Refer to `QA_Test_Plan.md` for specific scenarios.

### 5.8. Deployment
*   Continuous deployment via Vercel integrated with the GitHub repository.

## 6. Design & UI/UX Considerations

*   **Frameworks/Libraries:** Tailwind CSS v4 for styling, `shadcn/ui` for pre-built, accessible components (Buttons, Cards, Forms, etc.), Framer Motion for subtle animations.
*   **Visual Style:** Modern, clean, professional. Specific design details TBD, but leveraging the chosen tools.
*   **Responsiveness:** Mobile-first approach preferred during development.
*   **User Experience:** Intuitive navigation, clear information hierarchy, fast interactions.

## 7. Data Model

*   **Primary Data Source:** Supabase PostgreSQL database.
*   **Key Table:** `projects`
    *   `id` (uuid, primary key)
    *   `slug` (text, unique identifier for URL)
    *   `title` (text)
    *   `description` (text)
    *   `thumbnail_url` (text)
    *   `live_url` (text, optional)
    *   `repo_url` (text, optional)
    *   `tags` (array of text, optional)
    *   `created_at` (timestamp)
    *   `content_sections` (jsonb array): Stores the content for project detail pages. Each object in the array has a `type` ('text' or 'image') and corresponding data (`content` for text, `src` for image).
        *   Example: `[{ "type": "text", "content": "Detailed paragraph about the project." }, { "type": "image", "src": "/images/project-screenshot.png" }]`
*   **Other Table (Potential):** `contact_submissions`
    *   `id` (uuid, primary key)
    *   `name` (text)
    *   `email` (text)
    *   `message` (text)
    *   `submitted_at` (timestamp)

## 8. Future Considerations

*   **Blog Section:** Add a blog for sharing articles and insights.
*   **CMS Integration:** Integrate a headless CMS (e.g., Contentful, Sanity, Strapi, or even Supabase itself more deeply) for easier project and blog content management.
*   **Advanced Filtering/Search:** Implement filtering or searching on the Projects page.
*   **Internationalization (i18n):** Support multiple languages.
*   **Enhanced Animations:** Add more sophisticated animations using Framer Motion.
*   **Detailed Analytics:** Integrate more comprehensive analytics tools.
*   **CI/CD Pipeline:** Implement a more robust CI/CD pipeline with automated testing stages before deployment.