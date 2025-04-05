# JT's Portfolio Website

This repository contains the source code for my personal portfolio website, built to showcase my projects, skills, and experience.

**Creator:** [JT (jut147)](https://github.com/jut147)

<!-- Optional: Add a link to the live demo once available -->
<!-- [Live Demo](https://your-portfolio-url.com) -->

<!-- Optional: Add a screenshot or GIF here -->
<!-- ![Portfolio Screenshot](./path/to/screenshot.png) -->

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) 15 (App Router)
*   **UI Library:** [React](https://react.dev/) 19
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
*   **Backend/DB:** [Supabase](https://supabase.io/) (Project data, Contact form via Server Action)
*   **Testing:** [Playwright](https://playwright.dev/) (E2E)
*   **Linting/Formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
*   **Deployment/Analytics:** [Vercel](https://vercel.com/)

## Features

*   Responsive design using Tailwind CSS.
*   Homepage (`/`) with hero section and project overview.
*   About Page (`/about`) with sections for bio, skills, experience (placeholder content).
*   Projects List Page (`/projects`) displaying project cards fetched from Supabase.
*   Dynamic Project Detail Pages (`/projects/[slug]`) fetching and rendering individual project data (including text/image content sections) from Supabase.
*   Contact Page (`/contact`) with a form using `react-hook-form`, `zod` for validation, and a Next.js Server Action for submission handling.
*   Light/Dark mode theme toggle using `next-themes`.
*   Placeholder Privacy Policy (`/privacy`) and Terms of Service (`/terms`) pages.

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

*   Node.js (Version specified in `.nvmrc` or latest LTS recommended)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/jut147/portfolio-website.git
    cd portfolio-website
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

### Environment Variables

This project uses Supabase for fetching project data and potentially handling the contact form submission via a Server Action. You'll need to set up your environment variables.

1.  Create a `.env.local` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
2.  Obtain your Supabase Project URL and Anon Key from your Supabase project settings.
3.  Fill in the values in your `.env.local` file:
    ```dotenv
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
    NEXT_PUBLIC_SUPABASE_URL=https://your_project_id.supabase.co
    ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
# yarn dev
# or
# pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The page will auto-update as you make edits.

## Testing

*   **End-to-End Tests:** Run Playwright tests:
    ```bash
    npx playwright test
    ```
*   **Unit/Integration Tests:** Run Jest tests (Setup might be required based on project goals):
    ```bash
    npm test
    # or
    # yarn test
    ```

## Deployment

This application is typically deployed using platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Connect your Git repository to the platform for automatic deployments on push/merge. Ensure environment variables are configured in the deployment platform's settings.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## Code of Conduct

Please adhere to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
