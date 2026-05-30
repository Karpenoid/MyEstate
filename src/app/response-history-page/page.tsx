import { redirect } from "next/navigation";

import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NYInfo } from "@/widgets/NYInfo";

export const metadata: Metadata = {
  title: "AI Response history page",
  description: "AI Response history page",
};

export default function ResponseHistoryPage() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/api/auth/signin/google?callbackUrl=/response-history-page");
  // }

  return (
    <div className="mt-2 w-full">
      <NYInfo />
    </div>
  );
}
