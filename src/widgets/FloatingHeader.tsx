"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GoogleLogin } from "@/features/GoogleLogin";

export const FloatingHeader = () => {
  const pathname = usePathname();
  const isHistoryActive = pathname === "/ai-response-page";

  return (
    <header className="sticky top-0 z-50 mb-2 w-full bg-transparent">
      <div className="border-border/60 bg-background/70 mx-auto flex w-full flex-wrap items-center gap-4 rounded-3xl border px-6 py-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all md:flex-nowrap md:px-8">
        <h1 className="order-1 mr-auto shrink-0">
          <Link
            className="font-inter from-foreground to-muted-foreground text-foreground bg-gradient-to-br bg-clip-text text-2xl font-semibold tracking-tighter"
            href="/"
          >
            MyEstate
          </Link>
        </h1>

        <div className="order-3 flex w-full justify-center md:order-2 md:block md:w-auto">
          <Link
            className={`font-inter text-sm font-semibold transition-colors duration-200 ${
              isHistoryActive ? "text-feature" : "text-foreground/60 hover:text-foreground/75"
            }`}
            href="/ai-response-page"
          >
            Response History
          </Link>
        </div>
        <div className="order-2 shrink-0 md:order-3">
          <GoogleLogin />
        </div>
      </div>
    </header>
  );
};
