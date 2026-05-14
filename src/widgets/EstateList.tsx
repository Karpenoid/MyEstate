import EstateBox from "@/features/EstateBox";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const EstateList = () => {
  return (
    <ScrollArea className="mx-auto h-[255px] w-full rounded-[24px] border border-slate-200/60 bg-white/40 shadow-sm backdrop-blur-md md:h-[525px] dark:border-slate-800/50 dark:bg-slate-900/40">
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
