"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ThemeSwitch from "../shared/ThemeSwitch";
import { Home, ListChecks, SquarePen } from "lucide-react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <header className="fixed left-1/2 -translate-x-1/2 w-full border-b-2">
      <div className="w-full px-4 sm:px-0 sm:w-3/4  mx-auto flex justify-between items-center py-4 my-0 flex-wrap gap-4">
        <div className="flex items-center gap-4 mx-auto">
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl md:text-2xl font-bold">
            {session?.user?.name}
          </h1>
        </div>
        <div className="mx-auto">
          <ul className="flex gap-8 items-center">
            <li className="text-xl font-semibold">
              <Link href={"#"}>
                <Home size={30} strokeWidth={3} absoluteStrokeWidth />
              </Link>
            </li>
            <li className="text-xl font-semibold">
              <Link href={"#"}>
                <SquarePen size={30} strokeWidth={3} absoluteStrokeWidth />
              </Link>
            </li>
            <li className="text-xl font-semibold">
              <Link href={"#"}>
                <ListChecks size={36} strokeWidth={3} absoluteStrokeWidth />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                {" "}
                <ThemeSwitch />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
