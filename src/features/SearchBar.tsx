"use client";
import { useEstateStore } from "@/shared/store/EstateStore";
import { Input } from "@/shared/ui/input";

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useEstateStore();

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        className="font-inter"
        placeholder="Search estate..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
