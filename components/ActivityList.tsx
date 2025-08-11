import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ActivityList() {
  const Issues = [
    {
      id: 1,
      issue: "Add middleware",
      org: "https://avatars.githubusercontent.com/u/112180774?v=4",
      label: "bug",
      description: "Opened by kirat",
      time: "30s",
    },
    {
      id: 2,
      issue: "Custom Auth",
      org: "https://avatars.githubusercontent.com/u/153106492?v=4",
      label: "enhancement",
      description: "Opened by sudip8",
      time: "2m",
    },
    {
      id: 3,
      issue: "Null description",
      org: "https://avatars.githubusercontent.com/u/1178890?v=4",
      label: "feature",
      description: "Opened by jane",
      time: "15m",
    },
    {
      id: 4,
      issue: "Update the readme",
      org: "https://avatars.githubusercontent.com/u/33164907?v=4",
      label: "bug",
      description: "Opened by john",
      time: "1h",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Issues</h2>
        <Link href={"#"} className="text-green-600 text-sm">
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {Issues.map((issue) => (
          <div key={issue.id} className="flex items-center space-x-3">
            <Image
              src={issue.org}
              alt="User avatar"
              width={8}
              height={8}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="font-medium dark:text-white">{issue.issue}</p>
              <p className="text-sm text-muted-foreground">
                {issue.description} - {issue.time} ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
