import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import IconButton from "./IconButton";
import { RiSearch2Line } from "react-icons/ri";

const SearchInput = () => {
  return (
    <div className="hidden md:flex search-input-container">
      <Input
        type="search"
        placeholder="Qu'est-ce que vous recherchez aujourd'hui?"
        className="search-input"
      />
      <Button className="search-button" type="submit">
        Rechercher
      </Button>
    </div>
  );
};

export default SearchInput;
