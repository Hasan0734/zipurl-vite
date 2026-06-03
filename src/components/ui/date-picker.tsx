import { CalendarIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Calendar } from "./calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { InputGroupAddon, InputGroupButton } from "./input-group";
import { useState } from "react";

interface DatePickerProps {
  triggerClass?: string;
  iconClass?: string;
  onSelect: (date: Date | undefined) => void;
  date: Date | undefined;
  clearButton?: boolean;
}

const DatePicker = ({
  triggerClass,
  iconClass,
  onSelect,
  clearButton,
  date,
}: DatePickerProps) => {
  // const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false)

  const handleDate = (dt: Date | undefined) => {
    if (!dt) return;
    // setDate(dt);
    const hoursDate = new Date(dt);
    hoursDate.setHours(23, 59, 59, 999);
    onSelect(hoursDate);
    setIsOpen(false)
  };
  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex items-center">
          <Button
            type="button"
            variant="outline"
            data-empty={!date}
            className={cn(
              " justify-between w-full gap-3 font-normal data-[empty=true]:text-muted-foreground items-center px-2",
              triggerClass,
            )}
          >
            <div className="flex gap-2">
              <CalendarIcon className={iconClass} />

              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </div>
          </Button>
          {clearButton && date && (
            <InputGroupAddon className="absolute right-0 " align="inline-end">
              <InputGroupButton
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(undefined);
                }}
                type="button"
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </div>
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
