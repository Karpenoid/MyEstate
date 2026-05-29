"use client";
import { useState, useCallback } from "react";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { ClusteredMarker } from "@/features/ClusteredMarker";
import { useFilteredEstates } from "@/shared/hooks/hooks";
import { useEstateStore } from "@/shared/store/EstateStore";

export const EstateMap = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
  const { openModal } = useEstateStore();
  const filteredEstates = useFilteredEstates();

  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);

  const handleClick = useCallback((id: string) => openModal(id), [openModal]);
  const handleHover = useCallback((id: string) => setHoveredMarkerId(id), []);
  const handleUnhover = useCallback(() => setHoveredMarkerId(null), []);

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
            <ClusteredMarker
              estates={filteredEstates}
              hoveredMarkerId={hoveredMarkerId}
              onHover={handleHover}
              onUnhover={handleUnhover}
              onClick={handleClick}
              clusterClassName="h-8 w-8 text-foreground border-border/50 bg-background/5 hover:border-primary/50 hover:bg-background/10 flex items-center justify-center rounded-full border px-2 py-0.5 text-sm font-semibold whitespace-nowrap shadow-lg backdrop-blur-lg backdrop-saturate-150 transition-colors duration-300 md:px-2.5 md:py-1"
            />
          </Map>
        </APIProvider>
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:rounded-[32px]"></div>
      </div>
    </div>
  );
};
