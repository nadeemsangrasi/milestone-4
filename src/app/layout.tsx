import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import AuthContext from "@/contexts/AuthContext";
import ThemeContext from "@/contexts/ThemeContext";
import Navbar from "@/components/layouts/Navbar";
import { Toaster } from "@/components/ui/toaster";
import PostsContext from "@/contexts/PostsContext";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nadeem blogs",
  description: "nadeem blogs site milestone 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthContext>
        <ThemeContext>
          <PostsContext>
            <body
              className={`${raleway.className} bg-white dark:bg-primary-bg overflow-x-hidden `}
              suppressHydrationWarning
            >
              <Navbar />
              {children}

              <Toaster />
            </body>
          </PostsContext>
        </ThemeContext>
      </AuthContext>
    </html>
  );
}
