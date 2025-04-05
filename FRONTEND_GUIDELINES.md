# Frontend Development Guidelines

This document outlines the guidelines and best practices for frontend development in the portfolio website project. Adhering to these guidelines ensures consistency, maintainability, and quality across the codebase.

**Tech Stack:**

*   **Framework:** Next.js 15 (App Router)
*   **UI Library:** React 19
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS v4, `shadcn/ui`
*   **Animation:** Framer Motion
*   **Theming:** `next-themes`

## 1. Component Structure

### 1.1. File Naming Conventions

*   Component files should use **PascalCase** (e.g., `UserProfile.tsx`).
*   Non-component files (hooks, utilities) should use **kebab-case** or **camelCase** (e.g., `use-auth.ts`, `formatDate.ts`).
*   Place components within the `src/components` directory, organized into subdirectories (e.g., `ui`, `common`, feature-specific) as needed.

### 1.2. Component Definition

*   Prefer **Functional Components** with Hooks over class components.
*   Use arrow functions for component definitions for consistency.

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      {/* ... */}
    </div>
  );
};

export default MyComponent;
```

### 1.3. Style Colocation

*   Apply styles directly within JSX using **Tailwind CSS utility classes**.
*   Avoid creating separate CSS/SCSS modules unless absolutely necessary for complex, non-utility styles.
*   Global styles are defined in `src/app/globals.css`. Limit additions to this file.

```typescript
const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
      {...props}
    />
  );
};
```

### 1.4. Server vs. Client Components

*   **Default to Server Components:** Components are Server Components by default in the App Router. Use them for fetching data, accessing backend resources, and keeping sensitive logic off the client.
*   **Use Client Components (`"use client"`) sparingly:** Only add the `"use client"` directive when the component *requires* browser-specific APIs, state, lifecycle effects (`useState`, `useEffect`, `useReducer`), or event listeners.
*   Keep Client Components as small as possible ("leaf" components) and import Server Components into them if needed, rather than making large parts of the tree client-side unnecessarily.

### 1.5. Props Handling

*   Define props using **TypeScript interfaces or types**. Place complex or shared types in `src/types`.
*   Use **destructuring** to extract props within the component function signature.
*   Provide default values for optional props where applicable.

```typescript
interface UserCardProps {
  userId: string;
  name: string;
  avatarUrl?: string; // Optional prop
  isActive: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  userId,
  name,
  avatarUrl = '/default-avatar.png', // Default value
  isActive,
}) => {
  // ... component logic
};
```

## 2. TypeScript Usage

*   **Strict Mode:** The project enforces TypeScript's `strict` mode. Ensure all type-checking rules are satisfied.
*   **Type Definitions:** Define clear and specific types/interfaces for component props, state, API responses, and other data structures. Store shared types in `src/types`.
*   **Utility Types:** Leverage TypeScript's built-in utility types (`Partial`, `Required`, `Pick`, `Omit`, `Readonly`, etc.) to create new types based on existing ones efficiently.
*   **Avoid `any`:** Minimize the use of `any`. If type information is unavailable or complex, prefer `unknown` and perform type checks, or define a more specific type. Use `// @ts-ignore` only as a last resort with a clear explanation.

## 3. Styling (Tailwind CSS & shadcn/ui)

### 3.1. Utility-First Approach

*   Prioritize using **Tailwind utility classes** directly in JSX for styling.
*   Avoid writing custom CSS classes in `globals.css` unless defining base styles, CSS variables, or complex styles not achievable with utilities.

### 3.2. Theme Customization

*   Customize Tailwind's default theme (colors, fonts, spacing, breakpoints) within `tailwind.config.ts`.
*   Reference theme values using Tailwind's `theme()` function in CSS if needed, but prefer configuring variants and utilities in the config file.

### 3.3. `shadcn/ui` Components

*   Leverage `shadcn/ui` components for common UI patterns (Buttons, Cards, Forms, Dialogs, etc.). They are built with Tailwind and Radix UI, ensuring accessibility and composability.
*   Customize `shadcn/ui` components primarily via **props**.
*   If deeper customization is needed, modify the component's source code directly (located in `src/components/ui`) as they are copied into the project. Be mindful of updates if you modify them significantly.

### 3.4. Responsive Design

*   Implement responsive design using Tailwind's **breakpoint modifiers** (e.g., `md:`, `lg:`).
*   Design mobile-first where practical.

```typescript
<div className="w-full p-4 md:w-1/2 md:p-6 lg:w-1/3 lg:p-8">
  {/* Content */}
</div>
```

### 3.5. Theming

*   Theming (light/dark mode) is handled by `next-themes` and integrated with Tailwind's `darkMode: 'class'` strategy.
*   Use Tailwind's `dark:` variant to apply styles specifically for dark mode.
*   Use CSS variables defined in `globals.css` (often managed by `shadcn/ui` setup) for theme colors and ensure they are updated correctly by `next-themes`.

```typescript
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  {/* Themed content */}
</div>
```

## 4. State Management

*   **Local State:** Prefer `useState` and `useReducer` for managing state that is local to a single component or its immediate children.
*   **React Context API:** Use React Context for state that needs to be shared across multiple, potentially distant components (e.g., theme, user authentication status).
    *   `next-themes` already provides a context for theme management.
    *   Create specific, well-scoped contexts rather than one large global context.
    *   Avoid using Context for high-frequency updates, as it can cause performance issues due to re-renders. Consider dedicated state management libraries (like Zustand, Jotai) *only* if Context becomes insufficient or performance bottlenecks arise.

## 5. Accessibility (A11y)

*   **Semantic HTML:** Use appropriate HTML5 elements (`<nav>`, `<main>`, `<article>`, `<aside>`, `<button>`, etc.) to convey structure and meaning.
*   **`shadcn/ui`:** Rely on the built-in accessibility features of `shadcn/ui` components by using them correctly according to their documentation.
*   **ARIA Attributes:** Add ARIA (Accessible Rich Internet Applications) attributes (`role`, `aria-label`, `aria-hidden`, etc.) to custom components or complex UI elements when semantic HTML is insufficient to provide necessary context for assistive technologies.
*   **Keyboard Navigation:** Ensure all interactive elements are focusable and operable via keyboard. Maintain a logical focus order.
*   **Focus Management:** Manage focus explicitly in dynamic interfaces (e.g., modals, drawers) to ensure a smooth user experience for keyboard and screen reader users.

## 6. Performance

*   **Memoization:** Use `React.memo`, `useMemo`, and `useCallback` judiciously to optimize performance by preventing unnecessary re-renders or expensive calculations. Profile components first to identify actual bottlenecks; avoid premature optimization.
*   **Code Splitting:** Next.js handles automatic code splitting per page/route. Be mindful of large component imports that might unnecessarily increase bundle sizes. Consider dynamic imports (`next/dynamic`) for large components not needed on initial load.
*   **Images:** Use the `next/image` component for automatic image optimization (resizing, format conversion, lazy loading). Provide appropriate `width`, `height`, and `alt` props.
*   **Bundle Analysis:** Periodically analyze the application bundle size using tools like `@next/bundle-analyzer` to identify and address potential bloat.

## 7. Code Formatting & Linting

*   **ESLint & Prettier:** The project is configured with ESLint for code quality and Prettier for code formatting.
*   **Adherence:** Ensure code adheres to the configured rules. Run `npm run lint` and `npm run format` (or integrate with your editor) regularly.
*   **Configuration:** Rules are defined in `eslint.config.mjs` and Prettier configuration files. Do not override rules locally without team discussion.