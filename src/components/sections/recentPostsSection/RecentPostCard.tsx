"use client";
import Image from "next/image";
import React from "react";
import img from "@/assets/images/home-1.jpg";
import { Button } from "@/components/ui/button";
import { Edit, Edit2, Edit3, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/types";

const RecentPostCard = ({ post }: any) => {
  const { data, status } = useSession();
  const session = data as CustomSession;

  return (
    <div className="lg:flex  justify-between lg:w-[98%] gap-4">
      <div className="lg:w-1/2">
        <Image src={img} alt="image" className="w-full rounded-lg" />
      </div>
      <div className="space-y-4 lg:w-1/2 sm:px-4 py-2 text-center lg:text-left">
        <span className="text-red-500 text-lg sm:text-xl">CODING</span>
        <div className="flex items-center gap-2 justify-center md:justify-normal">
          <Image
            src={img}
            alt="image"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div>
            <p className="font-semibold text-black dark:text-white">author</p>
            <p className="text-sm text-gray-700 dark:text-gray-400  ]">date</p>
          </div>
        </div>
        <h1 className="text-3xl sm:text-3xl font-bold">
          Essiat way to manage your state with zustang
        </h1>

        <p className="text-lg sm:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aut
          voluptatem voluptas corporis repudiandae laborum, minima....
        </p>
        <div className="flex gap-4 items-center">
          <Button className="bg-sunset-orange text-xl sm:text-2xl font-semibold ">
            Read more
          </Button>
          {status === "authenticated" && session.user.id === post?.userId && (
            <>
              <Edit3 size={30} strokeWidth={3} absoluteStrokeWidth />
              <Trash size={30} strokeWidth={3} absoluteStrokeWidth />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentPostCard;
