import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ThemeSwitch from "../shared/ThemeSwitch";
import { Home } from "lucide-react";

const Navbar = () => {
  return (
    <div className="border-b border-t">
      <header className="w-full px-4 sm:px-0 sm:w-3/4 lg:w-2/3 mx-auto flex justify-between items-center py-4 ">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <ul className="flex gap-4 items-center">
            <li className="text-xl font-semibold">
              <Link href={"#"}>
                <Home />
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
      </header>
    </div>
  );
};

export default Navbar;
