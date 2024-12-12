"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DropdownProps } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Memoized Icon Components
const IconLeft = React.memo(function IconLeft(props) {
  return <ChevronLeft className="h-4 w-4" {...props} />;
});

const IconRight = React.memo(function IconRight(props) {
  return <ChevronRight className="h-4 w-4" {...props} />;
});

// Memoized Dropdown Component
const Dropdown = React.memo(function Dropdown({
  value,
  onChange,
  children,
  ...props
}: DropdownProps) {
  console.log("hello");
  const options = React.Children.toArray(children) as React.ReactElement<
    React.HTMLProps<HTMLOptionElement>
  >[];
  const selected = options.find((child) => child.props.value === value);
  const handleChange = (value: string) => {
    const changeEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(changeEvent);
  };
  return (
    <Select
      value={value?.toString()}
      onValueChange={(value) => {
        handleChange(value);
      }}
    >
      <SelectTrigger className="pr-2 focus:ring-0">
        <SelectValue>{selected?.props?.children}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        <ScrollArea className="h-64">
          {options.map((option) => (
            <SelectItem
              key={option.props.value?.toString() ?? ""}
              value={option.props.value?.toString() ?? ""}
            >
              {option.props.children}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
});

// Memoized Calendar Component
const Calendar = React.memo(function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // Memoize the components
  const memoizedComponents = React.useMemo(
    () => ({
      Dropdown,
      IconLeft,
      IconRight,
    }),
    [],
  );

  // Memoize the classNames
  const memoizedClassNames = React.useMemo(
    () => ({
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      vhidden: "vhidden hidden",
      caption: "flex justify-center pt-1 relative items-center",
      caption_label: "text-sm font-medium",
      caption_dropdowns: cn(
        "flex justify-between gap-2",
        props.captionLayout === "dropdown" && "w-full",
      ),
      nav: "space-x-1 flex items-center",
      nav_button: cn(
        buttonVariants({ variant: "outline" }),
        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
      ),
      nav_button_previous: "absolute left-1",
      nav_button_next: "absolute right-1",
      table: "w-full border-collapse space-y-1",
      head_row: "flex",
      head_cell:
        "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] mx-[2px]",
      row: "flex w-full mt-1 first:justify-end rounded-md",
      cell: "mx-[2px] text-center text-sm p-0 relative rounded-md [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
      day: cn(
        buttonVariants({ variant: "ghost" }),
        "h-9 w-9 p-0  font-normal aria-selected:opacity-100",
      ),
      day_selected:
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
      day_today: "bg-accent text-accent-foreground",
      day_outside: "text-muted-foreground opacity-50",
      day_disabled: "text-muted-foreground opacity-50",
      day_range_middle:
        "aria-selected:bg-accent aria-selected:text-accent-foreground",
      day_hidden: "invisible",
      ...classNames,
    }),
    [classNames],
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={memoizedClassNames}
      components={memoizedComponents}
      {...props}
    />
  );
});

export { Calendar };
