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

type ChartDataType = {
  date: string;
  count: number;
};

type DataType = {
  last90DaysUrls: ChartDataType[];
  last30DaysUrls: ChartDataType[];
  last6DaysUrls: ChartDataType[];
};

interface PropsType {
  data: DataType;
}

const chartConfig = {
  views: {
    label: "Urls",
  },

  users: {
    label: "Urls",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

const UrlsBarChart = ({ data }: PropsType) => {
  const [selectData, setSelectData] =
    React.useState<keyof DataType>("last90DaysUrls");

  const chartData = data[selectData];


  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b py-3 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Sign up over time</CardTitle>
          <CardDescription>
            Showing total sing up user for the last{" "}
            {selectData === "last30DaysUrls"
              ? 30
              : selectData === "last6DaysUrls"
                ? 7
                : 90}{" "}
            days
          </CardDescription>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-secondary/40 rounded-full py-1 px-2 flex gap-2">
            <Button
              onClick={() => setSelectData("last6DaysUrls")}
              className="rounded-full font-normal!"
              variant={selectData === "last6DaysUrls" ? "default" : "outline"}
            >
              Last 7 days
            </Button>
            <Button
              onClick={() => setSelectData("last30DaysUrls")}
              className="rounded-full font-normal!"
              variant={selectData === "last30DaysUrls" ? "default" : "outline"}
            >
              Last 30 days
            </Button>
            <Button
              onClick={() => setSelectData("last90DaysUrls")}
              className="rounded-full font-normal!"
              variant={selectData === "last90DaysUrls" ? "default" : "outline"}
            >
              Last 90 days
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
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
            <Bar dataKey={"count"} fill={`var(--color-primary)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UrlsBarChart;
