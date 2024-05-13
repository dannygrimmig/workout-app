import "../globals.css";

import { Kanit } from "next/font/google";
import { NavBar } from "../ui/nav";

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
