import Image from "next/image";
import React from "react";
import img from "@/assets/images/home-3.jpg";
const CommentCard = ({ username, imageUrl, content, date }: any) => {
  return (
    <div className="mb-4 p-3 bg-secondary-black shadow-2xl rounded-lg text-white">
      <div className="flex items-center gap-2">
        <Image
          src={img}
          alt="image"
          className="w-[40px] h-[40px] rounded-full"
        />
        <div>
          <p className="font-semibold">author</p>
          <p className="text-sm text-gray-400">date</p>
        </div>
      </div>
      <p className="mt-1 text-[15px] leading-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi fugit
        voluptatem illo inventore blanditiis necessitatibus! Nulla quas fuga
      </p>
    </div>
  );
};

export default CommentCard;
