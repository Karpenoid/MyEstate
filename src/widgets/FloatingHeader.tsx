import { SearchBar } from "@/features/SearchBar";

export const FloatingHeader = () => {
  return (
    <header className="sticky top-0 z-50 mb-4 w-full bg-transparent px-4 py-0">
      <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200/60 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-xl transition-all md:flex-row md:px-8 dark:border-slate-800 dark:bg-slate-900/60">
        <h1 className="font-inter bg-gradient-to-br from-slate-800 to-slate-500 bg-clip-text text-2xl font-semibold tracking-tighter text-transparent dark:from-slate-100 dark:to-slate-600">
          MyEstate
        </h1>
        <div className="w-full md:w-auto md:min-w-[320px]">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};
