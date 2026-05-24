"use client";
import { useEffect } from "react";

import EstateBox from "@/features/EstateBox";
import { useFilteredEstates } from "@/shared/hooks/hooks";
import { useEstateStore } from "@/shared/store/EstateStore";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const EstateList = () => {
  const { isLoading, fetchEstatesAction } = useEstateStore();

  const filteredEstates = useFilteredEstates();

  useEffect(() => {
    fetchEstatesAction();
  }, []);

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
              area={estate.area || "Unknown"}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};
