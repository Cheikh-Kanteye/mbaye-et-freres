import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { CategoryParams } from "@/types";
import Link from "next/link";

interface NavLinkProps {
  title: string;
  href: string;
  items?: CategoryParams[];
}

const NavLink: React.FC<NavLinkProps> = ({ title, href, items }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {items && items.length > 0 ? (
            <>
              <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col gap-2 p-2">
                <ul className="flex flex-col p-0 m-0 list-none">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="whitespace-nowrap p-1 border-b border-primary-foreground w-full"
                    >
                      <Link
                        className="text-base hover:underline hover:text-primary"
                        href={`/categories/${href}/${item.href}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </>
          ) : (
            <Button variant={"ghost"}>
              <NavigationMenuLink
                className="text-base hover:underline hover:text-primary"
                href={href}
              >
                {title}
              </NavigationMenuLink>
            </Button>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLink;
