"use client";
import { memo, useCallback } from "react";

import { type Marker } from "@googlemaps/markerclusterer";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { ApiEstate } from "@/shared/types/types";

export const MemoizedMarker = memo(
  ({
    estate,
    isHovered,
    onHover,
    onUnhover,
    onClick,
    setMarkerRef,
  }: {
    estate: ApiEstate;
    isHovered: boolean;
    onHover: (id: string) => void;
    onUnhover: () => void;
    onClick: (id: string) => void;
    setMarkerRef: (marker: Marker | null, key: string) => void;
  }) => {
    const handleRef = useCallback(
      (node: unknown) => {
        setMarkerRef(node as Marker | null, estate.id);
      },
      [setMarkerRef, estate.id],
    );

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
        ref={handleRef}
      >
        <div
          className="group relative cursor-pointer pb-2 transition-transform duration-300 hover:scale-110 active:scale-95"
          onMouseEnter={() => onHover(estate.id)}
          onMouseLeave={onUnhover}
          onClick={() => onClick(estate.id)}
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

MemoizedMarker.displayName = "MemoizedMarker";
