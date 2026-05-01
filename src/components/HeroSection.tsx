import HeroFormSection from "./HeroFormSection";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 py-12">
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"></div>
      <div className="absolute -right-20 bottom-1/4 size-120 rounded-full bg-secondary/10 blur-[150px]"></div>
      <div className="relative z-10 mb-16 w-full max-w-4xl text-center">
        <span className="label-md mb-4 block font-bold tracking-[0.2em] text-primary uppercase">
          Reach Further
        </span>
        <h1 className="display-lg text-on-surface mb-6 text-5xl leading-tight font-extrabold tracking-tighter md:text-7xl">
          Shorten Your Links, <br />
          <span className="bg-linear-to-r from-[#10b981]/50 to-[#69f6b8] bg-clip-text text-transparent">
            Expand Your Reach
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-medium text-muted-foreground md:text-xl">
          Transform long, cumbersome URLs into sleek, manageable links with
          powerful tracking and custom branding.
        </p>
      </div>
      <HeroFormSection />
    </section>
  );
};

export default HeroSection;
