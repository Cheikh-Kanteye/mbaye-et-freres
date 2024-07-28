"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from "@/components/SearchInput";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { RiMenu4Line, RiSearch2Line } from "react-icons/ri";
import React, { useState } from "react";

const menus = [
  {
    name: "Dashboard",
    href: "/admin/",
  },
  {
    name: "Produits",
    href: "/admin/produits",
  },
  {
    name: "Categories",
    href: "/admin/categories",
  },
  {
    name: "Services",
    href: "/admin/services",
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="p-4 flex w-full justify-between text-foreground items-center  border-b sticky top-0">
      <Link
        href="/admin"
        className="w-fit logo-container bg-primary border-primary"
      >
        <span className="logo-section-1">Mbaye &</span>
        <span className="p-1">Frères</span>
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          {menus.map((menu, i) => (
            <NavigationMenuItem key={i}>
              <Link
                href={menu.href}
                className={`hover:bg-accent cursor-pointer p-2 rounded-sm hover:text-accent-foreground ${
                  pathname === menu.href ? "bg-accent" : null
                }`}
              >
                {menu.name}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2 items-center">
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
        <div className="block md:hidden">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="bg-primary-foreground text-foreground p-2 aspect-square rounded-full">
              <RiMenu4Line />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-background p-3 rounded-sm shadow-xl mr-2 w-56"
              style={{ zIndex: 10000 }}
            >
              <DropdownMenuLabel></DropdownMenuLabel>
              <DropdownMenuSeparator />
              {menus.map((menu, i) => {
                return (
                  <React.Fragment key={i}>
                    <DropdownMenuItem
                      className="p-1 bg-background hover:bg-slate-50"
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
        <ProfileButton />
      </div>
    </header>
  );
};

export default Header;
