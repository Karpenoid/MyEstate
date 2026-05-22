"use client";
import { SearchBar } from "@/features/SearchBar";
import { useEstateStore } from "@/shared/store/EstateStore";
import { Input } from "@/shared/ui/input";

export const FilterBar = () => {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice, minArea, setMinArea, maxArea, setMaxArea } =
    useEstateStore();

  return (
    <div className="flex w-full justify-center bg-transparent">
      <div className="font-inter bg-background/70 flex w-[92%] max-w-[320px] flex-col gap-2 rounded-[20px] border p-2 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all sm:max-w-md md:w-auto md:max-w-none md:flex-row md:items-center md:gap-3 md:rounded-full md:px-5 md:py-1.5">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto md:gap-4">
          <div className="flex w-full items-center justify-between gap-1.5 sm:w-auto sm:justify-start">
            <span className="font-inter text-muted-foreground min-w-[42px] text-[14px] font-medium sm:min-w-0 sm:text-xs">
              Price $
            </span>
            <div className="flex flex-1 items-center gap-1 sm:flex-none">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border-border/50 bg-background/40 focus-visible:ring-feature/50 h-[30px] flex-1 rounded-full px-2.5 text-[11px] focus-visible:ring-1 sm:h-8 sm:w-28 sm:flex-none sm:text-xs"
              />
              <span className="text-muted-foreground text-[10px] sm:text-xs">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border-border/50 bg-background/40 focus-visible:ring-feature/50 h-[30px] flex-1 rounded-full px-2.5 text-[11px] focus-visible:ring-1 sm:h-8 sm:w-28 sm:flex-none sm:text-xs"
              />
            </div>
          </div>
          <div className="bg-border/50 hidden h-4 w-[1px] sm:block"></div>
          <div className="flex w-full items-center justify-between gap-1.5 sm:w-auto sm:justify-start">
            <span className="font-inter text-muted-foreground min-w-[42px] text-[14px] font-medium sm:min-w-0 sm:text-xs">
              Sqft
            </span>
            <div className="flex flex-1 items-center gap-1 sm:flex-none">
              <Input
                type="number"
                placeholder="Min"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                className="border-border/50 bg-background/40 focus-visible:ring-feature/50 h-[30px] flex-1 rounded-full px-2.5 text-[11px] focus-visible:ring-1 sm:h-8 sm:w-20 sm:flex-none sm:text-xs"
              />
              <span className="text-muted-foreground text-[10px] sm:text-xs">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
                className="border-border/50 bg-background/40 focus-visible:ring-feature/50 h-[30px] flex-1 rounded-full px-2.5 text-[11px] focus-visible:ring-1 sm:h-8 sm:w-20 sm:flex-none sm:text-xs"
              />
            </div>
          </div>
        </div>
        <div className="bg-border/50 hidden h-6 w-[1px] md:block"></div>
        <div className="w-full md:w-64 lg:w-72">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};
