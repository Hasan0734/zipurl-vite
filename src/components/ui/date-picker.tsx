import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Calendar } from "./calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  triggerClass?: string;
  iconClass?: string;
  onSelect: (date: Date) => void;
  date: Date | undefined;
}

const DatePicker = ({
  triggerClass,
  iconClass,
  onSelect,
  date,
}: DatePickerProps) => {
  // const [date, setDate] = useState<Date>();

  const handleDate = (dt: Date | undefined) => {
    if (!dt) return;
    // setDate(dt);
    onSelect(dt);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            " justify-start gap-3 font-normal data-[empty=true]:text-muted-foreground",
            triggerClass,
          )}
        >
          <CalendarIcon className={iconClass} />

          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDate}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
