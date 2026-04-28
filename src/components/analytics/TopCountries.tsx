import { ArrowRight } from "lucide-react";

const TopCountries = () => {
  return (
    <div className="glass-panel border flex flex-col rounded-3xl  p-10">
      <h3 className="text-on-surface font-manrope mb-8 text-xl font-bold">
        Top Countries
      </h3>
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-primary"></span> United
              States
            </span>
            <span className="text-on-surface-variant">45%</span>
          </div>
          <div className="bg-gray-700/30 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: "45%" }}
            ></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-blue-500 "></span> United
              Kingdom
            </span>
            <span className="text-on-surface-variant">22%</span>
          </div>
          <div className="bg-gray-700/30 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: "22%" }}
            ></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <span className="bg-fuchsia-500 h-2 w-2 rounded-full"></span>{" "}
              Germany
            </span>
            <span className="text-on-surface-variant">15%</span>
          </div>
          <div className="bg-gray-700/30 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-fuchsia-500 h-full rounded-full"
              style={{ width: "15%" }}
            ></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <span className="bg-gray-500 h-2 w-2 rounded-full"></span> Canada
            </span>
            <span className="text-on-surface-variant">10%</span>
          </div>
          <div className="bg-gray-700/30 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-gray-500 h-full rounded-full"
              style={{ width: "10%" }}
            ></div>
          </div>
        </div>
      </div>
      <button className="group mt-8 flex items-center gap-2 text-sm font-bold text-primary">
        View Detailed Map
        <span className=" transition-transform group-hover:translate-x-1">
          <ArrowRight />
        </span>
      </button>
    </div>
  );
};

export default TopCountries;
