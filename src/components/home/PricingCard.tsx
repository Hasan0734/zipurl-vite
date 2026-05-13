import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface PricingCardProps {
  data: {
    name: string;
    description: string;
    price: number;
    features: string[];
    button: {
      title: string;
      to: string;
    };
    isPopular?: boolean;
  };
}

const PricingCard = ({ data }: PricingCardProps) => {
  return (
    <div
      className={cn("bg-card relative rounded-xl p-5 sm:p-8", {
        " border-2 border-primary/50": data.isPopular,
      })}
    >
      {data.isPopular && (
        <div className="text-on-primary absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-black tracking-widest uppercase">
          Most Popular
        </div>
      )}

      <h3 className=" mb-2 text-xl font-bold">{data.name}</h3>
      <p className="text-muted-foreground mb-6 text-sm">{data.description}</p>
      <div className="mb-8">
        <span className=" text-4xl font-extrabold">${data.price}</span>
        <span className="text-muted-foreground">/mo</span>
      </div>
      <ul className="mb-10 space-y-4">
        {data.features.map((feature) => (
          <li
            key={feature}
            className="text-muted-foreground flex items-center gap-3 text-sm"
          >
            <CheckCircle className="text-primary" size={18} />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={cn(" w-full rounded-md border py-3 sm:py-4 sm:font-bold", {
          "bg-primary": data.isPopular,
        })}
      >
        {data.button.title}
      </button>
    </div>
  );
};

export default PricingCard;
