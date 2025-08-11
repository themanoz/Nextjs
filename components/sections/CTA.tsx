"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function CTA() {
  return (
    <motion.section
      className="mt-12 py-12 md:py-24 mb-6 md:mb-10 text-center px-4 md:px-10 lg:px-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 place-items-center">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-bold w-full">
          Ready to simplify your workflow?
        </h2>
        <p className="mt-2 text-xs sm:text-sm md:text-md lg:text-lg font-normal w-3/4 md:w-2/3 lg:w-full mx-auto text-muted-foreground">
          Join GitTrek today and start managing your open source projects with
          ease.
        </p>
        <Button className="mt-6 md:mt-8 inline-block px-6 md:px-8 py-2 md:py-2 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md">
          Get Started
        </Button>
      </div>
    </motion.section>
  );
}
