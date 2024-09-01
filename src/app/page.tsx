"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  console.log("Session Data:", session);
  console.log("Session Status:", status);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
    </div>
  );
}
