# Tech Stack (`TECH_STACK.md`)

This document outlines the technologies used in the portfolio website project.

## Core Framework

*   **[Next.js](https://nextjs.org/) (v15)**
    *   **Why:** Chosen for its robust features for building modern React applications, including Server-Side Rendering (SSR), Static Site Generation (SSG), file-system based routing (App Router), API routes, and optimizations for performance and SEO.
    *   **App Router:** Utilized for improved routing, layout management, and leveraging React Server Components.

## UI Library/Framework

*   **[React](https://react.dev/) (v19)**
    *   **Why:** The foundation for building interactive user interfaces with a component-based architecture. Version 19 brings potential performance improvements and new features.

## Language

*   **[TypeScript](https://www.typescriptlang.org/) (v5)**
    *   **Why:** Enhances JavaScript with static typing, improving code quality, maintainability, and developer experience, especially in larger projects.
    *   **Strict Mode:** Enabled for maximum type safety.

## Styling

*   **[Tailwind CSS](https://tailwindcss.com/) (v4)**
    *   **Why:** A utility-first CSS framework that allows for rapid UI development directly in the markup without writing custom CSS. Version 4 offers potential performance benefits.
*   **[PostCSS](https://postcss.org/)**
    *   **Why:** Used by Tailwind CSS for processing and extending CSS capabilities.
*   **[shadcn/ui](https://ui.shadcn.com/)**
    *   **Why:** Provides beautifully designed, accessible, and customizable UI components built on top of Tailwind CSS and Radix UI, accelerating development. Components are copied into the project for full control.

## State Management

*   **React Context API / Hooks**
    *   **Why:** Used for managing global state like theme preferences (`next-themes`) and potentially other cross-component state needs. Component-level state is managed using standard React hooks (`useState`, `useReducer`).
*   **[next-themes](https://github.com/pacocoursey/next-themes) (v0.4)**
    *   **Why:** Simplifies the implementation of light/dark mode theming integrated with Next.js and Tailwind CSS.

## Backend & Data

*   **[Supabase](https://supabase.com/)**
    *   **Why:** An open-source Firebase alternative providing a suite of backend tools. Chosen for its ease of use and integrated services.
    *   **PostgreSQL Database:** Used for storing structured data (e.g., project details, potentially blog posts or contact form submissions).
    *   **Row Level Security (RLS):** Implemented for fine-grained data access control.
    *   **Auth:** Potentially used for an admin section or future features requiring user authentication.
    *   **JS Client Library (`@supabase/supabase-js`) (v2):** Used for interacting with Supabase services from the frontend and backend.

## Form Handling

*   **[Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)**
    *   **Why:** Used for handling form submissions securely on the server without needing separate API endpoints, simplifying the contact form implementation.
*   **[React Hook Form](https://react-hook-form.com/) (v7)**
    *   **Why:** Provides performant and flexible form state management and validation on the client-side.
*   **[Zod](https://zod.dev/) (v3)**
    *   **Why:** Used for schema declaration and validation, ensuring data integrity for form submissions, integrated with React Hook Form.

## Animation

*   **[Framer Motion](https://www.framer.com/motion/) (v12)**
    *   **Why:** A powerful React animation library for creating fluid and complex animations declaratively.

## Testing

*   **[Playwright](https://playwright.dev/) (v1)**
    *   **Why:** Used for End-to-End (E2E) testing, ensuring critical user flows work correctly in real browser environments.
*   **Unit/Integration Tests:** (Future Consideration) Need to implement unit and integration tests (e.g., using Vitest or Jest with React Testing Library) for component-level and integration testing.

## Linting & Formatting

*   **[ESLint](https://eslint.org/) (v9)**
    *   **Why:** Enforces code quality and consistency rules.
*   **[Prettier](https://prettier.io/)** (Inferred)
    *   **Why:** Automatically formats code to ensure a consistent style across the project. Typically used alongside ESLint.

## Deployment & Hosting

*   **[Vercel](https://vercel.com/)**
    *   **Why:** Provides seamless deployment, hosting, and scaling for Next.js applications, along with features like serverless functions, edge network, and analytics.

## Build System & Package Manager

*   **Next.js CLI**
    *   **Why:** Used for development (`next dev`), building (`next build`), and serving (`next start`) the application.
*   **npm** (Inferred from `package-lock.json`)
    *   **Why:** Manages project dependencies and scripts.