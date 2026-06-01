import type { UrlType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UrlAnalytics from "./UrlAnalytics";
import { ChartNoAxesCombined } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface PropsType {
  data: UrlType;
}
const UrlAnalyticsDialog = ({ data }: PropsType) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full flex justify-center cursor-pointer">
        <ChartNoAxesCombined size={20} />
      </DialogTrigger>

      <DialogContent showCloseButton className="max-w-7xl! bg-background pr-1">
        <DialogHeader>
          <DialogTitle>URL Analytics</DialogTitle>
          <DialogDescription>
            Let's see your url analytics. With a chart and list map for country.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="py-2 overflow-scroll max-h-[calc(100vh-100px)] pr-6">
          <UrlAnalytics data={data} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UrlAnalyticsDialog;
