import { Badge } from "@/components/ui/badge"; // Added Badge import

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
              {/* Replaced list with Badges */}
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Web Design</Badge>
                <Badge variant="secondary">UI/UX Design</Badge>
                <Badge variant="secondary">App Development</Badge>
                <Badge variant="secondary">SEO</Badge>
                <Badge variant="secondary">Paid Advertising</Badge>
                <Badge variant="secondary">Video Production</Badge>
                <Badge variant="secondary">Branding</Badge>
                <Badge variant="secondary">Animation</Badge>
                <Badge variant="secondary">Custom Sales & Marketing Tools</Badge>
              </div>
            </section>

            {/* Skills Section */}
            <section className="mt-16 md:mt-24 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Category 1 */}
                <div>
                  <h3 className="text-xl font-medium mb-4 text-center md:text-left">Design & Media</h3>
                  {/* Replaced list with Badges */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline">Figma</Badge>
                    <Badge variant="outline">Adobe Creative Cloud</Badge>
                    <Badge variant="outline">DaVinci Resolve</Badge>
                  </div>
                </div>
                {/* Category 2 */}
                <div>
                  <h3 className="text-xl font-medium mb-4 text-center md:text-left">Development</h3>
                   {/* Replaced list with Badges */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline">Bubble.io</Badge>
                    <Badge variant="outline">Webflow</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">React & Next.js</Badge>
                    <Badge variant="outline">HTML5 & CSS3</Badge>
                    <Badge variant="outline">Supabase</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                    <Badge variant="outline">REST APIs</Badge>
                  </div>
                </div>
                {/* Category 3 */}
                <div>
                  <h3 className="text-xl font-medium mb-4 text-center md:text-left">Strategy & Automation</h3>
                   {/* Replaced list with Badges */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline">Custom marketing tools</Badge>
                    <Badge variant="outline">CRM integrations</Badge>
                    <Badge variant="outline">Sales Pipeline Automation</Badge>
                    <Badge variant="outline">Zapier</Badge>
                  </div>
                </div>
              </div>
            </section>

      {/* Notable Highlights Section - Redesigned */}
      <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Notable Highlights</h2>
        <div className="space-y-6"> {/* Increased spacing */}
          <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card text-card-foreground"> {/* Added container styling */}
            <span className="text-xl mt-1">🏆</span> {/* Example Icon */}
            <p className="text-muted-foreground">Helped launch <strong>Respired.io</strong>, ranked Top 3 Product of the Day on Product Hunt</p>
          </div>
          <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card text-card-foreground">
            <span className="text-xl mt-1">📈</span> {/* Example Icon */}
            <p className="text-muted-foreground">Increased site traffic by <strong>4,000%</strong> through SEO and content strategy</p>
          </div>
          <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card text-card-foreground">
            <span className="text-xl mt-1">⛵</span> {/* Example Icon */}
            <p className="text-muted-foreground">Developed the platform for <strong>Deck</strong>, a digital tool for boat maintenance and brokerage</p>
          </div>
          <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card text-card-foreground">
            <span className="text-xl mt-1">🎬</span> {/* Example Icon */}
            <p className="text-muted-foreground">Produced content and campaigns for major brands including <strong>Verizon</strong>, <strong>Toyota</strong>, <strong>NFL</strong>, <strong>MLB</strong>, <strong>NBA</strong>, <strong>NHL</strong>, <strong>MLS</strong>, and <strong>hundreds of Hollywood productions</strong></p>
          </div>
        </div>
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
