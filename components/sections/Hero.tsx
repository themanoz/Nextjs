"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="text-center py-16 place-items-center space-y-3 lg:space-y-4 px-8 lg:px-0">
      {/* <div className="">
        <AnimatedGradientText className="bg-green-100 text-green-500">
          <span>Introducing GitTrek</span>
        </AnimatedGradientText>
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold w-5/8 md:w-3/5 lg:w-[700px]"
      >
        Track issues of forked projects with GitTrek
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-2 text-xs sm:text-sm md:text-base lg:text-base font-normal w-3/4 md:w-2/3 lg:w-full mx-auto text-muted-foreground"
      >
        Track your commits, PRs, and issues in one dashboard with realtime
        insights.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Button className=" bg-green-800 hover:bg-green-700 text-slate-200 text-sm lg:text-md font-medium">
          Get started
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="border border-slate-800 rounded-lg mt-12 lg:mt-8 lg:w-3/5"
      >
        <Image src="/dashboard.png" alt="dashboard" width={1600} height={800} />
      </motion.div>
    </section>
  );
}
