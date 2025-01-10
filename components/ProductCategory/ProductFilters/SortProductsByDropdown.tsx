"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortProductsByDropdownProps {
  setSort: (sort: string) => void;
  sort: string;
}

const SortProductsByDropdown = ({
  setSort,
  sort,
}: SortProductsByDropdownProps) => {
  const handleSortChange = (sort: string) => {
    setSort(sort);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-1 btn bg-secondary text-background font-bold p-4 w-56 capitalize shadow-md rounded-2xl ">
        Sort By{`: ${sort}`}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background text-foreground">
        <DropdownMenuItem
          onClick={() => handleSortChange("lowest")}
          className="capitalize font-bold"
        >
          Price: Low to High
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSortChange("highest")}
          className="capitalize font-bold"
        >
          Price: High to Low
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSortChange("newest")}
          className="capitalize font-bold"
        >
          Date: Newest to Oldest
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSortChange("oldest")}
          className="capitalize font-bold"
        >
          Date: Oldest to Newest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortProductsByDropdown;
