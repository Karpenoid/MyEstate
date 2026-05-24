import { Metadata } from "next";

import { EstateInfo } from "@/features/EstateInfo";
import { EstateList } from "@/widgets/EstateList";
import { EstateMap } from "@/widgets/EstateMap";
import { FilterBar } from "@/widgets/FilterBar";
import { GeminiChat } from "@/widgets/GeminiChat";

export const metadata: Metadata = {
  title: "Main page",
};

export default function Home() {
  return (
    <div className="w-full">
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
      <GeminiChat />
    </div>
  );
}
