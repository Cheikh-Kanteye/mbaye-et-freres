import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import IconButton from "./IconButton";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";

const SearchInput = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={cn("flex search-input-container pr-1", className)}>
        <Input
          type="search"
          placeholder="Rechercher un produit"
          className="search-input"
        />
        <IconButton
          icon={RiSearch2Line}
          className="bg-primary-foreground hover:!bg-primary hover:!text-background"
        />
      </div>
    </>
  );
};

export default SearchInput;
