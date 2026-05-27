import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Spinner } from "../ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import {format} from "date-fns"

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--primary)",
  },
  previous: {
    label: "Previous",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

interface PropsType {
  data: any;
  isLoading: boolean;
}

const ClickOverTime = ({ data, isLoading }: PropsType) => {
  const [selectedValue, setSelectedValue] = useState("weeklyClicks");
  return (
    <div className="glass-panel group relative overflow-hidden rounded-3xl border border-primary/20 p-8 lg:col-span-2">
      <div className="mb-10 flex items-center justify-between">
        <h3 className="text-on-surface font-manrope text-xl font-bold">
          Clicks over time
        </h3>
        <div>
          <Select onValueChange={(v) => setSelectedValue(v)} defaultValue={selectedValue}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"weeklyClicks"}>Weekly Clicks</SelectItem>
              <SelectItem value={"last7DaysAgo"}>Last 7 dasy ago</SelectItem>
              <SelectItem value={"last30Days"}>Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {!isLoading && (
        <ChartContainer className="h-80 w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data[selectedValue]}
            margin={{
              top: 50,
            }}
            height={200}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={selectedValue === "last30Days" ? "date": "day"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if(selectedValue === "last30Days"){
                  return format(new Date(value), "dd")
                }
                return  value.slice(0, 3)
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <defs>
              <linearGradient id="fillPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-previous)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-previous)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              // dot={true}
              dataKey="previous"
              type="natural"
              fill="url(#fillPrevious)"
              fillOpacity={0.4}
              stroke="var(--color-secondary)"
              stackId="a"
            />
            <Area
              // dot={true}
              dataKey="clicks"
              type="natural"
              fill="url(#fillClicks)"
              fillOpacity={0.4}
              stroke="var(--color-clicks)"
              stackId="a"
            />
            
          </AreaChart>
        </ChartContainer>
      )}
      {isLoading && (
        <div className="h-80 w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Spinner /> Chart loading....
          </div>
        </div>
      )}

      {selectedValue === "weeklyClicks" && (
        <div className="flex justify-center pt-5">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary"></span>
              <span className="text-xs">This Period</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-secondary"></span>
              <span className="text-xs">Previous</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickOverTime;
