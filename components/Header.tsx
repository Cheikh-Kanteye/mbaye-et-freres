"use client";
import IconButton from "./IconButton";
import SearchInput from "./SearchInput";
import {
  RiMenu4Line,
  RiSearch2Line,
  RiShoppingCart2Line,
} from "react-icons/ri";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CategorieBtn from "./CategorieBtn";
import { NavigationMenu, NavigationMenuItem } from "./ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";

const menus = [
  { name: "Accueil", href: "/" },
  { name: "À Propos de Nous", href: "/apropos" },
  { name: "Réalisations", href: "/realisations" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
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
            <div className="block md:hidden">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="bg-primary-foreground text-foreground p-2 aspect-square rounded-full">
                  <RiMenu4Line />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background p-3 rounded-sm shadow-xl mr-2 w-56">
                  <DropdownMenuLabel></DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {menus.map((menu, i) => {
                    return (
                      <React.Fragment key={i}>
                        <DropdownMenuItem
                          className="p-1 hover:bg-slate-50"
                          asChild
                        >
                          <div
                            onClick={() => {
                              setOpen(false);
                              router.push(menu.href);
                            }}
                          >
                            {menu.name}
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </React.Fragment>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fb py-2">
        <CategorieBtn />
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList className="flex gap-4">
            {menus.map((menu, i) => (
              <NavigationMenuItem key={i}>
                <Link
                  className={`hover:text-primary p-1 hover:border-b-2 border-b-primary text-foreground ${
                    pathname === menu.href ? "border-b-2 text-primary" : ""
                  }`}
                  href={menu.href}
                >
                  {menu.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
