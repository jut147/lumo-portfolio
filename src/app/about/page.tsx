import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Megaphone, Palette, Rocket } from "lucide-react"; // Example icons

// Define capabilities data structure (can be moved to lib/data.ts later)
const capabilities = [
  {
    title: "Design & Branding",
    icon: Palette,
    items: ["Web Design", "UI/UX Design", "Branding", "Animation"],
  },
  {
    title: "Web & App Development",
    icon: Code,
    items: [
      "React & Next.js",
      "App Development", // Assuming this means mobile/web apps
      "Bubble.io",
      "Webflow",
      "Node.js",
      "HTML5 & CSS3",
      "Supabase",
      "Tailwind CSS",
      "REST APIs",
    ],
  },
  {
    title: "Strategy & Growth",
    icon: Rocket,
    items: [
      "SEO",
      "Paid Advertising",
      "Custom Sales & Marketing Tools",
      "CRM integrations",
      "Sales Pipeline Automation",
      "Zapier",
    ],
  },
   {
    title: "Media Production",
    icon: Megaphone, // Changed icon
    items: ["Video Production", "Adobe Creative Cloud", "DaVinci Resolve", "Figma"], // Grouped media tools here
  },
];

export default function AboutPage() {
  return (
    // Consistent padding and max-width
    <div className="px-4 lg:px-8 py-24 md:py-32 max-w-screen-xl mx-auto"> {/* Adjusted padding/max-width slightly */}
      {/* Section 1: What We Do */}
      <section className="mb-16 md:mb-24 text-center">
        <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight">What We Do</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We help brands build and grow through a full suite of creative and
          technical services. From websites to full-scale apps, motion graphics
          to marketing — we design experiences that move.
        </p>
      </section>
      {/* Section 2: Capabilities (Replaces Services & Skills) */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10 md:mb-12 text-center tracking-tight">
          Our Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"> {/* Adjusted grid columns */}
          {capabilities.map((capability) => (
            <Card key={capability.title} className="flex flex-col transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 pb-4">
                <capability.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl md:text-2xl">{capability.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
                <div className="flex flex-wrap gap-2">
                  {capability.items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Section 3: Notable Highlights */}
      <section>
        <h2 className="text-3xl md:text-4xl font-semibold mb-10 md:mb-12 text-center tracking-tight">
          Notable Highlights
        </h2>
        {/* Using slightly different card style for highlights for visual distinction */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="flex items-start space-x-4 p-5 rounded-lg border bg-card/50"> {/* Adjusted padding/bg */}
            <span className="text-xl mt-1 text-primary">🏆</span>
            <p className="text-muted-foreground">
              Helped launch <strong>Respired.io</strong>, ranked Top 3 Product
              of the Day on Product Hunt
            </p>
          </div>
          <div className="flex items-start space-x-4 p-5 rounded-lg border bg-card/50">
             <span className="text-xl mt-1 text-primary">📈</span>
            <p className="text-muted-foreground">
              Increased site traffic by <strong>4,000%</strong> through SEO and
              content strategy
            </p>
          </div>
          <div className="flex items-start space-x-4 p-5 rounded-lg border bg-card/50">
             <span className="text-xl mt-1 text-primary">⛵</span>
            <p className="text-muted-foreground">
              Developed the platform for <strong>Deck</strong>, a digital tool
              for boat maintenance and brokerage
            </p>
          </div>
          <div className="flex items-start space-x-4 p-5 rounded-lg border bg-card/50">
             <span className="text-xl mt-1 text-primary">🎬</span>
            <p className="text-muted-foreground">
              Produced content and campaigns for major brands including{" "}
              <strong>Verizon</strong>, <strong>Toyota</strong>,{" "}
              <strong>NFL</strong>, <strong>MLB</strong>, <strong>NBA</strong>,{" "}
              <strong>NHL</strong>, <strong>MLS</strong>, and{" "}
              <strong>hundreds of Hollywood productions</strong>
            </p>
          </div>
        </div>
      </section>
      {/* Experience Section remains hidden */}
      {false && (
        <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            Experience
          </h2>
          <div className="space-y-6 border-l-2 border-border pl-6">
            {/* Experience Item 1 */}
            <div>
              <h3 className="text-xl font-medium">
                Placeholder Job Title - Placeholder Company
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Date Range (e.g., Jan 2022 - Present)
              </p>
              <p className="text-muted-foreground">
                Description of responsibilities and achievements in this role.
              </p>
            </div>
            {/* Experience Item 2 */}
            <div>
              <h3 className="text-xl font-medium">
                Placeholder Job Title - Placeholder Company
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Date Range (e.g., Jun 2020 - Dec 2021)
              </p>
              <p className="text-muted-foreground">
                Description of responsibilities and achievements in this role.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
