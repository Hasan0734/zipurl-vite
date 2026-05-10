import { Link } from "react-router";
import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      id="ready_to_start"
    >
      <div className="absolute inset-0 z-0 bg-primary/5"></div>
      <div className="bg-glass relative z-10 mx-auto max-w-5xl overflow-hidden rounded-xl border border-primary/20 p-6 sm:p-12 text-center shadow-[0_0_80px_rgba(16,185,129,0.1)] md:p-20">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-[80px]"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-[80px]"></div>
        <h2 className=" mb-8 text-2xl leading-tight font-extrabold tracking-tighter md:text-6xl">
          Ready to start <br className="hidden md:block" />
          <span className="text-secondary">shortening?</span>
        </h2>
        <p className=" mx-auto mb-12 max-w-2xl text-muted-foreground text-base sm:text-xl sm:font-medium">
          Join over 50,000 users who are already scaling their reach with
          LumeShort's powerful link management platform.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-11 sm:h-16  rounded-md px-10 sm:text-lg sm:font-bold transition-all hover:scale-[1.05] active:scale-95"
          >
            <Link to={"/sign-up"}>Create Free Account</Link>
          </Button>
          <Button
            asChild
            variant={"outline"}
            className="h-11 sm:h-16 rounded-md  px-10 sm:text-lg sm:font-bold  transition-all hover:scale-[1.05] active:scale-95"
          >
            <a href={"#pricing"}>View Pricing</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
