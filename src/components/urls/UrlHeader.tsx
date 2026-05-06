import { useState } from "react";
import { Button } from "../ui/button";
import { Download, Funnel } from "lucide-react";
import AddNewUrl from "./AddNewUrl";

const UrlHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-end justify-between">
      <div>
        <h3 className="text-on-surface text-2xl font-bold">Recent Activity</h3>
        <p className="text-on-surface-variant text-sm">
          Managing 1,284 active redirects
        </p>
      </div>
      <div className="flex gap-2">
        <Button size={"lg"} variant={"outline"} className="rounded-full">
          <Funnel />
          Filter
        </Button>
        <Button size={"lg"} variant={"outline"} className="rounded-full">
          <Download />
          Export
        </Button>
        <Button size={'lg'} onClick={() => setIsOpen(true)}>Add New</Button>
      </div>
      <AddNewUrl isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default UrlHeader;
