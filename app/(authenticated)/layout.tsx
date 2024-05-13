import "../globals.css";

import { Kanit } from "next/font/google";
import { NavBar } from "../ui/nav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const kanit = Kanit({
  weight: ["200", "400", "600"],
  style: ["normal"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }

  return (
    <html lang="en">
      <body className={`${kanit.className} bg-slate-100 font-light`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
