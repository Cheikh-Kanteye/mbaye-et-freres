import IconButton from "./IconButton";
import ProductBar from "./ProductBar";
import SearchInput from "./SearchInput";
import { RiSearch2Line, RiShoppingCart2Line } from "react-icons/ri";
import { Input } from "./ui/input";

const Header = () => {
  return (
    <header className="w-full bg-background shadow-sm">
      <div className="bg-primary p-2">
        <div className="container-fb">
          <div className="flex-1">
            <a href="/" className="w-fit logo-container">
              <span className="logo-section-1">Mbaye &</span>
              <span className="p-1">Frères</span>
            </a>
          </div>

          <SearchInput />
          <div className="flex-1 gap-3 flex justify-end">
            <div className="flex md:hidden search-input-container">
              <Input
                type="search"
                placeholder="Qu'est-ce que vous recherchez aujourd'hui?"
                className="hidden sm:block search-input"
              />
              <IconButton
                icon={RiSearch2Line}
                className="bg-primary-foreground"
              />
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
