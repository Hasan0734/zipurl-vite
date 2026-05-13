import { Link2, TrendingUp, Map } from "lucide-react";
import StatsCard from "./StatsCard";
const StatSection = () => {
  const stats = [
    {
      title: "Total Impressions",
      label: "24% from last month",
      icon: TrendingUp,
      total: "1.2M",
    },
    {
      title: "Active Links",
      label: "12 created today",
      icon: Link2,
      total: "842",
    },
    {
      title: "Top Region",
      label: "42% of total traffic",
      icon: Map,
      total: "London",
    },
  ];
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard key={stat.title} stat={stat} />
      ))}
    </section>
  );
};

export default StatSection;
