"use client";
import { useState } from "react";

import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

import { useEstateStore } from "@/shared/store/EstateStore";

export const EstateMap = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
  const { estates, searchQuery } = useEstateStore();
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);

  const filteredEstates = estates.filter((estate) => {
    const locationString = `${estate.address.city}, ${estate.address.state}`.toLowerCase();
    return locationString.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full">
      <div className="border-border/60 bg-background relative h-[240px] w-full overflow-hidden rounded-[24px] border shadow-sm transition-all duration-500 hover:shadow-lg md:h-[525px] md:rounded-[32px]">
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={{ lat: 40.7128, lng: -73.9 }}
            defaultZoom={10}
            gestureHandling="greedy"
            disableDefaultUI={true}
            mapId="DEMO_MAP_ID"
            style={{ width: "100%", height: "100%" }}
          >
            {filteredEstates.map((estate) => {
              if (!estate.latLong?.latitude || !estate.latLong?.longitude) return null;
              const isHovered = hoveredMarkerId === estate.id;

              return (
                <AdvancedMarker
                  key={estate.id}
                  position={{
                    lat: estate.latLong.latitude,
                    lng: estate.latLong.longitude,
                  }}
                  title={estate.price}
                  zIndex={isHovered ? 50 : 1}
                >
                  <div
                    className="group relative cursor-pointer pb-2 transition-transform duration-300 hover:scale-110 active:scale-95"
                    onMouseEnter={() => setHoveredMarkerId(estate.id)}
                    onMouseLeave={() => setHoveredMarkerId(null)}
                  >
                    <div className="border-border/50 bg-background/10 text-foreground hover:border-primary/50 hover:bg-background/20 flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap shadow-lg backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 md:px-2.5 md:py-1">
                      {estate.price}
                    </div>
                    <div className="border-border/50 bg-feature hover:border-primary/50 absolute bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-r border-b shadow-inner backdrop-blur-sm backdrop-saturate-150 transition-colors duration-300"></div>
                  </div>
                </AdvancedMarker>
              );
            })}
          </Map>
        </APIProvider>
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:rounded-[32px]"></div>
      </div>
    </div>
  );
};
