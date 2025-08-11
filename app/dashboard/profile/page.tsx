"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
// import GithubCalendar from "react-activity-calendar";

function Page() {
  const { data: session } = useSession();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="p-8 space-y-6">
      <div className="flex gap-2">
        <div className="relative w-[200px] h-[200px]">
         
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
          )}
          {session?.user.image && (
            <Image
              src={session.user.image}
              alt="avatar"
              width={200}
              height={200}
              className="rounded-lg"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          )}
        </div>

        {/* GitHub Calendar Placeholder */}
        {/* <GithubCalendar data={data} theme={dark} /> */}
        <div className="border w-[900px] rounded-md shadow-md"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="border w-[350px] h-[400px] rounded-md shadow-md p-4">
          <p className="text-lg font-medium">Details</p>
          <ul className="mt-4">
            <li className="font-light text-muted-foreground">Name</li>
            <li className="font-light text-muted-foreground">Bio</li>
            <li className="font-light text-muted-foreground">Email</li>
            <li className="font-light text-muted-foreground">Location</li>
          </ul>
        </div>
        <div className="border w-[350px] h-[400px] rounded-md shadow-md">
          <p className="p-4 text-lg font-medium">Organisations</p>
        </div>
        <div className="border w-[350px] h-[400px] rounded-md shadow-md">
          <p className="p-4 text-lg font-medium">Activity</p>
        </div>
      </div>
    </section>
  );
}

export default Page;
