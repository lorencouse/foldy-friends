import React from "react";
import { useShopContext } from "@/context/ShopContext";
import useAuth from "@/hooks/useAuth";
import { CartFullSize } from "../Cart/CartFullSize";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitcher from "./ThemeSwitcher";
import { NavLogo } from "./NavLogo";
import { ProfileIcon } from "./ProfileIcon";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { MiniCartButtons } from "./MiniCartButtons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Navbar = () => {
  const { cartCount, activeCategory, setActiveCategory } = useShopContext();
  const { user } = useAuth();

  const links = [
    { title: "home", url: "/" },
    { title: "shop", url: "/shop" },
    { title: "paper", url: "/shop/category/paper" },
    { title: "tools", url: "/shop/category/tools" },
    { title: "kits", url: "/shop/category/kits" },
  ];

  const handleNavClick = (url: string, category: string) => {
    setActiveCategory(category);
    redirect(url);
  };

  return (
    <header className="md:fixed md:top-0 z-50 w-full bg-background backdrop-blur-sm bg-primary text-white py-2 shadow-lg">
      <div className="container flex h-14 items-center bg-primary">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden mr-3 -ml-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <span className="lg:hidden">
            <NavLogo />
          </span>
          <SheetContent side="left" className="bg-primary flex flex-col gap-4">
            <NavLogo />
            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <span
                  onClick={() =>
                    handleNavClick(link.url, link.title.toLowerCase())
                  }
                  key={link.title}
                  className={`text-md text-white cursor-pointer transition-colors  hover:translate-x-3 ${activeCategory === link.title.toLowerCase() ? "text-2xl" : ""}`}
                >
                  {link.title}
                </span>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="mr-4 hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              <NavLogo />
              {links.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <span
                    onClick={() =>
                      handleNavClick(link.url, link.title.toLowerCase())
                    }
                    className={`text-md cursor-pointer font-medium transition-colors hover:text-gray-800 ${activeCategory === link.title ? "text-xl border-b-2 -top-4 hover:border-gray-800" : ""}`}
                  >
                    {link.title}
                  </span>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Theme Switcher */}

          <ThemeSwitcher />

          <Drawer>
            <DrawerTrigger asChild>
              <span className="relative cursor-pointer">
                <span className="sr-only">Shopping cart</span>
                <ShoppingCart className="h-5 w-5 mr-3" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </span>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerClose>
                <span className="cursor-pointer hover:opacity-90 ">
                  X Close
                </span>
              </DrawerClose>

              <div className="mx-auto w-full max-w-2xl max-h-[85vh] overflow-auto">
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <CartFullSize />
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose>
                    <MiniCartButtons />
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          {/* User Profile */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {/* Add profile icon */}
                  <ProfileIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-background text-foreground"
              >
                <DropdownMenuItem onClick={() => redirect("/account")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => redirect("/sign-in")}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
