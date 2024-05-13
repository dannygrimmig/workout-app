import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { NavBar } from "./ui/nav";

export const metadata: Metadata = {
  title: {
    template: "%s | The Logs",
    default: "The Logs",
  },
  description: "The Logs | Create, Share, and Track your workouts.",
  metadataBase: new URL("https://workout-app-one-self.vercel.app/"),
  keywords: ["gym", "workout", "tracking"],
};

const kanit = Kanit({
  weight: ["200", "400", "600"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.className} bg-slate-100 font-light`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
