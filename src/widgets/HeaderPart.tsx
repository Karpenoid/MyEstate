import { SearchBar } from "@/features/SearchBar";

export const HeaderPart = () => {
  return (
    <header className="flex w-full flex-col items-center justify-between gap-4 rounded-3xl border border-white/40 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-md transition-all md:flex-row md:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-balance text-slate-800 antialiased dark:text-slate-100">
        MyEstate
      </h1>
      <div className="w-full md:w-auto md:min-w-[320px]">
        <SearchBar />
      </div>
    </header>
  );
};
