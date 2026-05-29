"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { MarkerClusterer, type Marker } from "@googlemaps/markerclusterer";
import { useMap } from "@vis.gl/react-google-maps";

import { MemoizedMarker } from "@/features/MemoizedMarker";
import { ApiEstate } from "@/shared/types/types";

export const ClusteredMarker = ({
  estates,
  hoveredMarkerId,
  onHover,
  onUnhover,
  onClick,
  clusterClassName,
}: {
  estates: ApiEstate[];
  hoveredMarkerId: string | null;
  onHover: (id: string) => void;
  onUnhover: () => void;
  onClick: (id: string) => void;
  clusterClassName?: string;
}) => {
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const map = useMap();

  const clusterer = useMemo(() => {
    if (!map) return null;

    const renderer = {
      render: ({ count, position }: { count: number; position: google.maps.LatLng }) => {
        const element = document.createElement("div");

        element.className =
          clusterClassName ||
          "flex items-center justify-center rounded-full text-sm font-bold text-white bg-blue-500 shadow-md";
        element.innerText = String(count);

        if (google.maps.marker?.AdvancedMarkerElement) {
          return new google.maps.marker.AdvancedMarkerElement({
            position,
            content: element,
            zIndex: 100,
          });
        } else {
          return new google.maps.Marker({
            position,
            label: { text: String(count), color: "white" },
            zIndex: 100,
          });
        }
      },
    };

    return new MarkerClusterer({ map, renderer });
  }, [map, clusterClassName]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((prevMarkers) => {
      if ((marker && prevMarkers[key]) || (!marker && !prevMarkers[key])) {
        return prevMarkers;
      }

      if (marker) {
        return { ...prevMarkers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = prevMarkers;
        return newMarkers;
      }
    });
  }, []);

  return (
    <>
      {estates.map((estate) => (
        <MemoizedMarker
          key={estate.id}
          estate={estate}
          isHovered={hoveredMarkerId === estate.id}
          onHover={onHover}
          onUnhover={onUnhover}
          onClick={onClick}
          setMarkerRef={setMarkerRef}
        />
      ))}
    </>
  );
};
