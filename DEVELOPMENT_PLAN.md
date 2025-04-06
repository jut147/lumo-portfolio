# Development Plan: Portfolio Website

This document outlines the planned steps for developing the portfolio website.

## 1. Setup & Configuration
*   Initialize Next.js 15 project (already done).
*   Install necessary dependencies: Tailwind CSS v4, shadcn/ui, Framer Motion, `next-themes`, Supabase client, Playwright (already done).
*   Configure Tailwind CSS, including theme settings (light/dark).
*   Set up `shadcn/ui` CLI.
*   Configure `next-themes` provider.
*   Set up Supabase client (`src/lib/supabaseClient.ts`) and environment variables (`.env.local`).
*   Configure ESLint, Prettier, TypeScript (`tsconfig.json`).

## 2. Core Layout & Theming
*   Implement the global layout (`src/app/layout.tsx`) including Header and Footer components.
*   Create Header component (`src/components/header.tsx`) with navigation links (Home, About, Projects, Contact) and the Theme Toggle button.
*   Create Footer component (`src/components/site-footer.tsx` or similar) with copyright and potentially social links.
*   Implement the Theme Toggle functionality using `next-themes` and the `shadcn/ui` button/dropdown. Ensure default is dark mode.

## 3. Page Implementation
*   **Home Page (`/`):**
    *   Create `src/app/page.tsx`.
    *   Implement Hero section (potentially using `waves-hero.tsx` or similar).
    *   Add introductory content.
    *   (Optional) Fetch and display featured projects.
*   **About Page (`/about`):**
    *   Create `src/app/about/page.tsx`.
    *   Add biographical content, skills list, etc.
*   **Projects List Page (`/projects`):**
    *   Create `src/app/projects/page.tsx`.
    *   Fetch list of projects using data fetching functions (e.g., `getProjects` from `src/lib/data.ts`).
    *   Implement `ProjectCard` component (`src/components/project-card.tsx`).
    *   Display projects in a grid or list using the `ProjectCard`.
*   **Project Detail Page (`/projects/[slug]`):**
    *   Create `src/app/projects/[slug]/page.tsx`.
    *   Implement dynamic route handling.
    *   Fetch specific project data using data fetching functions (e.g., `getProjectBySlug` from `src/lib/data.ts`) based on `slug`.
    *   Display project title, description, technologies.
    *   Implement logic to render `content_sections` (text and image types).
*   **Contact Page (`/contact`):**
    *   Create `src/app/contact/page.tsx`.
    *   Build the contact form using `shadcn/ui` components (Input, Textarea, Button, Form).
    *   Create a Server Action to handle form submission (validate data, send to Supabase/email).
    *   Integrate `sonner` for user feedback (success/error toasts).
*   **Legal Pages (`/privacy`, `/terms`):**
    *   Create basic page components for `/privacy` and `/terms`.
    *   Add placeholder content. (Actual legal text is out of scope for development).

## 4. Animation
*   Integrate Framer Motion for subtle page transitions or component animations (e.g., on the hero section, project cards).

## 5. Testing
*   Write unit/integration tests for key components (e.g., `ProjectCard`, form validation logic).
*   Expand Playwright E2E tests (`tests/example.spec.ts`) to cover main user flows:
    *   Navigate between pages.
    *   Submit contact form successfully.
    *   Submit contact form with errors (validation).
    *   Toggle theme.
    *   View project list and detail pages.
*   Run accessibility checks as part of E2E tests.
*   Reference and update existing `QA_Test_Plan.md` as needed.

## 6. Deployment
*   Configure project for Vercel deployment.
*   Set up environment variables in Vercel for Supabase connection.
*   Deploy initial version and set up automatic deployments from the main branch.

## Visual Overview

```mermaid
graph TD
    A[Setup & Config] --> B(Core Layout & Theming);
    B --> C{Page Implementation};
    C --> D[Home Page];
    C --> E[About Page];
    C --> F[Projects List Page];
    C --> G[Project Detail Page];
    C --> H[Contact Page];
    C --> I[Legal Pages];
    F --> G;
    H --> J[Server Action];
    B --> K[Theme Toggle];
    C --> L[Animation - Framer Motion];
    M[Testing] --> N[Unit/Integration Tests];
    M --> O[E2E Tests - Playwright];
    O --> P[Accessibility Checks];
    Q[Deployment - Vercel];

    subgraph Data Flow
        R[Supabase] --> F;
        R --> G;
        J --> R;
    end

    A --> M;
    L --> C;
    I --> Q;
    O --> Q;