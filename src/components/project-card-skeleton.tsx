import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function ProjectCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="p-0">
        {/* Skeleton for the image */}
        <Skeleton className="h-48 w-full" />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        {/* Skeleton for the title */}
        <Skeleton className="h-5 w-3/4 mb-2" />
        {/* Skeleton for the description */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {/* Skeleton for the badge */}
        <Skeleton className="h-5 w-1/4" />
      </CardFooter>
    </Card>
  );
}
