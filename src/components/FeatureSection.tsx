import {
  ChartScatterIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ShieldCheckIcon,
} from "lucide-react";
const FeatureSection = () => {
  return (
    <section className="max-w-6xl mx-auto relative z-10 mt-32 grid w-full grid-cols-1 gap-6 md:grid-cols-12 px-6 pb-12">
      <div className="flex min-h-75 flex-col justify-between rounded-xl bg-[#091328] p-10 md:col-span-8">
        <div>
          <span>
            <ChartScatterIcon size={26} className="mb-6 text-primary" />
          </span>
          <h3 className="text-on-surface mb-4 text-3xl font-bold">
            Advanced Analytics
          </h3>
          <p className="text-on-surface-variant text-lg">
            Track every click in real-time. Understand your audience with
            detailed geographical, device, and referral data insights.
          </p>
        </div>
        <div className="mt-8 flex gap-2">
          <div className="h-2 w-12 rounded-full bg-primary"></div>
          <div className="h-2 w-4 rounded-full bg-input"></div>
          <div className="h-2 w-4 rounded-full bg-input"></div>
        </div>
      </div>
      <div className="rounded-xl border border-[#192540]/10 bg-[#192540]/40 p-10 backdrop-blur-xl md:col-span-4">
        <span className="">
          <ShieldCheckIcon size={26} className="mb-6 text-primary" />
        </span>
        <h3 className="text-on-surface mb-4 text-2xl font-bold">
          Secure &amp; Reliable
        </h3>
        <p className="text-on-surface-variant">
          Enterprise-grade encryption and 99.9% uptime for all your links.
          Always active, always safe.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl bg-primary/10 p-10 text-center md:col-span-4">
        <span className="mb-4">
          <MonitorSmartphoneIcon size={40} className="text-primary" />
        </span>
        <h3 className="text-on-surface text-xl font-bold">
          Universal Redirects
        </h3>
      </div>
      <div className="group relative overflow-hidden rounded-xl bg-[#091328] p-10 md:col-span-8">
        <div className="flex items-start justify-between">
          <div className="relative z-10 max-w-md">
            <h3 className="text-on-surface mb-4 text-3xl font-bold">
              Custom Branding
            </h3>
            <p className="text-on-surface-variant">
              Use your own domain name and create branded short links that build
              trust with your audience.
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-20 transition-opacity group-hover:opacity-40">
            <span>
              <GlobeIcon size={120} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
