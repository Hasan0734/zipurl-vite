import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useDotButton,
  CarouselDtoButton,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChartScatterIcon } from "lucide-react";
import  { useState, useEffect } from "react";

const FeatureCard = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { onDotButtonClick } = useDotButton(api);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const CHUNK_SIZE = 5;
  const currentChunk = Math.floor(current / CHUNK_SIZE);

  const start = currentChunk * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, count);
  const visibleDots = Array.from({ length: count }).slice(start, end);

  return (
    <div className="flex min-h-75 flex-col justify-between rounded-xl bg-[#091328] p-10 md:col-span-8">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          duration: 60,
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <div>
                <div>
                  <span>
                    <ChartScatterIcon size={26} className="mb-6 text-primary" />
                  </span>
                  <h3 className="text-on-surface mb-4 text-3xl font-bold">
                    Advanced Analytics
                  </h3>
                  <p className="text-on-surface-variant text-lg">
                    Track every click in real-time. Understand your audience
                    with detailed geographical, device, and referral data
                    insights.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex gap-2">
        {visibleDots.map((_, index) => {
          const actualIndex = start + index;
          const isActive = actualIndex === current;
          return (
            <CarouselDtoButton
              key={index}
              onClick={() => onDotButtonClick(actualIndex)}
              isActive={isActive}
              activeClass="bg-primary w-12"
              className={"w-5 h-2.5 border-0"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeatureCard;
