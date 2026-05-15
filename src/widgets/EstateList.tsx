import EstateBox from "@/features/EstateBox";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const EstateList = () => {
  return (
    <ScrollArea className="border-border/50 bg-background/40 mx-auto h-[365px] w-full rounded-[24px] border shadow-sm backdrop-blur-md md:h-[525px]">
      <div className="flex flex-col gap-4 p-2">
        <EstateBox
          id=""
          photo="/house.jpg"
          homeStatus="FOR SALE"
          price="$700000"
          state="NY"
          city="Brooklyn"
          street="220 77th St"
          beds={3}
          baths={2}
          area={1700}
        />
        <EstateBox
          id=""
          photo="/house.jpg"
          homeStatus="FOR SALE"
          price="$700000"
          state="NY"
          city="Brooklyn"
          street="220 77th St"
          beds={3}
          baths={2}
          area={1700}
        />
        <EstateBox
          id=""
          photo="/house.jpg"
          homeStatus="FOR SALE"
          price="$700000"
          state="NY"
          city="Brooklyn"
          street="220 77th St"
          beds={3}
          baths={2}
          area={1700}
        />
      </div>
    </ScrollArea>
  );
};
