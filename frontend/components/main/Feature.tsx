import { cn } from "@/lib/utils";
import {
  Bolt,
  BookOpen,
  Cloud,
  DollarSign,
  Ear,
  Heart,
  HelpCircle,
  Layers,
  Route,
  Server,
  Smartphone,
  Terminal,
  ThumbsUp,
  Users,
} from "lucide-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Built for Learners",
      description:
        "Designed for students, professionals, and lifelong learners seeking knowledge.",
      icon: <BookOpen />,
    },
    {
      title: "Ease of Access",
      description:
        "Our platform is intuitive and user-friendly, ensuring seamless learning.",
      icon: <Smartphone />,
    },

    {
      title: "Reliable Uptime",
      description:
        "Our platform is always available, ensuring uninterrupted learning.",
      icon: <Server />,
    },
    {
      title: "Community Engagement",
      description:
        "Join a vibrant community to share knowledge and grow together.",
      icon: <Users />,
    },

    {
      title: "Satisfaction Guarantee",
      description:
        "If you're not satisfied, we'll work with you to make it right.",
      icon: <ThumbsUp />,
    },
    {
      title: "Comprehensive Learning",
      description:
        "From ilm to business, we cover a wide range of topics to elevate your skills.",
      icon: <Layers />,
    },
  ];

  return (
    <>
      {/* <div className="text-4xl  font-normal  self-start py-8">Our Promise</div> */}
      <div className="px-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3   relative z-10 py-10 w-fit  mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col pb-10 pt-2 relative group/feature min-w-[250px] "
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-500/10 to-transparent pointer-events-none rounded-xl  " />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-500/10 to-transparent pointer-events-none rounded-xl" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400 group-hover/feature:text-secondary-foreground transition-all duration-200 ease-in">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-red-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-secondary-foreground ">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 group-hover/feature:text-secondary-foreground transition-all duration-200 ease-in">
        {description}
      </p>
    </div>
  );
};
