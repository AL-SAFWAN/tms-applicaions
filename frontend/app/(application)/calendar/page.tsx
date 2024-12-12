"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Users,
  GraduationCap,
  Swords,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Event = {
  id: number;
  title: string;
  date: Date;
  type: "competition" | "in-house" | "grading" | "seminar";
  location: string;
  time: string;
  description: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Local BJJ Tournament",
    date: new Date(2024, 5, 15),
    type: "competition",
    location: "City Sports Arena",
    time: "9:00 AM - 5:00 PM",
    description:
      "Annual local BJJ tournament for all belt levels. Registration required.",
  },
  {
    id: 2,
    title: "In-House BJJ Competition",
    date: new Date(2024, 6, 1),
    type: "in-house",
    location: "Grappling Academy Main Dojo",
    time: "2:00 PM - 6:00 PM",
    description:
      "Friendly in-house competition for academy members. All levels welcome.",
  },
  {
    id: 3,
    title: "Summer Belt Grading",
    date: new Date(2024, 7, 10),
    type: "grading",
    location: "Grappling Academy Main Dojo",
    time: "10:00 AM - 1:00 PM",
    description:
      "Bi-annual belt grading for eligible students. By invitation only.",
  },
  {
    id: 4,
    title: "Wrestling Seminar with Olympic Champion",
    date: new Date(2024, 8, 5),
    type: "seminar",
    location: "Grappling Academy Wrestling Room",
    time: "1:00 PM - 4:00 PM",
    description:
      "Special wrestling seminar featuring an Olympic gold medalist. Limited spots available.",
  },
  {
    id: 5,
    title: "Kids BJJ Tournament",
    date: new Date(2024, 9, 20),
    type: "competition",
    location: "Youth Sports Center",
    time: "10:00 AM - 3:00 PM",
    description: "BJJ tournament for kids and teens. Age groups from 6 to 16.",
  },
];

const eventTypeIcons = {
  competition: <Trophy className="size-4" />,
  "in-house": <Users className="size-4" />,
  grading: <GraduationCap className="size-4" />,
  seminar: <Swords className="size-4" />,
};

const eventTypeColors = {
  competition: "bg-red-500",
  "in-house": "bg-green-500",
  grading: "bg-blue-500",
  seminar: "bg-purple-500",
};

export default function CalendarScheduler() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedEventType, setSelectedEventType] = useState<
    string | undefined
  >("");
  const [view, setView] = useState<"day" | "week" | "month" | "year">("month");

  const filteredEvents = events.filter((event) => {
    let eventDate = event.date;
    let dateMatch = true;

    if (selectedDate) {
      switch (view) {
        case "day":
        case "month":
        case "week":
          dateMatch = eventDate.toDateString() === selectedDate.toDateString();
          break;

        case "month":
          dateMatch =
            eventDate.getMonth() === selectedDate.getMonth() &&
            eventDate.getFullYear() === selectedDate.getFullYear();
          break;
        default:
          dateMatch = true;
      }
    }
    const typeMatch = selectedEventType
      ? event.type === selectedEventType
      : true;
    return dateMatch && typeMatch;
  });

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString(),
    );
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysInMonth.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysInMonth.push(new Date(year, month, i));
    }

    return daysInMonth;
  };

  const getDaysInWeek = (date: Date) => {
    const week = [];
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      week.push(day);
    }

    return week;
  };

  const getMonthsInYear = (date: Date) => {
    const year = date.getFullYear();
    return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  };

  const renderDayView = () => (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>
    //       {currentDate.toLocaleDateString(undefined, {
    //         weekday: "long",
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //       })}
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent>
    <ScrollArea className="max-h-[calc(100vh-200px)] min-h-96">
      {getEventsForDate(currentDate).length > 0 ? (
        getEventsForDate(currentDate).map((event) => (
          <EventItem key={event.id} event={event} />
        ))
      ) : (
        <p className="p-2 text-center text-muted-foreground">
          No events scheduled for this day.
        </p>
      )}
    </ScrollArea>
    // </CardContent>
    // </Card>
  );

  const renderWeekView = () => (
    <div className="grid grid-cols-7 pt-1">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="w-full p-2 pt-1 text-center font-semibold">
          {day}
        </div>
      ))}

      {getDaysInWeek(currentDate).map((date, index) => (
        <div className="flex w-full flex-col items-center pt-1" key={index}>
          <Card
            key={index}
            className={cn(
              "mt-1 w-full rounded-none p-2",
              {
                "rounded-l-md": index == 0,
              },
              {
                "rounded-r-md": index == getDaysInWeek(currentDate).length - 1,
              },
              {
                "z-10 rounded-sm ring-2 ring-primary":
                  selectedDate?.toDateString() === date?.toDateString(),
              },
            )}
            onClick={() => setSelectedDate(date)}
          >
            <CardTitle className="mb-2 w-fit text-sm">
              {date.toLocaleDateString(undefined, {
                // weekday: "short",
                day: "numeric",
              })}
            </CardTitle>
            <ScrollArea className="grid max-h-[calc(100vh-300px)] min-h-96">
              {getEventsForDate(date).map((event) => (
                <EventItem key={event.id} event={event} compact />
              ))}
            </ScrollArea>
          </Card>
        </div>
      ))}
    </div>
  );

  const renderMonthView = () => (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>
    //       {currentDate.toLocaleDateString(undefined, {
    //         month: "long",
    //         year: "numeric",
    //       })}
    //     </CardTitle>
    //   </CardHeader>
    // <CardContent>
    <div className="grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="p-2 text-center font-semibold">
          {day}
        </div>
      ))}
      {getDaysInMonth(currentDate).map((date, index) => (
        <Card
          key={index}
          className={`min-h-[100px] ${
            date && selectedDate?.toDateString() === date?.toDateString()
              ? "ring-2 ring-primary"
              : ""
          }`}
          onClick={() => setSelectedDate(date || undefined)}
        >
          {date && (
            <CardContent className="p-2">
              <div className="mb-1 font-semibold">{date.getDate()}</div>
              <ScrollArea className="h-[60px]">
                {getEventsForDate(date).map((event) => (
                  <EventItem key={event.id} event={event} compact />
                ))}
              </ScrollArea>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
    // </CardContent>
    // </Card>
  );

  const renderYearView = () => (
    <div className="grid grid-cols-3 gap-2 pt-12">
      {getMonthsInYear(currentDate).map((date, index) => (
        <Card
          key={index}
          className={`p-2 ${
            selectedDate?.getMonth() === date?.getMonth()
              ? "ring-2 ring-primary"
              : ""
          }`}
          onClick={() => setSelectedDate(date || undefined)}
        >
          <CardTitle className="mb-2 text-sm">
            {date.toLocaleDateString(undefined, { month: "long" })}
          </CardTitle>
          <ScrollArea className="h-[150px]">
            {events
              .filter(
                (event) =>
                  event.date.getMonth() === date.getMonth() &&
                  event.date.getFullYear() === date.getFullYear(),
              )
              .map((event) => (
                <EventItem key={event.id} event={event} compact />
              ))}
          </ScrollArea>
        </Card>
      ))}
    </div>
  );

  const EventItem = ({
    event,
    compact = true,
  }: {
    event: Event;
    compact?: boolean;
  }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`m-1 h-auto w-full justify-start p-1 ${
            compact ? "text-xs" : ""
          }`}
        >
          <Badge className={`mr-1 ${eventTypeColors[event.type]} `}>
            {eventTypeIcons[event.type]}
          </Badge>
          <span className="truncate">{event.title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <Badge className={`mr-2 ${eventTypeColors[event.type]}`}>
                  {eventTypeIcons[event.type]}
                </Badge>
                <span className="capitalize">{event.type}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {event.date.toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {event.location}
              </div>
              <p className="mt-4">{event.description}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
  return (
    <div className="container mx-auto flex h-screen flex-col px-12">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (view === "day") newDate.setDate(newDate.getDate() - 1);
                  else if (view === "week")
                    newDate.setDate(newDate.getDate() - 7);
                  else if (view === "month")
                    newDate.setMonth(newDate.getMonth() - 1);
                  else if (view === "year")
                    newDate.setFullYear(newDate.getFullYear() - 1);
                  setCurrentDate(newDate);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="mx-4 text-xl font-semibold">
                {view === "day" &&
                  currentDate.toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                {view === "week" &&
                  `${getDaysInWeek(currentDate)[0].toLocaleDateString(
                    undefined,
                    { month: "short", day: "numeric" },
                  )} -
                                     ${getDaysInWeek(
                                       currentDate,
                                     )[6].toLocaleDateString(undefined, {
                                       month: "short",
                                       day: "numeric",
                                       year: "numeric",
                                     })}`}
                {view === "month" &&
                  currentDate.toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                {view === "year" && currentDate.getFullYear()}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (view === "day") newDate.setDate(newDate.getDate() + 1);
                  else if (view === "week")
                    newDate.setDate(newDate.getDate() + 7);
                  else if (view === "month")
                    newDate.setMonth(newDate.getMonth() + 1);
                  else if (view === "year")
                    newDate.setFullYear(newDate.getFullYear() + 1);
                  setCurrentDate(newDate);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Tabs
              value={view}
              onValueChange={(value) =>
                setView(value as "day" | "week" | "month" | "year")
              }
            >
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {view === "day" && renderDayView()}
          {view === "week" && renderWeekView()}
          {view === "month" && renderMonthView()}
          {view === "year" && renderYearView()}
        </div>
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between space-x-4">
              <Select onValueChange={(value) => setSelectedEventType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by event type" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value={undefined}>All Events</SelectItem> */}
                  <SelectItem value="competition">Competitions</SelectItem>
                  <SelectItem value="in-house">In-House Events</SelectItem>
                  <SelectItem value="grading">Gradings</SelectItem>
                  <SelectItem value="seminar">Seminars</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  // setSelectedDate(undefined);
                  setSelectedEventType("");
                }}
              >
                Clear Filters
              </Button>
            </div>
            <ScrollArea className="max-h-[calc(100vh-300px)]">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventItem key={event.id} event={event} />
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No events found for the selected criteria.
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
