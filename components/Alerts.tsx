"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
// import { AnimatedList } from "@/components/magicui/animated-list";
import { Badge } from "@/components/ui/badge";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
  labels: { text: string; color: string }[];
}

const labels = [
  { text: "Bug", color: "red" },
  { text: "Feature", color: "violet" },
  { text: "Enhancement", color: "green" },
  { text: "Bounty", color: "yellow" },
  { text: "Urgent", color: "blue" },
];

const baseIssues = [
  {
    name: "Bug in middleware handling",
    description: "Express",
    time: "20m ago",
    icon: "🐛",
    color: "#FF3D71",
  },
  {
    name: "Container startup failure",
    description: "Docker",
    time: "15m ago",
    icon: "🐳",
    color: "#00C9A7",
  },
  {
    name: "Pod scheduling issue",
    description: "Kubernetes",
    time: "10m ago",
    icon: "☸️",
    color: "#1E86FF",
  },
  {
    name: "Authentication error",
    description: "NextAuth",
    time: "5m ago",
    icon: "🔑",
    color: "#FFB800",
  },
  {
    name: "Database connection timeout",
    description: "Prisma",
    time: "3m ago",
    icon: "🛢️",
    color: "#8E44AD",
  },
  {
    name: "Rate limit exceeded",
    description: "GitHub API",
    time: "1m ago",
    icon: "🚀",
    color: "#24292F",
  },
];

export function Alerts({ className }: { className?: string }) {
  const [issues, setIssues] = useState<Item[]>([]);

  useEffect(() => {
    const randomizedIssues = Array.from({ length: 10 }, () =>
      baseIssues.map((issue) => ({
        ...issue,
        labels: [
          labels[Math.floor(Math.random() * labels.length)],
          labels[Math.floor(Math.random() * labels.length)],
        ],
      }))
    ).flat();

    setIssues(randomizedIssues);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-[400px] md:h-[550px] lg:h-[500px] w-full flex-col overflow-hidden p-4",
        className
      )}
    >
      {/* <AnimatedList>
        {issues.map((item, idx) => (
          <Notification key={idx} {...item} />
        ))}
      </AnimatedList> */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}

const Notification = ({
  name,
  description,
  icon,
  color,
  time,
  labels,
}: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white shadow-md dark:bg-transparent dark:backdrop-blur-md dark:border dark:border-gray-700"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-8 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <div className="flex items-center gap-2 text-sm font-normal dark:text-white/60 text-left">
            {description}
            {labels.map((label, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-[0.3px] font-normal bg-black text-white"
              >
                {label.text}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
};
