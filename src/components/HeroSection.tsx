import {
  ChartNoAxesColumnIcon,
  CheckCircleIcon,
  CopyIcon,
  Edit2Icon,
  Link2Icon,
  QrCodeIcon,
  Share2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
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
      <div className="relative z-10 w-full max-w-3xl">
        <div className="rounded-xl border border-[#192540]/15 bg-[#192540]/40 p-8 shadow-[0_20px_40px_rgba(16,185,129,0.08)] backdrop-blur-xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="relative md:col-span-2">
                <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-primary/50">
                  <Link2Icon size={18} />
                </div>
                <input
                  className="h-16 w-full rounded-md border-none bg-[#192540] pr-6 pl-14 text-white transition-all focus:ring-2 focus:ring-secondary/40"
                  placeholder="Paste your long URL here..."
                  type="text"
                />
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-primary/50">
                  <Edit2Icon size={18} />
                </div>
                <input
                  className="h-16 w-full rounded-md border-none bg-[#192540] pr-6 pl-14 text-white transition-all focus:ring-2 focus:ring-secondary/40"
                  placeholder="Custom alias"
                  type="text"
                />
              </div>
            </div>
            <button
              className="h-16 w-full rounded-md bg-primary text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
              type="button"
            >
              Shorten URL
            </button>
          </form>
        </div>
      </div>
      <div className="relative z-10 mt-12 w-full max-w-3xl">
        <div className="bg-surface-container-low rounded-xl border border-[#192540]/15 p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full flex-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                  <CheckCircleIcon size={16} />
                </div>
                <span className="text-sm font-bold tracking-widest text-secondary uppercase">
                  Link Created Successfully
                </span>
              </div>
              <div className="group mb-6 flex items-center justify-between rounded-full bg-black px-4 py-2">
                <span className="text-xl font-medium tracking-tight text-secondary">
                  zip.url/spring-24
                </span>
                <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary/30">
                  <CopyIcon size={18} />
                  Copy
                </button>
              </div>
              <div className="flex gap-4">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="flex h-11! flex-1"
                >
                  <Share2Icon size={20} />
                  Share
                </Button>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="flex h-11! flex-1"
                >
                  <ChartNoAxesColumnIcon size={20} />
                  Analytics
                </Button>
              </div>
            </div>
            <div className="relative flex h-48 w-48 shrink-0 flex-col items-center justify-center rounded-lg bg-white/70 p-4">
              <img
                alt="QR Code"
                className="h-full w-full"
                data-alt="clean black and white digital QR code on a minimalist white background for a sleek branding aesthetic"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZVnXvAKoE7wM2QjnMpAdzH1FpBqQipCsUCkOdgdu_M0z01LJCe5vvSP0_IC_vLGbNZdu4ahEUhFaNacUV07UYBQ1nOOYUdm8kT0YLUSoRw1Nrviq0N5NEl0td7CI2onjF_xA_yDaXogcUQsW5HYtuGcEk6qeLnVgLYZyP8UG4K2BgQAmXZmogqZDdQgL9ig1SAF4aNs_7ZzyzT_y6j3lT6qwExI6j8qI6Q1NpHigAhFlq13XpIfTZPOJY_3VHKn4ku_upVrdI2JE"
              />
              <div className="text-on-secondary absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40">
                <QrCodeIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
