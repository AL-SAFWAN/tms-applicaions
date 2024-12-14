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
  ];

  return (
    <>
      {/* <div className="text-4xl  font-normal  self-start py-8">Our Promise</div> */}
      <div className="relative z-10 mx-auto grid w-fit grid-cols-1 px-4 py-10 lg:grid-cols-1 xl:grid-cols-2">
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
        "group/feature relative flex min-w-[250px] flex-col pb-10 pt-2",
      )}
    >
      {index < 2 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full rounded-xl bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-500/10" />
      )}
      {index >= 2 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full rounded-xl bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-500/10" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 transition-all duration-200 ease-in group-hover/feature:text-secondary-foreground dark:text-neutral-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-red-500 dark:bg-neutral-700" />
        <span className="inline-block text-secondary-foreground transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 transition-all duration-200 ease-in group-hover/feature:text-secondary-foreground dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};
