"use client";
import { useEffect, useState } from "react";

import EstateBox from "@/features/EstateBox";
import { fetchEstates } from "@/shared/api/getEstates";
import { ApiEstate } from "@/shared/types/types";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const EstateList = () => {
  const [estates, setEstates] = useState<ApiEstate[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const loadEstates = async () => {
      try {
        const data = await fetchEstates();
        const results = Array.isArray(data) ? data : data?.results || [];
        setEstates(results);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoader(false);
      }
    };
    loadEstates();
  }, []);

  return (
    <ScrollArea className="border-border/50 bg-background/40 mx-auto h-[365px] w-full rounded-[24px] border shadow-sm backdrop-blur-md md:h-[525px]">
      <div className="flex flex-col gap-4 p-2">
        {loader ? (
          <div className="text-muted-foreground font-inter flex h-40 items-center justify-center text-sm">
            Loading estates...
          </div>
        ) : estates.length === 0 ? (
          <div className="text-muted-foreground font-inter flex h-40 items-center justify-center text-sm">
            No estates found.
          </div>
        ) : (
          estates.map((estate) => (
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
