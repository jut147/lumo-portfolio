export default function AboutPage() {
  return (
    // Use direct padding and max-width, significantly increased vertical padding
    <div className="px-4 lg:px-8 pt-20 pb-16 max-w-screen-2xl mx-auto"> {/* Further Increased py */}
      <h1 className="mb-12 md:mb-16 text-center text-4xl font-bold">About Me</h1> {/* Further Increased mb */}
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
        Information about skills, experience, and background will go here.
      </p>
      {/* Add more sections, maybe use shadcn components */}
    </div>
  );
}
