import {
  ChartNoAxesColumnIcon,
  CheckCircleIcon,
  CopyIcon,
  QrCodeIcon,
  Share2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import HeroForm from "./forms/HeroForm";
import LoginDialog from "./LoginDialog";
const HeroFormSection = () => {
  return (
    <>
      <LoginDialog />
      <div className="relative z-10 w-full max-w-3xl">
        <div className="rounded-xl border border-[#192540]/15 bg-[#192540]/40 p-8 shadow-[0_20px_40px_rgba(16,185,129,0.08)] backdrop-blur-xl">
          <HeroForm />
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
    </>
  );
};

export default HeroFormSection;
