import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

export const description = "An interactive bar chart";

type ChartDataType = {
  desktop: number;
  mobile: number;
  tablet: number;
  date: string;
};

type DataType = {
  last90DaysDevices: ChartDataType[];
  last29DaysDevices: ChartDataType[];
  last6DaysDevices: ChartDataType[];
};

interface PropsType {
  data: DataType;
}

const chartConfig = {
  views: {
    label: "Clicks",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const ClicksBarChart = ({ data }: PropsType) => {
  const [selectData, setSelectData] =
    React.useState<keyof DataType>("last90DaysDevices");

  const devices = data[selectData];
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: devices.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: devices.reduce((acc, curr) => acc + curr.mobile, 0),
      tablet: devices.reduce((acc, curr) => acc + curr.tablet, 0),
    }),
    [selectData],
  );


  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch justify-between border-b p-0! sm:flex-row gap-4">
        <div className="flex flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Clicks over time</CardTitle>
          <CardDescription>
            Showing total clicks for the last{" "}
            {selectData === "last29DaysDevices"
              ? 30
              : selectData === "last6DaysDevices"
                ? 7
                : 90}{" "}
            days
          </CardDescription>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-secondary/40 rounded-full py-1 px-2 flex gap-2">
            <Button
              onClick={() => setSelectData("last6DaysDevices")}
              className="rounded-full font-normal!"
              variant={
                selectData === "last6DaysDevices" ? "default" : "outline"
              }
            >
              Last 7 days
            </Button>
            <Button
              onClick={() => setSelectData("last29DaysDevices")}
              className="rounded-full font-normal!"
              variant={
                selectData === "last29DaysDevices" ? "default" : "outline"
              }
            >
              Last 30 days
            </Button>
            <Button
              onClick={() => setSelectData("last90DaysDevices")}
              className="rounded-full font-normal!"
              variant={
                selectData === "last90DaysDevices" ? "default" : "outline"
              }
            >
              Last 90 days
            </Button>
          </div>
        </div>
        <div className="flex">
          {["desktop", "mobile", "tablet"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={devices}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ClicksBarChart;
