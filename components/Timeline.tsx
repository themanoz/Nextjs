"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  avatar: string;
  url: string;
  repositoryName: string;
  ownerName: string;
}

interface PullRequest {
  closedAt: string;
  title: string;
  url: string;
  repository: {
    name: string;
    owner: {
      login: string;
      avatarUrl: string;
    };
  };
}

const Timeline: React.FC = () => {
  const [events, setEvents] = useState<TimelineItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  // Auto-scroll to the bottom when events update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [events.length]);

  const fetchContributions = async () => {
    try {
      const response = await axios.get("/api/github");
      // Transform each PR object into a TimelineItem
      const timelineItems: TimelineItem[] =
        response.data.mergedPullRequests.map((pr: PullRequest) => {
          const date = new Date(pr.closedAt).toLocaleDateString();
          const repositoryName = pr.repository.name;
          // Assuming the owner's login represents the owner's name.
          const ownerName = pr.repository.owner?.login || "Unknown Owner";
          return {
            date,
            title: pr.title,
            // Build a description using both repository and owner name.
            description: `Merged PR on ${repositoryName} by ${ownerName}`,
            // Use the owner's avatar (or fallback if not available)
            avatar: pr.repository.owner?.avatarUrl || "/fallback-avatar.png",
            url: pr.url,
            repositoryName,
            ownerName,
          };
        });
      setEvents(timelineItems);
      console.log("Transformed events:", timelineItems);
    } catch (error) {
      console.error("Error while fetching contributions", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchContributions();
    }
  }, [session]);

  // Group events by their formatted date
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, TimelineItem[]>);

  // Sort dates in ascending order (older dates first)
  const uniqueDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div
      ref={containerRef}
      className="relative pl-8 h-[536px] py-4 rxounded-md overflow-y-auto"
    >
      {session ? (
        <div className="px-4">
          <motion.div
            className="absolute left-[2.4rem] top-2 w-[2px] my-4 bg-gradient-to-b from-green-500 via-green-400 to-green-300"
            initial={{ height: 0 }}
            animate={{ height: `${uniqueDates.length * 100}px` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <AnimatePresence>
            {uniqueDates.map((date) => (
              <div key={date} className="relative mb-8 flex items-start">
                <motion.div
                  className="absolute -left-7 w-10 h-10 my-2 bg-black rounded-full shadow-md border p-[1px] border-slate-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {groupedEvents[date][0]?.avatar ? (
                    <Image
                      src={groupedEvents[date][0].avatar}
                      alt="Avatar"
                      width={50}
                      height={50}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  )}
                </motion.div>

                <div className="ml-4 px-3">
                  <span className="text-xs text-gray-500">{date}</span>
                  {groupedEvents[date].map((event, idx) => (
                    <div key={idx} className="mb-2 space-y-1">
                      <div className="font-medium text-sm">
                        {event.ownerName}/{event.repositoryName}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {event.title}
                      </p>

                      <Link
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs mt-1 py-1 px-2 rounded border text-green-600 dark:border-green-800"
                      >
                        <button className="pt-2">Checkout PR</button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <span>You haven&apos;t made any contributions.</span>
      )}
    </div>
  );
};

export default Timeline;
