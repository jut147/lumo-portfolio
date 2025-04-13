export default function AboutPage() {
  return (
    // Use direct padding and max-width, significantly increased vertical padding
    <div className="px-4 lg:px-8 py-32 md:py-48 max-w-screen-2xl mx-auto"> {/* Further Increased py */}
      <h1 className="mb-12 md:mb-16 text-center text-4xl font-bold">What We Do</h1> {/* Further Increased mb */}
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center"> 
      We help brands build and grow through a full suite of creative and technical services. From websites to full-scale apps, motion graphics to marketing — we design experiences that move.
      </p>

      {/* Services Section */}
      <section className="mt-16 md:mt-24 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Services</h2>
              {/* Changed grid to flex for centering */}
              <div className="flex flex-col items-center text-center">
                {/* Category 1 */}
                <div className="w-full max-w-xs"> {/* Added width constraint for the list container */}
                  <h3 className="text-xl font-medium mb-4">Here Are Just a Few</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Web Design</li>
                    <li>UI/UX Design</li>
                    <li>App Development</li>
                    <li>SEO</li>
                    <li>Paid Advertising</li>
                    <li>Video Production</li>
                    <li>Branding</li>
                    <li>Animation</li>
                    <li>Custom Sales & Marketing Tools</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="mt-16 md:mt-24 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Category 1 */}
                <div>
                  <h3 className="text-xl font-medium mb-4">Design & Media</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Figma</li>
                    <li>Adobe Creative Cloud</li>
                    <li>DaVinci Resolve</li>
                    <li>Figma</li>
                  </ul>
                </div>
                {/* Category 2 */}
                <div>
                  <h3 className="text-xl font-medium mb-4">Development</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Bubble.io</li>
                    <li>Webflow</li>
                    <li>Node.js</li>
                    <li>React & Next.js</li>
                    <li>HTML5 & CSS3</li>
                    <li>Supabase</li>
                    <li>Tailwind CSS</li>
                    <li>REST APIs</li>
                  </ul>
                </div>
                {/* Category 3 */}
                <div>
                  <h3 className="text-xl font-medium mb-4">Strategy & Automation</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Custom marketing tools</li>
                    <li>CRM integrations</li>
                    <li>Sales Pipeline Automation</li>
                    <li>Zapier</li>
                  </ul>
                </div>
              </div>
            </section>

      {/* Notable Highlights Section */}
      <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Notable Highlights</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground max-w-3xl mx-auto">
          <li>Helped launch <strong>Respired.io</strong>, ranked Top 3 Product of the Day on Product Hunt</li>
          <li>Increased site traffic by <strong>4,000%</strong> through SEO and content strategy</li>
          <li>Developed the platform for <strong>Deck</strong>, a digital tool for boat maintenance and brokerage</li>
          <li>Produced content and campaigns for major brands including <strong>Verizon</strong>, <strong>Toyota</strong>, <strong>NFL</strong>, <strong>MLB</strong>, <strong>NBA</strong>, <strong>NHL</strong>, <strong>MLS</strong>, and <strong>hundreds of Hollywood productions</strong></li>
        </ul>
      </section>

      {/* Experience Section (Optional) - Hidden */}
      {false && (
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
      )}

      {/* Add more sections, maybe use shadcn components */}
    </div>
  );
}
