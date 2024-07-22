import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const SearchInput = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={cn("flex search-input-container", className)}>
        <Input
          type="search"
          placeholder="Qu'est-ce que vous recherchez aujourd'hui?"
          className="search-input"
        />
        <Button className="search-button" type="submit">
          Rechercher
        </Button>
      </div>
    </>
  );
};

export default SearchInput;
