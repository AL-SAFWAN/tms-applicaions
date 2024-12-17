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
  BicepsFlexed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/hooks/auth";

export default function Page() {
  const { data } = useUser();

  return (
    <div className="container">
      {/* <h1 className="mb-8 text-4xl font-bold">Home</h1> */}

      <div className="flex min-h-0 flex-grow flex-col">
        <ScrollArea className="overflow-y-auto px-4">
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO for normal request user  */}
            {/* <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Welcome back, {data?.firstName}!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
                  <BicepsFlexed className="h-4 w-4" />
                  <span>
                    Keep up the great work! You&apos;re making progress.
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="font-semibold">All tickets</h3>
                  <Progress value={10} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {10}% complete
                    </span>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Welcome back, {data?.firstName}!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
                  <BicepsFlexed className="h-4 w-4" />
                  <span>
                    Still waiting, no worries! We&apos;re making progress.
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="font-semibold">All tickets</h3>
                  <Progress value={10} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {10}% complete
                    </span>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-full">
              <CardHeader>
                <CardTitle className="flex flex-row items-center">
                  List of Tickets
                </CardTitle>
              </CardHeader>
              {/* TODO  add table here */}
              <CardContent>add table here</CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
