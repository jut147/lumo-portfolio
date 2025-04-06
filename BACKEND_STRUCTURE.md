# Backend Structure

## Overview

This document outlines the backend architecture for the portfolio website. The backend leverages a combination of:

*   **Next.js 15 (App Router):** Acting as the server framework, handling server-side rendering (SSR) via Server Components and processing form submissions/mutations via Server Actions.
*   **Supabase:** A Backend-as-a-Service (BaaS) platform providing the PostgreSQL database, authentication services, and Row Level Security (RLS) for data protection.

## Supabase Setup

*   **Connection:** The Next.js application connects to the Supabase project using credentials stored securely in environment variables (`.env.local`).
*   **Client Initialization:** A Supabase client instance is initialized for interacting with Supabase services. This initialization logic resides in:
    ```typescript
    // src/lib/supabaseClient.ts
    import { createClient } from '@supabase/supabase-js'

    // Ensure these variables are defined in your .env.local file
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    // Create a single supabase client for interacting with your database
    export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    ```
    *Note: The use of `NEXT_PUBLIC_` prefixes makes these variables accessible in the browser environment, which is required by the Supabase JS client library, even when primarily used server-side in this project.*

## Database Schema

The core data is stored in a Supabase PostgreSQL database.

*   **`projects` Table:** Stores details about portfolio projects.
    *   `id`: `uuid` (Primary Key, default: `gen_random_uuid()`)
    *   `slug`: `text` (Unique identifier for URL, indexed)
    *   `title`: `text`
    *   `description`: `text`
    *   `thumbnail_url`: `text` (URL to project thumbnail image)
    *   `live_url`: `text` (URL to live project demo, optional)
    *   `repo_url`: `text` (URL to project repository, optional)
    *   `tags`: `text[]` (Array of relevant tags/technologies)
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `content_sections`: `jsonb` (Stores structured content for the project page)
        *   **JSONB Structure Example:**
            ```json
            [
              { "type": "text", "content": "Detailed description paragraph about the project features and development process." },
              { "type": "image", "src": "/images/project-screenshot.png", "alt": "Screenshot showing the main interface" },
              { "type": "text", "content": "Another paragraph explaining technical challenges or key learnings." }
            ]
            ```

*   **`contact_submissions` Table (Potential):** Intended for storing messages submitted via the contact form. If implemented, the structure would likely be:
    *   `id`: `uuid` (Primary Key, default: `gen_random_uuid()`)
    *   `name`: `text`
    *   `email`: `text`
    *   `message`: `text`
    *   `submitted_at`: `timestamp with time zone` (default: `now()`)

## Row Level Security (RLS)

RLS is utilized within Supabase to enforce data access policies directly at the database level, ensuring data security and integrity.

*   **Purpose:** Restricts which rows users or services can access or modify based on defined policies, preventing unauthorized data exposure or manipulation.
*   **`projects` Table Policy:**
    *   **Public Read Access:** Enabled to allow all users (anonymous or authenticated) to view project details. This is essential for displaying the portfolio publicly.
        ```sql
        -- Example RLS Policy for Public Read Access
        CREATE POLICY "Allow public read access to projects"
        ON public.projectclayton
        FOR SELECT
        USING (true);
        ```
    *   **Admin Write Access:** Restricted so that only authenticated users designated as administrators can create, update, or delete projects. The specific mechanism for identifying admins (e.g., custom claims, separate roles table) is yet to be finalized or should be documented separately.
        ```sql
        -- Example RLS Policy for Admin Write Access (Conceptual)
        -- Assumes a function `is_admin(auth.uid())` exists or similar check.
        CREATE POLICY "Allow admin write access to projects"
        ON public.projectclayton
        FOR ALL -- Covers INSERT, UPDATE, DELETE
        USING (auth.role() = 'authenticated' AND is_admin(auth.uid()))
        WITH CHECK (auth.role() = 'authenticated' AND is_admin(auth.uid()));
        ```
*   **`contact_submissions` Table Policy (If Implemented):**
    *   RLS **must** be enabled if this table is created.
    *   A policy should permit `INSERT` operations for any user (anonymous or authenticated) submitting the form.
    *   Policies should strictly restrict `SELECT`, `UPDATE`, and `DELETE` operations to administrators only, protecting user privacy.

## Data Access Patterns

*   **Server Components & Data Fetching Functions:** Data fetching, particularly for read operations like retrieving project lists or details, is primarily handled by dedicated functions within `src/lib/data.ts`. These functions (`getProjects`, `getProjectBySlug`, etc.) encapsulate the logic for interacting with Supabase using `supabaseClient` and perform runtime data validation using Zod schemas defined alongside the functions (based on types in `src/types/project.ts`). Server Components then call these functions to retrieve the validated data.
    ```typescript
    // Example: Using data fetching function in a Server Component
    // (e.g., src/app/projects/[slug]/page.tsx)
    import { getProjectBySlug } from '@/lib/data'; // Import the fetching function
    import { notFound } from 'next/navigation';

    async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
      // Call the dedicated function to get validated data
      const project = await getProjectBySlug(params.slug);

      if (!project) {
        notFound(); // Use Next.js notFound utility if project isn't found or validation fails
      }

      // Render project details using the validated 'project' data
      return (
        <div>
          <h1>{project.title_client}</h1> {/* Use validated fields */}
          {/* ... rest of the component */}
        </div>
      );
    }
    ```
*   **`src/lib/supabaseClient.ts`:** This module centralizes the Supabase client instance creation, promoting consistency and maintainability.

## Server Actions

*   **Purpose:** Used for handling mutations (data changes) initiated from the client-side, such as form submissions.
*   **Contact Form Flow (`src/app/contact/actions.ts`):**
    1.  User fills and submits the contact form in the browser.
    2.  The form submission invokes a Server Action defined in `src/app/contact/actions.ts`.
    3.  The Server Action function executes exclusively on the server.
    4.  It receives and validates the form data (e.g., using Zod).
    5.  It attempts to process the data. **Note:** As of the last review, the actual submission logic (e.g., saving to a database like `contact_submissions` or sending an email) is currently a placeholder within the action function.
    6.  It returns a status (success or error) back to the client-side form for user feedback. Due to the placeholder logic, a successful validation currently returns a simulated success message.
*   **Security:** Server Actions provide a robust security model. Database credentials and sensitive logic remain on the server, preventing exposure to the client. Input validation within the action is crucial.

## Environment Variables

*   **`.env.local`:** This file stores environment-specific configuration and sensitive credentials. **It must be included in `.gitignore`** to prevent accidental commits.
*   **Supabase Credentials:**
    *   `NEXT_PUBLIC_SUPABASE_URL`: The unique URL for your Supabase project.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public 'anonymous' key for your Supabase project. This key allows client-side access according to your RLS policies.
*   **`NEXT_PUBLIC_` Prefix:** Variables prefixed with `NEXT_PUBLIC_` are embedded into the client-side JavaScript bundle by Next.js. This is necessary for the Supabase JS library. Any truly secret keys (like a Supabase `SERVICE_ROLE_KEY`, if used for bypassing RLS in specific server-side admin tasks) should **not** have this prefix and should only be accessed server-side via `process.env`.