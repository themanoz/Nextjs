"use client";

import React, { useState, useEffect } from "react";
import { GitHubData } from "@/types/types";
import { currentDate, defaultMonth, defaultYear } from "@/types/types";
// import Timeline from "./_components/Timeline";

import { useSession } from "next-auth/react";
import SubscriptionModal from "@/components/SubscriptionModal";
import { Charts } from "../../components/Charts";
import { StatsGrid } from "@/components/stats-grid";
import { Building2, GitCommitHorizontal, GitMerge } from "lucide-react";

export default function Page() {
  const { data: session, status } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

  useEffect(() => {
    if (status === "authenticated") {
      if (
        !session?.user.subscriptionStatus ||
        (session.user.subscriptionStatus !== "ACTIVE" &&
          session.user.subscriptionStatus !== "TRIAL")
      ) {
        setModalOpen(true);
      }
    }
  }, [session, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result: GitHubData = await res.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh at midnight
    const midnight = new Date(currentDate);
    midnight.setDate(currentDate.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    const timeout = midnight.getTime() - currentDate.getTime();

    const timer = setTimeout(fetchData, timeout);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  const { stats, currentDayCommits, dailyContributions, mergedPullRequests } =
    data;

  // Filter contributions for the selected month and year
  const filteredContributions = dailyContributions.filter(({ date }) => {
    const entryDate = new Date(date);
    return (
      entryDate.getMonth() === selectedMonth &&
      entryDate.getFullYear() === selectedYear
    );
  });

  // Calculate current streak based on the filtered data
  let streak = 0;
  let maxStreak = 0;
  filteredContributions.forEach((day) => {
    if (day.commits > 0) {
      streak++;
      if (streak > maxStreak) maxStreak = streak;
    } else {
      streak = 0;
    }
  });

  const summaryData = [
    {
      label: "Commits",
      value: currentDayCommits,
      change: {
        value: "+12%",
        // trend: "up",
      },
      icon: <GitCommitHorizontal />,
    },
    {
      label: "PRs Merged",
      value: mergedPullRequests.length,
      change: {
        value: "+42%",
        // trend: "up",
      },
      icon: <GitMerge />,
    },
    {
      label: "Organisations",
      value: stats.issueContributions,
      change: {
        value: "+37%",
        // trend: "up",
      },
      icon: <Building2 />,
    },
    {
      label: "Streak",
      value: maxStreak,
      change: {
        value: "-17%",
        // trend: "down",
      },
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
          />
        </svg>
      ),
    },
  ];

  const availableYears = [defaultYear - 1, defaultYear];

  const handleModalOpenChange = (open: boolean) => {
    if (
      session?.user.subscriptionStatus === "ACTIVE" ||
      session?.user.subscriptionStatus === "TRIAL"
    ) {
      console.log("activate?: ",session.user.subscriptionStatus)
      setModalOpen(open);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <section className="px-2">
      <SubscriptionModal
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
      />
      <main
        className={`flex flex-col px-6 gap-3 py-2 ${
          modalOpen ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <StatsGrid stats={summaryData} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Charts
            filteredContributions={filteredContributions}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            availableYears={availableYears}
          />
          {/* <Timeline /> */}
        </div>
      </main>
    </section>
  );
}
