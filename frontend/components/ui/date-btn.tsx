import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldError,
} from "react-hook-form";
import { BorderBeam } from "./border-mouse-beam";
import { useState } from "react";

export function DateInput({
  control,
  error,
}: {
  control: Control<any>;
  error?: FieldError;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Controller
      control={control}
      name="dateOfBirth"
      render={({ field }) => (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <BorderBeam
              divClassName="col-span-3"
              className={cn(
                "w-full justify-start",
                !field.value && "text-muted-foreground",
              )}
              error={error}
            >
              {field.value && `${format(field.value, "PPP")}`}
              <CalendarIcon className="ml-auto opacity-50" />
            </BorderBeam>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(selectedDate) => {
                setIsOpen(false);
                field.onChange(selectedDate?.toISOString().split("T")[0]);
              }}
              fromYear={1924}
              toYear={new Date().getFullYear()}
              disabled={(date) =>
                date > new Date() || date < new Date(1924, 0, 1)
              } // Disable invalid ranges
              defaultMonth={field.value ? new Date(field.value) : undefined}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
