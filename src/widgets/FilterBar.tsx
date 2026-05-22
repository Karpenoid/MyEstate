"use client";
import { SearchBar } from "@/features/SearchBar";
import { useEstateStore } from "@/shared/store/EstateStore";
import { Input } from "@/shared/ui/input";

export const FilterBar = () => {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice, minArea, setMinArea, maxArea, setMaxArea } =
    useEstateStore();

  return (
    <div className="flex w-full justify-center bg-transparent">
      <div className="font-inter bg-background/70 flex w-[96%] max-w-[360px] flex-col gap-2 rounded-[20px] border p-2 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all sm:max-w-md md:w-auto md:max-w-none md:flex-row md:items-center md:gap-3 md:rounded-full md:px-5 md:py-1.5">
        <div className="flex w-full flex-row items-center justify-between gap-1 sm:w-auto sm:justify-start md:gap-4">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="font-inter text-muted-foreground text-[12px] font-medium sm:text-xs">
              Price $
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border-border/50 bg-background/40 focus-visible:ring-feature/50 h-[28px] w-[54px] rounded-full px-2 text-[10px] focus-visible:ring-1 sm:h-8 sm:w-28 sm:px-2.5 sm:text-xs"
              />
              <span className="text-muted-foreground text-[10px] sm:text-xs">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border-border/50 bg-background/40 focus-visible:ring-feature/50 h-[28px] w-[54px] rounded-full px-2 text-[10px] focus-visible:ring-1 sm:h-8 sm:w-28 sm:px-2.5 sm:text-xs"
              />
            </div>
          </div>
          <div className="bg-border/50 hidden h-4 w-[1px] sm:block"></div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="font-inter text-muted-foreground text-[12px] font-medium sm:text-xs">
              Sqft
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Input
                type="number"
                placeholder="Min"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                className="border-border/50 bg-background/40 focus-visible:ring-feature/50 h-[28px] w-[54px] rounded-full px-2 text-[10px] focus-visible:ring-1 sm:h-8 sm:w-20 sm:px-2.5 sm:text-xs"
              />
              <span className="text-muted-foreground text-[10px] sm:text-xs">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
                className="border-border/50 bg-background/40 focus-visible:ring-feature/50 h-[28px] w-[54px] rounded-full px-2 text-[10px] focus-visible:ring-1 sm:h-8 sm:w-20 sm:px-2.5 sm:text-xs"
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
