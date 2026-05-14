import { EstateList } from "@/widgets/EstateList";
import { EstateMap } from "@/widgets/EstateMap";
import { FloatingHeader } from "@/widgets/FloatingHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 py-3 transition-colors duration-500 md:py-4 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-full px-4 md:px-6">
        <FloatingHeader />
        <main className="mt-4 flex w-full flex-col items-start gap-4 lg:flex-row">
          <div className="w-full flex-1 lg:top-24">
            <EstateMap />
          </div>
          <div className="w-full shrink-0 lg:w-[420px] xl:w-[610px]">
            <EstateList />
          </div>
        </main>
      </div>
    </div>
  );
}
