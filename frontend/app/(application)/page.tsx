"use client";

import React from "react";

import {
  Bell,
  Calendar,
  ChevronRight,
  GraduationCap,
  Clock,
  BarChart,
  Flame,
  Video,
  X,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {
  console.log("Hello from the home page!");
  const enrolledCourses = [
    { id: 1, title: "BJJ Fundamentals", progress: 60, type: "bjj" },
    { id: 2, title: "Wrestling Takedowns", progress: 30, type: "wrestling" },
    { id: 3, title: "Advanced Guard Techniques", progress: 15, type: "bjj" },
  ];

  const recentTrainingSessions = [
    {
      id: 1,
      type: "BJJ",
      duration: "1h 30m",
      date: "2023-06-15",
      partner: "Alex",
    },
    {
      id: 2,
      type: "Wrestling",
      duration: "1h",
      date: "2023-06-13",
      partner: "Sam",
    },
    {
      id: 3,
      type: "BJJ",
      duration: "2h",
      date: "2023-06-11",
      partner: "Chris",
    },
  ];

  const skillsProgress = [
    { id: 1, name: "Takedowns", progress: 65 },
    { id: 2, name: "Submissions", progress: 80 },
    { id: 3, name: "Guard Passing", progress: 45 },
    { id: 4, name: "Escapes", progress: 70 },
  ];

  const notifications = [
    {
      id: 1,
      message: "Today's evening class is canceled due to maintenance.",
    },
  ];

  const currentModule = {
    title: "Closed Guard Fundamentals",
    description:
      "This week we're focusing on closed guard techniques and strategies.",
    progress: 40,
  };

  return (
    <div className="container">
      {/* <h1 className="mb-8 text-4xl font-bold">Home</h1> */}

      <div className="flex min-h-0 flex-grow flex-col">
        <ScrollArea className="overflow-y-auto px-4">
          <div className="space-y-6">
            <Alert variant={"default"}>
              <Bell className="mr-2 h-4 w-4" />
              <AlertTitle className="mb-2 flex items-center">
                Notification
              </AlertTitle>

              {notifications.map((notification) => (
                <AlertDescription
                  className="flex items-center justify-between"
                  key={notification.id}
                >
                  {notification.message}
                  <Button variant="ghost" size="xs">
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDescription>
              ))}
            </Alert>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Welcome back, Grappler!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>
                    Keep up the great work! You&apos;re making progress.
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="flex flex-col space-y-2">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {course.progress}% complete
                        </span>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Current Curriculum Module</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-4">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {currentModule.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentModule.description}
                    </p>
                  </div>
                </div>
                <Progress value={currentModule.progress} className="mb-2 h-2" />
                <p className="text-sm text-muted-foreground">
                  {currentModule.progress}% of module completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">BJJ Open Mat</h4>
                      <p className="text-sm text-muted-foreground">
                        Saturday, 2:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-red-500" />
                    <div>
                      <h4 className="font-semibold">
                        Local Wrestling Tournament
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Next Sunday, 9:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Training Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrainingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center space-x-4"
                    >
                      <Clock
                        className={`h-5 w-5 ${
                          session.type === "BJJ"
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {session.type} Session
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {session.duration} with {session.partner} on{" "}
                          {session.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full">Log New Session</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsProgress.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {skill.progress}%
                        </span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex flex-row items-center">
                  Technique of the Week
                  <Badge className="ml-2 text-nowrap">BJJ NOGI</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-muted">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-semibold">Arm Bar from Guard</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Master this fundamental submission technique to improve your
                  BJJ game.
                </p>
                <Button className="w-full">Watch Tutorial</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-row items-center">
                  Technique of the Week
                  <Badge className="ml-2">WRESTLING</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-muted">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-semibold">Arm Drag </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Master this fundamental hand fighting technique to improve
                  your wrestling game.
                </p>
                <Button className="w-full">Watch Tutorial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-center">
                  <Flame className="h-12 w-12 text-orange-500" />
                  <span className="ml-2 text-4xl font-bold">7</span>
                </div>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  You&apos;ve trained for 7 days in a row! Keep up the momentum!
                </p>
                <div className="flex flex-wrap justify-center space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <Badge
                      key={day}
                      variant="secondary"
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
