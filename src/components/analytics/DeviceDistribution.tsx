import { MonitorSmartphone } from "lucide-react"
import React from "react"
import { Label, Legend, Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A donut chart with text"
const chartData = [
  { device: "mobile", total: 275, fill: "var(--primary)" },
  { device: "desktop", total: 200, fill: "var(--secondary)" },
  { device: "tablet", total: 287, fill: "var(--chart-3)" },
]
const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
  desktop: {
    label: "Desktop",
    color: "var(--secondary)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const DeviceDistribution = () => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0)
  }, [])
  return (
    <div className="glass-panel rounded-3xl border p-8">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-on-surface font-manrope text-xl font-bold">
          Device Distribution
        </h3>
        <span>
          <MonitorSmartphone />
        </span>
      </div>

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
              data={chartData}
              dataKey="total"
              nameKey="device"
              innerRadius={60}
              strokeWidth={5}
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
                          {totalVisitors.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Mobile
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex min-w-40 flex-col gap-6">
          {chartData.map((item) => {
            const color = chartConfig[item.device as keyof typeof chartConfig].color;
            return (
              <div className="flex items-start gap-4">
                {/* The Indicator Dot */}
                <div
                  className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />

                {/* Label and Value */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground capitalize">
                    {item.device}
                  </span>
                  <span className="text-xl font-bold tracking-tight text-white">
                    {item.total.toLocaleString()}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      clicks
                    </span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DeviceDistribution
