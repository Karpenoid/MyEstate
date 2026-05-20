"use client";
import { useState, memo, useCallback } from "react";

import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

import { useEstateStore } from "@/shared/store/EstateStore";
import { ApiEstate } from "@/shared/types/types";

const MemoizedEstateMarker = memo(
  ({
    estate,
    isHovered,
    onHover,
    onUnhover,
  }: {
    estate: ApiEstate;
    isHovered: boolean;
    onHover: (id: string) => void;
    onUnhover: () => void;
  }) => {
    if (!estate.latLong?.latitude || !estate.latLong?.longitude) return null;

    return (
      <AdvancedMarker
        position={{
          lat: estate.latLong.latitude,
          lng: estate.latLong.longitude,
        }}
        title={estate.price}
        collisionBehavior="REQUIRED_AND_HIDES_OPTIONAL"
        zIndex={isHovered ? 50 : 1}
      >
        <div
          className="group relative cursor-pointer pb-2 transition-transform duration-300 hover:scale-110 active:scale-95"
          onMouseEnter={() => onHover(estate.id)}
          onMouseLeave={onUnhover}
        >
          <div className="border-border/50 bg-background/10 text-foreground hover:border-primary/50 hover:bg-background/20 flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap shadow-lg backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 md:px-2.5 md:py-1">
            {estate.price}
          </div>
          <div className="border-border/50 bg-feature hover:border-primary/50 absolute bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-r border-b shadow-inner backdrop-blur-sm backdrop-saturate-150 transition-colors duration-300"></div>
        </div>
      </AdvancedMarker>
    );
  },
);

MemoizedEstateMarker.displayName = "MemoizedEstateMarker";

export const EstateMap = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
  const { estates, searchQuery } = useEstateStore();
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);

  const filteredEstates = estates.filter((estate) => {
    const locationString = `${estate.address.city}, ${estate.address.state}`.toLowerCase();
    return locationString.includes(searchQuery.toLowerCase());
  });

  //
  // useMapsLibrary loads the geocoding library, it might initially return `null`
  // if the library hasn't been loaded. Once loaded, it will return the library
  // object as it would be returned by `await google.maps.importLibrary()`
  // const geocodingLib = useMapsLibrary("geocoding");
  // const geocoder = useMemo(() => geocodingLib && new geocodingLib.Geocoder(), [geocodingLib]);
  //
  // useEffect(() => {
  //   if (!geocoder) return;
  //
  //   // now you can use `geocoder.geocode(...)` here
  //   geocoder.geocode({ address: "Flushing, 36-11" }, (val) => console.log("geocoder:", val));
  // }, [geocoder]);

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
            {filteredEstates.map((estate) => (
              <MemoizedEstateMarker
                key={estate.id}
                estate={estate}
                isHovered={hoveredMarkerId === estate.id}
                onHover={handleHover}
                onUnhover={handleUnhover}
              />
            ))}
          </Map>
        </APIProvider>
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:rounded-[32px]"></div>
      </div>
    </div>
  );
};
