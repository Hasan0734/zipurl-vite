import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ArrowRight } from "lucide-react";
import { Map, useMap } from "../ui/map";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

const CountryMapDialog = () => {
  const { data: geojson, isLoading } = useQuery({
    queryKey: ["countriesGeo"],
    queryFn: async () => {
        const res = await fetch("/countries.geojson");
        return await res.json()
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group mt-8 flex items-center gap-2 text-sm font-bold text-primary">
          View Detailed Map
          <span className=" transition-transform group-hover:translate-x-1">
            <ArrowRight />
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-background max-w-5xl!">
        <DialogHeader>
          <DialogTitle>Country Based Data</DialogTitle>
          <DialogDescription>
            This map showing the unique country clicks data and unique visitor.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[500px] w-full overflow-hidden">
          {!isLoading && (
            <Map
              className="rounded-lg overflow-hidden"
              zoom={0}
              maxZoom={0}
              attributionControl={false}
            >
              <CustomLayer geojson={geojson} />
            </Map>
          )}
          {isLoading && <Skeleton className="w-full h-full" />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountryMapDialog;

type CountryAnalytics = {
  country: string;
  visitors: number;
};

const analytics: CountryAnalytics[] = [
  { country: "Bangladesh", visitors: 2400 },
  { country: "India", visitors: 5200 },
  { country: "United States of America", visitors: 9000 },
  { country: "Pakistan", visitors: 1400 },
];

type HoverCountry = {
  name: string;
  visitors: number;
};

interface CustomLayerType {
  //   setIsLoading: Dispatch<SetStateAction<boolean>>;
  geojson: any;
}

function CustomLayer({ geojson }: CustomLayerType) {
  const { map, isLoaded } = useMap();
  const [hovered, setHovered] = useState<HoverCountry | null>(null);

  const loadCountries = useCallback(async () => {
    if (!map || !map.loaded() || !map.isStyleLoaded()) {
      return;
    }

    // const response = await fetch("/countries.geojson");
    // const geojson = await response.json();
    const mergedFeatures = geojson.features.map((feature: any) => {
      const matchedCountry = analytics.find(
        (c) => c.country === feature.properties.name,
      );

      return {
        ...feature,
        properties: {
          ...feature.properties,
          visitors: matchedCountry?.visitors || 0,
        },
      };
    });

    const data = {
      ...geojson,
      features: mergedFeatures,
    };

    if (!map.getSource("countries")) {
      map.addSource("countries", {
        type: "geojson",
        data,
      });
    }

    if (!map?.getLayer("countries-fill")) {
      map.addLayer({
        id: "countries-fill",
        type: "fill",
        source: "countries",

        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "visitors"],

            0,
            "#eff6ff00",
            1,
            "#10ba8195",
          ],

          "fill-opacity": 0.85,
        },
      });
    }

    if (map && !map?.getLayer("countries-outline")) {
      map.addLayer({
        id: "countries-outline",
        type: "line",
        source: "countries",
        paint: {
          "line-width": 0.5,
        },
      });
    }

    map.on("mouseenter", "countries-fill", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "countries-fill", () => {
      map.getCanvas().style.cursor = "";

      setHovered(null);
    });

    map.on("mousemove", "countries-fill", (e: any) => {
      const feature = e.features?.[0];

      if (!feature) return;

      setHovered({
        name: feature.properties.name,

        visitors: Number(feature.properties.visitors),
      });
    });
  }, [map]);

  useEffect(() => {
    if (!map || !isLoaded) return;

    loadCountries();
  }, [map, isLoaded]);

  return (
    <>
      {hovered && (
        <div
          className="absolute bottom-3 left-3 z-10 rounded-md border bg-background px-4 py-3 shadow
          "
        >
          <h3 className="font-semibold">{hovered.name}</h3>

          <p className="text-sm text-muted-foreground">
            Visitors: {hovered.visitors.toLocaleString()}
          </p>
        </div>
      )}
    </>
  );
}
