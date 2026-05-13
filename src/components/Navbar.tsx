import { FolderArchiveIcon, MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import UserDropDown from "./UserDropDown";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "./ui/sheet";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const auth = useAuth();
  const navLinks = [
    { title: "Pricing", to: "#pricing" },
    { title: "FAQ", to: "#FAQ" },
    { title: "Ready to start", to: "#ready_to_start" },
  ];

  const drawerVariants = {
    closed: { x: "100%" },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: { x: "100%", transition: { duration: 0.3 } },
  };

  return (
    <nav className="sticky top-0 z-50 bg-bakground  backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link
            to={"/"}
            className=" flex items-center gap-2 text-lg sm:text-2xl font-bold tracking-tighter text-primary"
          >
            <FolderArchiveIcon />
            ZipUrl
          </Link>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.to}
              className="font-manrope font-bold tracking-tight text-white/60 transition-colors hover:text-primary"
              href="#pricing"
            >
              {link.title}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {!auth.accessToken && (
            <div className="flex items-center gap-2">
              <Button className="font-semibold font-manrope" variant={"link"}>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
              <Button
                className="font-semibold font-manrope"
                variant={"outline"}
                asChild
              >
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </div>
          )}

          <div className="hidden md:block">
            {auth.accessToken && <UserDropDown />}
          </div>
        </div>
        <div className="block md:hidden">
          <Sheet >
            <SheetTrigger asChild>
              <Button
                onClick={() => setToggle(!toggle)}
                variant={"outline"}
                size={"icon-sm"}
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background ">
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <Link
                    to={"/"}
                    className=" flex items-center gap-2 text-lg sm:text-2xl font-bold tracking-tighter text-primary"
                  >
                    <FolderArchiveIcon />
                    <span className="text-foreground">ZipUrl</span>
                  </Link>
                </div>
              </SheetHeader>

              <div className="px-5">
                <ul className="gap-4 flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <a
                        className="font-manrope   tracking-tight text-white/60 transition-colors hover:text-primary"
                        href="#pricing"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <SheetFooter>
                <UserDropDown />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* <AnimatePresence>
          {toggle && (
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed left-0 right-0 bg-background z-20 w-full top-0 p-4 h-screen md:hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link
                    to={"/"}
                    className=" flex items-center gap-2 text-lg sm:text-2xl font-bold tracking-tighter text-primary"
                  >
                    <FolderArchiveIcon />
                    ZipUrl
                  </Link>
                </div>

                <div>
                  <Button
                    onClick={() => setToggle(!toggle)}
                    variant={"outline"}
                    size={"icon-sm"}
                  >
                    <X />
                  </Button>
                </div>
              </div>

              <ul className="gap-4 flex flex-col my-8">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <a
                      className="font-manrope   tracking-tight text-white/60 transition-colors hover:text-primary"
                      href="#pricing"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto h-full">
                <UserDropDown />
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </nav>
  );
};

export default Navbar;
