"use client";
import Image from "next/image";

import { ExternalLink, MapPin, Sparkles } from "lucide-react";

import { useEstateStore } from "@/shared/store/EstateStore";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { DetailedInfo } from "@/widgets/DetailedInfo";

export const EstateInfo = () => {
  const { selectedEstateId, closeModal, estates, isModalOpen, aiWindow } = useEstateStore();
  const estate = estates.find((e) => e.id === selectedEstateId);

  const onOpenChange = (open: boolean) => {
    if (!open) closeModal();
  };

  if (!estate) return null;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
        <DialogContent className="font-inter border-border/60 bg-background/70 text-foreground overflow-hidden rounded-3xl border p-0 shadow-2xl backdrop-blur-xl backdrop-saturate-150 sm:max-w-md">
          <div className="relative h-64 w-full">
            {estate.imgSrc && (
              <Image
                src={estate.imgSrc}
                alt="Estate Image"
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute right-4 bottom-4 left-4 text-white">
              <h2 className="font-inter text-3xl font-bold tracking-tight">{estate.price}</h2>
              <div className="mt-1 flex items-center gap-1 text-sm font-medium text-white/80">
                <MapPin className="h-4 w-4" />
                {estate.address.street}, {estate.address.city}, {estate.address.state}{" "}
                {estate.zipcode}
              </div>
            </div>

            <Badge className="absolute top-4 left-4 border-white/30 bg-black/40 text-white backdrop-blur-md">
              {estate.homeStatus.replace("_", " ")}
            </Badge>
          </div>

          <ScrollArea className="max-h-[50vh] px-6 py-2">
            <DialogHeader>
              <DialogTitle className="sr-only">Estate Details</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed view of the selected property.
              </DialogDescription>
            </DialogHeader>
            <div className="font-inter border-border/70 flex flex-wrap items-center gap-2 border-b pb-6">
              <Badge
                variant="secondary"
                className="bg-info/10 text-info-foreground text-sm font-semibold"
              >
                🛏️ Beds: {estate.beds}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-feature/10 text-feature-foreground text-sm font-semibold"
              >
                🛁 Baths: {estate.baths}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-success/10 text-success-foreground text-sm font-semibold"
              >
                📐 {estate.area} sqft
              </Badge>
              <Button
                onClick={aiWindow}
                disabled={estates.length === 0}
                className="group bg-feature/10 text-feature hover:bg-feature/20 active:bg-feature/35 ml-auto flex items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
              >
                AI
                <Sparkles
                  className="text-feature transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                  size={16}
                />
              </Button>
            </div>
            <div className="font-inter mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {estate.homeType && (
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{estate.homeType.replace("_", " ")}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-muted-foreground">Living Area:</span>
                <span className="font-medium">{estate.area || "Unknown"} sqft</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Marketing:</span>
                <span className="font-medium">{estate.marketingStatus}</span>
              </div>
              {estate.taxAssessedValue && (
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Tax Assessed:</span>
                  <span className="font-medium">${estate.taxAssessedValue.toLocaleString()}</span>
                </div>
              )}
              {estate.zestimate && (
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Zestimate:</span>
                  <span className="font-medium">${estate.zestimate.toLocaleString()}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-muted-foreground">Days on Zillow:</span>
                <span className="font-medium">{estate.daysOnZillow}</span>
              </div>
            </div>
            <div className="mt-5 mb-2">
              <Button
                onClick={() => window.open(estate.detailUrl, "_blank", "noopener,noreferrer")}
                className="bg-feature hover:bg-feature/90 flex w-full items-center justify-center rounded-xl p-2 text-white"
              >
                View full details on Zillow <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <DetailedInfo />
    </>
  );
};
