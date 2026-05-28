import { Metadata } from "next";

import { NYInfo } from "@/widgets/NYInfo";

export const metadata: Metadata = {
  title: "AI Response history page",
  description: "AI Response history page",
};

export default function AIresponsePage() {
  return (
    <div className="mt-2 w-full">
      <NYInfo />
    </div>
  );
}
