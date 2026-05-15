"use client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export const EstateMap = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

  return (
    <div className="w-full">
      <div className="border-border/60 bg-background relative h-[240px] w-full overflow-hidden rounded-[24px] border shadow-sm transition-all duration-500 hover:shadow-lg md:h-[525px] md:rounded-[32px]">
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={{ lat: 40.7128, lng: -73.9 }}
            defaultZoom={10}
            gestureHandling="greedy"
            disableDefaultUI={true}
            style={{ width: "100%", height: "100%" }}
          />
        </APIProvider>
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:rounded-[32px]"></div>
      </div>
    </div>
  );
};
