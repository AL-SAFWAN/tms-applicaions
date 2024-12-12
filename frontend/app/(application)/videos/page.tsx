"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Filter, Video } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

type Video = {
  id: number;
  title: string;
  description: string;
  beltLevel: "white" | "blue" | "purple" | "brown" | "black";
  techniqueType: string;
  thumbnailUrl: string;
  duration: string;
  discipline: "BJJ" | "Wrestling";
};

const techniqueTypes = [
  "Transitions",
  "Takedowns",
  "Escapes",
  "Tilts",
  "Counter Attacks",
  "Controls",
  "Pins",
  "Turns",
  "Throws",
];

const beltLevels = ["white", "blue", "purple", "brown", "black"];
const disciplines = ["BJJ", "Wrestling"];

export default function VideoLibrary() {
  const [selectedBeltLevel, setSelectedBeltLevel] = useState<string>("");
  const [selectedTechniqueType, setSelectedTechniqueType] =
    useState<string>("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const videos: Video[] = [
    {
      id: 1,
      title: "Basic Arm Bar from Guard",
      description:
        "Learn the fundamental technique for executing an arm bar from the guard position.",
      beltLevel: "white",
      techniqueType: "Transitions",
      thumbnailUrl: "",
      duration: "5:30",
      discipline: "BJJ",
    },
    {
      id: 2,
      title: "Advanced Butterfly Guard Sweeps",
      description:
        "Master multiple sweeps from the butterfly guard to improve your bottom game.",
      beltLevel: "purple",
      techniqueType: "Transitions",
      thumbnailUrl: "",
      duration: "12:45",
      discipline: "BJJ",
    },
    {
      id: 3,
      title: "Wrestling Blast Double Leg Takedown",
      description:
        "Perfect your double leg takedown technique with this detailed instructional video.",
      beltLevel: "blue",
      techniqueType: "Takedowns",
      thumbnailUrl: "",
      duration: "8:15",
      discipline: "Wrestling",
    },
    {
      id: 4,
      title: "Escaping Side Control",
      description:
        "Learn multiple techniques to escape from the bottom side control position.",
      beltLevel: "white",
      techniqueType: "Escapes",
      thumbnailUrl: "",
      duration: "10:00",
      discipline: "BJJ",
    },
    {
      id: 5,
      title: "Advanced Leg Lock Entries",
      description:
        "Discover innovative ways to enter leg lock positions from various scenarios.",
      beltLevel: "brown",
      techniqueType: "Transitions",
      thumbnailUrl: "",
      duration: "15:20",
      discipline: "BJJ",
    },
    {
      id: 6,
      title: "Wrestling Ankle Pick Takedown",
      description:
        "Learn the effective ankle pick takedown technique used in freestyle wrestling.",
      beltLevel: "blue",
      techniqueType: "Takedowns",
      thumbnailUrl: "",
      duration: "7:45",
      discipline: "Wrestling",
    },
    // Add more video objects here...
  ];

  const filteredVideos = videos.filter((video) => {
    const beltLevelMatch =
      !selectedBeltLevel || video.beltLevel === selectedBeltLevel;
    const techniqueTypeMatch =
      !selectedTechniqueType || video.techniqueType === selectedTechniqueType;
    const disciplineMatch =
      !selectedDiscipline || video.discipline === selectedDiscipline;
    const searchMatch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return (
      beltLevelMatch && techniqueTypeMatch && disciplineMatch && searchMatch
    );
  });

  return (
    <ScrollArea className="overflow-y-auto">
      <div className="container flex h-screen flex-col px-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Select
              value={selectedDiscipline}
              onValueChange={(value) => setSelectedDiscipline(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Discipline" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value=" ">All Disciplines</SelectItem> */}
                {disciplines.map((discipline) => (
                  <SelectItem key={discipline} value={discipline}>
                    {discipline}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedBeltLevel}
              onValueChange={(value) => setSelectedBeltLevel(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Belt Level" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All Levels</SelectItem> */}
                {beltLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)} Belt
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedTechniqueType}
              onValueChange={(value) => setSelectedTechniqueType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Technique Type" />
              </SelectTrigger>
              <SelectContent>
                {techniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setSelectedBeltLevel("");
                setSelectedDiscipline("");
                setSelectedTechniqueType("");
              }}
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative">
                {/* <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                /> */}
                <div className="mb-4 flex aspect-video items-center justify-center bg-muted">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-75 px-2 py-1 text-white">
                  {video.duration}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{video.title}</span>
                  <Button variant="ghost" size="icon">
                    <PlayCircle className="h-6 w-6" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {video.description}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {video.beltLevel}{" "}
                    {video.discipline === "BJJ" ? "Belt" : "Award"}
                  </Badge>
                  <Badge
                    variant="default"
                    className={
                      video.discipline === "BJJ"
                        ? "bg-blue-500 dark:bg-blue-800"
                        : "bg-red-500 dark:bg-red-800"
                    }
                  >
                    {video.discipline}
                  </Badge>

                  <Badge variant="outline">{video.techniqueType}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-xl text-muted-foreground">
              No videos found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
