"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  PlayCircle,
  FileText,
  HelpCircle,
  ChevronLeft,
  Star,
  InfoIcon,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
type Module = {
  id: number;
  title: string;
  lessons: Lesson[];
};

type Lesson = {
  id: number;
  title: string;
  type: "video" | "quiz";
  completed: boolean;
};
const learningObjectives = [
  "Understand and execute the High C technique",
  "Master the Double Leg takedown",
  "Perform various Single Leg techniques and transitions",
  "Apply counter-attack strategies effectively",
  "Execute tilts and escapes proficiently",
];
const data = {
  title: "Wrestling Blue Award",
  content: [
    {
      Technique: "High C",
      videos: 1,
      lessons: [
        {
          Type: "Transitions",
          Variation: [
            "Elbow Tie ‘Big Chest’",
            "Post to Pop and Go",
            "Reverse Collar to High",
          ],
        },
      ],
    },
    {
      Technique: "Double Leg",
      videos: 1,
      lessons: [
        {
          Type: "Takedowns",
          Variation: ["Blast Double", "Missdirection Double Leg"],
        },
      ],
    },
    {
      Technique: "Single Leg",
      vidoes: 2,
      lessons: [
        {
          Type: "Takedowns",
          Variation: [
            "Run the Pipe - Knee Tap Front",
            "Run the Pipe - Knee Tap Back",
            "Whip Down Back Double",
            "Fork Lift Takedown",
            "Run the Pipe Finish",
            "Flare Double",
            "High Leg Sweep",
            "High Leg Sweep Inside",
          ],
        },
        {
          Type: "Transitions",
          Variation: ["Snatch from Pressure", "Crack Down from Heavy Sprawl"],
        },
        {
          Type: "Escapes",
          Variation: ["Crossface Sprawl with Superman", "Superman Escape"],
        },
        {
          Type: "Tilts",
          Variation: ["Crack Down Roll"],
        },
        {
          Type: "Counter Attacks",
          Variation: ["Chin Strap Trip", "Single Leg Shotgun"],
        },
      ],
    },
    {
      Technique: "Front Headlock",
      lessons: [
        {
          Type: "Controls",
          Variation: [
            "Capturing Same Side Headlock",
            "Capturing Opposite Side Headlock",
            "Capturing Leap and Capture Headlock",
            "Capturing Fake Single to Headlock",
          ],
        },
        {
          Type: "Transitions",
          Variation: [
            "Push and Release Back Take",
            "Drag Out - Back Take",
            "Drag Out - Inside Knee Block",
          ],
        },
        {
          Type: "Tilts",
          Variation: ["Knee Tap"],
        },
        {
          Type: "Pins",
          Variation: ["Cement Mixer"],
        },
        {
          Type: "Turns",
          Variation: ["Gator Roll"],
        },
      ],
    },
    {
      Technique: "Arms Drags",
      lessons: [
        {
          Type: "Transitions",
          Variation: [
            "Rolling Arm Drag - Drag to Re-Drag",
            "Rolling Arm Drag - Chase the Waist",
            "Rolling Arm Drag - Snatch Single - Head Outside, Step Inside",
            "Slap Drag - Drag to Re-Drag",
            "Slap Drag - Chase the Waist",
            "Slap Drag - Snatch Single",
          ],
        },
      ],
    },
    {
      Technique: "Duck Under",
      lessons: [
        {
          Type: "Transitions",
          Variation: ["Duck Under To Back Trip"],
        },
        {
          Type: "Pins",
          Variation: ["Duck Under to Turk"],
        },
        {
          Type: "Takedowns",
          Variation: ["Duck Under - Claw Hand Takedown"],
        },
      ],
    },
    {
      Technique: "Tripod",
      lessons: [
        {
          Type: "Counter Attacks",
          Variation: ["Knee Shield - Back Take"],
        },
        {
          Type: "Transitions",
          Variation: ["Peak Out"],
        },
      ],
    },
    {
      Technique: "2 on 1",
      lessons: [
        {
          Type: "Controls",
          Variation: [
            "2 on 1 Control",
            "Tradtional Tie",
            "Figure 4 Tie",
            "Elbow Pull Reversal",
          ],
        },
        {
          Type: "Takedowns",
          Variation: [
            "Snap Down to Back Take - Fig 4 Lock",
            "High Arm Whip Down",
          ],
        },
        {
          Type: "Transitions",
          Variation: ["Snatch Single"],
        },
        {
          Type: "Escapes",
          Variation: ["Head Post To Whip"],
        },
      ],
    },
    {
      Technique: "Head and Arm",
      lessons: [
        {
          Type: "Throws",
          Variation: ["Snag", "Traditional"],
        },
      ],
    },
    {
      Technique: "Cradle",
      lessons: [
        {
          Type: "Pins",
          Variation: ["Near Side High Leg", "Far Side", "Stack"],
        },
      ],
    },
    {
      Technique: "Whizzer",
      lessons: [
        {
          Type: "Throws",
          Variation: ["Inside Leg Block", "Outside Leg Block"],
        },
      ],
    },
    {
      Technique: "Nelsons",
      lessons: [
        {
          Type: "Pins",
          Variation: ["½ Nelson Turn", "Clutchko"],
        },
      ],
    },
    {
      Technique: "Arm Turn",
      lessons: [
        {
          Type: "Pins",
          Variation: [
            "Arm Bar Turn - Standard",
            "Arm Bar Turn - Elbow to Elbow",
            "Arm Bar Turn - Cross Face",
            "Arm Lock Turn",
          ],
        },
      ],
    },
    {
      Technique: "Back Take",
      lessons: [
        {
          Type: "Turns",
          Variation: ["2 on 1 Ankle"],
        },
      ],
    },
  ],
};

export default function Page() {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [objectiveRatings, setObjectiveRatings] = useState(
    learningObjectives.map(() => 0),
  );

  const handleRatingChange = (objectiveIndex: number, rating: number) => {
    console.log(rating);
    setObjectiveRatings((prevRatings) => {
      const newRatings = [...prevRatings];

      newRatings[objectiveIndex] = rating;
      if (rating === 1) {
        const oldRating = [...prevRatings][objectiveIndex];
        if (oldRating == 1) {
          newRatings[objectiveIndex] = 0;
        } else {
          newRatings[objectiveIndex] = 1;
        }
      }
      return newRatings;
    });
  };
  const modules: Module[] = [
    {
      id: 1,
      title: "Introduction to Freestyle Wrestling",
      lessons: [
        {
          id: 1,
          title: "Welcome to the Course",
          type: "video",
          completed: false,
        },
        {
          id: 2,
          title: "History of Freestyle Wrestling",
          type: "video",
          completed: false,
        },
        {
          id: 3,
          title: "Basic Rules and Scoring",
          type: "video",
          completed: false,
        },
        { id: 4, title: "Module 1 Quiz", type: "quiz", completed: false },
      ],
    },
    {
      id: 2,
      title: "Stance and Movement",
      lessons: [
        {
          id: 1,
          title: "Proper Wrestling Stance",
          type: "video",
          completed: false,
        },
        { id: 2, title: "Footwork Drills", type: "video", completed: false },
        {
          id: 3,
          title: "Common Stance Mistakes",
          type: "video",
          completed: false,
        },
        { id: 4, title: "Module 2 Quiz", type: "quiz", completed: false },
      ],
    },
    // Add more modules here...
  ];

  const calculateProgress = () => {
    const totalLessons = modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0,
    );
    const completedLessons = modules.reduce(
      (sum, module) =>
        sum + module.lessons.filter((lesson) => lesson.completed).length,
      0,
    );
    return (completedLessons / totalLessons) * 100;
  };

  const markLessonComplete = () => {
    const updatedModules = [...modules];
    updatedModules[currentModule].lessons[currentLesson].completed = true;
    // In a real application, you would update the state and possibly send this information to a backend
  };

  return (
    <ScrollArea className="h-screen px-4 py-8">
      <div className="container mx-auto flex flex-col">
        <div className="mb-8 space-y-2">
          <Link href={"/courses/11"} className=" ">
            <Button variant="link" className="h-fit p-0">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Course Overview
            </Button>
          </Link>

          <h1 className="py-1 text-4xl font-bold">Wrestling Blue Award</h1>

          <div className="flex items-center space-x-4">
            <Badge variant={"secondary"}>Blue Award</Badge>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span className="text-sm">4 hours of content</span>
            </div>
            <div className="flex items-center">
              <Award className="mr-1 h-4 w-4" />
              <span className="text-sm">Certificate upon completion</span>
            </div>
          </div>
        </div>
        <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="h-fit">
              <Tabs defaultValue="content" className="">
                <CardHeader className="space-y-5">
                  <CardTitle>
                    {modules[currentModule].lessons[currentLesson].title}
                  </CardTitle>
                  <TabsList className="w-fit">
                    <TabsTrigger value="content">Lesson Content</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    {/* <TabsTrigger value="discussion">Discussion</TabsTrigger> */}
                  </TabsList>
                </CardHeader>
                <CardContent>
                  <TabsContent value="content">
                    {modules[currentModule].lessons[currentLesson].type ===
                    "video" ? (
                      <div className="aspect-video rounded-lg bg-black">
                        {/* Replace with actual video player */}
                        <div className="flex h-full items-center justify-center text-white">
                          Video Player Placeholder
                        </div>
                      </div>
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle>Quiz</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {/* Replace with actual quiz component */}
                          <p>Quiz content goes here...</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  <TabsContent value="resources">
                    <Card>
                      <CardHeader>
                        <CardTitle>Lesson Resources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>Lesson Transcript</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>Supplementary Reading Material</span>
                          </li>
                          {/* Add more resources as needed */}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  {/* <TabsContent value="discussion">
                    <Card>
                      <CardHeader>
                        <CardTitle>Lesson Discussion</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Discussion forum for this lesson goes here...</p>
                      </CardContent>
                    </Card>
                  </TabsContent> */}
                  <div className="mt-4 flex w-full justify-between">
                    <Button
                      onClick={() => {
                        if (currentLesson > 0) {
                          setCurrentLesson(currentLesson - 1);
                        } else if (currentModule > 0) {
                          setCurrentModule(currentModule - 1);
                          setCurrentLesson(
                            modules[currentModule - 1].lessons.length - 1,
                          );
                        }
                      }}
                      disabled={currentModule === 0 && currentLesson === 0}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous Lesson
                    </Button>
                    <Button
                      onClick={() => {
                        markLessonComplete();
                        if (
                          currentLesson <
                          modules[currentModule].lessons.length - 1
                        ) {
                          setCurrentLesson(currentLesson + 1);
                        } else if (currentModule < modules.length - 1) {
                          setCurrentModule(currentModule + 1);
                          setCurrentLesson(0);
                        }
                      }}
                    >
                      {currentModule === modules.length - 1 &&
                      currentLesson ===
                        modules[currentModule].lessons.length - 1
                        ? "Finish Course"
                        : "Next Lesson"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Tabs>
            </Card>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 text-sm">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Student"
                      />
                      <AvatarFallback>S1</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <p className="font-semibold">Student1</p>
                      <p>
                        Great lesson! I have a question about the proper hand
                        placement during a takedown. Can anyone clarify?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Instructor"
                      />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <p className="font-semibold">John Smith (Instructor)</p>
                      <p>
                        Excellent question! When executing a takedown, your
                        hands should...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col">
                  <Textarea
                    placeholder="Add to the discussion..."
                    className="mb-2"
                  />
                  <Button size={"sm"} className="w-fit self-end">
                    Post Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6 lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={calculateProgress()} className="" />
                <p className="mb-4 ml-1 mt-1 text-sm text-muted-foreground">
                  {Math.round(calculateProgress())}% complete
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lessons Completed</span>
                    <span className="font-semibold">
                      {10} of {20}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Time Left</span>
                    <span className="font-semibold">{2 / 10} hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {modules.map((module, index) => (
                    <ul className="space-y-1" key={module.id}>
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lesson.id}
                          className={`flex cursor-pointer items-center space-x-2 rounded p-2 ${
                            currentModule === index &&
                            currentLesson === lessonIndex
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-secondary"
                          }`}
                          onClick={() => {
                            setCurrentModule(index);
                            setCurrentLesson(lessonIndex);
                          }}
                        >
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : lesson.type === "video" ? (
                            <PlayCircle className="h-4 w-4" />
                          ) : (
                            <HelpCircle className="h-4 w-4" />
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-baseline space-x-2">
                    <div>Learning Objectives</div>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="size-4">Hover</InfoIcon>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="w-80 rounded-md bg-muted p-3 text-secondary-foreground"
                        >
                          <span className="text-sm">
                            Rate your level of understanding for the technique,
                            this can allow coach to assess and provide focus in
                            class to tailor for overall improvement
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {learningObjectives.map((objective, index) => (
                  <div
                    key={index}
                    className="flex items-baseline justify-between text-sm"
                  >
                    <p className="mb-2 pr-2">
                      {index + 1}) {objective}
                    </p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 cursor-pointer ${
                            star <= objectiveRatings[index]
                              ? "fill-current text-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleRatingChange(index, star)}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex justify-between text-sm">
                  <span>Total Score</span>
                  <span className="font-semibold">
                    {objectiveRatings.reduce((p, c) => p + c, 0)}
                    {" of "}
                    {objectiveRatings.length * 5}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ScrollArea>
  );
}
