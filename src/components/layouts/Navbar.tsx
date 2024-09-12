"use client";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import ThemeSwitch from "../shared/ThemeSwitch";
import {
  Home,
  ListChecks,
  LogOut,
  SquarePen,
  UserRoundCheck,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";

const Navbar = (): JSX.Element => {
  const { data: session, status } = useSession();
  return (
    <header className="fixed left-1/2 -translate-x-1/2 w-full border-b-2 bg-white dark:bg-primary-bg">
      <div className="w-full px-4 sm:px-0   mx-auto flex justify-between items-center py-4 my-0 flex-wrap gap-4">
        <div className="flex items-center gap-4 mx-auto">
          {status === "unauthenticated" ? (
            <Link href={"/sign-in"}>
              <Button className="cursor-pointer font-bold text-xl bg-transparent border-2 text-black dark:text-white dark:hover:text-black hover:text-white">
                Sign in
              </Button>
            </Link>
          ) : (
            <>
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} alt="@shadcn" />
              </Avatar>
              <h1 className="text-xl md:text-2xl font-bold">
                {session?.user?.name}
              </h1>
            </>
          )}
        </div>
        <div className="mx-auto">
          <ul className="flex gap-4 sm:gap-8 items-center">
            <li className="text-xl font-semibold">
              <Link href={"/"}>
                <Home
                  size={30}
                  strokeWidth={3}
                  absoluteStrokeWidth
                  className="cursor-pointer"
                />
              </Link>
            </li>
            <li className="text-xl font-semibold">
              <Link href={"/write"}>
                <SquarePen
                  size={30}
                  strokeWidth={3}
                  absoluteStrokeWidth
                  className="cursor-pointer"
                />
              </Link>
            </li>
            <li className="text-xl font-semibold">
              <Link href={"/allPosts"}>
                <ListChecks
                  size={30}
                  strokeWidth={3}
                  absoluteStrokeWidth
                  className="cursor-pointer"
                />
              </Link>
            </li>
            <li className="text-xl font-semibold">
              <Link href={"/myPosts"}>
                <UserRoundCheck
                  size={30}
                  strokeWidth={3}
                  absoluteStrokeWidth
                  className="cursor-pointer"
                />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                {" "}
                <ThemeSwitch />
              </Link>
            </li>
            {status === "authenticated" ? (
              <li>
                <Link href={"#"}>
                  {" "}
                  <LogOut
                    size={30}
                    strokeWidth={3}
                    absoluteStrokeWidth
                    onClick={() => signOut()}
                    className="cursor-pointer"
                  />
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
