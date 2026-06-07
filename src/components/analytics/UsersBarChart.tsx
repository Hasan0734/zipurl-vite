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
  date: string;
  count: number;
};

type DataType = {
  last90DaysUsers: ChartDataType[];
  last30DaysUsers: ChartDataType[];
  last6DaysUsers: ChartDataType[];
};

interface PropsType {
  data: DataType;
}

const chartConfig = {
  views: {
    label: "Users",
  },

  users: {
    label: "Users",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

const UsersBarChart = ({ data }: PropsType) => {
  const [selectData, setSelectData] =
    React.useState<keyof DataType>("last90DaysUsers");

  const chartData = data[selectData];
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b sm:flex-row py-3">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Sign up over time</CardTitle>
          <CardDescription>
            Showing total sing up user for the last{" "}
            {selectData === "last30DaysUsers"
              ? 30
              : selectData === "last6DaysUsers"
                ? 7
                : 90}{" "}
            days
          </CardDescription>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-secondary/40 rounded-full py-1 px-2 flex gap-2">
            <Button
              onClick={() => setSelectData("last6DaysUsers")}
              className="rounded-full font-normal!"
              variant={selectData === "last6DaysUsers" ? "default" : "outline"}
            >
              Last 7 days
            </Button>
            <Button
              onClick={() => setSelectData("last30DaysUsers")}
              className="rounded-full font-normal!"
              variant={selectData === "last30DaysUsers" ? "default" : "outline"}
            >
              Last 30 days
            </Button>
            <Button
              onClick={() => setSelectData("last90DaysUsers")}
              className="rounded-full font-normal!"
              variant={selectData === "last90DaysUsers" ? "default" : "outline"}
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

export default UsersBarChart;
