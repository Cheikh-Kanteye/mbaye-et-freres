"use client";
import SearchInput from "./SearchInput";
import { RiMenu4Line, RiSearch2Line } from "react-icons/ri";
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
import CategorieBtn from "./CategorieBtn";
import { NavigationMenu, NavigationMenuItem } from "./ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import ShoppingCart from "./ShoppingCart";
import useScrollSpy from "@/hooks/useScrollSpy";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  href: string;
}

const menus: MenuItem[] = [
  { name: "Accueil", href: "/" },
  { name: "Nos services", href: "#services" },
  { name: "À Propos de Nous", href: "#about" },
  { name: "Temoignages", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const homeHref = "/";
  const sectionIds = menus.map((menu) => menu.href.slice(1)); // Get section IDs without #
  const activeSection = useScrollSpy(sectionIds, homeHref);
  const router = useRouter();

  return (
    <header
      style={{ zIndex: 1000 }}
      className="sticky top-0 shadow-sm bg-background"
    >
      <div className="w-full bg-primary p-2 transition-transform duration-300 ease-in-out">
        <div className="container-fb">
          <Link
            href="/"
            className="w-fit logo-container text-3xl font-semibold border-0"
          >
            <Image src="/logo.png" alt="logo" width={60} height={60} />
            <span className="hidden sm:block">Ets Mbaye&Freres</span>
          </Link>

          <div className="gap-3 flex justify-end items-center">
            <SearchInput className="hidden w-fit lg:flex" />
            <div className="block lg:hidden">
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

            <ShoppingCart />
            <div className="block lg:hidden">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="bg-primary-foreground text-foreground p-2 aspect-square rounded-full">
                  <RiMenu4Line />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background p-3 rounded-sm shadow-xl mr-2 w-56">
                  <DropdownMenuLabel></DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {menus.map((menu, i) => (
                    <React.Fragment key={i}>
                      <DropdownMenuItem
                        className={`p-1 hover:bg-slate-50 ${
                          activeSection === menu.href ? "bg-slate-200" : ""
                        }`}
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
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="container gap-4">
        <CategorieBtn />
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="flex gap-4">
            {menus.map((menu, i) => (
              <NavigationMenuItem key={i}>
                <Link
                  className={`p-1 hover:border-b-2 border-b-primary text-foreground ${
                    activeSection === menu.href ? "border-b-2 text-primary" : ""
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
