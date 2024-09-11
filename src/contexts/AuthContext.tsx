"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const AuthContext = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
