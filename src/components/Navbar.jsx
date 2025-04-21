import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky p-2 md:p-4 top-0 z-50 w-full border-b bg-background">
      <div className="flex w-full px-auto md:px-[7%] h-10 justify-between items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-light font-custom text-2xl text-primary">
              FinConnect
            </span>
          </Link>
        </div>
        <NavigationMenu className="hidden w-full md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={"/pricing"}>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                  <Link
                    href="/resources/documentation"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Documentation
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn how to integrate and use our platform
                    </p>
                  </Link>
                  <Link
                    href="/resources/api"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      API Reference
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Detailed API documentation and examples
                    </p>
                  </Link>
                  <Link
                    href="/resources/guides"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Guides
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Step-by-step guides for common use cases
                    </p>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden md:flex space-x-4">
          <nav className="flex items-center space-x-2">
            {/* {user?.email ? (
              <Button
                className="hidden md:flex"
                onClick={() => navigate("/dashboard/chatbot")}
              >
                Dashboard →
              </Button>
            ) : ( */}
            <>
              <Button
                onClick={() => navigate("/sign-in")}
                variant="ghost"
                className="hidden md:flex"
              >
                Sign in
              </Button>
              <Button
                className="hidden md:flex"
                onClick={() => navigate("/sign-up")}
              >
                Try for Free →
              </Button>
            </>
            {/* )} */}
            <Button variant="outline" size="icon" className="md:hidden">
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </nav>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="pt-16">
            <nav className="grid gap-4">
              <Link
                to="/pricing"
                className="text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                Pricing
              </Link>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium">
                  Resources
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-4">
                  <Link
                    href="/resources/documentation"
                    className="block text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Documentation
                  </Link>
                  <Link
                    href="/resources/api"
                    className="block text-sm"
                    onClick={() => setOpen(false)}
                  >
                    API Reference
                  </Link>
                  <Link
                    href="/resources/guides"
                    className="block text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Guides
                  </Link>
                </CollapsibleContent>
              </Collapsible>
              <div className="mt-4 space-y-2">
                {/* {user?.email ? (
                  <Button
                    className="w-full"
                    onClick={() => navigate("/dashboard/chatbot")}
                  >
                    Dashboard →
                  </Button>
                ) : ( */}
                <>
                  <Button
                    onClick={() => navigate("/sign-in")}
                    variant="ghost"
                    className="w-full bg-accent"
                  >
                    Sign in
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => navigate("/sign-up")}
                  >
                    Try for Free →
                  </Button>
                </>
                {/* )} */}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
