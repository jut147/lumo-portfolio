import { ProjectDetailSkeleton } from "@/components/project-detail-skeleton";

export default function ProjectDetailLoading() {
  // The main layout (header, footer, global max-width) comes from layout.tsx
  // This component only needs to render the skeleton for the page content area
  return <ProjectDetailSkeleton />;
}
