"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/shared/ui/button";

export function GoogleLogin() {
  const { data: session } = useSession();

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
