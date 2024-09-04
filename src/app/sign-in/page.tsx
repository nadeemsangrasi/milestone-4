"use client";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const LogInPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const hanldeGoogleLogin = () => {
    try {
      signIn("google");
      if (status === "authenticated") {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error logging with google", error);
    }
  };
  const handleGithubLogin = () => {};
  return (
    <Wrapper>
      <div className="flex items-center justify-center pt-24">
        <div className="border-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 py-6 px-8 mx-auto rounded-lg shadow-2xl">
          <h1 className="pb-4 text-xl font-semibold text-center">
            Sign in with google or github ?
          </h1>
          <div className="flex gap-4 flex-col py-0">
            <Button
              onClick={hanldeGoogleLogin}
              className="text-2xl font-bold flex gap-2 items-center"
            >
              <FcGoogle size={30} /> Google
            </Button>
            <Button
              onClick={handleGithubLogin}
              className="text-2xl font-bold flex gap-2 items-center"
            >
              <FaGithub size={30} /> Github
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LogInPage;
