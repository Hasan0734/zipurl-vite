import {
  ChartNoAxesColumnIcon,
  CheckCircleIcon,
  QrCodeIcon,
  Share2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import HeroForm from "./forms/HeroForm";
import { useState } from "react";
import { SHORT_URL } from "@/lib/utils";
import CopyButton from "./ui/copy-button";
import { motion } from "motion/react";
const HeroFormSection = () => {
  const [shortCode, setShortCode] = useState("");
  const [customAlias, setCustomAlias] = useState("");

  const url = () => {
    const code = SHORT_URL + (customAlias ? customAlias : shortCode);
    // const fullUrl = SHORT_URL + (code ? code : "example");
    return code;
  };

  return (
    <>
      <div className="relative z-10 w-full max-w-3xl">
        <div className="rounded-xl border border-[#192540]/20 bg-[#192540]/40 p-8  backdrop-blur-xl">
          <HeroForm
            setShortCode={setShortCode}
            setCustomAlias={setCustomAlias}
          />
        </div>
      </div>
      {(customAlias || shortCode) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative z-10 mt-12 w-full max-w-3xl rounded-xl border border-[#192540]/15 p-8 shadow-2xl"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full flex-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                  <CheckCircleIcon size={16} />
                </div>
                <span className="text-sm font-semibold tracking-widest text-primary/50 ">
                  Link Created Successfully
                </span>
              </div>
              <div className="group mb-6 flex items-center justify-between rounded-full bg-black px-4 py-2">
                <span className="text-md font-medium tracking-tight text-primary/70">
                  {url() ? url() : "example"}
                </span>
                <CopyButton
                  disabled={!(!!customAlias || !!shortCode)}
                  content={url()}
                  className="border-0"
                  variant={"outline"}
                />
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
        </motion.div>
      )}
    </>
  );
};

export default HeroFormSection;
