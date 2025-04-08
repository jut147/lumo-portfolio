# Frontend Development Guidelines

**Version:** 1.0
**Date:** 2025-04-08

## 1. Introduction

This document outlines the guidelines and best practices for frontend development in the portfolio website project. Adhering to these guidelines ensures consistency, maintainability, and quality across the codebase.

## 2. Technology Stack

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **UI Library:** React 19
*   **Styling:** Tailwind CSS v4
*   **Component Library:** shadcn/ui
*   **Animation:** Framer Motion

Refer to `docs/TECH_STACK.md` for more details.

## 3. Project Structure

*   **Pages:** Located in `src/app/` following the App Router conventions.
*   **Components:**
    *   Reusable UI components built with shadcn/ui primitives reside in `src/components/ui/`.
    *   Page-specific or larger composite components reside in `src/components/`.
    *   Clearly differentiate between Client Components (`"use client"`) and Server Components. Prefer Server Components where possible.
*   **Layouts:** Defined in `src/app/layout.tsx` and potentially nested layouts.
*   **Styling:** Global styles in `src/app/globals.css`. Component-level styling primarily via Tailwind utility classes.
*   **Utilities:** Helper functions in `src/lib/utils.ts`.
*   **Configuration:** Site config in `src/config/site.ts`, Tailwind config in `tailwind.config.ts`, TypeScript config in `tsconfig.json`.
*   **Types:** Shared TypeScript types in `src/types/`.

## 4. Component Development

*   **Naming:** Use PascalCase for component filenames and function names (e.g., `ProjectCard.tsx`, `function ProjectCard(...)`).
*   **Props:** Define clear interfaces for component props using TypeScript. Use descriptive prop names.
*   **Client vs. Server:** Explicitly use the `"use client"` directive only when necessary (e.g., for hooks like `useState`, `useEffect`, event handlers). Fetch data in Server Components or dedicated data-fetching functions (`src/lib/data.ts`) where possible.
*   **Composition:** Build complex UI by composing smaller, reusable components.
*   **shadcn/ui:** Leverage shadcn/ui components for common UI patterns (Button, Card, Dialog, etc.). Customize appearance using Tailwind classes passed via the `className` prop. Use `cn()` utility from `src/lib/utils.ts` to merge classes conditionally. The `Timeline` component (`src/components/ui/timeline.tsx`) is an example of a composite component built using shadcn/ui primitives and concepts within this project.

## 5. Styling

*   **Tailwind CSS:** Primarily use Tailwind utility classes for styling. Avoid custom CSS files unless absolutely necessary for complex or global styles not achievable with Tailwind.
*   **Theme:** Utilize theme variables defined in `tailwind.config.ts` (colors, spacing, fonts) for consistency. Respect light/dark mode variations using Tailwind's `dark:` modifier.
*   **Responsiveness:** Design components to be responsive using Tailwind's breakpoint modifiers (e.g., `md:`, `lg:`).

## 6. State Management

*   **Local State:** Use React hooks (`useState`, `useReducer`) for component-local state.
*   **Global State:** For simple global state needs (like theme), React Context (`src/components/theme-provider.tsx`) is sufficient. Avoid complex global state libraries unless the application scales significantly.
*   **Server State:** Use Server Components and data fetching functions (`src/lib/data.ts`) to manage server-side data. Consider libraries like SWR or React Query if complex client-side caching or mutations are needed later.

## 7. TypeScript

*   **Strict Mode:** Adhere to TypeScript's strict mode rules.
*   **Typing:** Provide explicit types for props, state, function arguments, and return values. Avoid `any` where possible. Use shared types from `src/types/`.
*   **Readability:** Use interfaces and types to improve code clarity and maintainability.

## 8. Animations

*   **Library:** Use Framer Motion for animations.
*   **Purpose:** Animations should enhance the user experience, provide feedback, or guide attention subtly. Avoid overly complex or distracting animations.
*   **Performance:** Be mindful of animation performance. Prefer animating `transform` and `opacity`. Use `will-change` sparingly if needed. Test animations on different devices.
*   **Implementation:**
    *   Use `motion` components (e.g., `motion.div`, `motion.section`).
    *   Utilize variants for defining animation states (`initial`, `animate`, `exit`, `whileInView`).
    *   Use `transition` prop for customizing duration, ease, delay, and staggering (`staggerChildren`).
    *   Use `whileInView` and `viewport` for scroll-triggered animations (e.g., fading/sliding sections into view as seen in `HomePageClient`).
    *   Use container variants with `staggerChildren` to create sequential animations for lists or groups of elements (e.g., the staggered animation of `TimelineItem` components in `HomePageClient`).
## 9. Accessibility (a11y)

*   **Semantic HTML:** Use appropriate HTML tags (e.g., `<nav>`, `<main>`, `<button>`, heading levels `<h1>`-`<h6>`).
*   **ARIA Attributes:** Use ARIA attributes where necessary to improve accessibility for screen readers (e.g., `aria-label`, `role`).
*   **Keyboard Navigation:** Ensure all interactive elements are focusable and operable via keyboard.
*   **Focus Management:** Manage focus appropriately, especially in modals or dynamic UI changes.
*   **Color Contrast:** Ensure sufficient color contrast between text and background according to WCAG guidelines.

## 10. Code Quality & Linting

*   **ESLint:** Adhere to the ESLint rules configured in the project (`eslint.config.mjs`). Run the linter regularly.
*   **Readability:** Write clean, readable, and well-formatted code.
*   **Comments:** Add comments to explain complex logic or non-obvious code sections.

## 11. Testing

*   Refer to `docs/QA_Test_Plan.md` for the overall testing strategy.
*   Consider adding unit/component tests for complex components or utility functions.
*   Ensure E2E tests cover critical user flows.