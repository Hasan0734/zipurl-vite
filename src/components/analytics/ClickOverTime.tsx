import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

export const description = "An area chart with gradient fill"
const chartData = [
  { day: "Sun", clicks: 200 },
  { day: "Mon", clicks: 120 },
  { day: "Tue", clicks: 500 },
  { day: "Wed", clicks: 130 },
  { day: "Thu", clicks: 140 },
  { day: "Fri", clicks: 140 },
  { day: "Sat", clicks: 200 },
]
const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const ClickOverTime = () => {
  return (
    <div className="glass-panel group relative overflow-hidden rounded-3xl border p-10 lg:col-span-2">
      <div className="mb-10 flex items-center justify-between">
        <h3 className="text-on-surface font-manrope text-xl font-bold">
          Clicks over time
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary"></span>
            <span className="text-xs">This Period</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary/20"></span>
            <span className="text-xs">Previous</span>
          </div>
        </div>
      </div>

      <ChartContainer className="max-h-80 w-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
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
            dot={true}
            dataKey="clicks"
            type="natural"
            fill="url(#fillClicks)"
            fillOpacity={0.4}
            stroke="var(--color-clicks)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

export default ClickOverTime
