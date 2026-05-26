import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ArrowRight } from "lucide-react";

const CountryMapDialog = () => {
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

      <DialogContent className="bg-background max-w-3xl!">
        <DialogHeader>
          <DialogTitle>Counties based data</DialogTitle>
        </DialogHeader>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quos
        cupiditate at nesciunt recusandae vel asperiores enim pariatur illo
        consequatur doloremque nisi dolore corporis odit laborum, maxime
        expedita officia nihil!
      </DialogContent>
    </Dialog>
  );
};

export default CountryMapDialog;
