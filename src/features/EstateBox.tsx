import { FC } from "react";

import Image from "next/image";

import { EstateProperties } from "@/shared/types/types";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

const EstateBox: FC<EstateProperties> = ({
  id,
  photo,
  homeStatus,
  state,
  city,
  street,
  beds,
  baths,
  area,
  price,
}) => {
  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-[24px] border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row dark:border-slate-800 dark:bg-slate-900/50">
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48">
        <Image
          src={photo}
          alt="Estate Image"
          fill
          sizes="(max-width: 640px) 100vw, 192px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className="font-inter border border-white/40 bg-white/20 font-semibold text-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] backdrop-blur-md backdrop-saturate-150 dark:border-white/10 dark:bg-black/20"
          >
            {id} {homeStatus}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 pb-2 sm:p-5 sm:pb-3">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-inter text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {price}
              </h3>
              <Badge variant="outline" className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {state}, {city}, {street}
              </Badge>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-purple-50 font-medium text-purple-700 dark:bg-purple-950 dark:text-purple-300"
            >
              Beds: {beds}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-blue-50 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            >
              Baths: {baths}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-green-50 font-medium text-green-700 dark:bg-green-950 dark:text-green-300"
            >
              {area} sqft
            </Badge>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end border-t border-slate-100 pt-1 dark:border-slate-800">
          <Button
            variant="ghost"
            className="font-inter text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/50"
          >
            More info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstateBox;
