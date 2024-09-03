import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "@/contexts/AuthContext";
import ThemeContext from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={`${inter.className} dark:text-black dark:bg-gray-400`}>
          <ThemeContext>{children}</ThemeContext>
        </body>
      </AuthContext>
    </html>
  );
}
