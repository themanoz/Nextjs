"use client";
import { motion } from "framer-motion";
import { AlertCircle, Bell, CircleDot } from "lucide-react";

const problems = [
  {
    title: "Too Many Tabs",
    description:
      "Developers juggle multiple GitHub tabs, documentation, and their code editor, leading to distractions and reduced focus.",
    icon: <AlertCircle className="w-6 h-6 text-green-500" />,
  },
  {
    title: "Issue Tracking Chaos",
    description:
      "Open-source contributions span multiple repositories, making it hard to track issues and progress in one place.",
    icon: <CircleDot className="w-6 h-6 text-green-500" />,
  },
  {
    title: "Notification Overload",
    description:
      "Important updates get buried in GitHub notifications, emails, and Slack, making it difficult to stay informed without feeling overwhelmed.",
    icon: <Bell className="w-6 h-6 text-green-500" />,
  },
];

// Container variant for staggering child animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Card variant for the entrance animation
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Problems() {
  return (
    <section className="lg:py-16 text-center place-items-center px-4">
      <motion.span
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="text-green-500 my-2 text-sm"
      >
        PROBLEM
      </motion.span>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl md:text-2xl lg:text-4xl font-semibold w-full md:w-3/4 lg:w-2/5 mx-auto"
      >
        Lost in tabs while contributing?
      </motion.div>
      <motion.div
        className="mt-8 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="flex flex-col items-start gap-3 shadow-md border dark:border-slate-800 rounded-xl p-6 dark:bg-black/10"
            // className="p-8 rounded-2xl 
            //  bg-gradient-to-br from-white via-gray-50 to-gray-100 
            //  dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 
            //  backdrop-blur-sm 
            //  border border-gray-200/50 dark:border-gray-700/50 
            //  hover:scale-105 transition-all duration-50
            //  shadow-sm hover:shadow-md"
          >
            <div className="text-left space-y-2">
              <div className="flex items-center gap-2">
                {problem.icon}
                <h3 className="font-medium text-lg lg:text-xl">
                  {problem.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm md:text-md font-extralight">
                {problem.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
