import MetricsCardSkeleton from "./MetricsCardSkeleton";

const MetricsSectionSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <MetricsCardSkeleton key={i} />
      ))}
    </section>
  );
};

export default MetricsSectionSkeleton