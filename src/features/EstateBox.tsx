import { FC } from "react";

import Image from "next/image";

import { useEstateStore } from "@/shared/store/EstateStore";
import { EstateProps } from "@/shared/types/types";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

const EstateBox: FC<EstateProps> = ({
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
  const info = [
    {
      id: "beds",
      label: "Beds",
      value: beds,
      className: "bg-info/10 font-medium text-info-foreground",
    },
    {
      id: "baths",
      label: "Baths",
      value: baths,
      className: "bg-feature/10 font-medium text-feature-foreground",
    },
    {
      id: "area",
      label: null,
      value: `${area} sqft`,
      className: "bg-success/10 font-medium text-success-foreground",
    },
  ];

  const { openModal } = useEstateStore();

  return (
    <div className="group border-border/60 bg-card text-card-foreground flex w-full flex-col overflow-hidden rounded-[24px] border shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row">
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
            className="font-inter bg-background/40 text-foreground border border-white/30 font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.05)] backdrop-blur-md backdrop-saturate-150"
          >
            {homeStatus}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 pb-2 sm:p-5 sm:pb-3">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-inter text-foreground text-2xl font-bold tracking-tight">
                {price}
              </h3>
              <Badge
                variant="outline"
                className="font-inter border-border/50 text-muted-foreground mt-1 text-sm"
              >
                {state}, {city}, {street}
              </Badge>
            </div>
          </div>

          <div className="font-inter mt-2 flex flex-wrap gap-2">
            {info.map(({ id, label, value, className }) => (
              <Badge key={id} variant="secondary" className={`font-medium ${className}`}>
                {label ? `${label}: ${value}` : value}
              </Badge>
            ))}
          </div>
        </div>

        <div className="border-border/50 mt-2 flex items-center justify-end border-t pt-1">
          <Button
            variant="ghost"
            onClick={() => openModal(id)}
            className="font-inter text-feature-foreground hover:bg-feature/10 hover:text-feature-foreground cursor-pointer"
          >
            More info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstateBox;
