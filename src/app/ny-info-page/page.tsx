import { Metadata } from "next";

import { ErrorBoundary } from "@/features/ErrorBoundery";
import { NYInfo } from "@/widgets/NYInfo";

export const metadata: Metadata = {
  title: "NY Estate",
  description: "AI NY estate market analysis",
};

export default function NYInfoPage() {
  return (
    <div className="mt-2 w-full">
      <ErrorBoundary>
        <NYInfo />
      </ErrorBoundary>
    </div>
  );
}
