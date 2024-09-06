"use client";
import Loader from "@/components/shared/Loader";
import SelectCategory from "@/components/shared/SelectCategory";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CustomSession, IUploadPost } from "@/types/types";
import { slugify } from "@/utils/slugify";
import axios, { AxiosError } from "axios";
import { Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const WritePost = () => {
  const [formData, setFormData] = useState<IUploadPost>({
    title: "",
    imageUrl: "",
    category: "",
  });
  const [ispublishing, setIspublishing] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const { data, status } = useSession();
  const session = data as CustomSession;

  useEffect(() => {
    const uploadPost = async () => {
      if (!file) return;

      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        setIspublishing(true);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const result = await response.json();
        if (result.success) {
          toast({ title: "Upload Successful", description: result.message });

          // Update only the imageUrl in the formData
          setFormData((prevData) => ({
            ...prevData,
            imageUrl: result.url as string,
          }));
        } else {
          toast({
            title: "Upload Failed",
            description: result.message,
            variant: "destructive",
          });
          console.error("Upload failed:", result.message);
        }
      } catch (error: any) {
        console.error("Upload failed:", error);
        toast({
          title: "Upload Failed",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIspublishing(false);
      }
    };
    uploadPost();
  }, [file]);

  const handlePublishPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPublishing(true);
    setMessage("");
    try {
      console.log("form", formData);
      console.log("slug", slugify(formData.title || ""));
      console.log("user id", session.user.id || "");
      console.log("user image", session.user.image);

      const res = await axios.post("/api/blog/post", {
        title: formData.title,
        content: value,
        imageUrl: formData.imageUrl,
        categorySlug: formData.category,
        slug: slugify(formData.title || ""),
        userId: session.user.id || "",
        userImageUrl: session.user.image,
      });
      if (!res.data.success) {
        setMessage(res.data.message);
        console.error(res.data.message);
        toast({
          title: "Error publishing post",
          description: res.data.message,
        });
      }

      toast({
        title: "Post published successfully",
        description: res.data.message,
      });
      setFormData({ title: "", category: "", imageUrl: "" });
      setValue("");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error publishing post");
      toast({
        title: "Error publishing post",
        description: axiosError.message,
      });
    } finally {
      setIsPublishing(false);
    }
  };
  return (
    <Wrapper>
      <div className="py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-center  my-6">
          Write your experience
        </h1>
        <div className="my-8">
          <form onSubmit={handlePublishPost}>
            <div>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="text"
                id="title"
                placeholder="Write title..."
                className="outline-none  text-4xl bg-gray-300  placeholder:text-black p-3 w-full rounded-lg text-black"
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
                {ispublishing ? (
                  <Loader2
                    size={30}
                    strokeWidth={3}
                    absoluteStrokeWidth
                    className="inline mx-2"
                  />
                ) : (
                  <>
                    <Upload
                      size={30}
                      strokeWidth={3}
                      absoluteStrokeWidth
                      className="inline mx-2"
                    />
                  </>
                )}
                <span className="text-2xl font-bold">
                  {ispublishing ? "publishing..." : "Upload Image"}
                </span>
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
                value={value}
                onChange={setValue}
                placeholder="Write content..."
              />
            </div>
            {formData.title}
            {formData.category}
            <Button
              type="submit"
              className=" text-xl sm:text-2xl font-bold "
              disabled={
                formData.category !== "" &&
                formData.title !== "" &&
                value !== "" &&
                formData.imageUrl !== "" &&
                !isPublishing
                  ? false
                  : true
              }
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default WritePost;
