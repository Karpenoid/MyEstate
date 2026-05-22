"use client";
import { useEffect } from "react";

import EstateBox from "@/features/EstateBox";
import { useEstateStore } from "@/shared/store/EstateStore";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const EstateList = () => {
  const {
    estates,
    isLoading,
    fetchEstatesAction,
    searchQuery,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
  } = useEstateStore();

  useEffect(() => {
    fetchEstatesAction();
  }, []);

  const filteredEstates = estates.filter((estate) => {
    const locationString = `${estate.address.city}, ${estate.address.state}`.toLowerCase();
    const matchesSearch = locationString.includes(searchQuery.toLowerCase());

    const numericPrice = Number(estate.price.replace(/[^0-9.-]+/g, ""));
    const matchesMinPrice = minPrice ? numericPrice >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? numericPrice <= Number(maxPrice) : true;
    const matchesMinArea = minArea ? estate.area >= Number(minArea) : true;
    const matchesMaxArea = maxArea ? estate.area <= Number(maxArea) : true;

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesMinArea && matchesMaxArea;
  });

  return (
    <ScrollArea className="border-border/50 bg-background/40 mx-auto h-[365px] w-full rounded-[24px] border shadow-sm backdrop-blur-md md:h-auto md:max-h-[525px] [&>[data-radix-scroll-area-viewport]]:max-h-[525px]">
      <div className="flex flex-col gap-4 p-2">
        {isLoading ? (
          <div className="text-muted-foreground font-inter flex h-40 items-center justify-center text-sm">
            Loading estates...
          </div>
        ) : filteredEstates.length === 0 ? (
          <div className="text-muted-foreground font-inter flex h-40 items-center justify-center text-sm">
            No estates found.
          </div>
        ) : (
          filteredEstates.map((estate) => (
            <EstateBox
              key={estate.id}
              id={estate.id}
              photo={estate.imgSrc}
              homeStatus={estate.homeStatus?.replace("_", " ") || "UNKNOWN"}
              price={estate.price}
              state={estate.address.state}
              city={estate.address.city}
              street={estate.address.street}
              beds={estate.beds}
              baths={estate.baths}
              area={estate.area}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};
