import Image from "next/image";
import React from "react";
import img from "@/assets/images/home-1.jpg";
import { Button } from "@/components/ui/button";
import { Edit, Edit2, Edit3, Trash } from "lucide-react";

const RecentPostCard = ({ imageUrl, date, category, title, content }: any) => {
  return (
    <div className="lg:flex  justify-between lg:w-[98%] gap-4">
      <div className="lg:w-1/2">
        <Image src={img} alt="image" className="w-full rounded-lg" />
      </div>
      <div className="space-y-4 lg:w-1/2 sm:px-4 py-2 text-center lg:text-left">
        <p className="inline-block px-2 text-lg sm:text-xl">2023-8-12.</p>
        <span className="text-red-500 text-lg sm:text-xl">CODING</span>
        <h1 className="text-3xl sm:text-5xl font-bold">
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
          <Edit3 size={30} strokeWidth={3} absoluteStrokeWidth />
          <Trash size={30} strokeWidth={3} absoluteStrokeWidth />
        </div>
      </div>
    </div>
  );
};

export default RecentPostCard;
