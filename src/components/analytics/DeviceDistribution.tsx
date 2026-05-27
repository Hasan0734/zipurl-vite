import { MonitorSmartphone } from "lucide-react";
import {
  Label,
  Pie,
  PieChart,
  Sector,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Devices } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

export const description = "A donut chart with text";

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "var(--secondary)",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

interface PropsType {
  devices: Devices[];
  isLoading: boolean;
}

const DeviceDistribution = ({ devices, isLoading }: PropsType) => {
  const MyCustomPie = (props: any) => {
    const device: "desktop" | "tablet" | "mobile" = props.device;
    return (
      <Sector {...props} fill={chartConfig[device].color || "var(--primary)"} />
    );
  };

  return (
    <div className="glass-panel rounded-3xl border border-primary/20 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-on-surface font-manrope text-xl font-bold">
          Device Distribution
        </h3>
        <span>
          <MonitorSmartphone />
        </span>
      </div>

      {!isLoading && (
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-62.5 w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={devices}
                dataKey="clicks"
                nameKey="device"
                innerRadius={60}
                strokeWidth={5}
                shape={MyCustomPie}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {devices[0].percentage.toLocaleString()}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {devices[0].device}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="flex min-w-40 flex-col gap-6">
            {devices?.map((item) => {
              const color =
                chartConfig[item.device as keyof typeof chartConfig].color;
              return (
                <div key={item.device} className="flex items-start gap-4">
                  <div
                    className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground capitalize">
                      {item.device}
                    </span>
                    <span className="text-xl font-bold tracking-tight text-white">
                      {item.clicks}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        clicks
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isLoading && <DeviceChartSkeleton />}
    </div>
  );
};

export default DeviceDistribution;

const DeviceChartSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-12 md:flex-row">
      <div className="max-w-xs mx-auto">
        <Skeleton className="w-40 h-40 rounded-full flex items-center justify-center">
          <div className="bg-background size-30 rounded-full flex flex-col justify-center items-center gap-3">
            <Skeleton className="h-6 w-16"/>
            <Skeleton className="h-4 w-16"/>

          </div>
        </Skeleton>
      </div>
      <div className="flex min-w-40 flex-col gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index++} className="flex items-start gap-4">
            <Skeleton className="mt-1.5 h-3 w-3 shrink-0 rounded-full" />

            {/* Label and Value */}
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-5 w-40" />
              <div className="flex items-end gap-3">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
