"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { Badge } from "@/components/ui/badge";
// import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

type NotificationPref = "ALL" | "NEW_ISSUES" | "BOUNTY_ONLY";

export default function NotificationSettings() {
  const [notificationPref, setNotificationPref] =
    useState<NotificationPref>("ALL");
  const [loading, setLoading] = useState(false);
  // const { data: session } = useSession();

  // useEffect(() => {
  //   async function fetchSettings() {
  //     try {
  //       const res = await axios.get("/api/notifications");
  //       setNotificationPref(res.data.notificationPreference);
  //     } catch (err) {
  //       console.error("Error fetching settings:", err);
  //     }
  //   }
  //   fetchSettings();
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationPref(e.target.value as NotificationPref);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    toast
      .promise(
        axios.post("/api/user/notifications", {
          notificationPreference: notificationPref,
        }),
        {
          loading: "Saving...",
          success: "Settings saved successfully!",
          error: "Failed to save settings.",
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="p-8 space-y-4">
      {/* <div className="border md:w-[300px] lg:w-[360px] h-[200px] rounded-lg relative p-4">
        <div className="absolute right-2 top-2 text-green-700 border border-green-600 hover:bg-none bg-black text-xs px-2 py-1 rounded-lg">
          {session?.user.subscriptionStatus === "TRIAL" ? (
            session?.user.trialEndDate ? (
              <p>
                Free trial ends on{" "}
                {new Date(session.user.trialEndDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            ) : (
              <p>Trial end date not available.</p>
            )
          ) : null}
        </div>

        <h2 className="font-medium mt-24">Monthly Plan</h2>
        <p className="text-3xl font-medium ">
          <span className="text-green-500">$9</span>
          <span className="text-sm">/ month</span>
        </p>
      </div> */}

      <div>
        <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
        <form onSubmit={handleSave}>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="notifications"
                value="ALL"
                checked={notificationPref === "ALL"}
                onChange={handleChange}
                className="accent-green-500"
              />
              <span>All notifications (new issues and bounty alerts)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="notifications"
                value="NEW_ISSUES"
                checked={notificationPref === "NEW_ISSUES"}
                onChange={handleChange}
                className="accent-green-500"
              />
              <span>Only new issues</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="notifications"
                value="BOUNTY_ONLY"
                checked={notificationPref === "BOUNTY_ONLY"}
                onChange={handleChange}
                className="accent-green-500"
              />
              <span>Only bounty alerts</span>
            </label>
          </div>
          <Button type="submit" disabled={loading} className="mt-4 px-4 py-2 rounded-md hover:bg-green-600 bg-green-700 hover:bg-none dark:text-white">
            {loading ? "Saving..." : "Save settings"}
          </Button>
        </form>
      </div>
    </section>
  );
}
