# JT's Portfolio Website

This repository contains the source code for my personal portfolio website, built to showcase my projects, skills, and experience.

**Creator:** [JT (jut147)](https://github.com/jut147)

<!-- Optional: Add a link to the live demo once available -->
<!-- [Live Demo](https://your-portfolio-url.com) -->

<!-- Optional: Add a screenshot or GIF here -->
<!-- ![Portfolio Screenshot](./path/to/screenshot.png) -->

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
*   **Backend/DB (Optional):** [Supabase](https://supabase.io/) (Used for contact form or other features)
*   **Testing:** [Playwright](https://playwright.dev/) (E2E)
*   **Linting:** [ESLint](https://eslint.org/)
*   **Deployment/Analytics:** [Vercel](https://vercel.com/)

(See [docs/TECH_STACK.md](docs/TECH_STACK.md) for more details and versions)
## Features

*   Responsive design across devices
*   Homepage (`/`) showcasing featured projects
*   Projects list page (`/projects`)
*   Individual project detail page (`/projects/[slug]`)
*   About Me page (`/about`)
*   Contact Form (`/contact`) integrated with Supabase
*   Terms of Service page (`/terms`)
*   Privacy Policy page (`/privacy`)
*   Light/Dark mode theme toggle

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

This project uses Supabase for certain features. You'll need to set up your environment variables.

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

Start the development server (uses Turbopack):

```bash
npm run dev
# or yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The page will auto-update as you make edits.

### Building for Production

```bash
npm run build
```

### Running the Production Build Locally

```bash
npm run start
```

## Testing

*   **End-to-End Tests:** Run Playwright tests using the defined script:
    ```bash
    npm run test:e2e
    ```
## Deployment

This application is typically deployed using platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Connect your Git repository to the platform for automatic deployments on push/merge. Ensure environment variables are configured in the deployment platform's settings.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## Code of Conduct

Please adhere to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
