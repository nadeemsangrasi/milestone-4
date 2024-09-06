"use client";

import CategoriesSection from "@/components/sections/categoriesSection/CategoriesSection";
import HomeSection from "@/components/sections/homeSection/HomeSection";
import RecentPostsSection from "@/components/sections/recentPostsSection/RecentPostsSection";
import ThemeSwitch from "@/components/shared/ThemeSwitch";
import { CustomSession } from "@/types/types";
import { slugify } from "@/utils/slugify";
import { ReceiptIndianRupeeIcon } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
export default function Home() {
  const { data, status } = useSession();
  const session = data as CustomSession;

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [value, setValue] = useState("");
  console.log(slugify("nadeem khan Sangrasi Here"));
  const handleUpload = async () => {};

  return (
    <div>
      <HomeSection />
      <CategoriesSection />
      <RecentPostsSection />
      {/* {status === "authenticated" ? (
        <>
          <h1>Hello user {session.user?.name}</h1>
          <button
            className="py-2 px-8 font-bold text-xl bg-black text-white"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            className="py-2 px-8 font-bold text-xl bg-black text-white"
            onClick={() => signIn("google")}
          >
            Log in
          </button>
        </>
      )} */}

      {/* <div className="my-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept="image/*"
        />
        <button
          className="py-2 px-8 font-bold text-xl bg-black text-white"
          onClick={handleUpload}
        >
          Upload
        </button>

        {imageUrl && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={imageUrl} alt="Uploaded" />
          </div>
        )}
      </div>
      <div>
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div> */}
    </div>
  );
}
