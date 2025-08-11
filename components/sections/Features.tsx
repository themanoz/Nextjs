"use client";

import { Alerts } from "@/components/Alerts";
import { motion } from "framer-motion";
import { ResponsiveContainer, XAxis, LineChart, Line } from "recharts";

const productivityData = [
  { hour: "00-04", contributions: 2 },
  { hour: "04-08", contributions: 5 },
  { hour: "08-12", contributions: 21 },
  { hour: "12-16", contributions: 18 },
  { hour: "16-20", contributions: 12 },
  { hour: "20-24", contributions: 8 },
];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const statsData = [
  { name: "Repositories", value: "24", change: "+12%" },
  { name: "PRs Merged", value: "89", change: "+8%" },
  { name: "Issues", value: "142", change: "+23%" },
  { name: "Streak", value: "1d", change: "🔥" },
];

export default function Features() {
  return (
    <section className="py-16 my-10 text-center">
      <div className="container mx-auto px-4 place-items-center">
        {/* <p className="text-green-500 my-2 text-sm">SOLUTION</p> */}
        <motion.span
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="text-green-500 my-2 text-sm"
        >
          SOLUTION
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.2 }}
          className="text-xl lg:text-4xl font-semibold  w-3/4 md:w-2/5"
        >
          How GitTrek helps
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4 }}
          className="mt-2 text-xs sm:text-sm lg:text-md font-normal w-3/4 md:w-2/3 lg:w-full mx-auto text-muted-foreground"
        >
          GitTrek: One dashboard for tracking work and bounties—clutter-free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-4 md:px-10 lg:px-32"
        >
          <div className="p-4 border border-slate-800 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center col-span-1 lg:col-span-2">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-2 w-full">
              <div className="grid grid-cols-2 gap-2 w-full">
                {statsData.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="p-4 md:p-6 border border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
                  >
                    <h3 className="text-white text-sm font-medium">
                      {stat.name}
                    </h3>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-2xl md:text-3xl font-bold text-slate-300">
                        {stat.value}
                      </p>
                      <span className="ml-2 text-sm font-medium text-emerald-600">
                        {stat.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <ResponsiveContainer
                width="100%"
                height={230}
                className="border border-slate-800 rounded-md shadow-md p-2"
              >
                <LineChart data={productivityData}>
                  <XAxis dataKey="hour" />
                  <Line
                    type="monotone"
                    dataKey="contributions"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <h3 className="text-lg md:text-xl font-semibold mt-6">
              Seamless Contribution Tracking
            </h3>
          </div>
          <div className="rounded-xl border border-slate-800 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center col-span-1 lg:row-span-2">
            <Alerts />
            <h3 className="text-xl font-semibold mb-8 lg:mt-16">
              Smart Issue & Bounty Alerts
            </h3>
          </div>

          <div className="p-6 border border-slate-800 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-4">
              <svg
                className="h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z"
                />
              </svg>
              {/* <Image
                src="/dashboard.png"
                alt="dashboard"
                width={400}
                height={400}
              /> */}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Centralized Project Management
            </h3>
            <p className="text-gray-600">
              Keep all your open-source projects in one place, eliminating the
              need for multiple Chrome tabs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
