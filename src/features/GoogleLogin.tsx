"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

export function GoogleLogin() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-8 w-[140px] rounded-md" />;
  }

  return session ? (
    <Button onClick={() => signOut()} variant="outline" className="font-inter w-full">
      Log out ({session.user?.name})
    </Button>
  ) : (
    <Button onClick={() => signIn("google")} variant="outline" className="font-inter w-full">
      Log in with Google
    </Button>
  );
}
