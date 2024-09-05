import Image from "next/image";
import React from "react";
import img from "@/assets/images/home-3.jpg";
import { Edit, Edit2, Edit2Icon, Edit3, Trash } from "lucide-react";
const CommentCard = ({ username, imageUrl, content, date }: any) => {
  return (
    <div className="mb-4 p-3  rounded-lg text-white">
      <div className="flex items-center gap-2">
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
      <p className="mt-1 text-[15px] leading-1 text-black dark:text-white">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi fugit
        voluptatem illo inventore blanditiis necessitatibus! Nulla quas fuga
      </p>

      <div className="flex gap-2 mt-2">
        <Edit3
          size={20}
          strokeWidth={2}
          absoluteStrokeWidth
          className="cursor-pointer"
        />
        <Trash
          size={20}
          strokeWidth={2}
          absoluteStrokeWidth
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CommentCard;
