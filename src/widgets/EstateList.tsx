"use client";
import { useEffect, useState } from "react";

import EstateBox from "@/features/EstateBox";
import { useFilteredEstates } from "@/shared/hooks/hooks";
import { useEstateStore } from "@/shared/store/EstateStore";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const EstateList = () => {
  const { isLoading, fetchEstatesAction } = useEstateStore();

  const filteredEstates = useFilteredEstates();

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEstatesAction({ page });
  }, [page]);

  return (
    <ScrollArea className="border-border/50 bg-background/40 relative mx-auto h-[365px] w-full rounded-[24px] border shadow-sm backdrop-blur-md md:h-auto md:max-h-[525px] [&>[data-radix-scroll-area-viewport]]:max-h-[525px]">
      {isLoading && (
        <div className="bg-background/50 absolute inset-0 z-50 flex items-center justify-center backdrop-blur-[2px]">
          <div className="font-inter text-muted-foreground bg-background rounded-md px-4 py-2 text-sm shadow-md">
            Loading estates...
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 p-2">
        {filteredEstates.length === 0 && !isLoading ? (
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

      {filteredEstates.length > 0 && (
        <div className="p-2">
          <Button
            className="w-full rounded-xl"
            disabled={isLoading}
            onClick={() => setPage((prevState) => prevState + 1)}
          >
            Load more
          </Button>
        </div>
      )}
    </ScrollArea>
  );
};
