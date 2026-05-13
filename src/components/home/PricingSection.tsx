import PricingCard from "./PricingCard";

const PricingSection = () => {
  const priceList = [
    {
      name: "Free",
      description: "Perfect for individuals",
      price: 0,
      features: ["50 Links / month", "Basic Analytics", "Community Support"],
      button: {
        title: "Get Started",
        to: "/sign-in",
      },
      isPopular: false,
    },
    {
      name: "Pro",
      description: "For growing brands",
      price: 0,
      features: [
        "Unlimited Links",
        "Advanced Analytics",
        "Custom Domains",
        "Priority Email Support",
      ],
      button: {
        title: "Go Pro Now",
        to: "/sign-in",
      },
      isPopular: true,
    },
    {
      name: "Pro",
      description: "For growing brands",
      price: 0,
      features: [
        "Full API Access",
        "SLA & Dedicated Rep",
        "Custom Security Policies",
        "24/7 Phone Support",
      ],
      button: {
        title: " Contact Sales",
        to: "/sign-in",
      },
      isPopular: false,
    },
  ];

  return (
    <section
      className="relative overflow-hidden px-6 py-16 sm:py-24"
      id="pricing"
    >
      <div className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"></div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <h2 className=" mb-4 text-2xl sm:text-4xl font-extrabold md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Choose the perfect plan for your link management needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {priceList.map((data) => (
            <PricingCard data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
