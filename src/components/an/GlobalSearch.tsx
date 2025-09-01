import {  X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "../icons/SearchIcon";
interface GlobalSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}
export function GlobalSearch({
  searchValue,
  onSearchChange,
  placeholder = "Search for name or number",
  
}: GlobalSearchProps) {
  const handleClear = () => {
    onSearchChange("");
  };
  return (
    <div className="relative w-64    text-xs">
      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 ">
        <SearchIcon className="size-3 2xl:size-3 3xl:!size-3  ml-3   " />
      </span>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8 pr-3 !h-7 border border-gray-300  rounded text-lg-t 2xl:text-xs 3xl:!text-sm w-64  focus:ring-2 placeholder:text-(--an-card-search-color)  focus:ring-teal-500 focus:border-teal-500"
        
      />
      {searchValue && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 hover:bg-gray-100"
        >
          <X className="w-4 h-4 text-gray-400" />
        </Button>
      )}
    </div>
  );
}
