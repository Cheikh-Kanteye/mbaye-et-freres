import IconButton from "./IconButton";
import ProductBar from "./ProductBar";
import SearchInput from "./SearchInput";
import { RiSearch2Line, RiShoppingCart2Line } from "react-icons/ri";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  return (
    <header
      style={{ zIndex: 1000 }}
      className="sticky top-0 left-0 w-full bg-background shadow-sm"
    >
      <div className="bg-primary p-2">
        <div className="container-fb">
          <Link href="/" className="w-fit logo-container">
            <span className="logo-section-1">Mbaye &</span>
            <span className="p-1">Frères</span>
          </Link>

          <div className="gap-3 flex justify-end items-center">
            <SearchInput className="hidden w-fit md:flex" />
            <div className="block md:hidden">
              <Popover>
                <PopoverTrigger>
                  <div className="flex items-center justify-center p-2 rounded-full focus:outline-none transition bg-primary-foreground">
                    <RiSearch2Line />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-screen" style={{ zIndex: 10001 }}>
                  <SearchInput className="w-full shadow-primary mx-auto border border-primary-foreground" />
                </PopoverContent>
              </Popover>
            </div>
            <IconButton
              icon={RiShoppingCart2Line}
              className="text-foreground bg-primary-foreground"
            />
          </div>
        </div>
      </div>
      <ProductBar />
    </header>
  );
};

export default Header;
