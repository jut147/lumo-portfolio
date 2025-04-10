import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailSkeleton() {
  return (
    // Match page padding
    <div className="pt-20 pb-16">

      {/* --- Top Section Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">

        {/* --- Left Column (Main Content) --- */}
        <div className="lg:col-span-2 space-y-12 max-w-prose">

          {/* Title & Description Group */}
          <div>
            {/* Title Skeleton */}
            <Skeleton className="h-10 w-3/4 mb-4" />
            {/* Description Skeleton */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Narrative Section 1 Skeleton */}
          <div>
            <Skeleton className="h-8 w-1/2 mb-4" /> {/* Heading */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Narrative Section 2 Skeleton */}
          <div>
            <Skeleton className="h-8 w-1/2 mb-4" /> {/* Heading */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div> {/* --- End Left Column --- */}

        {/* --- Right Column (Key Info Panel) --- */}
        <div className="lg:col-span-1">
          {/* Mimic sticky panel style */}
          <div className="sticky top-24 bg-muted/50 dark:bg-neutral-900/50 p-6 rounded-lg border border-border space-y-4 text-sm">
             <Skeleton className="h-6 w-1/3 mb-4" /> {/* Panel Title */}
             {/* Info Item Skeletons */}
             <div className="space-y-3">
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-3/4" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-1/2" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-4/5" />
             </div>
          </div>
        </div> {/* --- End Right Column --- */}

      </div> {/* --- End Top Section Grid --- */}

      {/* --- Gallery Section Skeleton --- */}
      <div className="my-16">
        <Skeleton className="h-8 w-1/4 mx-auto mb-8" /> {/* Heading */}
        {/* Simple grid placeholder for gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg md:rounded-xl" />
          ))}
        </div>
      </div>

      {/* --- CTA Section Skeleton --- */}
      <div className="text-center mt-16">
        <Skeleton className="h-8 w-1/2 mx-auto mb-6" /> {/* Heading */}
        <Skeleton className="h-10 w-32 mx-auto" /> {/* Button */}
      </div>

    </div>
  );
}
