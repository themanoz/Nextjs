"use client";
import { signOut, useSession } from "next-auth/react";
import { CreditCard, Github, LogOut, User } from "lucide-react";
// import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M 130 323 L 80 323 L 130 323 L 80 323 L 80 0 L 80 0 L 130 0 L 130 0 L 130 323 L 130 323 Z M 231 76 L 180 76 L 231 76 L 180 76 L 180 512 L 180 512 L 231 512 L 231 512 L 231 76 L 231 76 Z M 332 76 L 281 76 L 332 76 L 281 76 L 281 512 L 281 512 L 332 512 L 332 512 L 332 76 L 332 76 Z M 432 76 L 382 76 L 432 76 L 382 76 L 382 323 L 382 323 L 432 323 L 432 323 L 432 76 L 432 76 Z" />
        </svg>
        <h1 className="text-xl font-semibold">Gittrek</h1>
      </div>
      <div className="flex items-center gap-2">
        {/* <ModeToggle /> */}
        {/* <span>{session?.user.username}</span> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.user.image && (
              <Avatar>
                <AvatarImage
                  src={session?.user.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {session.user.name
                    ?.split(" ")
                    .map((name) => name.charAt(0).toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-center flex items-center gap-1">
              <Github className="w-4 h-4" />
              {session?.user.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/dashboard/profile"}>
              <DropdownMenuItem>
                <User /> Profile
              </DropdownMenuItem>
            </Link>
            <Link href={"/dashboard/billing"}>
              <DropdownMenuItem>
                <CreditCard /> Billing
              </DropdownMenuItem>
            </Link>
            <Separator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-1"
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
