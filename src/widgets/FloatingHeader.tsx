import { GoogleLogin } from "@/features/GoogleLogin";
import { SearchBar } from "@/features/SearchBar";

export const FloatingHeader = () => {
  return (
    <header className="sticky top-0 z-50 mb-4 w-full bg-transparent">
      <div className="border-border/60 bg-background/70 mx-auto flex w-full flex-wrap items-center gap-4 rounded-3xl border px-6 py-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all md:flex-nowrap md:px-8">
        <h1 className="font-inter from-foreground to-muted-foreground text-foreground order-1 mr-auto shrink-0 bg-gradient-to-br bg-clip-text text-2xl font-semibold tracking-tighter">
          MyEstate
        </h1>
        <div className="order-3 w-full md:order-2 md:w-auto md:min-w-[320px]">
          <SearchBar />
        </div>
        <div className="order-2 shrink-0 md:order-3">
          <GoogleLogin />
        </div>
      </div>
    </header>
  );
};
