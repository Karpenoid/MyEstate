"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sparkles } from "lucide-react";

import { GoogleLogin } from "@/features/GoogleLogin";
import { useEstateStore } from "@/shared/store/EstateStore";
import { Button } from "@/shared/ui/button";

export const FloatingHeader = () => {
  const pathname = usePathname();

  const { gemWindow } = useEstateStore();

  const options = [
    { href: "/ny-info-page", label: "NY Info" },
    { href: "/avg-district-page", label: "District Prices" },
  ];

  return (
    <header className="font-inter sticky top-0 z-50 mb-2 w-full bg-transparent">
      <div className="border-border/60 bg-background/70 mx-auto flex w-full flex-wrap items-center gap-4 rounded-3xl border px-6 py-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all md:flex-nowrap md:px-8">
        <h1 className="order-1 mr-auto shrink-0">
          <Link
            className="font-inter from-foreground to-muted-foreground text-foreground bg-gradient-to-br bg-clip-text text-2xl font-semibold tracking-tighter"
            href="/"
          >
            MyEstate
          </Link>
        </h1>

        <div className="order-3 flex w-full items-center justify-center gap-6 md:order-2 md:w-auto">
          {options.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`font-inter text-sm font-semibold transition-colors duration-200 ${
                  isActive ? "text-feature" : "text-foreground/60 hover:text-foreground/75"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <Button
            onClick={gemWindow}
            className="group bg-feature/10 text-feature hover:bg-feature/20 active:bg-feature/35 flex items-center rounded-full px-2.5 text-sm font-semibold transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Gem
            <Sparkles
              className="text-feature transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              size={16}
            />
          </Button>
        </div>
        <div className="order-2 shrink-0 md:order-3">
          <GoogleLogin />
        </div>
      </div>
    </header>
  );
};
