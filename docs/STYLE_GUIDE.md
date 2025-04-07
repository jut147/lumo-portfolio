# Project Style Guide

## 1. Introduction & Philosophy

This document outlines the styling conventions, design system foundations, and component usage guidelines for the Respired.io project. Adhering to this guide ensures visual consistency, maintainability, and a cohesive user experience across the application.

We prioritize using [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and [Shadcn UI](https://ui.shadcn.com/) as our base component library, leveraging its customizability and accessibility features.

## 2. Design System Foundations

The core visual elements are defined primarily through CSS variables in `src/app/globals.css` and referenced in the Tailwind configuration (`tailwind.config.ts` and `src/lib/shadcn-preset.ts`).

### 2.1. Colors

Colors are defined using CSS variables in `src/app/globals.css` with `oklch` values for both light and dark modes.

-   **Primary Palette:** `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--muted`, `--muted-foreground`, `--destructive`, `--destructive-foreground`
-   **UI Elements:** `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--border`, `--input`, `--ring`
-   **Charts:** `--chart-1` to `--chart-5`
-   **Sidebar (Custom):** `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, etc.

Refer to `src/app/globals.css` for the specific `oklch` values for both `:root` (light mode) and `.dark` scopes. These variables are consumed by Tailwind via the `shadcnPreset` in `tailwind.config.ts`.

### 2.2. Typography

-   **Font Families:** Defined in `tailwind.config.ts` using CSS variables:
    -   `sans`: `var(--font-geist-sans)` (Default body font)
    -   `mono`: `var(--font-geist-mono)`
    -   `display`: `var(--font-display)` (Used for `h1`, `h2`, `h3` via `globals.css`)
-   **Font Sizes & Weights:** Utilize Tailwind's default typography scale (e.g., `text-sm`, `font-medium`).

### 2.3. Spacing

-   Use Tailwind's default spacing scale (multiples of 0.25rem) for margins, padding, gaps, etc. (e.g., `p-4`, `m-2`, `gap-8`).
-   Container padding and centering are handled by the `container` settings within `src/lib/shadcn-preset.ts`.

### 2.4. Border Radius

-   The base border radius is defined by the `--radius` CSS variable in `src/app/globals.css`:
    ```css
    :root {
      --radius: 0.625rem; /* 10px */
    }
    ```
-   Tailwind utilities `rounded-lg`, `rounded-md`, `rounded-sm` map to this variable via `src/lib/shadcn-preset.ts`:
    -   `lg`: `var(--radius)`
    -   `md`: `calc(var(--radius) - 2px)`
    -   `sm`: `calc(var(--radius) - 4px)`

### 2.5. Theming (Dark Mode)

-   Dark mode is enabled using the `class` strategy in `tailwind.config.ts`.
-   The `.dark` class is applied to the `html` element (handled by the `ThemeProvider` component).
-   CSS variables for dark mode are defined within the `.dark { ... }` scope in `src/app/globals.css`.

## 3. Component Library Standards (Shadcn UI)

-   **Source:** Components are primarily sourced from Shadcn UI. Add new components using the Shadcn CLI (`npx shadcn-ui@latest add [component]`).
-   **Location:** Place Shadcn UI components within `src/components/ui/`.
-   **Custom Components:** Build custom, reusable components by composing Shadcn primitives and place them in `src/components/`.
-   **Naming:** Use PascalCase for React component filenames and function/class names (e.g., `ProjectCard.tsx`, `function ProjectCard(...)`).
-   **Props:** Define component props using TypeScript interfaces. Ensure clarity and provide default values where appropriate.
-   **State Management:** [TODO: Define guidelines for local vs. global state within components if needed].

## 4. Tailwind CSS Usage

-   **Utility-First:** Prioritize applying utility classes directly in JSX for styling.
-   **`@apply`:** Use `@apply` sparingly, primarily for extracting highly repeated combinations of utilities into a single class within CSS files (like `globals.css`), not for component-specific styles.
-   **Responsive Design:** Use Tailwind's breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) for responsive adjustments. Design mobile-first where practical.
-   **Performance/Purging:** Tailwind is configured in `tailwind.config.ts` to scan relevant project files (`pages`, `components`, `app`, `src`) to remove unused styles in production builds.
-   **Plugins:** `tailwindcss-animate` is included via `src/lib/shadcn-preset.ts` for animations.

## 5. Shadcn UI Integration

-   **Customization:**
    -   Prefer customizing components by overriding the base CSS variables in `src/app/globals.css`.
    -   For one-off adjustments, apply Tailwind utility classes directly to the component instance in JSX.
    -   Avoid using `!important` unless absolutely necessary and document the reason.
-   **Composition:** Build complex UI elements by combining multiple Shadcn components (e.g., using `Card`, `CardHeader`, `CardContent`).

## 6. Accessibility (A11y)

-   Leverage the built-in accessibility features of Shadcn UI components (keyboard navigation, ARIA attributes).
-   **Guidelines:**
    -   Ensure sufficient color contrast.
    -   Provide meaningful `alt` text for images.
    -   Use semantic HTML elements.
    -   Manage focus appropriately in interactive components.
    -   [TODO: Add specific testing procedures or tools, e.g., Axe DevTools].

## 7. Documentation Standards

-   **JSDoc:** Use JSDoc comments for all functions, classes, modules, and component props as specified in `docs/CONTRIBUTING.md` (or link to relevant section).
    ```typescript
    /**
     * Renders a project card.
     * @param project - The project data to display.
     * @param className - Optional additional CSS classes.
     */
    function ProjectCard({ project, className }: ProjectCardProps) {
      // ...
    }
    ```
-   **Component Examples:** [TODO: Consider setting up Storybook or Styleguidist for interactive component documentation and examples].

## 8. Code Quality & Formatting

-   **Linting:** Use ESLint (configuration likely in `eslint.config.mjs`) to enforce code style and catch potential errors.
-   **Formatting:** Use Prettier for automatic code formatting. Ensure `prettier-plugin-tailwindcss` is configured to automatically sort Tailwind classes for consistency.
-   **File Structure:** Follow the existing project structure (`src/app`, `src/components`, `src/lib`, `src/config`, `src/types`).

## 9. Version Control

-   [TODO: Define commit message conventions if needed, e.g., Conventional Commits].
-   [TODO: Outline branching strategy if not already defined].
