import { EstateInfo } from "@/features/EstateInfo";
import { EstateList } from "@/widgets/EstateList";
import { EstateMap } from "@/widgets/EstateMap";
import { FilterBar } from "@/widgets/FilterBar";
import { FloatingHeader } from "@/widgets/FloatingHeader";

export default function Home() {
  return (
    <div className="bg-background min-h-screen py-3 transition-colors duration-500 md:py-3">
      <div className="mx-auto w-full max-w-full px-4 md:px-6">
        <FloatingHeader />
        <main className="">
          <FilterBar />
          <div className="mt-4 flex w-full flex-col items-start gap-4 lg:flex-row">
            <div className="w-full flex-1 lg:top-24">
              <EstateMap />
            </div>
            <div className="w-full shrink-0 lg:w-105 xl:w-[610px]">
              <EstateList />
            </div>
          </div>
          <EstateInfo />
        </main>
      </div>
    </div>
  );
}
