# Application Flow Documentation (`APP_FLOW.md`)

This document outlines the primary user flows and data interactions within the portfolio website.

## Overall Structure

The website utilizes Next.js 15 with the App Router. The general page layout consists of:

*   **Global Header:** Contains navigation links (Home, About, Projects, Contact) and the Theme Toggle button. Persists across all pages.
*   **Page Content:** The main content area specific to the current route, rendered by Server Components or Client Components.
*   **Global Footer:** Contains links to supplementary pages like Privacy Policy and Terms of Service. Persists across all pages.

Routing is handled by the Next.js App Router, mapping URL paths (e.g., `/about`) to corresponding page components within the `src/app/` directory.

## User Flows

### 1. Viewing Projects

This flow describes how a user discovers and views project details.

1.  **Land on Home (`/`):** User arrives at the main landing page.
2.  **Navigate to Projects List (`/projects`):** User clicks the "Projects" link in the header.
3.  **View Projects List:** The `/projects` page displays a grid or list of project cards.
4.  **Click a Project Card:** User clicks on a specific project card to learn more.
5.  **View Project Detail (`/projects/[slug]`):** User is navigated to the project's dedicated detail page, displaying comprehensive information about that project.

*   *Diagram Opportunity:* A sequence diagram could illustrate the navigation steps from Home to Project Detail.

### 2. Learning About You

This flow describes how a user navigates to the About page.

1.  **Land on Any Page:** User is currently on any page of the website (e.g., Home, Projects).
2.  **Navigate to About (`/about`):** User clicks the "About" link in the header.
3.  **View About Page:** The `/about` page is displayed, containing information about the portfolio owner.

### 3. Contacting You

This flow describes how a user sends a message via the contact form.

1.  **Land on Any Page:** User is currently on any page of the website.
2.  **Navigate to Contact (`/contact`):** User clicks the "Contact" link in the header.
3.  **View Contact Page:** The `/contact` page is displayed, featuring the contact form.
4.  **Fill Form:** User enters their name, email, and message into the form fields.
5.  **Submit Form:** User clicks the "Submit" button.
6.  **View Feedback:** The user sees an inline success message (e.g., "Message sent successfully!") or an error message (e.g., "Failed to send message. Please try again.") displayed near the form.

*   *Diagram Opportunity:* A sequence diagram could show the interaction between the client (form submission), Server Action, and potential Supabase interaction, ending with the feedback message.

### 4. Changing Theme

This flow describes how a user toggles between light and dark modes.

1.  **Land on Any Page:** User is currently on any page of the website.
2.  **Click Theme Toggle:** User clicks the theme toggle button (e.g., sun/moon icon) located in the header.
3.  **UI Updates:** The website's theme instantly changes (e.g., from light to dark or vice-versa). The toggle button's icon might also update to reflect the new state. This change persists across page navigations and browser sessions.

## Data Flow

### 1. Project Data

*   **Source:** Project details (title, description, images, technologies, slug, etc.) are stored in a Supabase database table.
*   **Fetching:** When a user requests `/projects` or `/projects/[slug]`, the corresponding Next.js Server Component directly queries the Supabase database using `supabaseClient`.
*   **Rendering:**
    *   For `/projects`, the fetched list of projects is mapped and rendered as project cards (potentially within a Client Component receiving the data as props).
    *   For `/projects/[slug]`, the specific project data is fetched and rendered on the page, potentially passed as props to Client Components for interactive elements.
*   **Flow:** Supabase -> Server Component (data fetch) -> Rendered HTML / Props to Client Component -> User's Browser.

*   *Diagram Opportunity:* A data flow diagram could show Supabase DB -> Next.js Server -> Browser.

### 2. Contact Form Data

*   **Source:** User input in the contact form fields (name, email, message) on the `/contact` page (Client Component).
*   **Submission:** Upon form submission, a Next.js Server Action (`src/app/contact/actions.ts`) is invoked directly from the client-side form.
*   **Processing:** The Server Action receives the form data. It performs validation and potentially interacts with Supabase to save the message.
*   **Feedback:** The Server Action returns a success or error status/message back to the client.
*   **UI Update:** The client-side form component receives the feedback from the Server Action and displays the appropriate success or error message to the user.
*   **Flow:** User Input (Client) -> Server Action (Server) -> [Optional: Supabase Save] -> Feedback (Server) -> UI Update (Client).

*   *Diagram Opportunity:* A sequence diagram illustrating Client -> Server Action -> Supabase -> Server Action -> Client feedback loop.

### 3. Theme State

*   **Source:** User interaction with the Theme Toggle button (Client Component).
*   **Mechanism:** The `next-themes` library is used for theme management.
*   **Action:** Clicking the toggle button triggers a function provided by `next-themes`.
*   **State Management:** `next-themes` updates the theme state, typically by:
    *   Adding/removing a class (e.g., `dark`) to the `<html>` element.
    *   Persisting the user's preference in `localStorage`.
*   **UI Update:** CSS rules targeting the theme class (e.g., `.dark .bg-background`) apply the appropriate styles, instantly changing the appearance.
*   **Flow:** User Click (Client) -> `next-themes` Library (Client) -> `localStorage` Update & `<html>` Class Toggle (Client) -> CSS Application & UI Update (Client).