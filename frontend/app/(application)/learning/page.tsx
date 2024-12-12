"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Users, Search, Filter, ImageIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
const courses = [
  {
    id: 1,
    title: "Freestyle Wrestling Fundamentals",
    instructor: "John Smith",
    level: "Beginner",
    duration: "10 hours",
    students: 1234,
    rating: 4.8,
    price: 99.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Advanced Greco-Roman Techniques",
    instructor: "Alexander Karelin",
    level: "Advanced",
    duration: "15 hours",
    students: 856,
    rating: 4.9,
    price: 129.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Folkstyle Wrestling Mastery",
    instructor: "Cael Sanderson",
    level: "Intermediate",
    duration: "12 hours",
    students: 1023,
    rating: 4.7,
    price: 109.99,
    image: "/placeholder.svg?height=200&width=300",
  },
];
export default function page() {
  return (
    <div className="container flex h-screen flex-col">
      <div className="flex min-h-0 flex-grow flex-col">
        <ScrollArea className="overflow-y-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="h-fit">
                {/* <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            /> */}
                <div className="mb-4 flex aspect-video items-center justify-center bg-muted">
                  <ImageIcon className="size-12 text-muted-foreground" />
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>

                  <CardDescription className="flex items-center space-x-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`/placeholder.svg?height=24&width=24`}
                        alt={course.instructor}
                      />
                      <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                    </Avatar>
                    <span>{course.instructor}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  <div className="mb-2 flex items-center">
                    <Star className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="mr-1 font-semibold">{course.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({course.students} students)
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="flex w-full flex-col">
                    <Progress value={33} className="mb-2" />
                    <p className="mb-4 text-sm text-muted-foreground">
                      3 of 10 modules completed
                    </p>
                  </div>
                  <Button className="mt-4 self-end">Continue Learning</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
