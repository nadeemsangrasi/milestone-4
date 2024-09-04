import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import AuthContext from "@/contexts/AuthContext";
import ThemeContext from "@/contexts/ThemeContext";
import Navbar from "@/components/layouts/Navbar";

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
          <body
            className={`${raleway.className} bg-white dark:bg-[#020817]`}
            suppressHydrationWarning
          >
            <Navbar />

            {children}
          </body>
        </ThemeContext>
      </AuthContext>
    </html>
  );
}
