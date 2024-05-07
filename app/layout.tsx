import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { NavBar } from "./ui/nav";

const kanit = Kanit({
  weight: "200",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Workout App",
    default: "Workout App",
  },
  description: "welcome to my portfolio site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.className} bg-slate-100`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
