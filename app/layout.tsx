import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | The Logs 🏋️",
    default: "The Logs 🏋️",
  },
  description: "The Logs | Create, Share, and Track your workouts.",
  metadataBase: new URL("https://workout-app-one-self.vercel.app/"),
  keywords: ["gym", "workout", "tracking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
