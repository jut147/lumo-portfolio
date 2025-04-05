export default function AboutPage() {
  return (
    // Use direct padding and max-width, significantly increased vertical padding
    <div className="px-4 lg:px-8 py-32 md:py-48 max-w-screen-2xl mx-auto"> {/* Further Increased py */}
      <h1 className="mb-12 md:mb-16 text-center text-4xl font-bold">About Me</h1> {/* Further Increased mb */}
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
        Information about skills, experience, and background will go here.
      </p>

      {/* Bio Section */}
      <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">My Story</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Placeholder for the first paragraph of the biography. Talk about your journey into web development, your passions, and what drives you.
          </p>
          <p>
            Placeholder for the second paragraph. You can elaborate on specific experiences, philosophies, or goals.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mt-16 md:mt-24 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Category 1 */}
          <div>
            <h3 className="text-xl font-medium mb-4">Frontend Development</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>React & Next.js</li>
              <li>TypeScript</li>
              <li>HTML5 & CSS3</li>
              <li>Tailwind CSS</li>
              <li>JavaScript (ES6+)</li>
              <li>State Management (e.g., Zustand, Redux)</li>
            </ul>
          </div>
          {/* Category 2 */}
          <div>
            <h3 className="text-xl font-medium mb-4">Backend & Database</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Node.js</li>
              <li>Supabase</li>
              <li>PostgreSQL</li>
              <li>REST APIs</li>
              <li>Server Actions</li>
            </ul>
          </div>
          {/* Category 3 */}
          <div>
            <h3 className="text-xl font-medium mb-4">Tools & Practices</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Git & GitHub</li>
              <li>Docker</li>
              <li>Testing (Jest, Playwright)</li>
              <li>CI/CD</li>
              <li>Agile Methodologies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section (Optional) */}
      <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Experience</h2>
        <div className="space-y-6 border-l-2 border-border pl-6">
          {/* Experience Item 1 */}
          <div>
            <h3 className="text-xl font-medium">Placeholder Job Title - Placeholder Company</h3>
            <p className="text-sm text-muted-foreground mb-2">Date Range (e.g., Jan 2022 - Present)</p>
            <p className="text-muted-foreground">
              Description of responsibilities and achievements in this role.
            </p>
          </div>
          {/* Experience Item 2 */}
          <div>
            <h3 className="text-xl font-medium">Placeholder Job Title - Placeholder Company</h3>
            <p className="text-sm text-muted-foreground mb-2">Date Range (e.g., Jun 2020 - Dec 2021)</p>
            <p className="text-muted-foreground">
              Description of responsibilities and achievements in this role.
            </p>
          </div>
        </div>
      </section>

      {/* Add more sections, maybe use shadcn components */}
    </div>
  );
}
