import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";

interface FilterSearchProps<T> extends InputProps {
  table: Table<T>;
}

const FilterSearch = <T,>({ table, ...props }: FilterSearchProps<T>) => {
  return (
    <div className="flex flex-1 items-center py-4 gap-1">
      <Input
        {...props}
        value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("nom")?.setFilterValue(event.target.value)
        }
        className="max-w-sm w-full"
      />
      <Button>
        <RiSearch2Line className="block sm:hidden" size={20} />
        <p className="hidden sm:block text-base">Rechercher</p>
      </Button>
    </div>
  );
};

export default FilterSearch;
