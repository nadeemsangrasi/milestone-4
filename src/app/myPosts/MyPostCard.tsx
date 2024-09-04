import { Button } from "@/components/ui/button";
import { Edit3, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import img from "@/assets/images/home-1.jpg";
const MyPostCard = () => {
  return (
    <div className="w-[450px] h-[600px]">
      <div>
        <Image src={img} alt="image" className="w-full rounded-lg" />
      </div>
      <div className="space-y-2  py-2 text-center lg:text-left">
        <p className="inline-block  text-lg ">2023-8-12.</p>
        <span className="text-red-500 text-lg ">CODING</span>
        <h1 className="text-3xl sm:text-2xl font-bold">
          Essiat way to manage My state with
        </h1>
        <p className="text-lg ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aut
          voluptatem voluptas corporis repudiandae laborum, minima....
        </p>
        <div className="flex gap-4 items-center">
          <Button className=" text-lg font-semibold ">Read more</Button>
          <Edit3 size={27} strokeWidth={3} absoluteStrokeWidth />
          <Trash size={27} strokeWidth={3} absoluteStrokeWidth />
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
