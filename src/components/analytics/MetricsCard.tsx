import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface MetricsCardProps {
  icon: LucideIcon
  title: string
  total: string
  increment: string
  isUpper?: boolean
  isDown?: boolean
}

const MetricsCard = ({
  icon: Icon,
  title,
  total,
  increment,
  isDown,
  isUpper,
}: MetricsCardProps) => {
  return (
    <div className="glass-panel border-outline-variant/10 flex min-h-45 flex-col justify-between rounded-3xl border p-8">
      <div className="flex items-start justify-between">
        <Icon className="text-primary" />
        <span
          className={cn("rounded-full px-3 py-1 text-xs font-bold", {
            "bg-primary/10 text-primary": isUpper,
            "bg-red-500/10 text-red-500": isDown,
          })}
        >
          {increment}
        </span>
      </div>
      <div>
        <p className="text-on-surface-variant mb-1 text-sm font-medium tracking-wider uppercase">
          {title}
        </p>
        <p className="text-on-surface font-manrope text-4xl font-black tracking-tight">
          {total}
        </p>
      </div>
    </div>
  )
}

export default MetricsCard
