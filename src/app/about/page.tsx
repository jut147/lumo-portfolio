export default function AboutPage() {
  return (
    // Removed max-w and mx-auto, kept padding
    <div className="pt-20 pb-16">
      <h1 className="mb-8 md:mb-12 text-center text-4xl font-bold">About Me</h1> {/* Standardized mb */}
      {/* Constrain text width */}
      <p className="text-lg text-muted-foreground max-w-prose mx-auto text-center">
        Information about skills, experience, and background will go here.
      </p>
      {/* Add more sections, maybe use shadcn components */}
    </div>
  );
}
