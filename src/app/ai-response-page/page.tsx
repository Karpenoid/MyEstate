import { Metadata } from "next";

import { ResponseBox } from "@/features/ResponseBox";

export const metadata: Metadata = {
  title: "AI Response Page",
  description: "AI Response Page",
};

export default function AIresponsePage() {
  return (
    <div className="mt-2 w-full">
      <ResponseBox />
    </div>
  );
}
