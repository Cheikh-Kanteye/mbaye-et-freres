"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import { Input } from "@/components/ui/input";

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
  return (
    <header className="p-4 flex w-full justify-between items-center border-b sticky top-0">
      <NavigationMenu>
        <NavigationMenuList>
          {menus.map((menu, i) => (
            <NavigationMenuItem key={i}>
              <Link
                href={menu.href}
                className="hover:bg-accent cursor-pointer p-2 rounded-sm hover:text-accent-foreground "
              >
                {menu.name}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-1">
        <Input type="search" placeholder="Recherche..." />
        <ProfileButton />
      </div>
    </header>
  );
};

export default Header;
