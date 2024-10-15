"use client";

import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/schemas/SignInSchema";
import * as z from "zod";
const LogInPage = (): JSX.Element => {
  const { status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const hanldeGoogleLogin = () => {
    try {
      signIn("google");
      if (status === "authenticated") {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error logging in with Google", error);
    }
  };

  const handleGithubLogin = () => {
    try {
      signIn("github");
      if (status === "authenticated") {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error logging in with GitHub", error);
    }
  };

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    setIsSubmitting(false);
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }

      return;
    }

    toast({
      title: "Success",
      description: "You have successfully logged in",
    });

    router.refresh();  
    router.push("/");
  
  };

  return (
    <Wrapper>
      <div className="flex items-center justify-center pt-24 min-h-screen">
        <div className="border-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 py-6 px-8 mx-auto rounded-lg shadow-2xl ">
          <h1 className="pb-4 text-xl font-semibold text-center">
            Sign in with Google, GitHub, or Email
          </h1>

          {/* Third-party OAuth login buttons */}
          <div className="flex gap-4 flex-col py-4">
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
              <FaGithub size={30} /> GitHub
            </Button>
          </div>

          <div className="text-center font-medium my-4">or</div>

          {/* Email/Password Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} name="identifier" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} name="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          {/* Link to sign up */}
          <div className="text-center mt-4">
            <p>
              Not a member yet?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LogInPage;
