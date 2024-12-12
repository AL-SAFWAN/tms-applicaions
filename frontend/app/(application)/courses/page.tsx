"use client";
import React, { useState } from "react";

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
import {
  Star,
  Clock,
  Users,
  Search,
  Filter,
  Video,
  ImageIcon,
} from "lucide-react";
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
  {
    id: 4,
    title: "Wrestling Conditioning and Strength Training",
    instructor: "Jordan Burroughs",
    level: "All Levels",
    duration: "8 hours",
    students: 1567,
    rating: 4.6,
    price: 79.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Takedown Techniques for Beginners",
    instructor: "Kyle Dake",
    level: "Beginner",
    duration: "6 hours",
    students: 2103,
    rating: 4.5,
    price: 59.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Mental Preparation for Wrestling Competitions",
    instructor: "Helen Maroulis",
    level: "All Levels",
    duration: "5 hours",
    students: 789,
    rating: 4.8,
    price: 69.99,
    image: "/placeholder.svg?height=200&width=300",
  },
];
export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (levelFilter === "All" || course.level === levelFilter),
  );
  return (
    <ScrollArea className="overflow-y-auto">
      <div className="container flex h-screen flex-col px-12">
        <div className="mb-8 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div className="w-full flex-1 md:w-auto md:max-w-md">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* <Filter className="text-muted-foreground" /> */}
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              {/* <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            /> */}
              <div className="mb-4 flex aspect-video items-center justify-center bg-muted">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
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
              <CardContent className="flex-grow pb-0">
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
              <CardFooter className="flex items-center justify-end">
                {/* <span className="text-lg font-bold">
                ${course.price.toFixed(2)}
              </span> */}
                <Button>View Course</Button>
                {/* <Button>View</Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>{" "}
      </div>
    </ScrollArea>
  );
}
