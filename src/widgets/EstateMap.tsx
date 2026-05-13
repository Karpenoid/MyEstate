"use client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export const EstateMap = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-0">
      <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] md:h-[525px] md:rounded-[32px] dark:border-slate-800 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={{ lat: 40.7128, lng: -73.9 }}
            defaultZoom={10}
            gestureHandling="greedy"
            disableDefaultUI={true}
            style={{ width: "100%", height: "100%" }}
          />
        </APIProvider>
        <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"></div>
      </div>
    </div>
  );
};
