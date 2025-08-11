"use client";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
// import { ModeToggle } from "../ModeToggle";

export default function NavBar() {
  return (
    <nav className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-3 sm:py-4 lg:py-8 flex items-center justify-between font-light text-zinc-300">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <h1 className="sm:text-lg md:text-xl lg:text-2xl font-semibold text-black dark:text-white">
            <span className="text-green-600">Git</span>Trek
          </h1>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2"
      >
        <Button
          // onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          variant={"outline"}
          className="text-xs md:text-sm text-black dark:text-white"
        >
          Login
        </Button>
        {/* <ModeToggle /> */}
      </motion.div>
    </nav>
  );
}
