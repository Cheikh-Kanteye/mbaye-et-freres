import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import IconButton from "./IconButton";
import { RiSearch2Line } from "react-icons/ri";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const SearchInput = ({ className }: { className?: string }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Suspense fallback={<Loader size={24} />}>
      <div className={cn("flex search-input-container pr-1", className)}>
        <Input
          type="search"
          placeholder="Rechercher un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <IconButton
          icon={RiSearch2Line}
          className="bg-primary-foreground hover:!bg-primary hover:!text-background"
          onClick={handleSearch}
        />
      </div>
    </Suspense>
  );
};

export default SearchInput;
