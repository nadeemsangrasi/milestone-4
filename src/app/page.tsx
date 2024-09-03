"use client";

import ThemeSwitch from "@/components/shared/ThemeSwitch";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
export default function Home() {
  const { data: session, status } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [value, setValue] = useState("");

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setImageUrl(result.url);
      } else {
        console.error("Upload failed:", result.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      {status === "authenticated" ? (
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
      )}

      <div className="my-2">
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
      </div>
      <ThemeSwitch />
    </div>
  );
}
