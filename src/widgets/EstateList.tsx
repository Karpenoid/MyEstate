"use client";
import { useEffect } from "react";

import EstateBox from "@/features/EstateBox";
import { useEstateStore } from "@/shared/store/EstateStore";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const EstateList = () => {
  const { estates, isLoading, fetchEstatesAction, searchQuery } = useEstateStore();

  useEffect(() => {
    fetchEstatesAction();
  }, []);

  const filteredEstates = estates.filter((estate) => {
    const locationString = `${estate.address.city}, ${estate.address.state}`.toLowerCase();
    return locationString.includes(searchQuery.toLowerCase());
  });

  return (
    <ScrollArea className="border-border/50 bg-background/40 mx-auto h-[365px] w-full rounded-[24px] border shadow-sm backdrop-blur-md md:h-[525px]">
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
