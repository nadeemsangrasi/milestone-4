"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
import SelectCategory from "@/components/shared/SelectCategory";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/contexts/PostsContext";
import { useToast } from "@/hooks/use-toast";
import { CustomSession, IUploadPost } from "@/types/types";
import { slugify } from "@/utils/slugify";
import axios, { AxiosError } from "axios";
import { Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { ICategories, IResponsePost, IPostContext } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
const WritePost = ({
  searchParams,
}: {
  searchParams: { postSlug: string };
}) => {
  const [formData, setFormData] = useState<IUploadPost>({
    title: "",
    imageUrl: "",
    category: "",
  });
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const { data } = useSession();
  const session = data as CustomSession;
  const { posts, setPosts, isEditingPost, setIsEditingPost } =
    usePosts() as IPostContext;
  const { postSlug } = searchParams;

  useEffect(() => {
    if (!postSlug) {
      setIsEditingPost(false);
    }
  }, [postSlug, setIsEditingPost]);

  const singlePost = posts?.find(
    (post: IResponsePost) => post?.slug === postSlug || ""
  );

  const router = useRouter();
  useEffect(() => {
    if (singlePost) {
      setFormData({
        title: singlePost?.title || "",
        imageUrl: singlePost?.imageUrl || "",
        category: singlePost?.categorySlug || "",
      });
      setValue(singlePost?.content || "");
    }
  }, [singlePost]);

  useEffect(() => {
    const uploadPost = async () => {
      if (!file) return;

      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        setIsUploading(true);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const result = await response.json();
        setIsUploading(false);
        if (result.success) {
          toast({ title: "Upload Successful", description: result.message });

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
      }
    };

    uploadPost();
  }, [file]);

  const handlePublishPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPublishing(true);
    setMessage("");
    try {
      const res = await axios.post("/api/blog/post", {
        title: formData.title,
        content: value,
        username: session.user.name || "",
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
      } else {
        setPosts([res.data.data, ...posts]);
        router.push("/posts" + res.data.data.slug);
        toast({
          title: "Post published successfully",
          description: res.data.message,
        });
        setIsPublishing(false);
        setFormData({ title: "", category: "", imageUrl: "" });
        setValue("");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error publishing post", axiosError);
      toast({
        title: "Error publishing post",
        description: axiosError.message,
      });
    } finally {
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    try {
      setIsPublishing(true);
      const res = await axios.patch("/api/blog/post", {
        postId: singlePost?.id,
        userId: session.user.id,
        categorySlug: formData.category,
        title: formData.title,
        content: value,
        imageUrl: formData.imageUrl,
        slug: slugify(formData.title || ""),
      });

      if (!res.data.success) {
        toast({
          title: "Failed to edit post",
          description: res.data.message,
          variant: "destructive",
        });
      } else {
        setIsPublishing(false);
        setPosts(
          posts.filter((myPost) => {
            if (myPost.id === singlePost?.id) {
              return res.data.data;
            } else {
              return myPost;
            }
          })
        );

        toast({
          title: "Post edited",
          description: res.data.message,
        });

        router.push("/posts/" + res.data.data.slug);
        setFormData({ title: "", category: "", imageUrl: "" });
        setValue("");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Failed to edit post", axiosError);
      toast({
        title: "Failed to edit post",
        description: axiosError.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Wrapper>
      <div className="py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-center my-6">
          {isEditingPost ? "Edit Post" : "Write your experience"}
        </h1>
        <div className="my-8">
          <form>
            <div>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="text"
                id="title"
                placeholder="Write title..."
                className="outline-none text-4xl bg-gray-300 placeholder:text-black p-3 w-full rounded-lg text-black"
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
                {isPublishing ? (
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
                  {isUploading ? "Uploading..." : "Upload Image"}
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

            <Button
              className="text-xl sm:text-2xl font-bold"
              disabled={
                formData.category !== "" &&
                formData.title !== "" &&
                value !== "" &&
                formData.imageUrl !== "" &&
                !isPublishing
                  ? false
                  : true
              }
              onClick={isEditingPost ? handleUpdatePost : handlePublishPost}
            >
              {isEditingPost ? (
                <>{isPublishing ? "saving..." : "save changes"}</>
              ) : (
                <>{isPublishing ? "pubklishing..." : "publish"}</>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default WritePost;
