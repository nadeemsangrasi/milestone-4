"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

const ThemeContext = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ThemeContext;
