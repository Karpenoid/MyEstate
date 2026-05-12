import { Input } from "@/shared/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      <Input type="text" placeholder="Search estate..." />
    </div>
  );
};
