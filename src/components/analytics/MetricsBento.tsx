import { CircleGauge, MousePointerClick, Users } from "lucide-react";
import MetricsCard from "./MetricsCard";

const MetricsBento = () => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
      <MetricsCard
        icon={MousePointerClick}
        title="Total Clicks"
        total="124,802"
        increment="+15.4%"
        isUpper
      />
      <MetricsCard
        icon={Users}
        title="Unique Visitors"
        total="42,119"
        increment="+8.2%"
        isUpper
      />
      <MetricsCard
        icon={CircleGauge}
        title="Conversion Rate"
        total="4.6%"
        increment="-2.1%"
        isDown
      />
    </div>
  );
};

export default MetricsBento;
