import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
        <div className="hidden md:flex space-x-4">
          <nav className="flex items-center space-x-2">
            <>
              <Button
                onClick={() => navigate("/login")}
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
              <div className="mt-4 space-y-2">
                <>
                  <Button
                    onClick={() => navigate("/login")}
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
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
