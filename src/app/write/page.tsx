"use client";
import SelectCategory from "@/components/shared/SelectCategory";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import { IPost } from "@/types/types";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const WritePost = () => {
  const [formData, setFormData] = useState<IPost>({
    title: "",
    content: "",
    imageUrl: "",
    slug: "",
    category: "",
  });
  const [isUploading, setIsLoadinf] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  console.log(formData.category);
  return (
    <Wrapper>
      <div className="py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-center  my-6">
          Write your experience
        </h1>
        <div className="my-8">
          <form>
            <div>
              <input
                type="text"
                id="title"
                placeholder="Write title..."
                className="outline-none bg-transparent text-4xl bg-gray-300 placeholder:text-black p-3 w-full rounded-lg text-black"
              />
            </div>
            <div className="my-4">
              <SelectCategory formData={formData} setFormData={setFormData} />
            </div>
            <div>
              <label
                htmlFor="file"
                className="cursor-pointer flex items-center border-2 border-dashed p-3 rounded-lg w-fit bg-gray-300 text-black"
              >
                <Upload
                  size={30}
                  strokeWidth={3}
                  absoluteStrokeWidth
                  className="inline mx-2"
                />
                <span className="text-2xl font-bold">upload</span>
              </label>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*"
                id="file"
                className="hidden"
              />
            </div>
            <div className="my-4">
              <ReactQuill
                theme="bubble"
                className="bg-gray-300 text-black p-4 rounded-lg"
                value={formData.content}
                onChange={(e: any) => {
                  setFormData({
                    ...formData,
                    content: e.target.value,
                  });
                }}
                placeholder="Write your experiance..."
              />
            </div>
            <Button className=" text-xl sm:text-2xl font-bold ">Publish</Button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default WritePost;
