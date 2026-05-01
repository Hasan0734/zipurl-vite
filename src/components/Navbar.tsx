import { FolderArchiveIcon } from "lucide-react";
import { Button } from "./ui/button";
import UserDropDown from "./UserDropDown";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const auth = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-[#060e20]/70 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(105,246,184,0.05)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <a
            href={"/"}
            className=" flex items-center gap-2 text-2xl font-bold tracking-tighter text-primary"
          >
            <FolderArchiveIcon />
            ZipUrl
          </a>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <a
            className="font-manrope border-b-2 border-primary pb-1 font-bold tracking-tight text-primary"
            href="#pricing"
          >
            Pricing
          </a>
          <a
            className="font-manrope font-bold tracking-tight text-white/60 transition-colors hover:text-primary"
            href="#FAQ"
          >
            FAQ
          </a>
          <a
            className="font-manrope font-bold tracking-tight text-white/60 transition-colors hover:text-primary"
            href="#ready_to_start"
          >
            Ready to start
          </a>
        </div>
        <div className="flex items-center gap-2">
          {!auth.accessToken && (
            <div className="flex items-center gap-2">
              <a href="/sign-in">
                <Button className="font-semibold font-manrope" variant={"link"}>
                  Sign In
                </Button>
              </a>
              <a href="/sign-up">
                <Button className="font-semibold font-manrope" variant={"link"}>
                  Sign Up
                </Button>
              </a>
            </div>
          )}
          {auth.accessToken && <UserDropDown />}
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
