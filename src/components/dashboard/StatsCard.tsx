import {type LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    label: string
    icon: LucideIcon,
    total: string
}

const StatsCard = ({title, label, total, icon: Icon}:StatsCardProps) => {
  return (
    <div className="glass-panel rounded-4xl border-l-4 border-primary p-8">
      <p className=" text-[11px] font-bold tracking-widest text-primary uppercase">
       {title}
      </p>
      <p className=" mt-2 text-4xl font-black">{total}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-bold ">
        <Icon className="text-primary"/>
        {label}
      </div>
    </div>
  )
}

export default StatsCard
