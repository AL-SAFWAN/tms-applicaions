"use client";
import * as React from "react";

import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  Users,
  BarChart,
  Star,
  PlayCircle,
  FileText,
  Download,
  CheckCircle,
  Award,
  Target,
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function Page() {
  const [isEnrolled, setIsEnrolled] = React.useState(false);
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
  return (
    <div className="flex h-screen w-full overflow-auto">
      {/* <div className="h-full w-96 border-r p-5"></div> */}
      <div className="w-full space-y-10">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="mb-4 text-4xl font-bold">{data.title}</h1>
                <p className="mb-4 text-xl text-muted-foreground">
                  Master the basics of freestyle wrestling and build a strong
                  foundation for advanced techniques.
                </p>

                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <Badge variant="secondary" className="text-sm">
                    Beginner
                  </Badge>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span className="text-sm">10 hours</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <span className="text-sm">1,234 students</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm">4.8 (256 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="mr-1 h-4 w-4" />
                    <span className="text-sm">Certificate of Completion</span>
                  </div>
                </div>

                <div className="mb-6 aspect-video">
                  <iframe
                    className="h-full w-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/r7FGWaRYQOA?si=dU2BZLXy9ZGXZxpJ"
                    title="Course Introduction"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <Tabs defaultValue="overview" className="mb-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        This comprehensive course covers all the fundamental
                        aspects of freestyle wrestling. You&apos;ll learn:
                      </p>
                      <ul className="mb-4 list-inside list-disc space-y-2">
                        <li>Basic stance and movement</li>
                        <li>Essential takedowns and throws</li>
                        <li>Defensive techniques and sprawls</li>
                        <li>Ground control and pin combinations</li>
                        <li>Strategy and match preparation</li>
                      </ul>
                      <p className="mb-4">
                        By the end of this course, you&apos;ll have a solid
                        understanding of freestyle wrestling techniques and be
                        prepared to compete at a beginner level.
                      </p>
                      <h3 className="mb-2 text-xl font-semibold">
                        What you&apos;ll learn:
                      </h3>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {[
                          "Proper wrestling stance and movement",
                          "Basic takedown techniques",
                          "Effective defensive strategies",
                          "Ground control and pinning methods",
                          "Rules and regulations of freestyle wrestling",
                          "Mental preparation for competitions",
                        ].map((item, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="curriculum">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Curriculum</CardTitle>
                      <CardDescription>
                        10 modules • 50 lessons • 10 hours total length
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {data.content.map((module, index) => (
                          <AccordionItem
                            key={index}
                            value={`module-${index + 1}`}
                          >
                            <AccordionTrigger>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                  {index + 1}.
                                </span>
                                <span>{module.Technique}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ol className="list-inside list-decimal space-y-2 pl-6">
                                {module.lessons.map((lesson, index) => {
                                  return lesson.Variation.map((v) => (
                                    <li key={index}>
                                      {v}

                                      <Badge
                                        variant={"secondary"}
                                        className="ml-2 h-4 px-2 py-2 text-xs"
                                      >
                                        {" "}
                                        {lesson.Type}
                                      </Badge>
                                    </li>
                                  ));
                                })}
                                {/* <li>
                                  Introduction to{" "}
                                  {module.Technique.toLowerCase()}
                                </li>
                                <li>Key concepts and techniques</li>
                                <li>Practical demonstrations</li>
                                <li>Drill sessions and practice tips</li>
                                <li>Module quiz and review</li> */}
                              </ol>
                              <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <PlayCircle className="mr-1 h-4 w-4" />2 video
                                  lessons
                                </span>
                                <span className="flex items-center">
                                  <FileText className="mr-1 h-4 w-4" />3
                                  readings
                                </span>
                                <span className="flex items-center">
                                  <Download className="mr-1 h-4 w-4" />1
                                  downloadable resource
                                </span>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="instructor">
                  <Card>
                    <CardHeader>
                      <CardTitle>Meet Your Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-start space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                        <Avatar className="size-16 w-64">
                          <AvatarImage
                            src="/placeholder.svg?height=128&width=128"
                            alt="John Smith"
                          />
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="mb-2 text-2xl font-semibold">
                            Adam Saitiev
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            Olympic Gold Medalist, 4-time World Champion
                          </p>
                          <p className="mb-4">
                            John Smith is one of the most decorated freestyle
                            wrestlers in U.S. history. With 2 Olympic gold
                            medals and 4 World Championships, he brings
                            unparalleled expertise to this course. John has been
                            coaching for over 20 years and has developed
                            numerous national and international champions.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Olympic Champion",
                              "World Champion",
                              "NCAA Champion",
                              "Hall of Fame Inductee",
                            ].map((achievement, index) => (
                              <Badge key={index} variant="secondary">
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Reviews</CardTitle>
                      <CardDescription>
                        Average rating: 4.8 out of 5 stars (256 reviews)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          {
                            name: "Alex K.",
                            rating: 5,
                            comment:
                              "Excellent course for beginners. John's teaching style is clear and easy to follow. I've seen significant improvement in my technique since taking this course.",
                          },
                          {
                            name: "Sarah M.",
                            rating: 4,
                            comment:
                              "Great content, but I wish there were more practice drills included. Overall, it's a solid foundation for anyone looking to get into freestyle wrestling.",
                          },
                          {
                            name: "David L.",
                            rating: 5,
                            comment:
                              "This course gave me the confidence to start competing. The breakdown of techniques and strategies is incredibly helpful. Highly recommended for aspiring wrestlers!",
                          },
                        ].map((review, index) => (
                          <div
                            key={index}
                            className="border-b pb-4 last:border-b-0"
                          >
                            <div className="mb-2 flex items-center">
                              <Avatar className="mr-3 h-10 w-10">
                                <AvatarFallback>
                                  {review.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">{review.name}</h4>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p>{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {[
                      {
                        question: "Do I need any prior wrestling experience?",
                        answer:
                          "No prior experience is necessary. This course is designed for beginners and will cover all the fundamentals you need to get started in freestyle wrestling.",
                      },
                      {
                        question: "How long do I have access to the course?",
                        answer:
                          "Once enrolled, you have lifetime access to the course content. You can review the material as often as you like, at your own pace.",
                      },
                      {
                        question: "Is there a certificate upon completion?",
                        answer:
                          "Yes, upon completing all modules and passing the final assessment, you will receive a certificate of completion from GrappleGuru.",
                      },
                      {
                        question:
                          "Can I download the video lessons for offline viewing?",
                        answer:
                          "Yes, all video lessons are available for download, allowing you to study offline at your convenience.",
                      },
                    ].map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>
                      {isEnrolled ? "Your Progress" : "Course Details"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEnrolled ? (
                      <>
                        <Progress value={33} className="mb-2" />
                        <p className="mb-4 text-sm text-muted-foreground">
                          3 of 10 modules completed
                        </p>
                        <Link href="/courses/module/11">
                          <Button className="mb-4 w-full">
                            Continue Learning
                          </Button>
                        </Link>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Course Completion</span>
                            <span className="font-semibold">33%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Estimated Time Left</span>
                            <span className="font-semibold">
                              6 hours 40 minutes
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Target className="mr-2 h-4 w-4" />
                            <span className="text-sm">Self-paced learning</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            <span className="text-sm">
                              Access to student community
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Award className="mr-2 h-4 w-4" />
                            <span className="text-sm">
                              Certificate of completion
                            </span>
                          </div>
                        </div>
                        <Button
                          variant={"default"}
                          className="mt-4 w-full"
                          size="lg"
                          onClick={() => setIsEnrolled(true)}
                        >
                          Enroll Now
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <BarChart className="mr-2 h-4 w-4" />
                        <span className="text-sm">Skill level: Beginner</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span className="text-sm">
                          10 hours of video content
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span className="text-sm">
                          25 articles and resources
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        <span className="text-sm">
                          10 downloadable resources
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span className="text-sm">
                          Access to student community
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
