import { SearchBar } from "@/features/SearchBar";

export const FloatingHeader = () => {
  return (
    <header className="sticky top-0 z-50 mb-4 w-full bg-transparent">
      <div className="border-border/60 bg-background/70 mx-auto flex w-full flex-col items-center justify-between gap-4 rounded-3xl border px-6 py-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all md:flex-row md:px-8">
        <h1 className="font-inter from-foreground to-muted-foreground bg-gradient-to-br bg-clip-text text-2xl font-semibold tracking-tighter text-transparent">
          MyEstate
        </h1>
        <div className="w-full md:w-auto md:min-w-[320px]">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};
